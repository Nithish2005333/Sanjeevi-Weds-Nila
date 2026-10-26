"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_EVENT, RECEPTION_EVENT } from "@/data/celebrationEvents";
import { WeddingSection } from "@/components/WeddingSection";
import { ReceptionSection } from "@/components/ReceptionSection";

export const CelebrationScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sceneRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // 1. Accessibility: prefers-reduced-motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".wedding-heading, .reception-heading, .wedding-hands-art, .reception-illustration, .venue-map-card, .wedding-welcome, .reception-welcome",
          { y: 0, opacity: 1 }
        );
      });

      // 2. Coordinated GSAP reveals on actual existing elements (no content stays hidden)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // A. Wedding Section Elements
        gsap.from(".wedding-heading", {
          scrollTrigger: {
            trigger: ".wedding-heading",
            start: "top 92%",
            once: true,
          },
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.from(".wedding-hands-art", {
          scrollTrigger: {
            trigger: ".wedding-hands-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 12,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".wedding-map-wrapper .venue-map-card", {
          scrollTrigger: {
            trigger: ".wedding-map-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 15,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
        });

        gsap.from(".wedding-welcome", {
          scrollTrigger: {
            trigger: ".wedding-welcome-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 10,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        });

        // B. Reception Section Elements
        gsap.from(".reception-illustration", {
          scrollTrigger: {
            trigger: ".reception-illustration-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 16,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(".reception-heading", {
          scrollTrigger: {
            trigger: ".reception-heading",
            start: "top 92%",
            once: true,
          },
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.from(".reception-map-wrapper .venue-map-card", {
          scrollTrigger: {
            trigger: ".reception-map-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 15,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
        });

        gsap.from(".reception-welcome", {
          scrollTrigger: {
            trigger: ".reception-welcome-wrapper",
            start: "top 92%",
            once: true,
          },
          y: 10,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        });
      });
    }, sceneRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      data-celebration-scene
      id="celebration-scene"
      className="celebration-scene relative w-full overflow-hidden bg-[#FFF7E6] select-none"
      style={{
        backgroundImage: "url('/images/invitation-events/ivory-paper.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* 1. Single Continuous Narrow Lotus Vine (mobile optimized, right edge anchored) */}
      <div
        data-celebration-decoration
        className="continuous-vine-layer pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          data-celebration-vine
          src="/images/invitation-events/continuous-lotus-vine-mobile.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-auto max-w-none object-contain object-right"
          style={{
            aspectRatio: "724 / 2172",
          }}
          loading="lazy"
        />
      </div>

      {/* 2. Content Layer (Padded safely with --event-rail so text/maps never overlap vine) */}
      <div data-celebration-content className="celebration-content relative z-10 w-full flex flex-col">
        {/* Wedding Ceremony Section */}
        <WeddingSection event={WEDDING_EVENT} />

        {/* Wedding Reception Section */}
        <ReceptionSection event={RECEPTION_EVENT} />
      </div>
    </div>
  );
};
