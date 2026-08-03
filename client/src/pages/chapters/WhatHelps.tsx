import { AnimatePresence, motion } from 'framer-motion';
import {
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Focus,
  ListChecks,
  MoveRight,
  Repeat2,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';
import VariableProximity from '@/components/VariableProximity';

interface ChallengeGuide {
  id: string;
  title: string;
  shortTitle: string;
  icon: typeof BellRing;
  summary: string;
  actions: string[];
  why: string;
  example: string;
  moreSupport: string;
}

const challenges: ChallengeGuide[] = [
  {
    id: 'forgetting',
    title: 'I forget tasks, appointments, or where I put things',
    shortTitle: 'Forgetting',
    icon: BellRing,
    summary:
      'Do not rely on holding an intention in your head until the right moment. Put the information somewhere that can remind you later.',
    actions: [
      'Use one main calendar and one main place for tasks instead of several competing systems.',
      'Write the task down immediately. Add the reminder for the time you need to act, not only the time the event begins.',
      'Give important objects a fixed home near the place where you use or leave them.',
      'Use visible cues for tasks that disappear from awareness, such as a note on the door or an item placed beside your keys.',
    ],
    why:
      'External reminders reduce the amount of information that must stay active in working memory. The goal is not to improve memory through effort; it is to make remembering less necessary.',
    example:
      'For a 3:00 p.m. appointment, add a 1:45 p.m. “finish current task” reminder and a 2:15 p.m. “leave now” reminder instead of one alert at 3:00 p.m.',
    moreSupport:
      'Seek help when forgetting creates safety risks, repeated serious consequences, or continues despite a system that is used consistently.',
  },
  {
    id: 'starting',
    title: 'I know what to do, but I cannot get started',
    shortTitle: 'Starting tasks',
    icon: MoveRight,
    summary:
      'Make the first action smaller and more specific. “Start the project” is vague; “open the document and write the title” tells the brain exactly what happens next.',
    actions: [
      'Define the next visible action using a verb: open, place, call, write, or send.',
      'Prepare the materials before the planned start time and remove one obvious distraction.',
      'Use a brief start period, such as five or ten minutes, rather than promising to finish the whole task.',
      'Ask another person for a clear check-in or work near someone when external structure helps you begin.',
    ],
    why:
      'Large or unclear tasks require more planning before any action can begin. A small, concrete first step reduces decisions and start-up friction.',
    example:
      'Replace “work on taxes” with “put the tax folder on the desk, open the website, and locate last year’s return.” Stop after ten minutes or continue if momentum develops.',
    moreSupport:
      'Persistent task-initiation problems may improve with ADHD-focused therapy, organizational-skills work, environmental changes, or medication review.',
  },
  {
    id: 'time',
    title: 'I lose track of time or underestimate how long things take',
    shortTitle: 'Time',
    icon: Clock3,
    summary:
      'Make time visible and build transitions into the plan. A clock tells you the current time; it does not automatically show how much time remains or when to stop.',
    actions: [
      'Use a visible timer for work periods, breaks, and transitions.',
      'Work backward from the real deadline and add an earlier personal checkpoint.',
      'Add a warning before a transition, followed by a second cue for the actual stop time.',
      'Record how long repeated tasks really take, then plan from that evidence rather than memory.',
    ],
    why:
      'External time cues make passing time and approaching deadlines easier to notice. Earlier checkpoints also reduce dependence on a single last-minute deadline.',
    example:
      'For leaving home at 8:30, set one cue at 8:05 to finish the current activity and another at 8:20 for shoes, keys, and the door.',
    moreSupport:
      'Consider professional support when time-management difficulty repeatedly affects work, education, driving, medication use, or essential responsibilities.',
  },
  {
    id: 'distraction',
    title: 'I am pulled away by noise, messages, or unrelated thoughts',
    shortTitle: 'Distraction',
    icon: Focus,
    summary:
      'Reduce the number of signals competing with the task and make the current priority easy to see.',
    actions: [
      'Clear the work surface and silence nonessential notifications for a defined period.',
      'Keep the current instruction, question, or next step visible while working.',
      'Write unrelated thoughts on a parking list instead of acting on them immediately.',
      'Choose a workspace based on what actually helps you; complete silence is not best for everyone.',
    ],
    why:
      'Every competing signal asks the brain to decide whether to switch. Reducing unnecessary choices and preserving the current goal lowers that control demand.',
    example:
      'During a 25-minute work block, keep only the required document open and write “send parcel” on a side note instead of opening a delivery app.',
    moreSupport:
      'Review sleep, anxiety, mood, pain, substance use, and medication effects when distraction changes suddenly or is severe in every setting.',
  },
  {
    id: 'overwhelmed',
    title: 'Large or multi-step tasks become overwhelming',
    shortTitle: 'Large tasks',
    icon: ListChecks,
    summary:
      'Move the plan out of your head. Break the task into short steps that can be completed, checked, and restarted after an interruption.',
    actions: [
      'Write the finished outcome in one sentence so the target is clear.',
      'Break the work into steps that can usually be completed in one sitting.',
      'Mark the current step and hide later details when seeing the whole list becomes distracting.',
      'Add review points before the final deadline so errors are found earlier.',
    ],
    why:
      'A visible sequence reduces the working-memory load of holding the plan, deciding what comes next, and remembering progress after a break.',
    example:
      'For an essay, use: choose question → collect three sources → write outline → draft one section → review citations → edit. Work only from the marked current step.',
    moreSupport:
      'Organizational-skills training, ADHD-focused CBT, school support, or workplace adjustments may help when complex tasks remain consistently inaccessible.',
  },
  {
    id: 'switching',
    title: 'I struggle to stop one activity and move to another',
    shortTitle: 'Switching tasks',
    icon: Repeat2,
    summary:
      'Treat switching as a separate task rather than expecting it to happen instantly. Create a clear ending for the first activity and an easy entry into the next one.',
    actions: [
      'Use a transition warning before the planned stop time.',
      'Write a one-line restart note before leaving the current task.',
      'Stand up, move, change rooms, or use another consistent physical transition cue.',
      'Prepare the first item needed for the next activity in advance.',
    ],
    why:
      'A transition requires disengaging from one goal, preserving where you stopped, and activating another goal. External cues support each part of that process.',
    example:
      'Before lunch, write “next: check paragraph three against source two,” close the document, and place the gym bag beside the door for the next activity.',
    moreSupport:
      'Severe difficulty switching can also occur with anxiety, autism, depression, stress, or sleep problems and deserves a broader clinical discussion.',
  },
  {
    id: 'routine',
    title: 'My routines work briefly and then fall apart',
    shortTitle: 'Routines',
    icon: CalendarClock,
    summary:
      'Build the smallest routine that solves a real problem. A system with many steps is harder to restart after disruption.',
    actions: [
      'Attach one new action to something that already happens reliably.',
      'Keep the routine visible where it is used instead of storing it in an app you rarely open.',
      'Prepare the environment so the easiest action is also the intended action.',
      'Plan a restart rule for missed days rather than treating one interruption as failure.',
    ],
    why:
      'Predictable cues reduce the number of decisions required. A simple restart rule protects the routine from all-or-nothing thinking.',
    example:
      'After brushing your teeth, place tomorrow’s medication beside the breakfast item you use every morning. If the routine is missed, restart at the next meal rather than redesigning everything.',
    moreSupport:
      'A clinician can help when routines involve medication safety, severe sleep disruption, eating difficulties, or major family conflict.',
  },
  {
    id: 'emotion',
    title: 'Strong emotions interrupt what I need to do',
    shortTitle: 'Emotions',
    icon: Sparkles,
    summary:
      'Lower the intensity before trying to solve the problem. Reasoning and planning become harder when arousal is high.',
    actions: [
      'Pause the conversation or task briefly when it is safe to do so.',
      'Name the emotion and the immediate trigger in simple language.',
      'Use a short regulating action such as movement, slower breathing, water, or a quieter environment.',
      'Return with one specific next step rather than trying to solve every part at once.',
    ],
    why:
      'A brief pause can reduce competing emotional and physiological signals, making deliberate control and communication more available.',
    example:
      'Say, “I am frustrated and need ten minutes. I will come back and decide the first change we need,” then set a timer so the pause has an end.',
    moreSupport:
      'Intense, persistent, or dangerous emotional symptoms require professional assessment because ADHD may not be the only explanation.',
  },
];

function ChallengeExplorer() {
  const [selectedId, setSelectedId] = useState(challenges[0].id);
  const selected = challenges.find((challenge) => challenge.id === selectedId) ?? challenges[0];
  const Icon = selected.icon;

  return (
    <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      <div className="grid min-w-0 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="border-b border-sage-green/10 bg-warm-cream p-3 lg:border-b-0 lg:border-r lg:p-4" role="tablist" aria-label="Common ADHD difficulties">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {challenges.map((challenge) => {
              const ChallengeIcon = challenge.icon;
              const active = challenge.id === selectedId;
              return (
                <button
                  key={challenge.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(challenge.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:w-full ${
                    active ? 'bg-[#4f7659] text-white shadow-sm' : 'bg-white text-foreground hover:bg-[#4f7659]/[0.07]'
                  }`}
                >
                  <ChallengeIcon className="h-4 w-4 shrink-0" />
                  {challenge.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="min-w-0 p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4f7659]/10 text-[#4f7659]">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl">{selected.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{selected.summary}</p>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-bold text-foreground">What to try</h3>
              <ol className="mt-4 space-y-3">
                {selected.actions.map((action, index) => (
                  <li key={action} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4f7659] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground md:text-base">{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl bg-warm-cream p-5">
                <h3 className="font-bold text-foreground">Why this may help</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selected.why}</p>
              </article>
              <article className="rounded-2xl bg-[#5b6f96]/[0.07] p-5">
                <h3 className="font-bold text-foreground">Example</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selected.example}</p>
              </article>
            </div>

            <div className="mt-5 flex gap-3 rounded-2xl border border-[#a96952]/20 bg-[#a96952]/[0.05] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
              <div>
                <p className="font-bold text-foreground">When more support may be useful</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.moreSupport}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WhatHelps() {
  const [, setLocation] = useLocation();
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <ChapterLayout
      title="What Helps"
      subtitle="Practical ways to reduce everyday difficulty"
      chapterNumber={6}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/brain')}
      onNext={() => setLocation('/chapter/medication')}
    >
      <motion.div className="space-y-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <section className="text-center" ref={titleRef}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage-green">Practical support</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
            <VariableProximity
              label="What actually helps?"
              containerRef={titleRef}
              fromFontVariationSettings="'wght' 640, 'opsz' 36"
              toFontVariationSettings="'wght' 820, 'opsz' 64"
              radius={110}
              falloff="gaussian"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            The most useful strategies reduce how much you must remember, decide, organize, or regulate in the moment. Start with one recurring difficulty and test one change at a time.
          </p>
        </section>

        <section>
          <div className="mb-7 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Strategies for common difficulties</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select the difficulty that is most relevant. Each guide gives a small set of actions, an explanation, and a concrete example.
            </p>
          </div>
          <ChallengeExplorer />
        </section>

        <section>
          <div className="mb-7 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">A basic support system</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              These principles can be used across home, study, and work. They are intentionally simple so they remain usable when attention or energy is limited.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
            {[
              {
                icon: FileText,
                title: 'Store information outside your memory',
                text: 'Use one calendar, one task-capture place, written instructions, visible lists, and fixed homes for important objects. External systems are not cheating; they reduce working-memory demands.',
              },
              {
                icon: ListChecks,
                title: 'Make the next step clear',
                text: 'Break complex tasks into shorter steps, give brief specific directions, and keep the current step visible. A clear action is easier to begin and easier to resume after interruption.',
              },
              {
                icon: TimerReset,
                title: 'Make time and transitions visible',
                text: 'Use timers, advance warnings, earlier checkpoints, and realistic estimates based on past experience. Plan the transition itself, not only the activity before and after it.',
              },
              {
                icon: Focus,
                title: 'Change the environment before demanding more effort',
                text: 'Reduce unnecessary distractions, limit choices when someone is overwhelmed, prepare materials in advance, and create predictable routines for repeated tasks.',
              },
            ].map(({ icon: Icon, title, text }, index, items) => (
              <article key={title} className={`grid gap-4 p-6 md:grid-cols-[3rem_1fr] md:p-7 ${index < items.length - 1 ? 'border-b border-sage-green/10' : ''}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-7 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">When strategies are not enough</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Practical systems can help, but they do not replace treatment when symptoms remain impairing. Support may include one or more of the following.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Behavioral and psychological support',
                text: 'Parent training, classroom behavioral support, ADHD-focused cognitive behavioral therapy, and organizational-skills work can help build routines, planning skills, self-regulation, and more effective responses to recurring problems.',
                action: 'Discuss the type of support that matches the person’s age and main difficulties.',
              },
              {
                title: 'Medication',
                text: 'Stimulant and nonstimulant medication can reduce core ADHD symptoms for many people. Medication selection, dose adjustment, side-effect monitoring, and follow-up should be handled by a qualified prescriber.',
                action: 'Open the Medication page for a detailed, plain-language guide.',
                route: '/chapter/medication',
              },
              {
                title: 'School or workplace support',
                text: 'Written instructions, reduced distraction, organizational support, movement breaks, technology, and other formal adjustments may reduce barriers when ADHD substantially affects functioning.',
                action: 'The Accommodations page is currently in progress.',
                route: '/chapter/accommodations',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
                    <p className="mt-3 text-sm font-semibold text-foreground">{item.action}</p>
                  </div>
                  {item.route && (
                    <button
                      type="button"
                      onClick={() => setLocation(item.route!)}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-sage-green/25 bg-white px-4 py-2 text-sm font-semibold text-sage-green transition hover:bg-sage-green/[0.07]"
                    >
                      Open page <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.07] to-muted-teal/[0.07] p-7 md:p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-sage-green" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Test one change at a time</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                Choose one specific problem, try one realistic change for long enough to observe it, and track a simple outcome. Keep it if it helps, adjust it if it partly helps, and stop it if the cost is greater than the benefit.
              </p>
            </div>
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'Treatment of ADHD',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/treatment/index.html',
              note: 'Behavior management, routines, organization, distraction reduction, clear directions, task breakdown, and treatment by age.',
            },
            {
              title: 'ADHD in the Classroom',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/treatment/classroom.html',
              note: 'Clear assignments, shorter tasks, breaks, reduced distraction, feedback, and organizational tools.',
            },
            {
              title: 'ADHD in Adults',
              organization: 'American Psychiatric Association',
              url: 'https://www.psychiatry.org/patients-families/adhd/adhd-in-adults',
              note: 'Medication, psychotherapy, time management, structure, organization, and minimizing distractions.',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'ADHD Resource Center',
              organization: 'American Academy of Child and Adolescent Psychiatry',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
            },
          ]}
        />
      </motion.div>
    </ChapterLayout>
  );
}
