'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import NoiseDissolveReveal from '@/components/ui/NoiseDissolveReveal';

/**
 * EndingSection
 *
 * Sits directly after OurMissionSection in the page.
 *
 * Layout:
 *   • A tall scroll track (200vh) pins a sticky viewport.
 *   • Inside the sticky viewport: a black (#0e0e0e) background with a
 *     light-coloured (#f7f2ff) noise veil on top that tears away as the
 *     user scrolls — transitioning cleanly from the light campaign palette
 *     to full darkness.
 *   • After the scroll track: the actual black page (ready for future content).
 *
 * Scroll mapping:
 *   progress 0 → veil fully intact (entering from Our Mission)
 *   progress 1 → veil fully torn (black screen fully revealed)
 */
export default function EndingSection() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // The scroll runway is the track height minus one viewport.
    // rect.top goes from 0 (track just entered) to -(track.height - windowH)
    // at the bottom of the track.
    const runway = rect.height - windowH;
    if (runway <= 0) return;

    const scrolled = -rect.top; // 0 when sticky first pins, runway when done
    const p = Math.min(Math.max(scrolled / runway, 0), 1);
    setProgress(p);
  }, []);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress(); // set initial value on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateProgress]);

  return (
    <>
      {/* ── Scroll track: gives the sticky pin enough room to animate ── */}
      <div ref={trackRef} className="relative w-full" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#0e0e0e]">
          {/*
            NoiseDissolveReveal renders a WebGL canvas on top of its children.
            veilColor matches the Our Mission section background (#f7f2ff),
            so the transition looks like the light skin is dissolving away
            to reveal the dark surface underneath.
          */}
          <NoiseDissolveReveal
            progress={progress}
            veilColor="#f7f2ff"
            noiseScale={5.5}
            softness={0.055}
            centerBias={0.3}
            height="100%"
            className="w-full h-full"
          >
            {/* children are behind the veil — the black bg is the container itself */}
          </NoiseDissolveReveal>
        </div>
      </div>

      {/* ── Black destination page — add your content here later ── */}
      <section
        id="next-section"
        aria-label="Next Section"
        className="relative w-full min-h-[100dvh] bg-[#0e0e0e]"
      />
    </>
  );
}
