'use client';

import React, { useState } from 'react';
import { HERO_CONTENT } from '@/constants/content';
import { ArrowRight } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

const LAPTOP_FALLBACK = 'https://ik.imagekit.io/9plqngdvcd/laptop_fallback';
const PHONE_FALLBACK = 'https://ik.imagekit.io/9plqngdvcd/phone_fallback';

export default function HeroSection({ onOpenRegisterModal }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const scrollToRegister = () => {
    if (onOpenRegisterModal) {
      onOpenRegisterModal();
    } else {
      const element = document.getElementById('join-movement') || document.getElementById('register');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative z-20 w-full max-w-full h-[100dvh] lg:h-screen bg-[#0e0e0e] text-white flex items-end sm:items-center overflow-hidden pt-16 pb-12 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-32 shadow-[0_24px_50px_rgba(0,0,0,0.85)]">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Layer 1: Native HTML5 Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setIsVideoPlaying(true)}
            className={`w-full h-full object-cover scale-[1.32] sm:scale-[1.28] filter grayscale contrast-125 brightness-75 transition-opacity duration-1000 ${
              isVideoPlaying ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 2: Responsive Fallback Poster */}
        <picture
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out ${
            isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <source media="(max-width: 640px)" srcSet={PHONE_FALLBACK} />
          <img
            src={LAPTOP_FALLBACK}
            alt="Kanya Kiran Background"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 opacity-40"
          />
        </picture>

        {/* Layer 3: Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/95 via-[#0e0e0e]/80 to-[#0e0e0e]/40 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/70 pointer-events-none z-10" />
      </div>

      {/* Decorative Brand Petal Glows & Star Motifs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[650px] lg:max-w-[850px] h-full pointer-events-none opacity-50 lg:opacity-75 overflow-hidden select-none z-20">
        {/* Giant Electric Violet Petal Glow */}
        <div className="absolute -top-16 -right-24 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full bg-gradient-to-br from-[#7e3bed]/40 to-[#ff46a2]/30 blur-3xl transform -rotate-12" />

        {/* Pink Accent Glow */}
        <div className="absolute top-1/4 right-8 sm:right-28 w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full bg-gradient-to-tr from-[#ff46a2]/25 to-transparent blur-2xl transform rotate-45" />

        {/* Soft Radiant Violet Leaf Anchor */}
        <div className="absolute -bottom-20 -right-20 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-tl from-[#7e3bed]/30 via-[#d3bbff]/20 to-transparent blur-3xl transform -rotate-45" />

        {/* Brand Star Motif */}
        <div className="absolute top-24 right-16 sm:right-32 lg:right-44 pointer-events-auto cursor-pointer group">
          <BrandStar
            className="w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 text-[#ff46a2] opacity-100 sm:opacity-25 sm:group-hover:opacity-100 sm:group-hover:rotate-12 transition-all duration-200"
            strokeWidth={4.5}
          />
        </div>

        {/* Brand Star Motif - Lower right */}
        <div className="absolute bottom-24 right-8 sm:right-24 pointer-events-auto cursor-pointer group hidden sm:block">
          <BrandStar
            className="w-8 h-8 sm:w-11 sm:h-11 text-[#ff46a2] opacity-20 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
            strokeWidth={4}
          />
        </div>
      </div>

      {/* Floating Star Accent - Top left */}
      <div className="absolute top-20 left-6 sm:left-16 hidden sm:block pointer-events-auto cursor-pointer group z-20">
        <BrandStar
          className="w-8 h-8 sm:w-9 sm:h-9 text-[#ff46a2] opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col justify-end sm:justify-center items-start text-left">
        {/* Overlapping Dual Sticker Pill Callout */}
        <div className="inline-flex items-center mb-5 sm:mb-8 select-none">
          {/* Left Sticker */}
          <div className="relative z-10 -rotate-1 sm:-rotate-3 sm:hover:-rotate-1 transition-transform duration-200">
            <div className="bg-[#ff46a2] text-[#0e0e0e] px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-2xl font-bold text-xs sm:text-xs md:text-sm tracking-wide shadow-md">
              KANYA KIRAN DAY
            </div>
          </div>

          {/* Right Sticker */}
          <div className="relative z-20 -ml-2.5 sm:-ml-3.5 rotate-0 sm:rotate-2 sm:hover:rotate-0 transition-transform duration-200">
            <div className="bg-[#d3bbff] text-[#2e0854] px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-2xl font-bold text-xs sm:text-xs md:text-sm tracking-wide shadow-md">
              24TH JANUARY
            </div>
          </div>
        </div>

        {/* Hero Headline & Tagline */}
        <div className="max-w-3xl space-y-3 sm:space-y-6">
          <h1 className="text-[2.35rem] leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight sm:leading-[1.15]">
            <span className="block text-white">For every woman,</span>
            <span className="block bg-gradient-to-r from-white via-[#ebddff] to-[#ff46a2] bg-clip-text text-transparent">
              but not just for women.
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#ccc3d8] leading-relaxed max-w-2xl font-normal">
            {HERO_CONTENT.announcementSubtitle}
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4 relative inline-block group">
            <div className="absolute inset-0 bg-[#ff46a2] rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

            <button
              onClick={scrollToRegister}
              className="relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 rounded-2xl bg-[#ff46a2] hover:bg-[#ff2f96] text-[#0e0e0e] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm group-hover:shadow-[0_0_16px_rgba(255,70,162,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>JOIN THE MOVEMENT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
