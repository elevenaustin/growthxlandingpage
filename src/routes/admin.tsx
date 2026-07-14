import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Lock, RefreshCw, LogOut, Shield, Database, Users, Settings, Radio, Download, Eye, X } from "lucide-react";
import { getAdminData, toggleMaintenance, type Lead } from "../lib/admin-actions";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

export function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionUsername, setSessionUsername] = useState<string | null>(null);
  const [sessionPassword, setSessionPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<{
    role: "admin" | "super";
    status: "live" | "maintenance";
    leads: any[];
    totalLeads: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Debounce search term to prevent typing lag
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  
  // Modal & Export format states
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");

  // Restore session credentials
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = sessionStorage.getItem("admin_user");
      const savedPass = sessionStorage.getItem("admin_pass");
      if (savedUser && savedPass) {
        setSessionUsername(savedUser);
        setSessionPassword(savedPass);
      }
    }
  }, []);

  // Fetch admin data
  const fetchData = async (user: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminData(user, pass);
      setDashboardData(res);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_user", user);
        sessionStorage.setItem("admin_pass", pass);
      }
      setSessionUsername(user);
      setSessionPassword(pass);
    } catch (err: any) {
      setError(err?.message || "Invalid credentials");
      setDashboardData(null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("admin_user");
        sessionStorage.removeItem("admin_pass");
      }
      setSessionUsername(null);
      setSessionPassword(null);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when session credentials are set
  useEffect(() => {
    if (sessionUsername && sessionPassword) {
      fetchData(sessionUsername, sessionPassword);
    }
  }, [sessionUsername, sessionPassword]);

  // Real-time synchronization interval
  useEffect(() => {
    if (!sessionUsername || !sessionPassword || !autoRefresh) return;
    const t = setInterval(() => {
      getAdminData(sessionUsername, sessionPassword)
        .then((res) => setDashboardData(res))
        .catch((e) => console.error("Poll failed:", e));
    }, 5000);
    return () => clearInterval(t);
  }, [sessionUsername, sessionPassword, autoRefresh]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    fetchData(username, password);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_user");
      sessionStorage.removeItem("admin_pass");
    }
    setSessionUsername(null);
    setSessionPassword(null);
    setDashboardData(null);
    setUsername("");
    setPassword("");
    setError(null);
  };

  const handleToggleStatus = async () => {
    if (!sessionUsername || !sessionPassword || !dashboardData || dashboardData.role !== "super") return;
    setLoading(true);
    try {
      const newStatus = dashboardData.status === "live" ? "maintenance" : "live";
      await toggleMaintenance(sessionUsername, sessionPassword, newStatus);
      fetchData(sessionUsername, sessionPassword);
    } catch (err: any) {
      alert(err.message || "Failed to update website status");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    if (!dashboardData) return [];
    const term = debouncedSearchTerm.trim().toLowerCase();
    return dashboardData.leads.filter((l: any) => {
      const matchesSearch = !term
        ? true
        : l.fullName.toLowerCase().includes(term) ||
          l.email.toLowerCase().includes(term) ||
          (l.phone && l.phone.includes(term));
      const matchesService = filterService ? l.service === filterService : true;
      return matchesSearch && matchesService;
    });
  }, [dashboardData, debouncedSearchTerm, filterService]);

  // Export action
  const handleExport = () => {
    if (!filteredLeads.length) return;

    if (exportFormat === "csv") {
      // Build headers
      const headers = ["Date/Time", "Lead ID", "Full Name", "Phone", "Email", "Requested Service", "Business Details", "IP Address", "User Agent"];
      
      // Build rows formatting strings securely
      const rows = filteredLeads.map((l) => [
        new Date(l.submittedAt).toLocaleString("en-IN"),
        l.id,
        `"${l.fullName.replace(/"/g, '""')}"`,
        `"${l.phone.replace(/"/g, '""')}"`,
        `"${l.email.replace(/"/g, '""')}"`,
        `"${l.service.replace(/"/g, '""')}"`,
        `"${l.businessDetails.replace(/"/g, '""')}"`,
        `"${l.ipAddress.replace(/"/g, '""')}"`,
        `"${l.userAgent.replace(/"/g, '""')}"`
      ]);

      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `growthx_leads_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Export as JSON
      const jsonString = JSON.stringify(filteredLeads, null, 2);
      const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `growthx_leads_${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Login view if not authenticated
  if (!sessionUsername || !sessionPassword || !dashboardData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-white">
            Admin Authentication
          </h2>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Please enter your credentials to access the GrowthX Studio portal.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5 ml-1">Username (ID)</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5 ml-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </div>
            {error && <p className="text-xs text-destructive text-left">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-glow cursor-pointer"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-5 sm:px-10 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Dashboard Nav */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                GrowthX Studio Portal
              </h1>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                dashboardData.role === "super" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-primary/20 text-primary border border-primary/30"
              }`}>
                <Shield className="h-3.5 w-3.5" />
                {dashboardData.role === "super" ? "Super Admin" : "Admin"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Persisted server database analytics console.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Auto refresh status indicator */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                autoRefresh 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <Radio className={`h-3.5 w-3.5 ${autoRefresh ? "animate-pulse" : ""}`} />
              {autoRefresh ? "Live Sync Active" : "Sync Disabled"}
            </button>

            <button
              onClick={() => fetchData(sessionUsername, sessionPassword)}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-white disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Super Admin Control Board */}
        {dashboardData.role === "super" && (
          <div className="mt-8 rounded-3xl border border-red-500/20 bg-card p-6 shadow-lg">
            <div className="flex items-center gap-3 text-red-400">
              <Settings className="h-5 w-5" />
              <h2 className="text-base font-bold tracking-tight">Super Admin Controls</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Toggle global website status. Putting the website down renders a maintenance page for standard visitors.
            </p>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-background/50 p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${dashboardData.status === "live" ? "bg-green-500 animate-ping" : "bg-amber-500"}`} />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Site Status: {dashboardData.status === "live" ? "Online" : "Under Maintenance"}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {dashboardData.status === "live" ? "Accepting lead form submissions normally." : "All home page requests display scheduled maintenance message."}
                  </div>
                </div>
              </div>

              <button
                onClick={handleToggleStatus}
                disabled={loading}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  dashboardData.status === "live"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
                    : "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                }`}
              >
                {dashboardData.status === "live" ? "Turn Website Down" : "Turn Website Up"}
              </button>
            </div>
          </div>
        )}

        {/* Analytics Row */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-md flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{dashboardData.totalLeads}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total Form Submissions</div>
            </div>
          </div>
          
          <div className="rounded-3xl border border-border bg-card p-6 shadow-md flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {dashboardData.leads.filter(l => new Date(l.submittedAt).toDateString() === new Date().toDateString()).length}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Leads Received Today</div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-md flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Database Sync Health</div>
            </div>
          </div>
        </div>

        {/* Filter controls & Search */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Leads Database</h3>
            
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-white placeholder-muted-foreground outline-none focus:border-primary w-52"
              />
              
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-white outline-none focus:border-primary"
              >
                <option value="">All Services</option>
                <option value="meta-ads">Meta Ads</option>
                <option value="google-ads">Google Ads</option>
                <option value="growth-engine">Omnichannel Growth</option>
                <option value="acquisition">Acquisition</option>
                <option value="landing-page">Landing Page</option>
                <option value="scale-retainer">Scale Retainer</option>
              </select>

              {/* Format selection */}
              <div className="flex items-center rounded-xl border border-border bg-background overflow-hidden">
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as "csv" | "json")}
                  className="bg-transparent border-0 px-3 py-2 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="csv">CSV (Excel)</option>
                  <option value="json">JSON</option>
                </select>
                <button
                  onClick={handleExport}
                  disabled={filteredLeads.length === 0}
                  className="flex items-center gap-1.5 bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-glow border-l border-border disabled:opacity-50 cursor-pointer h-full"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="mt-6 overflow-x-auto">
            {filteredLeads.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No submissions found.
              </div>
            ) : (
              <table className="w-full text-left text-xs text-white/90 border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Contact Details</th>
                    <th className="py-3.5 px-4">Requested Service</th>
                    <th className="py-3.5 px-4">Business Goals & Details</th>
                    <th className="py-3.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredLeads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-background/40 transition-colors">
                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-muted-foreground">
                        {new Date(lead.submittedAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      {/* Contact details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{lead.fullName}</div>
                        <div className="mt-1 text-muted-foreground select-all">{lead.email}</div>
                        <div className="mt-0.5 text-primary select-all font-semibold">{lead.phone}</div>
                      </td>
                      {/* Service */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-semibold text-primary">
                          {lead.service}
                        </span>
                      </td>
                      {/* Business details */}
                      <td className="py-4 px-4 max-w-xs md:max-w-md">
                        <p className="truncate leading-relaxed">{lead.businessDetails}</p>
                      </td>
                      {/* Actions */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="flex items-center gap-1 rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-bold text-primary transition-colors hover:bg-primary/20 cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Get Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Details Preview Modal Overlay */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="border-b border-border pb-4 pr-10">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Lead Submission Details
              </h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                ID: {selectedLead.id} · Submitted: {new Date(selectedLead.submittedAt).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Content Details */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</div>
                  <div className="mt-1 text-sm font-semibold text-white">{selectedLead.fullName}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Requested Service</div>
                  <div className="mt-1 text-sm font-semibold text-primary capitalize">{selectedLead.service}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</div>
                  <a href={`tel:${selectedLead.phone}`} className="mt-1 text-sm font-semibold text-white block hover:underline">{selectedLead.phone}</a>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</div>
                  <a href={`mailto:${selectedLead.email}`} className="mt-1 text-sm font-semibold text-white block hover:underline">{selectedLead.email}</a>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Business Details & Goals</div>
                <div className="mt-2 rounded-2xl bg-background/50 border border-border/80 p-4 text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.businessDetails}
                </div>
              </div>

              <div className="border-t border-border pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-muted-foreground">
                <div>
                  <span className="font-semibold text-white/70">Client IP Address:</span> {selectedLead.ipAddress}
                </div>
                <div className="truncate" title={selectedLead.userAgent}>
                  <span className="font-semibold text-white/70">Browser User Agent:</span> {selectedLead.userAgent}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 border-t border-border pt-4 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-xl border border-border bg-background px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/5 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
