import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

interface CompassPoint {
  id: string;
  label: string;
  shortLabel: string;
  angle: number;
  accent: string;
  accentRgb: string;
  description: string;
}

interface CompassStar {
  id: string;
  section: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

const compassPoints: CompassPoint[] = [
  {
    id: 'welcome',
    label: 'Welcome',
    shortLabel: 'Welcome',
    angle: 0,
    accent: '#4f7659',
    accentRgb: '79, 118, 89',
    description: 'Start here',
  },
  {
    id: 'brain',
    label: 'Meet Your Brain',
    shortLabel: 'Your\nBrain',
    angle: 45,
    accent: '#5b6f96',
    accentRgb: '91, 111, 150',
    description: 'The neuroscience',
  },
  {
    id: 'why-feels',
    label: 'Why It Feels Like This',
    shortLabel: 'Your\nExperiences',
    angle: 90,
    accent: '#7e8249',
    accentRgb: '126, 130, 73',
    description: 'Common experiences',
  },
  {
    id: 'what-is',
    label: 'What is ADHD?',
    shortLabel: 'What is\nADHD?',
    angle: 135,
    accent: '#a96952',
    accentRgb: '169, 105, 82',
    description: 'The diagnosis',
  },
  {
    id: 'getting-diagnosed',
    label: 'Getting Diagnosed',
    shortLabel: 'Getting\nDiagnosed',
    angle: 180,
    accent: '#9a7648',
    accentRgb: '154, 118, 72',
    description: 'The process',
  },
  {
    id: 'what-helps',
    label: 'What Helps',
    shortLabel: 'What\nHelps',
    angle: 225,
    accent: '#925e76',
    accentRgb: '146, 94, 118',
    description: 'Strategies & support',
  },
  {
    id: 'accommodations',
    label: 'Accommodations',
    shortLabel: 'Accommo-\ndations',
    angle: 270,
    accent: '#477f72',
    accentRgb: '71, 127, 114',
    description: 'Getting support',
  },
  {
    id: 'medication',
    label: 'Medication',
    shortLabel: 'Medication',
    angle: 315,
    accent: '#4e72a2',
    accentRgb: '78, 114, 162',
    description: 'How it works',
  },
];

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(): CompassStar[] {
  return compassPoints.flatMap((point, section) => {
    const random = seededRandom(1847 + section * 997);

    return Array.from({ length: 15 }, (_, starIndex) => {
      const angle = point.angle + (random() - 0.5) * 36;
      const distance = 10 + random() * 17.5;
      const radians = (angle * Math.PI) / 180;

      return {
        id: `${point.id}-star-${starIndex}`,
        section,
        x: 50 + Math.cos(radians) * distance,
        y: 50 + Math.sin(radians) * distance,
        size: 1.8 + random() * 2.8,
        opacity: 0.18 + random() * 0.18,
        delay: -random() * 4.5,
        duration: 3.2 + random() * 2.4,
      };
    });
  });
}

const compassStars = createStars();

function closestSection(angle: number) {
  return compassPoints.reduce(
    (closest, point, index) => {
      const distance = Math.abs((((angle - point.angle + 540) % 360) - 180));
      return distance < closest.distance ? { index, distance } : closest;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
}

export default function InteractiveCompass({ onNavigate }: { onNavigate: (id: string) => void }) {
  const reducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorSection, setCursorSection] = useState(0);
  const compassRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pointerFrame = useRef<number | null>(null);
  const pointerPosition = useRef({ clientX: 0, clientY: 0 });
  const pointerInside = useRef(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const restingSection = useRef(0);

  const activeSection = hoveredIndex ?? cursorSection;
  const starGroups = useMemo(
    () => compassPoints.map((_, section) => compassStars.filter((star) => star.section === section)),
    [],
  );

  const paintStars = useCallback(
    (section: number, pointer?: { x: number; y: number; width: number; height: number }) => {
      compassStars.forEach((star) => {
        const element = starRefs.current[star.id];
        if (!element) return;

        const isActive = star.section === section;
        let proximity = 0;

        if (isActive && pointer) {
          const starX = (star.x / 100) * pointer.width;
          const starY = (star.y / 100) * pointer.height;
          const distance = Math.hypot(pointer.x - starX, pointer.y - starY);
          const influenceRadius = Math.max(70, pointer.width * 0.13);
          proximity = Math.max(0, 1 - distance / influenceRadius);
        }

        const opacity = isActive ? 0.6 + proximity * 0.4 : star.opacity;
        const scale = isActive ? 1.12 + proximity * 0.78 : 1;
        const point = compassPoints[star.section];

        element.dataset.active = String(isActive);
        element.style.opacity = String(opacity);
        element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        element.style.filter = isActive
          ? `drop-shadow(0 0 ${4 + proximity * 8}px rgba(${point.accentRgb}, ${0.5 + proximity * 0.45}))`
          : `drop-shadow(0 0 2px rgba(${point.accentRgb}, 0.22))`;
      });
    },
    [],
  );

  useEffect(() => {
    paintStars(activeSection);
  }, [activeSection, paintStars]);

  useEffect(() => {
    return () => {
      if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  const renderPointer = useCallback(() => {
    pointerFrame.current = null;
    if (!pointerInside.current || !compassRef.current || reducedMotion) return;

    const rect = compassRef.current.getBoundingClientRect();
    const localX = pointerPosition.current.clientX - rect.left;
    const localY = pointerPosition.current.clientY - rect.top;
    const dx = localX - rect.width / 2;
    const dy = localY - rect.height / 2;
    const cursorAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const normalizedCursorAngle = (cursorAngle + 360) % 360;
    const needleAngle = cursorAngle + 90;

    if (needleRef.current) {
      needleRef.current.style.transition = 'none';
      needleRef.current.style.transform = `rotate(${needleAngle}deg)`;
    }

    const pointerSector = closestSection(normalizedCursorAngle);
    const visibleSection = hoveredIndexRef.current ?? pointerSector;

    if (hoveredIndexRef.current === null) {
      setCursorSection((current) => (current === pointerSector ? current : pointerSector));
    }

    paintStars(visibleSection, {
      x: localX,
      y: localY,
      width: rect.width,
      height: rect.height,
    });
  }, [paintStars, reducedMotion]);

  const queuePointerRender = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || reducedMotion) return;

    pointerInside.current = true;
    pointerPosition.current = { clientX: event.clientX, clientY: event.clientY };

    if (pointerFrame.current === null) {
      pointerFrame.current = requestAnimationFrame(renderPointer);
    }
  };

  const handlePointerLeave = () => {
    pointerInside.current = false;

    if (pointerFrame.current !== null) {
      cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = null;
    }

    const returnPoint = compassPoints[restingSection.current];
    if (needleRef.current) {
      needleRef.current.style.transition = reducedMotion
        ? 'none'
        : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';
      needleRef.current.style.transform = `rotate(${returnPoint.angle + 90}deg)`;
    }

    setCursorSection(restingSection.current);
    paintStars(restingSection.current);
  };

  const activateTab = (index: number) => {
    hoveredIndexRef.current = index;
    restingSection.current = index;
    setHoveredIndex(index);
    paintStars(index);

    if (!pointerInside.current && needleRef.current) {
      needleRef.current.style.transition = reducedMotion
        ? 'none'
        : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)';
      needleRef.current.style.transform = `rotate(${compassPoints[index].angle + 90}deg)`;
    }
  };

  const deactivateTab = () => {
    hoveredIndexRef.current = null;
    setHoveredIndex(null);

    if (compassRef.current && pointerInside.current) {
      const rect = compassRef.current.getBoundingClientRect();
      const localX = pointerPosition.current.clientX - rect.left;
      const localY = pointerPosition.current.clientY - rect.top;
      paintStars(cursorSection, { x: localX, y: localY, width: rect.width, height: rect.height });
      return;
    }

    paintStars(restingSection.current);
  };

  return (
    <div className="relative flex h-full min-h-[620px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-warm-cream via-white to-warm-gray/30 px-3 py-8">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage-green/10"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-teal/10"
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div
        ref={compassRef}
        className="relative z-10 flex aspect-square w-[min(94vw,calc(100svh-5rem),61rem)] items-center justify-center"
        onPointerEnter={queuePointerRender}
        onPointerMove={queuePointerRender}
        onPointerLeave={handlePointerLeave}
      >
        {/* Eight color-coded star clusters, one for each compass option. */}
        {starGroups.flat().map((star) => {
          const point = compassPoints[star.section];
          const isActive = star.section === activeSection;

          return (
            <div
              key={star.id}
              ref={(element) => {
                starRefs.current[star.id] = element;
              }}
              className="compass-star pointer-events-none absolute"
              data-active={String(isActive)}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: isActive ? 0.6 : star.opacity,
                transform: 'translate(-50%, -50%)',
                transition: reducedMotion
                  ? 'none'
                  : 'opacity 180ms ease, transform 180ms ease, filter 180ms ease',
              }}
              aria-hidden="true"
            >
              <span
                className="compass-star-core block rounded-full"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: point.accent,
                  boxShadow: `0 0 5px rgba(${point.accentRgb}, 0.35)`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            </div>
          );
        })}

        {/* Larger compass plate so the visual compass scales with the expanded tab ring. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage-green/20 bg-white/15 shadow-[inset_0_0_60px_rgba(79,118,89,0.06),0_20px_70px_rgba(55,65,50,0.05)] backdrop-blur-[1px]"
          aria-hidden="true"
        >
          <div className="absolute inset-[7%] rounded-full border border-muted-teal/15" />
          <div className="absolute inset-[18%] rounded-full border border-sage-green/10" />
        </div>

        {/* Center compass rose with a single cursor-following needle. */}
        <div
          ref={needleRef}
          className="pointer-events-none absolute z-30"
          style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', willChange: 'transform' }}
          aria-hidden="true"
        >
          <svg
            width="198"
            height="198"
            viewBox="0 0 120 120"
            className="text-[#231d17]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M60 10 L65 50 L60 55 L55 50 Z" fill="currentColor" />
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <circle cx="60" cy="60" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* Existing navigation points; only their hover color and matching star cluster change. */}
        {compassPoints.map((point, index) => {
          const radians = (point.angle * Math.PI) / 180;
          const tabRadius = 38.5;
          const left = 50 + Math.cos(radians) * tabRadius;
          const top = 50 + Math.sin(radians) * tabRadius;
          const isHovered = hoveredIndex === index;
          const isSectorActive = activeSection === index;

          return (
            <div
              key={point.id}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.button
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => onNavigate(point.id)}
                onPointerEnter={() => activateTab(index)}
                onPointerLeave={deactivateTab}
                onFocus={() => activateTab(index)}
                onBlur={deactivateTab}
                className="relative flex aspect-square w-[clamp(4.3rem,8.4vmin,5.15rem)] flex-col items-center justify-center overflow-hidden rounded-full border-2 px-2 text-center transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4"
                style={{
                  backgroundColor: isHovered ? point.accent : 'rgba(255, 255, 255, 0.94)',
                  borderColor: isSectorActive ? point.accent : `rgba(${point.accentRgb}, 0.32)`,
                  color: isHovered ? '#ffffff' : point.accent,
                  boxShadow: isHovered
                    ? `0 12px 30px rgba(${point.accentRgb}, 0.28), 0 0 0 5px rgba(${point.accentRgb}, 0.12)`
                    : isSectorActive
                      ? `0 8px 22px rgba(${point.accentRgb}, 0.14)`
                      : '0 5px 14px rgba(52, 58, 48, 0.06)',
                  '--tw-ring-color': `rgba(${point.accentRgb}, 0.32)`,
                } as CSSProperties}
                whileHover={reducedMotion ? undefined : { scale: 1.1 }}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                aria-label={`${point.label}: ${point.description}`}
                title={`${point.label} — ${point.description}`}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: point.accent }}
                  animate={
                    isHovered && !reducedMotion
                      ? { scale: 1.45, opacity: 0 }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 0.55 }}
                  aria-hidden="true"
                />
                <span className="relative z-10 whitespace-pre-line text-[clamp(0.6rem,1.18vmin,0.72rem)] font-semibold leading-[1.08] tracking-[-0.01em]">
                  {point.shortLabel}
                </span>
              </motion.button>
            </div>
          );
        })}

        {/* Center text stays below the needle with no background panel. */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-[min(46%,25rem)] -translate-x-1/2 -translate-y-1/2 px-3 py-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="mb-1.5 font-serif text-[clamp(1.65rem,4.2vmin,3.15rem)] font-bold leading-none text-foreground">
            Your Compass
          </h1>
          <p className="text-[clamp(0.68rem,1.45vmin,1rem)] leading-snug text-muted-foreground">
            Explore any topic you're curious about
          </p>
        </motion.div>

      </div>

      {/* Bottom info */}
      <motion.div
        className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-xs text-muted-foreground sm:text-sm">Click any chapter to begin exploring</p>
      </motion.div>
    </div>
  );
}
