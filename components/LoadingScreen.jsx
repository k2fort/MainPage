"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const overlayRef = useRef(null);
  const hasCompleted = useRef(false);

  useEffect(() => {
    let current = 0;
    const duration = 2600; // ms total
    const interval = 18;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      current += increment;
      const clamped = Math.min(Math.floor(current), 100);
      setPercent(clamped);

      if (clamped >= 100 && !hasCompleted.current) {
        hasCompleted.current = true;
        clearInterval(timer);

        // Wait a beat then fade out
        setTimeout(() => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => onComplete?.(),
          });
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10"
      style={{ backgroundColor: "#0d090a" }}
    >
      {/* Loader animation */}
      <span className="loader-bubble" />

      {/* Text + percentage */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-[11px] font-mono text-white/50 tracking-[0.3em] uppercase">
          THE SITE IS LOADING ...
        </p>
        <p className="text-[11px] font-mono tracking-widest" style={{ color: "#f46036" }}>
          {percent}%
        </p>
      </div>

      <style>{`
        .loader-bubble {
          display: block;
          width: 84px;
          height: 84px;
          position: relative;
        }
        .loader-bubble:before,
        .loader-bubble:after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f46036;
          transform: translate(-50%, 0%) scale(1);
          animation: push_401 2s infinite linear;
        }
        .loader-bubble:after {
          animation-delay: 1s;
        }
        @keyframes push_401 {
          0%, 50% {
            transform: translate(-50%, 0%) scale(1);
          }
          100% {
            transform: translate(-50%, -100%) scale(0);
          }
        }
      `}</style>
    </div>
  );
}
