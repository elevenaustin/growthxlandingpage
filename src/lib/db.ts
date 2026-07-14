import fs from "fs/promises";
import path from "path";

export type Lead = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  businessDetails: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
};

export type StoreData = {
  status: "live" | "maintenance";
  leads: Lead[];
};

const DB_FILE = path.join(process.cwd(), "src/data/store.json");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const isSupabaseConfigured = () => !!SUPABASE_URL && !!SUPABASE_ANON_KEY;

async function ensureLocalDb(): Promise<StoreData> {
  try {
    const dir = path.dirname(DB_FILE);
    await fs.mkdir(dir, { recursive: true });
    
    const fileExists = await fs.access(DB_FILE).then(() => true).catch(() => false);
    if (!fileExists) {
      const defaultData: StoreData = { status: "live", leads: [] };
      await fs.writeFile(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    
    const raw = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(raw) as StoreData;
  } catch (error) {
    console.error("Error ensuring DB file:", error);
    return { status: "live", leads: [] };
  }
}

export async function getStore(): Promise<StoreData> {
  if (isSupabaseConfigured()) {
    try {
      const leadsRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=submittedAt.desc`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });
      const leads = await leadsRes.json();

      const configRes = await fetch(`${SUPABASE_URL}/rest/v1/config?key=eq.status&select=value`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });
      const config = await configRes.json();
      const status = config && config[0] ? config[0].value : "live";

      return {
        status: status as "live" | "maintenance",
        leads: Array.isArray(leads) ? leads : []
      };
    } catch (error) {
      console.error("Error fetching from Supabase:", error);
      return { status: "live", leads: [] };
    }
  }

  return await ensureLocalDb();
}

export async function writeStore(data: StoreData): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/config?key=eq.status`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value: data.status })
      });

      if (data.leads.length > 0) {
        const latestLead = data.leads[0];
        await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
          },
          body: JSON.stringify(latestLead)
        });
      }
    } catch (error) {
      console.error("Error writing to Supabase:", error);
    }
    return;
  }

  try {
    const dir = path.dirname(DB_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing DB file:", error);
  }
}
