import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getStore, writeStore, type Lead } from "@/lib/db";

export type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  businessDetails: string;
  submittedAt: string;
  source?: string;
};

export const submitLeadServer = createServerFn({ method: "POST" })
  .validator((d: LeadPayload) => d)
  .handler(async ({ data }) => {
    // Retrieve client details using getRequestHeaders
    const headers = getRequestHeaders();
    const rawIp = headers["x-forwarded-for"] || headers["x-real-ip"] || "127.0.0.1";
    const ipAddress = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "127.0.0.1";
    const userAgent = headers["user-agent"] || "unknown";

    const store = await getStore();
    
    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 9),
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      service: data.service,
      businessDetails: data.businessDetails,
      submittedAt: data.submittedAt,
      ipAddress,
      userAgent,
    };

    // Keep active list of leads
    store.leads.unshift(newLead); // show newest leads at the top
    await writeStore(store);
    
    return { success: true };
  });

export async function submitLead(payload: LeadPayload): Promise<void> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const id = Math.random().toString(36).substring(2, 9);
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "unknown";
      
      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id,
          fullName: payload.fullName,
          phone: payload.phone,
          email: payload.email,
          service: payload.service,
          businessDetails: payload.businessDetails,
          submittedAt: payload.submittedAt,
          ipAddress: "client-side",
          userAgent,
        }),
      });
      if (res.ok) {
        return;
      }
      throw new Error(`Supabase REST API failed with status ${res.status}`);
    } catch (e) {
      console.error("Client-side Supabase submission failed:", e);
      throw e;
    }
  }

  if (typeof window !== "undefined") {
    try {
      const apiBase = (window as any).__API_BASE__ || "";
      const res = await fetch(`${apiBase}/api.php?action=submit_lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return;
      }
      if (res.status !== 404) {
        throw new Error(`PHP API failed with status ${res.status}`);
      }
      console.info("PHP API returned 404, falling back to local server function");
    } catch (e) {
      console.warn("PHP API lead submission failed, trying local server function:", e);
    }
  }
  await submitLeadServer({ data: payload });
}