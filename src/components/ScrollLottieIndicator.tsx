"use client";

import React, { useEffect, useRef } from "react";
import scrollAnimationData from "@/data/scrollAnimation.json";

interface ScrollLottieIndicatorProps {
  className?: string;
  onClick?: () => void;
}

export const ScrollLottieIndicator: React.FC<ScrollLottieIndicatorProps> = ({
  className = "",
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;
    let isMounted = true;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      import("lottie-web").then((lottieModule) => {
        if (!isMounted || !containerRef.current) return;
        const lottie = lottieModule.default || lottieModule;
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: JSON.parse(JSON.stringify(scrollAnimationData)),
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      });
    }

    return () => {
      isMounted = false;
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Scroll indication"
    />
  );
};

export default ScrollLottieIndicator;
