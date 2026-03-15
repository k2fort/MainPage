"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import StudioStandard from "@/components/StudioStandard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <main className="bg-black" style={{ visibility: loaded ? "visible" : "hidden" }}>
        <CustomCursor />
        <Nav />
        <Hero />
        <Marquee />
        <CaseStudies />
        <Marquee reverse />
        <Process />
        <Marquee />
        <StudioStandard />
        <Marquee reverse />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
