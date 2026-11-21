'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OurMissionSection from '@/components/sections/OurMissionSection';
import NoiseDissolveReveal from '@/components/ui/NoiseDissolveReveal';

gsap.registerPlugin(ScrollTrigger);

export default function MissionTransitionSection() {
  const sectionRef = useRef(null);
  const [dissolve, setDissolve] = useState(0);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        // Wait until the user scrolls through Our Mission to the very end before pinning and dissolving!
        start: 'bottom bottom',
        end: () => (window.innerWidth < 768 ? '+=800' : '+=1300'),
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setDissolve(self.progress);
        },
        onLeave: () => {
          // Lock dissolve at 1 when scrolling past pin so it never reverts
          setDissolve(1);
        },
        onEnterBack: () => {
          setDissolve(1);
        },
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const isFullyDissolved = dissolve >= 0.95;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden transition-colors duration-75"
      style={{
        backgroundColor: isFullyDissolved ? '#000000' : '#f7f2ff',
      }}
    >
      {/* Layer 1: Our Mission - Renders at full height, then hides once dissolved to prevent any flash glitch */}
      <div
        className="relative w-full transition-opacity duration-75"
        style={{
          opacity: isFullyDissolved ? 0 : 1,
          visibility: dissolve >= 0.98 ? 'hidden' : 'visible',
        }}
      >
        <OurMissionSection />
      </div>

      {/* Layer 2: WebGL Noise Dissolve Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <NoiseDissolveReveal
          dissolve={dissolve}
          veilColor="#000000"
          noiseScale={5.5}
          softness={0.055}
          centerBias={0.3}
        />
      </div>

      {/* Layer 3: Solid Black Fill Layer (guarantees 100% pure black with zero flash or seam) */}
      <div
        className="absolute inset-0 bg-[#000000] pointer-events-none z-40"
        style={{
          opacity: isFullyDissolved ? 1 : Math.max(0, (dissolve - 0.7) / 0.25),
        }}
      />
    </section>
  );
}
