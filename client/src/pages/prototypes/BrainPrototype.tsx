import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Eye,
  Info,
  Layers,
  Network,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';

type DiagramView = 'medial' | 'lateral' | 'circuits';

type RegionId =
  | 'pfc'
  | 'acc'
  | 'striatum'
  | 'nacc'
  | 'thalamus'
  | 'vta'
  | 'cerebellum'
  | 'brainstem'
  | 'callosum'
  | 'parietal'
  | 'temporal'
  | 'insula';

interface ContentBlock {
  lead: string;
  highlight: string;
  rest: string;
}

interface BrainRegionData {
  id: RegionId;
  name: string;
  subtitle: string;
  view: 'medial' | 'lateral' | 'both';
  color: string;
  glowColor: string;
  role: string;
  function: ContentBlock;
  neurobiology: ContentBlock;
  dailyLife: ContentBlock;
  clinicalLimit: ContentBlock;
}

interface NeuralCircuitData {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  regions: RegionId[];
  role: ContentBlock;
  mechanism: ContentBlock;
  livedExperience: ContentBlock;
}

const REGIONS: Record<RegionId, BrainRegionData> = {
  acc: {
    id: 'acc',
    name: 'Anterior Cingulate Cortex (ACC)',
    subtitle: 'The Conflict & Error Monitor',
    view: 'medial',
    color: '#925e76',
    glowColor: 'rgba(146, 94, 118, 0.45)',
    role: 'Detecting errors, tracking cognitive friction, and signaling when extra mental effort is required.',
    function: {
      lead: 'The anterior cingulate arches directly over the anterior corpus callosum. It serves as your brain’s internal smoke detector, ',
      highlight: 'monitoring task conflicts, detecting discrepancies, and signaling when goals need more effort',
      rest: ' to stay on course.',
    },
    neurobiology: {
      lead: 'In ADHD, event-related potential (ERP) studies show that Error-Related Negativity (ERN) signals are frequently delayed or blunted. ',
      highlight: 'The brain does not automatically sound the alarm when attention drifts or errors happen',
      rest: ', leading to delays in noticing typos, missed steps, or conversational detours.',
    },
    dailyLife: {
      lead: 'You might only realize a mistake after finishing an entire document, ',
      highlight: 'persist with an ineffective approach far too long',
      rest: ', or suddenly recognize an hour has evaporated before your brain signals that you went off track.',
    },
    clinicalLimit: {
      lead: 'The ACC is visible only in the medial cutaway view between the two hemispheres. ',
      highlight: 'A brain scan cannot measure individual ACC function for clinical diagnosis',
      rest: '; ADHD diagnosis remains strictly grounded in real-world developmental persistence and functional impairment.',
    },
  },
  striatum: {
    id: 'striatum',
    name: 'Striatum (Caudate & Putamen)',
    subtitle: 'The Motivation & Action Selection Gate',
    view: 'medial',
    color: '#a96952',
    glowColor: 'rgba(169, 105, 82, 0.45)',
    role: 'Evaluating effort vs. reward, filtering actions, and initiating behavioral execution.',
    function: {
      lead: 'Nested deep inside the subcortical core, the striatum acts as an action selection gateway. It connects prefrontal goals to physical execution by ',
      highlight: 'calculating whether a task is worth the immediate mental effort',
      rest: ' based on anticipated payoff, novelty, and urgency.',
    },
    neurobiology: {
      lead: 'Frontostriatal circuits are dense with Dopamine D1/D2 receptors and dopamine active transporters (DAT). In ADHD, ',
      highlight: 'delayed or abstract rewards generate significantly weaker baseline dopamine signaling',
      rest: ' than immediate, novel, or crisis consequences (delay discounting).',
    },
    dailyLife: {
      lead: 'This explains why starting an important task with a distant deadline feels physically impossible, yet ',
      highlight: 'a sudden emergency deadline or exciting new curiosity triggers hours of effortless flow',
      rest: ' ("hyperfocus"). It is an ignition block, not a lack of caring.',
    },
    clinicalLimit: {
      lead: 'The striatum is an internal subcortical structure. While group fMRI studies show altered frontostriatal connectivity, ',
      highlight: 'individual striatal differences overlap with neurotypical populations',
      rest: ', making scans clinically non-diagnostic.',
    },
  },
  nacc: {
    id: 'nacc',
    name: 'Nucleus Accumbens (Ventral Striatum)',
    subtitle: 'The Dopamine Reward Core',
    view: 'medial',
    color: '#c27d38',
    glowColor: 'rgba(194, 125, 56, 0.45)',
    role: 'Processing immediate pleasure, reward anticipation, and emotional motivation.',
    function: {
      lead: 'Located at the base of the anterior striatum, the nucleus accumbens translates dopamine signals into ',
      highlight: 'the subjective feeling of excitement, anticipation, and craving',
      rest: ' for rewarding experiences.',
    },
    neurobiology: {
      lead: 'Receives direct dopamine projections from the Ventral Tegmental Area (VTA) via the mesolimbic pathway. ',
      highlight: 'Stimulant medications increase extracellular dopamine here and in the prefrontal cortex',
      rest: ', helping bridge the reward gap for routine, low-stimulation tasks.',
    },
    dailyLife: {
      lead: 'Provides the neurological basis for dopamine-seeking behaviors: ',
      highlight: 'restless phone-checking, impulsive snacking, or rapid hyperfixation jumps',
      rest: ' when working memory feels under-stimulated.',
    },
    clinicalLimit: {
      lead: 'Reward sensitivity varies naturally across humans. ',
      highlight: 'High reward-seeking is not unique to ADHD',
      rest: ' and must be evaluated alongside developmental history and executive dysfunction.',
    },
  },
  pfc: {
    id: 'pfc',
    name: 'Prefrontal Cortex (dlPFC & mPFC)',
    subtitle: 'The Executive Project Manager',
    view: 'both',
    color: '#4f7659',
    glowColor: 'rgba(79, 118, 89, 0.45)',
    role: 'Holding goals active in working memory, inhibiting impulses, and coordinating execution.',
    function: {
      lead: 'The prefrontal cortex acts like your brain’s conductor. Its primary job is to ',
      highlight: 'keep your long-term intentions active long enough to guide what you do next',
      rest: ', preventing immediate environmental impulses from hijacking your trajectory.',
    },
    neurobiology: {
      lead: 'Amy Arnsten’s research proves the prefrontal cortex operates on an inverted-U curve: ',
      highlight: 'Norepinephrine stimulates alpha-2A receptors to boost signal clarity, while Dopamine stimulates D1 receptors to cancel internal noise',
      rest: '. In ADHD, baseline signaling is often suboptimal without high interest or medication.',
    },
    dailyLife: {
      lead: 'Explains the "intention-action gap": ',
      highlight: 'you clearly know exactly what you need to do, but your brain cannot reliably bridge that knowledge into physical execution',
      rest: ' without point-of-performance external structures.',
    },
    clinicalLimit: {
      lead: 'The prefrontal cortex matures continuously into the late twenties. ',
      highlight: 'ADHD reflects a 2-3 year developmental delay in cortical thickness peak',
      rest: ', not permanent brain damage or lower intellectual capability.',
    },
  },
  thalamus: {
    id: 'thalamus',
    name: 'Thalamus',
    subtitle: 'The Central Sensory & Motor Relay Hub',
    view: 'medial',
    color: '#4e72a2',
    glowColor: 'rgba(78, 114, 162, 0.45)',
    role: 'Relaying sensory and motor signals between the basal ganglia, cerebellum, and cerebral cortex.',
    function: {
      lead: 'Sitting centrally beneath the ventricles, the thalamus functions as the brain’s grand central station. ',
      highlight: 'Every sensory signal (except smell) passes through the thalamus',
      rest: ' to be filtered and prioritized before reaching conscious awareness.',
    },
    neurobiology: {
      lead: 'In ADHD, the thalamic sensory gating mechanism can be more porous. ',
      highlight: 'Background noises, visual flickers, or physical sensations are not filtered out efficiently',
      rest: ', forcing prefrontal executive networks to work twice as hard to stay focused.',
    },
    dailyLife: {
      lead: 'Manifests as sensory sensitivity: ',
      highlight: 'inability to tune out an air conditioner, ticking clock, or fluorescent hum',
      rest: ' while trying to read or concentrate.',
    },
    clinicalLimit: {
      lead: 'The thalamus coordinates complex subcortical feedback loops. ',
      highlight: 'Thalamic gating differences occur across autism, sensory processing disorders, and anxiety',
      rest: ', requiring differential clinical evaluation.',
    },
  },
  vta: {
    id: 'vta',
    name: 'VTA & Substantia Nigra',
    subtitle: 'The Dopamine Synthesis Factory',
    view: 'medial',
    color: '#d46b43',
    glowColor: 'rgba(212, 107, 67, 0.45)',
    role: 'Synthesizing dopamine and projecting it across mesocortical and mesolimbic pathways.',
    function: {
      lead: 'Located in the upper midbrain, these clusters of specialized neurons are the birthplace of ',
      highlight: 'the vast majority of dopamine used by your forebrain and striatum',
      rest: '.',
    },
    neurobiology: {
      lead: 'Dopamine neurons fire in two modes: tonic (steady baseline hum) and phasic (bursts triggered by reward). ',
      highlight: 'ADHD is characterized by lower tonic baseline firing, making the brain crave sudden novelty or crisis to generate phasic dopamine',
      rest: '.',
    },
    dailyLife: {
      lead: 'Explains why crisis mode feels regulating: ',
      highlight: 'an emergency triggers noradrenaline and dopamine surges',
      rest: ' that temporarily wake up an under-aroused nervous system.',
    },
    clinicalLimit: {
      lead: 'Neurotransmitter levels cannot be measured in a living human brain via blood tests or saliva. ',
      highlight: 'Commercial tests claiming to measure brain dopamine levels are scientifically invalid',
      rest: '.',
    },
  },
  cerebellum: {
    id: 'cerebellum',
    name: 'Cerebellum & Arbor Vitae',
    subtitle: 'The Internal Clock & Sequence Coordinator',
    view: 'both',
    color: '#7e8249',
    glowColor: 'rgba(126, 130, 73, 0.45)',
    role: 'Calibrating time perception, sequence prediction, and subconscious cognitive rhythms.',
    function: {
      lead: 'Nestled at the base of the skull, the cerebellum contains more neurons than the rest of the brain combined. Beyond physical balance, it coordinates ',
      highlight: 'internal temporal pacing, predicting sequence steps, and cognitive rhythm',
      rest: ' in close collaboration with the prefrontal cortex.',
    },
    neurobiology: {
      lead: 'Structural and functional neuroimaging consistently shows reduced cerebellar volume and altered fronto-cerebellar timing loops in ADHD. ',
      highlight: 'This directly impairs the brain’s intuitive internal stopwatch',
      rest: '.',
    },
    dailyLife: {
      lead: 'Directly drives "time blindness": ',
      highlight: 'inability to intuitively feel time passing, underestimating project durations by 300%, or living in two states: NOW vs. NOT NOW',
      rest: '.',
    },
    clinicalLimit: {
      lead: 'Cerebellar timing loops operate subconsciously. ',
      highlight: 'Time blindness is a biological symptom of cerebellar-prefrontal timing disconnect',
      rest: ', not a moral character flaw or lack of discipline.',
    },
  },
  brainstem: {
    id: 'brainstem',
    name: 'Brainstem & Locus Coeruleus',
    subtitle: 'The Noradrenaline Arousal Hub',
    view: 'medial',
    color: '#657786',
    glowColor: 'rgba(101, 119, 134, 0.45)',
    role: 'Regulating physiological arousal, alertness, and norepinephrine distribution.',
    function: {
      lead: 'The brainstem houses the locus coeruleus, the principal site for ',
      highlight: 'brain norepinephrine (noradrenaline) synthesis',
      rest: ', controlling whether you feel awake, alert, or sluggish.',
    },
    neurobiology: {
      lead: 'Norepinephrine sets the signal-to-noise ratio in the prefrontal cortex via alpha-2A receptors. ',
      highlight: 'Non-stimulants (atomoxetine, viloxazine) and alpha-2 agonists (clonidine, guanfacine) target these exact adrenergic pathways',
      rest: ' to stabilize attention and reduce emotional reactivity.',
    },
    dailyLife: {
      lead: 'Explains fluctuating alertness: ',
      highlight: 'feeling intensely sleepy during boring lectures yet hyper-alert at 1 AM',
      rest: ' when external stimulation drops.',
    },
    clinicalLimit: {
      lead: 'Brainstem arousal connects closely with autonomic heart rate and circadian sleep cycles. ',
      highlight: 'Clinical cardiovascular screening is essential when initiating ADHD medications',
      rest: '.',
    },
  },
  callosum: {
    id: 'callosum',
    name: 'Corpus Callosum',
    subtitle: 'The Interhemispheric Highway',
    view: 'medial',
    color: '#8c827a',
    glowColor: 'rgba(140, 130, 122, 0.45)',
    role: 'Connecting left and right cerebral hemispheres for rapid bidirectional communication.',
    function: {
      lead: 'A thick, C-shaped white matter commissure consisting of over 200 million axonal fibers, ',
      highlight: 'allowing the creative, verbal, and analytical hubs of both hemispheres to collaborate seamlessly',
      rest: '.',
    },
    neurobiology: {
      lead: 'Longitudinal pediatric MRI studies show that the corpus callosum (particularly the rostral body and splenium) ',
      highlight: 'often exhibits slower myelin maturation during childhood in individuals with ADHD',
      rest: ', reflecting overall neurodevelopmental pacing.',
    },
    dailyLife: {
      lead: 'Smooth interhemispheric transfer is essential for ',
      highlight: 'translating visual or intuitive insights into structured verbal output',
      rest: ' without feeling mentally tongue-tied.',
    },
    clinicalLimit: {
      lead: 'Corpus callosum thickness is highly variable across healthy brains. ',
      highlight: 'It is a structural landmark for orientation, not a diagnostic marker',
      rest: '.',
    },
  },
  parietal: {
    id: 'parietal',
    name: 'Posterior Parietal Attention Cortex',
    subtitle: 'The Attention Spotlight & Spatial Tracker',
    view: 'lateral',
    color: '#857004',
    glowColor: 'rgba(133, 112, 4, 0.45)',
    role: 'Steering the focus spotlight and tracking priorities across sensory environments.',
    function: {
      lead: 'Working alongside the frontal lobe in the frontoparietal control network, the parietal cortex acts as an attentional spotlight to ',
      highlight: 'orient your focus toward high-priority details and smoothly disengage',
      rest: ' when priorities shift.',
    },
    neurobiology: {
      lead: 'Functional imaging shows that parietal spotlight networks fluctuate in stability. When a task lacks intrinsic novelty or reward, ',
      highlight: 'the spotlight is easily pulled toward novel background stimuli',
      rest: ', even when you try hard to resist.',
    },
    dailyLife: {
      lead: 'Shows up as suddenly losing your place in a book, ',
      highlight: 'missing a key detail that was sitting right in front of your eyes',
      rest: ', or feeling your mental train of thought derailed by an incidental background sound.',
    },
    clinicalLimit: {
      lead: 'Parietal circuits interact with vision, touch, and executive control. ',
      highlight: 'Visual distractions reflect attentional disengagement, not visual eyesight defects',
      rest: '.',
    },
  },
  temporal: {
    id: 'temporal',
    name: 'Temporal Cortex',
    subtitle: 'Auditory Processing & Memory Buffering',
    view: 'lateral',
    color: '#3d7a80',
    glowColor: 'rgba(61, 122, 128, 0.45)',
    role: 'Processing verbal instructions, language comprehension, and linking audio to memory.',
    function: {
      lead: 'Sitting beneath the Sylvian fissure, the temporal lobe processes ',
      highlight: 'auditory speech, verbal sequences, and contextual memories',
      rest: '.',
    },
    neurobiology: {
      lead: 'Connects directly to prefrontal working memory loops. In ADHD, auditory processing speed is normal, but ',
      highlight: 'holding multi-step verbal instructions in memory without written notes decays rapidly',
      rest: '.',
    },
    dailyLife: {
      lead: 'Explains the common experience of hearing words clearly yet asking "What?" only for your brain to process it 2 seconds later, or ',
      highlight: 'forgetting a 3-step verbal direction by the time you reach the hallway',
      rest: '.',
    },
    clinicalLimit: {
      lead: 'Temporal processing challenges can overlap with Auditory Processing Disorder (APD). ',
      highlight: 'Differential testing helps clarify attention vs. auditory discrimination barriers',
      rest: '.',
    },
  },
  insula: {
    id: 'insula',
    name: 'Insular Cortex',
    subtitle: 'The Body Signal & Salience Bridge',
    view: 'both',
    color: '#5f9aaa',
    glowColor: 'rgba(95, 154, 170, 0.45)',
    role: 'Translating internal bodily sensations and sudden emotional spikes into conscious priorities.',
    function: {
      lead: 'Tucked deep within the lateral sulcus, the insula bridges internal somatic sensations with executive attention. It helps the brain ',
      highlight: 'decide what is most urgent right now',
      rest: ' by tuning into physical sensations, emotional spikes, and sensory disruptions.',
    },
    neurobiology: {
      lead: 'The insula is a primary hub of the Salience Network. In ADHD, ',
      highlight: 'it can amplify sudden sensory or emotional disruptions',
      rest: ', making minor physical discomforts or sudden emotional insults feel overpowering.',
    },
    dailyLife: {
      lead: 'A sudden notification chime, an itchy clothing tag, or a sharp wave of perceived rejection can ',
      highlight: 'instantly hijack working memory',
      rest: ', causing you to drop everything to address the immediate sensation.',
    },
    clinicalLimit: {
      lead: 'The insula sits deep within the fold. ',
      highlight: 'Its high reactivity connects directly to sensory sensitivities and Rejection Sensitive Dysphoria (RSD)',
      rest: '.',
    },
  },
};

const CIRCUITS: NeuralCircuitData[] = [
  {
    id: 'frontostriatal',
    name: 'Frontostriatal Motivation Loop',
    subtitle: 'Action Selection & Delay Discounting',
    color: '#a96952',
    regions: ['pfc', 'striatum', 'nacc', 'thalamus', 'vta'],
    role: {
      lead: 'Connects prefrontal goal-setting with dopamine reward hubs and thalamic gating to ',
      highlight: 'determine whether a task is worth starting and translate intention into physical movement',
      rest: '.',
    },
    mechanism: {
      lead: 'Signals flow from VTA dopamine neurons $\\rightarrow$ Striatum (Caudate/Putamen) $\\rightarrow$ Thalamus $\\rightarrow$ Prefrontal Cortex. In ADHD, ',
      highlight: 'attenuated baseline dopamine transmission blunts activation for delayed payoffs',
      rest: ', creating intense initiation friction ("task paralysis").',
    },
    livedExperience: {
      lead: 'Why you cannot "just start" an administrative task, but ',
      highlight: 'can effortlessly code, research, or create for 8 continuous hours',
      rest: ' when novelty or urgency stimulates dopamine firing.',
    },
  },
  {
    id: 'timing-loop',
    name: 'Fronto-Cerebellar Timing Circuit',
    subtitle: 'The Internal Stopwatch & Sequence Pacer',
    color: '#7e8249',
    regions: ['pfc', 'brainstem', 'cerebellum', 'thalamus'],
    role: {
      lead: 'Coordinates executive planning with cerebellar internal clocks to ',
      highlight: 'estimate how fast time is passing and sequence complex multi-step tasks smoothly',
      rest: '.',
    },
    mechanism: {
      lead: 'Prefrontal cortex sends motor and cognitive intentions through the pons into the cerebellum, which calculates temporal intervals and returns calibrated pulses through the thalamus. In ADHD, ',
      highlight: 'altered connectivity in this loop produces persistent temporal distortion',
      rest: '.',
    },
    livedExperience: {
      lead: 'Directly produces "time blindness": ',
      highlight: 'believing a 20-minute drive takes 5 minutes, or feeling that an upcoming 3 PM meeting makes the entire morning unusable',
      rest: ' ("waiting mode").',
    },
  },
  {
    id: 'salience-monitoring',
    name: 'Salience & Conflict Monitoring',
    subtitle: 'Error Detection & Attention Gating',
    color: '#925e76',
    regions: ['acc', 'insula', 'pfc', 'thalamus'],
    role: {
      lead: 'Balances internal somatic alarms with error detection to ',
      highlight: 'switch cognitive resources between daydreaming (DMN) and focused work (TPN)',
      rest: '.',
    },
    mechanism: {
      lead: 'The Anterior Cingulate and Insula monitor internal and external conflict. In ADHD, ',
      highlight: 'the Salience Network struggles to decisively suppress the Default Mode Network (DMN)',
      rest: ', allowing spontaneous internal mind-wandering to pierce through cognitively demanding tasks.',
    },
    livedExperience: {
      lead: 'Reading the same paragraph 4 times without absorbing it, or ',
      highlight: 'having your train of thought completely hijacked by a sudden stray idea',
      rest: ' while in the middle of writing a sentence.',
    },
  },
  {
    id: 'emotional-regulation',
    name: 'Fronto-Amygdala Regulation',
    subtitle: 'Emotional Braking & Social Sensitivity',
    color: '#c27d38',
    regions: ['pfc', 'acc', 'nacc', 'insula'],
    role: {
      lead: 'Provides top-down executive braking on sudden emotional spikes to ',
      highlight: 'pause before reacting and de-escalate acute frustration or perceived rejection',
      rest: '.',
    },
    mechanism: {
      lead: 'In neurotypical brains, the medial PFC and ACC send rapid inhibitory signals to dampen amygdala reactivity. In ADHD, ',
      highlight: 'this top-down braking pathway is delayed by several seconds',
      rest: ', allowing full-intensity emotional spikes to flood working memory before rational evaluation can intervene.',
    },
    livedExperience: {
      lead: 'The visceral agony of Rejection Sensitive Dysphoria (RSD): ',
      highlight: 'a minor piece of critical feedback feels like an overwhelming physical punch',
      rest: ', followed by deep shame or intense emotional flooding.',
    },
  },
];

export default function BrainPrototype() {
  const [, setLocation] = useLocation();
  const reducedMotion = useReducedMotion();

  const [activeView, setActiveView] = useState<DiagramView>('medial');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('acc');
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);
  const [activeCircuitId, setActiveCircuitId] = useState<string>('frontostriatal');

  const currentRegion = REGIONS[selectedRegionId] || REGIONS.acc;
  const currentCircuit = CIRCUITS.find((c) => c.id === activeCircuitId) || CIRCUITS[0];

  const highlightedId = hoveredRegionId || selectedRegionId;

  // Active regions in circuit mode
  const circuitActiveRegions = useMemo(() => {
    if (activeView !== 'circuits') return [];
    return currentCircuit.regions;
  }, [activeView, currentCircuit]);

  return (
    <ChapterLayoutWide
      title="Interactive Brain Anatomy Explorer (Prototype)"
      subtitle="High-definition vector neuroanatomy: explore subcortical dopamine hubs, executive circuits, and the biology of ADHD."
      badgeText="Prototype Section · Neuroscience Preview"
      estimatedReadingTime="Interactive 3D/Vector Explorer"
      bgClass="bg-[#F8F9FA]"
      accentColor="#3a596d"
      maxWidthClass="max-w-[78rem]"
      onPrevious={() => setLocation('/chapter/brain')}
      onNext={() => setLocation('/chapter/brain/executive-functions')}
    >
      <div className="space-y-10 py-2">
        {/* Prototype Header Notice */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5 sm:p-6 shadow-2xs backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Neurobiology Vector Prototype (Isolated Preview)
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                This prototype completely overhauls the previous blurry raster diagram. It introduces pristine, 100% scalable vector graphics, interactive hit zones across all deep subcortical structures (ACC, Striatum, Thalamus, VTA, Cerebellum), and real-time neural circuit simulations. This preview does not affect the live production chapter.
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap items-center gap-2 p-1 bg-stone-200/60 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveView('medial')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'medial'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Brain className="h-4 w-4 text-[#925e76]" />
              Medial Cutaway (Deep Structures)
            </button>
            <button
              type="button"
              onClick={() => setActiveView('lateral')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'lateral'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="h-4 w-4 text-[#4f7659]" />
              Lateral Surface (Outer Cortex)
            </button>
            <button
              type="button"
              onClick={() => setActiveView('circuits')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'circuits'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Network className="h-4 w-4 text-[#a96952]" />
              Neural Circuits (Flow Mode)
            </button>
          </div>

          <div className="text-xs font-semibold text-stone-500">
            {activeView === 'circuits' ? '⚡ Animated Circuit Signal Flow' : '👆 Click or hover any anatomical region'}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Canvas Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 sm:p-6 shadow-sm">
              {/* Badge Overlay */}
              <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-stone-200 bg-white/95 px-3 py-1 text-xs font-bold text-stone-700 shadow-xs backdrop-blur-sm">
                <span
                  className="h-2.5 w-2.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      activeView === 'circuits'
                        ? currentCircuit.color
                        : REGIONS[highlightedId]?.color || '#4f7659',
                  }}
                />
                {activeView === 'medial' && 'Sagittal Midline Cutaway'}
                {activeView === 'lateral' && 'Lateral Cerebral Cortex'}
                {activeView === 'circuits' && `Circuit: ${currentCircuit.name}`}
              </div>

              {/* Vector Graphic: Medial Cutaway View */}
              {activeView === 'medial' && (
                <svg
                  viewBox="0 0 900 600"
                  className="h-full w-full select-none"
                  aria-label="Medial cutaway diagram of human brain anatomy"
                >
                  <defs>
                    <radialGradient id="acc-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#925e76" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#925e76" stopOpacity="0.2" />
                    </radialGradient>
                    <radialGradient id="striatum-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a96952" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#a96952" stopOpacity="0.2" />
                    </radialGradient>
                    <radialGradient id="thalamus-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#4e72a2" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#4e72a2" stopOpacity="0.2" />
                    </radialGradient>
                    <radialGradient id="cerebellum-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7e8249" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#7e8249" stopOpacity="0.2" />
                    </radialGradient>
                    <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Medial Outer Cortex Contour */}
                  <path
                    d="M 210 380 C 140 370 100 320 90 270 C 80 200 130 130 200 80 C 290 30 450 30 580 50 C 690 70 780 130 820 220 C 840 270 830 330 780 370 C 740 400 680 400 640 400 C 600 400 580 430 580 450 C 580 500 530 530 480 530 C 440 530 420 500 420 450 C 410 400 390 390 350 390 C 280 390 250 385 210 380 Z"
                    fill="#F3F1EC"
                    stroke="#D3CEC4"
                    strokeWidth="3.5"
                  />

                  {/* Medial Sulci Gyri (Anatomical grooves) */}
                  <g fill="none" stroke="#D3CEC4" strokeWidth="2" strokeLinecap="round">
                    {/* Cingulate sulcus */}
                    <path d="M 230 340 C 190 290 190 190 270 140 C 370 90 530 100 620 140 C 670 170 700 230 710 270" />
                    {/* Parieto-occipital sulcus */}
                    <path d="M 620 140 L 730 260" />
                    {/* Calcarine sulcus */}
                    <path d="M 730 260 L 810 270 M 730 260 L 780 340" />
                    {/* Prefrontal medial gyri */}
                    <path d="M 130 230 C 170 230 200 210 220 190" />
                    <path d="M 160 150 C 200 170 240 160 270 140" />
                  </g>

                  {/* 2. Corpus Callosum (C-shaped landmark) */}
                  <path
                    d="M 330 310 C 270 300 260 220 310 180 C 370 150 510 150 580 180 C 630 200 640 260 600 290 C 560 310 540 270 510 250 C 460 220 380 220 340 260 C 330 270 340 300 330 310 Z"
                    fill={highlightedId === 'callosum' ? '#B8ABA0' : '#E5DFD7'}
                    stroke={highlightedId === 'callosum' ? '#8c827a' : '#BEB5AA'}
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoveredRegionId('callosum')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('callosum')}
                  />
                  <text x="440" y="200" textAnchor="middle" fill="#7D746A" fontSize="13" fontWeight="600" className="pointer-events-none select-none">
                    Corpus Callosum
                  </text>

                  {/* 3. Anterior Cingulate Cortex (ACC) */}
                  <path
                    d="M 280 330 C 220 280 230 180 300 130 C 380 90 500 100 560 130 C 560 150 530 155 490 145 C 410 135 340 150 290 190 C 250 230 255 290 280 330 Z"
                    fill={highlightedId === 'acc' ? '#925e76' : 'rgba(146, 94, 118, 0.35)'}
                    stroke="#925e76"
                    strokeWidth={highlightedId === 'acc' ? '4' : '2.5'}
                    filter={highlightedId === 'acc' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('acc')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('acc')}
                  />
                  <text x="350" y="125" textAnchor="middle" fill={highlightedId === 'acc' ? '#FFFFFF' : '#6A374E'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                    Anterior Cingulate (ACC)
                  </text>

                  {/* 4. Medial Prefrontal Cortex (mPFC) Area */}
                  <path
                    d="M 120 250 C 130 180 180 120 250 85 L 280 135 C 230 160 180 210 170 260 Z"
                    fill={highlightedId === 'pfc' ? '#4f7659' : 'rgba(79, 118, 89, 0.28)'}
                    stroke="#4f7659"
                    strokeWidth={highlightedId === 'pfc' ? '4' : '2.5'}
                    filter={highlightedId === 'pfc' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('pfc')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('pfc')}
                  />
                  <text x="175" y="170" textAnchor="middle" fill={highlightedId === 'pfc' ? '#FFFFFF' : '#2A4D33'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                    Medial PFC
                  </text>

                  {/* 5. Striatum (Caudate & Putamen deep arc) */}
                  <path
                    d="M 330 270 C 310 240 330 210 370 210 C 440 210 500 240 530 280 C 510 290 470 265 420 255 C 380 250 350 260 330 270 Z"
                    fill={highlightedId === 'striatum' ? '#a96952' : 'rgba(169, 105, 82, 0.4)'}
                    stroke="#a96952"
                    strokeWidth={highlightedId === 'striatum' ? '4' : '2.5'}
                    filter={highlightedId === 'striatum' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('striatum')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('striatum')}
                  />
                  <text x="420" y="240" textAnchor="middle" fill={highlightedId === 'striatum' ? '#FFFFFF' : '#733722'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                    Striatum (Caudate/Putamen)
                  </text>

                  {/* 6. Nucleus Accumbens (Ventral Striatum) */}
                  <ellipse
                    cx="335"
                    cy="305"
                    rx="26"
                    ry="20"
                    fill={highlightedId === 'nacc' ? '#c27d38' : 'rgba(194, 125, 56, 0.45)'}
                    stroke="#c27d38"
                    strokeWidth={highlightedId === 'nacc' ? '3.5' : '2'}
                    filter={highlightedId === 'nacc' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('nacc')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('nacc')}
                  />
                  <text x="335" y="310" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" className="pointer-events-none select-none">
                    NAcc
                  </text>

                  {/* 7. Thalamus (Central Egg Relay Hub) */}
                  <ellipse
                    cx="460"
                    cy="300"
                    rx="52"
                    ry="36"
                    fill={highlightedId === 'thalamus' ? '#4e72a2' : 'rgba(78, 114, 162, 0.35)'}
                    stroke="#4e72a2"
                    strokeWidth={highlightedId === 'thalamus' ? '4' : '2.5'}
                    filter={highlightedId === 'thalamus' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('thalamus')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('thalamus')}
                  />
                  <text x="460" y="305" textAnchor="middle" fill={highlightedId === 'thalamus' ? '#FFFFFF' : '#1D3F6D'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                    Thalamus
                  </text>

                  {/* 8. VTA & Substantia Nigra (Dopamine origin in midbrain) */}
                  <path
                    d="M 430 350 L 490 350 L 475 390 L 435 385 Z"
                    fill={highlightedId === 'vta' ? '#d46b43' : 'rgba(212, 107, 67, 0.4)'}
                    stroke="#d46b43"
                    strokeWidth={highlightedId === 'vta' ? '3.5' : '2'}
                    filter={highlightedId === 'vta' ? 'url(#glow-filter)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('vta')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('vta')}
                  />
                  <text x="460" y="373" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" className="pointer-events-none select-none">
                    VTA / SN
                  </text>

                  {/* 9. Brainstem (Pons & Medulla) */}
                  <path
                    d="M 430 390 C 390 410 400 470 435 480 L 450 560 L 490 560 L 480 470 C 500 450 500 400 470 390 Z"
                    fill={highlightedId === 'brainstem' ? '#657786' : 'rgba(101, 119, 134, 0.3)'}
                    stroke="#657786"
                    strokeWidth={highlightedId === 'brainstem' ? '4' : '2'}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('brainstem')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('brainstem')}
                  />
                  <text x="450" y="445" textAnchor="middle" fill="#2E3C47" fontSize="12" fontWeight="bold" className="pointer-events-none select-none">
                    Pons
                  </text>

                  {/* 10. Cerebellum with Arbor Vitae Foliation */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('cerebellum')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('cerebellum')}
                  >
                    <path
                      d="M 500 400 C 540 370 650 370 710 410 C 760 450 740 520 680 545 C 600 570 540 540 500 480 C 480 440 480 410 500 400 Z"
                      fill={highlightedId === 'cerebellum' ? '#7e8249' : 'rgba(126, 130, 73, 0.35)'}
                      stroke="#7e8249"
                      strokeWidth={highlightedId === 'cerebellum' ? '4' : '2.5'}
                      filter={highlightedId === 'cerebellum' ? 'url(#glow-filter)' : undefined}
                    />
                    {/* Arbor vitae branch pattern inside cerebellum */}
                    <path
                      d="M 520 440 C 560 430 600 440 640 430 M 550 440 C 580 470 620 480 660 490 M 530 450 C 560 500 590 520 630 530"
                      fill="none"
                      stroke={highlightedId === 'cerebellum' ? '#FFFFFF' : '#5E6133'}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <text x="615" y="455" textAnchor="middle" fill={highlightedId === 'cerebellum' ? '#FFFFFF' : '#45481F'} fontSize="14" fontWeight="bold" className="pointer-events-none select-none">
                      Cerebellum
                    </text>
                    <text x="615" y="475" textAnchor="middle" fill={highlightedId === 'cerebellum' ? '#F0F5D8' : '#6A6F36'} fontSize="11" fontWeight="600" className="pointer-events-none select-none">
                      (Arbor Vitae)
                    </text>
                  </g>
                </svg>
              )}

              {/* Vector Graphic: Lateral Surface View */}
              {activeView === 'lateral' && (
                <svg
                  viewBox="0 0 900 600"
                  className="h-full w-full select-none"
                  aria-label="Lateral view of human brain cortex"
                >
                  <defs>
                    <filter id="lateral-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Whole Lateral Brain Contour Base */}
                  <path
                    d="M 120 310 C 90 240 130 150 210 90 C 310 30 500 30 630 60 C 740 90 820 160 840 250 C 850 320 800 380 740 400 C 690 410 650 390 620 410 C 600 450 560 540 490 540 C 430 540 410 470 390 420 C 340 430 250 430 200 390 C 140 370 120 340 120 310 Z"
                    fill="#F3F1EC"
                    stroke="#D3CEC4"
                    strokeWidth="3.5"
                  />

                  {/* 2. Dorsolateral Prefrontal Cortex (dlPFC) */}
                  <path
                    d="M 130 290 C 110 220 150 140 220 90 C 290 60 360 65 410 80 L 390 220 C 340 230 270 230 210 250 L 170 300 Z"
                    fill={highlightedId === 'pfc' ? '#4f7659' : 'rgba(79, 118, 89, 0.35)'}
                    stroke="#4f7659"
                    strokeWidth={highlightedId === 'pfc' ? '4' : '2.5'}
                    filter={highlightedId === 'pfc' ? 'url(#lateral-glow)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('pfc')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('pfc')}
                  />
                  <text x="260" y="150" textAnchor="middle" fill={highlightedId === 'pfc' ? '#FFFFFF' : '#2A4D33'} fontSize="14" fontWeight="bold" className="pointer-events-none select-none">
                    Dorsolateral PFC
                  </text>
                  <text x="260" y="170" textAnchor="middle" fill={highlightedId === 'pfc' ? '#EDF4EE' : '#3E6145'} fontSize="11" fontWeight="600" className="pointer-events-none select-none">
                    Working Memory & Goals
                  </text>

                  {/* 3. Posterior Parietal Attention Cortex */}
                  <path
                    d="M 420 80 C 490 70 590 75 660 110 C 720 150 740 210 740 270 L 620 280 C 580 270 540 250 510 210 L 420 210 Z"
                    fill={highlightedId === 'parietal' ? '#857004' : 'rgba(133, 112, 4, 0.35)'}
                    stroke="#857004"
                    strokeWidth={highlightedId === 'parietal' ? '4' : '2.5'}
                    filter={highlightedId === 'parietal' ? 'url(#lateral-glow)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('parietal')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('parietal')}
                  />
                  <text x="580" y="160" textAnchor="middle" fill={highlightedId === 'parietal' ? '#FFFFFF' : '#574801'} fontSize="14" fontWeight="bold" className="pointer-events-none select-none">
                    Parietal Cortex
                  </text>
                  <text x="580" y="180" textAnchor="middle" fill={highlightedId === 'parietal' ? '#FFFBE6' : '#6E5D06'} fontSize="11" fontWeight="600" className="pointer-events-none select-none">
                    Attention Spotlight
                  </text>

                  {/* 4. Temporal Lobe (Auditory/Verbal) */}
                  <path
                    d="M 270 280 C 340 260 440 260 520 280 L 610 320 C 600 370 540 400 450 410 C 370 410 300 390 250 360 L 270 280 Z"
                    fill={highlightedId === 'temporal' ? '#3d7a80' : 'rgba(61, 122, 128, 0.35)'}
                    stroke="#3d7a80"
                    strokeWidth={highlightedId === 'temporal' ? '4' : '2.5'}
                    filter={highlightedId === 'temporal' ? 'url(#lateral-glow)' : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('temporal')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('temporal')}
                  />
                  <text x="430" y="340" textAnchor="middle" fill={highlightedId === 'temporal' ? '#FFFFFF' : '#1C4A4F'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                    Temporal Cortex
                  </text>
                  <text x="430" y="360" textAnchor="middle" fill={highlightedId === 'temporal' ? '#E6F4F5' : '#28585E'} fontSize="11" fontWeight="600" className="pointer-events-none select-none">
                    Auditory & Verbal Buffers
                  </text>

                  {/* 5. Insula (Deep within Sylvian fissure indicator) */}
                  <g
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRegionId('insula')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('insula')}
                  >
                    <ellipse
                      cx="380"
                      cy="260"
                      rx="42"
                      ry="22"
                      fill={highlightedId === 'insula' ? '#5f9aaa' : 'rgba(95, 154, 170, 0.25)'}
                      stroke="#5f9aaa"
                      strokeWidth={highlightedId === 'insula' ? '3.5' : '2'}
                      strokeDasharray="6 4"
                    />
                    <text x="380" y="264" textAnchor="middle" fill={highlightedId === 'insula' ? '#FFFFFF' : '#2D5863'} fontSize="11" fontWeight="bold" className="pointer-events-none select-none">
                      [Insula Deep]
                    </text>
                  </g>

                  {/* 6. Lateral Cerebellum */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegionId('cerebellum')}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => setSelectedRegionId('cerebellum')}
                  >
                    <path
                      d="M 550 410 C 600 390 680 390 730 420 C 780 450 760 520 710 540 C 640 560 570 540 530 490 C 520 460 530 430 550 410 Z"
                      fill={highlightedId === 'cerebellum' ? '#7e8249' : 'rgba(126, 130, 73, 0.35)'}
                      stroke="#7e8249"
                      strokeWidth={highlightedId === 'cerebellum' ? '4' : '2.5'}
                      filter={highlightedId === 'cerebellum' ? 'url(#lateral-glow)' : undefined}
                    />
                    <text x="640" y="465" textAnchor="middle" fill={highlightedId === 'cerebellum' ? '#FFFFFF' : '#45481F'} fontSize="13" fontWeight="bold" className="pointer-events-none select-none">
                      Cerebellum
                    </text>
                    <text x="640" y="485" textAnchor="middle" fill={highlightedId === 'cerebellum' ? '#F0F5D8' : '#5F632E'} fontSize="10" fontWeight="600" className="pointer-events-none select-none">
                      Timing & Sequencing
                    </text>
                  </g>
                </svg>
              )}

              {/* Vector Graphic: Circuits Mode with Animated Pulse Signals */}
              {activeView === 'circuits' && (
                <svg
                  viewBox="0 0 900 600"
                  className="h-full w-full select-none"
                  aria-label="Neural circuits and pathway flow diagram"
                >
                  <defs>
                    <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Brain Silhouette Base */}
                  <path
                    d="M 210 380 C 140 370 100 320 90 270 C 80 200 130 130 200 80 C 290 30 450 30 580 50 C 690 70 780 130 820 220 C 840 270 830 330 780 370 C 740 400 680 400 640 400 C 600 400 580 430 580 450 C 580 500 530 530 480 530 C 440 530 420 500 420 450 C 410 400 390 390 350 390 C 280 390 250 385 210 380 Z"
                    fill="#F7F6F3"
                    stroke="#E2DDD5"
                    strokeWidth="2.5"
                  />

                  {/* Active Circuit Pathways with Animated Dashes */}
                  {activeCircuitId === 'frontostriatal' && (
                    <g>
                      {/* VTA -> Striatum */}
                      <path
                        d="M 460 370 C 430 340 370 330 350 280"
                        fill="none"
                        stroke="#a96952"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                        className={reducedMotion ? undefined : 'animate-[dash_1.5s_linear_infinite]'}
                      />
                      {/* Striatum -> Thalamus */}
                      <path
                        d="M 400 250 C 430 250 450 270 460 290"
                        fill="none"
                        stroke="#a96952"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* Thalamus -> PFC */}
                      <path
                        d="M 440 290 C 370 230 280 170 220 180"
                        fill="none"
                        stroke="#a96952"
                        strokeWidth="6"
                        strokeDasharray="10 8"
                      />
                      {/* PFC -> Striatum (top-down loop) */}
                      <path
                        d="M 240 210 C 280 250 330 260 360 260"
                        fill="none"
                        stroke="#a96952"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                    </g>
                  )}

                  {activeCircuitId === 'timing-loop' && (
                    <g>
                      {/* PFC -> Pons */}
                      <path
                        d="M 250 220 C 340 300 400 370 450 440"
                        fill="none"
                        stroke="#7e8249"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* Pons -> Cerebellum */}
                      <path
                        d="M 470 440 C 510 440 560 440 600 460"
                        fill="none"
                        stroke="#7e8249"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* Cerebellum -> Thalamus */}
                      <path
                        d="M 600 450 C 560 380 500 340 470 310"
                        fill="none"
                        stroke="#7e8249"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* Thalamus -> PFC */}
                      <path
                        d="M 450 290 C 380 220 300 170 240 180"
                        fill="none"
                        stroke="#7e8249"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                    </g>
                  )}

                  {activeCircuitId === 'salience-monitoring' && (
                    <g>
                      {/* ACC <-> Insula */}
                      <path
                        d="M 330 180 C 360 210 380 240 370 280"
                        fill="none"
                        stroke="#925e76"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* ACC <-> PFC */}
                      <path
                        d="M 300 150 C 260 150 220 160 200 190"
                        fill="none"
                        stroke="#925e76"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* Insula <-> Thalamus */}
                      <path
                        d="M 370 280 L 440 295"
                        fill="none"
                        stroke="#925e76"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                    </g>
                  )}

                  {activeCircuitId === 'emotional-regulation' && (
                    <g>
                      {/* mPFC -> ACC */}
                      <path
                        d="M 210 190 C 240 160 280 150 320 160"
                        fill="none"
                        stroke="#c27d38"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* ACC -> NAcc / Ventral Striatum */}
                      <path
                        d="M 330 180 C 320 230 320 270 335 300"
                        fill="none"
                        stroke="#c27d38"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                      {/* NAcc -> Insula */}
                      <path
                        d="M 350 300 C 370 300 390 280 380 260"
                        fill="none"
                        stroke="#c27d38"
                        strokeWidth="5"
                        strokeDasharray="8 6"
                      />
                    </g>
                  )}

                  {/* Circuit Nodes with Pulsing Glow */}
                  {circuitActiveRegions.map((regionId) => {
                    const r = REGIONS[regionId];
                    if (!r) return null;

                    // Approximate coordinates for circuit nodes
                    const coords: Record<RegionId, { x: number; y: number }> = {
                      pfc: { x: 210, y: 190 },
                      acc: { x: 330, y: 155 },
                      striatum: { x: 390, y: 245 },
                      nacc: { x: 335, y: 305 },
                      thalamus: { x: 460, y: 295 },
                      vta: { x: 460, y: 370 },
                      cerebellum: { x: 615, y: 460 },
                      brainstem: { x: 450, y: 445 },
                      callosum: { x: 450, y: 200 },
                      parietal: { x: 580, y: 160 },
                      temporal: { x: 430, y: 340 },
                      insula: { x: 370, y: 270 },
                    };

                    const { x, y } = coords[regionId] || { x: 450, y: 300 };

                    return (
                      <g key={regionId} className="cursor-pointer" onClick={() => setSelectedRegionId(regionId)}>
                        <circle cx={x} cy={y} r="28" fill={currentCircuit.color} fillOpacity="0.25" filter="url(#circuit-glow)" />
                        <circle cx={x} cy={y} r="14" fill={currentCircuit.color} stroke="#FFFFFF" strokeWidth="3" />
                        <text x={x} y={y + 36} textAnchor="middle" fill="#2E2B27" fontSize="12" fontWeight="bold" className="pointer-events-none">
                          {r.name.split('(')[0].trim()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Region Selector Pills (Always Synchronized) */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {activeView === 'circuits' ? 'Select Neural Circuit:' : 'Explore Specific Brain Hubs:'}
              </span>

              {activeView === 'circuits' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CIRCUITS.map((circuit) => (
                    <button
                      key={circuit.id}
                      type="button"
                      onClick={() => setActiveCircuitId(circuit.id)}
                      className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        activeCircuitId === circuit.id
                          ? 'border-stone-400 bg-white shadow-xs'
                          : 'border-stone-200/80 bg-white/60 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <span
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full"
                        style={{ backgroundColor: circuit.color }}
                      />
                      <div>
                        <div className="text-sm font-bold text-foreground">{circuit.name}</div>
                        <div className="text-xs text-stone-500">{circuit.subtitle}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(REGIONS) as RegionId[])
                    .filter((id) => {
                      if (activeView === 'medial') return REGIONS[id].view === 'medial' || REGIONS[id].view === 'both';
                      if (activeView === 'lateral') return REGIONS[id].view === 'lateral' || REGIONS[id].view === 'both';
                      return true;
                    })
                    .map((id) => {
                      const r = REGIONS[id];
                      const isSelected = selectedRegionId === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setSelectedRegionId(id)}
                          onMouseEnter={() => setHoveredRegionId(id)}
                          onMouseLeave={() => setHoveredRegionId(null)}
                          className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-white shadow-xs scale-[1.02]'
                              : 'bg-white border border-stone-200/90 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
                          {r.name.split('(')[0].trim()}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Right Scientific Details Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              {activeView === 'circuits' ? (
                <motion.div
                  key={currentCircuit.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm space-y-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                      <Network className="h-3.5 w-3.5" style={{ color: currentCircuit.color }} />
                      Circuit Simulation
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{currentCircuit.name}</h3>
                    <p className="text-sm font-semibold text-stone-500">{currentCircuit.subtitle}</p>
                  </div>

                  <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Functional Role</div>
                      <p>
                        {currentCircuit.role.lead}
                        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1 py-0.5 rounded">
                          {currentCircuit.role.highlight}
                        </strong>
                        {currentCircuit.role.rest}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Dopamine & Circuit Mechanics
                      </div>
                      <p>
                        {currentCircuit.mechanism.lead}
                        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1 py-0.5 rounded">
                          {currentCircuit.mechanism.highlight}
                        </strong>
                        {currentCircuit.mechanism.rest}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                        Lived Experience Translation
                      </div>
                      <p className="text-amber-950 font-medium">
                        {currentCircuit.livedExperience.lead}
                        <strong className="font-bold underline decoration-amber-400">
                          {currentCircuit.livedExperience.highlight}
                        </strong>
                        {currentCircuit.livedExperience.rest}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentRegion.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm space-y-5"
                >
                  <div className="border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: currentRegion.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        {currentRegion.view === 'medial' ? 'Deep Midline Structure' : 'Cortical Surface Structure'}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{currentRegion.name}</h3>
                    <p className="text-sm font-semibold text-stone-500">{currentRegion.subtitle}</p>
                  </div>

                  <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                    <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        <Target className="h-3.5 w-3.5" style={{ color: currentRegion.color }} />
                        Everyday Function
                      </div>
                      <p>
                        {currentRegion.function.lead}
                        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1 py-0.5 rounded">
                          {currentRegion.function.highlight}
                        </strong>
                        {currentRegion.function.rest}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        <Zap className="h-3.5 w-3.5" style={{ color: currentRegion.color }} />
                        Neurobiology in ADHD
                      </div>
                      <p>
                        {currentRegion.neurobiology.lead}
                        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1 py-0.5 rounded">
                          {currentRegion.neurobiology.highlight}
                        </strong>
                        {currentRegion.neurobiology.rest}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-700" />
                        How It Feels (Lived Experience)
                      </div>
                      <p className="text-amber-950 font-medium">
                        {currentRegion.dailyLife.lead}
                        <strong className="font-bold underline decoration-amber-400">
                          {currentRegion.dailyLife.highlight}
                        </strong>
                        {currentRegion.dailyLife.rest}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200/70">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-stone-700" />
                        Clinical & Diagnostic Reality
                      </div>
                      <p className="text-xs text-stone-600 leading-normal">
                        {currentRegion.clinicalLimit.lead}
                        <strong className="font-semibold text-stone-800">
                          {currentRegion.clinicalLimit.highlight}
                        </strong>
                        {currentRegion.clinicalLimit.rest}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Prototype Navigation & Comparison Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl border border-stone-200 bg-white">
          <div className="space-y-1">
            <h4 className="font-bold text-foreground">Next Step for Prototype Review</h4>
            <p className="text-sm text-stone-600">
              Review this interactive vector implementation. Once approved, this high-definition component can officially replace the old raster images on Chapter 4.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setLocation('/chapter/brain')}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-bold text-stone-700 hover:bg-stone-50 transition-all"
            >
              Back to Chapter 4 (Live)
            </button>
            <button
              type="button"
              onClick={() => setLocation('/chapter/brain/executive-functions')}
              className="px-5 py-2.5 rounded-xl bg-sage-green text-sm font-bold text-white shadow-xs hover:bg-sage-green/90 transition-all flex items-center gap-2"
            >
              Explore Executive Functions <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </ChapterLayoutWide>
  );
}
