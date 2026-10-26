"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const reveal = (delay = 0, y = 15) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const FooterSection: React.FC = () => (
  <footer className="invitation-footer relative w-full text-center select-none border-t-0" aria-label="Footer and Gratitude">
    <div className="invitation-footer__visual relative aspect-[941/1672] w-full overflow-hidden">
      <img
        src="/assets/footer.webp"
        alt="Sacred Wedding Steps - Sanjeevi & Nila"
        aria-hidden="true"
        className="invitation-footer__photo absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
      <div className="invitation-footer__veil absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="invitation-footer__content invitation-footer__content--simple absolute inset-x-[10%] top-[35%] z-10 flex flex-col items-center">
        <motion.div className="invitation-footer__simple-message" {...reveal()}>
          <p>Together,</p>
          <h2>Our Beautiful journey</h2>
          <strong>begins...</strong>

          <p className="invitation-footer__closing-note">
            With grateful hearts, we thank you
            <br />
            for being part of our celebration.
          </p>
          <p className="invitation-footer__closing-signature">
            Sanjeevi <i>&</i> Nila
            <span><span className="font-serif-numbers font-bold">22</span>{" "}November <span className="font-serif-numbers font-bold">2026</span></span>
          </p>
        </motion.div>
      </div>

      <motion.div className="invitation-footer__credit absolute inset-x-0 bottom-0" {...reveal(0.08, 6)}>
        <p>
          Crafted with{" "}
          <Heart className="w-3 h-3 text-[#B83232] fill-[#B83232] inline-block mx-1 -mt-0.5" aria-hidden="true" />
          {" "}by{" "}
          <a
            href="https://nithish-portfolio-sigma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-bold text-[#570713]"
          >
            <strong>Nithish</strong>
          </a>
        </p>
      </motion.div>
    </div>
  </footer>
);
