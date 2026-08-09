import { AnimatePresence, motion } from 'framer-motion';
import { Brain, CheckCircle2, CircleHelp, Dna, Scale, Sparkles, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ADHDPresentationExplorer from '@/components/ADHDPresentationExplorer';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';

const myths = [
  {
    statement: '“Everyone has a little ADHD.”',
    verdict: 'Not quite',
    explanation:
      'Everyone can be distracted or impulsive sometimes. ADHD is a persistent developmental pattern that is more frequent or severe than expected, appears across important settings, and meaningfully interferes with daily functioning.',
  },
  {
    statement: '“ADHD is caused by laziness or bad parenting.”',
    verdict: 'False',
    explanation:
      'ADHD is a neurodevelopmental disorder. Parenting style does not create ADHD, although the environment can make symptoms easier or harder to manage. Clear support and structure can help without blaming the person or family.',
  },
  {
    statement: '“You cannot have ADHD if you can focus for hours.”',
    verdict: 'False',
    explanation:
      'ADHD is not an inability to focus at all. Attention may be difficult to regulate, especially when a task is repetitive, delayed, or low in immediate reward. Strong interest, novelty, urgency, or structure can temporarily change performance.',
  },
  {
    statement: '“People grow out of ADHD.”',
    verdict: 'Sometimes symptoms change—not always disappear',
    explanation:
      'Hyperactivity may become less visible with age, while difficulties with attention, organization, restlessness, or impulsivity can continue into adulthood. Demands and supports also change how noticeable symptoms are.',
  },
] as const;

const coexisting = [
  'Anxiety or depression',
  'Learning or language disorders',
  'Autism spectrum disorder',
  'Sleep problems',
  'Oppositional or conduct problems',
  'Tic disorders or substance-use concerns',
];

function MythExplorer() {
  const [selected, setSelected] = useState(0);
  const item = myths[selected];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-3" role="tablist" aria-label="Common ADHD myths">
        {myths.map((myth, index) => {
          const active = index === selected;
          return (
            <button
              key={myth.statement}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(index)}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                active
                  ? 'border-sage-green bg-sage-green/[0.08] shadow-sm'
                  : 'border-sage-green/15 bg-white hover:border-sage-green/35'
              }`}
            >
              <span className="flex items-center gap-3">
                <CircleHelp className={`h-5 w-5 shrink-0 ${active ? 'text-sage-green' : 'text-muted-foreground'}`} />
                <span className="font-semibold text-foreground">{myth.statement}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.statement}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="flex min-h-64 flex-col justify-center rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-sage-green">
            <CheckCircle2 className="h-5 w-5" /> Evidence-based answer
          </div>
          <h3 className="mt-5 font-serif text-2xl font-bold text-foreground">{item.verdict}</h3>
          <p className="mt-4 text-lg leading-relaxed text-foreground">{item.explanation}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WhatIsADHD() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="What is ADHD?"
      subtitle="A clear definition without reducing a person to a checklist"
      chapterNumber={3}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/why-feels')}
      onNext={() => setLocation('/chapter/brain')}
    >
      <motion.div className="space-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">The foundation</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl">What is ADHD?</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD is a neurodevelopmental disorder marked by persistent patterns of inattention and/or hyperactivity-impulsivity that begin in childhood and interfere with everyday functioning.
          </p>
        </section>

        <motion.section
          className="grid gap-5 md:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Brain,
              title: 'Developmental',
              text: 'It relates to how attention, inhibition, activity, and self-management develop—not to intelligence or moral character.',
            },
            {
              icon: Scale,
              title: 'Persistent and impairing',
              text: 'The pattern lasts over time and creates real difficulty in more than one important part of life, not just an occasional bad day.',
            },
            {
              icon: Sparkles,
              title: 'Different for each person',
              text: 'Symptoms, strengths, environments, coexisting conditions, and support needs can look very different from one person to another.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-foreground">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </motion.section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Explore the pattern</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Three types of ADHD</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The presentation describes which symptom group is strongest at the time. It can change as a person grows or as life demands change.
            </p>
          </div>
          <ADHDPresentationExplorer />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">The clinical threshold</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">What separates ADHD from ordinary distraction?</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
            {[
              ['Pattern', 'Symptoms form an ongoing pattern rather than appearing only during a short period of stress or sleep loss.'],
              ['History', 'Several symptoms were present before age 12, even when the diagnosis happens much later.'],
              ['Settings', 'The pattern shows up in at least two important settings, such as home, school, work, or relationships.'],
              ['Impact', 'Symptoms interfere with or reduce the quality of social, academic, or occupational functioning.'],
              ['Context', 'A careful evaluation considers sleep, anxiety, depression, learning differences, medical conditions, substances, and other explanations.'],
            ].map(([label, text], index) => (
              <div key={label} className="grid gap-2 border-b border-sage-green/10 p-5 last:border-b-0 md:grid-cols-[130px_1fr] md:p-6">
                <span className="flex items-center gap-2 font-bold text-sage-green">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-green/10 text-xs">{index + 1}</span>
                  {label}
                </span>
                <p className="leading-relaxed text-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is only the high-level framework. The separate Getting Diagnosed chapter will cover who evaluates ADHD, what the process includes, and how to prepare.
          </p>
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Test a belief</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Common myths, unpacked</h2>
          </div>
          <MythExplorer />
        </section>

        <section className="grid gap-7 lg:grid-cols-2">
          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                <Dna className="h-5 w-5" />
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground">What causes ADHD?</h2>
            </div>
            <p className="mt-5 leading-relaxed text-foreground">
              There is no single cause. Genetics play an important role, and research also examines brain development and factors associated with pregnancy, birth, environmental exposures, and injury. A risk factor is not proof that any one event caused a person's ADHD.
            </p>
            <div className="mt-5 rounded-xl bg-warm-cream p-5">
              <p className="font-bold text-foreground">What is not supported as a cause</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                ADHD is not created by laziness, poor discipline, lack of intelligence, ordinary screen use, or eating sugar. Those factors can affect behavior or daily functioning without being the underlying cause of ADHD.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-foreground">ADHD often overlaps with other needs</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              Coexisting conditions can change what symptoms look like and what support works best. They should not be assumed, but they are important to assess rather than treating every difficulty as “just ADHD.”
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {coexisting.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-warm-cream p-3 text-sm font-medium text-foreground">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-muted-teal" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <motion.section
          className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <XCircle className="mt-1 h-6 w-6 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">A diagnosis is not a complete description of a person</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                ADHD names a pattern of impairment that can guide care. It does not tell you someone's values, creativity, intelligence, personality, effort, or future. A useful understanding includes both the barriers that need support and the strengths the person brings.
              </p>
            </div>
          </div>
        </motion.section>

        <SourceList
          sources={[
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'ADHD in Children',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/about/index.html',
            },
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'MedlinePlus, U.S. National Library of Medicine',
              url: 'https://medlineplus.gov/attentiondeficithyperactivitydisorder.html',
            },
            {
              title: 'What is ADHD?',
              organization: 'American Psychiatric Association',
              url: 'https://www.psychiatry.org/patients-families/adhd/what-is-adhd',
            },
            {
              title: 'ADHD Resource Center',
              organization: 'American Academy of Child and Adolescent Psychiatry',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
            },
            {
              title: 'ADHD: The Facts',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/adhd-facts/',
            },
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'StatPearls, NCBI Bookshelf',
              url: 'https://www.ncbi.nlm.nih.gov/books/NBK493361/',
            },
            {
              title: 'Understanding ADHD: What You Need to Know',
              organization: 'NIH MedlinePlus Magazine',
              url: 'https://magazine.medlineplus.gov/article/understanding-adhd-what-you-need-to-know/',
            },
          ]}
        />
      </motion.div>
    </ChapterLayout>
  );
}
