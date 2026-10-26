"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface BackgroundMusicControllerProps {
  audioUrl?: string;
  isOpened?: boolean;
}

export const BackgroundMusicController: React.FC<BackgroundMusicControllerProps> = ({
  audioUrl = "/music.mp3",
  isOpened = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isOpened && !hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented by browser:", err);
        });
    }
  }, [isOpened, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => console.log("Play error:", err));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      {/* Floating Audio Control Button - Clean, Elegant Circular Design */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 select-none">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
          title={isPlaying ? "Mute music" : "Play music"}
          className="group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#350A10]/90 hover:bg-[#4A0E17] border border-[#C9A46A]/80 shadow-[0_4px_20px_rgba(45,6,7,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C9A46A]/50 cursor-pointer"
        >
          {/* Subtle golden pulse ripple when music is active */}
          {isPlaying && (
            <span
              className="absolute inset-0 rounded-full border border-[#C9A46A] opacity-40 animate-ping pointer-events-none"
              style={{ animationDuration: "2.4s" }}
            />
          )}

          {/* Smooth Rotating Music Icon when playing, previous VolumeX when muted */}
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center pointer-events-none origin-center"
            >
              <Music className="w-5 h-5 text-[#FDE9B8] drop-shadow-[0_0_6px_rgba(253,233,184,0.6)]" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5 text-[#C9A46A] transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>
    </>
  );
};
