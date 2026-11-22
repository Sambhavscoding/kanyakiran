import HeroSection from '@/components/sections/HeroSection';
import AbAurNahiSection from '@/components/sections/AbAurNahiSection';
import FourPillarsSection from '@/components/sections/FourPillarsSection';
import HowToParticipateSection from '@/components/sections/HowToParticipateSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import MissionTransitionSection from '@/components/sections/MissionTransitionSection';
import FactsSection from '@/components/sections/FactsSection';
import WhatYouCanDoSection from '@/components/sections/WhatYouCanDoSection';
import Footer from '@/components/common/Footer';
import { FractalDotGrid } from '@/components/ui/bg-animated-fractal-dot-grid';

export default function Home() {
  return (
    <main className="relative w-full max-w-full overflow-x-clip bg-[#f7f2ff] text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Continuous interactive fractal dot grid across all white screens */}
      <FractalDotGrid className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* 1. Hero Section (Opaque z-20 covers the background dots) */}
      <HeroSection />

      {/* 2–5. Campaign sections on unified #f7f2ff background with continuous dots */}
      <div className="relative z-10 w-full max-w-full bg-transparent">
        <AbAurNahiSection />
        <FourPillarsSection />
        <HowToParticipateSection />
        <WhoWeAreSection />
      </div>

      {/* 6. Our Mission (locked sticky) → noise dissolves to black */}
      <MissionTransitionSection />

      {/* 7. Facts Section (Pure black screen destination, covers the dots) */}
      <FactsSection />

      {/* 8. What You Can Do Section (with continuous dots) */}
      <WhatYouCanDoSection />

      {/* 9. Editorial Footer (with continuous dots) */}
      <Footer />
    </main>
  );
}
