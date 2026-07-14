import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

import { leadSchema, type LeadForm as LeadFormValues } from "./schema";
import { ProgressBar } from "./ProgressBar";
import { NameStep } from "./steps/Name";
import { PhoneStep } from "./steps/Phone";
import { EmailStep } from "./steps/Email";
import { ServiceStep } from "./steps/Service";
import { BusinessDetailsStep } from "./steps/BusinessDetails";
import { SuccessStep } from "./steps/Success";
import { submitLead } from "@/lib/lead-submission";

const STORAGE_KEY = "leadform:v4";
const TOTAL_STEPS = 5;

type StepKey = "name" | "phone" | "email" | "service" | "details";

const stepFields: Record<StepKey, (keyof LeadFormValues)[]> = {
  name: ["fullName"],
  phone: ["phone"],
  email: ["email"],
  service: ["service"],
  details: ["businessDetails"],
};

const stepOrder: StepKey[] = ["name", "phone", "email", "service", "details"];

export function LeadForm() {
  const [stepIndex, setStepIndex] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.stepIndex === "number") {
          return Math.min(saved.stepIndex, TOTAL_STEPS - 1);
        }
      }
    } catch {
      /* ignore */
    }
    return 0;
  });

  const defaultValues = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.values) {
          return {
            fullName: "",
            phone: "",
            email: "",
            service: "",
            businessDetails: "",
            website: "",
            ...saved.values,
          };
        }
      }
    } catch {
      /* ignore */
    }
    return {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      businessDetails: "",
      website: "",
    };
  }, []);

  const methods = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues,
  });

  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const mountedAt = useRef<number>(Date.now());
  const reduce = useReducedMotion();

  const saveToStorage = (index: number) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ values: methods.getValues(), stepIndex: index }),
      );
    } catch {
      /* ignore */
    }
  };

  const currentKey = stepOrder[stepIndex];

  async function next() {
    const fields = stepFields[currentKey];
    if (fields.length) {
      const ok = await methods.trigger(fields, { shouldFocus: true });
      if (!ok) return;
    }
    const nextIdx = Math.min(stepIndex + 1, TOTAL_STEPS - 1);
    setDirection(1);
    setStepIndex(nextIdx);
    saveToStorage(nextIdx);
  }

  function prev() {
    const prevIdx = Math.max(0, stepIndex - 1);
    setDirection(-1);
    setStepIndex(prevIdx);
    saveToStorage(prevIdx);
  }

  async function onSubmit(values: LeadFormValues) {
    if (values.website && values.website.length > 0) return; // honeypot
    if (Date.now() - mountedAt.current < 1000) return; // double-submission guard
    setSubmitting(true);
    try {
      await submitLead({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        service: values.service,
        businessDetails: values.businessDetails,
        submittedAt: new Date().toISOString(),
        source: "meta-ads-landing",
      });
      setDone(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (!reduce) {
        const end = Date.now() + 800;
        const colors = ["#8b5cf6", "#a855f7", "#ec4899", "#22c55e"];
        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 65,
            origin: { x: 0 },
            colors,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 65,
            origin: { x: 1 },
            colors,
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  const variants = useMemo(
    () => ({
      enter: (dir: 1 | -1) => ({
        opacity: 0,
        x: dir === 1 ? 30 : -30,
        filter: "blur(5px)",
      }),
      center: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: (dir: 1 | -1) => ({
        opacity: 0,
        x: dir === 1 ? -30 : 30,
        filter: "blur(5px)",
      }),
    }),
    [],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA") return; // allow newlines
    e.preventDefault();
    if (currentKey === "details") {
      void methods.handleSubmit(onSubmit)();
    } else {
      void next();
    }
  }

  if (done) return <SuccessStep />;

  return (
    <FormProvider {...methods}>
      <div
        id="start"
        className="relative mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-3xl scroll-mt-8"
      >
        <div className="glass rounded-3xl p-5 shadow-[var(--shadow-elevated)] sm:p-8 border border-border/60">
          <ProgressBar current={stepIndex} total={TOTAL_STEPS} />

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
            noValidate
          >
            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              {...methods.register("website")}
            />

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentKey}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {currentKey === "name" && <NameStep />}
                  {currentKey === "phone" && <PhoneStep />}
                  {currentKey === "email" && <EmailStep />}
                  {currentKey === "service" && <ServiceStep />}
                  {currentKey === "details" && <BusinessDetailsStep />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-0"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {currentKey === "details" ? (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 cursor-pointer"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      Book My Free Strategy Call{" "}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void next()}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Your info is private. We reply on WhatsApp within 30 minutes.
        </p>
      </div>
    </FormProvider>
  );
}