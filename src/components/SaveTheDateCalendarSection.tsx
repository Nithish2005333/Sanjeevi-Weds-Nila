"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Auspicious Wedding Muhurtham Target: Friday, 20 Nov 2026, 4:30 AM IST
const WEDDING_TARGET_TIME = new Date("2026-11-20T04:30:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const reveal = (delay = 0, y = 12) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("Sanjeevi & Nila — Royal Wedding & Reception") +
  "&dates=20261120/20261123" +
  "&details=" +
  encodeURIComponent(
    "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila.\n\n" +
      "💍 Wedding Ceremony: Friday, 20 Nov 2026 at Arulmigu Sri Varadharaja Perumal Temple, Karur\n" +
      "🎉 Reception: Sunday, 22 Nov 2026 at Malaiamman Marriage Hall, Karur.\n\n" +
      "Venue: Malaiamman Marriage Hall, Pugalur Main Road, Punjai Thottakurichi, Thalavapalayam, Karur, Tamil Nadu 639113"
  ) +
  "&location=" +
  encodeURIComponent(
    "Malaiamman Marriage Hall, Thalavapalayam, Karur, Tamil Nadu"
  );

const APPLE_CALENDAR_URL =
  "webcal://sanjeeviwedsnila.vercel.app/Sanjeevi-Nila-Dates.ics";

export const SaveTheDateCalendarSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const now = Date.now();
      const difference = WEDDING_TARGET_TIME - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // Direct redirect to native Apple Calendar on iPhone/iPad
      window.location.href = APPLE_CALENDAR_URL;
    } else {
      // Direct redirect to Google Calendar on Android / Mobile (opens native Calendar app)
      window.open(GOOGLE_CALENDAR_URL, "_blank");
    }
  };

  return (
    <div className="relative w-full flex flex-col">
      <section
        id="save-the-date"
        className="relative w-full aspect-[941/1672] overflow-hidden select-none"
        style={{ marginTop: "-16.05%" }}
        aria-label="Save the Date - Sanjeevi & Nila Wedding Calendar"
      >
        {/* 1. Complete Watercolor Calendar Backdrop with shared pond & temple reflection */}
        <img
          src="/assets/watercolor-lotus-wedding-calendar-backdrop.webp"
          alt="Watercolor lotus wedding calendar background"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />

        {/* Screen Reader Semantic Accessibility */}
        <div className="sr-only">
          <h2>Save the Date — November 2026 Calendar</h2>
          <p>Key Wedding Celebrations for Sanjeevi &amp; Nila:</p>
          <ul>
            <li>Friday, 20 November 2026: Wedding Ceremony (திருமணம்)</li>
            <li>Sunday, 22 November 2026: Wedding Reception (திருமண வரவேற்பு)</li>
          </ul>
        </div>

        {/* 2. Top Heading: “SAVE THE DATE” with elegant tracking expansion and blur clearing */}
        <motion.div
          className="absolute inset-x-0 top-[19.8%] -translate-y-1/2 flex justify-center items-center z-10 pointer-events-none px-4"
          initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.12em", filter: "blur(5px)" }}
          whileInView={{ opacity: 1, scale: 1, letterSpacing: "0.24em", filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[27px] font-extrabold tracking-[inherit] text-[#570713] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
            SAVE THE DATE
          </h2>
        </motion.div>

        {/* 3A. Above the Horizontal Gold Lines: Date Numerals & Month (Auspicious Seal Pop & Scale) */}
        <div className="absolute inset-x-[8%] top-[62.0%] h-[12.2%] z-10 grid grid-cols-2 pointer-events-none">
          {/* Left Date: 20 NOV 2026 (Spring seal pop with subtle counter-clockwise tilt) */}
          <motion.div
            className="flex flex-col items-center justify-center text-center pr-3 sm:pr-4 select-none"
            initial={{ opacity: 0, scale: 0.45, rotate: -8, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] as const }}
          >
            <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#B85038] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
              20
            </span>
            <motion.span
              initial={{ opacity: 0, y: 6, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[12.5px] font-bold text-[#B85038] uppercase mt-1 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
            >
              NOV <span className="font-serif-numbers font-bold">2026</span>
            </motion.span>
          </motion.div>

          {/* Right Date: 22 NOV 2026 (Spring seal pop with subtle clockwise tilt) */}
          <motion.div
            className="flex flex-col items-center justify-center text-center pl-3 sm:pl-4 select-none"
            initial={{ opacity: 0, scale: 0.45, rotate: 8, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] as const }}
          >
            <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#4B6647] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
              22
            </span>
            <motion.span
              initial={{ opacity: 0, y: 6, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[12.5px] font-bold text-[#4B6647] uppercase mt-1 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
            >
              NOV <span className="font-serif-numbers font-bold">2026</span>
            </motion.span>
          </motion.div>
        </div>

        {/* 3B. Beneath the Horizontal Gold Lines: Event Labels (Masked clip reveal from below the line) */}
        <div className="absolute inset-x-[8%] top-[74.9%] h-[4.8%] z-10 grid grid-cols-2 pointer-events-none">
          {/* Left Event: WEDDING */}
          <motion.div
            className="flex items-center justify-center text-center pr-3 sm:pr-4 select-none"
            initial={{ opacity: 0, y: 10, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#B85038] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
              WEDDING
            </span>
          </motion.div>

          {/* Right Event: RECEPTION */}
          <motion.div
            className="flex items-center justify-center text-center pl-3 sm:pl-4 select-none"
            initial={{ opacity: 0, y: 10, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#4B6647] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
              RECEPTION
            </span>
          </motion.div>
        </div>

        {/* 4. Inside the Blank Button: “ADD DATES TO CALENDAR” (Direct redirect to mobile calendar without downloading file) */}
        <motion.div
          className="absolute left-[16.8%] right-[16.8%] top-[80.14%] h-[5.33%] z-20 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.34, 1.4, 0.64, 1] as const }}
        >
          <button
            type="button"
            onClick={handleCalendarClick}
            aria-label="Add Wedding and Reception Dates directly to Mobile Calendar"
            className="w-full h-full flex items-center justify-center rounded-full text-[#FFF8F0] font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:brightness-110 active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFF8F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#B85038] cursor-pointer select-none"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.6)]">
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFF8F0] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="pt-0.5">Add Dates to Calendar</span>
            </span>
          </button>
        </motion.div>

        {/* 5. Beneath the Button: Interactive direct calendar selector in original place */}
        <motion.div
          className="absolute inset-x-0 top-[88.0%] -translate-y-1/2 flex justify-center items-center gap-1.5 sm:gap-2 z-20 text-center px-2"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <button
            type="button"
            onClick={() => window.open(GOOGLE_CALENDAR_URL, "_blank")}
            className="font-['Cinzel',Georgia,serif] text-[8.5px] sm:text-[10px] font-bold tracking-[0.08em] text-[#7A4515] hover:text-[#570713] transition-colors cursor-pointer select-none underline underline-offset-2 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
          >
            Google Calendar
          </button>
          <span className="text-[#C9A46A] text-[9px] select-none" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => {
              window.location.href = APPLE_CALENDAR_URL;
            }}
            className="font-['Cinzel',Georgia,serif] text-[8.5px] sm:text-[10px] font-bold tracking-[0.08em] text-[#7A4515] hover:text-[#570713] transition-colors cursor-pointer select-none underline underline-offset-2 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
          >
            Apple Calendar
          </button>
          <span className="text-[#C9A46A] text-[9px] select-none" aria-hidden="true">·</span>
          <a
            href="/Sanjeevi-Nila-Dates.ics"
            download="Sanjeevi-Nila-Dates.ics"
            className="font-['Cinzel',Georgia,serif] text-[8.5px] sm:text-[10px] font-bold tracking-[0.08em] text-[#7A4515] hover:text-[#570713] transition-colors cursor-pointer select-none underline underline-offset-2 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
            title="Download .ICS for Outlook & other calendar apps"
          >
            Outlook
          </a>
        </motion.div>
      </section>

      {/* Countdown Timer: Placed AFTER the calendar card with matching ivory paper background, NO horizontal border */}
      <motion.div
        className="relative z-10 w-full pt-4 pb-3 sm:pt-5 sm:pb-4 px-3 bg-[#FFF7E6] flex flex-col items-center justify-center text-center select-none"
        style={{
          backgroundImage: "url('/images/invitation-events/ivory-paper.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {/* Subtle Eyebrow */}
        <span className="font-['Cinzel',Georgia,serif] text-[9px] sm:text-[10.5px] font-bold tracking-[0.22em] text-[#570713]/85 uppercase mb-2 [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
          Countdown to Celebration
        </span>

        {/* 4 Timer Units with straight line separators */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-sm">
          {/* Days */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[26px] font-black text-[#570713] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.95)]">
              {mounted ? formatNumber(timeLeft.days) : "--"}
            </span>
            <span className="font-['Cinzel',Georgia,serif] text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#7A4515] uppercase mt-1">
              Days
            </span>
          </div>

          {/* Straight line separator */}
          <span className="w-[1px] h-7 sm:h-8 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center opacity-75" aria-hidden="true" />

          {/* Hours */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[26px] font-black text-[#570713] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.95)]">
              {mounted ? formatNumber(timeLeft.hours) : "--"}
            </span>
            <span className="font-['Cinzel',Georgia,serif] text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#7A4515] uppercase mt-1">
              Hours
            </span>
          </div>

          {/* Straight line separator */}
          <span className="w-[1px] h-7 sm:h-8 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center opacity-75" aria-hidden="true" />

          {/* Minutes */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[26px] font-black text-[#570713] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.95)]">
              {mounted ? formatNumber(timeLeft.minutes) : "--"}
            </span>
            <span className="font-['Cinzel',Georgia,serif] text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#7A4515] uppercase mt-1">
              Minutes
            </span>
          </div>

          {/* Straight line separator */}
          <span className="w-[1px] h-7 sm:h-8 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center opacity-75" aria-hidden="true" />

          {/* Seconds */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[26px] font-black text-[#B85038] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.95)]">
              {mounted ? formatNumber(timeLeft.seconds) : "--"}
            </span>
            <span className="font-['Cinzel',Georgia,serif] text-[8px] sm:text-[9px] font-bold tracking-[0.16em] text-[#7A4515] uppercase mt-1">
              Seconds
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
