'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOOTER_NAV_LINKS = [
  { label: 'AB AUR NAHI', href: '#ab-aur-nahi' },
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'OUR MISSION', href: '#our-mission' },
  { label: 'FACTS', href: '#facts' },
  { label: 'WHAT YOU CAN DO', href: '#what-you-can-do' },
];

const LEFT_HAND = `                               .::.                                                 
                          -#@@@@@%%%%########+.                                     
                      :#@@@@@@@@@@@%%%%#######%%%%#=-.                              
            :+#%@@@@@@@@@@@@@@@@@@@@%%%%%%##%%%%%%%%%%##*####***+=.                 
       :*@@@@@@@@@@@@%%%####%%%%%%##%%@@@@@%%%%%@@@@@@@%%%%%%##**##*:               
  .=#%@@@@@@@@@%%%%#**+==-=-------=*#%@@@@@@@%%%%@@@@@@@@%@@@@@@%%%%+-              
%%%%@@%%%%%%%%##*+++===-===+++====---#%@@@@@@@@%%%@@@@@@%%%@@@@@@@@%%%#=::.         
%%%%@@@%%%%%%###*+===-====-----====-:-*%%@@@@@@@@%%%%%%+***##%%@@@@@@@@%%#*=-==:    
%@@@@%%%%%%###*++=--===-:--====--:::::*%%%%@@@@@@@@%%%#=--=+%%*+%@@@%%@@@@@@@%%#+=. 
%@@%%%%%%%#**++=-----:--=--::::::      =%%%#%%%@@@@@@@@#=:-.::::...:.. :+%@@@@@@%+=:
%@%%%%%##**+===---:---:::.....          .#%%**%*#@@@@@@%*-:::  :...... .:::---+%@@%*-
#%%%##*+++===------::..:...                :##++*%@@@@%%##*=:  -::........:::..:*#%@
****+==-==--:--::........                          :#%%%%%%%#*-::-::  :--..--::.  =+
====---:::::::::.....:.                                 =%%%%####=:..   .. ----.   .
-----:::::::........                                      .*#%%%#*#=.    .:.-=.    
:--:::::::.....::                                            -##+-*==:    ...---..  
:::::::::....                                                :=+--*##=     -: --.:= 
:::::..:                                                     .+*= .-:      -: +-- : 
:::.                                                                             .  
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    `;

const RIGHT_HAND = `                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                 -#@@@@@@@@@@@@@@@@ 
                                                    :=*@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
                                     :=+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%@@@@@ 
                                -%@@@@@@@@@@@@@@@@%@@@@@@@@%#####%%%#####%%%%@@@@@@ 
        :#@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%@@%#**##****++***###%%%@@@@@@@ 
-%@@@@@@@@@@%#+%@@@@@@@@@@@@@%##%%%%%%@@@@@@@@@@@%#*==--+*##**+*++++**###%%%%%%@@@@ 
+%##*+=--=-::--:----==#@@@%@@%+---+@@@@@@@@@@@@@%#+=-:::-===+*###########%%%%%%@@@@ 
                       +##*=+%#+*@@@@@@%##%@@%%%#+=-::::--=========+++++=++***###** 
                         .=---+@@@@@@%#+-=#%##*+=--------:------------===+*####**** 
                        =*#@@@@@%%*+=----::-:--------:---:--::-------=++++++=++++++ 
                    -#%%@@@%%%*=---::::::::::------::::----        .:-==+++==++==== 
                 -%@@@@%@%#+=-::-#@@@%*-=+-::::::::::---.                    .::--= 
                  *%%%@%#*+--#%#-:-%@@%#+=#%%#*+----:                              
                    #*=::-*%%%*--: =*::*#*=-+**=.                                  
                   .@@#=-+%#+--:  *%%*-:                                           
                   *%+=--#%%*-.  +=--:.                                            
                   +@%=-*#+==.   +=--:                                             
                    %@*=*@#=:    *%%@=                                             
                    %@*-#@#=     .%%%:                                             
                     ..                                                            `;

// Trimmed versions for mobile stacking to remove vertical gap between hands and quote
const LEFT_HAND_MOBILE = LEFT_HAND.split('\n')
  .filter((_, idx) => idx <= 18)
  .join('\n');

const RIGHT_HAND_MOBILE = RIGHT_HAND.split('\n')
  .filter((_, idx) => idx >= 7)
  .join('\n');

export default function Footer() {
  const footerRef = useRef(null);
  const handsContainerRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);

  // Mobile refs
  const mobileHandsContainerRef = useRef(null);
  const mobileLeftHandRef = useRef(null);
  const mobileRightHandRef = useRef(null);

  // Spotlight states for interactive baby-pink hover over characters
  const [mouseSpotlight, setMouseSpotlight] = useState({ x: -999, y: -999, active: false });
  const [mobileSpotlight, setMobileSpotlight] = useState({ x: -999, y: -999, active: false });

  // 1. Scroll Parallax (Desktop & Mobile)
  useEffect(() => {
    const footerElem = footerRef.current;
    const leftElem = leftHandRef.current;
    const rightElem = rightHandRef.current;
    const mLeftElem = mobileLeftHandRef.current;
    const mRightElem = mobileRightHandRef.current;
    if (!footerElem) return;

    const ctx = gsap.context(() => {
      // Desktop Parallax
      if (leftElem) {
        gsap.fromTo(
          leftElem,
          { x: -50, opacity: 0.65 },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerElem,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          }
        );
      }

      if (rightElem) {
        gsap.fromTo(
          rightElem,
          { x: 50, opacity: 0.65 },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerElem,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          }
        );
      }

      // Mobile Parallax
      if (mLeftElem) {
        gsap.fromTo(
          mLeftElem,
          { x: -35, opacity: 0.7 },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerElem,
              start: 'top 90%',
              end: 'center center',
              scrub: 0.6,
            },
          }
        );
      }

      if (mRightElem) {
        gsap.fromTo(
          mRightElem,
          { x: 35, opacity: 0.7 },
          {
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerElem,
              start: 'top 90%',
              end: 'center center',
              scrub: 0.6,
            },
          }
        );
      }
    }, footerElem);

    return () => ctx.revert();
  }, []);

  // 2. Desktop Mouse Move Tracker
  const handleMouseMove = (e) => {
    if (!handsContainerRef.current) return;
    const rect = handsContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMouseSpotlight({ x, y, active: true });

    const normalX = (x / rect.width) - 0.5;
    const normalY = (y / rect.height) - 0.5;
    if (leftHandRef.current) {
      leftHandRef.current.style.transform = `translate3d(${normalX * 14}px, ${normalY * 8}px, 0)`;
    }
    if (rightHandRef.current) {
      rightHandRef.current.style.transform = `translate3d(${-normalX * 14}px, ${-normalY * 8}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    setMouseSpotlight((prev) => ({ ...prev, active: false }));
    if (leftHandRef.current) {
      leftHandRef.current.style.transform = 'translate3d(0, 0, 0)';
      leftHandRef.current.style.transition = 'transform 0.4s ease-out';
    }
    if (rightHandRef.current) {
      rightHandRef.current.style.transform = 'translate3d(0, 0, 0)';
      rightHandRef.current.style.transition = 'transform 0.4s ease-out';
    }
  };

  // 3. Mobile Touch/Mouse Move Tracker
  const handleMobileMove = (e) => {
    if (!mobileHandsContainerRef.current) return;
    const rect = mobileHandsContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMobileSpotlight({ x, y, active: true });
  };

  const handleMobileLeave = () => {
    setMobileSpotlight((prev) => ({ ...prev, active: false }));
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full h-auto min-h-[100dvh] md:h-[100dvh] md:max-h-[100dvh] md:min-h-[100dvh] bg-[#f7f2ff] text-[#0e0e0e] overflow-x-hidden md:overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#7e3bed]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#ff46a2]/10 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* A. MOBILE VIEW (Left hand on top of quote, Right hand below quote)         */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col justify-between min-h-[100dvh] w-full pt-14 pb-0 px-0 text-center items-center relative z-20">
        
        {/* 1. TOP SECTION: Left Hand (Top) -> Quote (Middle) -> Right Hand (Bottom) with reduced spacing */}
        <div
          ref={mobileHandsContainerRef}
          onTouchStart={handleMobileMove}
          onTouchMove={handleMobileMove}
          onTouchEnd={handleMobileLeave}
          onMouseMove={handleMobileMove}
          onMouseLeave={handleMobileLeave}
          className="relative w-full flex flex-col items-center overflow-hidden my-0 py-0 select-none cursor-default shrink-0"
        >
          {/* A. Top Hand: Left hand entering from extreme left edge */}
          <div className="relative w-full overflow-hidden flex justify-start pl-0 -mb-1">
            {/* Base Violet Hand */}
            <div ref={mobileLeftHandRef} className="w-full overflow-hidden flex justify-start pl-0 will-change-transform">
              <pre className="font-mono text-[4.8px] min-[375px]:text-[5.4px] min-[410px]:text-[6px] text-[#7e3bed] leading-[1.01] tracking-tighter select-none whitespace-pre text-left pl-0">
                {LEFT_HAND_MOBILE}
              </pre>
            </div>

            {/* Interactive Baby Pink Overlay on touch/hover */}
            <div
              className="absolute inset-0 w-full h-full flex justify-start pl-0 pointer-events-none transition-opacity duration-200"
              style={{
                WebkitMaskImage: mobileSpotlight.active
                  ? `radial-gradient(circle 55px at ${mobileSpotlight.x}px ${mobileSpotlight.y}px, black 30%, transparent 100%)`
                  : 'none',
                maskImage: mobileSpotlight.active
                  ? `radial-gradient(circle 55px at ${mobileSpotlight.x}px ${mobileSpotlight.y}px, black 30%, transparent 100%)`
                  : 'none',
                opacity: mobileSpotlight.active ? 1 : 0,
              }}
            >
              <pre className="font-mono text-[4.8px] min-[375px]:text-[5.4px] min-[410px]:text-[6px] text-[#ff46a2] drop-shadow-[0_0_8px_rgba(255,70,162,0.6)] leading-[1.01] tracking-tighter select-none whitespace-pre text-left pl-0">
                {LEFT_HAND_MOBILE}
              </pre>
            </div>
          </div>

          {/* B. Center Quote (Tucked closely between the hands) */}
          <div className="w-full text-center max-w-[280px] min-[380px]:max-w-[315px] mx-auto space-y-0.5 my-0 px-4 z-10">
            <p className="text-[12px] min-[380px]:text-[13px] font-bold text-[#0e0e0e] italic tracking-wide leading-snug">
              &ldquo;Survivors of sexual violence who choose to report need an environment that is empowering, non-intimidating and non-judgmental.&rdquo;
            </p>
            <p className="text-[9px] min-[380px]:text-[10px] text-[#4b5563] tracking-wider uppercase font-semibold">
              &copy; 2026 Kanya Kiran Initiative &bull; KIIT &amp; KISS
            </p>
          </div>

          {/* C. Bottom Hand: Right hand entering from extreme right edge */}
          <div className="relative w-full overflow-hidden flex justify-end pr-0 -mt-1">
            {/* Base Violet Hand */}
            <div ref={mobileRightHandRef} className="w-full overflow-hidden flex justify-end pr-0 will-change-transform">
              <pre className="font-mono text-[4.8px] min-[375px]:text-[5.4px] min-[410px]:text-[6px] text-[#7e3bed] leading-[1.01] tracking-tighter select-none whitespace-pre text-left pr-0 translate-x-1.5">
                {RIGHT_HAND_MOBILE}
              </pre>
            </div>

            {/* Interactive Baby Pink Overlay on touch/hover */}
            <div
              className="absolute inset-0 w-full h-full flex justify-end pr-0 pointer-events-none transition-opacity duration-200"
              style={{
                WebkitMaskImage: mobileSpotlight.active
                  ? `radial-gradient(circle 55px at ${mobileSpotlight.x}px ${mobileSpotlight.y}px, black 30%, transparent 100%)`
                  : 'none',
                maskImage: mobileSpotlight.active
                  ? `radial-gradient(circle 55px at ${mobileSpotlight.x}px ${mobileSpotlight.y}px, black 30%, transparent 100%)`
                  : 'none',
                opacity: mobileSpotlight.active ? 1 : 0,
              }}
            >
              <pre className="font-mono text-[4.8px] min-[375px]:text-[5.4px] min-[410px]:text-[6px] text-[#ff46a2] drop-shadow-[0_0_8px_rgba(255,70,162,0.6)] leading-[1.01] tracking-tighter select-none whitespace-pre text-left pr-0 translate-x-1.5">
                {RIGHT_HAND_MOBILE}
              </pre>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE CONTENTS (Logos, Navlinks, Contact with ample gap, centered) */}
        <div className="w-full flex flex-col items-center justify-center space-y-3.5 my-auto px-4">
          
          {/* Logos Block (Only Kanya Kiran Logo & KISS Logo, no extra text) */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center justify-center gap-3">
              <div
                onClick={(e) => handleScrollTo(e, '#hero')}
                className="flex items-center cursor-pointer group"
                title="Kanya Kiran - Go to Hero"
              >
                <img
                  src="https://ik.imagekit.io/9plqngdvcd/Kanya-Kiran-by-KISS-Foundation-Logo-300x2711-1.png"
                  alt="Kanya Kiran Logo"
                  className="h-7 w-auto max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <span className="w-px h-5 bg-[#7e3bed]/25 block" />

              <a
                href="https://kiss.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group cursor-pointer shrink-0"
                title="KISS - Kalinga Institute of Social Sciences"
              >
                <img
                  src="https://ik.imagekit.io/9plqngdvcd/kiss-2026-logo.png"
                  alt="KISS Logo"
                  className="h-7 w-auto max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </a>
            </div>

            <p className="text-[10.5px] text-[#525252] leading-tight max-w-xs px-2">
              A flagship initiative of KIIT and KISS committed to creating a safer, more inclusive society for every girl child.
            </p>
          </div>

          {/* Navlinks Block */}
          <nav className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 max-w-xs mx-auto">
            {FOOTER_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[11px] font-bold tracking-wider text-[#374151] hover:text-[#7e3bed] transition-colors uppercase cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Block */}
          <div className="flex flex-col items-center text-center space-y-0.5 text-xs">
            <p className="font-semibold text-[#111827] text-[11.5px]">
              Kanyakiran Headquarter Koel Campus, KIIT
            </p>
            <p className="text-[#374151] text-[11px]">Bhubaneswar</p>
            <p className="text-[#374151] pt-0.5 text-[11px]">
              Phone: <a href="tel:0674-2741671" className="font-bold text-[#0e0e0e] hover:text-[#7e3bed] transition-colors">0674-2741671</a>
            </p>
            <p className="text-[#374151] text-[11px]">
              Email:{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kanya.kiran@kiit.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#7e3bed] hover:underline underline-offset-2 transition-colors cursor-pointer"
                title="Compose email to kanya.kiran@kiit.ac.in"
              >
                kanya.kiran@kiit.ac.in
              </a>
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-2.5 pt-1">
              <a
                href="https://x.com/Kanya_Kiran"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-[#7e3bed] hover:text-white text-[#374151] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                title="Follow on X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kanyakiranofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-[#ff46a2] hover:text-white text-[#374151] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                title="Follow on Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* 3. Bottom Watermark (Mobile) - Flush to very bottom edge of screen, NO negative space below */}
        <div className="w-full overflow-hidden flex justify-center items-end pointer-events-none select-none shrink-0 pb-0">
          <h1 className="text-[13.5vw] font-black tracking-tighter text-[#7e3bed]/[0.08] leading-[0.72] uppercase whitespace-nowrap translate-y-[8%]">
            KanyaKiran
          </h1>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* B. DESKTOP VIEW (3-Column Top, Hands + Center Quote, Giant Watermark)      */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col justify-between h-full w-full pt-20 sm:pt-24 md:pt-28 pb-0">
        
        {/* 1. TOP SECTION (3 Columns, safely below floating navbar) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 shrink-0">
          <div className="grid grid-cols-12 gap-8 items-start pb-2.5 border-b border-[#7e3bed]/15">
            
            {/* Top Left: Kanya Kiran & KISS Logos Only */}
            <div className="col-span-4 flex flex-col space-y-1.5">
              <div className="flex items-center gap-3">
                <div
                  onClick={(e) => handleScrollTo(e, '#hero')}
                  className="flex items-center cursor-pointer group"
                  title="Kanya Kiran - Go to Hero"
                >
                  <img
                    src="https://ik.imagekit.io/9plqngdvcd/Kanya-Kiran-by-KISS-Foundation-Logo-300x2711-1.png"
                    alt="Kanya Kiran Logo"
                    className="h-8.5 w-auto max-w-[110px] object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <span className="w-px h-7 bg-[#7e3bed]/20 block" />

                <a
                  href="https://kiss.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group cursor-pointer shrink-0"
                  title="KISS - Kalinga Institute of Social Sciences"
                >
                  <img
                    src="https://ik.imagekit.io/9plqngdvcd/kiss-2026-logo.png"
                    alt="KISS Logo"
                    className="h-8.5 w-auto max-w-[110px] object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </a>
              </div>

              <p className="text-xs text-[#525252] leading-snug max-w-xs">
                A flagship initiative of KIIT and KISS committed to creating a safer, more inclusive society for every girl child.
              </p>
            </div>

            {/* Top Middle: Nav Links */}
            <div className="col-span-4 flex flex-col items-center">
              <nav className="flex flex-col space-y-1 text-center">
                {FOOTER_NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xs font-bold tracking-wider text-[#374151] hover:text-[#7e3bed] transition-colors uppercase cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Top Right: Contact & Socials */}
            <div className="col-span-4 flex flex-col space-y-1 items-end text-right">
              <p className="font-semibold text-[13px] text-[#111827] leading-snug">
                Kanyakiran Headquarter Koel Campus, KIIT
              </p>
              <p className="text-[12.5px] text-[#374151]">
                Bhubaneswar
              </p>
              <p className="text-[12.5px] text-[#374151] pt-0.5">
                Phone: <a href="tel:0674-2741671" className="font-bold text-[#0e0e0e] hover:text-[#7e3bed] transition-colors">0674-2741671</a>
              </p>
              <p className="text-[12.5px] text-[#374151]">
                Email:{' '}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kanya.kiran@kiit.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#7e3bed] hover:underline underline-offset-2 transition-colors cursor-pointer"
                  title="Compose email to kanya.kiran@kiit.ac.in"
                >
                  kanya.kiran@kiit.ac.in
                </a>
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-1.5 justify-end">
                <a
                  href="https://x.com/Kanya_Kiran"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="w-7 h-7 rounded-full bg-black/5 hover:bg-[#7e3bed] hover:text-white text-[#374151] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:scale-105"
                  title="Follow on X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kanyakiranofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full bg-black/5 hover:bg-[#ff46a2] hover:text-white text-[#374151] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:scale-105"
                  title="Follow on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 2. MIDDLE SECTION: Hands Starting From EXTREME EDGES + Parallax + Interactive Baby-Pink Hover */}
        <div
          ref={handsContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full flex-1 flex flex-col justify-center items-center overflow-hidden my-auto py-1 px-0 cursor-default"
        >
          {/* Layer A: Base Violet ASCII Hands */}
          <div className="w-full flex items-center justify-between pointer-events-none px-0">
            <div ref={leftHandRef} className="w-1/2 overflow-hidden flex justify-start will-change-transform">
              <pre className="font-mono text-[8px] md:text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] text-[#7e3bed] leading-[1.05] tracking-tighter select-none whitespace-pre text-left pl-0">
                {LEFT_HAND}
              </pre>
            </div>

            <div ref={rightHandRef} className="w-1/2 overflow-hidden flex justify-end will-change-transform">
              <pre className="font-mono text-[8px] md:text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] text-[#7e3bed] leading-[1.05] tracking-tighter select-none whitespace-pre text-left pr-0">
                {RIGHT_HAND}
              </pre>
            </div>
          </div>

          {/* Layer B: Interactive Baby Pink Overlay (65px focused spotlight radius) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-between pointer-events-none px-0 transition-opacity duration-200"
            style={{
              WebkitMaskImage: mouseSpotlight.active
                ? `radial-gradient(circle 65px at ${mouseSpotlight.x}px ${mouseSpotlight.y}px, black 30%, transparent 100%)`
                : 'none',
              maskImage: mouseSpotlight.active
                ? `radial-gradient(circle 65px at ${mouseSpotlight.x}px ${mouseSpotlight.y}px, black 30%, transparent 100%)`
                : 'none',
              opacity: mouseSpotlight.active ? 1 : 0,
            }}
          >
            <div className="w-1/2 overflow-hidden flex justify-start">
              <pre className="font-mono text-[8px] md:text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] text-[#ff46a2] drop-shadow-[0_0_8px_rgba(255,70,162,0.6)] leading-[1.05] tracking-tighter select-none whitespace-pre text-left pl-0">
                {LEFT_HAND}
              </pre>
            </div>

            <div className="w-1/2 overflow-hidden flex justify-end">
              <pre className="font-mono text-[8px] md:text-[9.5px] lg:text-[10.5px] xl:text-[11.5px] text-[#ff46a2] drop-shadow-[0_0_8px_rgba(255,70,162,0.6)] leading-[1.05] tracking-tighter select-none whitespace-pre text-left pr-0">
                {RIGHT_HAND}
              </pre>
            </div>
          </div>

          {/* Center Quote Overlay (Transparent container directly over the hands) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
            <div className="pointer-events-auto text-center max-w-sm sm:max-w-xl mx-auto space-y-1.5 px-3">
              <p className="text-xs sm:text-[13.5px] md:text-[15px] font-bold text-[#0e0e0e] italic tracking-wide leading-relaxed">
                &ldquo;Survivors of sexual violence who choose to report need an environment that is empowering, non-intimidating and non-judgmental.&rdquo;
              </p>
              <p className="text-[9.5px] sm:text-[11px] text-[#4b5563] tracking-wider uppercase font-semibold">
                &copy; 2026 Kanya Kiran Initiative &bull; KIIT &amp; KISS
              </p>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: Giant "KanyaKiran" Typography (Desktop) */}
        <div className="relative w-full overflow-hidden flex justify-center items-end pointer-events-none select-none shrink-0">
          <h1 className="text-[12.5vw] sm:text-[14vw] font-black tracking-tighter text-[#7e3bed]/[0.08] leading-[0.72] uppercase whitespace-nowrap translate-y-[8%]">
            KanyaKiran
          </h1>
        </div>

      </div>
    </footer>
  );
}
