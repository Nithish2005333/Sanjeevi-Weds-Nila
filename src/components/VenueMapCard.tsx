"use client";

import React, { useMemo } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { CelebrationEvent, buildDirectionsUrl, buildEmbedMapUrl } from "@/data/celebrationEvents";

interface VenueMapCardProps {
  event: CelebrationEvent;
  className?: string;
}

export const VenueMapCard: React.FC<VenueMapCardProps> = ({ event, className = "" }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY?.trim();


  const embedUrl = useMemo(() => {
    if (!apiKey) return null;
    return buildEmbedMapUrl(apiKey, event.mapQuery);
  }, [apiKey, event.mapQuery]);

  const directionsUrl = useMemo(() => {
    return buildDirectionsUrl(event.mapQuery);
  }, [event.mapQuery]);

  const isWedding = event.id === "wedding";

  return (
    <div
      data-map-card
      className={`venue-map-card group/card w-full ${className}`}
      style={{
        borderColor: isWedding ? "#B75231" : "#49633D",
        transformOrigin: "top center",
      }}
    >
      {/* 1. Map Canvas Area (Responsive height, full iframe fit without cutoff or gap) */}
      <div
        data-map-canvas
        className="relative w-full h-[200px] sm:h-[230px] bg-[#EFE9DC] overflow-hidden select-none"
      >
        {embedUrl ? (
          <iframe
            title={`${event.venue} Map Location`}
            src={embedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full block border-0"
          />
        ) : (
          <iframe
            title={`${event.venue} Map Location`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(event.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=en`}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full block border-0"
          />
        )}
      </div>

      {/* 2. Flush Attached Directions Bar */}
      <a
        data-directions
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get Direction to ${event.venue}`}
        className="group/btn cursor-pointer transition-opacity duration-200 hover:opacity-95 active:scale-[0.99]"
        style={{
          backgroundColor: event.accentColor,
        }}
      >
        <MapPin className="w-3.5 h-3.5 shrink-0 text-white" aria-hidden="true" />
        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] whitespace-nowrap">
          Get Direction
        </span>
        <ExternalLink className="w-3 h-3 shrink-0 text-white opacity-90" aria-hidden="true" />
      </a>
    </div>
  );
};
