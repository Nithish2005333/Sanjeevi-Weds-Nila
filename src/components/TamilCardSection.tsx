"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";

/* ─── Reusable Groom Details (Straight on BgImage, Ornate Traditional Design) ─── */
const GroomDetails: React.FC = () => (
  <div className="w-full text-center py-2 select-none">
    {/* Title Badge with Gold Filigree */}
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="inline-flex items-center gap-1.5 px-4 py-0.5 rounded-full bg-[#FAF3E2]/95 border border-[#C9A46A] shadow-xs">
        <span className="text-[#C9A46A] text-[10px]">✤</span>
        <span className="font-tamil font-bold text-xs sm:text-[13px] text-[#783F06] tracking-[0.2em] uppercase">
          மணமகன்
        </span>
        <span className="text-[#C9A46A] text-[10px]">✤</span>
      </span>
      <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Groom's Name and Degree on Same Line */}
    <h3 className="font-tamil font-bold text-[#4A0207] text-2xl sm:text-[26px] tracking-wide leading-tight mt-1 drop-shadow-2xs">
      S. சஞ்சீவி, <span className="font-sans font-bold text-sm sm:text-base text-[#854D0E] tracking-wider ml-1">D.I.C.E.</span>
    </h3>

    {/* Center Decorative Divider */}
    <div className="flex items-center justify-center gap-2 my-2 sm:my-2.5">
      <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="text-[#C9A46A] text-xs">❋</span>
      <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Parents Label on Top Line */}
    <p className="font-tamil text-xs sm:text-[13px] font-bold text-[#783F06] tracking-widest uppercase mb-1">
      பெற்றோர்
    </p>

    {/* Parents Names on Same Line Below */}
    <p className="font-tamil text-xs sm:text-[14px] text-[#4A1507] font-semibold leading-relaxed whitespace-nowrap">
      திரு. A. சடையப்பன் – திருமதி. S. குமுதா
    </p>

    {/* Address */}
    <p className="font-tamil text-xs sm:text-[13px] text-[#783F06] mt-1 font-medium tracking-wide">
      கிழக்கு தவுட்டுப்பாளையம், கரூர்
    </p>
  </div>
);

/* ─── Reusable Connecting Divider (Straight on BgImage) ─── */
const ConnectingDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 my-2 sm:my-3 w-full select-none">
    <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
    <div
      className="inline-flex items-center gap-2 px-5 py-1 rounded-full shadow-xs"
      style={{
        background: "linear-gradient(180deg, #FAF2DC 0%, #F3E2BD 100%)",
        border: "1.5px solid #C9A46A",
      }}
    >
      <span className="text-[#C9A46A] text-xs">✦</span>
      <span className="font-tamil text-xs sm:text-sm font-bold text-[#853119] tracking-wider">
        இணைந்து மணக்கும்
      </span>
      <span className="text-[#C9A46A] text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
  </div>
);

/* ─── Reusable Bride Details (Straight on BgImage, Ornate Traditional Design) ─── */
const BrideDetails: React.FC = () => (
  <div className="w-full text-center py-2 select-none">
    {/* Title Badge with Gold Filigree */}
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="inline-flex items-center gap-1.5 px-4 py-0.5 rounded-full bg-[#FAF3E2]/95 border border-[#C9A46A] shadow-xs">
        <span className="text-[#C9A46A] text-[10px]">✤</span>
        <span className="font-tamil font-bold text-xs sm:text-[13px] text-[#783F06] tracking-[0.2em] uppercase">
          மணமகள்
        </span>
        <span className="text-[#C9A46A] text-[10px]">✤</span>
      </span>
      <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Bride's Name and Degree on Same Line */}
    <h3 className="font-tamil font-bold text-[#4A0207] text-2xl sm:text-[26px] tracking-wide leading-tight mt-1 drop-shadow-2xs">
      A. நிலா <span className="text-base sm:text-lg font-normal text-[#783F06]">(எ) சினேகா</span>, <span className="font-sans font-bold text-sm sm:text-base text-[#854D0E] tracking-wider ml-1">M.Sc.</span>
    </h3>

    {/* Center Decorative Divider */}
    <div className="flex items-center justify-center gap-2 my-2 sm:my-2.5">
      <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="text-[#C9A46A] text-xs">❋</span>
      <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Parents Label on Top Line */}
    <p className="font-tamil text-xs sm:text-[13px] font-bold text-[#783F06] tracking-widest uppercase mb-1">
      பெற்றோர்
    </p>

    {/* Parents Names on Same Line Below */}
    <p className="font-tamil text-xs sm:text-[14px] text-[#4A1507] font-semibold leading-relaxed whitespace-nowrap">
      திரு. K. அருணகிரி – திருமதி. A. கோமதி
    </p>

    {/* Address */}
    <p className="font-tamil text-xs sm:text-[13px] text-[#783F06] mt-1 font-medium tracking-wide">
      மல்லம்பாளையம், கரூர்
    </p>
  </div>
);

/* ─── Reusable Date & Time Details (Straight on BgImage, Ornate Centerpiece) ─── */
const DateTimeDetails: React.FC = () => (
  <div className="w-full text-center py-1 select-none">
    {/* Decorative Crown Divider */}
    <div className="flex items-center justify-center gap-2 mb-1.5">
      <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="text-[#C9A46A] text-xs">❦</span>
      <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Tamil Auspicious Year */}
    <p className="font-tamil font-bold text-[#4A0207] text-sm sm:text-base leading-snug tracking-wide">
      ஸ்ரீ பராபவ வருடம்
    </p>
    {/* Karthikai 06 and (22.11.2026) in same line */}
    <p className="font-tamil font-bold text-[#4A0207] text-base sm:text-lg leading-snug my-0.5 whitespace-nowrap">
      கார்த்திகை 06 <span className="font-bold text-[#853119] text-sm sm:text-base ml-1.5">(22.11.2026)</span>
    </p>
    {/* Day */}
    <p className="font-tamil font-bold text-[#4A0207] text-sm sm:text-base leading-snug">
      ஞாயிற்றுக்கிழமை
    </p>

    {/* Time Window (No divider line above) */}
    <p className="font-tamil font-bold text-[#783F06] text-xs sm:text-[13px] whitespace-nowrap px-2 mt-2">
      காலை 11.30 முதல் மதியம் 3.00 மணி வரை
    </p>

    {/* Mandapam Location */}
    <p className="font-tamil text-xs sm:text-[13px] text-[#5A2A0A] mt-1 font-medium leading-relaxed max-w-xs mx-auto">
      இடம்: மலையம்மன் திருமண மண்டபம், தளவாபாளையம், கரூர்.
    </p>
  </div>
);

/* ─── Reusable Contact Section (Straight on BgImage, No Card, No Box) ─── */
const ContactSection: React.FC = () => (
  <div className="w-full text-center pt-4 sm:pt-6 mt-1 select-none">
    {/* Header: தொடர்புக்கு with gold ornamental rules */}
    <div className="flex items-center justify-center gap-2 mb-1.5">
      <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#C9A46A] to-[#C9A46A]" />
      <span className="text-[#C9A46A] text-xs">☙</span>
      <p className="font-tamil text-xs sm:text-sm font-bold text-[#783F06] tracking-widest uppercase">
        தொடர்புக்கு:
      </p>
      <span className="text-[#C9A46A] text-xs">❧</span>
      <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#C9A46A] to-[#C9A46A]" />
    </div>

    {/* Two Phone buttons stacked vertically (Real button design, icon without card) */}
    <div className="flex flex-col items-center gap-2 w-full mt-1">
      <a
        href="tel:9786804303"
        className="group inline-flex items-center justify-center gap-2.5 py-2 px-6 min-w-[210px] sm:min-w-[230px] rounded-full bg-gradient-to-r from-[#4A0207] via-[#5C0913] to-[#4A0207] text-[#FFFDF8] border border-[#C9A46A]/80 shadow-[0_2px_8px_rgba(74,2,7,0.22)] hover:shadow-[0_4px_14px_rgba(74,2,7,0.35)] hover:border-[#F4E3B7] hover:scale-[1.03] active:scale-95 transition-all"
        aria-label="Call 97868 04303"
      >
        <Phone className="w-4 h-4 text-[#F4E3B7] group-hover:rotate-12 transition-transform shrink-0" />
        <span className="font-tamil font-bold text-base sm:text-[17px] tracking-wider text-[#FFFDF8]">
          97868 04303
        </span>
      </a>

      <a
        href="tel:8885409595"
        className="group inline-flex items-center justify-center gap-2.5 py-2 px-6 min-w-[210px] sm:min-w-[230px] rounded-full bg-gradient-to-r from-[#4A0207] via-[#5C0913] to-[#4A0207] text-[#FFFDF8] border border-[#C9A46A]/80 shadow-[0_2px_8px_rgba(74,2,7,0.22)] hover:shadow-[0_4px_14px_rgba(74,2,7,0.35)] hover:border-[#F4E3B7] hover:scale-[1.03] active:scale-95 transition-all"
        aria-label="Call 88854 09595"
      >
        <Phone className="w-4 h-4 text-[#F4E3B7] group-hover:rotate-12 transition-transform shrink-0" />
        <span className="font-tamil font-bold text-base sm:text-[17px] tracking-wider text-[#FFFDF8]">
          88854 09595
        </span>
      </a>
    </div>
  </div>
);

/* ─── Main Tamil Wedding Invitation Section ─── */
export const TamilCardSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const slideUp = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "100px 0px" },
    transition: {
      duration: 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      id="tamil-invitation"
      className="relative w-full overflow-hidden select-none font-tamil"
      style={{
        background: "#FAF6EE",
        minHeight: "auto",
        height: "auto",
      }}
      aria-label="பாரம்பரிய தமிழ் திருமண அழைப்பிதழ்"
    >
      {/* ── Layered Background System for Natural Auto-Height ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Layer 1: Seamless repeating middle ivory texture with gold side borders */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/invitation-bg-mid.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "center top",
          }}
        />

        {/* Layer 2: Top floral garland & hanging lamps, anchored at top */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            aspectRatio: "724 / 320",
            maxHeight: "320px",
            backgroundImage: "url('/invitation-bg-top.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
          }}
        />

        {/* Layer 3: Bottom floral cluster, anchored at bottom below final contact button */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            aspectRatio: "724 / 312",
            maxHeight: "312px",
            backgroundImage: "url('/invitation-bg-bottom.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
            backgroundPosition: "bottom center",
          }}
        />
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-5 pt-14 sm:pt-18 pb-28 sm:pb-32">

        {/* ── 1. Small Centered “சிவமயம்” ── */}
        <motion.div {...slideUp(0)} className="text-center mb-1.5">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-[#8B5213] text-sm">☙</span>
            <span className="font-tamil text-xs font-bold tracking-[0.25em] text-[#783F06] uppercase">
              சிவமயம்
            </span>
            <span className="text-[#8B5213] text-sm">❧</span>
          </div>
        </motion.div>

        {/* ── 2. Main Heading “திருமண வரவேற்பு அழைப்பிதழ்” (No line below) ── */}
        <motion.div {...slideUp(0.04)} className="text-center mb-3.5 sm:mb-4">
          <h2
            className="font-tamil font-bold text-[#4A0207] leading-tight"
            style={{ fontSize: "clamp(1.45rem, 5.5vw, 1.95rem)" }}
          >
            திருமண வரவேற்பு
            <br />
            அழைப்பிதழ்
          </h2>
        </motion.div>

        {/* ── 3. Wedding Event Card (20 நவம்பர் கல்யாணம்) ── */}
        <motion.div {...slideUp(0.06)} className="relative w-full flex justify-center mb-2 sm:mb-2.5">
          <div className="relative w-full rounded-2xl overflow-hidden filter drop-shadow-md">
            <Image
              src="/Tamil%20Wedding.png"
              alt="20 நவம்பர் கல்யாணம் - திருமண விழா"
              width={1448}
              height={807}
              className="w-full h-auto object-contain block"
              priority
              sizes="(max-width: 640px) 100vw, 480px"
            />
          </div>
        </motion.div>

        {/* ── 4. Reception Event Card (22 நவம்பர் வரவேற்பு) ── */}
        <motion.div {...slideUp(0.08)} className="relative w-full mb-2.5 sm:mb-3">
          <div className="relative w-full rounded-2xl overflow-hidden filter drop-shadow-md">
            <Image
              src="/Tamil%20Reception.png"
              alt="22 நவம்பர் வரவேற்பு - திருமண வரவேற்பு விழா"
              width={1447}
              height={836}
              className="w-full h-auto object-contain block"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
        </motion.div>

        {/* ── 5. Centered Sacred Invocation “அருள்மிகு ஸ்ரீ முருகன் துணை” (Compact Royal Gold Cartouche) ── */}
        <motion.div {...slideUp(0.05)} className="w-full flex justify-center my-3.5 sm:my-4">
          <div className="p-[1.5px] rounded-full bg-gradient-to-r from-[#B5863F] via-[#F4E3B7] to-[#B5863F] shadow-[0_2px_8px_rgba(181,134,63,0.18)]">
            <div
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1 rounded-full"
              style={{
                background: "linear-gradient(180deg, #FFFDF8 0%, #FAF0D8 60%, #F5E2B8 100%)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
              }}
            >
              <span className="text-[#853119] text-[11px] font-serif font-bold">॥</span>
              <p className="font-tamil font-bold text-[#54040A] text-[11.5px] sm:text-xs tracking-wider drop-shadow-[0_1px_0_rgba(255,255,255,0.85)] whitespace-nowrap">
                அருள்மிகு ஸ்ரீ முருகன் துணை
              </p>
              <span className="text-[#853119] text-[11px] font-serif font-bold">॥</span>
            </div>
          </div>
        </motion.div>

        {/* ── 6. Single-Column Vertical Details Arrangement (Straight to BgImage, No Cards) ── */}
        <div className="space-y-2 sm:space-y-3 w-full flex flex-col items-center">
          {/* 1. Groom Details */}
          <motion.div {...slideUp(0.06)} className="w-full">
            <GroomDetails />
          </motion.div>

          {/* 2. Centered Connecting Text */}
          <motion.div {...slideUp(0.07)} className="w-full">
            <ConnectingDivider />
          </motion.div>

          {/* 3. Bride Details */}
          <motion.div {...slideUp(0.08)} className="w-full">
            <BrideDetails />
          </motion.div>

          {/* 4. Date and Time Details */}
          <motion.div {...slideUp(0.09)} className="w-full">
            <DateTimeDetails />
          </motion.div>

          {/* 5. Contact Section */}
          <motion.div {...slideUp(0.1)} className="w-full">
            <ContactSection />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
