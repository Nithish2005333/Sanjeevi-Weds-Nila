"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

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
      {/* Traditional Temple Arch Mandapam Backdrop with Hanging Bells & Garlands */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top opacity-75 pointer-events-none"
        style={{ backgroundImage: `url('/assets/couple_section_bg.webp')` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF6F0]/80 via-transparent to-[#FAF6F0]/90 pointer-events-none" />

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

          {/* Couple Full Overlay Image (Joined Hand-in-Hand) */}
          <div
            ref={coupleRef}
            className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center"
          >
            <img
              src="/couple.webp"
              alt="Sanjeevi & Nila"
              className="w-full h-full object-cover object-center filter drop-shadow-[0_6px_24px_rgba(43,18,11,0.3)]"
            />
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
