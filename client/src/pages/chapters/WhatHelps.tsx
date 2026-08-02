import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, Compass, FlaskConical, MoonStar, RotateCcw, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';
import TreatmentEcosystem from '@/components/TreatmentEcosystem';

const goals = [
  {
    id: 'start',
    label: 'Starting and finishing tasks',
    color: '#477f72',
    firstMoves: [
      'Make the next action visible and specific: “open the document” rather than “finish project.”',
      'Reduce start-up friction by preparing materials and removing one distraction before you begin.',
      'Use short work intervals, visible time, or another person nearby for external momentum.',
    ],
    longerPlan: 'Review whether medication, ADHD-focused skills work, coaching, or environmental changes could make these strategies easier to use consistently.',
  },
  {
    id: 'overwhelm',
    label: 'Emotional overwhelm',
    color: '#925e76',
    firstMoves: [
      'Pause the interaction before solving it; lowering arousal comes before reasoning.',
      'Name the emotion and the trigger in plain language, then choose one small regulating action.',
      'Use movement, sensory reduction, breathing, or a brief change of environment to create space.',
    ],
    longerPlan: 'ADHD-adapted CBT or other therapy can work on emotional regulation, self-criticism, communication, and coexisting anxiety or depression.',
  },
  {
    id: 'home',
    label: 'Conflict and routines at home',
    color: '#9a7648',
    firstMoves: [
      'Use brief, specific directions and ask for one action at a time.',
      'Make routines visible and predictable rather than repeating verbal reminders.',
      'Notice and reinforce the behavior you want to see more often, quickly and consistently.',
    ],
    longerPlan: 'For children, evidence-based parent training in behavior management can help families build practical systems without blaming the child or parent.',
  },
  {
    id: 'school-work',
    label: 'School or work demands',
    color: '#4e72a2',
    firstMoves: [
      'Ask for instructions and priorities in writing.',
      'Break long deadlines into visible checkpoints with earlier feedback.',
      'Protect focused work time and reduce unnecessary switching or interruptions.',
    ],
    longerPlan: 'Formal school or workplace accommodations may help when symptoms substantially limit functioning. That process will be covered in the separate Accommodations page.',
  },
  {
    id: 'sleep',
    label: 'Sleep and daily rhythm',
    color: '#6b9ba8',
    firstMoves: [
      'Anchor the day with a consistent wake time before trying to perfect bedtime.',
      'Create an external wind-down sequence instead of relying on feeling sleepy at the right moment.',
      'Track caffeine, screen use, naps, medication timing, and racing thoughts to identify patterns.',
    ],
    longerPlan: 'Persistent sleep problems deserve clinical review because sleep disorders and medication effects can mimic or worsen ADHD symptoms.',
  },
] as const;

function GoalMatcher() {
  const [selectedId, setSelectedId] = useState<(typeof goals)[number]['id']>('start');
  const [completed, setCompleted] = useState<number[]>([]);
  const selected = goals.find((goal) => goal.id === selectedId)!;

  const switchGoal = (id: (typeof goals)[number]['id']) => {
    setSelectedId(id);
    setCompleted([]);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
      <div className="flex gap-2 overflow-x-auto border-b border-sage-green/10 p-4" role="tablist" aria-label="Choose a treatment goal">
        {goals.map((goal) => (
          <button
            key={goal.id}
            type="button"
            role="tab"
            aria-selected={selectedId === goal.id}
            onClick={() => switchGoal(goal.id)}
            className="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all"
            style={{
              color: selectedId === goal.id ? 'white' : goal.color,
              backgroundColor: selectedId === goal.id ? goal.color : 'white',
              borderColor: `${goal.color}70`,
            }}
          >
            {goal.label}
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
          className="grid gap-8 p-6 md:grid-cols-[1fr_.9fr] md:p-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: selected.color }}>
              Try one, not all three
            </p>
            <h3 className="mt-3 font-serif text-3xl font-bold text-foreground">{selected.label}</h3>
            <div className="mt-6 space-y-3">
              {selected.firstMoves.map((move, index) => {
                const done = completed.includes(index);
                return (
                  <button
                    key={move}
                    type="button"
                    onClick={() => setCompleted((items) => (done ? items.filter((item) => item !== index) : [...items, index]))}
                    className={`flex w-full gap-3 rounded-xl border p-4 text-left transition-all ${
                      done ? 'border-sage-green/30 bg-sage-green/[0.07]' : 'border-sage-green/15 hover:border-sage-green/35'
                    }`}
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: selected.color, backgroundColor: done ? selected.color : 'transparent' }}
                    >
                      {done && <Check className="h-4 w-4 text-white" />}
                    </span>
                    <span className={`text-sm leading-relaxed text-foreground ${done ? 'line-through opacity-65' : ''}`}>{move}</span>
                  </button>
                );
              })}
            </div>
            {completed.length > 0 && (
              <button type="button" onClick={() => setCompleted([])} className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
                <RotateCcw className="h-4 w-4" /> Reset this list
              </button>
            )}
          </div>
          <div className="flex items-center">
            <div className="rounded-2xl bg-warm-cream p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Build the longer plan</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground">{selected.longerPlan}</p>
              <p className="mt-5 border-t border-sage-green/10 pt-4 text-sm leading-relaxed text-muted-foreground">
                A strategy that fails is information—not proof that you did not try hard enough. Adjust the task, environment, support, or treatment rather than repeating the same setup indefinitely.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WhatHelps() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="What Helps"
      subtitle="Build a plan that supports the whole person"
      chapterNumber={6}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/what-is')}
      onNext={() => setLocation('/chapter/medication')}
    >
      <motion.div className="space-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">Treatment and support</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl">What actually helps?</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            The strongest plans are usually combinations: reduce core symptoms, teach useful skills, and redesign the environment so everyday life asks less from the areas that are hardest.
          </p>
        </section>

        <motion.section
          className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm md:p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <Compass className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Start with the problem, not a favorite solution</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                “Treat ADHD” is too broad to guide a plan. A better target is concrete: fewer missed assignments, safer driving, calmer mornings, more reliable medication coverage, less conflict, or enough focus to complete a work block.
              </p>
            </div>
          </div>
        </motion.section>

        <section>
          <div className="mb-9 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Interactive map</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">A treatment plan is an ecosystem</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select each part of the diagram. The goal is not to use everything—it is to combine the pieces that match the person's age, goals, impairment, preferences, health, and environment.
            </p>
          </div>
          <TreatmentEcosystem />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Match support to the moment</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Choose the problem you want to make easier</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tap a goal, then check one action you could test. These are examples for planning—not substitutes for individualized clinical care.
            </p>
          </div>
          <GoalMatcher />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Evidence-based building blocks</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">What each type of support contributes</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: 'Medication',
                text: 'Stimulant and nonstimulant medicines can reduce core symptoms. Finding a useful option usually involves careful selection, titration, monitoring, and follow-up rather than expecting the first dose to solve everything.',
              },
              {
                icon: Users,
                title: 'Behavioral and psychological treatment',
                text: 'For children, parent training and classroom behavioral support have strong roles. For adolescents and adults, structured ADHD-focused therapy or CBT can address planning, self-control, emotions, habits, and coexisting problems.',
              },
              {
                icon: ChevronRight,
                title: 'Skills and environmental design',
                text: 'Written instructions, visible reminders, fewer steps, predictable routines, protected focus time, immediate feedback, and realistic checkpoints move control from memory into the environment.',
              },
              {
                icon: MoonStar,
                title: 'Physical foundations',
                text: 'Sleep, regular movement, balanced nutrition, and treatment of other health conditions can influence attention and emotional regulation. They support care but should not be framed as a cure or moral obligation.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <motion.article
                key={title}
                className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Icon className="h-6 w-6 text-sage-green" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7 md:p-8">
          <div className="flex items-start gap-4">
            <FlaskConical className="mt-1 h-6 w-6 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Be careful with confident “cures”</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                Evidence does not support eliminating artificial colors or using fatty-acid supplements as a general treatment for every child with ADHD. Restrictive diets should not be improvised; a clear food-related pattern deserves a diary and qualified clinical or dietetic guidance. Cognitive training and neurofeedback continue to be studied, but established treatments should not be delayed for them.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Promises that one supplement treats every form of ADHD',
                  'Plans that require stopping prescribed treatment without the prescriber',
                  'Expensive systems with no measurable target or review point',
                  'Advice that treats difficulty as lack of discipline or motivation',
                ].map((warning) => (
                  <div key={warning} className="rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-foreground">
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">A simple way to test whether something helps</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-4">
            {[
              ['1', 'Name one target', 'Choose a behavior or outcome you can notice.'],
              ['2', 'Change one variable', 'Keep the experiment small enough to understand.'],
              ['3', 'Track briefly', 'Use a simple note, timer, rating, or weekly check-in.'],
              ['4', 'Keep, adjust, or stop', 'Useful treatment is reviewed—not followed forever by habit.'],
            ].map(([number, title, text]) => (
              <div key={number}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-green font-bold text-white">{number}</span>
                <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'Treatment of ADHD',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/treatment/index.html',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'ADHD: Diagnosis and Management (NG87)',
              organization: 'National Institute for Health and Care Excellence',
              url: 'https://www.nice.org.uk/guidance/ng87/chapter/recommendations',
              note: 'Guidance on shared treatment planning, psychological treatment, medication, monitoring, exercise, and dietary claims.',
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
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'MedlinePlus, U.S. National Library of Medicine',
              url: 'https://medlineplus.gov/attentiondeficithyperactivitydisorder.html',
            },
          ]}
        />
      </motion.div>
    </ChapterLayout>
  );
}
