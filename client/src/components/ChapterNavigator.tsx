import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Home, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import InteractiveCompass from '@/components/InteractiveCompass';

const CHAPTER_PATHS: Record<string, string> = {
  welcome: '/chapter/welcome',
  brain: '/chapter/brain',
  'why-feels': '/chapter/why-feels',
  'what-is': '/chapter/what-is',
  'getting-diagnosed': '/chapter/getting-diagnosed',
  'what-helps': '/chapter/what-helps',
  accommodations: '/chapter/accommodations',
  medication: '/chapter/medication',
};

const MINI_POINTS = [
  { angle: 0, accent: '#4f7659' },
  { angle: 45, accent: '#5b6f96' },
  { angle: 90, accent: '#7e8249' },
  { angle: 135, accent: '#a96952' },
  { angle: 180, accent: '#9a7648' },
  { angle: 225, accent: '#925e76' },
  { angle: 270, accent: '#477f72' },
  { angle: 315, accent: '#4e72a2' },
];

/** A compact visual copy of the homepage compass used as the persistent opener. */
function MiniCompass() {
  return (
    <span className="relative block h-12 w-12" aria-hidden="true">
      <span className="absolute inset-[3px] rounded-full border border-sage-green/25 bg-[#fffdf8] shadow-[inset_0_0_12px_rgba(79,118,89,0.07)]" />
      <span className="absolute inset-[9px] rounded-full border border-muted-teal/15" />
      <span className="absolute inset-[15px] rounded-full border border-sage-green/10" />

      {MINI_POINTS.map((point) => {
        const radians = (point.angle * Math.PI) / 180;
        const radius = 20;
        const x = 24 + Math.cos(radians) * radius;
        const y = 24 + Math.sin(radians) * radius;

        return (
          <span
            key={point.angle}
            className="absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white shadow-[0_2px_5px_rgba(40,45,40,0.08)]"
            style={{ left: x, top: y, borderColor: point.accent }}
          />
        );
      })}

      <svg
        className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 -rotate-[28deg] text-[#231d17]"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path d="M60 10 L65 50 L60 55 L55 50 Z" fill="currentColor" />
        <circle cx="60" cy="60" r="7" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function ChapterNavigator() {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const openNavigator = () => setOpen(true);
    window.addEventListener('open-chapter-navigator', openNavigator);
    return () => window.removeEventListener('open-chapter-navigator', openNavigator);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const navigate = (path: string) => {
    setOpen(false);
    if (location !== path) {
      setLocation(path);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const navigateToChapter = (id: string) => {
    const path = CHAPTER_PATHS[id];
    if (path) navigate(path);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-50 flex h-16 w-16 items-center justify-center rounded-2xl border border-sage-green/20 bg-white/[0.94] text-sage-green shadow-[0_12px_34px_rgba(47,57,48,0.14)] backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(47,57,48,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20 sm:right-6 sm:top-6"
        aria-label="Open the ADHD Compass chapter navigator"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Open ADHD Compass"
      >
        <MiniCompass />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden overscroll-none bg-[#20251f]/48 p-1.5 backdrop-blur-[4px] sm:p-3"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="chapter-navigator-title"
              className="relative flex h-[min(96svh,64rem)] w-[min(98vw,64rem)] items-center justify-center overflow-hidden rounded-[2rem] border border-white/75 bg-[#fffdf8] shadow-[0_28px_90px_rgba(18,25,20,0.3)]"
              initial={reducedMotion ? undefined : { opacity: 0, scale: 0.965, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.975, y: 8 }}
              transition={{ duration: 0.22 }}
            >
              <h2 id="chapter-navigator-title" className="sr-only">
                ADHD Compass chapter navigator
              </h2>

              <div className="absolute right-3 top-3 z-[80] flex items-center gap-2 sm:right-5 sm:top-5">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sage-green/15 bg-white/92 px-3.5 text-sm font-semibold text-sage-green shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20"
                  aria-label="Go to the ADHD Compass homepage"
                  title="Home"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-sage-green/15 bg-white/92 text-foreground shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20"
                  aria-label="Close chapter navigator"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <InteractiveCompass onNavigate={navigateToChapter} />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
