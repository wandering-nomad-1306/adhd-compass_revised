import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  HeartHandshake,
  Lightbulb,
  Pill,
  Search,
  Stethoscope,
} from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';

const topics = [
  {
    id: 'experiences',
    icon: HeartHandshake,
    title: 'Common ADHD Experiences',
    description:
      'Everyday patterns such as difficulty starting tasks, inconsistent focus, forgetfulness, emotional regulation, and task switching—plus careful explanations of why they may happen.',
    destination: '/chapter/why-feels',
  },
  {
    id: 'definition',
    icon: Search,
    title: 'What is ADHD?',
    description:
      'The clinical definition, the three ADHD presentations, how symptoms differ from ordinary distraction, and what is required for a diagnosis.',
    destination: '/chapter/what-is',
  },
  {
    id: 'brain',
    icon: Brain,
    title: 'Meet Your Brain',
    description:
      'Brain regions, connected systems, executive functions, dopamine, norepinephrine, and the limits of what neuroscience can tell us about one person.',
    destination: '/chapter/brain',
  },
  {
    id: 'support',
    icon: Lightbulb,
    title: 'What Actually Helps?',
    description:
      'Practical support, behavioral treatment, environmental changes, routines, skills, and ways to reduce the everyday impact of ADHD.',
    destination: '/chapter/what-helps',
  },
  {
    id: 'medication',
    icon: Pill,
    title: 'Medication',
    description:
      'Stimulants, nonstimulants, alpha-2 agonists, effectiveness, limitations, formulations, side effects, monitoring, and combination treatment.',
    destination: '/chapter/medication',
  },
] as const;

export default function Welcome() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="Welcome"
      subtitle="Evidence-based information about ADHD"
      chapterNumber={1}
      totalChapters={10}
      onNext={() => setLocation('/chapter/why-feels')}
    >
      <motion.div
        className="space-y-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section>
          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            About ADHD Compass
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD Compass brings together clear, detailed information about ADHD in one place. Each page is written to make sense on its own, so you can open the topic you want to understand without needing to follow a fixed order.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Topics</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Select any topic below to read its full explanation.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {topics.map(({ id, icon: Icon, title, description, destination }, index) => (
              <motion.button
                key={id}
                type="button"
                onClick={() => setLocation(destination)}
                className="group rounded-2xl border border-[#4f7659]/20 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#4f7659]/45 hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4f7659]/10 text-[#4f7659]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3>
                      <ArrowRight className="h-5 w-5 shrink-0 text-[#4f7659] transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-[#4f7659]/15 bg-white p-6">
            <Stethoscope className="mt-1 h-6 w-6 shrink-0 text-[#4f7659]" />
            <p className="leading-relaxed text-muted-foreground">
              Separate pages on getting diagnosed and accommodations will be added independently.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#4f7659]/20 bg-[#4f7659]/[0.06] p-7 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">Medical disclaimer</h2>
          <p className="mt-4 leading-relaxed text-foreground">
            ADHD Compass is an educational resource. It cannot diagnose ADHD or determine which treatment is appropriate for an individual. Diagnosis, medication decisions, and personal medical advice require an assessment by a qualified health professional.
          </p>
        </section>
      </motion.div>
    </ChapterLayout>
  );
}
