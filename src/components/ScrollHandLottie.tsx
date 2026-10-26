"use client";

import React, { useEffect, useRef } from "react";
import scrollHandData from "@/data/scrollHandAnimation.json";

interface ScrollHandLottieProps {
  className?: string;
}

export const ScrollHandLottie: React.FC<ScrollHandLottieProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;
    let isMounted = true;

    if (containerRef.current) {
      import("lottie-web").then((lottieModule) => {
        if (!isMounted || !containerRef.current) return;
        const lottie = lottieModule.default || lottieModule;
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: scrollHandData,
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
      className={className}
      aria-hidden="true"
    />
  );
};

export default ScrollHandLottie;
