"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const NavigationIcon = ({
  children,
  textClass,
  parentDivClass,
  innerDivClass,
  opposite = false,
  duration = 0.5,
  onClick,
  // legacy props — unused in new implementation
  stagger,
  borderClass,
  translateYUp,
  translateYDown,
}) => {
  const wrapRef = useRef(null);
  const s1 = useRef(null);
  const s2 = useRef(null);
  const lastDir = useRef(1);

  useEffect(() => {
    gsap.set(s2.current, { y: "110%" });
  }, []);

  const handleMouseEnter = (e) => {
    if (!wrapRef.current) return;
    const { top, height } = wrapRef.current.getBoundingClientRect();
    const fromTop = e.clientY < top + height / 2;
    const sign = opposite ? -1 : 1;
    const dir = fromTop ? 1 : -1;
    lastDir.current = dir;

    gsap.to(s1.current, {
      y: `${dir * -110 * sign}%`,
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.fromTo(
      s2.current,
      { y: `${dir * 110 * sign}%` },
      { y: "0%", duration, ease: "power2.out", overwrite: "auto" }
    );
  };

  const handleMouseLeave = () => {
    const sign = opposite ? -1 : 1;
    gsap.to(s1.current, {
      y: "0%",
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(s2.current, {
      y: `${lastDir.current * 110 * sign}%`,
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden cursor-pointer", parentDivClass, innerDivClass)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span ref={s1} className={cn("block", textClass)}>
        {children}
      </span>
      <span
        ref={s2}
        className={cn("absolute inset-0 flex items-center justify-center", textClass)}
      >
        {children}
      </span>
    </div>
  );
};

export { NavigationIcon };
