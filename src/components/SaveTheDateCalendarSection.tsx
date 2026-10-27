"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

// Auspicious Wedding Muhurtham Target: Friday, 20 Nov 2026, 9:15 AM IST
const WEDDING_TARGET_TIME = new Date("2026-11-20T09:15:00+05:30").getTime();

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

// Main Combined Google Calendar Event (Marks both Wedding 20 Nov & Reception 22 Nov)
export const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("💍 Sanjeevi & Nila — Wedding & Reception") +
  "&dates=20261120/20261123" +
  "&ctz=Asia/Kolkata" +
  "&details=" +
  encodeURIComponent(
    "With divine grace and families' blessings, we joyfully invite you to celebrate the sacred Wedding Ceremony & Reception of Sanjeevi & Nila.\n\n" +
    "💍 WEDDING CEREMONY (திருமணம்):\n" +
    "• Date: Friday, 20 November 2026\n" +
    "• Auspicious Muhurtham: 9:15 AM IST\n" +
    "• Venue: Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Karur\n\n" +
    "🎉 WEDDING RECEPTION (திருமண வரவேற்பு):\n" +
    "• Date: Sunday, 22 November 2026\n" +
    "• Time: 11:30 AM to 3:00 PM IST\n" +
    "• Venue: Malaiamman Marriage Hall, Thalavapalayam, Karur\n\n" +
    "📍 Venues:\n" +
    "1. Wedding: Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Karur\n" +
    "2. Reception: Malaiamman Marriage Hall, Pugalur Main Road, Thalavapalayam, Karur"
  ) +
  "&location=" +
  encodeURIComponent(
    "Malaiamman Marriage Hall, Thalavapalayam, Karur & Sri Varadharaja Perumal Temple, Sengal Malai, Karur"
  );

// 1. Google Calendar URL: Wedding Ceremony (Friday, 20 Nov 2026, 9:15 AM IST)
export const GOOGLE_WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("💍 Sanjeevi & Nila — Wedding Ceremony (திருமணம்)") +
  "&dates=20261120T034500Z/20261120T070000Z" +
  "&ctz=Asia/Kolkata" +
  "&details=" +
  encodeURIComponent(
    "With divine grace and families' blessings, we joyfully invite you to celebrate the sacred Wedding Ceremony of Sanjeevi & Nila.\n\n" +
    "💍 Wedding Ceremony: Friday, 20 November 2026\n" +
    "⏰ Auspicious Muhurtham: 9:15 AM IST\n" +
    "📍 Venue: Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Karur\n\n" +
    "🎉 Reception: Sunday, 22 November 2026 at Malaiamman Marriage Hall, Karur."
  ) +
  "&location=" +
  encodeURIComponent(
    "Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Karur, Tamil Nadu 639113"
  );

// 2. Google Calendar URL: Wedding Reception (Sunday, 22 Nov 2026, 11:30 AM IST)
export const GOOGLE_RECEPTION_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("🎉 Sanjeevi & Nila — Wedding Reception (திருமண வரவேற்பு)") +
  "&dates=20261122T060000Z/20261122T093000Z" +
  "&ctz=Asia/Kolkata" +
  "&details=" +
  encodeURIComponent(
    "With joy and celebration, you are cordially invited to celebrate the Wedding Reception of Sanjeevi & Nila.\n\n" +
    "🎉 Reception: Sunday, 22 November 2026\n" +
    "⏰ Time: 11:30 AM to 3:00 PM IST\n" +
    "📍 Venue: Malaiamman Marriage Hall, Thalavapalayam, Karur.\n\n" +
    "💍 Wedding Ceremony: Friday, 20 November 2026, 9:15 AM at Arulmigu Sri Varadharaja Perumal Temple, Sengal Malai, Karur."
  ) +
  "&location=" +
  encodeURIComponent(
    "Malaiamman Marriage Hall, Pugalur Main Road, Punjai Thottakurichi, Thalavapalayam, Karur, Tamil Nadu 639113"
  );

const APPLE_CALENDAR_URL = "/Sanjeevi-Nila-Dates.ics";

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
      window.location.href = APPLE_CALENDAR_URL;
    } else {
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
        <div className="absolute inset-x-[8%] top-[62.0%] h-[12.2%] z-20 grid grid-cols-2">
          {/* Left Date: 20 NOV 2026 (Wedding) */}
          <motion.button
            type="button"
            onClick={() => window.open(GOOGLE_WEDDING_CALENDAR_URL, "_blank")}
            title="Click to add Wedding (20 Nov · 9:15 AM) to Google Calendar"
            className="flex flex-col items-center justify-center text-center pr-3 sm:pr-4 select-none cursor-pointer group hover:scale-[1.04] transition-transform"
            initial={{ opacity: 0, scale: 0.45, rotate: -8, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] as const }}
          >
            <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#B85038] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)] group-hover:brightness-110">
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
          </motion.button>

          {/* Right Date: 22 NOV 2026 (Reception) */}
          <motion.button
            type="button"
            onClick={() => window.open(GOOGLE_RECEPTION_CALENDAR_URL, "_blank")}
            title="Click to add Reception (22 Nov · 11:30 AM) to Google Calendar"
            className="flex flex-col items-center justify-center text-center pl-3 sm:pl-4 select-none cursor-pointer group hover:scale-[1.04] transition-transform"
            initial={{ opacity: 0, scale: 0.45, rotate: 8, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] as const }}
          >
            <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#4B6647] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)] group-hover:brightness-110">
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
          </motion.button>
        </div>

        {/* 3B. Beneath the Horizontal Gold Lines: Event Labels */}
        <div className="absolute inset-x-[8%] top-[74.9%] h-[4.8%] z-20 grid grid-cols-2">
          {/* Left Event: WEDDING */}
          <motion.button
            type="button"
            onClick={() => window.open(GOOGLE_WEDDING_CALENDAR_URL, "_blank")}
            title="Click to add Wedding (20 Nov · 9:15 AM) to Google Calendar"
            className="flex items-center justify-center text-center pr-3 sm:pr-4 select-none cursor-pointer group"
            initial={{ opacity: 0, y: 10, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#B85038] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)] group-hover:underline underline-offset-2">
              WEDDING
            </span>
          </motion.button>

          {/* Right Event: RECEPTION */}
          <motion.button
            type="button"
            onClick={() => window.open(GOOGLE_RECEPTION_CALENDAR_URL, "_blank")}
            title="Click to add Reception (22 Nov · 11:30 AM) to Google Calendar"
            className="flex items-center justify-center text-center pl-3 sm:pl-4 select-none cursor-pointer group"
            initial={{ opacity: 0, y: 10, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#4B6647] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)] group-hover:underline underline-offset-2">
              RECEPTION
            </span>
          </motion.button>
        </div>

        {/* 4. Inside the Blank Button: “ADD DATES TO CALENDAR” (Opens direct date selection modal) */}
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
            aria-label="Add Wedding and Reception Dates directly to Calendar"
            className="w-full h-full flex items-center justify-center rounded-full text-[#FFF8F0] font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:brightness-110 active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFF8F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#B85038] cursor-pointer select-none"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.6)]">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFF8F0] shrink-0" />
              <span className="pt-0.5">Add Dates to Calendar</span>
            </span>
          </button>
        </motion.div>

        {/* 5. Beneath the Button: Interactive direct calendar selector */}
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

      {/* Countdown Timer: Placed AFTER the calendar card with matching ivory paper background, NO cards, pure frameless typography */}
      <motion.div
        className="relative z-10 w-full pt-5 pb-4 sm:pt-6 sm:pb-5 px-3 bg-[#FFF7E6] flex flex-col items-center justify-center text-center select-none overflow-hidden"
        style={{
          backgroundImage: "url('/images/invitation-events/ivory-paper.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle Eyebrow with golden ornament lines */}
        <motion.div
          initial={{ opacity: 0, y: -10, letterSpacing: "0.12em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.26em" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 mb-3 sm:mb-3.5"
        >
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ transformOrigin: "right center" }}
            className="w-5 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C9A46A]"
            aria-hidden="true"
          />
          <span className="font-['Cinzel',Georgia,serif] text-[10.5px] sm:text-[12px] font-bold tracking-[0.26em] text-[#570713]/90 uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
            Countdown to Celebration
          </span>
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ transformOrigin: "left center" }}
            className="w-5 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C9A46A]"
            aria-hidden="true"
          />
        </motion.div>

        {/* 4 Timer Units: Frameless, pure royal typography with staggered 3D cascade reveal */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4.5 w-full max-w-[340px] sm:max-w-[410px] [perspective:800px]">
          {/* Days */}
          <div className="flex flex-col items-center flex-1">
            <motion.span
              initial={{ opacity: 0, y: 24, rotateX: -60, scale: 0.8, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="inline-block font-['Cinzel',Georgia,serif] text-[28px] sm:text-[35px] font-black text-[#570713] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)]"
            >
              {mounted ? formatNumber(timeLeft.days) : "--"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8, letterSpacing: "0.08em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.18em] text-[#7A4515] uppercase mt-1.5"
            >
              Days
            </motion.span>
          </div>

          {/* Straight line separator with glowing scale expansion */}
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.85 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
            className="w-[1.5px] h-9 sm:h-11 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center drop-shadow-[0_0_2px_rgba(201,164,106,0.5)]"
            aria-hidden="true"
          />

          {/* Hours */}
          <div className="flex flex-col items-center flex-1">
            <motion.span
              initial={{ opacity: 0, y: 24, rotateX: -60, scale: 0.8, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="inline-block font-['Cinzel',Georgia,serif] text-[28px] sm:text-[35px] font-black text-[#570713] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)]"
            >
              {mounted ? formatNumber(timeLeft.hours) : "--"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8, letterSpacing: "0.08em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.18em] text-[#7A4515] uppercase mt-1.5"
            >
              Hours
            </motion.span>
          </div>

          {/* Straight line separator with glowing scale expansion */}
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.85 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
            className="w-[1.5px] h-9 sm:h-11 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center drop-shadow-[0_0_2px_rgba(201,164,106,0.5)]"
            aria-hidden="true"
          />

          {/* Minutes */}
          <div className="flex flex-col items-center flex-1">
            <motion.span
              initial={{ opacity: 0, y: 24, rotateX: -60, scale: 0.8, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="inline-block font-['Cinzel',Georgia,serif] text-[28px] sm:text-[35px] font-black text-[#570713] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)]"
            >
              {mounted ? formatNumber(timeLeft.minutes) : "--"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8, letterSpacing: "0.08em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.18em] text-[#7A4515] uppercase mt-1.5"
            >
              Minutes
            </motion.span>
          </div>

          {/* Straight line separator with glowing scale expansion */}
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.85 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
            className="w-[1.5px] h-9 sm:h-11 bg-gradient-to-b from-transparent via-[#C9A46A] to-transparent self-center drop-shadow-[0_0_2px_rgba(201,164,106,0.5)]"
            aria-hidden="true"
          />

          {/* Seconds (Active live pulse) */}
          <div className="flex flex-col items-center flex-1">
            <motion.span
              initial={{ opacity: 0, y: 24, rotateX: -60, scale: 0.8, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="inline-block font-['Cinzel',Georgia,serif] text-[28px] sm:text-[35px] font-black text-[#B85038] leading-none [text-shadow:0_1.5px_0_rgba(255,255,255,0.95)]"
            >
              <motion.span
                key={timeLeft.seconds}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="inline-block"
              >
                {mounted ? formatNumber(timeLeft.seconds) : "--"}
              </motion.span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8, letterSpacing: "0.08em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[9.5px] sm:text-[11px] font-bold tracking-[0.18em] text-[#7A4515] uppercase mt-1.5"
            >
              Seconds
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

