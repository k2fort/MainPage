"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NavigationIcon } from "@/components/ui/navigation-icon";

const links = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Animate in
    gsap.from(navRef.current, {
      y: -16,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.3,
      clearProps: "transform",
    });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10"
          : "bg-black/85 backdrop-blur-lg border-b border-white/8"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-8 py-5 flex items-center justify-between">
      {/* Logo */}
      <a href="#" className="flex items-center gap-0 group">
        <span className="text-accent font-black text-lg leading-none group-hover:scale-110 transition-transform duration-200">
          TONYSMOSH
        </span>
        <span className="text-accent font-black text-lg leading-none group-hover:scale-110 transition-transform duration-200">
          .
        </span>
        <span className="text-white font-black text-lg leading-none tracking-tight uppercase group-hover:scale-110 transition-transform duration-200">
          COM
        </span>
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((item) => (
          <a key={item.label} href={item.href}>
            <NavigationIcon
              parentDivClass="!min-h-0"
              innerDivClass="h-[1.1em]"
              textClass="text-[13px] text-white/55 hover:text-white tracking-widest uppercase font-medium leading-none"
              translateYUp={130}
              translateYDown={130}
              opposite={true}
              duration={0.45}
              stagger={0.04}
              borderClass=""
            >
              {item.label}
            </NavigationIcon>
          </a>
        ))}
      </div>

      {/* Mobile menu icon */}
      <button className="md:hidden flex flex-col gap-1.5 p-1">
        <span className="w-6 h-px bg-white block" />
        <span className="w-4 h-px bg-white block" />
      </button>
      </div>
    </nav>
  );
}
