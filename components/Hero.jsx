"use client";

import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef(null);

  const hyperspeedOptions = useMemo(() => ({
    distortion: 'mountainDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xeb383e, 0xff102a],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xdadafa
    }
  }), []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.6 });

      tl.from(".hero-tag", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".hero-title-word",
          {
            opacity: 0,
            y: 80,
            stagger: 0.12,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-visual",
          {
            opacity: 0,
            scale: 0.97,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      id="home"
    >
      {/* Top taglines row */}
      <div className="flex justify-center pt-28 pb-2">
        <div className="max-w-[1920px] w-full px-8 md:px-12 3xl:px-16 flex justify-between items-center">
          <span className="hero-tag text-[10px] text-muted font-mono tracking-[0.2em] uppercase">
            00 - WELCOME
          </span>
          <span className="hero-tag text-[10px] text-muted font-mono tracking-[0.2em] uppercase text-right hidden sm:inline-flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: "#39ff14",
                boxShadow: "0 0 6px #39ff14",
                animation: "blink 1.1s step-start infinite",
              }}
            />
            <span>STATUS: OPERATIONAL</span>
          </span>
        </div>
      </div>

      {/* Giant title */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-4 pb-8">
        <h1 className="relative" style={{ lineHeight: 1 }}>
          <span
            className="hero-title-word block font-black tracking-[-0.04em] relative z-10"
            style={{ fontSize: "clamp(52px, 9vw, 140px)", lineHeight: 0.88 }}
          >
            <span className="text-white">Hi, im </span><span style={{ color: "#f46036" }}>Tony</span>
          </span>
          <span
            className="hero-title-word block font-black tracking-[-0.04em] relative z-0"
            style={{
              fontSize: "clamp(52px, 9vw, 140px)",
              lineHeight: 0.88,
              color: "#f46036",
              marginTop: "-0.18em",
            }}
          >
            Smosh
          </span>
        </h1>

        {/* Subtitle row */}
        <div className="w-full max-w-3xl flex justify-center mt-8 px-4">
          <p className="hero-sub text-sm text-muted text-center leading-relaxed tracking-wide max-w-xl">
            Helping founders launch faster, convert better, and automate smarter through premium web design and custom AI workflows.
          </p>
        </div>
      </div>

      {/* Hero visual card */}
      <div className="px-4 md:px-8 3xl:px-16 flex justify-center">
        <div
          className="hero-visual relative w-full max-w-[1920px] rounded-2xl overflow-hidden"
          style={{ height: "52vh", minHeight: "340px" }}
        >
          {/* Hyperspeed WebGL effect */}
          <Hyperspeed effectOptions={hyperspeedOptions} />

          {/* Section counter overlay */}
          <div className="absolute top-5 left-6 text-[10px] font-mono text-white/60 tracking-widest pointer-events-none z-10">
            PRESS AND HOLD TO RIDE FASTER
          </div>

          {/* Inner shadow overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              boxShadow: "inset 0 0 80px 20px rgba(0,0,0,0.7)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
