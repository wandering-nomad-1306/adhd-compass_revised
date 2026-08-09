import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Eye,
  Layers3,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';

const functions = [
  {
    id: 'working-memory',
    icon: Layers3,
    title: 'Working memory',
    purpose: 'Keep information active while using it.',
    explanation:
      'Working memory is the temporary mental workspace used to hold an instruction, compare options, remember the current step, and connect what just happened with what should happen next. It is different from long-term memory: the information may be known but unavailable at the moment it is needed.',
    examples: [
      'Forgetting the second part of an instruction while completing the first.',
      'Losing the reason you opened an app or entered a room after an interruption.',
      'Understanding a project but losing track of the plan while carrying it out.',
    ],
    support:
      'Move information out of working memory: written steps, one visible task list, checklists, notes beside the point of action, and reminders timed for when action is required.',
  },
  {
    id: 'inhibition',
    icon: ShieldCheck,
    title: 'Response inhibition',
    purpose: 'Pause long enough for the goal to influence the response.',
    explanation:
      'Inhibition is not simply “self-control.” It is the ability to delay an automatic response, ignore a competing signal, and protect the current goal long enough to choose what happens next. Emotion, fatigue, reward, and urgency can all change how available this pause feels.',
    examples: [
      'Interrupting before the thought disappears.',
      'Opening a notification even though another task is more important.',
      'Continuing an activity after deciding it is time to stop.',
    ],
    support:
      'Create a pause outside the brain: remove the trigger, add a confirmation step, use a written rule, silence notifications, or place a brief delay between urge and action.',
  },
  {
    id: 'planning',
    icon: SlidersHorizontal,
    title: 'Planning and sequencing',
    purpose: 'Turn a broad goal into an ordered set of actions.',
    explanation:
      'Planning requires choosing a target, identifying the required steps, estimating resources, deciding what comes first, and updating the plan when new information appears. Vague or unfamiliar tasks demand more executive work before any visible action can begin.',
    examples: [
      'A project feels like one large block rather than a sequence.',
      'Important steps become obvious only after something goes wrong.',
      'Spending time on an easy detail while the critical step remains undefined.',
    ],
    support:
      'Define the next visible action, work backward from the outcome, limit the plan to a few current steps, and ask what must be true before each step can happen.',
  },
  {
    id: 'activation',
    icon: ArrowRight,
    title: 'Task activation',
    purpose: 'Move from intention to the first action.',
    explanation:
      'Starting requires more than deciding that something matters. The brain must represent the goal, choose an entry point, tolerate uncertainty or low reward, and overcome the cost of switching from the current state. Difficulty starting is not proof that the person does not care.',
    examples: [
      'Thinking about the task repeatedly without beginning it.',
      'Waiting for urgency before an otherwise manageable task becomes actionable.',
      'Starting easily when another person is present but struggling alone.',
    ],
    support:
      'Shrink the entry point: prepare materials, name a five-minute action, use a start cue, work beside someone, or make the first step so specific that it requires little interpretation.',
  },
  {
    id: 'attention',
    icon: Eye,
    title: 'Sustained attention',
    purpose: 'Keep the goal active and respond consistently over time.',
    explanation:
      'ADHD is not a total inability to focus. The difficulty is often regulating where attention goes, how consistently it remains available, and how easily the person can return after interruption. Interest, novelty, feedback, fatigue, and task length can change performance sharply.',
    examples: [
      'Errors increase during repetitive or delayed-reward work.',
      'Attention is strong for an engaging task but unstable for routine work.',
      'An interruption causes a long detour before the original task is resumed.',
    ],
    support:
      'Reduce competing signals, keep the current question visible, use shorter work periods with defined endpoints, and create a parking place for unrelated thoughts.',
  },
  {
    id: 'time',
    icon: Clock3,
    title: 'Time and future action',
    purpose: 'Represent duration, future consequences, and when to act later.',
    explanation:
      'Time management depends on estimating duration, noticing time passing, remembering a future intention, and beginning early enough for the plan to work. “Time blindness” is a useful everyday phrase, but it is not one single scientific mechanism or a formal diagnostic criterion.',
    examples: [
      'Underestimating preparation or transition time.',
      'Not feeling a deadline until it becomes immediate.',
      'Remembering an intention at the wrong time and forgetting it when action becomes possible.',
    ],
    support:
      'Make time visible with timers, countdowns, earlier checkpoints, transition warnings, and records of how long repeated tasks actually take.',
  },
  {
    id: 'flexibility',
    icon: RefreshCw,
    title: 'Cognitive flexibility and monitoring',
    purpose: 'Notice what changed, disengage, and adjust the plan.',
    explanation:
      'Flexible control involves noticing that the current approach is no longer working, stopping it, updating the rule, and activating a different response. Switching has a cost for everyone; it becomes especially difficult when the next task is unclear or the current activity is absorbing.',
    examples: [
      'Continuing the old task after priorities change.',
      'Becoming stuck on one solution despite evidence that it is not working.',
      'Finding transitions disproportionately tiring or frustrating.',
    ],
    support:
      'Use advance warnings, a short transition routine, a visible stopping point, and a written first step for the next activity.',
  },
] as const;

export default function ExecutiveFunctions() {
  const [, setLocation] = useLocation();
  const [selectedId, setSelectedId] = useState<(typeof functions)[number]["id"]>(functions[0].id);
  const selected = functions.find((item) => item.id === selectedId) ?? functions[0];
  const Icon = selected.icon;

  return (
    <ChapterLayout
      title="Executive Functions"
      subtitle="How the brain turns goals into action"
      onPrevious={() => setLocation('/chapter/brain')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage-green">Brain subpage</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">Executive functions</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Executive functions are the mental processes that keep a goal active, organize behaviour around it, and help the person adjust while acting. They are not a measure of intelligence, character, or how much someone cares.
          </p>
        </section>

        <section id="what-executive-function-is" data-page-label="What executive function is" className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <BrainCircuit className="mt-1 h-7 w-7 shrink-0 text-sage-green" />
            <div className="min-w-0">
              <h2 className="font-serif text-3xl font-bold text-foreground">What executive function actually is</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                Executive functions are a family of control processes that help the brain organize behaviour around a goal. They become especially important when the correct action is not automatic—when you have to remember a rule, resist a distraction, choose between options, plan several steps, switch strategies, or keep working toward something whose reward is later.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Researchers often describe three foundational components: <strong className="text-foreground">working memory</strong> (holding and updating information while using it), <strong className="text-foreground">inhibitory control</strong> (stopping or withholding a response that conflicts with the goal), and <strong className="text-foreground">cognitive flexibility</strong> or set shifting (changing rules, perspectives, or tasks when needed). Higher-level abilities such as planning, organization, problem-solving, time management, and goal monitoring depend on combinations of these processes rather than on one separate “executive center.”
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Hold', 'Keep the goal and relevant information available while you act.'],
                  ['Pause', 'Prevent the strongest immediate response from automatically winning.'],
                  ['Adjust', 'Notice when the situation changes and update the plan or rule.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-warm-cream p-4">
                    <p className="font-bold text-sage-green">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="executive-dysfunction-adhd" data-page-label="Executive dysfunction and ADHD" className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Executive dysfunction and ADHD</h2>
          <p className="mt-4 leading-relaxed text-foreground">
            Many people with ADHD have difficulty with one or more executive processes, which can create a gap between <em>knowing</em> what to do and being able to organize behaviour around that knowledge at the right moment. Working-memory difficulties can make instructions disappear while you are acting; inhibition difficulties can make competing signals harder to suppress; and planning or shifting difficulties can make a task feel undefined even when its final goal is clear.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This pattern is heterogeneous. A 2024 review found that children with ADHD tend to perform worse than neurotypical children across executive-function tests, but the size and type of difficulty vary substantially between people. Executive dysfunction is also not unique to ADHD and can occur with other neurodevelopmental, psychiatric, neurological, sleep, and stress-related conditions.
          </p>
          <div className="mt-5 rounded-2xl border border-[#5b6f96]/15 bg-[#5b6f96]/[0.05] p-5">
            <p className="font-bold text-foreground">Why a structured test can look better than everyday life</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A short test usually provides the goal, rules, timing, materials, feedback, and a distraction-controlled setting. Real life often requires the person to create that structure themselves while juggling interruptions, emotion, fatigue, competing priorities, and delayed consequences. That difference is one reason a normal score on one executive-function task does not automatically rule out meaningful everyday difficulty.
            </p>
          </div>
        </section>

        <section id="main-functions" data-page-label="Main executive functions">
          <div className="mb-7 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">The main executive functions</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a function to see what it does, how difficulty may appear, and how external support can reduce the load.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
            <div className="grid min-w-0 lg:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="border-b border-sage-green/10 bg-warm-cream p-3 lg:border-b-0 lg:border-r lg:p-4" role="tablist" aria-label="Executive functions">
                <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                  {functions.map((item) => {
                    const ItemIcon = item.icon;
                    const active = selected.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedId(item.id)}
                        className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:w-full ${
                          active ? 'bg-sage-green text-white shadow-sm' : 'bg-white text-foreground hover:bg-sage-green/[0.07]'
                        }`}
                      >
                        <ItemIcon className="h-4 w-4 shrink-0" /> {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{selected.title}</h3>
                      <p className="mt-2 font-semibold text-sage-green">{selected.purpose}</p>
                    </div>
                  </div>
                  <p className="mt-6 leading-relaxed text-foreground">{selected.explanation}</p>

                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl bg-warm-cream p-5">
                      <h4 className="font-bold text-foreground">How difficulty may appear</h4>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {selected.examples.map((example) => <li key={example}>• {example}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-sage-green/[0.07] p-5">
                      <h4 className="font-bold text-foreground">Reduce the executive load</h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selected.support}</p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="context" data-page-label="Why performance changes">
          <div className="mb-7 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Why performance can be inconsistent</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Executive control is sensitive to the task and the person’s current state. Capacity and reliable access to that capacity are not the same thing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Task structure', 'Clear criteria, immediate feedback, and visible steps reduce planning and monitoring demands. Vague, delayed, or interrupted tasks require more self-generated structure.'],
              ['Current state', 'Sleep, stress, emotion, hunger, pain, arousal, and medication can change how reliably working memory and inhibition are available.'],
              ['External support', 'Reminders, written instructions, accountability, environmental structure, and shorter steps can make the same skill much easier to access.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-sage-green/15 bg-white p-5 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="assessment" data-page-label="Assessment and real life" className="rounded-3xl border border-[#5b6f96]/20 bg-[#5b6f96]/[0.06] p-7 md:p-8">
          <div className="flex items-start gap-4">
            <ListChecks className="mt-1 h-7 w-7 shrink-0 text-[#5b6f96]" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Tests and everyday life are not identical</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                Many neuropsychological tests are short, structured, quiet, and guided by an examiner. Everyday tasks are often open-ended, emotionally meaningful, interrupted, and dependent on self-generated goals. A person may perform adequately in a structured test and still have substantial real-world difficulty.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Assessment should therefore consider history, functioning across settings, rating scales, observation, and other possible explanations—not one test score alone.
              </p>
            </div>
          </div>
        </section>

        <section id="practical-goal" data-page-label="Practical support" className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.07] to-muted-teal/[0.07] p-7 md:p-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-sage-green" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">The practical goal</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                Support does not require “fixing” a person’s character. The goal is to reduce unnecessary executive demands, make the next action visible, and use treatment or accommodations when the remaining difficulty still interferes with daily life.
              </p>
              <button
                type="button"
                onClick={() => setLocation('/chapter/what-helps')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sage-green px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Open practical strategies <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'Executive function deficits in ADHD and autism spectrum disorder',
              organization: 'Nature Reviews Psychology / PubMed Central',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11485171/',
              note: '2024 review of executive-function components, heterogeneity, and measurement limitations.',
            },
            {
              title: 'Executive Function Disorder & ADHD',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/executive-function-disorder/',
              note: 'Plain-language explanation of executive dysfunction, its overlap with ADHD, and why it is not a separate official diagnosis.',
            },
            {
              title: 'Validity of the executive function theory of ADHD: a meta-analytic review',
              organization: 'PubMed, National Library of Medicine',
              url: 'https://pubmed.ncbi.nlm.nih.gov/15950006/',
              note: 'Meta-analysis showing meaningful executive-function differences while cautioning against treating one deficit as a complete explanation of ADHD.',
            },
            {
              title: 'The limitations and challenges in the assessment of executive dysfunction associated with real-world functioning',
              organization: 'PubMed Central, National Library of Medicine',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11177293/',
              note: 'Explains why highly structured tests may not fully represent complex everyday functioning.',
            },
            {
              title: 'Inside the ADHD Brain: Structure, Function, and Chemistry',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/adhd-brain/',
            },
            {
              title: 'NIH Researchers Identify Brain Connections Associated With ADHD in Youth',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/news/science-updates/2024/nih-researchers-identify-brain-connections-associated-with-adhd-in-youth',
            },
          ]}
        />
      </motion.div>
    </ChapterLayout>
  );
}
