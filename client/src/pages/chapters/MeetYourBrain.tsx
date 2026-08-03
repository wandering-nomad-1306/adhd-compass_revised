import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Clock3,
  Eye,
  Gauge,
  Info,
  Layers3,
  Network,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BrainNetworkViz from '@/components/BrainNetworkViz';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';

const brainSystems = [
  {
    id: 'control',
    icon: Target,
    title: 'Executive control',
    subtitle: 'Keeping a goal active and guiding behaviour toward it',
    regions: 'Prefrontal and frontoparietal systems, working with the striatum and other regions',
    job: 'These systems help hold goals in mind, resist an immediate response, plan steps, monitor errors, and adjust behaviour when the situation changes.',
    research:
      'ADHD research repeatedly finds group-level differences in activation and connectivity across frontal-control circuits. A large NIH-supported analysis published in 2024 also linked ADHD symptoms in youth with atypical interactions between the frontal cortex and deeper information-processing regions.',
    daily:
      'The result may look like inconsistent inhibition, losing track of a plan, difficulty beginning a multi-step task, or knowing a rule but failing to use it at the right moment.',
    limit:
      'Executive-function test results vary widely. Some people with ADHD perform within an average range on a structured test but struggle when everyday tasks are long, unstructured, or unsupported.',
  },
  {
    id: 'attention',
    icon: Eye,
    title: 'Attention and salience',
    subtitle: 'Selecting what matters now and shifting between internal and external information',
    regions: 'Frontal and parietal attention systems, anterior cingulate, insula, and connected sensory regions',
    job: 'Attention is not one switch. The brain must notice relevant information, suppress competing input, sustain a goal, and redirect attention when priorities change.',
    research:
      'Neuroimaging studies associate ADHD with altered coordination across attention, salience, and cognitive-control networks. These are average differences across groups—not a single pattern shared by every person.',
    daily:
      'This may contribute to distractibility, variable response speed, missed details, or attention that is strong in one context and difficult to sustain in another.',
    limit:
      'Being distracted is not specific to ADHD. Sleep loss, anxiety, depression, stress, pain, medication effects, and many other conditions can disrupt the same systems.',
  },
  {
    id: 'reward',
    icon: Sparkles,
    title: 'Reward and motivation',
    subtitle: 'Estimating effort, reward, delay, and whether an action is worth starting',
    regions: 'The striatum and connected frontal circuits involved in reward learning, motivation, and action selection',
    job: 'Reward systems help the brain learn from outcomes and decide which action is worth the effort. Immediate, certain feedback usually has a stronger effect than a distant or uncertain payoff.',
    research:
      'ADHD has been associated with differences in reward processing and, in some studies, a stronger preference for immediate rewards over delayed rewards. This can help explain why context and feedback change performance.',
    daily:
      'A repetitive task with a distant payoff may be harder to initiate or sustain, while immediate feedback, novelty, visible progress, or urgency can make the same person’s performance look very different.',
    limit:
      'This does not mean people with ADHD only care about fun or cannot value long-term goals. It describes how effectively a goal influences behaviour in a particular moment.',
  },
  {
    id: 'coordination',
    icon: Network,
    title: 'Network coordination',
    subtitle: 'Moving between mind-wandering, task focus, and monitoring what deserves attention',
    regions: 'Default-mode, frontoparietal, salience, and task-related networks',
    job: 'The default-mode network is more active during internally focused thought. Task-related control networks support externally directed work. Salience systems help coordinate the switch between them.',
    research:
      'Studies have reported altered communication between default-mode and control networks in ADHD. One proposed explanation is that internally directed activity may intrude during tasks that require sustained external attention.',
    daily:
      'This may feel like losing the thread of a task, drifting into unrelated thought, or repeatedly needing to re-enter “work mode.”',
    limit:
      'The default-mode network is not bad and mind-wandering is not a defect. It supports memory, imagination, and self-reflection. The issue is coordination and timing, not eliminating internal thought.',
  },
] as const;

const executiveFunctions = [
  {
    id: 'inhibition',
    icon: ShieldCheck,
    title: 'Response inhibition',
    brainJob: 'Pause a response long enough to consider the goal, rule, or consequence.',
    daily: 'Interrupting, clicking before reading, acting on the first idea, or struggling to stop an activity once engaged.',
    nuance: 'Impulsivity is affected by context, emotion, fatigue, reward, and learned habits—not only by one brain region.',
  },
  {
    id: 'working-memory',
    icon: Layers3,
    title: 'Working memory',
    brainJob: 'Keep information temporarily active while using it to guide the next step.',
    daily: 'Losing part of an instruction, forgetting what you were about to do, or abandoning a task after an interruption.',
    nuance: 'This is different from long-term memory. The information may be known but unavailable at the moment it is needed.',
  },
  {
    id: 'planning',
    icon: SlidersHorizontal,
    title: 'Planning and sequencing',
    brainJob: 'Turn a broad goal into ordered steps, estimate resources, and monitor progress.',
    daily: 'A project feels like one undifferentiated block; important steps appear only after something goes wrong.',
    nuance: 'A person may plan well for an interesting, familiar task and struggle with a vague or delayed one.',
  },
  {
    id: 'sustained',
    icon: Gauge,
    title: 'Sustained attention',
    brainJob: 'Maintain the task goal and respond consistently over time.',
    daily: 'Performance fades during repetitive work, errors cluster late in a task, or attention varies sharply from moment to moment.',
    nuance: 'ADHD is not a total inability to focus. The consistency and regulation of attention are often more informative than the maximum capacity.',
  },
  {
    id: 'switching',
    icon: RefreshCw,
    title: 'Cognitive flexibility',
    brainJob: 'Disengage from one rule or task, update the goal, and activate a new response set.',
    daily: 'Transitions feel disproportionately difficult, or the brain keeps following the old task after priorities change.',
    nuance: 'Switching costs everyone mental effort. ADHD may make the cost more visible, especially without cues or preparation.',
  },
  {
    id: 'time',
    icon: Clock3,
    title: 'Time and future action',
    brainJob: 'Estimate duration, represent future consequences, and remember to act when a cue occurs later.',
    daily: 'Underestimating how long preparation takes, noticing time only when it becomes urgent, or forgetting an intention when it is out of sight.',
    nuance: '“Time blindness” is a useful everyday phrase, but it is not a formal diagnostic criterion or one single scientific mechanism.',
  },
] as const;

const chemicalSystems = [
  {
    id: 'dopamine',
    name: 'Dopamine',
    accent: '#5b6f96',
    overview:
      'Dopamine is a neuromodulator: instead of carrying one complete thought from one cell to another, it changes how strongly particular circuits respond, learn, and select an action.',
    function:
      'In frontal-striatal circuits, dopamine contributes to reward learning, effort and value estimates, action selection, movement, and the ability to keep goal-relevant information active.',
    relevance:
      'Dopamine-related signalling is one part of ADHD neurobiology. It may help explain why immediate feedback, visible progress, novelty, or urgency can change how strongly a task guides behaviour.',
    caution:
      'ADHD is not a global dopamine shortage, and dopamine is not a “motivation chemical” that can be measured to confirm a diagnosis. Its effects depend on the circuit, receptor, timing, and current state.',
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    accent: '#477f72',
    overview:
      'Norepinephrine helps regulate alertness and the signal-to-noise balance in prefrontal networks. It influences whether task-relevant information is strong enough to guide attention and behaviour.',
    function:
      'Within a useful range, norepinephrine acting in the prefrontal cortex supports working memory, sustained attention, response inhibition, and the stability of goal-related network activity.',
    relevance:
      'This helps explain why attention and control can change with alertness, fatigue, stress, and medication. The same task can be easier when the brain is alert enough but not overloaded.',
    caution:
      'More norepinephrine is not automatically better. Too little alertness can weaken task signals, while very high stress or arousal can also disrupt prefrontal control.',
  },
] as const;

function BrainSystemExplorer() {
  const [selected, setSelected] = useState(0);
  const active = brainSystems[selected];
  const Icon = active.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="space-y-3" role="tablist" aria-label="Brain systems associated with ADHD">
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
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left font-sans transition-all ${
                isActive
                  ? 'border-sage-green bg-sage-green/[0.08] shadow-sm'
                  : 'border-sage-green/15 bg-white hover:border-sage-green/40'
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-sage-green text-warm-cream' : 'bg-warm-cream text-sage-green'}`}>
                <SystemIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold text-foreground">{system.title}</span>
                <span className="mt-1 block text-sm leading-snug text-muted-foreground">{system.subtitle}</span>
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
          className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-green">Connected system</p>
              <h3 className="mt-1 font-serif text-3xl font-bold text-foreground">{active.title}</h3>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {[
              ['Main regions and circuits', active.regions],
              ['What the system normally does', active.job],
              ['What research suggests in ADHD', active.research],
              ['How this may appear in daily life', active.daily],
            ].map(([label, text]) => (
              <div key={label} className="border-l-2 border-sage-green/30 pl-4">
                <p className="font-bold text-foreground">{label}</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex gap-3 rounded-2xl bg-warm-cream p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-green" />
            <div>
              <p className="font-bold text-foreground">Important limit</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.limit}</p>
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
    <div className="rounded-3xl border border-[#4f7659]/15 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Chemical messenger explorer">
        {chemicalSystems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected === index}
            onClick={() => setSelected(index)}
            className={`rounded-full border px-5 py-2.5 font-sans font-bold transition ${
              selected === index
                ? 'border-transparent text-white shadow-sm'
                : 'border-[#4f7659]/20 bg-[#fbf7ed] text-foreground hover:border-[#4f7659]/40'
            }`}
            style={selected === index ? { backgroundColor: item.accent } : undefined}
          >
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8"
        >
          {active.id === 'dopamine' ? (
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="rounded-3xl bg-[#fbf7ed] p-6">
                <p className="text-sm font-bold text-foreground">Simplified dopamine pathway</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This diagram shows how dopamine can influence a decision loop. It is not a map of every dopamine pathway in the brain.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
                  {[
                    {
                      title: 'Cue or goal',
                      text: 'A task, possible reward, rule, or reminder becomes available.',
                    },
                    {
                      title: 'Value and action',
                      text: 'Frontal-striatal circuits weigh effort, expected outcome, and which action to select.',
                    },
                    {
                      title: 'Feedback and learning',
                      text: 'The result updates what the brain expects and which actions are likely next time.',
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="contents">
                      <article className="rounded-2xl border border-[#5b6f96]/20 bg-white p-4 text-center">
                        <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#5b6f96]/10 font-bold text-[#5b6f96]">
                          {index + 1}
                        </span>
                        <h4 className="mt-3 font-bold text-foreground">{item.title}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                      </article>
                      {index < 2 && <ArrowRight className="mx-auto hidden h-5 w-5 self-center text-[#5b6f96]/50 sm:block" />}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#5b6f96]/20 bg-white p-5">
                  <p className="font-bold text-foreground">What dopamine changes</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Dopamine changes the strength and learning of signals inside these circuits. It does not carry a complete instruction such as “start the task.”
                  </p>
                </div>
              </div>

              <ChemicalExplanation active={active} />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="rounded-3xl bg-[#fbf7ed] p-6">
                <p className="text-sm font-bold text-foreground">Prefrontal signal strength</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Prefrontal control tends to work best within a useful range of alertness rather than at either extreme.
                </p>

                <svg viewBox="0 0 360 170" className="mt-4 h-auto w-full" role="img" aria-label="An inverted U curve showing weaker prefrontal control at low and very high arousal and stronger control in a useful middle range">
                  <line x1="28" y1="142" x2="338" y2="142" stroke="#b9b3a8" strokeWidth="2" />
                  <line x1="28" y1="142" x2="28" y2="22" stroke="#b9b3a8" strokeWidth="2" />
                  <path d="M35 133 C90 128, 105 50, 180 35 C255 50, 270 128, 330 133" fill="none" stroke="#477f72" strokeWidth="5" strokeLinecap="round" />
                  <motion.circle
                    cx="180"
                    cy="35"
                    r="7"
                    fill="#477f72"
                    animate={{ r: [6, 9, 6], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text x="180" y="18" textAnchor="middle" fontSize="12" fill="#2c332d" fontWeight="700">Useful range</text>
                  <text x="35" y="162" fontSize="11" fill="#6b6b68">Low alertness</text>
                  <text x="276" y="162" fontSize="11" fill="#6b6b68">High stress / arousal</text>
                  <text transform="translate(13 110) rotate(-90)" fontSize="11" fill="#6b6b68">Prefrontal control</text>
                </svg>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Too little', 'Task signals may be weak; fatigue and under-arousal can make sustained control harder.'],
                    ['Useful range', 'Relevant signals are clearer and working memory can guide behaviour more reliably.'],
                    ['Too much', 'High stress can add noise and reduce flexible, deliberate control.'],
                  ].map(([title, text], index) => (
                    <article key={title} className={`rounded-2xl border p-4 ${index === 1 ? 'border-[#477f72]/35 bg-[#477f72]/[0.08]' : 'border-[#477f72]/15 bg-white'}`}>
                      <h4 className="font-bold text-foreground">{title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
                    </article>
                  ))}
                </div>
              </div>

              <ChemicalExplanation active={active} />
            </div>
          )}

          <div className="mt-7 rounded-2xl border border-[#4f7659]/15 bg-[#4f7659]/[0.05] p-5">
            <p className="font-bold text-foreground">How the two systems work together</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Dopamine and norepinephrine both modulate prefrontal and connected circuits, but they act through different receptors and pathways. Their effects overlap in attention, working memory, motivation, and behavioural control; neither chemical explains ADHD by itself.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ChemicalExplanation({ active }: { active: (typeof chemicalSystems)[number] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4f7659]">Chemical messenger</p>
      <h3 className="mt-2 font-serif text-3xl font-bold text-foreground">{active.name}</h3>
      <p className="mt-4 text-lg leading-relaxed text-foreground">{active.overview}</p>
      <div className="mt-6 space-y-4">
        {[
          ['Main functions', active.function],
          ['Relevance to ADHD', active.relevance],
          ['Important limit', active.caution],
        ].map(([label, text]) => (
          <div key={label} className="border-l-2 pl-4" style={{ borderColor: `${active.accent}55` }}>
            <p className="font-bold text-foreground">{label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutiveFunctionExplorer() {
  const [selected, setSelected] = useState(0);
  const active = executiveFunctions[selected];
  const Icon = active.icon;

  return (
    <div className="rounded-3xl border border-sage-green/15 bg-white p-6 shadow-sm md:p-8">
      <div className="flex gap-3 overflow-x-auto pb-3" role="tablist" aria-label="Executive functions">
        {executiveFunctions.map((item, index) => {
          const ItemIcon = item.icon;
          const isActive = selected === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(index)}
              className={`flex min-w-44 items-center gap-2 rounded-xl border px-4 py-3 text-left font-sans font-semibold transition ${
                isActive
                  ? 'border-sage-green bg-sage-green/[0.08] text-foreground'
                  : 'border-sage-green/15 bg-warm-cream text-muted-foreground hover:border-sage-green/35'
              }`}
            >
              <ItemIcon className="h-5 w-5 shrink-0 text-sage-green" />
              {item.title}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-7"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="font-serif text-3xl font-bold text-foreground">{active.title}</h3>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['The brain’s job', active.brainJob],
              ['What difficulty may look like', active.daily],
              ['The important nuance', active.nuance],
            ].map(([label, text]) => (
              <article key={label} className="rounded-2xl bg-warm-cream p-5">
                <p className="font-bold text-foreground">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function MeetYourBrain() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="Meet Your Brain"
      subtitle="Brain systems, neurochemistry, and executive functions"
      chapterNumber={4}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/what-is')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">ADHD neuroscience</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
            ADHD and the brain
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD research examines how brain development, connected networks, executive control, attention, reward processing, and chemical signalling relate to symptoms. The findings describe patterns across groups and cannot diagnose one individual.
          </p>
        </section>

        <motion.section
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

        <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Interactive map</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Brain regions and connections</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Explore approximate brain regions, then switch to the connections view to see how frontal, parietal, striatal, salience, and cerebellar systems work together.
            </p>
          </div>
          <BrainNetworkViz />
        </motion.section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">From regions to circuits</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Four systems that make the ADHD brain easier to understand</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a system to see its normal job, what studies suggest, how it can appear in daily life, and the limit of the explanation.
            </p>
          </div>
          <BrainSystemExplorer />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Neurochemistry</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Dopamine and norepinephrine</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              These chemical messengers modulate how strongly brain circuits respond. The two diagrams below show different parts of their roles rather than presenting them as the same signal.
            </p>
          </div>
          <ChemicalSignalExplorer />
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Executive functions</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Executive functions</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Executive functions are mental processes used to hold a goal in mind, control a response, organize steps, manage time, sustain attention, and switch tasks. ADHD can affect several of these processes, but the pattern differs between people and situations.
            </p>
          </div>
          <ExecutiveFunctionExplorer />
        </section>

        <section className="rounded-3xl border border-[#4f7659]/15 bg-white p-7 shadow-sm md:p-8">
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
                text: 'Long duration, repetition, delayed reward, unclear steps, interruptions, and too many choices increase the amount of control the task requires.',
              },
              {
                icon: Gauge,
                title: 'Current state',
                text: 'Sleep, stress, mood, hunger, pain, arousal, and medication can change how consistently attention and working memory are available.',
              },
              {
                icon: SlidersHorizontal,
                title: 'External support',
                text: 'Visible instructions, immediate feedback, shorter steps, reminders, accountability, and a quieter environment can reduce the load on executive functions.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-[#fbf7ed] p-5">
                <Icon className="h-5 w-5 text-[#4f7659]" />
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#4f7659]/15 bg-[#4f7659]/[0.05] p-5">
            <p className="font-bold text-foreground">What this means</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Doing something successfully once shows that the skill exists. It does not prove that the same level of access will be available under different demands, stress, fatigue, or support. Performance variability is not the same as lack of effort.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-foreground">Emotional regulation</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              Difficulty regulating emotion is common in ADHD and can be highly impairing, although it is not one of the core DSM symptom lists. Executive-control, reward, and emotion systems interact, so frustration may rise quickly and take longer to settle.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              It should not automatically be attributed to ADHD. Anxiety, depression, trauma, sleep disruption, autism, bipolar disorder, and other conditions can affect emotions and may require separate assessment.
            </p>
          </article>

          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-foreground">Movement and timing</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              ADHD research extends beyond the frontal lobes. The basal ganglia, cerebellum, and their connections with the cortex contribute to timing, movement, learning, and the coordination of cognitive control.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This does not mean ADHD is a movement disorder or that one structure explains the condition. It reinforces the idea that ADHD involves distributed circuits.
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
    </ChapterLayout>
  );
}
