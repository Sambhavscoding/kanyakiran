import HeroSection from '@/components/sections/HeroSection';
import AbAurNahiSection from '@/components/sections/AbAurNahiSection';
import FourPillarsSection from '@/components/sections/FourPillarsSection';

export default function Home() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#0e0e0e] text-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Sections 2 & 3 share #f7f2ff background container to eliminate mobile sub-pixel seam */}
      <div className="w-full max-w-full bg-[#f7f2ff]">
        {/* 2. #AbAurNahi Section */}
        <AbAurNahiSection />

        {/* 3. The Four Pillars Section */}
        <FourPillarsSection />
      </div>
    </main>
  );
}
