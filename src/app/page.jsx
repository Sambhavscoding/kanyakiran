import HeroSection from '@/components/sections/HeroSection';
import AbAurNahiSection from '@/components/sections/AbAurNahiSection';
import FourPillarsSection from '@/components/sections/FourPillarsSection';
import HowToParticipateSection from '@/components/sections/HowToParticipateSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#f7f2ff] text-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. Hero Section (manages its own #0e0e0e dark background) */}
      <HeroSection />

      {/* Campaign sections sharing unified #f7f2ff background */}
      <div className="w-full max-w-full bg-[#f7f2ff] min-h-screen">
        {/* 2. #AbAurNahi Section */}
        <AbAurNahiSection />

        {/* 3. The Four Pillars Section */}
        <FourPillarsSection />

        {/* 4. How To Participate Section */}
        <HowToParticipateSection />

        {/* 5. Who We Are Section */}
        <WhoWeAreSection />
      </div>
    </main>
  );
}
