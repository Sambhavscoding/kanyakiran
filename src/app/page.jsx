import HeroSection from '@/components/sections/HeroSection';
import AbAurNahiSection from '@/components/sections/AbAurNahiSection';
import FourPillarsSection from '@/components/sections/FourPillarsSection';
import HowToParticipateSection from '@/components/sections/HowToParticipateSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import MissionTransitionSection from '@/components/sections/MissionTransitionSection';
import FactsSection from '@/components/sections/FactsSection';
import WhatYouCanDoSection from '@/components/sections/WhatYouCanDoSection';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-clip bg-[#f7f2ff] text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2–5. Campaign sections on unified #f7f2ff background */}
      <div className="w-full max-w-full bg-[#f7f2ff]">
        <AbAurNahiSection />
        <FourPillarsSection />
        <HowToParticipateSection />
        <WhoWeAreSection />
      </div>

      {/* 6. Our Mission (locked sticky) → noise dissolves to black */}
      <MissionTransitionSection />

      {/* 7. Facts Section (Pure black screen destination) */}
      <FactsSection />

      {/* 8. What You Can Do Section */}
      <WhatYouCanDoSection />

      {/* 9. Editorial Footer */}
      <Footer />
    </main>
  );
}
