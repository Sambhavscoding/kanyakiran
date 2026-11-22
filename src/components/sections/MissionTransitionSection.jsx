'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OurMissionSection from '@/components/sections/OurMissionSection';
import NoiseDissolveReveal from '@/components/ui/NoiseDissolveReveal';

gsap.registerPlugin(ScrollTrigger);

export default function MissionTransitionSection() {
  const sectionRef = useRef(null);
  const missionLayerRef = useRef(null);
  const blackFillRef = useRef(null);
  const [dissolve, setDissolve] = useState(0);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        // Locks only when user scrolls to the very end of Our Mission (Mission 7 in full view)
        start: 'bottom bottom',
        end: () => (window.innerWidth < 768 ? '+=750' : '+=1300'),
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setDissolve(self.progress);

          // Direct DOM synchronization guarantees zero-frame flash or glitch
          if (self.progress >= 0.95) {
            if (sectionRef.current) sectionRef.current.style.backgroundColor = '#000000';
            if (blackFillRef.current) blackFillRef.current.style.opacity = '1';
            if (missionLayerRef.current) {
              missionLayerRef.current.style.opacity = '0';
              missionLayerRef.current.style.visibility = 'hidden';
            }
          } else {
            if (sectionRef.current) sectionRef.current.style.backgroundColor = '#f7f2ff';
            if (missionLayerRef.current) {
              missionLayerRef.current.style.opacity = '1';
              missionLayerRef.current.style.visibility = 'visible';
            }
          }
        },
        onLeave: () => {
          // Permanently lock to solid black when scrolling past pin so it never reverts
          setDissolve(1);
          if (sectionRef.current) sectionRef.current.style.backgroundColor = '#000000';
          if (blackFillRef.current) blackFillRef.current.style.opacity = '1';
          if (missionLayerRef.current) {
            missionLayerRef.current.style.opacity = '0';
            missionLayerRef.current.style.visibility = 'hidden';
          }
        },
        onEnterBack: () => {
          setDissolve(1);
          if (sectionRef.current) sectionRef.current.style.backgroundColor = '#000000';
          if (blackFillRef.current) blackFillRef.current.style.opacity = '1';
          if (missionLayerRef.current) {
            missionLayerRef.current.style.opacity = '0';
            missionLayerRef.current.style.visibility = 'hidden';
          }
        },
      });
    }, sectionRef);

    // ResizeObserver ensures trigger bottom is recalculated as mobile images and fonts load
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (sectionRef.current) {
      ro.observe(sectionRef.current);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  const isFullyDissolved = dissolve >= 0.95;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden transition-colors duration-75"
      style={{
        backgroundColor: isFullyDissolved ? '#000000' : 'transparent',
      }}
    >
      {/* Layer 1: Our Mission - Renders at full height, hidden once dissolved to prevent any flash glitch */}
      <div
        ref={missionLayerRef}
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
        ref={blackFillRef}
        className="absolute inset-0 bg-[#000000] pointer-events-none z-40"
        style={{
          opacity: isFullyDissolved ? 1 : Math.max(0, (dissolve - 0.7) / 0.25),
        }}
      />
    </section>
  );
}
