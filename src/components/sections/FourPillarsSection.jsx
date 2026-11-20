'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, GraduationCap, Laptop, HeartHandshake } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

const PILLARS_DATA = [
  {
    id: 1,
    number: '01',
    title: 'Physical violence',
    subtitle: 'Safety & Protection',
    description:
      'Guaranteeing immediate physical safety, defense workshops, community vigilance squads, and zero tolerance for bodily harm or aggression.',
    shortDescription:
      'Immediate safety training, defense workshops, vigilance squads, and zero tolerance for bodily harm.',
    icon: ShieldCheck,
    bgClass: 'bg-[#ff46a2]', // Vibrant Brand Pink
  },
  {
    id: 2,
    number: '02',
    title: 'Educational empowerment / fostering',
    subtitle: 'Learning & Growth',
    description:
      'Protecting every girl’s right to learn, providing access to quality schooling, higher education scholarships, and ending child marriage dropouts.',
    shortDescription:
      'Protecting every girl’s right to learn, schooling access, scholarships, and stopping dropouts.',
    icon: GraduationCap,
    bgClass: 'bg-[#7e3bed]', // Electric Violet
  },
  {
    id: 3,
    number: '03',
    title: 'Cyber violence',
    subtitle: 'Digital Safety',
    description:
      'Creating secure digital spaces, rapid response against cyber stalking, morphing, extortion, harassment, and ensuring digital privacy for every girl.',
    shortDescription:
      'Safe online spaces, rapid action on cyber stalking, harassment, and digital privacy protection.',
    icon: Laptop,
    bgClass: 'bg-[#8b5cf6]', // Saturated Vibrant Violet
  },
  {
    id: 4,
    number: '04',
    title: 'Psychological and emotional violence',
    subtitle: 'Well-being & Voice',
    description:
      'Fostering open dialogue, trauma counseling, peer support networks, and emotional well-being so no girl ever feels unheard, unseen, or alone.',
    shortDescription:
      'Open dialogue, trauma counseling, peer support networks, and emotional resilience for girls.',
    icon: HeartHandshake,
    bgClass: 'bg-[#a83279]', // Deep Plum Rose
  },
];

export default function FourPillarsSection() {
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
      className="relative w-full max-w-full h-auto min-h-[100dvh] lg:h-screen lg:max-h-screen bg-[#f7f2ff] text-[#111827] overflow-visible flex flex-col justify-center py-6 lg:py-0 -mt-[2px]"
    >
      {/* Decorative Star Accents */}
      {/* Star 1: Top-Left */}
      <div className="absolute top-3 left-3 sm:top-1/4 sm:left-8 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-22 sm:h-22 lg:w-26 lg:h-26 text-[#7e3bed] opacity-45 sm:opacity-35 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Star 2: Bottom-Left (mobile extra accent) */}
      <div className="absolute bottom-3 left-4 sm:hidden pointer-events-auto cursor-pointer p-1 group z-20">
        <BrandStar
          className="w-5 h-5 text-[#7e3bed] opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      {/* Star 3: Bottom-Right */}
      <div className="absolute bottom-3 right-4 sm:bottom-10 sm:right-12 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-6 h-6 sm:w-26 sm:h-26 lg:w-32 lg:h-32 text-[#ff46a2] opacity-50 sm:opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4.5}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto flex flex-col justify-center">
        
        {/* Callout Header: order-1 on mobile (TOP), order-2 on desktop (BOTTOM) */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '150ms',
          }}
          className={`order-1 sm:order-2 mb-3.5 sm:mb-0 sm:mt-8 lg:mt-10 text-center max-w-3xl mx-auto space-y-1 sm:space-y-2 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* Structure & Organisation styled like Hero 24th January Pill */}
          <div className="inline-flex items-center justify-center -rotate-1 hover:rotate-1 transition-transform duration-200 select-none mb-1 cursor-pointer">
            <div className="bg-[#d3bbff] text-[#2e0854] px-3.5 py-1 sm:px-5 sm:py-2 rounded-2xl font-bold text-[11px] sm:text-xs md:text-sm tracking-wide shadow-md uppercase">
              STRUCTURE &amp; ORGANISATION
            </div>
          </div>

          <h2 className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0e0e0e] leading-snug">
            The initiative works across four key pillars:
          </h2>
          <p className="text-[11px] sm:text-sm text-[#4b5563] leading-relaxed max-w-2xl mx-auto block">
            Anchoring our mission to build an equal, violence-free society with physical safety, inclusive education, digital protection, and emotional resilience.
          </p>
        </div>

        {/* Curtains Row: order-2 on mobile (BELOW heading), order-1 on desktop (TOP) */}
        <div className="order-2 sm:order-1 relative z-30 grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {PILLARS_DATA.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                style={{
                  transitionDuration: '2200ms',
                  transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transitionDelay: `${index * 160 + 250}ms`,
                }}
                className={`relative overflow-hidden flex flex-row sm:flex-col items-center sm:items-stretch justify-between p-3 sm:p-5 lg:p-7 min-h-[86px] sm:min-h-[290px] lg:min-h-[350px] lg:max-h-[385px] rounded-l-2xl rounded-r-[36px] sm:rounded-t-3xl sm:rounded-b-[85px] shadow-md sm:shadow-2xl transition-all sm:hover:-translate-y-2 sm:hover:shadow-[0_24px_48px_rgba(0,0,0,0.25)] group ${pillar.bgClass} text-white ${
                  isInView
                    ? 'opacity-100 blur-none translate-y-0'
                    : 'opacity-0 blur-[12px] translate-y-6 sm:translate-y-8'
                }`}
              >
                {/* Top-Left Watermark Number */}
                <span className="absolute top-2 left-2.5 sm:top-3.5 sm:left-5 text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white/25 sm:text-white/20 leading-none select-none pointer-events-none z-0">
                  {pillar.number}
                </span>

                {/* Content: Subtitle, Title, and Concise Description on mobile */}
                <div className="relative z-10 flex-1 min-w-0 pr-2.5 sm:pr-0 pt-2.5 sm:pt-7 lg:pt-8 space-y-0.5 sm:space-y-2 lg:space-y-3 text-left">
                  {/* Subtitle / Note */}
                  <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white/85">
                    {pillar.subtitle}
                  </div>

                  {/* Verbatim Title */}
                  <h3 className="text-xs sm:text-lg lg:text-xl font-bold tracking-tight text-white leading-tight sm:leading-snug break-words">
                    {pillar.title}
                  </h3>

                  {/* Concise Description on Phone, Full Description on Desktop */}
                  <p className="block sm:hidden text-[10px] leading-tight text-white/90 line-clamp-2 pt-0.5">
                    {pillar.shortDescription}
                  </p>
                  <p className="hidden sm:block text-xs sm:text-sm leading-relaxed text-white/90 line-clamp-3 sm:line-clamp-4 pt-0.5">
                    {pillar.description}
                  </p>
                </div>

                {/* In the End: Semicircular arch with icon button */}
                <div className="relative z-10 shrink-0 pl-1 sm:pl-0 sm:pt-6 lg:pt-8 flex justify-center items-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white/35 backdrop-blur-sm shadow-md sm:shadow-lg transition-transform duration-200 sm:group-hover:-rotate-12 text-white">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white stroke-[2.3] transition-transform duration-200 sm:group-hover:rotate-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}