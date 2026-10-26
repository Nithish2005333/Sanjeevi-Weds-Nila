"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SplashEnvelopeModalProps {
  showSplash: boolean;
  onOpening: () => void;
  onHeroReveal?: () => void;
  onInteractionReady: () => void;
  onOpen: () => void;
}

export const SplashEnvelopeModal: React.FC<SplashEnvelopeModalProps> = ({
  showSplash,
  onOpening,
  onHeroReveal,
  onInteractionReady,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    onOpening();

    // Staggered sequence for smooth handoff to hero section
    setTimeout(() => {
      onInteractionReady();
    }, 400);

    setTimeout(() => {
      if (onHeroReveal) {
        onHeroReveal();
      }
    }, 700);

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-hidden bg-[#1A100B] select-none"
        >
          {/* Main Mobile Frame Shell */}
          <div className="relative w-full h-full max-w-md mx-auto flex flex-col justify-between items-center bg-[#1A100B] overflow-hidden shadow-2xl">
            {/* Background Picture with Zoom Out Scale Effect on Open */}
            <motion.picture
              initial={{ scale: 1, opacity: 1 }}
              animate={isOpening ? { scale: 1.18, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            >
              <img
                src="/assets/splash.webp"
                alt="Wedding Archway Cover"
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
                loading="eager"
              />
            </motion.picture>

            {/* Top Monogram Logo and Names Block (Moved down gracefully to frame inside arch portal with increased vertical gap) */}
            <div className="relative z-10 w-full pt-[172px] sm:pt-[190px] px-6 flex flex-col items-center text-center max-w-sm mx-auto gap-5 sm:gap-6">
              {/* Intertwined Gold Monogram Logo */}
              <motion.img
                initial={{ opacity: 0, y: -18, scale: 0.85, filter: "blur(6px)" }}
                animate={
                  isOpening
                    ? { opacity: 0, y: -20, scale: 0.9 }
                    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                src="/assets/sn-monogram.webp"
                alt="Monogram Logo"
                className="h-11 sm:h-13 w-auto object-contain"
                style={{
                  filter:
                    "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 14px rgba(255, 235, 185, 0.85)) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.9))",
                }}
              />

              {/* Sanjeevi Weds Nila with Unique Letter-by-Letter 3D Reveal */}
              <motion.div
                animate={
                  isOpening
                    ? { opacity: 0, y: -25, scale: 0.95 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                className="flex flex-col items-center text-center gap-2 sm:gap-3"
              >
                {/* Groom: Sanjeevi Letter-by-Letter Reveal */}
                <motion.h1
                  initial="hidden"
                  animate={isOpening ? "hidden" : "visible"}
                  custom={0.3}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: (delay = 0.3) => ({
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.045,
                        delayChildren: delay,
                      },
                    }),
                  }}
                  className="text-[2.15rem] sm:text-[2.6rem] font-bold text-[#570713] tracking-normal leading-none inline-flex items-center justify-center select-none"
                  style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800 }}
                >
                  {"Sanjeevi".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 16,
                          rotateX: -50,
                          scale: 0.8,
                          filter: "blur(5px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="inline-block"
                      style={{
                        textShadow:
                          "0 3px 8px rgba(0, 0, 0, 0.65), 0 6px 18px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 235, 185, 0.75), 0 1px 1px rgba(255, 248, 230, 0.95)",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Weds Connector with Flourishing Tapered Line Sweep & Script Stagger Reveal */}
                <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-2.5 sm:my-3.5">
                  {/* Left Line: Tapered fine-to-thick (outer tip fades out, inner side thick next to Weds) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isOpening ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.68, ease: "easeOut" }}
                    style={{ transformOrigin: "right center" }}
                    className="flex items-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <svg
                      viewBox="0 0 60 4"
                      className="w-10 sm:w-14 h-[4px] sm:h-[5px] overflow-visible"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="weds-left-taper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7A2218" stopOpacity="0" />
                          <stop offset="35%" stopColor="#7A2218" stopOpacity="0.45" />
                          <stop offset="75%" stopColor="#66111B" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#570713" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 2 Q 32 1.6 57 0.6 C 58.8 0.6 60 1.2 60 2 C 60 2.8 58.8 3.4 57 3.4 Q 32 2.4 0 2 Z"
                        fill="url(#weds-left-taper-grad)"
                      />
                    </svg>
                  </motion.div>

                  {/* Modern Minimal Sans-Serif WEDS Connector - Reduced Horizontal Gaps & Increased Bold */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, y: 4, filter: "blur(3px)" }}
                    animate={
                      isOpening
                        ? { opacity: 0, scale: 0.9, y: 4 }
                        : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                    }
                    transition={{ duration: 0.65, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                    className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] sm:text-[12px] font-bold text-[#570713] uppercase tracking-[0.22em] pl-[0.22em] leading-none select-none px-0.5 inline-block"
                    style={{
                      WebkitTextStroke: "0.2px #570713",
                      textShadow:
                        "0 1px 1px rgba(255, 248, 230, 0.6), 0 2px 6px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    WEDS
                  </motion.span>

                  {/* Right Line: Tapered thick-to-fine (inner side thick next to Weds, outer tip fades out) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isOpening ? { opacity: 0 } : { scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.68, ease: "easeOut" }}
                    style={{ transformOrigin: "left center" }}
                    className="flex items-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <svg
                      viewBox="0 0 60 4"
                      className="w-10 sm:w-14 h-[4px] sm:h-[5px] overflow-visible"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="weds-right-taper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#570713" stopOpacity="1" />
                          <stop offset="25%" stopColor="#66111B" stopOpacity="0.85" />
                          <stop offset="65%" stopColor="#7A2218" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#7A2218" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 60 2 Q 28 1.6 3 0.6 C 1.2 0.6 0 1.2 0 2 C 0 2.8 1.2 3.4 3 3.4 Q 28 2.4 60 2 Z"
                        fill="url(#weds-right-taper-grad)"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Bride: Nila Letter-by-Letter Reveal */}
                <motion.h2
                  initial="hidden"
                  animate={isOpening ? "hidden" : "visible"}
                  custom={0.96}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: (delay = 0.96) => ({
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.055,
                        delayChildren: delay,
                      },
                    }),
                  }}
                  className="text-[2.15rem] sm:text-[2.6rem] font-bold text-[#570713] tracking-normal leading-none inline-flex items-center justify-center select-none"
                  style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800 }}
                >
                  {"Nila".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 16,
                          rotateX: -50,
                          scale: 0.8,
                          filter: "blur(5px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="inline-block"
                      style={{
                        textShadow:
                          "0 3px 8px rgba(0, 0, 0, 0.65), 0 6px 18px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 235, 185, 0.75), 0 1px 1px rgba(255, 248, 230, 0.95)",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h2>
              </motion.div>
            </div>

            {/* Bottom Date, Location and TAP TO OPEN INVITATION Button (enlarged text and button) */}
            <motion.div
              animate={isOpening ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              className="relative z-20 mb-8 sm:mb-10 w-full px-6 flex flex-col items-center justify-center space-y-3.5 text-center"
            >
              <div className="space-y-1.5">
                <p className="font-cinzel text-[13px] sm:text-[15px] font-bold text-[#FFE8B2] tracking-[0.24em] uppercase drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]">
                  <span className="font-serif-numbers font-bold">22</span> NOVEMBER <span className="font-serif-numbers font-bold">2026</span>
                </p>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] sm:text-[13px] font-medium text-[#FFFDF7] tracking-wide drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.85)]">
                  Malaiamman Marriage Hall, Dalavapalayam, Karur
                </p>
              </div>

              {/* Animated Sleek Button (Enlarged size for effortless tap + shimmer) */}
              <motion.button
                type="button"
                onClick={handleOpen}
                animate={
                  isOpening
                    ? { scale: 0.95, opacity: 0 }
                    : {
                      scale: [1, 1.025, 1],
                      boxShadow: [
                        "0 4px 18px rgba(0,0,0,0.45), 0 0 0 0 rgba(255,232,178,0.3)",
                        "0 6px 24px rgba(0,0,0,0.6), 0 0 18px 4px rgba(255,215,0,0.5)",
                        "0 4px 18px rgba(0,0,0,0.45), 0 0 0 0 rgba(255,232,178,0.3)",
                      ],
                    }
                }
                transition={
                  isOpening
                    ? { duration: 0.3 }
                    : {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                }
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 6px 28px rgba(0,0,0,0.65), 0 0 22px 5px rgba(255,215,0,0.65)",
                }}
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden w-full max-w-[270px] sm:max-w-[295px] py-3.5 sm:py-4 px-5 sm:px-6 rounded-full bg-[#1A100B]/80 backdrop-blur-md border border-[#FFE8B2]/90 hover:bg-[#1A100B]/90 hover:border-[#FFD700] transition-colors cursor-pointer flex items-center justify-center group select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Subtle light shimmer sweep animation across button */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFE8B2]/30 to-transparent skew-x-12 pointer-events-none"
                  animate={{
                    x: ["-140%", "280%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                    repeatDelay: 1.2,
                  }}
                />

                <span className="relative z-10 font-serif text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#FFFDF7] uppercase group-hover:text-[#FFD700] transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-center">
                  TAP TO OPEN INVITATION
                </span>
              </motion.button>
            </motion.div>

            {/* Radial Burst Opening Transition Effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isOpening
                  ? { scale: [0, 2.8], opacity: [0, 0.95, 0] }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              style={{ top: "85%", transformOrigin: "center center" }}
              className="absolute w-72 h-72 rounded-full pointer-events-none z-20 bg-radial from-[#FFF5E4] via-[#C9A46A]/70 to-transparent blur-md"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
