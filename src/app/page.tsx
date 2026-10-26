"use client";

import React, { useEffect, useState } from "react";
import { SplashEnvelopeModal } from "@/components/SplashEnvelopeModal";
import { HeroCoverSection } from "@/components/HeroCoverSection";
import { ParentsBlessingSection } from "@/components/ParentsBlessingSection";
import { CelebrationScene } from "@/components/CelebrationScene";
import { TamilCardSection } from "@/components/TamilCardSection";
import { FooterSection } from "@/components/FooterSection";
import { BackgroundMusicController } from "@/components/BackgroundMusicController";
import { SaveTheDateCalendarSection } from "@/components/SaveTheDateCalendarSection";
import { CoupleScrollJoinSection } from "@/components/CoupleScrollJoinSection";
import { GarlandDivider } from "@/components/GarlandDivider";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [invitationStarted, setInvitationStarted] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [introInteractionReady, setIntroInteractionReady] = useState(false);

  // If splash is bypassed, reveal hero immediately
  useEffect(() => {
    if (!showSplash) {
      setHeroRevealed(true);
    }
  }, [showSplash]);

  // Lock scroll while intro envelope / splash modal is visible
  useEffect(() => {
    if (showSplash && !introInteractionReady) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showSplash, introInteractionReady]);

  // Keep continuous decorative animations running while section is visible
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".invitation-hero");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-performance-visible",
            entry.isIntersecting
          );
        });
      },
      { rootMargin: "160px 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleOpenInvitation = () => {
    setShowSplash(false);
    setHeroRevealed(true);
  };

  const handleHeroReveal = () => {
    setHeroRevealed(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1A100B] flex justify-center items-center overflow-x-clip relative font-sans">
      {/* Floating Ambient Wedding Music Controller */}
      <BackgroundMusicController
        audioUrl="/music.mp3"
        isOpened={invitationStarted}
      />

      {/* Main Container Shell - Royal Invitation Parchment Frame */}
      <main className="invitation-shell relative w-full max-w-md mx-auto min-h-screen bg-[#FAF6F0] border-x border-[#C9A46A]/30 shadow-[0_0_80px_rgba(74,57,47,0.15)] z-10 flex flex-col">
        {/* 1. Hero Opening Section for Sanjeevi & Nila */}
        <HeroCoverSection isVisible={heroRevealed} />

        {/* Parents' Blessing & Family Story */}
        <ParentsBlessingSection />

        {/* Save The Date Calendar Section */}
        <SaveTheDateCalendarSection />

        {/* Celebration Scene: Wedding & Reception Sections */}
        <CelebrationScene />

        {/* Golden Floral Garland Divider at Celebration -> Couple Section Seam */}
        <GarlandDivider />

        {/* Couple Scroll Join Section */}
        <CoupleScrollJoinSection />

        {/* Traditional Tamil Invitation & Scan Card Viewer */}
        <TamilCardSection />

        {/* Golden Floral Garland Divider at Tamil Section -> Footer Seam */}
        <GarlandDivider />

        {/* Closing Journey Blessings & Footer */}
        <FooterSection />
      </main>

      {/* Royal Split Envelope / Video Splash Modal */}
      <SplashEnvelopeModal
        showSplash={showSplash}
        onOpening={() => setInvitationStarted(true)}
        onHeroReveal={handleHeroReveal}
        onInteractionReady={() => setIntroInteractionReady(true)}
        onOpen={handleOpenInvitation}
      />
    </div>
  );
}
