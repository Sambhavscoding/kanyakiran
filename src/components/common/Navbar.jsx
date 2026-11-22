'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useJoinModal } from '@/components/forms/JoinModalProvider';

const NAV_LINKS = [
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'Our Mission', href: '#our-mission' },
  { label: 'Facts', href: '#facts' },
  { label: 'What You Can Do', href: '#what-you-can-do' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open: openJoinModal } = useJoinModal();

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    const heroBtn = document.getElementById('hero-join-btn') || document.getElementById('hero');
    if (heroBtn) {
      heroBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroBtn.focus?.();
    }
  };

  return (
    <>
      {/* Static Floating Navbar across all screens with shadow */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none py-2.5 sm:py-3.5 md:py-4 px-3 sm:px-6 lg:px-8 select-none"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ========================================================= */}
          {/* 1st ISLAND: 2 Logos (Kanya Kiran + KISS) Only             */}
          {/* ========================================================= */}
          <div
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="pointer-events-auto cursor-pointer bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 sm:gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-all duration-200 shrink-0 h-11 sm:h-12"
          >
            {/* Logo 1: Kanya Kiran Official Logo -> Scrolls to Hero */}
            <div
              className="flex items-center group cursor-pointer"
              title="Kanya Kiran - Go to Hero"
              onClick={(e) => handleScrollTo(e, '#hero')}
            >
              <img
                src="https://ik.imagekit.io/9plqngdvcd/Kanya-Kiran-by-KISS-Foundation-Logo-300x2711-1.png"
                alt="Kanya Kiran Logo"
                className="h-7 sm:h-8 w-auto max-w-[85px] sm:max-w-[100px] object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Subtle Vertical Divider between logos */}
            <span className="w-px h-4 sm:h-5 bg-gray-200 block shrink-0" />

            {/* Logo 2: KISS Official Logo -> Redirects to https://kiss.ac.in/ */}
            <a
              href="https://kiss.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center group shrink-0 cursor-pointer"
              title="KISS - Kalinga Institute of Social Sciences"
            >
              <img
                src="https://ik.imagekit.io/9plqngdvcd/kiss-2026-logo.png"
                alt="KISS Logo"
                className="h-6 sm:h-7 w-auto max-w-[70px] sm:max-w-[85px] object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </a>
          </div>

          {/* ========================================================= */}
          {/* 2nd ISLAND: Nav Links (Desktop) & CTA + Hamburger (Mobile) */}
          {/* ========================================================= */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full p-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 flex items-center gap-1 sm:gap-2 md:gap-3.5 lg:gap-4 shadow-[0_8px_25px_rgba(0,0,0,0.12)] border border-black/5 transition-all duration-200 h-11 sm:h-12 shrink-0">
            
            {/* Desktop Navigation Links (Hidden on phone) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-2.5 py-1 text-[12px] lg:text-[13.5px] font-semibold text-[#374151] hover:text-[#7e3bed] rounded-full hover:bg-[#7e3bed]/5 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Purple CTA Button (#AbAurNahi) with Round Arrow End */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#7e3bed] hover:bg-[#6c28e0] active:scale-95 text-white pl-3 pr-1.5 py-1 sm:pl-4 sm:pr-2 sm:py-1.5 rounded-full font-bold text-[11px] sm:text-xs md:text-[13px] tracking-tight shadow-md shadow-[#7e3bed]/25 transition-all duration-200 cursor-pointer group"
            >
              <span className="whitespace-nowrap">#AbAurNahi</span>
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#7e3bed] flex items-center justify-center transition-colors">
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Button (ONLY in Phone view, NO hamburger in Desktop) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-[#111827] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#0e0e0e]" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#0e0e0e]" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* Mobile Menu Drawer / Overlay                              */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Menu Drawer Content */}
          <div className="relative z-50 w-full max-w-sm mx-auto mt-20 px-4">
            <div className="bg-white rounded-[24px] shadow-2xl border border-black/10 p-4 sm:p-5 flex flex-col space-y-3">
              {/* Nav List */}
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#1f2937] hover:text-[#7e3bed] hover:bg-[#7e3bed]/5 transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </a>
                ))}
              </nav>

              {/* Action Button inside drawer */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#7e3bed] hover:bg-[#6c28e0] text-white py-2.5 rounded-xl font-bold text-sm shadow-md shadow-[#7e3bed]/25 cursor-pointer"
                >
                  <span>Join Movement (#AbAurNahi)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
