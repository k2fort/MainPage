"use client";

const items = [
  "UX RESEARCH",
  "REACT ENGINEERING",
  "AI INTEGRATION",
  "REACT HEADLESS",
  "SHOPIFY",
  "UI DESIGN",
];

export default function Marquee({ reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4 select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0d090a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d090a, transparent)" }} />

      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "Reverse" : ""} 30s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-[11px] font-mono text-muted tracking-[0.2em] uppercase"
          >
            {item}
            <span className="text-accent text-xs">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
