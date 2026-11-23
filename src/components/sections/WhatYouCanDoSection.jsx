'use client';

import React from 'react';
import { ArrowUpRight, Share2 } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

export default function WhatYouCanDoSection() {
  const handleLinkedIn = () => {
    window.open('https://www.linkedin.com/company/kanyakiran', '_blank', 'noopener,noreferrer');
  };

  const handleXShare = () => {
    const text = encodeURIComponent(
      'Join the movement to eradicate sexual violence in Odisha. #Kanyakiran #AbAurNahi'
    );
    const url = encodeURIComponent('https://kanyakiran.org');
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/kanyakiranofficial/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="what-you-can-do"
      className="relative z-10 w-full max-w-full min-h-[100dvh] lg:h-screen flex flex-col justify-center bg-transparent text-[#0e0e0e] py-6 sm:py-8 md:py-0 px-3 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Top shadow gradient cast from FactsSection (prominent on phone and desktop) */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-16 lg:h-20 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none z-20" />

      {/* Background Decorative Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-24 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#7e3bed]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#fecb34]/10 blur-3xl pointer-events-none" />

      {/* Decorative Star Accents at Random Places */}
      <div className="absolute top-3 sm:top-8 left-3 sm:left-12 pointer-events-auto cursor-pointer p-1 group z-20">
        <BrandStar
          className="w-4 h-4 sm:w-8 lg:w-10 text-[#7e3bed] opacity-35 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute top-4 sm:top-10 right-3 sm:right-16 pointer-events-auto cursor-pointer p-1 group z-20 hidden sm:block">
        <BrandStar
          className="w-5 h-5 sm:w-7 lg:w-8 text-[#fecb34] opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute top-1/2 left-3 sm:left-8 -translate-y-1/2 pointer-events-auto cursor-pointer p-1 group z-20">
        <BrandStar
          className="w-4 h-4 sm:w-7 sm:h-7 text-[#fecb34] opacity-30 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute top-1/2 right-3 sm:right-10 -translate-y-1/2 pointer-events-auto cursor-pointer p-1 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-8 sm:h-8 text-[#7e3bed] opacity-25 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute bottom-3 sm:bottom-7 left-8 sm:left-24 pointer-events-auto cursor-pointer p-1 group z-20 hidden sm:block">
        <BrandStar
          className="w-4 h-4 sm:w-6 sm:h-6 text-[#7e3bed] opacity-30 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute bottom-2.5 sm:bottom-6 right-6 sm:right-20 pointer-events-auto cursor-pointer p-1 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-7 sm:h-7 text-[#fecb34] opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>
      <div className="absolute top-14 right-1/4 pointer-events-auto cursor-pointer p-1 group z-20 hidden lg:block">
        <BrandStar
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#fecb34] opacity-25 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center my-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 mb-2 sm:mb-6 lg:mb-8">
          {/* Badge Pill */}
          <div className="inline-flex items-center justify-center -rotate-1 hover:rotate-1 transition-transform duration-200 cursor-pointer">
            <div className="bg-[#d3bbff] text-[#2e0854] px-2.5 py-0.5 sm:px-4 sm:py-1 rounded-xl sm:rounded-2xl font-bold text-[9px] sm:text-xs md:text-sm tracking-wider shadow-sm uppercase">
              TAKE ACTION
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#0e0e0e] leading-tight">
            What you can <span className="text-[#7e3bed]">do?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[10.5px] sm:text-sm md:text-base text-[#4b5563] max-w-xl mx-auto leading-tight sm:leading-relaxed px-2">
            Creating a safer future for girls is a shared responsibility. Take a step today and stand with the movement.
          </p>
        </div>

        {/* 3 Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-8 items-stretch">
          
          {/* Card 1: Violet Card -> Leads to LinkedIn */}
          <div className="relative bg-[#7e3bed] text-white rounded-[16px] sm:rounded-[24px] lg:rounded-[28px] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-xl shadow-[#7e3bed]/20 hover:shadow-2xl hover:shadow-[#7e3bed]/30 transition-all duration-300 min-h-[96px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[280px] group overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-22 sm:h-22 lg:w-26 lg:h-26 bg-white/10 rounded-bl-[40px] sm:rounded-bl-[65px] lg:rounded-bl-[75px] pointer-events-none transition-transform group-hover:scale-110 duration-300" />
            <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <BrandStar className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
            </div>

            <div className="relative z-10 space-y-1 sm:space-y-2.5 lg:space-y-3">
              <div className="inline-block bg-white/20 backdrop-blur-xs text-white text-[8.5px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full">
                COMMUNITY ACTION
              </div>
              <h3 className="text-[11.5px] sm:text-base lg:text-[20px] font-bold leading-snug tracking-tight">
                Join the movement to eradicate sexual violence in Odisha
              </h3>
            </div>

            <div className="relative z-10 pt-1.5 sm:pt-3.5 lg:pt-5">
              <button
                type="button"
                onClick={handleLinkedIn}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-[#7e3bed] hover:bg-[#f7f2ff] px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 rounded-full font-bold text-[10.5px] sm:text-xs md:text-sm lg:text-base shadow-md hover:shadow-lg transition-all duration-200 group-hover:translate-x-1 cursor-pointer"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: White Card -> Leads to X */}
          <div className="relative bg-white text-[#0e0e0e] border border-[#7e3bed]/15 rounded-[16px] sm:rounded-[24px] lg:rounded-[28px] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#7e3bed]/10 transition-all duration-300 min-h-[96px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[280px] group overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-22 sm:h-22 lg:w-26 lg:h-26 bg-[#fecb34]/15 rounded-bl-[40px] sm:rounded-bl-[65px] lg:rounded-bl-[75px] pointer-events-none transition-transform group-hover:scale-110 duration-300" />
            <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <BrandStar className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#fecb34]" strokeWidth={3} />
            </div>

            <div className="relative z-10 space-y-1 sm:space-y-2.5 lg:space-y-3">
              <div className="inline-block bg-[#fecb34] text-[#0e0e0e] text-[8.5px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full">
                AMPLIFY THE VOICE
              </div>
              <h3 className="text-[11px] sm:text-[15px] lg:text-[18px] font-bold leading-snug tracking-tight text-[#111827]">
                Use the hashtags <span className="text-[#855e00] font-black underline decoration-[#fecb34]">#Kanyakiran</span> in your posts on social media &amp; start conversations.
              </h3>
            </div>

            <div className="relative z-10 pt-1.5 sm:pt-3.5 lg:pt-5">
              <button
                type="button"
                onClick={handleXShare}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#fecb34] text-[#0e0e0e] hover:bg-[#e5b72e] px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 rounded-full font-bold text-[10.5px] sm:text-xs md:text-sm lg:text-base shadow-md hover:shadow-lg transition-all duration-200 group-hover:translate-x-1 cursor-pointer"
              >
                <span>Share on X</span>
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Violet Card (Identical Design to Card 1) -> Leads to Instagram */}
          <div className="relative bg-[#7e3bed] text-white rounded-[16px] sm:rounded-[24px] lg:rounded-[28px] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-xl shadow-[#7e3bed]/20 hover:shadow-2xl hover:shadow-[#7e3bed]/30 transition-all duration-300 min-h-[96px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[280px] group overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-14 h-14 sm:w-22 sm:h-22 lg:w-26 lg:h-26 bg-white/10 rounded-bl-[40px] sm:rounded-bl-[65px] lg:rounded-bl-[75px] pointer-events-none transition-transform group-hover:scale-110 duration-300" />
            <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <BrandStar className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={3} />
            </div>

            <div className="relative z-10 space-y-1 sm:space-y-2.5 lg:space-y-3">
              <div className="inline-block bg-white/20 backdrop-blur-xs text-white text-[8.5px] sm:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full">
                SHARE YOUR STORY
              </div>
              <h3 className="text-[11px] sm:text-[15px] lg:text-[18px] font-bold leading-snug tracking-tight">
                What are you doing to Zero in on gender based violence and promoting education?
              </h3>
            </div>

            <div className="relative z-10 pt-1.5 sm:pt-3.5 lg:pt-5">
              <button
                type="button"
                onClick={handleInstagram}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-[#7e3bed] hover:bg-[#f7f2ff] px-3 py-1 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 rounded-full font-bold text-[10.5px] sm:text-xs md:text-sm lg:text-base shadow-md hover:shadow-lg transition-all duration-200 group-hover:translate-x-1 cursor-pointer"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
