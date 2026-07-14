import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

export function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Last Updated: July 13, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground/90">
          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">1. Overview</h2>
            <p>
              At GrowthX Studio, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GrowthX Studio and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">2. Information We Collect</h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Contact Information:</strong> We collect your name, mobile number, and email address when you submit our inquiry form.</li>
              <li><strong>Business Goals:</strong> We collect details about your business goals and marketing budget to prepare custom ads strategies.</li>
              <li><strong>Diagnostics:</strong> Our systems log your IP address and User Agent string for anti-spam security and dashboard tracking.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">3. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide, operate, and maintain our website.</li>
              <li>Improve, personalize, and expand our website diagnostics.</li>
              <li>Understand and analyze how you use our landing page.</li>
              <li>Contact you via WhatsApp or email to discuss advertising strategies.</li>
              <li>Find and prevent spam and fraudulent form submissions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">4. Third-Party Partners</h2>
            <p>
              GrowthX Studio's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers (such as Meta pixel engines or Google analytics API) for more detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-2">5. GDPR & CCPA Rights</h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to request access to their collected data, request corrections, or request deletion. If you make a request, we have one month to respond to you. Please contact us to exercise these rights.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
