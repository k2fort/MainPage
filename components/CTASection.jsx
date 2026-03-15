"use client";

import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTASection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const liquidColors = useMemo(() => ["#5227FF", "#FF9FFC", "#B19EEF"], []);

  useGSAP(
    () => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-t border-white/5 overflow-hidden"
      id="contact"
    >
      {/* LiquidEther WebGL background */}
      <div className="absolute inset-0 z-0 opacity-75">
        <LiquidEther
          colors={liquidColors}
          mouseForce={25}
          cursorSize={120}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.7}
          autoIntensity={4.0}
          takeoverDuration={0.25}
          autoResumeDelay={200}
          autoRampDuration={0.3}
        />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-8 3xl:px-16">
        {/* Label — left aligned */}
        <span className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase block mb-10">
          04 — CONTACT
        </span>

        <div className="cta-content flex flex-col items-center text-center gap-6">
          <h2
            className="font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            Ready to start a project?
          </h2>
          <p className="text-xs font-mono text-muted tracking-widest">
            I typically respond within 24 hours
          </p>

          {status === "success" ? (
            <div className="w-full max-w-lg mt-4 flex flex-col items-center gap-3 py-12">
              <p className="text-accent font-black text-lg tracking-widest uppercase">Message Sent</p>
              <p className="text-xs font-mono text-muted tracking-widest">I'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-[10px] font-mono text-white/40 hover:text-white tracking-[0.2em] uppercase transition-colors duration-200"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mt-4 flex flex-col gap-4 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-muted tracking-[0.2em] uppercase">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-accent transition-colors duration-200 placeholder:text-white/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-muted tracking-[0.2em] uppercase">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-accent transition-colors duration-200 placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-muted tracking-[0.2em] uppercase">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-accent transition-colors duration-200 placeholder:text-white/20 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-[11px] font-mono text-red-400 tracking-widest text-center">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="self-center bg-accent text-black font-black text-xs px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 tracking-[0.2em] uppercase mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "loading" ? "Sending..." : "Send Email"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
