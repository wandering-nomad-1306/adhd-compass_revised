import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';

interface InProgressProps {
  title: string;
  chapterNumber: number;
  previousPath?: string;
  nextPath?: string;
}

export default function InProgress({ title, chapterNumber, previousPath, nextPath }: InProgressProps) {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title={title}
      chapterNumber={chapterNumber}
      totalChapters={10}
      onPrevious={previousPath ? () => setLocation(previousPath) : undefined}
      onNext={nextPath ? () => setLocation(nextPath) : undefined}
    >
      <motion.section
        className="mx-auto flex min-h-[58svh] w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-sage-green/15 bg-white p-8 text-center shadow-sm md:p-12"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
          <Construction className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-sage-green">In progress</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          This page is still in progress.
        </p>
      </motion.section>
    </ChapterLayout>
  );
}
