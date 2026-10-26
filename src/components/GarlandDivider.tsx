"use client";

import React from "react";
import { motion } from "framer-motion";

interface GarlandDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GarlandDivider: React.FC<GarlandDividerProps> = ({
  className = "",
  style,
}) => {
  return (
    <div
      className={`relative z-30 w-full h-0 flex items-center justify-center pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="w-full max-w-md px-2 sm:px-4 flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          src="/golden-floral-garland-divider.png"
          alt="Golden Floral Garland Divider"
          className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(181,134,63,0.22)]"
          loading="lazy"
        />
      </div>
    </div>
  );
};
