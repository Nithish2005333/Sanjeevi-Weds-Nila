"use client";

import React from "react";
import { motion } from "framer-motion";

const reveal = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});



// Minimalist Gold Diamond Line Divider (matching reference image)
const GoldDiamondDivider: React.FC = () => (
  <div
    className="flex items-center justify-center gap-2.5 w-full max-w-[125px] sm:max-w-[145px] my-3.5 sm:my-4.5 select-none"
    aria-hidden="true"
  >
    <span className="flex-1 h-[0.8px] bg-gradient-to-r from-transparent via-[#C9A46A] to-[#B37D2E]" />
    <span className="w-1.5 h-1.5 rotate-45 bg-[#B37D2E] shrink-0" />
    <span className="flex-1 h-[0.8px] bg-gradient-to-l from-transparent via-[#C9A46A] to-[#B37D2E]" />
  </div>
);

export const ParentsBlessingSection: React.FC = () => {
  return (
    <section
      className="families-section relative w-full aspect-[941/1672] overflow-visible bg-[#FAF6F0] flex flex-col items-center select-none"
      id="parents"
      aria-label="With Divine Grace & Blessings of Our Families - Sanjeevi & Nila"
    >
      {/* Seamless Leaf Transition Overlay */}
      <img src="/images/family-seam.png" className="family-seam" alt="" aria-hidden="true" />

      {/* Background Watercolor Art (Temple, Water, and Lotus Frame) */}
      <img
        src="/assets/Family garden with peacock and elephant.png"
        alt="Family Garden with Peacock and Elephant Wedding Invitation Frame"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Styled Content Overlay — Positioned gracefully in open parchment space above the lake and temple */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pt-[18%] sm:pt-[20%] text-center">
        <motion.div
          className="flex flex-col items-center w-full max-w-[320px] sm:max-w-[360px] mx-auto"
          {...reveal(0)}
        >
          {/* Header Block: With Divine Grace & Blessings of Our Families */}
          <header className="flex flex-col items-center w-full">
            <p className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-semibold tracking-[0.24em] text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
              WITH DIVINE GRACE &amp; BLESSINGS OF
            </p>

            <h2 className="font-['Alex_Brush',cursive] text-[40px] sm:text-[50px] font-normal text-[#5A290B] tracking-normal leading-none pt-1.5 sm:pt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
              Our Families
            </h2>

            <img
              src="/assets/lotus-motif.webp"
              alt="Lotus Motif"
              className="w-8 sm:w-10 h-auto mt-2.5 sm:mt-3 mb-2 sm:mb-2.5 object-contain select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
              loading="eager"
            />
          </header>

          {/* Groom Block: Sanjeevi */}
          <div className="flex flex-col items-center w-full mt-2 sm:mt-2.5">
            <span className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-bold tracking-[0.28em] text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
              THE GROOM
            </span>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-[28px] sm:text-[35px] font-bold text-[#570713] tracking-[0.05em] uppercase leading-none mt-2 sm:mt-2.5 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
              SANJEEVI
            </h3>
            <p className="font-['Cormorant_Garamond',Georgia,serif] italic font-medium text-[15px] sm:text-[17px] text-[#7A4016] mt-1.5 sm:mt-2">
              Son of
            </p>
            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[18px] sm:text-[21px] font-bold text-[#420B13] tracking-normal leading-snug mt-1.5 sm:mt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
              Mr. A. Sadaiyappan{" "}
              <span className="font-serif italic font-normal text-[#8A5222] mx-0.5">
                &amp;
              </span>{" "}
              Mrs. S. Kumutha
            </p>
            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[14px] sm:text-[16px] font-medium text-[#523321] leading-tight mt-1.5 sm:mt-2">
              East Thavittupalayam, Dalavapalayam, Karur
            </p>
          </div>

          {/* Divider between Groom and Bride */}
          <GoldDiamondDivider />

          {/* Bride Block: Nila (Sneha) */}
          <div className="flex flex-col items-center w-full">
            <span className="font-['Cinzel',Georgia,serif] text-[11px] sm:text-[13px] font-bold tracking-[0.28em] text-[#824716] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
              THE BRIDE
            </span>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-[28px] sm:text-[35px] font-bold text-[#570713] tracking-[0.05em] uppercase leading-none mt-2 sm:mt-2.5 [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
              NILA (SNEHA)
            </h3>
            <p className="font-['Cormorant_Garamond',Georgia,serif] italic font-medium text-[15px] sm:text-[17px] text-[#7A4016] mt-1.5 sm:mt-2">
              Daughter of
            </p>
            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[18px] sm:text-[21px] font-bold text-[#420B13] tracking-normal leading-snug mt-1.5 sm:mt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
              Mr. K. Arunagiri{" "}
              <span className="font-serif italic font-normal text-[#8A5222] mx-0.5">
                &amp;
              </span>{" "}
              Mrs. A. Gomathi
            </p>
            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[14px] sm:text-[16px] font-medium text-[#523321] leading-tight mt-1.5 sm:mt-2">
              Mallampalayam, Vangal, Karur
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
