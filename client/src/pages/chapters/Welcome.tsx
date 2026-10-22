import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  Pill,
  Search,
  Stethoscope,
} from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';

interface ChapterTopic {
  id: string;
  icon: typeof HeartHandshake;
  title: string;
  lead: string;
  highlight: string;
  rest: string;
  destination: string;
}

const topics: ChapterTopic[] = [
  {
    id: 'experiences',
    icon: HeartHandshake,
    title: 'Common ADHD Experiences',
    lead: 'Everyday patterns such as ',
    highlight: 'task initiation blocks, fluctuating focus',
    rest: ', forgetfulness, emotional reactivity, and task switching—with empathetic brain-based explanations.',
    destination: '/chapter/why-feels',
  },
  {
    id: 'definition',
    icon: Search,
    title: 'What is ADHD?',
    lead: 'The clinical definition, the ',
    highlight: 'three DSM-5 presentations',
    rest: ', how ADHD differs from ordinary distraction, and the rigorous criteria required for a formal diagnosis.',
    destination: '/chapter/what-is',
  },
  {
    id: 'brain',
    icon: Brain,
    title: 'Meet Your Brain',
    lead: 'Brain regions, executive control circuits, the ',
    highlight: 'dopamine & noradrenaline radio tuner model',
    rest: ', and what modern neuroimaging can (and cannot) tell us about your mind.',
    destination: '/chapter/brain',
  },
  {
    id: 'support',
    icon: Lightbulb,
    title: 'What Actually Helps?',
    lead: 'Actionable support, ',
    highlight: 'point-of-performance tools, environmental design',
    rest: ', ADHD-adapted behavioral strategies, and sustainable daily routines.',
    destination: '/chapter/what-helps',
  },
  {
    id: 'medication',
    icon: Pill,
    title: 'Medication Guide',
    lead: 'Stimulants, nonstimulants, and alpha-2 agonists: ',
    highlight: 'cellular mechanisms, realistic benefits, side effect management',
    rest: ', and mandatory safety protocols.',
    destination: '/chapter/medication',
  },
  {
    id: 'diagnosis',
    icon: ClipboardCheck,
    title: 'Getting Diagnosed',
    lead: 'What to expect during a clinical evaluation: ',
    highlight: 'evidence standards, diagnostic steps',
    rest: ', specialist qualifications, and practical self-screening tools.',
    destination: '/chapter/getting-diagnosed',
  },
];

export default function Welcome() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title="Welcome to ADHD Compass"
      subtitle="Clear, evidence-based guidance to help you understand your brain and navigate daily life."
      chapterNumber={1}
      totalChapters={10}
      badgeText="Chapter 1 · Welcome"
      estimatedReadingTime="3 min read"
      bgClass="bg-[#F6F8F5]"
      accentColor="#35543c"
      maxWidthClass="max-w-[76rem]"
      onNext={() => setLocation('/chapter/why-feels')}
    >
      <motion.div
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Explore Chapters</h2>
              <p className="mt-2 max-w-2xl text-base sm:text-lg text-stone-600">
                Select any chapter below to explore its research-backed guide. Each section is self-contained so you can start wherever you need insight most.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ id, icon: Icon, title, lead, highlight, rest, destination }, index) => (
              <motion.button
                key={id}
                type="button"
                onClick={() => setLocation(destination)}
                className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7 text-left shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#35543c]/40 hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4f7659]/10 text-[#35543c] group-hover:bg-[#35543c] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#35543c]/60 transition-transform group-hover:translate-x-1 group-hover:text-[#35543c]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-snug">{title}</h3>
                  <p className="mt-3 text-[15px] sm:text-base leading-[1.7] text-stone-700">
                    {lead}
                    <strong className="text-foreground font-semibold">{highlight}</strong>
                    {rest}
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#35543c]">
                  <span>Open Chapter</span>
                  <span className="text-stone-400 group-hover:text-[#35543c] transition-colors">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#4f7659]/20 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xs">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4f7659]/10 text-[#35543c]">
              <Stethoscope className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground">Medical Disclaimer & Clinical Scope</h3>
              <p className="mt-2 text-[15px] sm:text-base leading-[1.75] text-stone-700">
                ADHD Compass is an <strong>educational and self-advocacy guide</strong>, not a medical or psychiatric provider. It does not provide medical diagnoses or prescribe pharmacological treatments. All diagnosis, medication titration, and individualized clinical care require comprehensive assessment by a <strong>licensed healthcare professional</strong>.
              </p>
            </div>
          </div>
        </section>
      </motion.div>
    </ChapterLayoutWide>
  );
}
