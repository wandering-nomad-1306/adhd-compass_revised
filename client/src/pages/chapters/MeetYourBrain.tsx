import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  BookOpenCheck,
  Eye,
  Gauge,
  Info,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import BrainNetworkViz from '@/components/BrainNetworkViz';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';

const brainSystems = [
  {
    id: 'control',
    icon: Target,
    title: 'Executive control',
    subtitle: 'Keeping a goal active and guiding behaviour toward it',
    regions: 'Prefrontal and frontoparietal systems, working with the striatum and other regions',
    job: 'These systems help <strong>keep a future goal active long enough to guide the present moment</strong>. They support working memory, pausing impulses, planning, error monitoring, and flexible adjustment. This is about <strong>access to control in real-time</strong>—not intelligence or knowing what you should do.',
    research:
      'Brain imaging repeatedly finds <strong>differences in connectivity across frontal-control networks</strong>. Recent NIH studies link ADHD symptoms in youth to atypical interactions between the frontal cortex and deeper motor and reward circuits.',
    daily:
      'The result is the classic intention-action gap: <strong>knowing the rules perfectly, yet struggling to initiate multi-step tasks or resist distractions</strong> without immediate deadlines or external scaffolding.',
    limit:
      'Executive test scores vary widely. Many people with ADHD score normally on short, novel office tests, yet <strong>experience significant impairment during prolonged, unstructured real-world demands</strong>.',
  },
  {
    id: 'attention',
    icon: Eye,
    title: 'Attention and salience',
    subtitle: 'Selecting what matters now and shifting between internal and external information',
    regions: 'Frontal and parietal attention systems, anterior cingulate, insula, and connected sensory regions',
    job: 'Attention is not a simple on/off switch. The brain must <strong>select what matters right now, filter out competing signals, and sustain effort</strong>. ADHD primarily affects the <strong>regulation and consistency of attention</strong> rather than a total inability to focus.',
    research:
      'Neuroimaging associates ADHD with <strong>variable communication between attention, salience, and control networks</strong>—creating fluctuations in how easily the brain locks onto external tasks.',
    daily:
      'This creates an interest-based nervous system: <strong>effortless hyperfocus during novel or urgent activities</strong>, alongside rapid mental fatigue or missed details during routine tasks.',
    limit:
      'Distractibility is not exclusive to ADHD. <strong>Chronic stress, sleep deprivation, thyroid issues, anxiety, and depression</strong> can disrupt the exact same attention circuits.',
  },
  {
    id: 'reward',
    icon: Sparkles,
    title: 'Reward and motivation',
    subtitle: 'How the brain evaluates effort, delay, and starting tasks',
    regions: 'The striatum and connected frontal circuits involved in reward learning, motivation, and action selection',
    job: 'Reward circuits <strong>calculate effort, expected delay, and whether an action is worth starting</strong>. Immediate, tangible feedback naturally commands more neurological priority than a distant payoff. This is a difference in <strong>temporal discounting</strong>, not a lack of caring.',
    research:
      'ADHD is strongly linked to <strong>altered dopamine signaling in the striatum</strong>, creating a biological preference for immediate consequences over distant rewards.',
    daily:
      'A task with a distant payoff feels <strong>neurologically invisible until a deadline creates immediate urgency</strong>, explaining why last-minute pressure suddenly unlocks productivity.',
    limit:
      'This does not mean people with ADHD cannot value long-term aspirations. It describes <strong>how strongly future consequences can drive physical action in the present moment</strong>.',
  },
  {
    id: 'coordination',
    icon: Network,
    title: 'Network coordination',
    subtitle: 'Moving between mind-wandering, task focus, and monitoring what deserves attention',
    regions: 'Default-mode, frontoparietal, salience, and task-related networks',
    job: 'The <strong>Default Mode Network (DMN)</strong> supports daydreaming, memory, and creative thought, while the <strong>Task Positive Network (TPN)</strong> handles external work. Proper focus requires smoothly switching between them.',
    research:
      'Studies show that in ADHD, the <strong>Default Mode Network tends to stay active even during focused tasks</strong>, intruding with internal thoughts, spontaneous ideas, or mental drift.',
    daily:
      'This feels like <strong>losing your train of thought mid-sentence</strong>, mind-wandering while someone is speaking, or needing multiple restarts to get back into “work mode.”',
    limit:
      'The default mode network is not a defect. It is the engine of <strong>creativity, empathy, synthesis, and imagination</strong>. The goal is improving switching agility—not silencing your internal voice.',
  },
] as const;

const chemicalSystems = [
  {
    id: 'dopamine',
    name: 'Dopamine',
    accent: '#5b6f96',
    overview:
      'Dopamine is your brain’s <strong>interest and reward navigator</strong>—not just a simple “pleasure chemical.” It helps you evaluate whether an effort is worth the reward, signals what is relevant right now, and fuels the motivation needed to cross the starting line.',
    role:
      'In executive and reward networks, dopamine helps <strong>anchor attention on tasks, filter out distractions, and convert mental intentions into physical action</strong>. It determines how engaging and rewarding a goal feels before you even start doing it.',
    adhd:
      'ADHD is <strong>not a simple global “shortage” of dopamine</strong>. Instead, dopamine signaling in specific focus and reward circuits is inconsistent. When a task lacks instant stimulation, visible progress, or urgency, dopamine levels drop, making starting feel like pushing through wet cement—even when you genuinely care.',
    daily:
      'This explains why an interesting hobby or urgent deadline triggers effortless, laser-sharp focus (<strong>hyperfocus</strong>), while routine chores or paperwork feel almost physically exhausting to initiate.',
    medication:
      'Stimulant medications (and certain nonstimulants) <strong>temporarily optimize dopamine levels in communication gaps</strong>, helping interest, motivation, and attention remain steadier throughout everyday routines.',
    caution:
      'There is <strong>no blood test or brain scan for dopamine</strong> that diagnoses ADHD. Research findings reflect average group patterns, not a simple deficit number.',
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    accent: '#477f72',
    overview:
      'Norepinephrine is your brain’s <strong>alertness and signal amplifier</strong>. It acts like a spotlight controller for the front control networks, keeping priority goals clear in your working memory while muting mental background noise.',
    role:
      'In the prefrontal cortex, norepinephrine <strong>amplifies the strength of what you are focusing on</strong>. It helps you stay alert, hold multiple instructions in mind, and resist impulsive interruptions during demanding work.',
    adhd:
      'In ADHD, norepinephrine transmission can be <strong>too low during quiet or repetitive tasks</strong> (leading to mental drift or sleepiness) or spike erratically during acute stress, making it difficult to maintain steady focus without extra stimulation or urgency.',
    daily:
      'This helps explain why people with ADHD often find themselves <strong>subconsciously seeking caffeine, background music, or last-minute panic</strong> to jump-start alertness, or why a sudden interruption easily erases their train of thought.',
    medication:
      'Medications like atomoxetine, viloxazine, stimulants, and alpha-2 agonists <strong>optimize norepinephrine signaling</strong>, helping the brain maintain steady wakefulness and focus throughout the day without relying on emergency adrenaline.',
    caution:
      'More is not automatically better. <strong>Excessive stress or high doses can overload executive circuits</strong>, which is why acute anxiety harms focus just as much as low arousal.',
  },
] as const;

function BrainSystemExplorer() {
  const getInitialIndex = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sys = params.get('system');
      if (sys) {
        const idx = brainSystems.findIndex((s) => s.id === sys);
        if (idx !== -1) return idx;
      }
    } catch {}
    return 0;
  };

  const [selected, setSelected] = useState(getInitialIndex);

  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sys = params.get('system');
        if (sys) {
          const idx = brainSystems.findIndex((s) => s.id === sys);
          if (idx !== -1) setSelected(idx);
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

  const active = brainSystems[selected];
  const Icon = active.icon;

  return (
    <div className="grid min-w-0 gap-4 lg:gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="grid grid-cols-2 gap-2 lg:block lg:space-y-3" role="tablist" aria-label="Brain systems associated with ADHD">
        {brainSystems.map((system, index) => {
          const SystemIcon = system.icon;
          const isActive = selected === index;
          return (
            <button
              key={system.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(index)}
              className={`flex min-h-12 w-full min-w-0 items-center justify-center rounded-xl border px-3 py-2.5 text-center font-sans text-sm font-bold leading-tight transition-all lg:min-h-0 lg:justify-start lg:gap-4 lg:rounded-2xl lg:p-4 lg:text-left lg:text-base ${
                isActive
                  ? 'border-sage-green bg-sage-green/[0.08] shadow-sm'
                  : 'border-sage-green/15 bg-white hover:border-sage-green/40'
              }`}
            >
              <span className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-full lg:flex ${isActive ? 'bg-sage-green text-warm-cream' : 'bg-warm-cream text-sage-green'}`}>
                <SystemIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block break-words font-bold text-foreground">{system.title}</span>
                <span className="mt-1 hidden text-sm leading-snug text-muted-foreground lg:block">{system.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="min-w-0 overflow-hidden rounded-3xl border border-sage-green/15 bg-white p-5 shadow-sm sm:p-7 md:p-8 lg:overflow-visible"
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-green">Connected system</p>
              <h3 className="mt-1 break-words font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">{active.title}</h3>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {[
              ['Main regions and circuits', active.regions],
              ['What the system normally does', active.job],
              ['What research suggests in ADHD', active.research],
              ['How this may appear in daily life', active.daily],
            ].map(([label, text]) => (
              <div key={label} className="min-w-0 border-l-2 border-sage-green/30 pl-4">
                <p className="font-bold text-base text-foreground">{label}</p>
                <p className="mt-2 break-words leading-[1.75] text-[15px] sm:text-base text-foreground/90" dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>

          <div className="mt-7 flex gap-3.5 rounded-2xl bg-warm-cream/90 p-5 sm:p-6 border border-stone-200/60">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-green" />
            <div>
              <p className="font-bold text-base text-foreground">Important diagnostic limit</p>
              <p className="mt-1 text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: active.limit }} />
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function ChemicalSignalExplorer() {
  const [selected, setSelected] = useState(0);
  const active = chemicalSystems[selected];

  return (
    <div className="overflow-hidden rounded-3xl border border-[#4f7659]/15 bg-white shadow-sm">
      <div className="flex border-b border-sage-green/10 bg-warm-cream/50 p-2" role="tablist" aria-label="Chemical messenger explorer">
        {chemicalSystems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected === index}
            onClick={() => setSelected(index)}
            className="flex-1 rounded-xl px-4 py-3 text-sm font-bold transition sm:text-base"
            style={selected === index ? { backgroundColor: item.accent, color: 'white', boxShadow: `0 6px 18px ${item.accent}25` } : { color: '#4b514d' }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-7 md:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: active.accent }}>Neurotransmitter / neuromodulator</p>
            <h3 className="mt-2 font-serif text-3xl font-bold text-foreground">{active.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: active.overview }} />
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              ['What it normally does', active.role],
              ['How it connects to ADHD', active.adhd],
              ['What this can look like in daily life', active.daily],
              ['Why medication affects it', active.medication],
            ].map(([title, text]) => (
              <section key={title} className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-2xs">
                <h4 className="font-bold text-base sm:text-lg text-foreground">{title}</h4>
                <p className="mt-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: text }} />
              </section>
            ))}
          </div>

          <div className="mt-5 flex gap-3.5 rounded-2xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-5 sm:p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
            <div>
              <p className="font-bold text-base text-foreground">Important diagnostic limit</p>
              <p className="mt-1.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: active.caution }} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-sage-green/20 bg-sage-green/[0.08] p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-green/15 text-sage-green font-bold text-xs">★</span>
              <p className="font-bold text-base sm:text-lg text-foreground">How dopamine and norepinephrine fit together: The Radio Tuner Model</p>
            </div>
            <p className="mt-3 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
              Think of your brain's front executive network like a high-performance radio receiver:
            </p>
            <div className="mt-3.5 space-y-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
              <div className="flex items-start gap-2.5">
                <span className="mt-1 h-2 w-2 rounded-full bg-sage-green shrink-0" />
                <span><strong>Norepinephrine turns up the SIGNAL volume:</strong> It acts on alpha-2A receptors to boost alertness, strengthen working memory, and keep your primary goal clear and loud.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-1 h-2 w-2 rounded-full bg-sage-green shrink-0" />
                <span><strong>Dopamine acts like ACTIVE NOISE CANCELLATION:</strong> It acts on D1 receptors to mute background mental chatter, random impulses, and irrelevant distractions.</span>
              </div>
            </div>
            <p className="mt-3.5 text-sm sm:text-base leading-[1.75] text-stone-700 border-t border-sage-green/15 pt-3">
              <strong>The Clinical Reality:</strong> Peak focus happens in the balanced “sweet spot” when both chemicals are tuned. In ADHD, this tuning fluctuates—so the broadcast either fades out or gets drowned in background static. Medications do not create artificial energy; they simply help tune the radio back into a clear, steady broadcast.
            </p>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

export default function MeetYourBrain() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title="Meet Your Brain"
      subtitle="Brain systems, neurochemistry, and executive functions."
      chapterNumber={4}
      totalChapters={10}
      badgeText="Chapter 4 · Neuroscience"
      estimatedReadingTime="8 min read"
      bgClass="bg-[#F4F7F9]"
      accentColor="#3a596d"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/what-is')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        <motion.section id="research-limits" data-page-label="Research limits"
          className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <BrainCircuit className="mt-1 h-7 w-7 shrink-0 text-sage-green" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Research limits</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                “Associated with ADHD” means researchers found an average relationship—not that every person has the same brain pattern, that the pattern causes every symptom, or that imaging can confirm a diagnosis. ADHD remains a clinical diagnosis based on development, symptoms, impairment, and context.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section id="brain-map" data-page-label="Brain map" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Interactive map</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Brain regions and connections</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Explore approximate brain regions, then switch to the connections view to see how frontal, parietal, striatal, salience, and cerebellar systems work together.
            </p>
          </div>
          <BrainNetworkViz />
        </motion.section>

        <section id="brain-systems" data-page-label="Brain systems" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">From regions to circuits</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Four systems that make the ADHD brain easier to understand</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a system to see its normal job, what studies suggest, how it can appear in daily life, and the limit of the explanation.
            </p>
          </div>
          <BrainSystemExplorer />
        </section>

        <section id="neurochemistry" data-page-label="Neurochemistry">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Neurochemistry</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Dopamine and norepinephrine</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Dopamine and norepinephrine influence attention, working memory, reward, arousal and behavioural control through overlapping brain circuits. The key is regulation within specific networks—not a simple “chemical shortage.”
            </p>
          </div>
          <ChemicalSignalExplorer />
        </section>

        <section id="executive-functions" data-page-label="Executive functions">
          <div className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Executive functions</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">How goals become actions</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Executive functions are the mental processes used to keep a goal active, hold information in working memory, pause a response, organize steps, estimate time, begin, monitor, switch, and finish. These difficulties are central to many people’s experience of ADHD, but they are not unique to ADHD and they do not appear in the same pattern for everyone.
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green">
                <BookOpenCheck className="h-7 w-7" />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLocation('/chapter/brain/executive-functions')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sage-green px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Explore executive functions
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section id="performance" data-page-label="Why performance varies" className="rounded-3xl border border-[#4f7659]/15 bg-white p-7 shadow-sm md:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4f7659]/10 text-[#4f7659]">
              <Activity className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4f7659]">Context and performance</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-foreground">Why performance varies</h2>
            </div>
          </div>

          <p className="mt-5 text-lg leading-relaxed text-foreground">
            The same person can perform very differently across situations because the amount of executive control a task requires and the support available at that moment both change.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Task demands',
                text: '<strong>Long duration, repetition, delayed payoff, unclear sub-steps, and frequent interruptions</strong> place enormous strain on prefrontal control circuits.',
              },
              {
                icon: Gauge,
                title: 'Current state',
                text: '<strong>Sleep debt, chronic stress, emotional distress, hunger, and physical exhaustion</strong> directly deplete the dopamine and norepinephrine needed for executive access.',
              },
              {
                icon: SlidersHorizontal,
                title: 'External support',
                text: '<strong>Visual checklists, immediate feedback, visible timers, body doubling, and structured quiet workspaces</strong> externalize executive load and restore consistent performance.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xs">
                <Icon className="h-6 w-6 text-[#4f7659]" />
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: text }} />
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#4f7659]/20 bg-[#4f7659]/[0.06] p-6 shadow-2xs">
            <p className="font-bold text-base sm:text-lg text-foreground">What this means for everyday life</p>
            <p className="mt-2.5 break-words leading-[1.75] text-[15px] sm:text-base text-foreground/90">
              <strong>Doing something successfully once proves the underlying skill exists.</strong> It does NOT prove that the brain can access that skill under different stress levels, fatigue, or lack of structure. <strong>Performance inconsistency is a core neurological symptom of ADHD—not a lack of willpower or moral failing.</strong>
            </p>
          </div>
        </section>

        <section id="emotion-movement" data-page-label="Emotion and movement" className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-stone-200/80 bg-white p-7 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Emotional regulation</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground">
              Difficulty regulating emotions is <strong>one of the most impactful daily aspects of ADHD</strong>, even though it is not a standalone DSM category. Executive control, reward, and limbic emotion centers are deeply interconnected—meaning <strong>frustration, rejection, or excitement can surge rapidly before executive inhibitory circuits have time to evaluate or soften the reaction.</strong>
            </p>
            <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-foreground/90 border-t border-stone-200/60 pt-4">
              <strong>Clinical Differential:</strong> Intense emotions should not automatically be attributed solely to ADHD. <strong>Anxiety, depression, trauma history, sleep apnea, sensory overload, and bipolar disorder</strong> also affect emotional stability and require individualized clinical evaluation.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200/80 bg-white p-7 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Movement and timing</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground">
              ADHD neuroscience extends far beyond the prefrontal cortex. The <strong>basal ganglia and cerebellum</strong> contribute to internal timing, motor coordination, rhythm, and cognitive pacing.
            </p>
            <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-foreground/90 border-t border-stone-200/60 pt-4">
              <strong>Everyday Relevance:</strong> This helps explain <strong>restless fidgeting, tapping, subtle balance challenges, or misestimating how fast time is passing</strong>. Movement often functions as an instinctive, subconscious tool to stimulate alertness and wake up drowsy prefrontal circuits.
            </p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#477f72]/25 bg-[#477f72]/[0.07] p-7">
            <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
              <ShieldCheck className="h-6 w-6 text-[#477f72]" /> What neuroscience can tell us
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground">
              <li>• ADHD is a neurodevelopmental condition, not a failure of effort or intelligence.</li>
              <li>• Attention, executive control, reward, and network coordination are useful parts of the explanation.</li>
              <li>• Performance can vary because brain systems interact with task demands and current state.</li>
              <li>• Treatments can target symptoms and functioning without changing a person’s identity.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-[#a96952]/25 bg-[#a96952]/[0.07] p-7">
            <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
              <Info className="h-6 w-6 text-[#a96952]" /> What it cannot tell us
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground">
              <li>• A routine brain scan cannot diagnose ADHD.</li>
              <li>• One region, network, gene, or neurotransmitter does not explain every person.</li>
              <li>• A group-average difference does not predict an individual’s strengths, future, or treatment response.</li>
              <li>• Neuroscience does not replace a developmental and clinical evaluation.</li>
            </ul>
          </article>
        </section>

        <SourceList
          sources={[
            {
              title: 'Inside the ADHD Brain: Structure, Function, and Chemistry',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/adhd-brain/',
              note: 'Plain-language overview of frontal systems, brain networks, dopamine, norepinephrine, and executive dysfunction.',
            },
            {
              title: 'The dopamine hypothesis for ADHD: An evaluation of evidence',
              organization: 'Frontiers in Psychiatry',
              url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2024.1492126/full',
              note: 'Critical review explaining why ADHD should not be reduced to a simple global dopamine deficiency.',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'NIH Researchers Identify Brain Connections Associated With ADHD in Youth',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/news/science-updates/2024/nih-researchers-identify-brain-connections-associated-with-adhd-in-youth',
            },
            {
              title: 'Understanding ADHD: What You Need to Know',
              organization: 'NIH MedlinePlus Magazine',
              url: 'https://magazine.medlineplus.gov/article/understanding-adhd-what-you-need-to-know/',
            },
            {
              title: 'What is ADHD?',
              organization: 'American Psychiatric Association',
              url: 'https://www.psychiatry.org/patients-families/adhd/what-is-adhd',
            },
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'MedlinePlus, U.S. National Library of Medicine',
              url: 'https://medlineplus.gov/attentiondeficithyperactivitydisorder.html',
            },
            {
              title: 'Executive function deficits in ADHD and autism spectrum disorder',
              organization: 'Nature Reviews Psychology / PubMed Central',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11485171/',
              note: '2024 critical review of executive-function components, heterogeneity, and measurement limitations.',
            },
            {
              title: 'ADHD Neuroscience 101',
              organization: 'ADDitude',
              url: 'https://www.additudemag.com/adhd-neuroscience-101/',
              note: 'Plain-language secondary overview; the scientific claims on this page are cross-checked against the primary and government sources listed here.',
            },
            {
              title: 'Catecholamine influences on prefrontal cortical function',
              organization: 'PubMed, National Library of Medicine',
              url: 'https://pubmed.ncbi.nlm.nih.gov/21295057/',
              note: 'Review of dopamine and norepinephrine modulation of prefrontal attention, working memory, behaviour, and emotion.',
            },
            {
              title: 'An overview on neurobiology and therapeutics of ADHD',
              organization: 'PubMed Central, National Library of Medicine',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10501041/',
            },
          ]}
        />

        <motion.section className="text-center py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl font-bold text-foreground">Next: What Actually Helps?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Use this neuroscience as context—not as a treatment plan. The next page explains the major support pathways and what each is designed to change.
          </p>
          <button
            type="button"
            onClick={() => setLocation('/chapter/what-helps')}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-sage-green px-7 py-3 font-sans font-bold text-warm-cream shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Next: What Actually Helps?
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.section>
      </motion.div>
    </ChapterLayoutWide>
  );
}
