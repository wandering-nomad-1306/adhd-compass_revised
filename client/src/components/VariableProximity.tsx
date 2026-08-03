import {
  CSSProperties,
  HTMLAttributes,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const frameRef = useRef<number | null>(null);
    const pointerRef = useRef({ x: -10_000, y: -10_000 });

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

    const paint = useCallback(() => {
      frameRef.current = null;
      const container = containerRef.current;
      if (!container || reducedMotion) return;

      const containerRect = container.getBoundingClientRect();

      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const centerY = rect.top + rect.height / 2 - containerRect.top;
        const distance = Math.hypot(pointerRef.current.x - centerX, pointerRef.current.y - centerY);

        if (distance >= radius) {
          letter.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const influence = calculateFalloff(distance);
        letter.style.fontVariationSettings = axes
          .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * influence}`)
          .join(', ');
      });
    }, [axes, calculateFalloff, containerRef, fromFontVariationSettings, radius, reducedMotion]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || reducedMotion) return;

      const queuePaint = () => {
        if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(paint);
      };

      const handleMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        queuePaint();
      };

      const handleLeave = () => {
        pointerRef.current = { x: -10_000, y: -10_000 };
        letterRefs.current.forEach((letter) => {
          if (letter) letter.style.fontVariationSettings = fromFontVariationSettings;
        });
      };

      container.addEventListener('pointermove', handleMove);
      container.addEventListener('pointerleave', handleLeave);

      return () => {
        container.removeEventListener('pointermove', handleMove);
        container.removeEventListener('pointerleave', handleLeave);
        if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      };
    }, [containerRef, fromFontVariationSettings, paint, reducedMotion]);

    if (reducedMotion) {
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
