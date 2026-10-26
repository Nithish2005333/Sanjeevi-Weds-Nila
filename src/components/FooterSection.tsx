"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

interface FloatingPetal {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  sway: number;
  rotate: number;
  variant: "gold" | "yellow";
}

// Very minimal: only 4 sparse, subtle petals drifting slowly
const PETALS: FloatingPetal[] = [
  { id: 1, left: "16%", delay: 0.4, duration: 10.2, size: 9, sway: 12, rotate: 110, variant: "yellow" },
  { id: 2, left: "44%", delay: 3.6, duration: 11.5, size: 8, sway: -10, rotate: -130, variant: "gold" },
  { id: 3, left: "70%", delay: 1.8, duration: 9.8, size: 10, sway: 14, rotate: 140, variant: "yellow" },
  { id: 4, left: "88%", delay: 5.4, duration: 11.8, size: 8, sway: -11, rotate: -110, variant: "gold" },
];

const MarigoldPetal: React.FC<{ petal: FloatingPetal }> = ({ petal }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute"
    style={{ left: petal.left }}
    initial={{ top: "-5%", x: 0, rotate: 0, opacity: 0 }}
    animate={{
      top: ["-5%", "105%"],
      x: [0, petal.sway, -petal.sway * 0.7, petal.sway * 0.4, 0],
      rotate: [0, petal.rotate * 0.5, petal.rotate],
      opacity: [0, 0.55, 0.6, 0.45, 0],
    }}
    transition={{
      duration: petal.duration,
      delay: petal.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <svg
      width={petal.size}
      height={petal.size * 1.35}
      viewBox="0 0 20 28"
      fill="none"
      className="filter drop-shadow-[0_1px_2px_rgba(200,120,20,0.18)]"
    >
      <path
        d="M10 0C4 8 0 16 0 21C0 25.5 4.5 28 10 28C15.5 28 20 25.5 20 21C20 16 16 8 10 0Z"
        fill={petal.variant === "yellow" ? "url(#yellow-marigold-grad)" : "url(#golden-amber-grad)"}
      />
      <path
        d="M10 4C7 10 4 16 4 20C4 23 7 25 10 25"
        stroke={petal.variant === "yellow" ? "#E5A100" : "#C96D00"}
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
    </svg>
  </motion.div>
);

export const FooterSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      className="invitation-footer relative w-full text-center select-none border-t-0"
      aria-label="Footer and Gratitude"
    >
      <div className="invitation-footer__visual relative aspect-[941/1672] w-full overflow-hidden">
        {/* Shared SVG Gradients for Marigold Petals */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="yellow-marigold-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="0.35" stopColor="#FFD54F" />
              <stop offset="0.75" stopColor="#FFB300" />
              <stop offset="1" stopColor="#F57C00" />
            </linearGradient>
            <linearGradient id="golden-amber-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE082" />
              <stop offset="0.4" stopColor="#FFB74D" />
              <stop offset="0.8" stopColor="#FB8C00" />
              <stop offset="1" stopColor="#E65100" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sacred Steps Visual with Ambient Zoom Settle */}
        <motion.img
          initial={{ scale: 1.08, opacity: 0.82 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
          src="/assets/footer.webp"
          alt="Sacred Wedding Steps - Sanjeevi & Nila"
          aria-hidden="true"
          className="invitation-footer__photo absolute inset-0 h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />

        {/* Ambient Warm Golden Overlay */}
        <div className="invitation-footer__veil absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Floating Falling Yellow Marigold Petals (Continuous Flow across full visual height) */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
            {PETALS.map((petal) => (
              <MarigoldPetal key={petal.id} petal={petal} />
            ))}
          </div>
        )}

        {/* Main Gratitude & Blessing Parchment Content */}
        <div className="invitation-footer__content invitation-footer__content--simple absolute inset-x-[10%] top-[35%] z-20 flex flex-col items-center">
          <div className="invitation-footer__simple-message flex flex-col items-center">
            {/* 1. "Together," */}
            <motion.p
              initial={{ opacity: 0, y: -10, letterSpacing: "0.12em", filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.22em", filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Together,
            </motion.p>

            {/* 2. "Our Beautiful journey" (Cursive Flourish Reveal) */}
            <motion.h2
              initial={{ opacity: 0, y: 18, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                textShadow: "0 2px 14px rgba(160, 105, 39, 0.22), 0 1px 0 rgba(255, 244, 216, 0.9)",
              }}
            >
              Our Beautiful journey
            </motion.h2>

            {/* 3. "begins..." */}
            <motion.strong
              initial={{ opacity: 0, y: 10, letterSpacing: "0.02em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: 0.24, ease: "easeOut" }}
            >
              begins...
            </motion.strong>

            {/* 4. Animated Gold Closing Rule Divider */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
              }}
              className="invitation-footer__closing-rule"
            >
              <motion.span
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                style={{ transformOrigin: "right center" }}
              />
              <motion.i
                variants={{
                  hidden: { scale: 0, rotate: 135, opacity: 0 },
                  visible: { scale: 1, rotate: 45, opacity: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const } },
                }}
              />
              <motion.span
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                style={{ transformOrigin: "left center" }}
              />
            </motion.div>

            {/* 5. Closing Note */}
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
              className="invitation-footer__closing-note"
            >
              With grateful hearts, we thank you
              <br />
              for being part of our celebration.
            </motion.p>

            {/* 6. Closing Signature with Ampersand Bloom */}
            <motion.p
              initial={{ opacity: 0, scale: 0.92, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, delay: 0.48, ease: [0.34, 1.4, 0.64, 1] as const }}
              className="invitation-footer__closing-signature"
            >
              Sanjeevi{" "}
              <motion.i
                initial={{ scale: 0.5, rotate: -25, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.34, 1.56, 0.64, 1] as const }}
                className="inline-block"
              >
                &amp;
              </motion.i>{" "}
              Nila
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.72 }}
                className="invitation-footer__date flex flex-col items-center justify-center gap-1 mt-2.5 sm:mt-3"
              >
                <span className="font-serif-numbers font-bold text-[13px] sm:text-[14px] leading-tight tracking-[0.2em] text-[#8a5b2d]">
                  22
                </span>
                <span className="font-['Cinzel',Georgia,serif] font-bold text-[10.5px] sm:text-[11.5px] leading-tight tracking-[0.22em] text-[#8a5b2d] uppercase">
                  November
                </span>
                <span className="font-serif-numbers font-bold text-[13px] sm:text-[14px] leading-tight tracking-[0.2em] text-[#8a5b2d]">
                  2026
                </span>
              </motion.span>
            </motion.p>
          </div>
        </div>

        {/* 7. Footer Credit with Prominent, Interactive Badge for Nithish */}
        <motion.div
          className="invitation-footer__credit absolute inset-x-0 bottom-0 z-20 pb-3 pt-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center justify-center flex-wrap gap-1.5 text-[11px] sm:text-xs font-semibold text-[#7A4515] tracking-wider uppercase select-none">
            <span>Crafted with</span>
            <motion.span
              className="inline-flex items-center justify-center"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.35, 1.1, 1.4, 1],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 1.6,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-3.5 h-3.5 text-[#B83232] fill-[#B83232] inline-block filter drop-shadow-[0_1px_3px_rgba(184,50,50,0.5)]"
                aria-hidden="true"
              />
            </motion.span>
            <span>by</span>
            <a
              href="https://nithish-portfolio-sigma.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-black text-[#570713] hover:text-[#8B1A24] text-[12px] sm:text-[13px] tracking-widest underline decoration-[#C9A46A] decoration-[1.5px] underline-offset-4 hover:decoration-[#570713] transition-colors duration-200 cursor-pointer ml-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
              title="Visit Nithish's Developer Portfolio"
            >
              <span>NITHISH</span>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-2.5 h-2.5 text-[#966116] group-hover:text-[#8B1A24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              >
                <path d="M3.5 1.5h7v7" />
                <path d="M10.5 1.5L1.5 10.5" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
