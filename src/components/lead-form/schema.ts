import { z } from "zod";

export const SERVICES = [
  { id: "meta-ads", title: "Meta Ads", emoji: "📈" },
  { id: "google-ads", title: "Google Ads", emoji: "🎯" },
  { id: "growth-engine", title: "Meta + Google Ads", emoji: "🚀" },
  { id: "acquisition", title: "Customer Acquisition", emoji: "💼" },
  { id: "landing-page", title: "Landing Pages", emoji: "🎨" },
  { id: "scale-retainer", title: "Scale Retainer", emoji: "📊" },
] as const;

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That's a bit long"),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid mobile number")
    .max(15, "Mobile number is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  service: z
    .string()
    .min(1, "Please select a service"),
  businessDetails: z
    .string()
    .trim()
    .min(5, "Please share some details about your business")
    .max(2000, "Details can be up to 2000 characters"),
  website: z.string().max(0).optional(), // honeypot
});

export type LeadForm = z.infer<typeof leadSchema>;