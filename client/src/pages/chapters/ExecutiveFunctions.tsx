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
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';

const functions = [
  {
    id: 'working-memory',
    icon: Layers3,
    title: 'Working memory',
    purpose: 'Keep critical instructions active in mind while acting.',
    explanation:
      'Working memory is your brain’s <strong>temporary mental workspace</strong>. It holds an instruction, compares options, tracks your current step, and links what just happened with what to do next. It is distinct from long-term memory: <strong>the knowledge is safely stored, but temporarily inaccessible right when you need it</strong>.',
    examples: [
      '<strong>Forgetting step two</strong> of an instruction the second you finish step one.',
      '<strong>Entering a room or opening an app</strong> and completely blanking on why you came.',
      '<strong>Losing your mental place</strong> in a multi-step task after a five-second interruption.',
    ],
    support:
      '<strong>Externalize mental load:</strong> Write steps on a visible dry-erase board, maintain ONE master list, place visual cues directly at the point of action, and set alarm triggers.',
  },
  {
    id: 'inhibition',
    icon: ShieldCheck,
    title: 'Response inhibition',
    purpose: 'Pause impulses long enough for your goal to guide your choice.',
    explanation:
      'Inhibition is not a moral virtue called “willpower.” It is the <strong>neurological pause button</strong> that holds back an automatic impulse, mutes a distraction, and protects your primary goal. In ADHD, this brake pedal is sensitive to fatigue, boredom, and emotional arousal.',
    examples: [
      '<strong>Interrupting conversations</strong> out of fear the thought will vanish if unsaid.',
      '<strong>Clicking sudden notifications</strong> despite working on a critical deadline.',
      '<strong>Hyper-focusing on an impulse</strong> and struggling intensely to hit the stop button.',
    ],
    support:
      '<strong>Create physical friction:</strong> Remove visual triggers from your desk, use browser site blockers, silence notifications, and insert a deliberate 10-second pause between urge and action.',
  },
  {
    id: 'planning',
    icon: SlidersHorizontal,
    title: 'Planning and sequencing',
    purpose: 'Break down intimidating goals into clear, chronological actions.',
    explanation:
      'Planning requires <strong>clarifying the target, ordering sub-steps, estimating needed energy, and adjusting when things change</strong>. For ADHD brains, large or vague projects appear as one terrifying, monolithic mountain rather than a sequence of manageable steps.',
    examples: [
      '<strong>Feeling paralyzed by large projects</strong> because the entry point feels invisible.',
      '<strong>Realizing critical requirements were missed</strong> only after something goes wrong.',
      '<strong>Spending hours perfecting minor formatting</strong> while the core deliverable remains untouched.',
    ],
    support:
      '<strong>Define the immediate next physical action:</strong> Work backward from the finish line, restrict active view to only 2 current steps, and clarify: <em>“What is the single physical action I need to do first?”</em>',
  },
  {
    id: 'activation',
    icon: ArrowRight,
    title: 'Task activation',
    purpose: 'Cross the starting line from intention to physical execution.',
    explanation:
      'Starting requires far more than knowing something is important. The brain must <strong>calculate effort, cross an energy barrier, tolerate low immediate stimulation, and switch out of its current state</strong>. Procrastination in ADHD is biological friction—not laziness.',
    examples: [
      '<strong>Mentally agonizing over a 5-minute task</strong> for hours without taking action.',
      '<strong>Needing the panic of an emergency deadline</strong> to produce the adrenaline required to start.',
      '<strong>Starting smoothly when body doubling with a partner</strong>, but freezing when working in isolation.',
    ],
    support:
      '<strong>Lower the activation energy:</strong> Commit to just 2 minutes of low-stakes work, prepare physical tools in advance, employ body doubling, and eliminate initial decisions.',
  },
  {
    id: 'attention',
    icon: Eye,
    title: 'Sustained attention',
    purpose: 'Anchor focus on goals consistently without losing the thread.',
    explanation:
      'ADHD is <strong>not a deficit of attention—it is a challenge of attention regulation</strong>. Attention naturally flows toward novelty, high personal interest, urgent pressure, or immediate feedback, while routine, repetitive, or delayed-reward work rapidly starves prefrontal networks.',
    examples: [
      '<strong>Making simple oversight errors</strong> during repetitive, low-stimulation paperwork.',
      '<strong>Maintaining effortless 5-hour hyperfocus</strong> on an engaging passion project.',
      '<strong>Taking a 45-minute detour</strong> after a brief 30-second interruption.',
    ],
    support:
      '<strong>Reduce competing signals:</strong> Keep the core question taped to your monitor, break work into 20-minute focus sprints, and keep a "parking lot" scratchpad for off-topic ideas.',
  },
  {
    id: 'time',
    icon: Clock3,
    title: 'Time and future action',
    purpose: 'Feel the passage of time and connect present choices to future results.',
    explanation:
      'Time awareness relies on <strong>accurately sensing duration, noticing time slip by, and anchoring future deadlines into current feelings</strong>. To an ADHD brain, time often exists in only two zones: <strong>NOW and NOT NOW</strong>. A future consequence does not feel real until it enters the “NOW” window.',
    examples: [
      '<strong>Chronic time miscalculation:</strong> underestimating travel, prep, or transition buffers.',
      '<strong>Feeling zero urgency for an assignment</strong> until 8 hours before the deadline.',
      '<strong>Remembering an essential chore</strong> at 2 AM or while driving, and forgetting it when free.',
    ],
    support:
      '<strong>Make invisible time tangible:</strong> Use visual analog timers (like Time Timer), set intermediate milestone check-ins, add 50% buffer time, and set location-based reminders.',
  },
  {
    id: 'flexibility',
    icon: RefreshCw,
    title: 'Cognitive flexibility and monitoring',
    purpose: 'Pivot smoothly when priorities change and update your mental script.',
    explanation:
      'Cognitive flexibility means <strong>noticing an approach has stalled, disengaging, updating the plan, and redirecting energy</strong>. Shifting gears requires heavy cognitive fuel, which is why abrupt transitions often trigger intense frustration or irritability.',
    examples: [
      '<strong>Continuing down an obsolete path</strong> long after circumstances have shifted.',
      '<strong>Experiencing intense irritability</strong> when unexpectedly interrupted mid-task.',
      '<strong>Feeling deeply drained or disoriented</strong> when shifting between work modes.',
    ],
    support:
      '<strong>Build transition bridges:</strong> Give yourself a 5-minute wind-down runway, leave a "bridge note" describing where you will resume, and use consistent ritual cues.',
  },
] as const;

export default function ExecutiveFunctions() {
  const [, setLocation] = useLocation();

  const getInitialFunction = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fn = params.get('function');
      if (fn && functions.some((item) => item.id === fn)) {
        return fn as (typeof functions)[number]['id'];
      }
    } catch {}
    return functions[0].id;
  };

  const [selectedId, setSelectedId] = useState<(typeof functions)[number]['id']>(getInitialFunction);

  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const fn = params.get('function');
        if (fn && functions.some((item) => item.id === fn)) {
          setSelectedId(fn as (typeof functions)[number]['id']);
        }
      } catch {}
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  const selected = functions.find((item) => item.id === selectedId) ?? functions[0];
  const Icon = selected.icon;

  return (
    <ChapterLayoutWide
      title="Executive Functions"
      subtitle="How goals become actions and why everyday performance varies."
      chapterNumber={5}
      totalChapters={10}
      badgeText="Chapter 5 · Executive Functions"
      estimatedReadingTime="7 min read"
      bgClass="bg-[#F5F8F8]"
      accentColor="#335d64"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/brain')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>

        <section id="what-executive-function-is" data-page-label="What executive function is" className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9]">
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
                  <div key={title} className="rounded-2xl bg-warm-cream p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white">
                    <p className="font-bold text-sage-green">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="executive-dysfunction-adhd" data-page-label="Executive dysfunction and ADHD" className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9]">
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

        <section id="main-functions" data-page-label="Main executive functions" className="scroll-mt-24">
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
                  <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: selected.explanation }} />

                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-6 shadow-2xs">
                      <h4 className="font-bold text-base sm:text-lg text-foreground">How difficulty appears in real life</h4>
                      <ul className="mt-3.5 space-y-3 text-[15px] sm:text-base leading-[1.7] text-foreground/90">
                        {selected.examples.map((example) => (
                          <li key={example} className="flex gap-2.5 items-start">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-sage-green shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: example }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-sage-green/20 bg-sage-green/[0.08] p-6 shadow-2xs">
                      <h4 className="font-bold text-base sm:text-lg text-foreground">Point-of-performance scaffolding</h4>
                      <p className="mt-3.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: selected.support }} />
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
    </ChapterLayoutWide>
  );
}
