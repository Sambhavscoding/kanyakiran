'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, ArrowRight, Mail } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

export default function HowToParticipateSection({ onOpenRegisterModal }) {
  const [isInView, setIsInView] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Once visible, keep it permanently
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic cycle for mobile carousel
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const interval = setInterval(() => {
      if (!isInteractingRef.current && window.innerWidth < 768 && scrollContainerRef.current) {
        const nextIndex = (activeMobileIndex + 1) % 3;
        scrollToCard(nextIndex);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [activeMobileIndex]);

  const handleMobileScroll = (e) => {
    const container = e.target;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex >= 0 && newIndex < 3 && newIndex !== activeMobileIndex) {
        setActiveMobileIndex(newIndex);
      }
    }
  };

  const scrollToCard = (index) => {
    setActiveMobileIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        left: index * container.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleRegisterClick = () => {
    const heroBtn = document.getElementById('hero-join-btn') || document.getElementById('hero');
    if (heroBtn) {
      heroBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroBtn.focus?.();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-to-participate"
      className="relative w-full max-w-full min-h-[100dvh] lg:min-h-screen text-[#0e0e0e] overflow-visible flex flex-col justify-center py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decorative Ambient Radial Glows */}
      {/* Pink tint on the LEFT */}
      <div className="absolute top-10 -left-20 w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full bg-[#ff46a2]/25 blur-3xl pointer-events-none select-none" />
      
      {/* Soft bottom glow - Bleeds down smoothly into Who We Are section */}
      <div className="absolute -bottom-32 sm:-bottom-40 left-1/4 sm:left-1/3 w-[500px] sm:w-[620px] h-80 sm:h-96 rounded-full bg-[#7e3bed]/20 blur-3xl pointer-events-none select-none z-10" />

      {/* Decorative Star Accents - Aligned consistently with previous sections */}
      {/* Star 1: Top-Left */}
      <div className="absolute top-4 left-4 sm:top-12 sm:left-10 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-6 h-6 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#7e3bed] opacity-45 sm:opacity-35 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Star 2: Bottom-Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-12 sm:right-12 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-6 h-6 sm:w-22 sm:h-22 lg:w-28 lg:h-28 text-[#ff46a2] opacity-50 sm:opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4.5}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col justify-between h-full my-auto space-y-6 sm:space-y-8 lg:space-y-7">
        
        {/* 1. Header Section */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '100ms',
          }}
          className={`text-center space-y-1.5 sm:space-y-2 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-[#0e0e0e] uppercase leading-tight">
            HOW TO{' '}
            <span className="text-[#ff46a2] underline decoration-[#ff46a2] decoration-[4px] sm:decoration-[5px] underline-offset-4">
              PARTICIPATE
            </span>
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Be the Face of Change. Stand against violence and inspire the next generation through the power of ambition and representation.
          </p>
        </div>

        {/* 2. Polaroid Photo Cards (Single Carousel with Auto-play on Mobile, Centered on Desktop) */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '300ms',
          }}
          className={`relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 md:w-full md:mx-auto md:max-w-none transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Scrollable Container with Extra Space & Hidden Scrollbar */}
          <div
            ref={scrollContainerRef}
            onTouchStart={() => {
              isInteractingRef.current = true;
            }}
            onTouchEnd={() => {
              setTimeout(() => {
                isInteractingRef.current = false;
              }, 2000);
            }}
            onScroll={handleMobileScroll}
            className="w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar scroll-smooth pt-8 pb-10 md:pt-4 md:pb-14 px-0 md:px-6 -mb-4 md:-mb-8"
          >
            <div className="flex items-center min-w-full md:min-w-max mx-auto md:justify-center md:gap-6 lg:gap-8">
              {/* Card 1: Left Tilt (-3deg) - Violet Frame */}
              <div className="w-full shrink-0 snap-center flex justify-center px-4 md:w-[290px] lg:w-[320px] md:shrink-0 md:p-0 md:block">
                <div className="w-[275px] xs:w-[295px] sm:w-[315px] md:w-full bg-[#7e3bed] border-[3px] border-[#7e3bed] rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-[#7e3bed]/25 relative -rotate-1 md:-rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
                  {/* Washi Tape Pin Accent */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-white/85 backdrop-blur-xs border border-white/40 rounded-xs shadow-xs -rotate-2 pointer-events-none z-20" />
                  
                  {/* Photo Window (aspect 4/5) */}
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/10 border border-white/20 select-none">
                    <img
                      src="https://ik.imagekit.io/9plqngdvcd/girl_in_uniform.png"
                      alt="Young girl dressed proudly in official uniform saluting"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Polaroid Bottom Caption Bar - Smaller White Caption */}
                  <div className="flex items-center justify-between pt-2 pb-0.5 px-1">
                    <span className="font-handwriting text-sm sm:text-base font-bold text-white tracking-wide">
                      #GIRLSWHOINSPIRE
                    </span>
                    <Camera className="w-4 h-4 text-white/90 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Card 2: Center Upright (+1deg tilt) - Deep Black Frame */}
              <div className="w-full shrink-0 snap-center flex justify-center px-4 md:w-[290px] lg:w-[320px] md:shrink-0 md:p-0 md:block">
                <div className="w-[275px] xs:w-[295px] sm:w-[315px] md:w-full bg-[#0e0e0e] border-[3px] border-[#7e3bed]/75 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/35 relative rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer group z-10">
                  {/* Washi Tape Pin Accent */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-white/85 backdrop-blur-xs border border-white/40 rounded-xs shadow-xs rotate-2 pointer-events-none z-20" />
                  
                  {/* Photo Window (aspect 4/5) */}
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/10 border border-white/20 select-none">
                    <img
                      src="https://ik.imagekit.io/9plqngdvcd/Child%20Holding%20_I%20Want%20to%20Be%20a%20Scientist_%20Sign.png"
                      alt="Child holding I want to be a scientist sign"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Polaroid Bottom Caption Bar - Smaller White Caption */}
                  <div className="flex items-center justify-between pt-2 pb-0.5 px-1">
                    <span className="font-handwriting text-sm sm:text-base font-bold text-white tracking-wide">
                      #ABAURNAHI
                    </span>
                    <Camera className="w-4 h-4 text-white/90 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Card 3: Right Tilt (+3deg) - Rich Violet with Pink Border */}
              <div className="w-full shrink-0 snap-center flex justify-center px-4 md:w-[290px] lg:w-[320px] md:shrink-0 md:p-0 md:block">
                <div className="w-[275px] xs:w-[295px] sm:w-[315px] md:w-full bg-[#5e26bd] border-[3px] border-[#ff46a2]/80 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-[#ff46a2]/20 relative rotate-1 md:rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
                  {/* Washi Tape Pin Accent */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-white/85 backdrop-blur-xs border border-white/40 rounded-xs shadow-xs -rotate-3 pointer-events-none z-20" />
                  
                  {/* Photo Window (aspect 4/5) */}
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/10 border border-white/20 select-none">
                    <img
                      src="https://ik.imagekit.io/9plqngdvcd/family_engineer.png"
                      alt="Family supporting daughter learning on a digital device"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Polaroid Bottom Caption Bar - Smaller White Caption */}
                  <div className="flex items-center justify-between pt-2 pb-0.5 px-1">
                    <span className="font-handwriting text-sm sm:text-base font-bold text-white tracking-wide">
                      #KANYAKIRAN
                    </span>
                    <Camera className="w-4 h-4 text-white/90 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator for Mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 pt-2 pb-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to polaroid ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  activeMobileIndex === idx
                    ? 'w-6 bg-[#ff46a2] shadow-xs'
                    : 'w-2 bg-[#7e3bed]/30 hover:bg-[#7e3bed]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Steps Row: Step 1 (Capture) + Connector Arrow + Step 2 (Upload & Share) */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '500ms',
          }}
          className={`grid grid-cols-1 lg:grid-cols-11 gap-4 lg:gap-6 items-center max-w-4xl mx-auto w-full transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Step 1 Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7e3bed] text-white flex items-center justify-center font-bold text-base shadow-sm shadow-[#7e3bed]/30 ring-4 ring-[#7e3bed]/20 shrink-0">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0e0e0e] tracking-tight">
                Capture
              </h3>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#404040] leading-relaxed">
              Photos of your own or that of your young daughter/sister/friend who is a girl,{' '}
              <strong className="text-[#7e3bed] font-bold">
                dressed as the person and the profession they aspire to be
              </strong>.
            </p>

            {/* Quick Tip Box */}
            <div className="backdrop-blur-xs bg-white/85 border border-[#7e3bed]/15 rounded-xl p-3 shadow-2xs">
              <p className="text-xs text-[#525252] leading-relaxed">
                <strong className="text-[#7e3bed] font-semibold">Quick Tip:</strong> In case you don&apos;t have the dress for the same, you can simply write your dream profession on a piece of paper and hold it to take a photo.
              </p>
            </div>
          </div>

          {/* Directional Flow Connector Arrow (1 col) */}
          <div className="lg:col-span-1 hidden lg:flex justify-center items-center">
            <div className="w-9 h-9 rounded-full bg-[#ff46a2] text-white flex items-center justify-center shadow-md shadow-[#ff46a2]/30 ring-4 ring-[#ff46a2]/20 shrink-0">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Step 2 Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ff46a2] text-white flex items-center justify-center font-bold text-base shadow-sm shadow-[#ff46a2]/30 ring-4 ring-[#ff46a2]/25 shrink-0">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0e0e0e] tracking-tight">
                Upload &amp; Share
              </h3>
            </div>

            <div className="space-y-0.5">
              <p className="text-xs sm:text-[13.5px] text-[#404040] leading-relaxed">
                Post the picture across Social Media with the official campaign hashtags:
              </p>
              <div className="text-[#7e3bed] font-bold text-xs sm:text-[14px] tracking-wide pt-0.5">
                #AbAurNahi &nbsp;•&nbsp; #GirlsWhoInspire
              </div>
            </div>

            {/* Direct Entry Email Box */}
            <div className="bg-[#171717] text-white rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-sm text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-[#ff46a2] shrink-0" />
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[#a3a3a3]">Direct Entry:</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kanya.kiran@kiit.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff46a2] font-bold underline hover:text-pink-300 transition-colors"
                >
                  kanya.kiran@kiit.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Requested Register & Social Notice */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '700ms',
          }}
          className={`border-t border-[#7e3bed]/15 pt-3 sm:pt-3.5 text-center max-w-3xl mx-auto transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-4'
          }`}
        >
          <p className="text-xs sm:text-[13px] text-[#525252] leading-relaxed">
            You can also{' '}
            <button
              onClick={handleRegisterClick}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f3eeff] text-[#7e3bed] font-bold text-xs hover:bg-[#e9defc] transition-colors underline mx-0.5 cursor-pointer"
            >
              register
            </button>{' '}
            to take part in this initiative and join the conversation using our hashtags across social media. If you want to be the face of Kanya Kiran, post on social media following the guidelines already mentioned above.
          </p>
        </div>

      </div>
    </section>
  );
}
