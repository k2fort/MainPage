"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function StudioStandard() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".standard-text", {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".standard-text",
          start: "top 85%",
        },
      });

      gsap.from(".standard-img", {
        opacity: 0,
        x: 40,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".standard-images",
          start: "top 80%",
        },
      });

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
      {/* Label */}
      <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase block mb-14">
        03 — ABOUT
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left: text content */}
        <div className="standard-text">
          <h2
            className="font-black text-white tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)" }}
          >
            About Me
          </h2>
          <p className="text-base text-muted leading-relaxed mb-6 max-w-none">
            Hi, I'm Tony Smosh. My journey in the digital space began back in 2005, tinkering with raw HTML and the early days of Photoshop. What started as a fascination with how things look and function on a screen quickly evolved into a lifelong passion for digital craftsmanship. Over the years, I've watched the web transform, and I've grown right alongside it, expanding my toolkit from basic static layouts to building robust, dynamic digital experiences.
          </p>
          <p className="text-base text-muted leading-relaxed max-w-none">
            Today, I specialize in designing and developing modern websites that push the envelope, seamlessly blending cutting-edge tools like AI integration and headless architecture (such as React paired with e-commerce platforms). My design philosophy revolves around a clean, minimalistic aesthetic that isn't afraid to step out of the box. I love breaking common design boundaries—like pushing UI elements slightly out of bounds to create striking visual interest—while keeping the overall feel light and engaging. By pairing intuitive interfaces with smooth reveal and scroll animations, my goal is always to deliver a user experience that is as memorable as it is highly functional.
          </p>
        </div>

        {/* Right: single image */}
        <div className="standard-images mt-16">
          <div className="standard-img relative rounded-xl overflow-hidden w-full h-full min-h-[420px]">
            <Image
              src="/images/about-tony.png"
              alt="Tony Smosh"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
