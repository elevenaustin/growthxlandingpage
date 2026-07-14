import { motion, useReducedMotion, type MotionProps } from "framer-motion";

export function BackgroundBlobs() {
  const reduce = useReducedMotion();
  const anim = (delay: number): MotionProps =>
    reduce
      ? {}
      : {
          animate: { x: [0, 30, -20, 0], y: [0, -20, 20, 0] },
          transition: {
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        {...anim(0)}
        className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary-glow) 45%, transparent), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        {...anim(4)}
        className="absolute -top-10 right-[-10%] h-[600px] w-[600px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, color-mix(in oklab, var(--primary) 40%, transparent), transparent 70%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}