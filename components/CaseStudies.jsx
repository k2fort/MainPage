"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    title: "Budget app",
    image: "/images/budgetFinal.png",
    industry: "Tech / SaaS",
    tags: "React, Tailwind",
    status: "LIVE",
    statusColor: "#39ff14",
    description:
      "A full-featured personal finance dashboard built with React and Tailwind CSS. Real-time expense tracking, savings goals, category breakdowns, and monthly trend charts — designed to help users take full control of their money.",
  },
  {
    title: "PetShop Store",
    image: "/images/petshopFinal.png",
    industry: "E-Comm / Store",
    tags: "Next.js, React, Tailwind, GSAP",
    status: "For Sale",
    statusColor: "#888",
    description:
      "A modern e-commerce storefront for a pet supply brand. Full product catalog, cart, and checkout flow built with Next.js. GSAP-powered micro-animations elevate the browsing experience into a premium purchase journey.",
  },
  {
    title: "Barber Shop",
    image: "/images/barbershopFinal.png",
    industry: "Landing Page / One Page",
    tags: "Next.js, React, Tailwind, GSAP",
    status: "For Sale",
    statusColor: "#888",
    description:
      "High-impact one-page site for Loca Barbershop. Cinematic hero section, bold Hebrew typography, and scroll-triggered GSAP animations that capture the brand's premium street barbershop identity.",
  },
  {
    title: "Pool services",
    image: "/images/poolsFinal.png",
    industry: "Landing Page / One Page",
    tags: "Next.js, React, Tailwind, GSAP",
    status: "For Sale",
    statusColor: "#888",
    description:
      "Clean, conversion-focused landing page for AquaElat, a luxury pool maintenance company. Service packages, trust-building testimonials, and a lead capture form — fully RTL-compatible for the Israeli market.",
  },
  {
    title: "Real-estate agency",
    image: "/images/realestateFinal.png",
    industry: "Landing Page / One Page",
    tags: "React, Tailwind, GSAP",
    status: "For Sale",
    statusColor: "#888",
    description:
      "Elegant landing page for Aura, a high-end real estate agency. Immersive full-screen hero, curated property listings, and a sophisticated GSAP scroll experience built to attract and convert luxury buyers worldwide.",
  },
];

function ProjectCard({ project, index, onClick }) {
  return (
    <div
      className="project-card group relative rounded-xl overflow-hidden bg-card cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: project.image
              ? undefined
              : "radial-gradient(ellipse at 40% 60%, rgba(80,0,180,0.6), rgba(0,0,0,0.95))",
          }}
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
        </div>

        {/* Bottom gradient */}
        <div className="project-overlay absolute inset-0" />

        {/* Tags badges — top left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {project.tags.split(",").map((tag) => (
            <span
              key={tag.trim()}
              className="bg-black/60 backdrop-blur-sm text-white/80 text-[9px] font-mono px-2 py-0.5 rounded-full tracking-[0.08em]"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Arrow on hover */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm mb-3 tracking-tight group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-mono text-muted tracking-widest uppercase mb-0.5">
              Industry
            </p>
            <p className="text-[11px] text-white/70 font-medium">{project.industry}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-muted tracking-widest uppercase mb-0.5">
              Status
            </p>
            <p className="text-[11px] text-white/70 font-medium flex items-center gap-1.5 justify-end">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: project.statusColor }}
              />
              {project.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandedCard({ project, onBack }) {
  const panelRef = useRef(null);
  const projectIndex = projects.findIndex((p) => p.title === project.title) + 1;
  const tagList = project.tags.split(",").map((t) => t.trim());

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".expand-item");
    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "none" }
    );
    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const handleBack = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onBack,
    });
  };

  return (
    <div ref={panelRef} style={{ opacity: 0 }}>
      {/* Back button */}
      <button
        onClick={handleBack}
        className="expand-item flex items-center gap-2 text-muted hover:text-white text-[11px] font-mono tracking-widest uppercase mb-8 transition-colors duration-200 group"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:-translate-x-1 transition-transform duration-200"
        >
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        Back to projects
      </button>

      {/* Content grid */}
      <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-center">
        {/* Image — 3/5 */}
        <div
          className="expand-item md:col-span-3 relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: "16/10", minHeight: "260px" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Details — 2/5 */}
        <div className="md:col-span-2 flex flex-col gap-5 py-2">
          <div className="expand-item">
            <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase">
              Project {String(projectIndex).padStart(2, "0")}
            </span>
          </div>

          <h2
            className="expand-item font-black text-white tracking-[-0.02em] leading-none"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
          >
            {project.title}
          </h2>

          <div className="expand-item flex items-center gap-8">
            <div>
              <p className="text-[10px] font-mono text-muted tracking-widest uppercase mb-1">
                Industry
              </p>
              <p className="text-sm text-white/80 font-medium">{project.industry}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted tracking-widest uppercase mb-1">
                Status
              </p>
              <p className="text-sm text-white/80 font-medium flex items-center gap-1.5">
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: project.statusColor }}
                />
                {project.status}
              </p>
            </div>
          </div>

          <p className="expand-item text-sm text-white/55 leading-relaxed">
            {project.description}
          </p>

          <div className="expand-item flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className="bg-white/5 border border-white/10 text-white/55 text-[10px] font-mono px-3 py-1 rounded-full tracking-[0.08em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [expandedProject, setExpandedProject] = useState(null);

  useGSAP(
    () => {
      gsap.from(".studies-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".studies-heading",
          start: "top 85%",
        },
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Animate grid back in after collapse
  useEffect(() => {
    if (!expandedProject && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" }
        );
      }
    }
  }, [expandedProject]);

  const handleCardClick = (project) => {
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.to(cards, {
      opacity: 0,
      y: -18,
      scale: 0.96,
      stagger: 0.04,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setExpandedProject(project),
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 border-t border-white/5"
      id="projects"
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
        {/* Top row: label */}
        <div className="mb-10">
          <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase">
            01 — PROJECTS
          </span>
        </div>

        {/* Section heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2
            className="studies-heading font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
          >
            Projects Database
          </h2>
          <p className="text-xs text-muted leading-relaxed max-w-sm">
            Selections cut from the best of display. Scroll to explore, click to
            uncover case stories.
          </p>
        </div>

        {/* Grid or expanded view */}
        {expandedProject ? (
          <ExpandedCard
            project={expandedProject}
            onBack={() => setExpandedProject(null)}
          />
        ) : (
          <div
            ref={gridRef}
            className="projects-grid grid grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-3 md:gap-4"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onClick={() => handleCardClick(project)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
