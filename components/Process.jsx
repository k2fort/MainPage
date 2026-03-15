"use client";

import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./ColorBends"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    number: "01",
    title: "Visual Identity & Design",
    desc: "Comprehensive branding solutions including logo design, visual systems, and brand guidelines.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Websites & Stores",
    desc: "High-performance websites and e-commerce stores designed for optimal user experience and conversion.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "WEB_GL",
    desc: "Immersive 3D experiences directly in the browser. Using shaders and particle systems to visualize complex data.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "SEO Optimization",
    desc: "System analysis and performance tuning. Reducing bundle sizes and improving Core Web Vitals for maximum speed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef(null);

  const colorBendsColors = useMemo(() => ["#ff5c7a", "#8a5cff", "#00ffd1"], []);

  useGSAP(
    () => {
      gsap.from(".process-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 85%",
        },
      });

      gsap.from(".process-step", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
      {/* Label */}
      <div className="mb-10">
        <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase">
          02 — SERVICES
        </span>
      </div>

      {/* Heading */}
      <div className="flex justify-end mb-20">
        <div className="text-right">
          <h2
            className="process-heading font-black text-white tracking-[-0.03em] mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
          >
            Services
          </h2>
          <p className="text-[11px] font-mono text-muted tracking-[0.18em] uppercase max-w-2xl">
            Deploying high-performance digital assets for the modern web. Optimized for scale and visual impact
          </p>
        </div>
      </div>

      {/* Main layout: image left, cards right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-stretch">
        {/* Left: ColorBends effect */}
        <div className="relative rounded-xl overflow-hidden min-h-[300px]">
          <ColorBends
            colors={colorBendsColors}
            rotation={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            transparent={false}
            autoRotate={3}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px 15px rgba(0,0,0,0.6)" }}
          />
        </div>

        {/* Right: 2x2 cards */}
        <div className="process-steps grid grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {steps.map((step) => (
            <div
              key={step.title}
              className="process-step bg-black p-6 md:p-8 group hover:bg-surface transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                {step.icon}
              </div>

              {/* Number */}
              <div className="text-[10px] font-mono text-muted tracking-widest uppercase mb-3">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white tracking-tight mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
