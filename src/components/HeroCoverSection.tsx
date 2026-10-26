"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCoverSectionProps {
  isVisible?: boolean;
}

export const HeroCoverSection: React.FC<HeroCoverSectionProps> = ({
  isVisible = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Toggle between Wedding (Nov 20, Friday) and Reception (Nov 22, Sunday)
  const [isReception, setIsReception] = useState(false);

  // Background video starts playing ONLY AFTER the hero section is opened / revealed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was interrupted
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isVisible]);

  // Pause video when scrolled out of viewport to save resources; resume when scrolled back into view
  useEffect(() => {
    if (!isVisible || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    // Allow the entrance animation to finish and breathe before starting toggle
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setIsReception((prev) => !prev);
      interval = setInterval(() => {
        setIsReception((prev) => !prev);
      }, 4200);
    }, 4500);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);
  return (
    <section
      ref={sectionRef}
      className="invitation-hero relative overflow-hidden flex flex-col items-center justify-start min-h-screen w-full pt-4 pb-8 px-4 select-none"
      aria-label="Wedding invitation for Sanjeevi and Nila"
    >
      {/* Background Video: Full-bleed stretching video, starts only after opening */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          src="/assets/hero-bg-video.mp4"
        />
        {/* Delicate warm parchment wash to blend softly with page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF4E8]/20 via-transparent to-[#FBF4E8]/15 pointer-events-none" />
      </div>

      {/* Header Overlay — Content laid out in open parchment space between golden arch and deities */}
      <header className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center pt-4 sm:pt-7">
        {/* Monogram Logo under Top Golden Arch */}
        <motion.div
          className="flex flex-col items-center mb-2.5 sm:mb-4"
          initial={{ opacity: 0, y: -20, scale: 0.85, filter: "blur(6px)" }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: -20, scale: 0.85, filter: "blur(6px)" }
          }
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/sn-monogram.png"
            alt="Sanjeevi and Nila Monogram"
            className="h-11 sm:h-13 w-auto object-contain [filter:drop-shadow(0_2px_4px_rgba(87,7,19,0.25))]"
            loading="eager"
          />
        </motion.div>

        {/* Invitation Eyebrow: "You're Invited for the wedding / reception of" */}
        <motion.div
          className="flex flex-col items-center text-center mb-3.5 sm:mb-5"
          initial={{ opacity: 0, y: -14, filter: "blur(4px)" }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -14, filter: "blur(4px)" }
          }
          transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-['Tangerine',cursive] text-[48px] sm:text-[58px] font-bold text-[#966116] leading-[0.95] [text-shadow:0_1px_0_rgba(255,255,255,0.9)] px-3">
            You&apos;re Invited
          </span>
          <div className="relative overflow-hidden h-6 sm:h-7 w-full flex items-center justify-center mt-2.5 sm:mt-3 [perspective:500px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isReception ? "reception" : "wedding"}
                initial={{ y: 20, rotateX: 55, opacity: 0, filter: "blur(3px)" }}
                animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, rotateX: -55, opacity: 0, filter: "blur(3px)" }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                className="w-full text-center font-['Cinzel',Georgia,serif] text-[10.5px] sm:text-[12px] font-bold tracking-[0.28em] text-[#7A4515] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.9)]"
              >
                {isReception ? "FOR THE RECEPTION OF" : "FOR THE WEDDING OF"}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Names Block (Matching Opening Page: 3D perspective letter roll & SilianRail) */}
        <div className="w-full max-w-[320px] sm:max-w-[360px] mx-auto flex flex-col mt-2 sm:mt-3.5 mb-2.5 relative">
          {/* Groom: Sanjeevi (Letter-by-Letter 3D Reveal like Opening Page) */}
          <div className="w-full flex justify-center items-center">
            <motion.h1
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.045,
                    delayChildren: 0.45,
                  },
                },
              }}
              className="text-[32px] sm:text-[40px] font-bold text-[#570713] tracking-[0.06em] leading-none inline-flex items-center justify-center select-none"
              style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800 }}
            >
              {"Sanjeevi".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 18,
                      rotateX: -55,
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
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="inline-block"
                  style={{
                    transformOrigin: "bottom center",
                    textShadow:
                      "0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 6px rgba(87, 7, 19, 0.2), 0 4px 14px rgba(87, 7, 19, 0.12)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Golden Script Ampersand (Centered Connector with Baby Lovely font) */}
          <div className="w-full flex items-center justify-center my-2 sm:my-3 z-10">
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: -25, filter: "blur(4px)" }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.5, rotate: -25, filter: "blur(4px)" }
              }
              transition={{ duration: 0.65, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              className="font-['BabyLovely',cursive] text-3xl sm:text-4xl text-[#A8742A] font-normal leading-none select-none px-2 italic [text-shadow:0_1px_0_rgba(255,255,255,0.9)]"
            >
              &amp;
            </motion.span>
          </div>

          {/* Bride: Nila (Letter-by-Letter 3D Reveal like Opening Page) */}
          <div className="w-full flex justify-center items-center">
            <motion.h2
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.055,
                    delayChildren: 0.95,
                  },
                },
              }}
              className="text-[32px] sm:text-[40px] font-bold text-[#570713] tracking-[0.06em] leading-none inline-flex items-center justify-center select-none"
              style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800 }}
            >
              {"Nila".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 18,
                      rotateX: -55,
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
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="inline-block"
                  style={{
                    transformOrigin: "bottom center",
                    textShadow:
                      "0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 6px rgba(87, 7, 19, 0.2), 0 4px 14px rgba(87, 7, 19, 0.12)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Elegant Star Divider Rule expanding symmetrically from center */}
          <div className="w-full max-w-[240px] sm:max-w-[280px] mx-auto flex items-center justify-center gap-3 mt-5 sm:mt-6 mb-3 sm:mb-4">
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isVisible ? { scaleX: 1, opacity: 0.95 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.65, delay: 1.25, ease: "easeOut" }}
              style={{ transformOrigin: "right center" }}
              className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={isVisible ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.5, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#966116] text-[11px] leading-none"
            >
              ✦
            </motion.span>
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isVisible ? { scaleX: 1, opacity: 0.95 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.65, delay: 1.25, ease: "easeOut" }}
              style={{ transformOrigin: "left center" }}
              className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]"
            />
          </div>

          {/* Month: NOVEMBER */}
          <motion.div
            className="w-full flex justify-center text-center my-2 sm:my-3"
            initial={{ opacity: 0, y: 8, letterSpacing: "0.22em", filter: "blur(3px)" }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, letterSpacing: "0.34em", filter: "blur(0px)" }
                : { opacity: 0, y: 8, letterSpacing: "0.22em", filter: "blur(3px)" }
            }
            transition={{ duration: 0.65, delay: 1.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-['Cinzel',Georgia,serif] text-[13.5px] sm:text-[15px] font-extrabold text-[#4A0710] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
              NOVEMBER
            </p>
          </motion.div>

          {/* Date Row Box: Mask reveal expanding left and right from center */}
          <div className="w-full max-w-[315px] sm:max-w-[355px] mx-auto flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-5">
            {/* Left Column: FRIDAY / SUNDAY — Mask reveal expanding outward to LEFT from center */}
            <motion.div
              initial={{
                clipPath: "inset(-20% 0% -20% 100%)",
                opacity: 0,
                x: 14,
              }}
              animate={
                isVisible
                  ? {
                      clipPath: "inset(-20% 0% -20% 0%)",
                      opacity: 1,
                      x: 0,
                    }
                  : {
                      clipPath: "inset(-20% 0% -20% 100%)",
                      opacity: 0,
                      x: 14,
                    }
              }
              transition={{
                duration: 0.75,
                delay: 1.68,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.75, delay: 1.68, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "right center" }}
                className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#A8742A] to-[#A8742A]/85 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
              />
              <div className="relative overflow-hidden h-8 w-full flex items-center justify-center [perspective:500px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={isReception ? "sunday" : "friday"}
                    initial={{ y: 20, rotateX: 55, opacity: 0, filter: "blur(3px)" }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, rotateX: -55, opacity: 0, filter: "blur(3px)" }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    className="w-full text-center font-['Cinzel',Georgia,serif] text-[12px] sm:text-[13.5px] font-extrabold tracking-[0.18em] text-[#3D0609] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.9)]"
                  >
                    {isReception ? "SUNDAY" : "FRIDAY"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.75, delay: 1.68, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "right center" }}
                className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#A8742A] to-[#A8742A]/85 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
              />
            </motion.div>

            {/* Center Column: Grand Date Numeral 20 (Wedding) / 22 (Reception) emerging from Center */}
            <div className="shrink-0 relative overflow-y-clip overflow-x-visible h-14 sm:h-16 min-w-[88px] sm:min-w-[104px] px-1 flex items-center justify-center [perspective:600px]">
              {/* Soft Golden Bloom when date enters */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={
                  isVisible
                    ? { opacity: [0, 0.85, 0], scale: [0.4, 1.4, 1.6] }
                    : { opacity: 0, scale: 0.4 }
                }
                transition={{ duration: 0.9, delay: 1.55, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.5)_0%,transparent_70%)] -z-10"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.5, filter: "blur(6px)" }
                }
                transition={{ duration: 0.6, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={isReception ? "22" : "20"}
                    initial={{ y: 30, rotateX: 55, opacity: 0, scale: 0.9, filter: "blur(3px)" }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ y: -30, rotateX: -55, opacity: 0, scale: 0.9, filter: "blur(3px)" }}
                    transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    className="w-full text-center font-['Cinzel',Georgia,serif] text-[46px] sm:text-[54px] font-black text-[#3D0609] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)] whitespace-nowrap px-1"
                  >
                    {isReception ? "22" : "20"}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column: AT 11:30 AM — Mask reveal expanding outward to RIGHT from center */}
            <motion.div
              initial={{
                clipPath: "inset(-20% 100% -20% 0%)",
                opacity: 0,
                x: -14,
              }}
              animate={
                isVisible
                  ? {
                      clipPath: "inset(-20% 0% -20% 0%)",
                      opacity: 1,
                      x: 0,
                    }
                  : {
                      clipPath: "inset(-20% 100% -20% 0%)",
                      opacity: 0,
                      x: -14,
                    }
              }
              transition={{
                duration: 0.75,
                delay: 1.68,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.75, delay: 1.68, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
                className="w-full h-[2px] bg-gradient-to-l from-transparent via-[#A8742A] to-[#A8742A]/85 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
              />
              <div className="h-8 flex items-center justify-center">
                <span className="font-['Cinzel',Georgia,serif] text-[12px] sm:text-[13.5px] font-extrabold tracking-[0.14em] text-[#3D0609] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
                  AT <span className="font-['Cinzel',Georgia,serif] font-black">11:30</span> AM
                </span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.75, delay: 1.68, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
                className="w-full h-[2px] bg-gradient-to-l from-transparent via-[#A8742A] to-[#A8742A]/85 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
              />
            </motion.div>
          </div>

          {/* Year: 2 0 2 6 with generous vertical spacing */}
          <motion.div
            className="w-full flex justify-center text-center mt-3 sm:mt-4.5"
            initial={{ opacity: 0, y: 10, letterSpacing: "0.3em", filter: "blur(3px)" }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, letterSpacing: "0.45em", filter: "blur(0px)" }
                : { opacity: 0, y: 10, letterSpacing: "0.3em", filter: "blur(3px)" }
            }
            transition={{ duration: 0.65, delay: 1.95, ease: "easeOut" }}
          >
            <p className="font-['Cinzel',Georgia,serif] text-[14px] sm:text-[17px] font-extrabold text-[#4A0710] [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
              2 0 2 6
            </p>
          </motion.div>
        </div>
      </header>
    </section>
  );
};


