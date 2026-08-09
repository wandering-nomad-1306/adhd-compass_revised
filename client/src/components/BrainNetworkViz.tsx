import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Info, Network, ScanSearch } from 'lucide-react';
import { useMemo, useState } from 'react';

type ViewMode = 'regions' | 'connections';

type RegionId = 'pfc' | 'parietal' | 'acc' | 'striatum' | 'insula' | 'cerebellum';

interface BrainRegion {
  id: RegionId;
  name: string;
  shortName: string;
  color: string;
  role: string;
  function: string;
  research: string;
  daily: string;
  limit: string;
  surfaceVisible: boolean;
}

interface BrainCircuit {
  id: string;
  name: string;
  color: string;
  nodeIds: RegionId[];
  role: string;
  research: string;
  daily: string;
}

const regions: BrainRegion[] = [
  {
    id: 'pfc',
    name: 'Prefrontal cortex',
    shortName: 'Prefrontal cortex',
    color: '#4f7659',
    role: 'Keeping goals active and regulating actions',
    function:
      'The prefrontal cortex supports working memory, planning, response inhibition, monitoring and flexible control. It helps keep a goal active long enough for that goal to influence what you do next.',
    research:
      'ADHD research repeatedly identifies group-level differences in frontal activity and in communication between frontal regions and deeper systems involved in action, reward and attention. These findings overlap across people and are not a diagnostic brain signature.',
    daily:
      'This can help explain why someone may know the plan but lose it while acting, struggle to pause before responding, or find a multi-step task harder to organize without external structure.',
    limit:
      '“Prefrontal cortex” covers several areas rather than one sharply bounded patch. The highlighted lateral zone is an anatomical approximation of the anterior frontal association cortex, not a surgical boundary or a diagnostic marker.',
    surfaceVisible: true,
  },
  {
    id: 'parietal',
    name: 'Posterior parietal attention cortex',
    shortName: 'Parietal cortex',
    color: '#d0b92e',
    role: 'Selecting and maintaining relevant information',
    function:
      'Posterior parietal regions work with frontal systems to orient attention, represent task-relevant information and redirect attention when priorities change.',
    research:
      'Frontoparietal systems are frequently studied in ADHD during sustained-attention and working-memory tasks. Differences are found at the group level, but they vary by age, task and individual.',
    daily:
      'Possible effects include losing your place, missing a relevant detail or having attention pulled away even though you understand what you were trying to do.',
    limit:
      'The attention network spans multiple parietal areas rather than one isolated spot. The highlighted region is a simplified posterior-parietal teaching zone, not a diagnostic boundary.',
    surfaceVisible: true,
  },
  {
    id: 'acc',
    name: 'Anterior cingulate cortex',
    shortName: 'Anterior cingulate',
    color: '#925e76',
    role: 'Monitoring conflict, errors and effort',
    function:
      'The anterior cingulate helps detect conflict, monitor errors and signal that more control or a change in strategy may be needed.',
    research:
      'Studies report average differences in cingulate activity and connectivity during inhibition and cognitive-control tasks. Results are mixed and depend on the task and sample.',
    daily:
      'Possible relevance includes noticing an error late, persisting with an ineffective approach or recognizing a change in priority after time has already been lost.',
    limit:
      'The anterior cingulate lies on the medial surface around the corpus callosum, so it is not exposed in the outer lateral view. It is highlighted only in the cutaway view.',
    surfaceVisible: false,
  },
  {
    id: 'striatum',
    name: 'Striatum',
    shortName: 'Striatum',
    color: '#a96952',
    role: 'Action selection, reward learning and habit formation',
    function:
      'The striatum includes the caudate, putamen and ventral striatal structures. These nuclei help select actions, learn from outcomes, support movement and use reward information to influence what happens next.',
    research:
      'Frontal–striatal circuits are central to many ADHD models. Large studies have linked ADHD symptoms with atypical connectivity involving frontal regions and parts of the striatum, including the caudate, putamen and nucleus accumbens.',
    daily:
      'This may help explain why immediate feedback, visible progress, novelty or urgency can change task initiation and persistence more strongly than a distant reward.',
    limit:
      'The striatum is deep inside the cerebral hemisphere and cannot be seen on a lateral surface image. Its cutaway shape is intentionally schematic rather than an MRI segmentation.',
    surfaceVisible: false,
  },
  {
    id: 'insula',
    name: 'Insula',
    shortName: 'Insula',
    color: '#5f9aaa',
    role: 'Detecting salient internal and external signals',
    function:
      'The insula sits deep in the lateral sulcus beneath parts of the frontal, parietal and temporal lobes. It helps represent body state and participates in salience networks that identify information that may deserve attention.',
    research:
      'ADHD connectivity studies implicate the insula alongside frontal, parietal, cingulate and deeper structures. It is best understood as one part of a larger salience-and-control system.',
    daily:
      'A vivid notification, emotion or body sensation may capture attention more strongly than a quiet future priority.',
    limit:
      'The insula is hidden by the opercula on an intact lateral brain and is not truly exposed in a midline sagittal view. The cutaway window shows its relative deep-lateral position for orientation only.',
    surfaceVisible: false,
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    shortName: 'Cerebellum',
    color: '#7e8249',
    role: 'Timing, prediction and coordination',
    function:
      'The cerebellum is important for movement, but it also contributes to timing, prediction, learning and coordination with cortical systems.',
    research:
      'Frontal–striatal–cerebellar circuits are repeatedly studied in ADHD during timing, response-control and executive-function tasks. Findings remain group-level patterns rather than individual markers.',
    daily:
      'Possible relevance includes variable response timing, difficulty pacing actions or less consistent coordination between a plan and its execution.',
    limit:
      'The cerebellum contributes to many functions and does not explain ADHD by itself.',
    surfaceVisible: true,
  },
];

const circuits: BrainCircuit[] = [
  {
    id: 'control-action',
    name: 'Control and action',
    color: '#a96952',
    nodeIds: ['pfc', 'acc', 'striatum'],
    role: 'Links goal maintenance and response monitoring with action selection and learning from consequences.',
    research:
      'Frontal–striatal systems are among the most consistently discussed networks in ADHD research, but there is no single connection pattern shared by every person with ADHD.',
    daily:
      'Relevant to pausing, starting an action, using feedback and learning which responses are worth repeating.',
  },
  {
    id: 'attention',
    name: 'Attention control',
    color: '#5b6f96',
    nodeIds: ['pfc', 'parietal', 'insula'],
    role: 'Coordinates goal maintenance with the selection and redirection of attention.',
    research:
      'Frontoparietal and salience-control networks are implicated in sustained attention, working memory and deliberate redirection of attention.',
    daily:
      'Relevant to keeping track of instructions, resisting competing information and returning to a task after interruption.',
  },
  {
    id: 'monitoring',
    name: 'Salience and monitoring',
    color: '#925e76',
    nodeIds: ['insula', 'acc', 'pfc'],
    role: 'Coordinates detection of important signals with conflict monitoring and recruitment of control.',
    research:
      'Studies associate ADHD with differences in coordination among salience, attention and control networks, while also showing substantial variability among individuals.',
    daily:
      'Relevant when a vivid distraction wins over a quiet priority or when the need to switch is recognized late.',
  },
  {
    id: 'timing',
    name: 'Timing and coordination',
    color: '#7e8249',
    nodeIds: ['pfc', 'striatum', 'cerebellum'],
    role: 'Coordinates planning, action selection, timing, prediction and execution.',
    research:
      'Frontal–striatal–cerebellar systems are studied in ADHD during timing, response-control and executive-function tasks.',
    daily:
      'Relevant to pacing, transitions, response timing and translating a plan into a sequence of actions.',
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

function DetailSection({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-sage-green/10 pt-4 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-bold text-foreground">{label}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function SurfaceBrain({ activeIds, onSelect }: { activeIds: RegionId[]; onSelect: (id: RegionId) => void }) {
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const highlighted = hovered ?? activeIds.find((id) => surfaceOverlay[id]) ?? null;
  const deepActive = activeIds.filter((id) => !surfaceOverlay[id]);
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

      {insulaActive && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 w-[min(92%,29rem)] -translate-x-1/2 rounded-xl border border-[#5f9aaa]/25 bg-white/94 px-3 py-2 text-center text-[10px] font-semibold leading-snug text-[#4d7f8d] shadow-sm backdrop-blur-sm sm:text-xs">
          Insula: deep to the lateral sulcus beneath the frontal, parietal and temporal opercula. The dashed window shows where it is hidden, not an exposed surface boundary.
        </div>
      )}

      {!insulaActive && deepActive.length > 0 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 w-[min(92%,28rem)] -translate-x-1/2 rounded-xl border border-sage-green/15 bg-white/94 px-3 py-2 text-center text-[10px] font-semibold leading-snug text-muted-foreground shadow-sm backdrop-blur-sm sm:text-xs">
          {deepActive.map((id) => regions.find((region) => region.id === id)?.shortName).join(' · ')} {deepActive.length === 1 ? 'is' : 'are'} deep — see the research cutaway below.
        </div>
      )}
    </div>
  );
}

function MedialResearchBrain({ activeIds }: { activeIds: RegionId[] }) {
  const coloredIds = activeIds.filter((id) => medialOverlay[id]);
  const insulaActive = activeIds.includes('insula');
  const surfaceOnly = activeIds.length > 0 && coloredIds.length === 0 && !insulaActive;

  return (
    <div className="relative mx-auto aspect-[260/275] w-full max-w-[31rem] overflow-hidden rounded-[22px] bg-white">
      <img
        src="/images/adhd-medial-grayscale.png"
        alt="Medial research illustration of brain structures relevant to ADHD"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {coloredIds.map((id) => (
        <motion.img
          key={id}
          src={medialOverlay[id]}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16 }}
        />
      ))}

      {insulaActive && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#5f9aaa]/30 bg-white/95 px-3 py-2 text-center text-[10px] font-semibold leading-snug text-[#4d7f8d] shadow-sm sm:text-xs">
          The insula is not exposed in a midline medial section. It lies deep in the lateral sulcus, so it is intentionally not painted onto this view.
        </div>
      )}

      {surfaceOnly && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-sage-green/15 bg-white/95 px-3 py-2 text-center text-[10px] font-semibold leading-snug text-muted-foreground shadow-sm sm:text-xs">
          This cutaway is for deep structures. The selected cortical surface region is highlighted in the lateral view above.
        </div>
      )}
    </div>
  );
}

function CircuitRelationship({ circuit }: { circuit: BrainCircuit }) {
  return (
    <div className="mt-4 rounded-2xl border border-sage-green/10 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Regions highlighted in this system</p>
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
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">This is a relationship map, not a tractography image. The regions interact through distributed and often reciprocal pathways; the 2D diagrams highlight anatomy without inventing a single wire between them.</p>
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
          <p className="font-bold text-foreground">Brain regions and connected systems</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">The lateral image is grayscale by design: only the selected surface region returns to color. Deep structures are shown in the research cutaway below rather than projected onto the outside of the brain.</p>
        </div>
        <div className="inline-flex self-start rounded-xl border border-sage-green/15 bg-warm-cream p-1" role="tablist" aria-label="Brain diagram view">
          <button type="button" role="tab" aria-selected={view === 'regions'} onClick={() => setView('regions')} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${view === 'regions' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><ScanSearch className="h-4 w-4" /> Regions</button>
          <button type="button" role="tab" aria-selected={view === 'connections'} onClick={() => setView('connections')} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${view === 'connections' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}><Network className="h-4 w-4" /> Connections</button>
        </div>
      </div>

      <div className="grid min-w-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="min-w-0 border-b border-sage-green/10 bg-[#fbf7ed] p-3 sm:p-5 lg:border-b-0 lg:border-r">
          <SurfaceBrain activeIds={activeIds} onSelect={selectRegion} />

          {view === 'regions' ? (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Brain regions">
              {regions.map((region) => {
                const active = region.id === selectedRegionId;
                return (
                  <button key={region.id} type="button" onClick={() => setSelectedRegionId(region.id)} className="min-w-0 rounded-xl border px-2.5 py-2.5 text-left text-xs font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4" style={{ borderColor: active ? region.color : `${region.color}55`, backgroundColor: active ? region.color : '#ffffff', color: active ? '#ffffff' : region.color }}>
                    {region.shortName}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2" aria-label="Brain connections">
              {circuits.map((circuit) => {
                const active = circuit.id === selectedCircuitId;
                return (
                  <button key={circuit.id} type="button" onClick={() => setSelectedCircuitId(circuit.id)} className="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold leading-tight transition focus-visible:outline-none focus-visible:ring-4" style={{ borderColor: active ? circuit.color : `${circuit.color}55`, backgroundColor: active ? circuit.color : '#ffffff', color: active ? '#ffffff' : circuit.color }}>
                    {circuit.name}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-4 overflow-hidden rounded-[22px] border border-sage-green/10 bg-white shadow-sm">
            <MedialResearchBrain activeIds={activeIds} />
          </div>

          {view === 'connections' && <CircuitRelationship circuit={selectedCircuit} />}
        </div>

        <div className="min-w-0 p-5 sm:p-7 lg:sticky lg:top-6 lg:self-start">
          <AnimatePresence mode="wait">
            {view === 'regions' ? (
              <motion.div key={selectedRegion.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: selectedRegion.color }}>Brain region</span>
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">{selectedRegion.name}</h3>
                <p className="mt-2 font-semibold leading-relaxed" style={{ color: selectedRegion.color }}>{selectedRegion.role}</p>
                <div className="mt-6 space-y-4">
                  <DetailSection label="Main function" text={selectedRegion.function} />
                  <DetailSection label="ADHD research" text={selectedRegion.research} />
                  <DetailSection label="Possible everyday relevance" text={selectedRegion.daily} />
                  <DetailSection label="Anatomical limitation" text={selectedRegion.limit} />
                </div>
              </motion.div>
            ) : (
              <motion.div key={selectedCircuit.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: selectedCircuit.color }}>Connected system</span>
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">{selectedCircuit.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: selectedCircuit.color }}>{selectedCircuit.nodeIds.map((id) => regions.find((region) => region.id === id)?.shortName).join(' · ')}</p>
                <div className="mt-6 space-y-4">
                  <DetailSection label="What this system helps coordinate" text={selectedCircuit.role} />
                  <DetailSection label="What research suggests" text={selectedCircuit.research} />
                  <DetailSection label="Possible everyday relevance" text={selectedCircuit.daily} />
                </div>
                <div className="mt-6 flex gap-3 rounded-2xl bg-warm-cream p-4"><Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-green" /><p className="text-sm leading-relaxed text-muted-foreground">Connection mode colors the anatomical regions implicated in the selected system but deliberately avoids drawing a fake single tract. Real functional communication is distributed and reciprocal.</p></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
