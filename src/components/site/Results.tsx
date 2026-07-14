import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const screenshots = [
  { src: "/results/1.png", alt: "Meta Ads Performance 1" },
  { src: "/results/2.png", alt: "Meta Ads Performance 2" },
  { src: "/results/3.png", alt: "Meta Ads Performance 3" },
  { src: "/results/4.png", alt: "Meta Ads Performance 4" },
  { src: "/results/5.png", alt: "Meta Ads Performance 5" },
  { src: "/results/6.png", alt: "Meta Ads Performance 6" },
  { src: "/results/7.png", alt: "Meta Ads Performance 7" },
  { src: "/results/8.png", alt: "Meta Ads Performance 8" },
  { src: "/results/9.png", alt: "Meta Ads Performance 9" },
];

export function Results() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImg(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="results" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-20">
      <Reveal>
        <div className="text-center">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Client Results</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Proof In <span className="gradient-text">Action</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Verified screenshots straight from our client Meta Ad accounts. We focus on real purchases, high ROAS, and scalable growth.
          </p>
        </div>
      </Reveal>

      {/* Grid of screenshots */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((shot, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => setSelectedImg(shot.src)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lg transition-all hover:border-primary/45"
            >
              {/* Image element */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="h-full w-full object-cover object-top transition-transform duration-350 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox / Zoom Dialog Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          >
            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-2xl border border-border bg-[#0a0713] p-1.5 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={selectedImg}
                alt="Ad Account Zoomed"
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}