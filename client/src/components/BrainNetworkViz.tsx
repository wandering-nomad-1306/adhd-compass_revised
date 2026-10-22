import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, Brain, Clock, HelpCircle, Info, Network, ScanSearch, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { useMemo, useState } from 'react';

type ViewMode = 'regions' | 'connections';

type RegionId = 'pfc' | 'parietal' | 'acc' | 'striatum' | 'insula' | 'cerebellum';

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
  surfaceVisible: boolean;
}

interface BrainCircuit {
  id: string;
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
    name: 'Prefrontal cortex',
    shortName: 'Prefrontal cortex',
    color: '#4f7659',
    role: 'Holding goals in mind and guiding what you do next',
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
    surfaceVisible: true,
  },
  {
    id: 'parietal',
    name: 'Posterior parietal attention cortex',
    shortName: 'Parietal cortex',
    color: '#857004',
    role: 'Steering your attention spotlight and tracking priorities',
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
    surfaceVisible: true,
  },
  {
    id: 'acc',
    name: 'Anterior cingulate cortex',
    shortName: 'Anterior cingulate',
    color: '#925e76',
    role: 'Catching mistakes, monitoring effort, and adapting strategies',
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
      lead: 'This region sits deep on the inner midline between both brain hemispheres. It is ',
      highlight: 'visible only in the cutaway view',
      rest: ' rather than on the brain surface.',
    },
    surfaceVisible: false,
  },
  {
    id: 'striatum',
    name: 'Striatum',
    shortName: 'Striatum',
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
      lead: 'The striatum is an internal cluster of deep nuclei (including the caudate and putamen) ',
      highlight: 'tucked deep within the center of the brain',
      rest: ', shown here as an anatomical cross-section.',
    },
    surfaceVisible: false,
  },
  {
    id: 'insula',
    name: 'Insula',
    shortName: 'Insula',
    color: '#5f9aaa',
    role: 'Spotting urgent body signals and shifting mental priorities',
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
      lead: 'The insula is tucked deep beneath the frontal and temporal folds. It is ',
      highlight: 'hidden inside the deep lateral groove',
      rest: ' and illustrated here for educational orientation.',
    },
    surfaceVisible: false,
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    shortName: 'Cerebellum',
    color: '#7e8249',
    role: 'Internal clock, time perception, and smooth sequence pacing',
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
      lead: 'The cerebellum sits at the base of the skull and works in ',
      highlight: 'continuous two-way feedback with the cortex',
      rest: ' rather than as an isolated structure.',
    },
    surfaceVisible: true,
  },
];

const circuits: BrainCircuit[] = [
  {
    id: 'control-action',
    name: 'Control and action',
    color: '#a96952',
    nodeIds: ['pfc', 'acc', 'striatum'],
    role: {
      lead: 'Connects goal-setting in the frontal cortex with error detection and dopamine motivation to ',
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
    name: 'Attention control',
    color: '#5b6f96',
    nodeIds: ['pfc', 'parietal', 'insula'],
    role: {
      lead: 'Coordinates long-term goals with the real-time spotlight of attention to ',
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
    name: 'Salience and monitoring',
    color: '#925e76',
    nodeIds: ['insula', 'acc', 'pfc'],
    role: {
      lead: 'Balances urgent sensory/emotional events with conflict detection to ',
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
    name: 'Timing and coordination',
    color: '#7e8249',
    nodeIds: ['pfc', 'striatum', 'cerebellum'],
    role: {
      lead: 'Combines planning, dopamine motivation, and internal time tracking to ',
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

const surfaceOverlay: Partial<Record<RegionId, string>> = {
  pfc: '/images/brain-highlight-pfc.png',
  parietal: '/images/brain-highlight-parietal.png',
  cerebellum: '/images/brain-highlight-cerebellum.png',
};

const medialOverlay: Partial<Record<RegionId, string>> = {
  acc: '/images/adhd-medial-highlight-acc.png',
  striatum: '/images/adhd-medial-highlight-striatum.png',
  cerebellum: '/images/adhd-medial-highlight-cerebellum.png',
};

const surfaceHitPaths: Partial<Record<RegionId, string>> = {
  pfc: 'M100 250 L125 180 L190 150 L275 145 L322 155 L322 205 L309 242 L291 282 L280 324 L256 369 L215 407 L173 433 L120 430 L100 365 Z',
  parietal: 'M370 154 L450 145 L555 180 L610 235 L620 300 L595 335 L550 348 L503 343 L453 328 L408 309 L370 282 L346 248 L347 205 Z',
  cerebellum: 'M424 391 L497 378 L566 386 L612 411 L632 445 L624 483 L603 515 L568 541 L520 560 L474 553 L441 531 L420 499 L410 455 Z',
};

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
      <div className="flex items-center gap-2 mb-2.5">
        {SectionIcon && <SectionIcon className="h-4 w-4" style={{ color: accentColor || '#34533d' }} />}
        <h4
          className="text-xs sm:text-sm font-bold uppercase tracking-wider"
          style={{ color: accentColor || '#34533d' }}
        >
          {label}
        </h4>
      </div>
      <p className="text-[15px] sm:text-base leading-[1.75] text-stone-700">
        {block.lead}
        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1.5 py-0.5 rounded shadow-2xs">
          {block.highlight}
        </strong>
        {block.rest}
      </p>
    </div>
  );
}

function SurfaceBrain({ activeIds, onSelect }: { activeIds: RegionId[]; onSelect: (id: RegionId) => void }) {
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const highlighted = hovered ?? activeIds.find((id) => surfaceOverlay[id]) ?? null;
  const insulaActive = activeIds.includes('insula');

  return (
    <div className="relative mx-auto aspect-[8/5] w-full max-w-[38rem] overflow-hidden rounded-[22px] bg-white shadow-[0_7px_22px_rgba(89,97,88,0.08)]">
      <img
        src="/images/human-brain-anatomy-grayscale.png"
        alt="Lateral view of a human brain"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      <AnimatePresence>
        {highlighted && surfaceOverlay[highlighted] && (
          <motion.img
            key={highlighted}
            src={surfaceOverlay[highlighted]}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          />
        )}
      </AnimatePresence>

      <svg viewBox="0 0 860 645" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {(Object.keys(surfaceHitPaths) as RegionId[]).map((id) => {
          const path = surfaceHitPaths[id];
          if (!path) return null;
          return (
            <path
              key={id}
              d={path}
              fill="transparent"
              stroke="transparent"
              strokeWidth="12"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(id)}
            />
          );
        })}

        {insulaActive && (
          <g>
            <ellipse cx="342" cy="346" rx="47" ry="30" fill="#5f9aaa" fillOpacity="0.18" stroke="#5f9aaa" strokeWidth="4" strokeDasharray="9 7" />
            <path d="M388 352 C425 365 449 388 458 414" fill="none" stroke="#5f9aaa" strokeWidth="2.5" strokeDasharray="6 5" />
          </g>
        )}
      </svg>

      <div className="absolute right-3 top-3 rounded-full border border-stone-200/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-stone-600 backdrop-blur-sm">
        Outer Lateral Surface
      </div>
    </div>
  );
}

function MedialResearchBrain({ activeIds }: { activeIds: RegionId[] }) {
  const deepActive = activeIds.filter((id) => Boolean(medialOverlay[id]));
  const insulaActive = activeIds.includes('insula');
  const surfaceOnly = activeIds.length > 0 && deepActive.length === 0 && !insulaActive;

  return (
    <div className="relative mx-auto aspect-[8/5] w-full max-w-[38rem] overflow-hidden rounded-[22px] bg-[#fdfcf9] shadow-[0_7px_22px_rgba(89,97,88,0.08)]">
      <img
        src="/images/adhd-brain-medial-research-base.png"
        alt="Midline cutaway diagram showing deep brain structures"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      <AnimatePresence>
        {deepActive.map((id) => {
          const overlaySrc = medialOverlay[id];
          if (!overlaySrc) return null;
          return (
            <motion.img
              key={id}
              src={overlaySrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            />
          );
        })}
      </AnimatePresence>

      <div className="absolute left-3 top-3 rounded-full border border-stone-200/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-stone-600 backdrop-blur-sm">
        Deep Structures Cutaway
      </div>

      {insulaActive && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#5f9aaa]/30 bg-white/95 px-3 py-2 text-center text-xs font-semibold leading-snug text-[#4d7f8d] shadow-sm">
          The insula lies deep within the lateral groove, shown here for structural orientation.
        </div>
      )}

      {surfaceOnly && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-sage-green/15 bg-white/95 px-3 py-2 text-center text-xs font-semibold leading-snug text-muted-foreground shadow-sm">
          This cutaway shows internal structures. The selected surface region is highlighted in the view above.
        </div>
      )}
    </div>
  );
}

function CircuitRelationship({ circuit }: { circuit: BrainCircuit }) {
  return (
    <div className="mt-4 rounded-2xl border border-sage-green/15 bg-white p-5 shadow-2xs">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Key regions cooperating in this circuit</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {circuit.nodeIds.map((id, index) => {
          const region = regions.find((item) => item.id === id)!;
          return (
            <div key={id} className="contents">
              {index > 0 && <span className="text-sm font-bold text-muted-foreground" aria-hidden="true">↔</span>}
              <span className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: `${region.color}70`, color: region.color, backgroundColor: `${region.color}0d` }}>{region.shortName}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        These regions communicate through distributed, reciprocal networks. Brain systems operate as interconnected teams rather than isolated modules.
      </p>
    </div>
  );
}

export default function BrainNetworkViz() {
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<ViewMode>('regions');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('pfc');
  const [selectedCircuitId, setSelectedCircuitId] = useState('control-action');

  const selectedRegion = useMemo(() => regions.find((region) => region.id === selectedRegionId) ?? regions[0], [selectedRegionId]);
  const selectedCircuit = useMemo(() => circuits.find((circuit) => circuit.id === selectedCircuitId) ?? circuits[0], [selectedCircuitId]);
  const activeIds: RegionId[] = view === 'regions' ? [selectedRegionId] : selectedCircuit.nodeIds;

  const selectRegion = (id: RegionId) => {
    setSelectedRegionId(id);
    if (view === 'connections') setView('regions');
  };

  return (
    <div className="mx-auto w-full overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-sage-green/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-foreground text-lg">Brain regions and connected systems</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">
            Select a region on the interactive map or list below. The lateral diagram highlights surface cortex, while the cutaway illustrates deep internal hubs.
          </p>
        </div>
        <div className="inline-flex self-start rounded-xl border border-sage-green/15 bg-warm-cream p-1" role="tablist" aria-label="Brain diagram view">
          <button type="button" role="tab" aria-selected={view === 'regions'} onClick={() => setView('regions')} className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${view === 'regions' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><ScanSearch className="h-4 w-4" /> Regions</button>
          <button type="button" role="tab" aria-selected={view === 'connections'} onClick={() => setView('connections')} className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${view === 'connections' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><Network className="h-4 w-4" /> Connections</button>
        </div>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="min-w-0 border-b border-sage-green/10 bg-[#fbf7ed] p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <SurfaceBrain activeIds={activeIds} onSelect={selectRegion} />

          {view === 'regions' ? (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Brain regions">
              {regions.map((region) => {
                const active = region.id === selectedRegionId;
                return (
                  <button key={region.id} type="button" onClick={() => setSelectedRegionId(region.id)} className="min-w-0 rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4" style={{ borderColor: active ? region.color : `${region.color}55`, backgroundColor: active ? region.color : '#ffffff', color: active ? '#ffffff' : region.color }}>
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
                  <button key={circuit.id} type="button" onClick={() => setSelectedCircuitId(circuit.id)} className="rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4" style={{ borderColor: active ? circuit.color : `${circuit.color}55`, backgroundColor: active ? circuit.color : '#ffffff', color: active ? '#ffffff' : circuit.color }}>
                    {circuit.name}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5 overflow-hidden rounded-[22px] border border-sage-green/10 bg-white shadow-sm">
            <MedialResearchBrain activeIds={activeIds} />
          </div>

          {view === 'connections' && <CircuitRelationship circuit={selectedCircuit} />}
        </div>

        <div className="min-w-0 p-5 sm:p-7 lg:sticky lg:top-6 lg:self-start">
          <AnimatePresence mode="wait">
            {view === 'regions' ? (
              <motion.div key={selectedRegion.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div>
                  <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: selectedRegion.color }}>Brain region</span>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-foreground">{selectedRegion.name}</h3>
                  <p className="mt-2 text-base sm:text-lg font-semibold leading-relaxed" style={{ color: selectedRegion.color }}>{selectedRegion.role}</p>
                </div>
                <div className="space-y-3.5 pt-1">
                  <DetailSection label="Main function" block={selectedRegion.function} accentColor={selectedRegion.color} icon={Target} />
                  <DetailSection label="ADHD research" block={selectedRegion.research} accentColor={selectedRegion.color} icon={Brain} />
                  <DetailSection label="Possible everyday relevance" block={selectedRegion.daily} accentColor={selectedRegion.color} icon={Activity} />
                  <DetailSection label="Anatomical limitation" block={selectedRegion.limit} accentColor={selectedRegion.color} icon={HelpCircle} />
                </div>
              </motion.div>
            ) : (
              <motion.div key={selectedCircuit.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div>
                  <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: selectedCircuit.color }}>Connected system</span>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-foreground">{selectedCircuit.name}</h3>
                  <p className="mt-2 text-base sm:text-lg font-semibold leading-relaxed" style={{ color: selectedCircuit.color }}>{selectedCircuit.nodeIds.map((id) => regions.find((region) => region.id === id)?.shortName).join(' · ')}</p>
                </div>
                <div className="space-y-3.5 pt-1">
                  <DetailSection label="What this system coordinates" block={selectedCircuit.role} accentColor={selectedCircuit.color} icon={Network} />
                  <DetailSection label="What research suggests" block={selectedCircuit.research} accentColor={selectedCircuit.color} icon={Brain} />
                  <DetailSection label="Possible everyday relevance" block={selectedCircuit.daily} accentColor={selectedCircuit.color} icon={Activity} />
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
  );
}
