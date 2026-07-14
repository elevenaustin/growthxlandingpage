import { createServerFn } from "@tanstack/react-start";
import { getStore, writeStore, type Lead, type StoreData } from "@/lib/db";

// Hardcoded strong credentials for security
const ADMIN_USER = "admin_growthx_console";
const ADMIN_PASS = "gx_AdM!n#9824_P";

const SUPER_USER = "superadmin_growthx_master";
const SUPER_PASS = "gx_SuP3r!9951_M";

export const getSiteStatusServer = createServerFn({ method: "GET" })
  .handler(async () => {
    const store = await getStore();
    return { status: store.status };
  });

export const getAdminDataServer = createServerFn({ method: "POST" })
  .validator((d: { username?: string; password?: string }) => d)
  .handler(async ({ data }) => {
    if (!data.username || !data.password) {
      throw new Error("Username and Password are required");
    }

    const isAdmin = data.username === ADMIN_USER && data.password === ADMIN_PASS;
    const isSuper = data.username === SUPER_USER && data.password === SUPER_PASS;

    if (!isAdmin && !isSuper) {
      throw new Error("Invalid username or password");
    }

    const store = await getStore();
    return {
      role: isSuper ? "super" : "admin",
      status: store.status,
      leads: store.leads,
      totalLeads: store.leads.length,
    };
  });

export const toggleMaintenanceServer = createServerFn({ method: "POST" })
  .validator((d: { username?: string; password?: string; newStatus: "live" | "maintenance" }) => d)
  .handler(async ({ data }) => {
    const isSuper = data.username === SUPER_USER && data.password === SUPER_PASS;
    if (!isSuper) {
      throw new Error("Unauthorized. Super Admin access required.");
    }

    const store = await getStore();
    store.status = data.newStatus;
    await writeStore(store);
    
    return { success: true, status: store.status };
  });

// --- Client/PHP-compatible wrappers ---

export async function getSiteStatus() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/config?key=eq.status&select=value`, {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        }
      });
      if (res.ok) {
        const config = await res.json();
        const status = config && config[0] ? config[0].value : "live";
        return { status };
      }
    } catch (e) {
      console.error("Client-side Supabase status fetch failed:", e);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const apiBase = (window as any).__API_BASE__ || "";
      const res = await fetch(`${apiBase}/api.php?action=get_status`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("PHP API status fetch failed, trying local server function:", e);
    }
  }
  return await getSiteStatusServer();
}

export async function getAdminData(username?: string, password?: string) {
  const ADMIN_USER = "admin_growthx_console";
  const ADMIN_PASS = "gx_AdM!n#9824_P";
  const SUPER_USER = "superadmin_growthx_master";
  const SUPER_PASS = "gx_SuP3r!9951_M";

  if (!username || !password) {
    throw new Error("Username and Password are required");
  }

  const isAdmin = username === ADMIN_USER && password === ADMIN_PASS;
  const isSuper = username === SUPER_USER && password === SUPER_PASS;

  if (!isAdmin && !isSuper) {
    throw new Error("Invalid username or password");
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      // Fetch status
      const configRes = await fetch(`${supabaseUrl}/rest/v1/config?key=eq.status&select=value`, {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        }
      });
      const config = await configRes.json();
      const status = config && config[0] ? config[0].value : "live";

      // Fetch leads
      const leadsRes = await fetch(`${supabaseUrl}/rest/v1/leads?select=*&order=submittedAt.desc`, {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        }
      });
      const leads = await leadsRes.json();

      return {
        role: isSuper ? "super" : "admin",
        status: status as "live" | "maintenance",
        leads: Array.isArray(leads) ? leads : [],
        totalLeads: Array.isArray(leads) ? leads.length : 0,
      };
    } catch (e) {
      console.error("Client-side Supabase admin fetch failed:", e);
      throw e;
    }
  }

  if (typeof window !== "undefined") {
    try {
      const apiBase = (window as any).__API_BASE__ || "";
      const res = await fetch(`${apiBase}/api.php?action=get_admin_data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 401 || res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Invalid credentials");
      }
      if (res.status !== 404) {
        throw new Error(`PHP API failed with status ${res.status}`);
      }
      console.info("PHP API returned 404, falling back to local server function");
    } catch (e: any) {
      if (e.message && (e.message.includes("credentials") || e.message.includes("Invalid"))) throw e;
      console.warn("PHP API admin data fetch failed, trying local server function:", e);
    }
  }
  return await getAdminDataServer({ data: { username, password } });
}

export async function toggleMaintenance(username?: string, password?: string, newStatus?: "live" | "maintenance") {
  const SUPER_USER = "superadmin_growthx_master";
  const SUPER_PASS = "gx_SuP3r!9951_M";

  const isSuper = username === SUPER_USER && password === SUPER_PASS;
  if (!isSuper) {
    throw new Error("Unauthorized. Super Admin access required.");
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/config?key=eq.status`, {
        method: "PATCH",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value: newStatus })
      });
      if (res.ok) {
        return { success: true, status: newStatus };
      }
      throw new Error(`Supabase PATCH failed with status ${res.status}`);
    } catch (e) {
      console.error("Client-side Supabase maintenance toggle failed:", e);
      throw e;
    }
  }

  if (typeof window !== "undefined") {
    try {
      const apiBase = (window as any).__API_BASE__ || "";
      const res = await fetch(`${apiBase}/api.php?action=toggle_maintenance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, newStatus }),
      });
      if (res.ok) {
        return await res.json();
      }
      if (res.status === 401 || res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Unauthorized");
      }
      if (res.status !== 404) {
        throw new Error(`PHP API failed with status ${res.status}`);
      }
      console.info("PHP API returned 404, falling back to local server function");
    } catch (e: any) {
      if (e.message && (e.message.includes("Unauthorized") || e.message.includes("Invalid"))) throw e;
      console.warn("PHP API toggle maintenance failed, trying local server function:", e);
    }
  }
  return await toggleMaintenanceServer({ data: { username, password, newStatus } });
}
