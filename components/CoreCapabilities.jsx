"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  {
    label: "Branding",
    className: "cap-branding",
    desc: "Visual Identity · Strategy · Systems",
    index: "01",
  },
  {
    label: "Product",
    className: "cap-product",
    desc: "UX/UI · Design Systems · Prototyping",
    index: "02",
  },
  {
    label: "Motion",
    className: "cap-motion",
    desc: "Animation · Video · Interactive",
    index: "03",
  },
  {
    label: "Web",
    className: "cap-web",
    desc: "Development · Performance · SEO",
    index: "04",
  },
];

export default function CoreCapabilities() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".cap-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cap-heading",
          start: "top 85%",
        },
      });

      gsap.from(".cap-card", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cap-cards-row",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      id="work"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
      {/* Label row */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase">
            01 — Capabilities
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 text-[10px] font-mono text-white/50 px-3 py-1.5 rounded-full tracking-widest">
            114 Services +
          </span>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted hover:text-white transition-colors duration-200 tracking-widest uppercase"
        >
          Watch Reel
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Heading */}
      <h2
        className="cap-heading font-black text-white tracking-[-0.03em] mb-12"
        style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
      >
        Core Capabilities
      </h2>

      {/* 4-card row */}
      <div className="cap-cards-row grid grid-cols-2 md:grid-cols-4 gap-3">
        {capabilities.map((cap) => (
          <div
            key={cap.label}
            className="cap-card group relative rounded-xl overflow-hidden cursor-pointer"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 ${cap.className} transition-transform duration-700 group-hover:scale-105`} />

            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Index */}
            <div className="absolute top-4 left-4 text-[9px] font-mono text-white/25 tracking-widest">
              {cap.index}
            </div>

            {/* Category */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[9px] font-mono text-white/35 tracking-widest uppercase mb-1.5">
                {cap.desc}
              </p>
              <h3 className="text-base font-bold text-white tracking-tight">
                {cap.label}
              </h3>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
