'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';

const NoiseSVG = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="fractal-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#fractal-noise)" />
  </svg>
));

NoiseSVG.displayName = 'NoiseSVG';

const NoiseOverlay = ({ opacity }) => (
  <div
    className="absolute inset-0 h-full w-full mix-blend-overlay pointer-events-none"
    style={{ opacity }}
  >
    <NoiseSVG />
  </div>
);

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
};

const usePerformance = (initialPerformance = 'medium') => {
  const [performance, setPerformance] = useState(initialPerformance);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = globalThis.performance ? globalThis.performance.now() : Date.now();
    let framerId;

    const measureFps = (time) => {
      frameCount++;
      if (time - lastTime > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      framerId = requestAnimationFrame(measureFps);
    };

    framerId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(framerId);
  }, []);

  useEffect(() => {
    if (fps < 30 && performance !== 'low') {
      setPerformance('low');
    } else if (fps >= 30 && fps < 50 && performance !== 'medium') {
      setPerformance('medium');
    } else if (fps >= 50 && performance !== 'high') {
      setPerformance('high');
    }
  }, [fps, performance]);

  return { performance, fps };
};

const DotCanvas = React.memo(
  ({
    dotSize,
    dotSpacing,
    dotOpacity,
    waveIntensity,
    waveRadius,
    dotColor,
    glowColor,
    performance,
    mousePos,
  }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const drawDots = useCallback(
      (ctx, time) => {
        const { width, height } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);

        const performanceSettings = {
          low: { skip: 3 },
          medium: { skip: 2 },
          high: { skip: 1 },
        };

        const skip = performanceSettings[performance]?.skip || 1;

        const cols = Math.ceil(width / dotSpacing);
        const rows = Math.ceil(height / dotSpacing);

        const centerX = mousePos.x * width;
        const centerY = mousePos.y * height;

        for (let i = 0; i < cols; i += skip) {
          for (let j = 0; j < rows; j += skip) {
            const x = i * dotSpacing;
            const y = j * dotSpacing;

            const distanceX = x - centerX;
            const distanceY = y - centerY;
            const distance = Math.sqrt(
              distanceX * distanceX + distanceY * distanceY
            );

            let dotX = x;
            let dotY = y;

            if (distance < waveRadius && mousePos.active) {
              const waveStrength = Math.pow(1 - distance / waveRadius, 2);
              const angle = Math.atan2(distanceY, distanceX);
              const waveOffset =
                Math.sin(distance * 0.05 - time * 0.003) *
                waveIntensity *
                waveStrength;
              dotX += Math.cos(angle) * waveOffset;
              dotY += Math.sin(angle) * waveOffset;

              const glowRadius = dotSize * (1 + waveStrength * 1.2);
              const gradient = ctx.createRadialGradient(
                dotX,
                dotY,
                0,
                dotX,
                dotY,
                glowRadius
              );
              gradient.addColorStop(
                0,
                glowColor.replace('1)', `${dotOpacity * (1 + waveStrength * 1.5)})`)
              );
              gradient.addColorStop(1, glowColor.replace('1)', '0)'));
              ctx.fillStyle = gradient;
            } else {
              ctx.fillStyle = dotColor.replace('1)', `${dotOpacity})`);
            }

            ctx.beginPath();
            ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      },
      [
        dotSize,
        dotSpacing,
        dotOpacity,
        waveIntensity,
        waveRadius,
        dotColor,
        glowColor,
        performance,
        mousePos,
      ]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        ctx.scale(dpr, dpr);
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let lastTime = 0;
      const animate = (time) => {
        if (time - lastTime > 16) {
          drawDots(ctx, time);
          lastTime = time;
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [drawDots]);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-transparent pointer-events-none"
      />
    );
  }
);

DotCanvas.displayName = 'DotCanvas';

const MouseGlow = React.memo(({ glowColor, mousePos }) => {
  if (!mousePos.active) return null;
  return (
    <>
      <div
        className="absolute w-36 h-36 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${glowColor.replace(
            '1)',
            '0.10)'
          )} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(12px)',
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${glowColor.replace(
            '1)',
            '0.18)'
          )} 0%, ${glowColor.replace('1)', '0)')} 70%)`,
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
});

MouseGlow.displayName = 'MouseGlow';

export function FractalDotGrid({
  dotSize = 1.8,
  dotSpacing = 24,
  dotOpacity = 0.16,
  waveIntensity = 5.5,
  waveRadius = 130,
  dotColor = 'rgba(126, 59, 237, 1)',
  glowColor = 'rgba(126, 59, 237, 1)',
  enableNoise = false,
  noiseOpacity = 0.015,
  enableMouseGlow = true,
  initialPerformance = 'high',
  className = '',
}) {
  const containerRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();
  const { performance } = usePerformance(initialPerformance);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, active: false });

  const handleMouseMove = useCallback((event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    setMousePos({ x, y, active: true });
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (event.touches && event.touches[0]) {
      const x = event.touches[0].clientX / window.innerWidth;
      const y = event.touches[0].clientY / window.innerHeight;
      setMousePos({ x, y, active: true });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleTouchMove, handleMouseLeave]);

  const responsiveDotSize = useMemo(() => {
    if (isMobile) return Math.max(1.2, dotSize * 0.75);
    if (isTablet) return Math.max(1.4, dotSize * 0.9);
    return dotSize;
  }, [isMobile, isTablet, dotSize]);

  const responsiveDotSpacing = useMemo(() => {
    if (isMobile) return dotSpacing * 1.35;
    if (isTablet) return dotSpacing * 1.15;
    return dotSpacing;
  }, [isMobile, isTablet, dotSpacing]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        key="fractal-dot-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className={`overflow-hidden pointer-events-none select-none ${className}`}
      >
        <DotCanvas
          dotSize={responsiveDotSize}
          dotSpacing={responsiveDotSpacing}
          dotOpacity={dotOpacity}
          waveIntensity={waveIntensity}
          waveRadius={waveRadius}
          dotColor={dotColor}
          glowColor={glowColor}
          performance={performance}
          mousePos={mousePos}
        />
        {enableNoise && <NoiseOverlay opacity={noiseOpacity} />}
        {enableMouseGlow && (
          <MouseGlow glowColor={glowColor} mousePos={mousePos} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default FractalDotGrid;
