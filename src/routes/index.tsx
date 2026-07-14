import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Results } from "@/components/site/Results";
import { ContactInfo } from "@/components/site/ContactInfo";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { getSiteStatus } from "@/lib/admin-actions";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [siteStatus, setSiteStatus] = useState<"live" | "maintenance">("live");

  useEffect(() => {
    getSiteStatus()
      .then((res) => setSiteStatus(res.status))
      .catch((err) => console.error("Error fetching site status:", err));
  }, []);

  if (siteStatus === "maintenance") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 py-12 text-center text-foreground relative overflow-hidden">
        {/* Glowing Background Ring */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 h-[400px] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle, var(--primary) 35%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />

        <div className="relative max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 3m0-3a2 2 0 110 3m-3.793-.793l-1.414-1.414m1.414 1.414a2 2 0 112.828 2.828m-2.828-2.828a2 2 0 102.828 2.828M12 14v8m0-8a2 2 0 110-3m0 3a2 2 0 100-3m3.793-.793l1.414-1.414m-1.414 1.414a2 2 0 10-2.828 2.828m2.828-2.828a2 2 0 11-2.828 2.828" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-white">Scheduled Maintenance</h1>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            GrowthX Studio systems are currently undergoing updates to optimize our data tracking and advertising pipelines. We'll be back online shortly.
          </p>
          <div className="mt-6 border-t border-border pt-4">
            <a
              href="mailto:reply@thegrowthxstudio.com"
              className="text-xs font-semibold text-primary hover:text-primary-glow"
            >
              reply@thegrowthxstudio.com
            </a>
          </div>
        </div>
        
        {/* Subtle Console Login Entry Point */}
        <a
          href="/admin"
          className="absolute bottom-6 text-[10px] text-muted-foreground hover:text-white transition-colors"
        >
          Console Login
        </a>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden pb-10">
        <Hero />
        <WhyChooseUs />
        <Results />
        <ContactInfo />
        <Faq />
        <Footer />
      </main>
    </>
  );
}
