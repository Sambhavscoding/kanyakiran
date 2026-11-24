'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

export default function WhoWeAreSection({
  image2 = 'https://ik.imagekit.io/9plqngdvcd/WhatsApp-Image-2026-02-09-at-12.28.54-PM-2.jpeg',
  image3 = 'https://ik.imagekit.io/9plqngdvcd/WhatsApp-Image-2026-02-09-at-12.28.54-PM-1.jpeg',
  image4 = 'https://ik.imagekit.io/9plqngdvcd/WhatsApp-Image-2026-02-09-at-12.28.54-PM.jpeg',
}) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative w-full max-w-full h-auto min-h-[100dvh] lg:min-h-screen bg-transparent text-[#0e0e0e] overflow-visible flex flex-col justify-center py-10 sm:py-16 lg:py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decorative Ambient Radial Glows */}
      {/* Soft Golden Glow - Right Side */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#fecb34]/20 blur-3xl pointer-events-none select-none" />

      {/* Soft Lilac Glow - Positioned in center so it fades smoothly without creating any bottom seam */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#7e3bed]/12 blur-3xl pointer-events-none select-none" />

      {/* Decorative Star Accents */}
      {/* Star 1: Top-Left */}
      <div className="absolute top-3 left-3 sm:top-8 sm:left-8 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#7e3bed] opacity-45 sm:opacity-35 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Star 2: Top-Right Floating Accent */}
      <div className="absolute top-8 right-6 sm:right-20 pointer-events-auto cursor-pointer p-1 group z-20 hidden sm:block">
        <BrandStar
          className="w-6 h-6 sm:w-8 sm:h-8 text-[#fecb34] opacity-30 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Star 3: Bottom-Right */}
      <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-18 sm:h-18 lg:w-22 lg:h-22 text-[#fecb34] opacity-50 sm:opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4.5}
        />
      </div>

      {/* Main Container - Vertically Centered inside Screen Height */}
      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto w-full my-auto flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-4">
        
        {/* 1. Header / Hero Statement Section */}
        <div
          style={{
            transitionDuration: '2000ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '100ms',
          }}
          className={`flex flex-col items-center text-center space-y-1.5 sm:space-y-2 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Who We Are Pill - Lifted slightly up for breathing room */}
          <div className="inline-flex items-center justify-center -rotate-1 hover:rotate-1 transition-transform duration-200 select-none cursor-pointer mb-3.5 sm:mb-4 lg:mb-5">
            <div className="bg-[#d3bbff] text-[#2e0854] px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl font-bold text-[11px] sm:text-xs md:text-sm tracking-wide shadow-md uppercase">
              WHO WE ARE
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] font-black tracking-tight text-[#0e0e0e] leading-tight">
            A Platform <span className="text-[#7e3bed]">For</span>{' '}
            <span className="relative inline-block ml-0.5 sm:ml-1">
              <span className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-2.5 sm:h-3 bg-[#fecb34]/40 rounded-xs -z-0" />
              <span className="relative z-10 text-[#7e3bed]">Everyone</span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[13px] lg:text-sm text-[#4b5563] max-w-2xl mx-auto leading-relaxed">
            Kanya Kiran is a platform for everyone, because creating a safer future for girls is a shared responsibility. Our work focuses on four key pillars: physical safety, education, cyber safety, and psychological &amp; emotional well-being.
          </p>
        </div>

        {/* 2. Bento Container - Moved Lower with pt-2 sm:pt-3 lg:pt-4 */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '300ms',
          }}
          className={`w-full pt-2 sm:pt-3 lg:pt-4 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* MOBILE VIEW: Exactly 4 cubes in a 2x2 grid (One diagonal with 2 images, the other 2 with content) */}
          <div className="block lg:hidden w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[480px] md:max-w-[540px] mx-auto px-1">
            <div className="grid grid-cols-2 gap-2.5 xs:gap-3 w-full">
              {/* Cube 1 (Row 1, Col 1): Content 1 (100% Commitment to Safety) */}
              <div className="aspect-square bg-[#212124] border border-white/10 rounded-[18px] xs:rounded-[22px] p-3 xs:p-3.5 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-black/20 group">
                {/* Inner corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#fecb34]/15 blur-xl rounded-full pointer-events-none" />
                
                <div className="space-y-1 relative z-10">
                  <div className="text-2xl xs:text-3xl font-black text-[#fecb34] tracking-tight leading-none">
                    100%
                  </div>
                  <div className="text-[9.5px] xs:text-[10.5px] font-bold uppercase tracking-wider text-white/90 leading-tight">
                    COMMITMENT TO SAFETY
                  </div>
                  <p className="text-[9px] xs:text-[10px] text-white/70 leading-snug line-clamp-3">
                    Building a safer society where every girl can learn, grow, and thrive without fear.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-1.5 relative z-10">
                  <span className="text-[8.5px] xs:text-[9.5px] font-semibold text-white/50 uppercase tracking-wide">
                    KIIT &amp; KISS
                  </span>
                  <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-[#7e3bed] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Heart className="w-2.5 h-2.5 xs:w-3 xs:h-3 fill-white text-white" />
                  </div>
                </div>
              </div>

              {/* Cube 2 (Row 1, Col 2): Image 1 (Golden Photo Cube) */}
              <div className="aspect-square rounded-[18px] xs:rounded-[22px] overflow-hidden relative shadow-lg group bg-[#fecb34]">
                <img
                  src={image2}
                  alt="Girls Education and Safety"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#fecb34] mix-blend-multiply opacity-55 pointer-events-none" />
              </div>

              {/* Cube 3 (Row 2, Col 1): Image 2 (Violet Photo Cube) */}
              <div className="aspect-square rounded-[18px] xs:rounded-[22px] overflow-hidden relative shadow-lg group bg-[#7e3bed]">
                <img
                  src={image4}
                  alt="Cyber Safety and Well-being"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#7e3bed] mix-blend-multiply opacity-55 pointer-events-none" />
              </div>

              {/* Cube 4 (Row 2, Col 2): Content 2 (30+ Districts Engaged) */}
              <div className="aspect-square bg-[#212124] border border-white/10 rounded-[18px] xs:rounded-[22px] p-3 xs:p-3.5 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-black/20 group">
                {/* Inner corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#7e3bed]/20 blur-xl rounded-full pointer-events-none" />
                
                <div className="space-y-1 relative z-10">
                  <div className="text-2xl xs:text-3xl font-black text-[#7e3bed] tracking-tight leading-none">
                    30+
                  </div>
                  <div className="text-[9.5px] xs:text-[10.5px] font-bold uppercase tracking-wider text-white/90 leading-tight">
                    DISTRICTS ENGAGED
                  </div>
                  <p className="text-[9px] xs:text-[10px] text-white/70 leading-snug line-clamp-3">
                    Engaging girls, boys, families, and communities to foster awareness and drive change.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-1.5 relative z-10">
                  <span className="text-[8.5px] xs:text-[9.5px] font-semibold text-white/50 uppercase tracking-wide">
                    Impact
                  </span>
                  <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-[#fecb34] text-[#0e0e0e] flex items-center justify-center shrink-0 shadow-xs">
                    <Star className="w-2.5 h-2.5 xs:w-3 xs:h-3 fill-[#0e0e0e] text-[#0e0e0e]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW: Full 5-Card Staggered Bento Row (Hidden on mobile, 5-col grid on desktop) */}
          <div className="hidden lg:grid lg:grid-cols-5 items-end gap-3 lg:gap-3 xl:gap-4 w-full max-w-5xl xl:max-w-6xl mx-auto">
            {/* Card 1: Left Dark Stat Card */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="bg-[#212124] border border-white/5 rounded-[22px] p-4.5 xl:p-5 shadow-xl shadow-black/15 flex flex-col justify-between h-[300px] xl:h-[325px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#fecb34]/10 blur-2xl rounded-full pointer-events-none" />

                <div className="space-y-2 lg:space-y-2.5 relative z-10">
                  <div className="text-3xl lg:text-[36px] xl:text-[40px] font-black text-[#fecb34] tracking-tight leading-none">
                    100%
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/90 leading-tight">
                    COMMITMENT TO SAFETY
                  </div>
                  <p className="text-[11px] xl:text-[11.5px] text-white/70 leading-relaxed">
                    Kanya Kiran is a flagship initiative of Kalinga Institute of Industrial Technology (KIIT) and Kalinga Institute of Social Sciences (KISS) committed to building a safer, more inclusive society where every girl can learn, grow, and thrive without fear.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#7e3bed] text-white flex items-center justify-center shadow-xs">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>
              </div>

              {/* Mini Pill Callout 1 */}
              <div className="h-[46px] bg-[#7e3bed]/15 border border-[#7e3bed]/25 rounded-2xl px-3 py-1.5 flex items-center gap-2.5 w-full shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[#7e3bed] text-white flex items-center justify-center shrink-0">
                  <Heart className="w-3 h-3 fill-white text-white" />
                </div>
                <div className="text-[11px] font-semibold text-[#1f2937] leading-tight">
                  They want to feel heard &amp; protected
                </div>
              </div>
            </div>

            {/* Card 2: Lime/Golden Tinted Photo Card */}
            <div className="w-full h-[315px] xl:h-[345px] rounded-[22px] overflow-hidden relative shadow-lg group bg-[#fecb34]">
              <img
                src={image2}
                alt="Girls Education and Safety"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#fecb34] mix-blend-multiply opacity-55 pointer-events-none" />
            </div>

            {/* Card 3: Center Compact Card */}
            <div className="w-full h-[240px] xl:h-[265px] rounded-[22px] overflow-hidden relative shadow-xl bg-[#1b1b1e] flex items-center justify-center group">
              <img
                src={image3}
                alt="Community Solidarity"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            </div>

            {/* Card 4: Violet Tinted Photo Card */}
            <div className="w-full h-[315px] xl:h-[345px] rounded-[22px] overflow-hidden relative shadow-lg group bg-[#7e3bed]">
              <img
                src={image4}
                alt="Cyber Safety and Well-being"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#7e3bed] mix-blend-multiply opacity-55 pointer-events-none" />
            </div>

            {/* Card 5: Right Dark Stat Card */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="bg-[#212124] border border-white/5 rounded-[22px] p-4.5 xl:p-5 shadow-xl shadow-black/15 flex flex-col justify-between h-[300px] xl:h-[325px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#7e3bed]/15 blur-2xl rounded-full pointer-events-none" />

                <div className="space-y-2 lg:space-y-2.5 relative z-10">
                  <div className="text-3xl lg:text-[36px] xl:text-[40px] font-black text-[#7e3bed] tracking-tight leading-none">
                    30+
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/90 leading-tight">
                    DISTRICTS ENGAGED
                  </div>
                  <p className="text-[11px] xl:text-[11.5px] text-white/70 leading-relaxed">
                    We engage girls, boys, men, women, families, communities, and institutions to foster awareness, encourage meaningful conversations, and drive lasting change.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#fecb34] text-[#0e0e0e] flex items-center justify-center shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-[#0e0e0e] text-[#0e0e0e]" />
                  </div>
                </div>
              </div>

              {/* Mini Pill Callout 2 */}
              <div className="h-[46px] bg-[#fecb34]/15 border border-[#fecb34]/30 rounded-2xl px-3 py-1.5 flex items-center gap-2.5 w-full shadow-xs">
                <div className="w-6 h-6 rounded-full bg-[#fecb34] text-[#0e0e0e] flex items-center justify-center shrink-0">
                  <Star className="w-3 h-3 fill-[#0e0e0e] text-[#0e0e0e]" />
                </div>
                <div className="text-[11px] font-semibold text-[#1f2937] leading-tight">
                  You can be a source of safe support
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
