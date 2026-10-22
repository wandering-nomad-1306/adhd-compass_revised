import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { ReactNode } from 'react';
import ChapterNavigator from '@/components/ChapterNavigator';
import PageDock from '@/components/PageDock';
import SiteFooter from '@/components/SiteFooter';

interface ChapterLayoutWideProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  chapterNumber?: number;
  totalChapters?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  heroImage?: string;
  estimatedReadingTime?: string;
  maxWidthClass?: string;
  bgClass?: string;
  accentColor?: string;
  badgeText?: string;
  hideHero?: boolean;
}

export default function ChapterLayoutWide({
  title,
  subtitle,
  children,
  chapterNumber,
  totalChapters,
  onPrevious,
  onNext,
  heroImage = '/images/hero-background.png',
  estimatedReadingTime,
  maxWidthClass = 'max-w-[76rem]',
  bgClass = 'bg-[#FAF8F5]',
  accentColor = '#34533d',
  badgeText,
  hideHero = false,
}: ChapterLayoutWideProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const reducedMotion = useReducedMotion();

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-500`}>
      {/* Subtle top reading progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-sage-green origin-left z-[80] pointer-events-none"
        style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
        aria-hidden="true"
      />
      <PageDock />
      <ChapterNavigator />

      {/* Full-Bleed Atmospheric Header (Touches Both Screen Ends, Opacity 34%, No Boxed Card) */}
      {!hideHero && (
        <section className="relative w-full overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-20 text-center select-none">
          {/* Edge-to-edge landscape background (34% opacity with bottom gradient fade-out) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 select-none opacity-[0.34]"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 38%',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Smooth radial & ambient glow blend */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-radial-gradient from-transparent via-white/10 to-transparent" />

          {/* Minimalist Compass Rose / Sacred Geometry Watermark (Centered, 6% Opacity) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.06] select-none"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 500 500"
              className="h-[320px] w-[320px] sm:h-[540px] sm:w-[540px] text-sage-green"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="250" cy="250" r="230" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="250" cy="250" r="170" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="110" strokeWidth="1" strokeDasharray="3 5" />
              <path d="M250 20 L250 480 M20 250 L480 250" strokeWidth="1" />
              <polygon points="250,50 260,230 250,250 240,230" fill="currentColor" opacity="0.7" />
              <polygon points="250,450 260,270 250,250 240,270" fill="currentColor" opacity="0.3" />
              <polygon points="450,250 270,260 250,250 270,240" fill="currentColor" opacity="0.4" />
              <polygon points="50,250 230,260 250,250 230,240" fill="currentColor" opacity="0.4" />
            </svg>
          </div>

          {/* Foreground Title & Eyebrow (Large, Open, Confident) */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex items-center justify-center gap-2 mb-3.5">
              <span
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em]"
                style={{ color: accentColor }}
              >
                {badgeText || (chapterNumber && totalChapters ? `Chapter ${chapterNumber} of ${totalChapters}` : 'ADHD Compass')}
              </span>
              {estimatedReadingTime && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-green/25 bg-white/85 px-3 py-0.5 text-xs font-semibold text-sage-green shadow-xs backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5" /> {estimatedReadingTime}
                </span>
              )}
            </div>

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1F2220] tracking-tight leading-[1.15] break-words"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl text-stone-700 leading-relaxed font-normal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* Main content with wide container */}
      <motion.main
        className={`chapter-content ${maxWidthClass} mx-auto px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {children}
      </motion.main>

      {/* Navigation footer */}
      <motion.footer
        className="border-t border-stone-200/60 bg-white/60 backdrop-blur-md py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={`mx-auto grid ${maxWidthClass} grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between`}>
          <button
            onClick={onPrevious}
            disabled={!onPrevious}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#4f7659]/25 bg-white px-3 py-2.5 font-sans text-sm font-semibold text-[#4f7659] sm:gap-2 sm:px-4 sm:text-base shadow-sm transition-colors duration-300 hover:bg-[#4f7659]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="col-span-2 row-start-1 text-center text-xs text-muted-foreground sm:order-none sm:col-auto sm:row-auto sm:text-sm">
            {chapterNumber && totalChapters && (
              <span>
                Chapter {chapterNumber} of {totalChapters}
              </span>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={!onNext}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#4f7659]/25 bg-white px-3 py-2.5 font-sans text-sm font-semibold text-[#4f7659] sm:gap-2 sm:px-4 sm:text-base shadow-sm transition-colors duration-300 hover:bg-[#4f7659]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.footer>
      <SiteFooter />
    </div>
  );
}
