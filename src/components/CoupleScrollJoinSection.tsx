"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import confetti from "canvas-confetti";

interface FloatingPetal {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  scale: number;
  sway: number;
  rotate: number;
  flipSpeed: number;
  shape: "rose" | "lotus";
  variant: "gold" | "yellow" | "pink" | "red";
}

// 22 realistic falling flower petals with varied 3D tumble, natural sways, and depths
const COUPLE_PETALS: FloatingPetal[] = [
  { id: 1, left: "4%", delay: 0.2, duration: 8.8, size: 14, scale: 1.15, sway: 24, rotate: 140, flipSpeed: 1.5, shape: "rose", variant: "red" },
  { id: 2, left: "10%", delay: 3.2, duration: 9.8, size: 12, scale: 0.95, sway: -22, rotate: -160, flipSpeed: 2.0, shape: "lotus", variant: "pink" },
  { id: 3, left: "16%", delay: 1.1, duration: 8.4, size: 15, scale: 1.2, sway: 26, rotate: 180, flipSpeed: 1.2, shape: "rose", variant: "yellow" },
  { id: 4, left: "23%", delay: 4.6, duration: 10.4, size: 11, scale: 0.88, sway: -18, rotate: -130, flipSpeed: 2.2, shape: "lotus", variant: "gold" },
  { id: 5, left: "29%", delay: 2.0, duration: 9.2, size: 13, scale: 1.05, sway: 22, rotate: 150, flipSpeed: 1.8, shape: "rose", variant: "pink" },
  { id: 6, left: "36%", delay: 0.5, duration: 9.6, size: 14, scale: 1.1, sway: -25, rotate: -190, flipSpeed: 1.4, shape: "rose", variant: "red" },
  { id: 7, left: "43%", delay: 3.8, duration: 10.0, size: 12, scale: 0.92, sway: 20, rotate: 140, flipSpeed: 2.1, shape: "lotus", variant: "yellow" },
  { id: 8, left: "50%", delay: 1.6, duration: 8.9, size: 15, scale: 1.18, sway: -24, rotate: -160, flipSpeed: 1.3, shape: "rose", variant: "pink" },
  { id: 9, left: "57%", delay: 5.0, duration: 10.2, size: 11, scale: 0.85, sway: 19, rotate: 170, flipSpeed: 2.3, shape: "lotus", variant: "gold" },
  { id: 10, left: "64%", delay: 2.7, duration: 8.6, size: 14, scale: 1.12, sway: -23, rotate: -150, flipSpeed: 1.6, shape: "rose", variant: "red" },
  { id: 11, left: "71%", delay: 0.3, duration: 9.5, size: 13, scale: 1.0, sway: 25, rotate: 180, flipSpeed: 1.5, shape: "lotus", variant: "pink" },
  { id: 12, left: "78%", delay: 3.6, duration: 9.1, size: 12, scale: 0.95, sway: -21, rotate: -140, flipSpeed: 1.9, shape: "rose", variant: "yellow" },
  { id: 13, left: "85%", delay: 1.4, duration: 9.9, size: 15, scale: 1.22, sway: 26, rotate: 160, flipSpeed: 1.3, shape: "rose", variant: "red" },
  { id: 14, left: "92%", delay: 4.2, duration: 10.5, size: 11, scale: 0.86, sway: -19, rotate: -130, flipSpeed: 2.4, shape: "lotus", variant: "gold" },
  { id: 15, left: "97%", delay: 2.4, duration: 9.3, size: 13, scale: 1.05, sway: 22, rotate: 155, flipSpeed: 1.7, shape: "rose", variant: "pink" },
  { id: 16, left: "14%", delay: 6.2, duration: 9.0, size: 13, scale: 1.05, sway: -22, rotate: -165, flipSpeed: 1.6, shape: "rose", variant: "red" },
  { id: 17, left: "38%", delay: 5.5, duration: 9.4, size: 14, scale: 1.1, sway: 24, rotate: 175, flipSpeed: 1.4, shape: "lotus", variant: "pink" },
  { id: 18, left: "62%", delay: 6.8, duration: 8.7, size: 12, scale: 0.94, sway: -20, rotate: -145, flipSpeed: 2.0, shape: "rose", variant: "yellow" },
  { id: 19, left: "82%", delay: 5.9, duration: 9.7, size: 14, scale: 1.15, sway: 23, rotate: 165, flipSpeed: 1.5, shape: "rose", variant: "red" },
  { id: 20, left: "48%", delay: 7.2, duration: 9.2, size: 11, scale: 0.9, sway: -21, rotate: -150, flipSpeed: 2.1, shape: "lotus", variant: "gold" },
  { id: 21, left: "25%", delay: 7.8, duration: 8.9, size: 13, scale: 1.08, sway: 25, rotate: 170, flipSpeed: 1.6, shape: "rose", variant: "pink" },
  { id: 22, left: "74%", delay: 8.0, duration: 9.6, size: 12, scale: 0.96, sway: -22, rotate: -160, flipSpeed: 1.8, shape: "lotus", variant: "red" },
];

const getPetalGradient = (variant: FloatingPetal["variant"]) => {
  switch (variant) {
    case "pink":
      return "url(#couple-pink-lotus-grad)";
    case "red":
      return "url(#couple-red-rose-grad)";
    case "gold":
      return "url(#couple-golden-amber-grad)";
    default:
      return "url(#couple-yellow-marigold-grad)";
  }
};

const getPetalShadow = (variant: FloatingPetal["variant"]) => {
  switch (variant) {
    case "pink":
      return "drop-shadow(0 2.5px 5px rgba(219,39,119,0.32))";
    case "red":
      return "drop-shadow(0 2.5px 6px rgba(136,19,55,0.38))";
    case "gold":
      return "drop-shadow(0 2.5px 5px rgba(217,119,6,0.3))";
    default:
      return "drop-shadow(0 2.5px 5px rgba(202,138,4,0.3))";
  }
};

const CoupleMarigoldPetal: React.FC<{ petal: FloatingPetal }> = ({ petal }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute will-change-transform"
    style={{
      left: petal.left,
      perspective: 700,
      transformStyle: "preserve-3d",
    }}
    initial={{ top: "-8%", x: 0, opacity: 0 }}
    animate={{
      top: ["-8%", "108%"],
      x: [
        0,
        petal.sway,
        -petal.sway * 0.85,
        petal.sway * 0.65,
        -petal.sway * 0.4,
        0,
      ],
      rotateZ: [0, petal.rotate * 0.35, -petal.rotate * 0.25, petal.rotate],
      rotateX: [0, 180 * petal.flipSpeed, 360 * petal.flipSpeed, 540 * petal.flipSpeed],
      rotateY: [0, 90 * petal.flipSpeed, 180 * petal.flipSpeed, 270 * petal.flipSpeed, 360 * petal.flipSpeed],
      opacity: [0, 0.85, 0.95, 0.88, 0],
    }}
    transition={{
      duration: petal.duration,
      delay: petal.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <svg
      width={petal.size * petal.scale}
      height={petal.size * 1.34 * petal.scale}
      viewBox="0 0 24 30"
      fill="none"
      className="overflow-visible"
      style={{
        filter: getPetalShadow(petal.variant),
      }}
    >
      {/* Natural Curved Petal Body */}
      {petal.shape === "rose" ? (
        <path
          d="M12 2 C7 2.6 2 7.2 2 15 C2 22 6.8 28 12 29 C17.2 28 22 22 22 15 C22 7.2 17 2.6 12 2 Z"
          fill={getPetalGradient(petal.variant)}
        />
      ) : (
        <path
          d="M12 1 C7.5 6 1.8 13.5 1.8 19.5 C1.8 24.5 6.2 28.5 12 28.5 C17.8 28.5 22.2 24.5 22.2 19.5 C22.2 13.5 16.5 6 12 1 Z"
          fill={getPetalGradient(petal.variant)}
        />
      )}

      {/* Petal Inner Soft Curve / Vein Light Reflection */}
      <path
        d="M12 4.5 C9.5 9.5 6.5 16 6.5 22"
        stroke="rgba(255, 255, 255, 0.42)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Delicate Outer Edge Sheen */}
      <path
        d="M12 2 C16.5 2.6 21.5 7 21.5 15 C21.5 21.5 17 27 12 28.2"
        stroke="rgba(255, 255, 255, 0.28)"
        strokeWidth="0.65"
      />
    </svg>
  </motion.div>
);

interface CoupleScrollJoinSectionProps {
  onJoinComplete?: () => void;
}

export const CoupleScrollJoinSection: React.FC<CoupleScrollJoinSectionProps> = ({
  onJoinComplete,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const brideRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const imagesStageRef = useRef<HTMLDivElement>(null);

  const hasStartedRef = useRef(false);
  const hasPoppedRef = useRef(false);
  const hasFinishedRef = useRef(false);

  // Trigger high-performance multi-cannon golden celebration confetti (zero DOM allocations, 60fps GPU)
  const triggerGoldCrackers = () => {
    if (hasPoppedRef.current) return;
    hasPoppedRef.current = true;

    try {
      // Golden center fountain
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.62 },
        colors: ["#C9A46A", "#D4AF37", "#FFD700", "#F3E5AB", "#FFE8A3", "#E6C280"],
        disableForReducedMotion: true,
      });

      // Left corner golden cannon
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 50,
        origin: { x: 0.12, y: 0.68 },
        colors: ["#C9A46A", "#D4AF37", "#FFD700", "#FFE8A3"],
        disableForReducedMotion: true,
      });

      // Right corner golden cannon
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 50,
        origin: { x: 0.88, y: 0.68 },
        colors: ["#C9A46A", "#D4AF37", "#FFD700", "#FFE8A3"],
        disableForReducedMotion: true,
      });
    } catch (e) {
      // fallback if canvas not available
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      !sectionRef.current ||
      !groomRef.current ||
      !brideRef.current ||
      !coupleRef.current ||
      !flashRef.current ||
      !imagesStageRef.current
    )
      return;

    // 0. Pre-decode images into browser GPU memory ahead of time to eliminate any texture upload hitch
    const predecode = (src: string) => {
      const img = new Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    };
    predecode("/groom.webp");
    predecode("/bride.webp");
    predecode("/couple.webp");

    // If animation has already completed in this session, keep joined forever
    if (hasFinishedRef.current) {
      if (groomRef.current) gsap.set(groomRef.current, { opacity: 0 });
      if (brideRef.current) gsap.set(brideRef.current, { opacity: 0 });
      if (coupleRef.current) gsap.set(coupleRef.current, { scale: 1, opacity: 1 });
      if (flashRef.current) gsap.set(flashRef.current, { opacity: 0 });
      onJoinComplete?.();
      return;
    }

    // 1. Initialize GSAP positions with hardware acceleration forced
    if (groomRef.current) gsap.set(groomRef.current, { xPercent: -105, opacity: 0, force3D: true });
    if (brideRef.current) gsap.set(brideRef.current, { xPercent: 105, opacity: 0, force3D: true });
    if (coupleRef.current) gsap.set(coupleRef.current, { scale: 1, opacity: 0, force3D: true });
    if (flashRef.current) gsap.set(flashRef.current, { opacity: 0, force3D: true });

    const playJoinAnimation = () => {
      if (hasStartedRef.current || hasFinishedRef.current) return;
      hasStartedRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          hasFinishedRef.current = true;
          if (groomRef.current) gsap.set(groomRef.current, { opacity: 0 });
          if (brideRef.current) gsap.set(brideRef.current, { opacity: 0 });
          if (coupleRef.current) gsap.set(coupleRef.current, { scale: 1, opacity: 1 });
          if (flashRef.current) gsap.set(flashRef.current, { opacity: 0 });
          onJoinComplete?.();
        },
      });

      // Step A: Smooth, snappy slide-in of Groom & Bride towards center (0s -> 0.48s)
      tl.to(
        groomRef.current,
        { xPercent: 0, opacity: 1, duration: 0.48, ease: "power2.out" },
        0
      ).to(
        brideRef.current,
        { xPercent: 0, opacity: 1, duration: 0.48, ease: "power2.out" },
        0
      );

      // Step B: Celestial golden flash blooms right as the cards meet (0.38s -> 0.48s)
      tl.to(
        flashRef.current,
        { opacity: 0.92, duration: 0.10, ease: "power1.in" },
        0.38
      );

      // Step C: Instant seamless image swap at the peak of the flash (0.48s)
      // Masked under the radiant glow, eliminating ghosting, stutter, or lag
      tl.set(
        [groomRef.current, brideRef.current],
        { opacity: 0 },
        0.48
      ).set(
        coupleRef.current,
        { opacity: 1, scale: 1 },
        0.48
      );

      // Step D: Trigger golden confetti burst exactly at the union (0.48s)
      tl.call(() => {
        triggerGoldCrackers();
      }, [], 0.48);

      // Step E: Radiant flash smoothly dissolves away (0.48s -> 0.72s), revealing the united couple
      tl.to(
        flashRef.current,
        { opacity: 0, duration: 0.24, ease: "power2.out" },
        0.48
      );
    };

    // Trigger join animation when the couple section scrolls into view
    const target = stageContainerRef.current || imagesStageRef.current || sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            (entry.isIntersecting && entry.intersectionRatio >= 0.5) ||
            entry.boundingClientRect.bottom < window.innerHeight * 0.55
          ) {
            playJoinAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: [0.5] }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onJoinComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#FDF1D3] overflow-hidden select-none px-4 pt-16 sm:pt-20 pb-8"
      aria-label="Sanjeevi and Nila Couple Section"
    >
      {/* Shared SVG Gradients for Couple Section Petals (Yellow, Gold, Pink, Red) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="couple-yellow-marigold-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF275" />
            <stop offset="0.35" stopColor="#FFD54F" />
            <stop offset="0.75" stopColor="#FFB300" />
            <stop offset="1" stopColor="#F57C00" />
          </linearGradient>
          <linearGradient id="couple-golden-amber-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE082" />
            <stop offset="0.4" stopColor="#FFB74D" />
            <stop offset="0.8" stopColor="#FB8C00" />
            <stop offset="1" stopColor="#E65100" />
          </linearGradient>
          <linearGradient id="couple-pink-lotus-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF0F5" />
            <stop offset="0.3" stopColor="#FBCFE8" />
            <stop offset="0.7" stopColor="#F472B6" />
            <stop offset="1" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="couple-red-rose-grad" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDA4AF" />
            <stop offset="0.35" stopColor="#F43F5E" />
            <stop offset="0.75" stopColor="#BE123C" />
            <stop offset="1" stopColor="#881337" />
          </linearGradient>
        </defs>
      </svg>

      {/* Falling Floral Petals overlay across entire couple section (Yellow, Gold, Pink & Red) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
          {COUPLE_PETALS.map((petal) => (
            <CoupleMarigoldPetal key={petal.id} petal={petal} />
          ))}
        </div>
      )}

      {/* Ornate Indian Wedding Mandap Invitation Background with Carved Pillars & Lamps - 100% Fully Visible */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top pointer-events-none opacity-100"
        style={{
          backgroundImage: `url('/assets/mandap_invitation_bg.webp')`,
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 1.5%, black 3%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 1.5%, black 3%, black 100%)",
        }}
      />

      {/* Seamless Top Match Color: Exactly matching the above celebration scene's golden paper tone (#FDF1D3) */}
      <div
        className="absolute top-0 inset-x-0 h-8 sm:h-10 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #FDF1D3 0%, rgba(253, 241, 211, 0.8) 35%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Header Eyebrow Title with elegant scroll reveal */}
      <div className="relative z-10 text-center mb-3.5 mt-2.5 sm:mt-3">
        <motion.span
          initial={{ opacity: 0, y: -6, letterSpacing: "0.18em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-sharp-sans text-[11.5px] sm:text-[13px] font-bold uppercase text-[#853119] block mb-1"
        >
          Together in Love &amp; Blessings
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14, scale: 0.94, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-odstemplik text-[27px] sm:text-[33px] font-bold text-[#2B120B] tracking-wide"
        >
          An Eternal Union
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A46A] to-transparent mx-auto mt-2 origin-center"
        />
      </div>

      {/* Frame Container for Groom & Bride Scroll Join Stage - Sized up nicely for comfortable prominence */}
      <div
        ref={stageContainerRef}
        className="relative w-full max-w-[305px] sm:max-w-[330px] h-[405px] sm:h-[435px] overflow-hidden flex items-center justify-center"
      >
        {/* Radiant golden-white flash layer for seamless morph transition */}
        <div
          ref={flashRef}
          className="absolute inset-0 z-40 pointer-events-none opacity-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,248,225,0.85) 45%, rgba(201,164,106,0.35) 75%, transparent 100%)",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* Cinematic Images Stage */}
        <div
          ref={imagesStageRef}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden"
        >
          {/* Groom Full Vertical Image (Left Half) */}
          <div
            ref={groomRef}
            className="absolute top-0 left-0 w-[51%] h-full overflow-hidden flex items-center justify-center opacity-0"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            <img
              src="/groom.webp"
              alt="Sanjeevi - Groom"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center filter drop-shadow-[0_2px_8px_rgba(43,18,11,0.08)]"
            />
          </div>

          {/* Bride Full Vertical Image (Right Half) */}
          <div
            ref={brideRef}
            className="absolute top-0 right-0 w-[51%] h-full overflow-hidden flex items-center justify-center opacity-0"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            <img
              src="/bride.webp"
              alt="Nila - Bride"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center filter drop-shadow-[0_2px_8px_rgba(43,18,11,0.08)]"
            />
          </div>

          {/* Couple Full Overlay Image (Joined Hand-in-Hand with smooth GPU floating effect) */}
          <div
            ref={coupleRef}
            className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center opacity-0"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            <div
              className={`w-full h-full flex items-center justify-center ${
                !shouldReduceMotion ? "couple-gentle-float" : ""
              }`}
            >
              <img
                src="/couple.webp"
                alt="Sanjeevi & Nila"
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-center filter drop-shadow-[0_2px_8px_rgba(43,18,11,0.08)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Auspicious Blessing Tag - Royal Temple Parchment Plaque for Crystal Readability (strictly 2 lines) */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-center mt-3 w-fit max-w-[295px] sm:max-w-xs px-2"
      >
        <div className="relative flex flex-col items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#C9A46A]/60 shadow-[0_4px_16px_rgba(43,18,11,0.08),inset_0_0_0_1px_rgba(255,255,255,0.85)]">
          {/* Subtle Golden Ornamental Accent at Top */}
          <div className="flex items-center gap-1.5 mb-1 select-none opacity-85" aria-hidden="true">
            <span className="w-6 h-[0.8px] bg-gradient-to-r from-transparent to-[#C9A46A]" />
            <span className="text-[#96672E] text-[7.5px] leading-none">✦</span>
            <span className="w-6 h-[0.8px] bg-gradient-to-l from-transparent to-[#C9A46A]" />
          </div>

          {/* Strictly 2 lines: crystal-clear quote in deep royal crimson */}
          <p className="font-serif italic text-[11px] min-[360px]:text-[12px] sm:text-[13px] font-semibold text-[#5A0E18] tracking-normal leading-snug text-center drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] select-none">
            <span className="block whitespace-nowrap">“Two souls with but a single thought,</span>
            <span className="block whitespace-nowrap mt-0.5">two hearts that beat as one.”</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};
