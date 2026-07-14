import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfService,
});

export function TermsOfService() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-5">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/5"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </a>

        <h1 className="mt-10 text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Last Updated: July 13, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground/90">
          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">1. Terms of Use</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">2. Use License</h2>
            <p>
              Permission is granted to temporarily view the materials (information or software) on GrowthX Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on GrowthX Studio's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">3. Disclaimer</h2>
            <p>
              The materials on GrowthX Studio's website are provided on an 'as is' basis. GrowthX Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">4. Limitations of Liability</h2>
            <p>
              In no event shall GrowthX Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GrowthX Studio's website, even if GrowthX Studio or a GrowthX Studio authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">5. Governing Law</h2>
            <p>
              Any claim relating to GrowthX Studio's website shall be governed by the laws of India without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
