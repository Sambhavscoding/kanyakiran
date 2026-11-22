'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, ShieldCheck, HandHeart, BookOpen, ShieldPlus, UsersRound, ShieldAlert } from 'lucide-react';
import BrandStar from '@/components/common/BrandStar';

// --- Interactive 3D Tilt Component ---
function TiltCard({ children, className = '', maxTilt = 8, scale = 1.03, ...props }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -maxTilt;
    const rotateY = ((x - width / 2) / (width / 2)) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-in-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export default function OurMissionSection() {
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
      id="our-mission"
      className="relative w-full max-w-full h-auto min-h-[100dvh] lg:h-screen lg:max-h-screen text-[#0e0e0e] overflow-visible flex flex-col justify-center pt-5 pb-10 sm:py-6 lg:py-6 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decorative Ambient Radial Glows */}
      {/* Soft Pink Glow - Left Side */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#ff46a2]/20 blur-3xl pointer-events-none select-none" />
      <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-[#7e3bed]/10 blur-3xl pointer-events-none select-none" />

      {/* Decorative Signature Doodle Loops from Figma */}
      <div className="absolute top-1 -left-16 w-[420px] lg:w-[540px] opacity-25 pointer-events-none select-none">
        <img
          src="/icons/doodle-loops-1.svg"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] lg:w-[680px] opacity-15 pointer-events-none select-none">
        <img
          src="/icons/signature-loop-violet.svg"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Decorative Brand Star Accents */}
      <div className="absolute top-3 left-3 sm:top-8 sm:left-8 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#7e3bed] opacity-45 sm:opacity-35 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      <div className="absolute top-8 right-6 sm:right-20 pointer-events-auto cursor-pointer p-1 group z-20 hidden sm:block">
        <BrandStar
          className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff46a2] opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4}
        />
      </div>

      <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 pointer-events-auto cursor-pointer p-1.5 group z-20">
        <BrandStar
          className="w-5 h-5 sm:w-18 sm:h-18 lg:w-22 lg:h-22 text-[#ff46a2] opacity-50 sm:opacity-35 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-200"
          strokeWidth={4.5}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto w-full my-auto flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-4">
        
        {/* 1. Header Section */}
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
          {/* Heading with pink accent underline */}
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] font-black tracking-tight text-[#0e0e0e] leading-tight uppercase">
            OUR{' '}
            <span className="text-[#7e3bed] underline decoration-[#ff46a2] decoration-4 underline-offset-6">
              MISSION
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[13px] lg:text-sm text-[#4b5563] max-w-2xl mx-auto leading-relaxed">
            Guiding principles and continuous commitments shaping our institutional and grassroots mobilization across Odisha and nationwide.
          </p>
        </div>

        {/* 2. Bento Container */}
        <div
          style={{
            transitionDuration: '2200ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            transitionDelay: '300ms',
          }}
          className={`w-full pt-2 sm:pt-3 transition-all ${
            isInView
              ? 'opacity-100 blur-none translate-y-0'
              : 'opacity-0 blur-[12px] translate-y-6'
          }`}
        >
          {/* MOBILE VIEW */}
          <div className="block lg:hidden w-full max-w-[440px] mx-auto px-1 space-y-3">
            {/* Top 2-Column Grid: Pillar 1 & Pillar 2 */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card 1: Mission 01 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <Eye className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Awareness</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Understanding violence and its impact.
                  </p>
                </div>
              </TiltCard>

              {/* Card 2: Mission 02 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <ShieldCheck className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Safety &amp; Dignity</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Inclusive conversations on safety &amp; dignity.
                  </p>
                </div>
              </TiltCard>
            </div>

            {/* Middle Mission 3: ZERO TOLERANCE */}
            <TiltCard maxTilt={5} scale={1.01} className="bg-gradient-to-b from-[#f5f0ff] via-white to-[#f5f0ff]/70 border border-[#7e3bed]/20 rounded-[22px] p-4 shadow-lg relative overflow-hidden flex flex-col items-center text-center">
              <div className="flex items-center justify-between w-full mb-2.5">
                <TiltCard maxTilt={10} scale={1.05} className="bg-[#d3bbff] text-[#2e0854] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs font-bold cursor-pointer">
                  <span className="text-[#2e0854] text-[11px] font-bold leading-none">★</span>
                  <span className="text-[10px] font-bold text-[#2e0854]">KIIT &amp; KISS Foundation Initiative</span>
                </TiltCard>
                <TiltCard maxTilt={10} scale={1.05} className="bg-[#d3bbff] text-[#2e0854] text-[9.5px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs cursor-pointer">
                  <ShieldAlert className="w-3 h-3 stroke-[2.2] text-[#2e0854]" />
                  MISSION 03
                </TiltCard>
              </div>

              {/* Portrait */}
              <div className="relative size-28 sm:size-32 my-1 shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#7e3bed]/30 scale-105" />
                <div className="w-full h-full rounded-full border-3 border-white shadow-md overflow-hidden relative">
                  <img
                    src="https://ik.imagekit.io/9plqngdvcd/Hopeful%20Faces%20in%20Purple.png"
                    alt="Mission 03 - Zero Tolerance"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <TiltCard maxTilt={12} scale={1.08} className="absolute -bottom-1 -right-2 bg-[#d3bbff] border border-[#2e0854]/15 text-[#2e0854] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap cursor-pointer z-10">
                  ✨ Zero Tolerance
                </TiltCard>
              </div>

              {/* Mission Description */}
              <div className="mt-2.5 text-center px-1">
                <p className="text-xs text-[#262626] leading-relaxed font-medium">
                  To foster an environment of{' '}
                  <span className="text-[#ff46a2] font-black tracking-wide">
                    ZERO TOLERANCE
                  </span>{' '}
                  towards violence, discrimination, harassment, and practices that undermine the safety, dignity, and rights of girls.
                </p>
              </div>
            </TiltCard>

            {/* Bottom 2-Column Grid: Pillars 4, 5, 6, 7 */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card 4: Mission 04 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <HandHeart className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Support &amp; Reporting</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Making support and reporting accessible.
                  </p>
                </div>
              </TiltCard>

              {/* Card 5: Mission 05 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 05</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <BookOpen className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Education</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Empowering every girl through education.
                  </p>
                </div>
              </TiltCard>

              {/* Card 6: Mission 06 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 06</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <ShieldPlus className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Safe Spaces</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Creating safer physical and digital spaces.
                  </p>
                </div>
              </TiltCard>

              {/* Card 7: Mission 07 */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[18px] p-3 flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-[#7e3bed] uppercase tracking-wider">MISSION 07</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>
                <div className="flex items-center justify-center my-1.5">
                  <UsersRound className="w-8 h-8 text-[#7e3bed] stroke-[1.8]" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#0e0e0e] leading-tight">Collective Responsibility</div>
                  <p className="text-[8.5px] text-[#525252] leading-tight mt-0.5">
                    Building a culture of shared responsibility.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* DESKTOP VIEW: Full 12-Column Responsive Bento Ribbon */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-3.5 xl:gap-4.5 w-full items-stretch">
            
            {/* Column A: Left Modular Stack (col-span-3) */}
            <div className="col-span-3 flex flex-col gap-3.5 justify-between">
              
              {/* Card A1: Mission 01 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between h-[195px] group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 01
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-1">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Eye className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Awareness</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Understanding violence and its impact.
                  </p>
                </div>
              </TiltCard>

              {/* Card A2: Mission 02 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between h-[215px] group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 02
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-1.5">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <ShieldCheck className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Safety &amp; Dignity</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Inclusive conversations on safety &amp; dignity.
                  </p>
                </div>
              </TiltCard>

            </div>

            {/* Column B: Centerpiece Lifestyle & Community Hero (col-span-5) */}
            <TiltCard maxTilt={5} scale={1.01} className="col-span-5 bg-gradient-to-b from-[#f5f0ff] via-white to-[#f5f0ff]/50 border border-[#7e3bed]/20 rounded-[24px] p-5 xl:p-6 shadow-xl shadow-[#7e3bed]/10 flex flex-col justify-between items-center relative overflow-hidden group">
              {/* Top Status Tags */}
              <div className="flex items-center justify-between w-full relative z-10">
                <TiltCard maxTilt={10} scale={1.05} className="bg-[#d3bbff] text-[#2e0854] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm font-bold cursor-pointer">
                  <span className="text-[#2e0854] text-xs font-bold leading-none">★</span>
                  <span className="text-xs font-bold text-[#2e0854]">KIIT &amp; KISS Foundation Initiative</span>
                </TiltCard>

                <TiltCard maxTilt={10} scale={1.05} className="flex items-center gap-1.5 bg-[#d3bbff] text-[#2e0854] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm cursor-pointer">
                  <ShieldAlert className="w-3.5 h-3.5 stroke-[2.2] text-[#2e0854]" />
                  <span>MISSION 03</span>
                </TiltCard>
              </div>

              {/* Central Photograph with dashed ring & badge */}
              <div className="relative my-auto py-2 shrink-0">
                <div className="relative size-44 xl:size-48">
                  {/* Decorative dashed ring behind portrait */}
                  <div className="absolute -inset-2 rounded-full border-3 border-dashed border-[#7e3bed]/25 animate-spin-slow pointer-events-none" />

                  {/* Main circular portrait */}
                  <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src="https://ik.imagekit.io/9plqngdvcd/Hopeful%20Faces%20in%20Purple.png"
                      alt="Mission 03 - Zero Tolerance"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Floating Micro-Badge */}
                  <TiltCard maxTilt={12} scale={1.08} className="absolute -bottom-1 -right-2 bg-[#d3bbff] border border-[#2e0854]/15 text-[#2e0854] px-3.5 py-1 rounded-full text-[11px] xl:text-xs font-bold shadow-md whitespace-nowrap cursor-pointer z-10">
                    ✨ Zero Tolerance
                  </TiltCard>
                </div>
              </div>

              {/* Mission Description */}
              <div className="relative z-10 w-full text-center px-4 pt-2 pb-1">
                <p className="text-xs sm:text-[13px] xl:text-[14px] text-[#262626] leading-relaxed max-w-lg mx-auto font-medium">
                  To foster an environment of{' '}
                  <span className="text-[#ff46a2] font-black tracking-wide">
                    ZERO TOLERANCE
                  </span>{' '}
                  towards violence, discrimination, harassment, and practices that undermine the safety, dignity, and rights of girls.
                </p>
              </div>
            </TiltCard>

            {/* Column C: Right Modular 2x2 Bento Cards (col-span-4) */}
            <div className="col-span-4 grid grid-cols-2 gap-3 xl:gap-3.5">
              
              {/* Card C1: Mission 04 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 04
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <HandHeart className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Support &amp; Reporting</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Making support and reporting accessible.
                  </p>
                </div>
              </TiltCard>

              {/* Card C2: Mission 05 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 05
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <BookOpen className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Education</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Empowering every girl through education.
                  </p>
                </div>
              </TiltCard>

              {/* Card C3: Mission 06 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 06
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <ShieldPlus className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Safe Spaces</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Creating safer physical and digital spaces.
                  </p>
                </div>
              </TiltCard>

              {/* Card C4: Mission 07 (Pillar 2 Design) */}
              <TiltCard className="bg-[#f2edfd] border border-[#7e3bed]/15 rounded-[22px] p-4 xl:p-4.5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-[#7e3bed] tracking-wider uppercase">
                    MISSION 07
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e3bed]" />
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="w-13 h-13 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <UsersRound className="w-11 h-11 text-[#7e3bed] stroke-[1.8]" />
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-[#0e0e0e] leading-tight">Collective Responsibility</h4>
                  <p className="text-[11px] text-[#525252] font-medium leading-snug mt-0.5">
                    Building a culture of shared responsibility.
                  </p>
                </div>
              </TiltCard>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
