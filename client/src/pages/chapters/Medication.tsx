import { AnimatePresence, motion } from 'framer-motion';
import { Activity, AlertTriangle, ArrowRight, ClipboardCheck, HeartPulse, Pill, ShieldAlert, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import MedicationExplorer from '@/components/MedicationExplorer';
import SourceList from '@/components/SourceList';

const classes = [
  {
    id: 'stimulant',
    label: 'Stimulants',
    color: '#4e72a2',
    overview:
      'Methylphenidate and amphetamine medicines are the most commonly used ADHD medications and usually begin working the day they are taken when the dose and formulation are effective.',
    goodToKnow: [
      'Available in short-, intermediate-, and long-acting formulations',
      'One stimulant family may work well even when the other does not',
      'Appetite, sleep, pulse, blood pressure, mood, growth, and misuse risk are monitored',
    ],
    limitation: 'They are controlled substances and are not appropriate for every medical or psychiatric situation.',
  },
  {
    id: 'nonstimulant',
    label: 'Nonstimulants',
    color: '#925e76',
    overview:
      'Atomoxetine and viloxazine act through different pathways and build benefit gradually. They may be considered when stimulants are not tolerated, are ineffective, are not preferred, or when the clinical picture favors another option.',
    goodToKnow: [
      'Not controlled substances',
      'Usually taken consistently every day rather than only on high-demand days',
      'Can take several weeks at a useful dose before the effect is clear',
    ],
    limitation: 'They still have meaningful side effects, interactions, and monitoring requirements; “nonstimulant” does not mean risk-free.',
  },
  {
    id: 'alpha',
    label: 'Alpha-2 agonists',
    color: '#9a7648',
    overview:
      'Guanfacine ER and clonidine ER affect adrenergic signaling. They may be used alone or with a stimulant, particularly when the overall plan also considers sleep, tics, impulsivity, or behavioral dysregulation.',
    goodToKnow: [
      'Not controlled substances',
      'Sleepiness and blood-pressure effects are common considerations',
      'They must be tapered rather than stopped abruptly',
    ],
    limitation: 'Sedation, dizziness, low blood pressure, and slow heart rate can limit use or require adjustment.',
  },
] as const;

function ClassComparison() {
  const [selectedId, setSelectedId] = useState<(typeof classes)[number]['id']>('stimulant');
  const selected = classes.find((item) => item.id === selectedId)!;

  return (
    <div className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
      <div className="grid border-b border-sage-green/10 sm:grid-cols-3">
        {classes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            aria-pressed={selectedId === item.id}
            className="relative border-b border-sage-green/10 px-5 py-5 text-left font-semibold transition-colors last:border-b-0 hover:bg-warm-cream sm:border-b-0 sm:border-r sm:last:border-r-0"
            style={{ backgroundColor: selectedId === item.id ? `${item.color}12` : undefined }}
          >
            {selectedId === item.id && <motion.span layoutId="med-class" className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: item.color }} />}
            <span style={{ color: item.color }}>{item.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="grid gap-7 p-6 md:grid-cols-[1.05fr_.95fr] md:p-8"
        >
          <div>
            <h3 className="font-serif text-3xl font-bold text-foreground">{selected.label}</h3>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{selected.overview}</p>
            <div className="mt-6 rounded-xl bg-warm-cream p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Important limitation</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{selected.limitation}</p>
            </div>
          </div>
          <div className="rounded-xl border border-sage-green/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Good to know</p>
            <ul className="mt-4 space-y-4">
              {selected.goodToKnow.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Medication() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="Medication"
      subtitle="Understand the options, trade-offs, and monitoring"
      chapterNumber={8}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4e72a2]">Medication guide</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl">Medication, without the mystery</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD medication can reduce core symptoms, but the useful medicine, dose, timing, and duration are individual. The goal is measurable benefit with acceptable side effects—not simply reaching a standard number.
          </p>
        </section>

        <section className="rounded-2xl border border-[#a96952]/25 bg-[#a96952]/[0.06] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Stethoscope className="mt-1 h-7 w-7 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Read this before using the cards</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                The doses below summarize selected current U.S. product labels and are included to explain how formulations differ. They are not instructions for starting, switching, splitting, combining, or stopping medication. ADHD medication should be initiated and adjusted by a qualified prescriber after reviewing age, weight when relevant, medical and psychiatric history, current medicines, cardiovascular risk, symptom goals, and follow-up capacity.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Compare the families</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Three broad medication pathways</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a class to see what makes it different. The categories are useful for orientation, but people can respond very differently to medicines within the same class.
            </p>
          </div>
          <ClassComparison />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Interactive medication cards</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Selected common formulations</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Filter by class, then open a card for label starting doses, timing, potential advantages, trade-offs, common effects, and safety notes. This is a practical comparison—not a complete formulary.
            </p>
          </div>
          <MedicationExplorer />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">How treatment is adjusted</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Titration is a feedback loop</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                icon: ClipboardCheck,
                number: '01',
                title: 'Define targets',
                text: 'Choose specific outcomes: fewer dangerous impulses, a complete school day, easier task initiation, or less conflict.',
              },
              {
                icon: Activity,
                number: '02',
                title: 'Record a baseline',
                text: 'Note symptoms, functioning, sleep, appetite, mood, pulse, blood pressure, and growth measures when relevant.',
              },
              {
                icon: Pill,
                number: '03',
                title: 'Start and adjust',
                text: 'The prescriber changes one variable at a time, allowing enough time to judge benefit and side effects.',
              },
              {
                icon: HeartPulse,
                number: '04',
                title: 'Review the full day',
                text: 'Check onset, coverage, rebound, meals, sleep, relationships, school or work, and whether the target actually improved.',
              },
            ].map(({ icon: Icon, number, title, text }, index) => (
              <motion.article
                key={number}
                className="relative rounded-2xl border border-sage-green/15 bg-white p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-[#4e72a2]" />
                  <span className="font-serif text-2xl font-bold text-[#4e72a2]/25">{number}</span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                {index < 3 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 text-sage-green/35 md:block" />}
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-sage-green" />
              <h2 className="font-serif text-3xl font-bold text-foreground">What to track</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Target symptoms and real-life functioning',
                'When benefit starts and wears off',
                'Appetite, weight, and growth in children',
                'Sleep and daytime tiredness',
                'Mood, irritability, anxiety, or unusual behavior',
                'Pulse, blood pressure, dizziness, or fainting',
                'Headache, stomach pain, nausea, or dry mouth',
                'Missed doses, adherence, storage, misuse, or diversion risk',
              ].map((item) => (
                <div key={item} className="rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#a96952]/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-[#a96952]" />
              <h2 className="font-serif text-3xl font-bold text-foreground">When to seek help quickly</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground">
              Product-specific instructions differ. Contact the prescriber promptly for significant or persistent side effects, severe mood or behavior changes, new tics, fainting, or symptoms that suggest the medication is not covering the intended part of the day.
            </p>
            <div className="mt-5 rounded-xl bg-[#a96952]/[0.07] p-5">
              <p className="font-bold text-[#8f5541]">Urgent evaluation</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Seek urgent medical help for chest pain, severe shortness of breath, fainting with concerning symptoms, seizure, signs of a serious allergic reaction, suicidal behavior, or new hallucinations, mania, or dangerous agitation. Follow the medication label and local emergency guidance.
              </p>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-[#4e72a2]/[0.08] to-sage-green/[0.08] p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Questions worth bringing to the appointment</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              'Which two or three outcomes will tell us this medication is helping?',
              'How quickly should this formulation begin working, and how long should it cover?',
              'Which side effects are expected, which need a call, and which are urgent?',
              'What should be checked before treatment and at follow-up?',
              'What is the plan if the first medicine or stimulant family does not fit?',
              'How should missed doses, travel, refills, storage, and stopping be handled?',
            ].map((question) => (
              <div key={question} className="flex gap-3 rounded-xl bg-white/75 p-4 text-sm leading-relaxed text-foreground">
                <span className="font-bold text-[#4e72a2]">?</span>
                {question}
              </div>
            ))}
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'ADHD: Parents’ Medication Guide',
              organization: 'AACAP and American Psychiatric Association',
              url: '/resources/ADHD_Medication_Guide-web.pdf',
              note: 'The guide supplied for this project; includes stimulant tables, nonstimulant overviews, side effects, and family questions.',
            },
            {
              title: 'ADHD Resource Center',
              organization: 'American Academy of Child and Adolescent Psychiatry',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
            },
            {
              title: 'Treatment of ADHD',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/treatment/index.html',
            },
            {
              title: 'ADHD: Diagnosis and Management—Medication Recommendations',
              organization: 'National Institute for Health and Care Excellence',
              url: 'https://www.nice.org.uk/guidance/ng87/chapter/recommendations#medication',
            },
            {
              title: 'DailyMed drug labels',
              organization: 'U.S. National Library of Medicine',
              url: 'https://dailymed.nlm.nih.gov/dailymed/',
              note: 'Current U.S. prescribing information used to verify the selected dose and safety summaries.',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
          ]}
        />
      </motion.div>
    </ChapterLayout>
  );
}
