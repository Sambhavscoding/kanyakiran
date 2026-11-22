'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FactsSection() {
  const containerRef = useRef(null);
  const tickerPinRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(18 * 60); // 18 minutes countdown

  // 1. Signature blur reveal matching other sections on the page
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Countdown timer from 18:00 minutes as someone reaches this section
  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 18 * 60));
    }, 1000);

    return () => clearInterval(timer);
  }, [isInView]);

  const countdownMins = Math.floor(secondsLeft / 60);
  const countdownSecs = secondsLeft % 60;
  const formattedCountdown = `${String(countdownMins).padStart(2, '0')}:${String(countdownSecs).padStart(2, '0')}`;

  // 3. Lock screen at headline ticker and reveal pink underline with scroll
  // Configured specifically for rock-solid stability on mobile touch devices
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: tickerPinRef.current,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=650' : '+=1100'),
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, tickerPinRef);

    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (tickerPinRef.current) {
      ro.observe(tickerPinRef.current);
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', handleLoad);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  // Split underline progress across the two lines:
  // Line 1 ("ONE RAPE EVERY"): 0.0 -> 0.50
  // Line 2 ("18 MINUTES."):   0.50 -> 1.00
  const line1Progress = Math.min(1, Math.max(0, scrollProgress / 0.5));
  const line2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.5));

  return (
    <section
      ref={containerRef}
      id="facts"
      className="relative z-20 w-full bg-[#000000] text-white selection:bg-[#ff46a2] selection:text-white shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
    >
      {/* ============================================================== */}
      {/* 1. TOP MASTHEAD (Signature blur reveal from darkness)          */}
      {/* ============================================================== */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-6 sm:pt-10 pb-4">
        <header
          style={{
            transitionDuration: '2000ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '100ms',
          }}
          className={`flex flex-col w-full transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Top Meta Bar */}
          <div className="border-b border-[#222] pb-2.5 sm:pb-3 w-full flex items-center justify-center">
            <p className="text-[10px] sm:text-[11px] font-semibold text-[#e5e7eb] tracking-[1px] sm:tracking-[1.1px] uppercase text-center">
              CRIME IN INDIA // STATISTICAL INVESTIGATION
            </p>
          </div>

          {/* Vanity Fair-Style Central Title Header */}
          <div className="border-b border-[#222] pt-5 pb-6 sm:pt-8 sm:pb-9 w-full flex flex-col items-center text-center">
            <h1 className="font-bodoni font-bold text-4xl sm:text-7xl lg:text-[76px] tracking-[4px] sm:tracking-[7.2px] text-white uppercase leading-none">
              KANYA KIRAN
            </h1>
            <p className="font-bodoni italic font-normal text-xs sm:text-base text-[#9ca3af] mt-2 sm:mt-2.5 px-2">
              Investigation: Violence Against Women &amp; Girls, India
            </p>
          </div>

          {/* Nav - Editorial Sections (Horizontal scrollable on mobile) */}
          <nav className="border-b border-[#222] py-2.5 w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            {/* Urgent Bulletin with Purple Dot */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#7e3bed] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed] tracking-[1.1px] uppercase whitespace-nowrap">
                URGENT BULLETIN
              </span>
            </div>

            {/* Editorial Topic Links (The Three Crisis Pillars) */}
            <div className="flex items-center gap-4 sm:gap-8 shrink-0">
              <span className="text-[10px] sm:text-[11px] font-semibold text-white tracking-[1.1px] uppercase border-b-2 border-[#7e3bed] pb-0.5 cursor-default whitespace-nowrap">
                SEXUAL VIOLENCE
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#9ca3af] hover:text-white transition-colors tracking-[1.1px] uppercase cursor-pointer whitespace-nowrap">
                EDUCATIONAL EMPOWERMENT
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#9ca3af] hover:text-white transition-colors tracking-[1.1px] uppercase cursor-pointer whitespace-nowrap">
                CYBER VIOLENCE
              </span>
            </div>

            {/* Right Tag */}
            <div className="hidden lg:block text-[11px] font-semibold text-[#9ca3af] tracking-[1.1px] uppercase shrink-0">
              NCRB AUDIT // 2023 EDITION
            </div>
          </nav>
        </header>
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION 7.1 HEADLINE TICKER (LOCKED SCREEN + SCROLL UNDERLINE)*/}
      {/* ============================================================== */}
      <div
        ref={tickerPinRef}
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#000000] px-4 sm:px-8 text-center"
      >
        <div
          style={{
            transitionDuration: '2000ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '250ms',
          }}
          className={`w-full max-w-5xl mx-auto flex flex-col items-center text-center transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-8">
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#7e3bed]" />
            <span className="text-[10px] sm:text-xs font-bold text-[#7e3bed] tracking-[2px] sm:tracking-[3px] uppercase">
              CRIME CLOCK // NATIONAL FREQUENCY AUDIT
            </span>
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#7e3bed]" />
          </div>

          {/* THE DOMINANT HEADLINE WITH PINK UNDERLINE SCRUB */}
          <h2 className="font-bodoni font-black uppercase text-3xl sm:text-6xl md:text-7xl lg:text-[84px] tracking-tight leading-[1.2] sm:leading-[1.1] flex flex-col items-center select-none w-full px-2">
            {/* Line 1: ONE RAPE EVERY */}
            <div className="relative inline-block pb-2 sm:pb-3.5">
              <span className="text-[#ff46a2]">ONE </span>
              <span className="text-white">R*PE </span>
              <span className="text-white">EVERY</span>
              
              {/* Pink Underline revealed with scroll */}
              <span
                className="absolute left-0 bottom-0 h-[3.5px] sm:h-[6px] lg:h-[7px] bg-[#ff46a2] rounded-full shadow-[0_0_16px_rgba(255,70,162,0.7)]"
                style={{
                  width: '100%',
                  transform: `scaleX(${line1Progress})`,
                  transformOrigin: 'left center',
                }}
              />
            </div>

            {/* Line 2: 18 MINUTES. */}
            <div className="relative inline-block pb-2 sm:pb-3.5 mt-1 sm:mt-3">
              <span className="text-[#ff46a2]">18 </span>
              <span className="text-[#ff46a2]">MINUTES.</span>

              {/* Pink Underline revealed with scroll */}
              <span
                className="absolute left-0 bottom-0 h-[3.5px] sm:h-[6px] lg:h-[7px] bg-[#ff46a2] rounded-full shadow-[0_0_16px_rgba(255,70,162,0.7)]"
                style={{
                  width: '100%',
                  transform: `scaleX(${line2Progress})`,
                  transformOrigin: 'left center',
                }}
              />
            </div>
          </h2>

          {/* Minimalist Editorial Pulse & Live Metric Representation */}
          <div className="mt-6 sm:mt-10">
            <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 bg-[#0c0c0c] border border-[#2b2b2b] rounded-2xl sm:rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff46a2] animate-pulse shrink-0 shadow-[0_0_8px_#ff46a2]" />
                <span className="font-mono font-bold text-[11px] sm:text-[13px] tracking-[1px] text-white uppercase">
                  INTERVAL PULSE:
                </span>
                <span className="font-mono font-bold text-[11px] sm:text-[13px] tracking-[0.7px] text-[#ff46a2] tabular-nums">
                  {formattedCountdown} MINS
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-xs text-[#6b7280]">|</span>
              <span className="text-[10px] sm:text-xs font-normal text-[#d1d5db] tracking-[0.3px] uppercase">
                ~81 OFFENSES REGISTERED DAILY
              </span>
            </div>
          </div>

          {/* Subtle scroll hint during lock */}
          {scrollProgress < 0.95 && (
            <div className="mt-3.5 sm:mt-4 text-[9px] sm:text-xs uppercase tracking-widest text-[#9ca3af]/60 font-mono animate-bounce">
              ↓ Scroll to reveal
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. STANDFIRST STORY & EVIDENCE DOSSIER (3 PILLARS)             */}
      {/* ============================================================== */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-16 flex flex-col gap-8 sm:gap-12">
        {/* Standfirst / Body Paragraph */}
        <div
          style={{
            transitionDuration: '2000ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '400ms',
          }}
          className={`max-w-3xl mx-auto text-center border-b border-[#222] pb-8 sm:pb-12 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          <p className="font-serif text-sm sm:text-xl lg:text-[24px] text-[#e5e7eb] leading-relaxed sm:leading-[36px] font-normal px-2">
            29,670 rape cases were registered in India in 2023. That is about 81 a day.
            By the time you finish scrolling this page, another woman or girl will have been raped.
            These are reported cases only, and the real number is higher.
          </p>
        </div>

        {/* 3 Pillars Grid Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222] pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-white tracking-[1.4px] sm:tracking-[2px] uppercase">
              EVIDENCE DOSSIER // THE THREE CRISIS PILLARS
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-[#9ca3af]">
            03 DOMAINS
          </span>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#222] border-b border-[#222] pb-8 sm:pb-12">
          {/* PILLAR 01: Sexual Violence */}
          <article className="flex flex-col justify-between p-3.5 sm:p-6 lg:px-7 lg:py-2">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed] tracking-[1.1px] uppercase">
                  PILLAR 01
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed]">/</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-[1.1px] uppercase">
                  SEXUAL VIOLENCE
                </span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <span className="font-bodoni font-bold text-2xl sm:text-4xl lg:text-[44px] text-white tracking-[-1px] leading-tight">
                  29,670
                </span>
                <div className="w-8 h-[2px] bg-[#7e3bed]" />
              </div>

              {/* Mobile concise copy */}
              <p className="block lg:hidden text-[#d1d5db] font-light text-xs sm:text-sm leading-relaxed">
                rape cases registered in India in 2023. In over 96% of cases, the offender was known to the victim.
              </p>

              {/* Desktop full copy */}
              <p className="hidden lg:block text-[#d1d5db] font-light text-sm sm:text-[15px] leading-relaxed">
                rape cases registered in India in 2023. In over 96% of cases, the offender
                was known to the victim — family members, friends, or neighbours.
              </p>
            </div>

            <div className="border-t border-[#1a1a1a] pt-3 sm:pt-4 mt-3 sm:mt-6">
              <p className="text-[10px] sm:text-[11px] font-normal text-[#9ca3af] tracking-[0.55px] uppercase">
                SOURCE:{' '}
                <span className="font-semibold text-[#d1d5db]">
                  NCRB, CRIME IN INDIA 2023
                </span>
              </p>
            </div>
          </article>

          {/* PILLAR 02: Educational Empowerment / Child Marriage */}
          <article className="flex flex-col justify-between p-3.5 sm:p-6 lg:px-7 lg:py-2">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed] tracking-[1.1px] uppercase">
                  PILLAR 02
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed]">/</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-[1.1px] uppercase">
                  EDUCATIONAL EMPOWERMENT
                </span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <span className="font-bodoni font-bold text-2xl sm:text-4xl lg:text-[44px] text-white tracking-[-1px] leading-tight">
                  15 lakh
                </span>
                <div className="w-8 h-[2px] bg-[#7e3bed]" />
              </div>

              {/* Mobile concise copy */}
              <p className="block lg:hidden text-[#d1d5db] font-light text-xs sm:text-sm leading-relaxed">
                girls under 18 married annually in India, ending school for most. Fewer than 2 in 10 remain in school. India is home to 223 million child brides.
              </p>

              {/* Desktop full copy */}
              <p className="hidden lg:block text-[#d1d5db] font-light text-sm sm:text-[15px] leading-relaxed">
                girls under 18 are married in India every year, ending school for most of them.
                At least 1.5 million girls under 18 get married in India each year, and fewer
                than 2 in 10 married girls remain in school. India is home to 223 million child brides.
              </p>
            </div>

            <div className="border-t border-[#1a1a1a] pt-3 sm:pt-4 mt-3 sm:mt-6">
              <p className="text-[10px] sm:text-[11px] font-normal text-[#9ca3af] tracking-[0.55px] uppercase">
                SOURCE:{' '}
                <span className="font-semibold text-[#d1d5db]">
                  UNICEF INDIA
                </span>
              </p>
            </div>
          </article>

          {/* PILLAR 03: Cyber Violence */}
          <article className="flex flex-col justify-between p-3.5 sm:p-6 lg:px-7 lg:py-2">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed] tracking-[1.1px] uppercase">
                  PILLAR 03
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#7e3bed]">/</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-[1.1px] uppercase">
                  CYBER VIOLENCE
                </span>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <span className="font-bodoni font-bold text-2xl sm:text-4xl lg:text-[44px] text-white tracking-[-1px] leading-tight">
                  19,510
                </span>
                <div className="w-8 h-[2px] bg-[#7e3bed]" />
              </div>

              {/* Mobile concise copy */}
              <p className="block lg:hidden text-[#d1d5db] font-light text-xs sm:text-sm leading-relaxed">
                cybercrime cases registered against women in 2023, including stalking, morphing, extortion, blackmail, and circulation of explicit content.
              </p>

              {/* Desktop full copy */}
              <p className="hidden lg:block text-[#d1d5db] font-light text-sm sm:text-[15px] leading-relaxed">
                cybercrime cases against women were registered in 2023, including stalking,
                morphing, blackmail, fake profiles and circulation of explicit content.
              </p>
            </div>

            <div className="border-t border-[#1a1a1a] pt-3 sm:pt-4 mt-3 sm:mt-6">
              <p className="text-[10px] sm:text-[11px] font-normal text-[#9ca3af] tracking-[0.55px] uppercase">
                SOURCE:{' '}
                <span className="font-semibold text-[#d1d5db]">
                  NCRB 2023 (CYBER CRIMES)
                </span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
