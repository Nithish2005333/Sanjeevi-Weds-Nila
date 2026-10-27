"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollHandLottie } from "./ScrollHandLottie";

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

  // States to track auto-scroll lifecycle and provide a scroll indication when stopped
  const [mounted, setMounted] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollStopped, setAutoScrollStopped] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track user manual scrolling activity and bottom-of-page detection
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScrollActivity = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setIsAtBottom(window.scrollY >= maxScroll - 90);

      // If user scrolls manually while auto-scroll is not running, hide the indicator during active swipes
      if (!isAutoScrolling) {
        setIsUserScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsUserScrolling(false);
        }, 650);
      }
    };

    window.addEventListener("scroll", handleScrollActivity, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      clearTimeout(scrollTimeout);
    };
  }, [isAutoScrolling]);

  // Once hero entrance animations finish, smoothly scroll from top to bottom
  // If the user touches or interacts with the screen at any moment, it stops immediately and hands over full manual control
  useEffect(() => {
    if (!isVisible) return;

    let isCancelled = false;
    let animationFrameId: number;
    let lastTime: number | null = null;
    let startTime: number | null = null;
    let currentScrollY = window.scrollY;

    const stopAutoScroll = () => {
      if (!isCancelled) {
        isCancelled = true;
        cancelAnimationFrame(animationFrameId);
        setIsAutoScrolling(false);
        setAutoScrollStopped(true);
      }
    };

    // User takeover events: only real user interactions (touch, drag, wheel, mouse click, keys) stop auto-scroll
    // Using capture: true ensures immediate responsiveness
    const eventOptions: AddEventListenerOptions = { capture: true, passive: true };
    const cancelEvents = [
      "wheel",
      "touchstart",
      "touchmove",
      "mousedown",
      "keydown",
    ] as const;

    cancelEvents.forEach((event) => {
      window.addEventListener(event, stopAutoScroll, eventOptions);
    });

    // Wait until hero entrance animations finish settling (~3.2s) before beginning the slow cinematic scroll
    const startTimer = setTimeout(() => {
      if (isCancelled) return;

      currentScrollY = window.scrollY;
      setIsAutoScrolling(true);
      const targetSpeed = 130; // Brisk, energetic, and smooth auto-scroll pace (~130px/sec)
      const rampUpDuration = 1.2; // 1.2s soft ease-in start

      // Ensure instant scroll updates so browser doesn't fight RAF
      if (typeof document !== "undefined") {
        document.documentElement.style.scrollBehavior = "auto";
        document.body.style.scrollBehavior = "auto";
      }

      const step = (currentTime: number) => {
        if (isCancelled) return;

        if (startTime === null) {
          startTime = currentTime;
          lastTime = currentTime;
          animationFrameId = requestAnimationFrame(step);
          return;
        }

        // Cap deltaTime to 50ms (0.05s) to prevent any frame drops from causing large jumps/lag
        const deltaTime = Math.min((currentTime - (lastTime ?? currentTime)) / 1000, 0.05);
        lastTime = currentTime;

        // Quadratic ease-in ramp over 2.5s: starts ultra-softly (0.5px/s -> 22px/s) with zero sudden jerk
        const elapsed = (currentTime - startTime) / 1000;
        const linearRamp = Math.min(elapsed / rampUpDuration, 1);
        const easeRamp = linearRamp * linearRamp;
        const currentSpeed = targetSpeed * easeRamp;

        currentScrollY += currentSpeed * deltaTime;

        // Calculate dynamic full page height so it seamlessly scrolls through all sections to the end
        const scrollHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        const maxScroll = scrollHeight - window.innerHeight;

        // Only stop when it reaches the true bottom of the full website
        if (maxScroll > 2000 && currentScrollY >= maxScroll - 4) {
          window.scrollTo({ top: maxScroll, behavior: "instant" as ScrollBehavior });
          stopAutoScroll();
          return;
        }

        window.scrollTo({ top: currentScrollY, behavior: "instant" as ScrollBehavior });
        animationFrameId = requestAnimationFrame(step);
      };

      animationFrameId = requestAnimationFrame(step);
    }, 3200);

    return () => {
      clearTimeout(startTimer);
      stopAutoScroll();
      cancelEvents.forEach((event) => {
        window.removeEventListener(event, stopAutoScroll, eventOptions);
      });
    };
  }, [isVisible]);

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
            video.play().catch(() => { });
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

  const showScrollIndicator =
    mounted &&
    isVisible &&
    autoScrollStopped &&
    !isAutoScrolling &&
    !isAtBottom &&
    !isUserScrolling;

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
            src="/assets/sn-monogram.webp"
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
          <span
            style={{ color: "#966116", WebkitTextFillColor: "#966116" }}
            className="font-['Tangerine',cursive] text-[48px] sm:text-[58px] font-bold text-[#966116] leading-[0.95] [text-shadow:0_1px_0_rgba(255,255,255,0.9)] px-3"
          >
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
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", color: "#7A4515", WebkitTextFillColor: "#7A4515" }}
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
              className="text-[32px] sm:text-[40px] font-bold text-[#5C111A] tracking-[0.06em] leading-none inline-flex items-center justify-center select-none maroon-color-lock"
              data-maroon-lock="true"
              style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800, color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
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
                  className="inline-block maroon-color-lock"
                  data-maroon-lock="true"
                  style={{
                    transformOrigin: "bottom center",
                    color: "#5C111A",
                    WebkitTextFillColor: "#5C111A",
                    forcedColorAdjust: "none",
                    textShadow:
                      "0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 6px rgba(92, 17, 26, 0.2), 0 4px 14px rgba(92, 17, 26, 0.12)",
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
              style={{ color: "#A8742A", WebkitTextFillColor: "#A8742A" }}
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
              className="text-[32px] sm:text-[40px] font-bold text-[#5C111A] tracking-[0.06em] leading-none inline-flex items-center justify-center select-none maroon-color-lock"
              data-maroon-lock="true"
              style={{ fontFamily: "'SilianRail', Georgia, serif", perspective: 800, color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
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
                  className="inline-block maroon-color-lock"
                  data-maroon-lock="true"
                  style={{
                    transformOrigin: "bottom center",
                    color: "#5C111A",
                    WebkitTextFillColor: "#5C111A",
                    forcedColorAdjust: "none",
                    textShadow:
                      "0 1px 0 rgba(255, 255, 255, 0.9), 0 2px 6px rgba(92, 17, 26, 0.2), 0 4px 14px rgba(92, 17, 26, 0.12)",
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
            <p
              data-maroon-lock="true"
              style={{ color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
              className="font-['Cinzel',Georgia,serif] text-[13.5px] sm:text-[15px] font-extrabold text-[#5C111A] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.9)] maroon-color-lock"
            >
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
                    data-maroon-lock="true"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
                    className="w-full text-center font-['Cinzel',Georgia,serif] text-[12px] sm:text-[13.5px] font-extrabold tracking-[0.18em] text-[#5C111A] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.9)] maroon-color-lock"
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
                    data-maroon-lock="true"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
                    className="w-full text-center font-['Cinzel',Georgia,serif] text-[46px] sm:text-[54px] font-black text-[#5C111A] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)] whitespace-nowrap px-1 maroon-color-lock"
                  >
                    {isReception ? "22" : "20"}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column: AT 9:15 / 11:30 AM — Mask reveal expanding outward to RIGHT from center */}
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
              <div className="relative overflow-hidden h-8 w-full flex items-center justify-center [perspective:500px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={isReception ? "reception-time" : "wedding-time"}
                    initial={{ y: 20, rotateX: 55, opacity: 0, filter: "blur(3px)" }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, rotateX: -55, opacity: 0, filter: "blur(3px)" }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    data-maroon-lock="true"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
                    className="w-full text-center font-['Cinzel',Georgia,serif] text-[12px] sm:text-[13.5px] font-extrabold tracking-[0.14em] text-[#5C111A] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.9)] maroon-color-lock"
                  >
                    AT <span className="font-['Cinzel',Georgia,serif] font-black maroon-color-lock" data-maroon-lock="true" style={{ color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}>{isReception ? "11:30" : "9:15"}</span> AM
                  </motion.span>
                </AnimatePresence>
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

          {/* Year: 2 0 2 6 */}
          <motion.div
            className="w-full flex items-center justify-center mt-3 sm:mt-4.5"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 10, filter: "blur(3px)" }
            }
            transition={{ duration: 0.65, delay: 1.95, ease: "easeOut" }}
          >
            <p
              data-maroon-lock="true"
              style={{ color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
              className="font-['Cinzel',Georgia,serif] text-[14px] sm:text-[17px] font-extrabold text-[#5C111A] tracking-[0.45em] [text-shadow:0_1px_0_rgba(255,255,255,0.9)] maroon-color-lock"
            >
              2 0 2 6
            </p>
          </motion.div>
        </div>
      </header>



      {/* Floating scroll indication when user stops scrolling — clean frameless hand animation with simple scroll text */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => {
                  window.scrollBy({ top: 380, behavior: "smooth" });
                }}
                aria-label="Scroll down to continue reading invitation"
                className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 cursor-pointer select-none group pointer-events-auto transition-transform hover:scale-105 active:scale-95"
              >
                <ScrollHandLottie className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center drop-shadow-[0_1.5px_3px_rgba(255,255,255,0.95)]" />
                <span
                  data-maroon-lock="true"
                  style={{ color: "#5C111A", WebkitTextFillColor: "#5C111A", isolation: "isolate", forcedColorAdjust: "none" }}
                  className="font-['Cinzel',Georgia,serif] text-[12px] sm:text-[13px] font-extrabold tracking-[0.22em] uppercase text-[#5C111A] drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)] transition-colors group-hover:text-[#6E0E18] maroon-color-lock"
                >
                  Scroll
                </span>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};


