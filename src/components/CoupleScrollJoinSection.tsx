"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

interface FloatingPetal {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  sway: number;
  rotate: number;
  variant: "gold" | "yellow" | "pink" | "red";
}

// 16 rich petals with vibrant wedding floral colors (yellow marigold, gold, blush lotus, and rose red)
const COUPLE_PETALS: FloatingPetal[] = [
  { id: 1, left: "5%", delay: 0.2, duration: 9.6, size: 10, sway: 14, rotate: 120, variant: "red" },
  { id: 2, left: "12%", delay: 3.5, duration: 10.2, size: 11, sway: -15, rotate: -130, variant: "pink" },
  { id: 3, left: "19%", delay: 1.0, duration: 9.0, size: 12, sway: 16, rotate: 160, variant: "yellow" },
  { id: 4, left: "26%", delay: 4.8, duration: 11.2, size: 9, sway: -12, rotate: -110, variant: "gold" },
  { id: 5, left: "33%", delay: 2.2, duration: 9.8, size: 11, sway: 15, rotate: 140, variant: "pink" },
  { id: 6, left: "40%", delay: 0.6, duration: 10.5, size: 10, sway: -14, rotate: -150, variant: "red" },
  { id: 7, left: "47%", delay: 4.0, duration: 11.0, size: 12, sway: 13, rotate: 130, variant: "yellow" },
  { id: 8, left: "54%", delay: 1.8, duration: 9.4, size: 9, sway: -16, rotate: -120, variant: "pink" },
  { id: 9, left: "61%", delay: 5.2, duration: 10.8, size: 11, sway: 15, rotate: 170, variant: "gold" },
  { id: 10, left: "68%", delay: 2.9, duration: 9.2, size: 12, sway: -13, rotate: -140, variant: "red" },
  { id: 11, left: "75%", delay: 0.4, duration: 10.4, size: 10, sway: 16, rotate: 150, variant: "pink" },
  { id: 12, left: "82%", delay: 3.8, duration: 9.9, size: 11, sway: -15, rotate: -130, variant: "yellow" },
  { id: 13, left: "89%", delay: 1.5, duration: 10.6, size: 9, sway: 12, rotate: 140, variant: "red" },
  { id: 14, left: "95%", delay: 4.5, duration: 11.5, size: 10, sway: -14, rotate: -120, variant: "gold" },
  { id: 15, left: "22%", delay: 6.0, duration: 10.0, size: 10, sway: 14, rotate: 135, variant: "red" },
  { id: 16, left: "70%", delay: 5.6, duration: 9.5, size: 11, sway: -12, rotate: -145, variant: "pink" },
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

const getPetalStroke = (variant: FloatingPetal["variant"]) => {
  switch (variant) {
    case "pink":
      return "#BE185D";
    case "red":
      return "#4C0519";
    case "gold":
      return "#C96D00";
    default:
      return "#E5A100";
  }
};

const getPetalShadow = (variant: FloatingPetal["variant"]) => {
  switch (variant) {
    case "pink":
      return "drop-shadow-[0_1px_3px_rgba(219,39,119,0.28)]";
    case "red":
      return "drop-shadow-[0_1px_3px_rgba(190,18,60,0.32)]";
    default:
      return "drop-shadow-[0_1px_3px_rgba(200,120,20,0.22)]";
  }
};

const CoupleMarigoldPetal: React.FC<{ petal: FloatingPetal }> = ({ petal }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute"
    style={{ left: petal.left }}
    initial={{ top: "-6%", x: 0, rotate: 0, opacity: 0 }}
    animate={{
      top: ["-6%", "106%"],
      x: [0, petal.sway, -petal.sway * 0.7, petal.sway * 0.4, 0],
      rotate: [0, petal.rotate * 0.5, petal.rotate],
      opacity: [0, 0.7, 0.75, 0.6, 0],
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
      className={`filter ${getPetalShadow(petal.variant)}`}
    >
      <path
        d="M10 0C4 8 0 16 0 21C0 25.5 4.5 28 10 28C15.5 28 20 25.5 20 21C20 16 16 8 10 0Z"
        fill={getPetalGradient(petal.variant)}
      />
      <path
        d="M10 4C7 10 4 16 4 20C4 23 7 25 10 25"
        stroke={getPetalStroke(petal.variant)}
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
    </svg>
  </motion.div>
);

interface GoldPaper {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  rotateTarget: number;
  color: string;
  width: number;
  height: number;
}

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

  const [goldPapers, setGoldPapers] = useState<GoldPaper[]>([]);
  const [showCrackers, setShowCrackers] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const hasStartedRef = useRef(false);
  const hasPoppedRef = useRef(false);
  const hasFinishedRef = useRef(false);

  // Trigger gold cracker papers shooting from all 4 corners + canvas confetti
  const triggerGoldCrackers = () => {
    if (hasPoppedRef.current) return;
    hasPoppedRef.current = true;

    // Canvas confetti burst with golden tones
    try {
      confetti({
        particleCount: 65,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#C9A46A", "#D4AF37", "#FFD700", "#F3E5AB", "#FFE8A3", "#E6C280"],
      });
    } catch (e) {
      // fallback if canvas not available
    }

    const shadesOfGold = [
      "#C9A46A",
      "#D4AF37",
      "#FFD700",
      "#F3E5AB",
      "#FFE8A3",
      "#E6C280",
    ];
    const corners = [
      { x: -180, y: -240, baseAngle: Math.PI / 4 }, // Top Left
      { x: 180, y: -240, baseAngle: (3 * Math.PI) / 4 }, // Top Right
      { x: -180, y: 240, baseAngle: -Math.PI / 4 }, // Bottom Left
      { x: 180, y: 240, baseAngle: (-3 * Math.PI) / 4 }, // Bottom Right
    ];

    const papers: GoldPaper[] = [];
    let idCounter = 0;

    corners.forEach((corner) => {
      for (let i = 0; i < 15; i++) {
        const spreadAngle = corner.baseAngle + (Math.random() * 0.8 - 0.4);
        const distance = 130 + Math.random() * 200;

        papers.push({
          id: idCounter++ + Date.now(),
          startX: corner.x,
          startY: corner.y,
          targetX: corner.x + Math.cos(spreadAngle) * distance,
          targetY: corner.y + Math.sin(spreadAngle) * distance + (50 + Math.random() * 80),
          rotateTarget: Math.random() * 1080 - 540,
          color: shadesOfGold[Math.floor(Math.random() * shadesOfGold.length)],
          width: 8 + Math.random() * 6,
          height: 4 + Math.random() * 3,
        });
      }
    });

    setGoldPapers(papers);
    setShowCrackers(true);

    setTimeout(() => {
      setShowCrackers(false);
    }, 2200);
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

    // If animation has already completed in this session, keep joined forever
    if (hasFinishedRef.current) {
      const elementsToHide = [groomRef.current, brideRef.current].filter(Boolean);
      if (elementsToHide.length > 0) {
        gsap.set(elementsToHide, { opacity: 0 });
      }
      if (coupleRef.current) {
        gsap.set(coupleRef.current, { scale: 1, opacity: 1 });
      }
      setIsJoined(true);
      onJoinComplete?.();
      return;
    }

    // 1. Initialize GSAP positions
    if (groomRef.current) gsap.set(groomRef.current, { xPercent: -105, opacity: 0 });
    if (brideRef.current) gsap.set(brideRef.current, { xPercent: 105, opacity: 0 });
    if (coupleRef.current) gsap.set(coupleRef.current, { scale: 0.9, opacity: 0 });
    if (flashRef.current) gsap.set(flashRef.current, { opacity: 0 });

    const playJoinAnimation = () => {
      if (hasStartedRef.current || hasFinishedRef.current) return;
      hasStartedRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          hasFinishedRef.current = true;
          setIsJoined(true);
          const elementsToHide = [groomRef.current, brideRef.current].filter(Boolean);
          if (elementsToHide.length > 0) {
            gsap.set(elementsToHide, { opacity: 0 });
          }
          if (coupleRef.current) {
            gsap.set(coupleRef.current, { scale: 1, opacity: 1 });
          }
          onJoinComplete?.();
        },
      });

      // Step A: Slide Groom & Bride in from sides (0s -> 0.85s)
      tl.to(
        groomRef.current,
        { xPercent: 0, opacity: 1, duration: 0.85, ease: "power2.out" },
        0
      ).to(
        brideRef.current,
        { xPercent: 0, opacity: 1, duration: 0.85, ease: "power2.out" },
        0
      );

      // Step B: Morph transition (Groom & Bride fade out, white flash pops, Couple zooms in) (0.85s -> 1.45s)
      tl.to(
        [groomRef.current, brideRef.current],
        { opacity: 0, duration: 0.4, ease: "power1.inOut" },
        0.85
      )
        .to(
          coupleRef.current,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
          0.85
        )
        .to(
          flashRef.current,
          { opacity: 0.65, duration: 0.15, ease: "power1.out" },
          0.85
        )
        .to(
          flashRef.current,
          { opacity: 0, duration: 0.35, ease: "power1.in" },
          1.0
        );

      // Trigger golden confetti burst exactly at the joining point (0.85s)
      tl.call(() => {
        triggerGoldCrackers();
      }, [], 0.85);
    };

    // Trigger join animation ONLY when the couple image is at least 75% in screen view
    const target = stageContainerRef.current || imagesStageRef.current || sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            (entry.isIntersecting && entry.intersectionRatio >= 0.75) ||
            entry.boundingClientRect.bottom < window.innerHeight * 0.4
          ) {
            playJoinAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: [0.75] }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onJoinComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#FAF6F0] overflow-hidden select-none px-4 pt-16 sm:pt-20 pb-8"
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

      {/* Ornate Indian Wedding Mandap Invitation Background with Carved Pillars & Lamps */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top pointer-events-none opacity-95"
        style={{ backgroundImage: `url('/assets/mandap_invitation_bg.webp')` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF6F0]/60 via-transparent to-[#FAF6F0]/75 pointer-events-none" />

      {/* Decorative Circular Mandapam Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-repeat bg-[size:100px_100px]"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="%236B4B3E" stroke-width="1" fill="none"/></svg>')`,
        }}
      />

      {/* Header Eyebrow Title with elegant scroll reveal */}
      <div className="relative z-10 text-center mb-4 mt-2.5 sm:mt-3">
        <motion.span
          initial={{ opacity: 0, y: -6, letterSpacing: "0.18em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-sharp-sans text-[10px] sm:text-xs font-bold uppercase text-[#853119] block mb-1"
        >
          Together in Love &amp; Blessings
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14, scale: 0.94, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-odstemplik text-2xl sm:text-3xl font-bold text-[#2B120B] tracking-wide"
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

      {/* Frame Container for Groom & Bride Scroll Join Stage */}
      <div
        ref={stageContainerRef}
        className="relative w-full max-w-sm h-[480px] sm:h-[520px] overflow-hidden flex items-center justify-center"
      >
        {/* White camera flash layer for the morph transition */}
        <div
          ref={flashRef}
          className="absolute inset-0 bg-white z-40 pointer-events-none mix-blend-overlay"
        />

        {/* Cinematic Images Stage */}
        <div
          ref={imagesStageRef}
          className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden"
        >
          {/* Groom Full Vertical Image (Left Half) */}
          <div
            ref={groomRef}
            className="absolute top-0 left-0 w-[51%] h-full overflow-hidden flex items-center justify-center"
          >
            <img
              src="/groom.webp"
              alt="Sanjeevi - Groom"
              className="w-full h-full object-cover object-center filter drop-shadow-[0_4px_16px_rgba(43,18,11,0.2)]"
            />
          </div>

          {/* Bride Full Vertical Image (Right Half) */}
          <div
            ref={brideRef}
            className="absolute top-0 right-0 w-[51%] h-full overflow-hidden flex items-center justify-center"
          >
            <img
              src="/bride.webp"
              alt="Nila - Bride"
              className="w-full h-full object-cover object-center filter drop-shadow-[0_4px_16px_rgba(43,18,11,0.2)]"
            />
          </div>

          {/* Couple Full Overlay Image (Joined Hand-in-Hand with serene floating effect) */}
          <div
            ref={coupleRef}
            className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center"
          >
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={
                isJoined && !shouldReduceMotion
                  ? {
                      y: [-4, 4, -4],
                      rotate: [-0.3, 0.3, -0.3],
                      scale: [1, 1.008, 1],
                    }
                  : { y: 0, rotate: 0, scale: 1 }
              }
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/couple.webp"
                alt="Sanjeevi & Nila"
                className="w-full h-full object-cover object-center filter drop-shadow-[0_6px_24px_rgba(43,18,11,0.3)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Gold Cracker Confetti papers overlay */}
        <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
          <AnimatePresence>
            {showCrackers &&
              goldPapers.map((paper) => (
                <motion.div
                  key={paper.id}
                  initial={{
                    opacity: 1,
                    scale: 0.1,
                    x: paper.startX,
                    y: paper.startY,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0.1, 1.25, 0.6],
                    x: paper.targetX,
                    y: paper.targetY,
                    rotate: paper.rotateTarget,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    ease: "easeOut",
                  }}
                  className="absolute rounded-sm"
                  style={{
                    backgroundColor: paper.color,
                    width: paper.width,
                    height: paper.height,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Auspicious Blessing Tag */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 text-center mt-3 max-w-xs"
      >
        <p className="font-serif italic text-xs text-[#5C1A22] leading-relaxed">
          “Two souls with but a single thought, two hearts that beat as one.”
        </p>
      </motion.div>
    </section>
  );
};
