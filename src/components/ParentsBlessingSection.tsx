"use client";

import React from "react";
import { motion } from "framer-motion";

const reveal = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});



// Minimalist Gold Diamond Line Divider with expanding lines and spinning diamond reveal
const GoldDiamondDivider: React.FC = () => (
  <motion.div
    className="flex items-center justify-center gap-2.5 w-full max-w-[125px] sm:max-w-[145px] my-3.5 sm:my-4.5 select-none"
    aria-hidden="true"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.08 },
      },
    }}
  >
    <motion.span
      variants={{
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      style={{ transformOrigin: "right center" }}
      className="flex-1 h-[0.8px] bg-gradient-to-r from-transparent via-[#C9A46A] to-[#B37D2E]"
    />
    <motion.span
      variants={{
        hidden: { scale: 0, rotate: 135, opacity: 0 },
        visible: {
          scale: 1,
          rotate: 45,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const },
        },
      }}
      className="w-1.5 h-1.5 bg-[#B37D2E] shrink-0"
    />
    <motion.span
      variants={{
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      style={{ transformOrigin: "left center" }}
      className="flex-1 h-[0.8px] bg-gradient-to-l from-transparent via-[#C9A46A] to-[#B37D2E]"
    />
  </motion.div>
);

export const ParentsBlessingSection: React.FC = () => {
  return (
    <section
      className="families-section relative w-full aspect-[941/1672] overflow-visible bg-[#FAF6F0] flex flex-col items-center select-none"
      id="parents"
      aria-label="With Divine Grace & Blessings of Our Families - Sanjeevi & Nila"
    >
      {/* Seamless Leaf Transition Overlay */}
      <img src="/images/family-seam.webp" className="family-seam" alt="" aria-hidden="true" />

      {/* Background Watercolor Art (Temple, Water, and Lotus Frame) */}
      <img
        src="/assets/Family garden with peacock and elephant.webp"
        alt="Family Garden with Peacock and Elephant Wedding Invitation Frame"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Styled Content Overlay — Positioned gracefully in open parchment space above the lake and temple (moved down) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pt-[26%] sm:pt-[28%] text-center">
        <div className="flex flex-col items-center w-full max-w-[320px] sm:max-w-[360px] mx-auto">
          {/* Header Block: With Divine Grace & Blessings of Our Families */}
          <header className="flex flex-col items-center w-full">
            <motion.p
              initial={{ opacity: 0, y: -8, letterSpacing: "0.14em", filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.24em", filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-semibold text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
            >
              WITH DIVINE GRACE &amp; BLESSINGS OF
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16, scale: 0.94, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Alex_Brush',cursive] text-[40px] sm:text-[50px] font-normal text-[#5A290B] tracking-normal leading-none pt-1.5 sm:pt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
            >
              Our Families
            </motion.h2>

            <motion.img
              initial={{ opacity: 0, scale: 0.35, rotate: -25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] as const }}
              src="/assets/lotus-motif.webp"
              alt="Lotus Motif"
              className="w-8 sm:w-10 h-auto mt-2.5 sm:mt-3 mb-2 sm:mb-2.5 object-contain select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
              loading="eager"
            />
          </header>

          {/* Groom Block: Sanjeevi (Slides in from Left) */}
          <div className="flex flex-col items-center w-full mt-2 sm:mt-2.5">
            <motion.span
              initial={{ opacity: 0, y: -6, letterSpacing: "0.18em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.26, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-bold text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
            >
              THE GROOM
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, x: -26, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Playfair_Display',Georgia,serif] text-[28px] sm:text-[35px] font-bold text-[#570713] tracking-[0.05em] uppercase leading-none mt-2 sm:mt-2.5 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
            >
              SANJEEVI
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
              className="font-['Cormorant_Garamond',Georgia,serif] italic font-medium text-[15px] sm:text-[17px] text-[#7A4016] mt-1.5 sm:mt-2"
            >
              Son of
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Cormorant_Garamond',Georgia,serif] text-[18px] sm:text-[21px] font-bold text-[#420B13] tracking-normal leading-snug mt-1.5 sm:mt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.85)]"
            >
              Mr. A. Sadaiyappan{" "}
              <span className="font-serif italic font-normal text-[#8A5222] mx-0.5">
                &amp;
              </span>{" "}
              Mrs. S. Kumutha
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="font-['Cormorant_Garamond',Georgia,serif] text-[14px] sm:text-[16px] font-medium text-[#523321] leading-tight mt-1.5 sm:mt-2"
            >
              East Thavittupalayam, Dalavapalayam, Karur
            </motion.p>
          </div>

          {/* Divider between Groom and Bride (Center Expanding Gold Diamond) */}
          <GoldDiamondDivider />

          {/* Bride Block: Nila (Sneha) (Slides in from Right) */}
          <div className="flex flex-col items-center w-full">
            <motion.span
              initial={{ opacity: 0, y: -6, letterSpacing: "0.18em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.26, ease: "easeOut" }}
              className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-bold text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
            >
              THE BRIDE
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, x: 26, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Playfair_Display',Georgia,serif] text-[28px] sm:text-[35px] font-bold text-[#570713] tracking-[0.05em] uppercase leading-none mt-2 sm:mt-2.5 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]"
            >
              NILA (SNEHA)
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
              className="font-['Cormorant_Garamond',Georgia,serif] italic font-medium text-[15px] sm:text-[17px] text-[#7A4016] mt-1.5 sm:mt-2"
            >
              Daughter of
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-['Cormorant_Garamond',Georgia,serif] text-[18px] sm:text-[21px] font-bold text-[#420B13] tracking-normal leading-snug mt-1.5 sm:mt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.85)]"
            >
              Mr. K. Arunagiri{" "}
              <span className="font-serif italic font-normal text-[#8A5222] mx-0.5">
                &amp;
              </span>{" "}
              Mrs. A. Gomathi
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="font-['Cormorant_Garamond',Georgia,serif] text-[14px] sm:text-[16px] font-medium text-[#523321] leading-tight mt-1.5 sm:mt-2"
            >
              Mallampalayam, Vangal, Karur
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
