"use client";

import React from "react";
import { motion } from "framer-motion";

const reveal = (delay = 0, y = 12) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const SaveTheDateCalendarSection: React.FC = () => {
  return (
    <section
      id="save-the-date"
      className="relative w-full aspect-[941/1672] overflow-hidden select-none"
      style={{ marginTop: "-16.05%" }}
      aria-label="Save the Date - Sanjeevi & Nila Wedding Calendar"
    >
      {/* 1. Complete Watercolor Calendar Backdrop with shared pond & temple reflection */}
      <img
        src="/assets/watercolor-lotus-wedding-calendar-backdrop.png"
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

      {/* 2. Top Heading: “SAVE THE DATE” centered above the gold lotus divider on one line */}
      <motion.div
        className="absolute inset-x-0 top-[19.8%] -translate-y-1/2 flex justify-center items-center z-10 pointer-events-none px-4"
        {...reveal(0.04, -8)}
      >
        <h2 className="font-['Cinzel',Georgia,serif] text-[22px] sm:text-[27px] font-extrabold tracking-[0.24em] text-[#570713] uppercase whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
          SAVE THE DATE
        </h2>
      </motion.div>

      {/* 3A. Above the Horizontal Gold Lines: Date Numerals & Month (ends safely before line at 74.64%) */}
      <div className="absolute inset-x-[8%] top-[62.0%] h-[12.2%] z-10 grid grid-cols-2 pointer-events-none">
        {/* Left Date: 20 NOV 2026 */}
        <motion.div
          className="flex flex-col items-center justify-center text-center pr-3 sm:pr-4 select-none"
          {...reveal(0.12, 10)}
        >
          <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#B85038] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
            20
          </span>
          <span className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[12.5px] font-bold tracking-[0.18em] text-[#B85038] uppercase mt-1 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
            NOV <span className="font-serif-numbers font-bold">2026</span>
          </span>
        </motion.div>

        {/* Right Date: 22 NOV 2026 */}
        <motion.div
          className="flex flex-col items-center justify-center text-center pl-3 sm:pl-4 select-none"
          {...reveal(0.18, 10)}
        >
          <span className="font-['Playfair_Display',Georgia,serif] text-[44px] sm:text-[52px] font-bold text-[#4B6647] leading-none [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
            22
          </span>
          <span className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[12.5px] font-bold tracking-[0.18em] text-[#4B6647] uppercase mt-1 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
            NOV <span className="font-serif-numbers font-bold">2026</span>
          </span>
        </motion.div>
      </div>

      {/* 3B. Beneath the Horizontal Gold Lines: Event Labels (starts after line at 74.64%, ends before button at 80.14%) */}
      <div className="absolute inset-x-[8%] top-[74.9%] h-[4.8%] z-10 grid grid-cols-2 pointer-events-none">
        {/* Left Event: WEDDING */}
        <motion.div
          className="flex items-center justify-center text-center pr-3 sm:pr-4 select-none"
          {...reveal(0.16, 6)}
        >
          <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#B85038] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
            WEDDING
          </span>
        </motion.div>

        {/* Right Event: RECEPTION */}
        <motion.div
          className="flex items-center justify-center text-center pl-3 sm:pl-4 select-none"
          {...reveal(0.22, 6)}
        >
          <span className="font-['Cinzel',Georgia,serif] text-[12.5px] sm:text-[14.5px] font-bold tracking-[0.24em] text-[#4B6647] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
            RECEPTION
          </span>
        </motion.div>
      </div>

      {/* 4. Inside the Blank Button: “ADD DATES TO CALENDAR” (Accessible Download Link) */}
      <motion.div
        className="absolute left-[16.8%] right-[16.8%] top-[80.14%] h-[5.33%] z-20 flex items-center justify-center"
        {...reveal(0.24, 8)}
      >
        <a
          href="/Sanjeevi-Nila-Dates.ics"
          download="Sanjeevi-Nila-Dates.ics"
          role="button"
          tabIndex={0}
          aria-label="Add Wedding and Reception Dates to Calendar (Downloads Sanjeevi-Nila-Dates.ics)"
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
        </a>
      </motion.div>

      {/* 5. Beneath the Button: Single-line “Google Calendar · Apple Calendar · Outlook” */}
      <motion.div
        className="absolute inset-x-0 top-[88.0%] -translate-y-1/2 flex justify-center items-center z-10 pointer-events-none text-center px-2"
        {...reveal(0.3, 6)}
      >
        <p className="font-['Cinzel',Georgia,serif] text-[8.5px] sm:text-[10px] font-semibold tracking-[0.1em] text-[#7A4515] select-none whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
          Google Calendar · Apple Calendar · Outlook
        </p>
      </motion.div>
    </section>
  );
};
