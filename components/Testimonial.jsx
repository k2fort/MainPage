"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Testimonial() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
      {/* Label */}
      <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase block mb-14">
        06 — Client Voice
      </span>

      <div className="testimonial-card rounded-2xl overflow-hidden bg-surface border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] min-h-[420px]">
          {/* Portrait */}
          <div className="relative bg-black/60 min-h-[280px] md:min-h-0">
            <Image
              src="/images/creative-strategy-2.png"
              alt="Alex Font"
              fill
              className="object-cover object-top opacity-70"
              sizes="340px"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent md:hidden" />
          </div>

          {/* Quote content */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            {/* Large quote mark */}
            <div
              className="text-accent font-black leading-none mb-6 select-none"
              style={{ fontSize: "72px", lineHeight: 1 }}
              aria-hidden
            >
              "
            </div>

            <blockquote
              className="font-bold text-white tracking-[-0.02em] leading-snug mb-8 flex-1"
              style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
            >
              They didn't just redesign our website; they reimagined how we
              communicate as a brand.
            </blockquote>

            <div>
              <p className="text-sm font-bold text-white mb-0.5">Alex Font</p>
              <p className="text-xs text-muted tracking-wide">
                Chief Brand Officer — Lumina Global
              </p>

              {/* Rating stars */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#f46036"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
