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
          ".wedding-heading, .reception-heading, .drop-cap-letter, .event-title-rest, .lotus-divider-flower, .lotus-divider-line, .wedding-hands-art, .reception-illustration, .venue-map-card, .wedding-welcome, .reception-welcome, [data-celebration-vine]",
          { y: 0, x: 0, scale: 1, rotate: 0, scaleX: 1, opacity: 1, clipPath: "none", filter: "none" }
        );
      });

      // 2. Coordinated GSAP reveals on actual existing elements (no content stays hidden)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Continuous Lotus Vine: Mask Reveal Animation from Bottom to Top
        gsap.fromTo(
          "[data-celebration-vine]",
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0.35,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".celebration-scene",
              start: "top 85%",
              once: true,
            },
          }
        );

        // A. Wedding Section Elements
        const weddingTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".wedding-heading",
            start: "top 88%",
            once: true,
          },
        });

        // 1. Drop cap W blooms & scales into place
        weddingTl
          .from(".wedding-section .drop-cap-letter", {
            scale: 1.35,
            rotate: -8,
            opacity: 0,
            duration: 0.75,
            ease: "back.out(1.6)",
          }, 0)
          // 2. Rest of "EDDING" mask wipes from left to right
          .from(".wedding-section .event-title-rest", {
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0,
            x: 8,
            duration: 0.7,
            ease: "power2.out",
          }, 0.12)
          // 3. Lotus flower blooms with spin
          .from(".wedding-section .lotus-divider-flower", {
            scale: 0.2,
            rotate: -60,
            opacity: 0,
            duration: 0.65,
            ease: "back.out(1.8)",
          }, 0.22)
          // 4. Divider gold lines expand outward
          .from(".wedding-section .lotus-divider-line", {
            scaleX: 0,
            duration: 0.65,
            ease: "power2.out",
          }, 0.28)
          // 5. Date, venue, and address slide in smoothly
          .from(
            ".wedding-section [data-event-date], .wedding-section [data-event-venue], .wedding-section [data-event-address]",
            {
              y: 14,
              opacity: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: "power2.out",
            },
            0.35
          );

        // Watermark hands art
        gsap.from(".wedding-hands-art", {
          scrollTrigger: {
            trigger: ".wedding-hands-wrapper",
            start: "top 88%",
            once: true,
          },
          x: 35,
          scale: 0.88,
          opacity: 0,
          duration: 0.95,
          ease: "power2.out",
        });

        // Venue map 3D perspective fold-in
        gsap.from(".wedding-map-wrapper .venue-map-card", {
          scrollTrigger: {
            trigger: ".wedding-map-wrapper",
            start: "top 88%",
            once: true,
          },
          rotateX: 14,
          y: 22,
          scale: 0.93,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
        });

        // Welcome quote with subtle blur clearing
        gsap.from(".wedding-welcome", {
          scrollTrigger: {
            trigger: ".wedding-welcome-wrapper",
            start: "top 90%",
            once: true,
          },
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.75,
          ease: "power2.out",
        });

        // B. Reception Section Elements
        // 1. Divine illustration floats in with soft scale & blur
        gsap.from(".reception-illustration", {
          scrollTrigger: {
            trigger: ".reception-illustration-wrapper",
            start: "top 88%",
            once: true,
          },
          y: 28,
          scale: 0.92,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1.0,
          ease: "power2.out",
        });

        const receptionTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".reception-heading",
            start: "top 88%",
            once: true,
          },
        });

        // 2. Drop cap R blooms & scales into place
        receptionTl
          .from(".reception-section .drop-cap-letter", {
            scale: 1.35,
            rotate: -8,
            opacity: 0,
            duration: 0.75,
            ease: "back.out(1.6)",
          }, 0)
          // 3. Rest of "ECEPTION" mask wipes
          .from(".reception-section .event-title-rest", {
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0,
            x: 8,
            duration: 0.7,
            ease: "power2.out",
          }, 0.12)
          // 4. Lotus flower blooms
          .from(".reception-section .lotus-divider-flower", {
            scale: 0.2,
            rotate: -60,
            opacity: 0,
            duration: 0.65,
            ease: "back.out(1.8)",
          }, 0.22)
          // 5. Divider gold lines expand outward
          .from(".reception-section .lotus-divider-line", {
            scaleX: 0,
            duration: 0.65,
            ease: "power2.out",
          }, 0.28)
          // 6. Date, venue, and address slide in smoothly
          .from(
            ".reception-section [data-event-date], .reception-section [data-event-venue], .reception-section [data-event-address]",
            {
              y: 14,
              opacity: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: "power2.out",
            },
            0.35
          );

        // Reception map 3D fold-in
        gsap.from(".reception-map-wrapper .venue-map-card", {
          scrollTrigger: {
            trigger: ".reception-map-wrapper",
            start: "top 88%",
            once: true,
          },
          rotateX: 14,
          y: 22,
          scale: 0.93,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
        });

        // Reception welcome quote
        gsap.from(".reception-welcome", {
          scrollTrigger: {
            trigger: ".reception-welcome-wrapper",
            start: "top 90%",
            once: true,
          },
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.75,
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
            willChange: "clip-path",
          }}
          loading="eager"
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
