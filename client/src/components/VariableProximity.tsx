import {
  CSSProperties,
  HTMLAttributes,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useReducedMotion } from 'framer-motion';

type Falloff = 'linear' | 'exponential' | 'gaussian';

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  className?: string;
  style?: CSSProperties;
}

interface LetterCoord {
  centerX: number;
  centerY: number;
}

function parseSettings(settings: string) {
  return new Map(
    settings
      .split(',')
      .map((item) => item.trim())
      .map((item) => {
        const [axis, rawValue] = item.split(/\s+/);
        return [axis.replace(/["']/g, ''), Number.parseFloat(rawValue)];
      }),
  );
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 80,
      falloff = 'gaussian',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const reducedMotion = useReducedMotion();
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const letterCoordsRef = useRef<LetterCoord[]>([]);
    const frameRef = useRef<number | null>(null);
    const pointerClientRef = useRef<{ x: number; y: number }>({ x: -10_000, y: -10_000 });

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const isTouch =
          window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(hover: hover)').matches;
        setIsTouchDevice(isTouch);
      }
    }, []);

    const axes = useMemo(() => {
      const from = parseSettings(fromFontVariationSettings);
      const to = parseSettings(toFontVariationSettings);

      return Array.from(from.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: to.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateFalloff = useCallback(
      (distance: number) => {
        const normalized = Math.min(Math.max(1 - distance / radius, 0), 1);
        if (falloff === 'exponential') return normalized ** 2;
        if (falloff === 'gaussian') return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        return normalized;
      },
      [falloff, radius],
    );

    const measurePositions = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      // Read-only phase: batch measure all letters without writing styles
      letterCoordsRef.current = letterRefs.current.map((letter) => {
        if (!letter) return { centerX: 0, centerY: 0 };
        const rect = letter.getBoundingClientRect();
        return {
          centerX: rect.left + rect.width / 2 - containerRect.left,
          centerY: rect.top + rect.height / 2 - containerRect.top,
        };
      });
    }, [containerRef]);

    const paint = useCallback(() => {
      frameRef.current = null;
      const container = containerRef.current;
      if (!container || reducedMotion || isTouchDevice) return;

      // Single read for container position per frame
      const containerRect = container.getBoundingClientRect();
      const pointerX = pointerClientRef.current.x - containerRect.left;
      const pointerY = pointerClientRef.current.y - containerRect.top;

      if (letterCoordsRef.current.length === 0) {
        measurePositions();
      }

      const coords = letterCoordsRef.current;

      // Pure write phase with no interleaved DOM measurements
      letterRefs.current.forEach((letter, i) => {
        if (!letter) return;
        const pos = coords[i];
        if (!pos) return;

        const distance = Math.hypot(pointerX - pos.centerX, pointerY - pos.centerY);

        if (distance >= radius) {
          if (letter.style.fontVariationSettings !== fromFontVariationSettings) {
            letter.style.fontVariationSettings = fromFontVariationSettings;
          }
          return;
        }

        const influence = calculateFalloff(distance);
        const targetSettings = axes
          .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * influence}`)
          .join(', ');

        if (letter.style.fontVariationSettings !== targetSettings) {
          letter.style.fontVariationSettings = targetSettings;
        }
      });
    }, [
      axes,
      calculateFalloff,
      containerRef,
      fromFontVariationSettings,
      isTouchDevice,
      measurePositions,
      radius,
      reducedMotion,
    ]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || reducedMotion || isTouchDevice) return;

      // Initial measurement after layout
      const measureTimer = window.setTimeout(measurePositions, 60);

      const handleMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        pointerClientRef.current = { x: event.clientX, y: event.clientY };
        if (frameRef.current === null) {
          frameRef.current = window.requestAnimationFrame(paint);
        }
      };

      const handleLeave = () => {
        pointerClientRef.current = { x: -10_000, y: -10_000 };
        letterRefs.current.forEach((letter) => {
          if (letter && letter.style.fontVariationSettings !== fromFontVariationSettings) {
            letter.style.fontVariationSettings = fromFontVariationSettings;
          }
        });
      };

      container.addEventListener('pointermove', handleMove, { passive: true });
      container.addEventListener('pointerleave', handleLeave, { passive: true });
      window.addEventListener('resize', measurePositions, { passive: true });

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => measurePositions());
        resizeObserver.observe(container);
      }

      return () => {
        window.clearTimeout(measureTimer);
        container.removeEventListener('pointermove', handleMove);
        container.removeEventListener('pointerleave', handleLeave);
        window.removeEventListener('resize', measurePositions);
        if (resizeObserver) resizeObserver.disconnect();
        if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      };
    }, [containerRef, fromFontVariationSettings, isTouchDevice, measurePositions, paint, reducedMotion]);

    if (reducedMotion || isTouchDevice) {
      return (
        <span ref={ref} className={className} style={style} {...rest}>
          {label}
        </span>
      );
    }

    let letterIndex = 0;
    const words = label.split(' ');

    return (
      <span
        ref={ref}
        className={className}
        style={{ fontFamily: '"Roboto Flex", "Inter", sans-serif', ...style }}
        aria-label={label}
        {...rest}
      >
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((letter) => {
              const index = letterIndex++;
              return (
                <span
                  key={`${letter}-${index}`}
                  ref={(element) => {
                    letterRefs.current[index] = element;
                  }}
                  className="inline-block"
                  style={{ fontVariationSettings: fromFontVariationSettings }}
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  },
);

VariableProximity.displayName = 'VariableProximity';

export default VariableProximity;
