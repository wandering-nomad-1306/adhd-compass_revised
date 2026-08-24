import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import ChapterNavigator from '@/components/ChapterNavigator';
import PageDock from '@/components/PageDock';
import SiteFooter from '@/components/SiteFooter';

interface ChapterLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  chapterNumber?: number;
  totalChapters?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  heroImage?: string;
}

export default function ChapterLayout({
  title,
  subtitle,
  children,
  chapterNumber,
  totalChapters,
  onPrevious,
  onNext,
  heroImage,
}: ChapterLayoutProps) {
  return (
    <div className="min-h-screen bg-warm-cream">
      <PageDock />
      <ChapterNavigator />
      {/* Hero section with optional background image */}
      {heroImage && (
        <motion.div
          className="relative h-96 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-warm-cream" />
          </div>

          {/* Chapter header overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {chapterNumber && totalChapters && (
              <motion.p
                className="text-sm font-semibold text-white/80 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                Chapter {chapterNumber} of {totalChapters}
              </motion.p>
            )}
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className="text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.main
        className="chapter-content max-w-4xl mx-auto px-4 py-12 sm:px-6 sm:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {children}
      </motion.main>

      {/* Navigation footer */}
      <motion.footer
        className="border-t border-sage-green/10 bg-white py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
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
