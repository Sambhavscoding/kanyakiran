'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, GraduationCap, Globe, Heart } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

const CAMPAIGN_IMAGE = 'https://ik.imagekit.io/9plqngdvcd/Purple_Hand_with_Bold_White_Lettering-removebg-preview.png';

export default function AbAurNahiSection() {
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
          observer.disconnect(); // Once appeared, stays visible
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
      id="ab-aur-nahi"
      className="relative w-full max-w-full min-h-[100dvh] lg:h-screen bg-transparent text-[#111827] overflow-visible flex items-center py-6 sm:py-8 lg:py-0"
    >
      {/* Decorative Faded Quarter-Circle on Bottom Right - Overlapping into Four Pillars */}
      <div className="absolute -bottom-36 sm:-bottom-52 lg:-bottom-64 right-0 w-80 h-80 sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] rounded-full bg-gradient-to-tl from-[#7e3bed]/45 via-[#fecb34]/30 to-transparent blur-3xl pointer-events-none select-none z-10" />

      {/* Decorative Star Accents - Bottom Right Star with Tilt & Brightness (Visible on Mobile) */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-16 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-6 h-6 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#7e3bed] opacity-45 sm:opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hand Poster with Gradual Blur Reveal */}
          <div
            style={{
              transitionDuration: '2200ms',
              transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
              transitionDelay: '100ms',
            }}
            className={`lg:col-span-5 relative order-2 lg:order-1 flex justify-center items-center transition-all ${
              isInView
                ? 'opacity-100 blur-none translate-y-0 scale-100'
                : 'opacity-0 blur-[12px] translate-y-8 scale-[0.97]'
            }`}
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[440px] p-4 sm:p-6 lg:p-7 group flex items-center justify-center -rotate-1 hover:rotate-1 transition-transform duration-200 cursor-pointer">
              
              {/* Layer 1: Soft Lavender/Lilac Torn Paper Backdrop (#d3bbff) */}
              <div 
                className="absolute inset-0 bg-[#d3bbff] shadow-sm -rotate-2 sm:group-hover:rotate-0 transition-transform duration-200 pointer-events-none rounded-2xl"
                style={{
                  clipPath: 'polygon(2% 0%, 98% 2%, 100% 20%, 97% 42%, 100% 64%, 96% 82%, 99% 100%, 0% 98%, 3% 76%, 0% 48%, 4% 22%)'
                }}
              />

              {/* Layer 2: Signature Magenta/Pink Torn Paper Accent (#fecb34) */}
              <div 
                className="absolute inset-1.5 sm:inset-2.5 bg-[#fecb34] shadow-sm rotate-1 sm:group-hover:rotate-0 transition-transform duration-200 pointer-events-none opacity-85 rounded-xl"
                style={{
                  clipPath: 'polygon(0% 2%, 96% 0%, 100% 20%, 97% 45%, 100% 70%, 95% 95%, 2% 100%, 0% 50%)'
                }}
              />

              {/* Layer 3: Solid Black backing card */}
              <div 
                className="absolute inset-2.5 sm:inset-4 bg-[#0e0e0e] shadow-inner -rotate-1 sm:group-hover:rotate-0 transition-transform duration-200 pointer-events-none rounded-lg"
              />
              
              {/* Transparent Cutout Purple Hand Artwork */}
              <div className="relative z-10 w-full flex items-center justify-center p-1 sm:p-2">
                <img
                  src={CAMPAIGN_IMAGE}
                  alt="Ab Aur Nahi Transparent Hand Artwork"
                  className="w-full h-auto max-h-[180px] sm:max-h-[300px] lg:max-h-[420px] object-contain block drop-shadow-2xl sm:group-hover:-rotate-2 transition-transform duration-200"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Content & Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center space-y-3 sm:space-y-4 lg:space-y-5 order-1 lg:order-2">
            
            {/* Header Block with Star that Tilts and Gets Bright */}
            <div
              style={{
                transitionDuration: '2200ms',
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                transitionDelay: '250ms',
              }}
              className={`relative w-full transition-all ${
                isInView
                  ? 'opacity-100 blur-none translate-y-0'
                  : 'opacity-0 blur-[12px] translate-y-6'
              }`}
            >
              <h2 className="text-2xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-[#0e0e0e] leading-[1.12] pr-10 sm:pr-14">
                Breaking the Silence. <br />
                <span className="text-[#7e3bed]">Rebuilding the Future.</span>
              </h2>

              {/* Top-Right Star Element: Tilts and gets bright */}
              <div className="absolute top-0 right-0 pointer-events-auto cursor-pointer p-1 group">
                <BrandStar
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15 text-[#7e3bed] opacity-100 sm:opacity-50 sm:group-hover:opacity-100 sm:group-hover:rotate-12 transition-all duration-200"
                  strokeWidth={4.5}
                />
              </div>
            </div>

            {/* Verbatim Copy with Gradual Blur Reveal */}
            <div
              style={{
                transitionDuration: '2200ms',
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                transitionDelay: '450ms',
              }}
              className={`space-y-2 sm:space-y-3 lg:space-y-3.5 text-xs sm:text-base lg:text-[1.05rem] text-[#374151] leading-relaxed transition-all ${
                isInView
                  ? 'opacity-100 blur-none translate-y-0'
                  : 'opacity-0 blur-[12px] translate-y-6'
              }`}
            >
              <p className="font-bold text-[#0e0e0e] text-sm sm:text-lg lg:text-[1.18rem] leading-snug">
                Every girl deserves a life free from fear, full of possibility, and the freedom to become who she chooses to be.
              </p>

              <p>
                This National Girl Child Day, Kanya Kiran stands on four pillars:{' '}
                <strong className="text-[#0e0e0e] font-bold">physical safety</strong>,{' '}
                <strong className="text-[#0e0e0e] font-bold">education</strong>,{' '}
                <strong className="text-[#0e0e0e] font-bold">cyber safety</strong>, and{' '}
                <strong className="text-[#0e0e0e] font-bold">psychological &amp; emotional well-being</strong>. We stand against violence in every form, protect every girl&apos;s right to learn and thrive, create safer digital spaces, and foster conversations where no girl feels unheard, unseen, or alone.
              </p>

              <p className="hidden sm:block">
                Because empowering girls is not only about protecting them.{' '}
                <strong className="text-[#0e0e0e] font-bold">
                  It is about creating a world where they can dream without limits.
                </strong>
              </p>

              <p className="text-[#111827] text-sm sm:text-lg lg:text-xl pt-0.5">
                This year, we say it plainly:{' '}
                <strong className="text-[#7e3bed] font-bold">#AbAurNahi (Not Any More)</strong> and{' '}
                <strong className="text-[#7e3bed] font-bold">#GirlsWhoInspire</strong>.
              </p>
            </div>

            {/* The 4 Mini Feature Cards that Tilt on Hover like Hero 24th Jan Pill */}
            <div
              style={{
                transitionDuration: '2200ms',
                transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                transitionDelay: '650ms',
              }}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 w-full transition-all ${
                isInView
                  ? 'opacity-100 blur-none translate-y-0'
                  : 'opacity-0 blur-[12px] translate-y-6'
              }`}
            >
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/95 border border-[#7e3bed]/45 shadow-sm sm:bg-white/90 sm:hover:border-[#7e3bed] -rotate-1 hover:rotate-1 transition-transform duration-200 cursor-pointer select-none">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#7e3bed] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#111827]">Safety</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/95 border border-[#7e3bed]/45 shadow-sm sm:bg-white/90 sm:hover:border-[#7e3bed] rotate-1 hover:-rotate-1 transition-transform duration-200 cursor-pointer select-none">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#7e3bed] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#111827]">Education</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/95 border border-[#7e3bed]/45 shadow-sm sm:bg-white/90 sm:hover:border-[#7e3bed] -rotate-1 hover:rotate-1 transition-transform duration-200 cursor-pointer select-none">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#7e3bed] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#111827]">Cyber Safety</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/95 border border-[#7e3bed]/45 shadow-sm sm:bg-white/90 sm:hover:border-[#7e3bed] rotate-1 hover:-rotate-1 transition-transform duration-200 cursor-pointer select-none">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#7e3bed] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#111827]">Well-being</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}