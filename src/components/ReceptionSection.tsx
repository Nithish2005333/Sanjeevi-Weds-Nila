"use client";

import React from "react";
import { CelebrationEvent } from "@/data/celebrationEvents";
import { VenueMapCard } from "@/components/VenueMapCard";

interface ReceptionSectionProps {
  event: CelebrationEvent;
}

/* Lotus Divider with lines bold at center, fading to sides */
const LotusDivider = () => (
  <div className="flex items-center gap-2 w-full -mt-0.5 mb-2.5" aria-hidden="true">
    {/* Left line: dark near lotus, fades left */}
    <span className="flex-1 h-[1.5px] bg-gradient-to-l from-[#C38A25] via-[#C38A25]/50 to-transparent" />
    {/* Center lotus image */}
    <img
      src="/assets/lotus-divider.png"
      alt=""
      className="w-5.5 h-5.5 object-contain shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
      aria-hidden="true"
    />
    {/* Right line: dark near lotus, fades right */}
    <span className="flex-1 h-[1.5px] bg-gradient-to-r from-[#C38A25] via-[#C38A25]/50 to-transparent" />
  </div>
);

export const ReceptionSection: React.FC<ReceptionSectionProps> = ({ event }) => {
  return (
    <section
      data-event-section
      id="reception"
      className="reception-section relative w-full text-left select-none"
      aria-label="Wedding Reception Details"
    >
      {/* Reception illustration */}
      <figure
        data-event-illustration
        className="reception-illustration-wrapper w-full mb-5 flex justify-start items-center pointer-events-none select-none"
      >
        <img
          src="/images/invitation-events/reception-radha-krishna.png"
          alt="Divine Radha Krishna blessing Sanjeevi and Nila"
          aria-hidden="true"
          className="reception-illustration w-full h-auto max-w-[460px] object-contain filter drop-shadow-[0_6px_16px_rgba(113,13,24,0.12)]"
          loading="lazy"
        />
      </figure>

      {/* Main Content */}
      <div className="reception-content-group relative z-10 w-full flex flex-col pt-3">

        {/* ── HEADING: Drop-cap R + ECEPTION ── */}
        <h2
          data-event-title
          className="reception-heading leading-none flex items-baseline gap-0 mt-3 sm:mt-4"
          style={{ fontFamily: "'Cinzel', Georgia, serif", marginBottom: "0px" }}
        >
          {/* Large drop-cap first letter */}
          <span
            className="text-[#710D18] font-bold [text-shadow:0_1px_0_rgba(255,255,255,0.85)]"
            style={{ fontSize: "clamp(58px, 15vw, 76px)", lineHeight: 1 }}
          >
            R
          </span>
          {/* Rest of heading in smaller caps, baseline-aligned */}
          <span
            className="text-[#710D18] font-bold tracking-[0.06em] uppercase [text-shadow:0_1px_0_rgba(255,255,255,0.85)]"
            style={{ fontSize: "clamp(28px, 7.5vw, 38px)", lineHeight: 1 }}
          >
            ECEPTION
          </span>
        </h2>

        {/* ── Gold Lotus Divider ── */}
        <LotusDivider />

        {/* ── Date ── */}
        <p
          data-event-date
          className="font-['Cinzel',Georgia,serif] font-bold text-[#49633D]"
          style={{ fontSize: "clamp(14px, 3.8vw, 18px)" }}
        >
          {event.date}
        </p>

        {/* ── Venue ── */}
        <h3
          data-event-venue
          className="font-['Playfair_Display',Georgia,serif] font-bold text-[#710D18] leading-[1.25] mt-2 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
          style={{ fontSize: "clamp(18px, 4.8vw, 23px)" }}
        >
          {event.venue}
        </h3>

        {/* ── Address ── */}
        <p
          data-event-address
          className="font-sans text-[#553B29] leading-snug mt-1 max-w-[300px]"
          style={{ fontSize: "clamp(13px, 3.4vw, 15px)" }}
        >
          {event.address}
        </p>

        {/* ── Map ── */}
        <div className="reception-map-wrapper w-full mt-3">
          <VenueMapCard event={event} />
        </div>

        {/* ── Welcome Message ── */}
        <div className="reception-welcome-wrapper w-full mt-4">
          <p
            data-event-welcome
            className="reception-welcome font-['Cormorant_Garamond',Georgia,serif] text-[17px] sm:text-[19px] font-medium text-[#710D18] leading-relaxed [text-shadow:0_1px_0_rgba(255,255,255,0.6)]"
          >
            {event.welcomeMessage}
          </p>
        </div>
      </div>
    </section>
  );
};
