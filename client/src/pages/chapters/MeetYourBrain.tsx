import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  Brain,
  BrainCircuit,
  Eye,
  Gauge,
  HelpCircle,
  Info,
  Network,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';
import Brain3DVisualizer, { RegionId, CircuitId } from '@/components/Brain3DVisualizer';

// Detail block interface matching official MeetYourBrain / BrainNetworkViz
interface ContentBlock {
  lead: string;
  highlight: string;
  rest: string;
}

interface BrainRegion {
  id: RegionId;
  name: string;
  shortName: string;
  color: string;
  role: string;
  function: ContentBlock;
  research: ContentBlock;
  daily: ContentBlock;
  limit: ContentBlock;
}

interface BrainCircuit {
  id: CircuitId;
  name: string;
  color: string;
  nodeIds: RegionId[];
  role: ContentBlock;
  research: ContentBlock;
  daily: ContentBlock;
}

const regions: BrainRegion[] = [
  {
    id: 'pfc',
    name: 'Prefrontal Cortex (dlPFC & Frontal Pole)',
    shortName: 'Prefrontal Cortex (dlPFC)',
    color: '#4f7659',
    role: 'Holding goals in working memory and guiding execution (BA 9, 10, 46)',
    function: {
      lead: 'The prefrontal cortex acts like your brain’s project manager. It handles working memory, planning, pausing before reacting, and switching between tasks. Its primary job is to ',
      highlight: 'keep your long-term goal active long enough to guide what you do next',
      rest: ', rather than letting immediate impulses take over.',
    },
    research: {
      lead: 'Brain imaging shows group differences in how easily the frontal lobe communicates with deeper action and reward hubs. Crucially, ',
      highlight: 'this is not a brain injury, defect, or measure of intelligence',
      rest: '—it reflects differences in how consistently attention signals are sent and received.',
    },
    daily: {
      lead: 'This explains why you might clearly know what you should be doing, yet ',
      highlight: 'struggle intensely to begin or stay on track without external structure',
      rest: ', visual reminders, or immediate deadlines.',
    },
    limit: {
      lead: 'The prefrontal cortex is a broad network of interconnected regions, not a single on/off switch. ',
      highlight: 'A brain scan cannot diagnose ADHD in an individual',
      rest: '; diagnosis is always based on real-world developmental patterns and life impact.',
    },
  },
  {
    id: 'parietal',
    name: 'Posterior Parietal Cortex (PPC)',
    shortName: 'Posterior Parietal (PPC)',
    color: '#857004',
    role: 'Steering the attentional spotlight and spatial tracking (BA 7, 40)',
    function: {
      lead: 'The parietal cortex acts like an attentional spotlight. Working alongside the frontal lobe, it helps you ',
      highlight: 'orient your focus toward important details and redirect your attention',
      rest: ' when priorities shift.',
    },
    research: {
      lead: 'Studies during focus tasks show that frontoparietal networks fluctuate in stability. When an activity feels repetitive or unrewarding, ',
      highlight: 'the spotlight easily wanders toward novel background signals',
      rest: ', even when you try hard to resist.',
    },
    daily: {
      lead: 'This shows up as suddenly losing your place in a document, ',
      highlight: 'missing a detail right in front of your eyes',
      rest: ', or feeling your train of thought derailed by a minor movement or background sound.',
    },
    limit: {
      lead: 'Attention relies on multiple parietal circuits working together. The highlighted area is a simplified map to ',
      highlight: 'illustrate general position, not a rigid physical boundary',
      rest: '.',
    },
  },
  {
    id: 'acc',
    name: 'Anterior Cingulate Cortex (dACC)',
    shortName: 'Anterior Cingulate (dACC)',
    color: '#925e76',
    role: 'Error detection, conflict monitoring, and effort valuation (BA 24, 32)',
    function: {
      lead: 'The anterior cingulate functions like an internal smoke detector. It helps ',
      highlight: 'detect errors, notice conflicts, and signal when more mental effort is needed',
      rest: ' to solve a problem or switch approaches.',
    },
    research: {
      lead: 'Research shows this monitoring system can take longer to trigger during repetitive tasks in ADHD. ',
      highlight: 'Error awareness often arrives with a delay',
      rest: ', which is why typos or misplaced items can slip by unnoticed in the moment.',
    },
    daily: {
      lead: 'You might only realize a mistake after finishing a task, ',
      highlight: 'persist with an ineffective approach for too long',
      rest: ', or suddenly recognize an hour has passed on a detour before your brain signals that you went off course.',
    },
    limit: {
      lead: 'This region sits deep on the inner midline arching over the corpus callosum. In the 3D model, ',
      highlight: 'the cortex turns translucent so you can see its exact interior position',
      rest: '.',
    },
  },
  {
    id: 'striatum',
    name: 'Striatum (Caudate & Putamen)',
    shortName: 'Striatum (Basal Ganglia)',
    color: '#a96952',
    role: 'Action selection, reward evaluation, and dopamine motivation',
    function: {
      lead: 'Nested deep inside the brain, the striatum acts as your motivation gateway. It connects to frontal circuits to ',
      highlight: 'calculate whether an action is worth the mental effort',
      rest: ' based on expected reward, novelty, and urgency.',
    },
    research: {
      lead: 'Frontal-striatal pathways rely heavily on dopamine signaling. In ADHD, ',
      highlight: 'delayed or abstract payoffs trigger much weaker dopamine signaling',
      rest: ' compared to immediate, exciting, or crisis-driven consequences.',
    },
    daily: {
      lead: 'This explains why starting tasks with distant deadlines feels physically exhausting, while ',
      highlight: 'novelty, curiosity, or emergency deadlines suddenly unlock hours of intense focus',
      rest: ' ("hyperfocus").',
    },
    limit: {
      lead: 'The striatum is an internal cluster of deep subcortical nuclei (caudate nucleus, putamen, and nucleus accumbens) ',
      highlight: 'tucked deep within the center of the brain',
      rest: ', illuminated here in true 3D spatial alignment.',
    },
  },
  {
    id: 'insula',
    name: 'Insular Cortex (Salience Hub)',
    shortName: 'Insular Cortex (BA 13)',
    color: '#5f9aaa',
    role: 'Spotting urgent body signals and shifting mental priorities (BA 13)',
    function: {
      lead: 'The insula bridges internal bodily sensations with external events. It helps the brain ',
      highlight: 'decide what is most urgent right now',
      rest: ' by tuning into physical sensations, emotional spikes, and sensory input.',
    },
    research: {
      lead: 'The insula is a core hub of the "salience network." In ADHD, ',
      highlight: 'it can amplify sudden sensory or emotional signals',
      rest: ', making minor irritations or urgent impulses feel overpowering.',
    },
    daily: {
      lead: 'A sudden notification chime, an itchy tag, or a sharp wave of frustration can ',
      highlight: 'instantly hijack your working memory',
      rest: ', causing you to abandon what you were doing to put out the immediate fire.',
    },
    limit: {
      lead: 'The insula is tucked deep beneath the frontal and temporal folds inside the lateral sulcus, ',
      highlight: 'highlighted here with translucent cortex for structural orientation',
      rest: '.',
    },
  },
  {
    id: 'cerebellum',
    name: 'Cerebellar Hemispheres & Vermis',
    shortName: 'Cerebellum (Internal Clock)',
    color: '#7e8249',
    role: 'Internal clock, temporal estimation, and sequence pacing',
    function: {
      lead: 'Long recognized for motor balance, the cerebellum also plays a critical cognitive role in ',
      highlight: 'internal timing, predicting sequence steps, and coordinating thoughts',
      rest: ' with the frontal cortex.',
    },
    research: {
      lead: 'Neurodevelopmental studies link cerebellar timing circuits to ADHD, ',
      highlight: 'directly impacting the brain’s intuitive sense of passing time',
      rest: ' and the rhythm of multi-step task execution.',
    },
    daily: {
      lead: 'This contributes directly to "time blindness"—',
      highlight: 'difficulty estimating how long a task will take',
      rest: ', struggling to pace multi-step projects, or losing track of how fast an hour has flown by.',
    },
    limit: {
      lead: 'The cerebellum sits at the base of the skull beneath the occipital lobes and works in ',
      highlight: 'continuous two-way feedback with the cortex',
      rest: ' rather than as an isolated structure.',
    },
  },
];

const circuits: BrainCircuit[] = [
  {
    id: 'control-action',
    name: 'Frontostriatal Network (Control & Action)',
    color: '#a96952',
    nodeIds: ['pfc', 'acc', 'striatum'],
    role: {
      lead: 'Connects goal-setting in dlPFC with error detection in dACC and dopamine motivation in the striatum to ',
      highlight: 'translate intentions into physical actions and learn from results',
      rest: '.',
    },
    research: {
      lead: 'Frontal-striatal networks are among the most extensively studied in ADHD. Findings show ',
      highlight: 'variable signaling during unrewarding or delayed tasks',
      rest: ', with substantial differences between individuals.',
    },
    daily: {
      lead: 'Essential for pausing before reacting, ',
      highlight: 'breaking through the initial wall to start a task',
      rest: ', and adapting when plans change.',
    },
  },
  {
    id: 'attention',
    name: 'Frontoparietal Network (Attention Control)',
    color: '#5b6f96',
    nodeIds: ['pfc', 'parietal', 'insula'],
    role: {
      lead: 'Coordinates long-term goals in dlPFC with the real-time spotlight of the posterior parietal cortex (BA 7/40) to ',
      highlight: 'steer focus toward what matters and tune out distractions',
      rest: '.',
    },
    research: {
      lead: 'Frontoparietal attention networks show fluctuations during sustained tasks, meaning ',
      highlight: 'attention is not absent, but is hard to allocate on command',
      rest: ' without high interest.',
    },
    daily: {
      lead: 'Critical for remembering instructions while carrying them out, ',
      highlight: 'resisting notifications, and smoothly returning to work',
      rest: ' after an interruption.',
    },
  },
  {
    id: 'monitoring',
    name: 'Salience Network (Monitoring & Priority)',
    color: '#925e76',
    nodeIds: ['insula', 'acc', 'pfc'],
    role: {
      lead: 'Balances urgent sensory/emotional events in the anterior insula (BA 13) with conflict detection in dACC to ',
      highlight: 'decide which signal deserves immediate mental resources',
      rest: '.',
    },
    research: {
      lead: 'Studies indicate altered coordination between salience and default-mode networks, ',
      highlight: 'allowing internal mind-wandering or sudden stimuli to interrupt tasks',
      rest: '.',
    },
    daily: {
      lead: 'Explains why an interesting tangential thought or an urgent email ',
      highlight: 'can effortlessly hijack several hours of your workday',
      rest: '.',
    },
  },
  {
    id: 'timing',
    name: 'Cerebello-Striato-Prefrontal Loop (Internal Timing)',
    color: '#7e8249',
    nodeIds: ['pfc', 'striatum', 'cerebellum'],
    role: {
      lead: 'Combines prefrontal planning, striatal dopamine motivation, and cerebellar vermis time-tracking to ',
      highlight: 'pace actions smoothly and manage transitions between activities',
      rest: '.',
    },
    research: {
      lead: 'Frontal-striatal-cerebellar pathways show differences during timing tasks, ',
      highlight: 'correlating with intuitive difficulty measuring the passage of time',
      rest: '.',
    },
    daily: {
      lead: 'Crucial for estimating deadlines, ',
      highlight: 'knowing when to stop one activity to prepare for the next',
      rest: ', and avoiding chronic lateness.',
    },
  },
];

function DetailSection({
  label,
  block,
  accentColor,
  icon: SectionIcon,
}: {
  label: string;
  block: ContentBlock;
  accentColor?: string;
  icon?: typeof Info;
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-2xs transition-all duration-300 hover:border-sage-green/40 hover:shadow-xs">
      <div className="flex items-center gap-2">
        {SectionIcon && (
          <SectionIcon
            className="h-4 w-4 shrink-0"
            style={{ color: accentColor || '#4f7659' }}
          />
        )}
        <h4 className="font-sans font-bold text-sm sm:text-base text-foreground tracking-wide">
          {label}
        </h4>
      </div>
      <p className="mt-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90 font-normal">
        {block.lead}
        <strong className="font-semibold text-foreground" style={accentColor ? { color: accentColor } : undefined}>
          {block.highlight}
        </strong>
        {block.rest}
      </p>
    </div>
  );
}

function CircuitRelationship({ circuit }: { circuit: BrainCircuit }) {
  const nodeRegions = circuit.nodeIds
    .map((id) => regions.find((r) => r.id === id))
    .filter(Boolean) as BrainRegion[];

  return (
    <div className="mt-5 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: circuit.color }}>
        Network components
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {nodeRegions.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3 text-xs leading-snug"
          >
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
              <span className="truncate">{r.shortName}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">{r.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const [view, setView] = useState<'regions' | 'connections'>('regions');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('pfc');
  const [selectedCircuitId, setSelectedCircuitId] = useState<CircuitId>('control-action');
  const [selectedSystemId, setSelectedSystemId] = useState<'control' | 'attention' | 'reward' | 'coordination'>('control');

  const selectedRegion = useMemo(
    () => regions.find((r) => r.id === selectedRegionId) ?? regions[0],
    [selectedRegionId]
  );
  const selectedCircuit = useMemo(
    () => circuits.find((c) => c.id === selectedCircuitId) ?? circuits[0],
    [selectedCircuitId]
  );
  const activeSystem = useMemo(
    () => brainSystems.find((sys) => sys.id === selectedSystemId) ?? brainSystems[0],
    [selectedSystemId]
  );

  const selectRegion = (id: RegionId) => {
    setSelectedRegionId(id);
    if (view === 'connections') setView('regions');
  };

  return (
    <ChapterLayoutWide
      title="Meet Your Brain"
      subtitle="The neurobiology of attention, reward, and executive control—explained clearly without moralizing."
      chapterNumber={4}
      totalChapters={8}
      badgeText="Chapter 4 · Neuroscience"
      estimatedReadingTime="8 min read"
      bgClass="bg-[#F4F7F9]"
      accentColor="#3a596d"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/what-is')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <div className="space-y-16">
        {/* Section 1: Why neuroscience matters */}
        <section id="why-neuroscience" data-page-label="Why neuroscience matters">
          <div className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Why neuroscience matters</h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-foreground">
              <p>
                People with ADHD spend much of their lives being told—directly or subtly—that their difficulties are character flaws. “You’re just lazy.” “You just need to try harder.” “You’re so smart; if you only applied yourself.”
              </p>
              <p>
                Neuroscience matters because it replaces moral failure with neurobiological reality. The ADHD brain is structurally, functionally, and chemically different in specific, measurable ways. These differences don’t make you broken; they explain why traditional advice often fails and what actually helps.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Research limits */}
        <section id="research-limits" data-page-label="Research limits">
          <div className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.05] p-7 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Research limits</h2>
            <p className="mt-3 leading-relaxed text-foreground">
              “Associated with ADHD” means researchers found an average relationship—not that every person has the same brain pattern, that the pattern causes every symptom, or that imaging can confirm a diagnosis. ADHD remains a clinical diagnosis based on development, symptoms, impairment, and context.
            </p>
          </div>
        </section>

        {/* Section 3: UNIFIED 3D INTERACTIVE BRAIN MAP */}
        <section id="brain-map" data-page-label="Brain map">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Interactive 3D map</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Brain regions and connections</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Explore approximate brain regions in full 3D, then switch to the connections view to see how frontal, parietal, striatal, salience, and cerebellar systems work together.
            </p>
          </div>

          {/* Unified Container replicating BrainNetworkViz layout */}
          <div className="mx-auto w-full overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
            {/* Header with View Tabs */}
            <div className="flex flex-col gap-4 border-b border-sage-green/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-foreground text-lg">Brain regions and connected systems</p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">
                  Drag the 3D model to rotate 360°. Select a region below to isolate surface cortex or expose deep internal frontostriatal hubs.
                </p>
              </div>
              <div className="inline-flex self-start rounded-xl border border-sage-green/15 bg-warm-cream p-1" role="tablist" aria-label="Brain diagram view">
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === 'regions'}
                  onClick={() => setView('regions')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                    view === 'regions' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <ScanSearch className="h-4 w-4" /> Regions
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === 'connections'}
                  onClick={() => setView('connections')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                    view === 'connections' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Network className="h-4 w-4" /> Connections
                </button>
              </div>
            </div>

            {/* Split Layout: Left 3D Canvas & Buttons | Right Detail Cards */}
            <div className="grid min-w-0 lg:grid-cols-[1.12fr_0.88fr]">
              {/* Left Column: 3D Brain Viewer & Region Pills */}
              <div className="min-w-0 border-b border-sage-green/10 bg-[#fbf7ed] p-4 sm:p-6 lg:border-b-0 lg:border-r">
                {/* Authentic 3D Brain Visualizer */}
                <Brain3DVisualizer
                  view={view}
                  selectedRegionId={selectedRegionId}
                  selectedCircuitId={selectedCircuitId}
                  onSelectRegion={selectRegion}
                />

                {/* Region Selection Buttons */}
                {view === 'regions' ? (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Brain regions">
                    {regions.map((region) => {
                      const active = region.id === selectedRegionId;
                      return (
                        <button
                          key={region.id}
                          type="button"
                          onClick={() => setSelectedRegionId(region.id)}
                          className="min-w-0 rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4 shadow-2xs"
                          style={{
                            borderColor: active ? region.color : `${region.color}55`,
                            backgroundColor: active ? region.color : '#ffffff',
                            color: active ? '#ffffff' : region.color,
                          }}
                        >
                          {region.shortName}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-2" aria-label="Brain connections">
                    {circuits.map((circuit) => {
                      const active = circuit.id === selectedCircuitId;
                      return (
                        <button
                          key={circuit.id}
                          type="button"
                          onClick={() => setSelectedCircuitId(circuit.id)}
                          className="rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4 shadow-2xs"
                          style={{
                            borderColor: active ? circuit.color : `${circuit.color}55`,
                            backgroundColor: active ? circuit.color : '#ffffff',
                            color: active ? '#ffffff' : circuit.color,
                          }}
                        >
                          {circuit.name}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Quick Anatomical Insight Banner */}
                <div className="mt-5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage-green/10 text-sage-green mt-0.5">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="text-xs leading-relaxed text-stone-700">
                    <strong className="font-semibold text-foreground">3D Neuroanatomy Note: </strong>
                    When you select internal structures like the <strong>Striatum</strong> or <strong>Anterior Cingulate</strong>, the cerebral cortex becomes semi-transparent so you can inspect their exact 3D positioning inside the frontostriatal loop.
                  </div>
                </div>

                {view === 'connections' && <CircuitRelationship circuit={selectedCircuit} />}
              </div>

              {/* Right Column: Exact Detail Cards */}
              <div className="min-w-0 p-5 sm:p-7 lg:sticky lg:top-6 lg:self-start">
                <AnimatePresence mode="wait">
                  {view === 'regions' ? (
                    <motion.div
                      key={selectedRegion.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <span
                          className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
                          style={{ backgroundColor: selectedRegion.color }}
                        >
                          Brain region
                        </span>
                        <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                          {selectedRegion.name}
                        </h3>
                        <p
                          className="mt-2 text-base sm:text-lg font-semibold leading-relaxed"
                          style={{ color: selectedRegion.color }}
                        >
                          {selectedRegion.role}
                        </p>
                      </div>
                      <div className="space-y-3.5 pt-1">
                        <DetailSection
                          label="Main function"
                          block={selectedRegion.function}
                          accentColor={selectedRegion.color}
                          icon={Target}
                        />
                        <DetailSection
                          label="ADHD research"
                          block={selectedRegion.research}
                          accentColor={selectedRegion.color}
                          icon={Brain}
                        />
                        <DetailSection
                          label="Possible everyday relevance"
                          block={selectedRegion.daily}
                          accentColor={selectedRegion.color}
                          icon={Activity}
                        />
                        <DetailSection
                          label="Anatomical limitation"
                          block={selectedRegion.limit}
                          accentColor={selectedRegion.color}
                          icon={HelpCircle}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={selectedCircuit.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <span
                          className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
                          style={{ backgroundColor: selectedCircuit.color }}
                        >
                          Connected system
                        </span>
                        <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                          {selectedCircuit.name}
                        </h3>
                        <p
                          className="mt-2 text-base sm:text-lg font-semibold leading-relaxed"
                          style={{ color: selectedCircuit.color }}
                        >
                          {selectedCircuit.nodeIds
                            .map((id) => regions.find((r) => r.id === id)?.shortName)
                            .join(' · ')}
                        </p>
                      </div>
                      <div className="space-y-3.5 pt-1">
                        <DetailSection
                          label="What this system coordinates"
                          block={selectedCircuit.role}
                          accentColor={selectedCircuit.color}
                          icon={Network}
                        />
                        <DetailSection
                          label="What research suggests"
                          block={selectedCircuit.research}
                          accentColor={selectedCircuit.color}
                          icon={Brain}
                        />
                        <DetailSection
                          label="Possible everyday relevance"
                          block={selectedCircuit.daily}
                          accentColor={selectedCircuit.color}
                          icon={Activity}
                        />
                      </div>
                      <div className="mt-4 flex gap-3 rounded-2xl bg-warm-cream/90 border border-sage-green/15 p-4 sm:p-5">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-green" />
                        <p className="text-sm leading-relaxed text-stone-700">
                          <strong className="font-semibold text-foreground">Distributed communication: </strong>
                          Connection mode colors the anatomical regions involved in this system. Real communication occurs through flexible, reciprocal pathways across millions of neurons rather than a single wire.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Brain Systems Explorer */}
        <section id="brain-systems" data-page-label="Brain systems" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">From regions to circuits</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Four systems that make the ADHD brain easier to understand</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a system to see its normal job, what studies suggest, how it can appear in daily life, and the limit of the explanation.
            </p>
          </div>

          <div className="rounded-3xl border border-sage-green/15 bg-white p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {brainSystems.map((sys) => {
                const Icon = sys.icon;
                const active = sys.id === selectedSystemId;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setSelectedSystemId(sys.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                      active
                        ? 'border-sage-green bg-sage-green/10 text-sage-green shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-sage-green/40'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-xs sm:text-sm font-bold">{sys.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{activeSystem.title}</h3>
                <p className="text-sm font-semibold text-sage-green mt-1">{activeSystem.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">Involved structures: {activeSystem.regions}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sage-green mb-1.5">What this system normally does</p>
                  <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: activeSystem.job }} />
                </div>
                <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sage-green mb-1.5">What ADHD research suggests</p>
                  <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: activeSystem.research }} />
                </div>
                <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sage-green mb-1.5">How it can look in daily life</p>
                  <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: activeSystem.daily }} />
                </div>
                <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-sage-green mb-1.5">Limits of the explanation</p>
                  <p className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: activeSystem.limit }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Neurochemistry (Dopamine and Norepinephrine) */}
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

        {/* Section 6: Executive Functions Card Link */}
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

        {/* Section 7: Context and performance */}
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

        {/* Section 8: Source list */}
        <SourceList
          sources={[
            {
              title: 'Interactive 3D Brain Anatomy Models',
              organization: 'BrainFacts.org / Society for Neuroscience & Wellcome Trust',
              url: 'https://www.brainfacts.org/3d-brain#intro=false&focus=Brain',
              note: 'Anatomical cortical meshes and deep subcortical structures reviewed by John Morrison, Patrick Hof, and Edward Lein.',
            },
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
      </div>
    </ChapterLayoutWide>
  );
}
