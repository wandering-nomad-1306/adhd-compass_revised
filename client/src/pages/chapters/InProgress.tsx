import { motion } from 'framer-motion';
import { Clock, Construction, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';

interface InProgressProps {
  title: string;
  chapterNumber: number;
  previousPath?: string;
  nextPath?: string;
}

export default function InProgress({ title, chapterNumber, previousPath, nextPath }: InProgressProps) {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title={title}
      subtitle="This chapter guide is currently being finalized with clinical citations and evidence-based exercises."
      chapterNumber={chapterNumber}
      totalChapters={10}
      badgeText={`Chapter ${chapterNumber} · Upcoming`}
      bgClass="bg-[#FAF7F5]"
      accentColor="#6b4d3d"
      maxWidthClass="max-w-[76rem]"
      onPrevious={previousPath ? () => setLocation(previousPath) : undefined}
      onNext={nextPath ? () => setLocation(nextPath) : undefined}
    >
      <motion.section
        className="mx-auto flex min-h-[50svh] w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-[#6b4d3d]/20 bg-white/80 backdrop-blur-sm p-8 text-center shadow-sm md:p-12"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6b4d3d]/10 text-[#6b4d3d]">
          <Construction className="h-8 w-8" />
        </span>
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#6b4d3d]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6b4d3d]">
          <Clock className="h-3.5 w-3.5" /> Content In Development
        </div>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-stone-600">
          We are currently synthesizing peer-reviewed clinical guidelines, real-world workplace adaptations, and verified accommodations for this section.
        </p>
      </motion.section>
    </ChapterLayoutWide>
  );
}
