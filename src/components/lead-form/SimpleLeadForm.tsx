import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/lead-submission";

const SERVICES = [
  { id: "meta-ads", title: "Meta Ads" },
  { id: "google-ads", title: "Google Ads" },
  { id: "growth-engine", title: "Meta + Google Ads" },
  { id: "acquisition", title: "Customer Acquisition" },
  { id: "landing-page", title: "Landing Pages" },
  { id: "scale-retainer", title: "Scale Retainer" },
];

export function SimpleLeadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    businessDetails: "",
    website: "", // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Please enter your name";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Please enter your mobile number";
    } else if (formData.phone.length < 10) {
      tempErrors.phone = "Mobile number must be at least 10 digits";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.service) {
      tempErrors.service = "Please select a service";
    }
    if (!formData.businessDetails.trim()) {
      tempErrors.businessDetails = "Please tell us briefly about your business";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // Honeypot triggered
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitLead({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        businessDetails: formData.businessDetails,
        submittedAt: new Date().toISOString(),
        source: "meta-ads-landing",
      });
      setSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        businessDetails: "",
        website: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass rounded-3xl p-8 text-center max-w-xl mx-auto border border-primary/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">Strategy Call Booked!</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you! We have received your details and our paid media expert will contact you on WhatsApp within 30 minutes to share your custom growth blueprint.
        </p>
      </div>
    );
  }

  return (
    <div
      id="lead-form"
      className="glass rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)] text-left scroll-mt-24"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          🎯 Get Your Custom Ads Growth Plan
        </h3>
        <p className="text-xs text-muted-foreground mt-1.5">
          Fill out the form below to book your free 30-minute strategy call.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field (hidden from users) */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {/* Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-muted-foreground mb-1.5">
            FULL NAME
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow,background-color] focus:border-primary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
          />
          {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
        </div>

        {/* Email and Phone Side-by-Side */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-1.5">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. priya@brand.com"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow,background-color] focus:border-primary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-muted-foreground mb-1.5">
              MOBILE NUMBER (WHATSAPP)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow,background-color] focus:border-primary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        {/* Service Select Dropdown */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-muted-foreground mb-1.5">
            WHICH SERVICE FITS BEST?
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow,background-color] focus:border-primary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select your required service...
            </option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
        </div>

        {/* Business Details Textarea */}
        <div>
          <label htmlFor="businessDetails" className="block text-xs font-semibold text-muted-foreground mb-1.5">
            TELL US ABOUT YOUR BUSINESS & GOALS
          </label>
          <textarea
            id="businessDetails"
            name="businessDetails"
            value={formData.businessDetails}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. E-commerce apparel brand. Goal is to scale monthly sales to 10L with ROAS > 3.0."
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow,background-color] focus:border-primary focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
          />
          {errors.businessDetails && <p className="mt-1 text-xs text-destructive">{errors.businessDetails}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          style={{ background: "var(--gradient-accent)" }}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting Details...
            </>
          ) : (
            <>
              Get My Custom Growth Blueprint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
