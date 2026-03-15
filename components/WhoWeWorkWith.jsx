"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const goodFit = [
  "Series A/B startups ready to scale",
  "Enterprise brands seeking a refresh",
  "Design-conscious founders with vision",
  "Long-term partnership mindset",
  "Teams who value craft over shortcuts",
  "Global companies, any timezone",
];

const notFit = [
  "One-week turnaround requests",
  "No budget allocated for quality",
  "Looking for cheap, fast work",
  "Micromanagement culture",
  "Unclear goals or shifting briefs",
  "No trust in the creative process",
];

export default function WhoWeWorkWith() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".www-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".www-heading",
          start: "top 85%",
        },
      });

      gsap.from(".fit-col", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fit-cols",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 border-t border-white/5"
      id="about"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
      {/* Label */}
      <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase block mb-14">
        05 — Who We Work With
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">
        {/* Heading */}
        <h2
          className="www-heading font-black text-white tracking-[-0.03em]"
          style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
        >
          Who We
          <br />
          Work With
        </h2>
        {/* Tagline */}
        <p className="text-sm text-muted leading-relaxed self-end">
          We partner with people, not projects. We are selective because we want
          to give our absolute best to each client. The work depends on it.
        </p>
      </div>

      {/* Fit columns */}
      <div className="fit-cols grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
        {/* Good Fit */}
        <div className="fit-col bg-black p-8 md:p-10">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase font-bold">
              Good Fit
            </span>
          </div>
          <ul className="space-y-4">
            {goodFit.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="shrink-0 mt-0.5 text-accent"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm text-white/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not a Fit */}
        <div className="fit-col bg-black p-8 md:p-10">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-[10px] font-mono text-muted tracking-[0.2em] uppercase font-bold">
              Not a Fit
            </span>
          </div>
          <ul className="space-y-4">
            {notFit.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="shrink-0 mt-0.5 text-white/20"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="text-sm text-muted line-through decoration-white/15 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
