import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Network, ScanSearch } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';

type ViewMode = 'regions' | 'connections';

type Shape =
  | { type: 'path'; d: string }
  | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number; rotate?: number };

interface BrainRegion {
  id: string;
  name: string;
  shortName: string;
  color: string;
  shape: Shape;
  label: { x: number; y: number };
  role: string;
  function: string;
  research: string;
  daily: string;
  limit: string;
}

interface BrainCircuit {
  id: string;
  name: string;
  color: string;
  path: string;
  nodes: string[];
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
    shape: {
      type: 'path',
      d: 'M72 120 C78 102 96 92 122 96 C118 116 121 140 132 158 C112 166 88 158 76 143 C72 136 70 128 72 120 Z',
    },
    label: { x: 103, y: 105 },
    role: 'Keeping goals active and controlling responses',
    function:
      'Prefrontal regions help hold a goal in mind, use working memory, plan several steps, compare choices, resist an immediate response, and direct attention toward what matters now.',
    research:
      'ADHD research repeatedly implicates frontal control systems and their connections with parietal, striatal, cingulate, and cerebellar regions. Findings vary by age, task, and individual; the evidence does not support one uniformly “underactive” frontal lobe.',
    daily:
      'Possible everyday effects include losing the plan after an interruption, starting before checking instructions, struggling to organize a sequence, or knowing what to do but not applying it at the required moment.',
    limit:
      'These abilities are distributed across networks. A routine scan of the prefrontal cortex cannot diagnose ADHD or predict how one person will function.',
  },
  {
    id: 'parietal',
    name: 'Parietal attention cortex',
    shortName: 'Parietal cortex',
    color: '#5b6f96',
    shape: {
      type: 'path',
      d: 'M118 96 C142 80 178 82 204 97 C194 113 177 128 160 138 C141 131 128 115 118 96 Z',
    },
    label: { x: 163, y: 89 },
    role: 'Directing and maintaining attention',
    function:
      'Parietal regions work with frontal areas to orient attention, represent where information is, keep task relationships active, and shift attention deliberately when priorities change.',
    research:
      'Frontoparietal networks are frequently studied in ADHD during sustained attention and working-memory tasks. A large NIH-supported study also found atypical connectivity involving inferior parietal and frontal regions in youth with ADHD symptoms.',
    daily:
      'Possible effects include losing one’s place, missing a relevant detail, difficulty keeping several task elements active, or having attention pulled away from the intended target.',
    limit:
      'Attention difficulty is not specific to ADHD and can also be affected by sleep, anxiety, depression, pain, stress, and medical conditions.',
  },
  {
    id: 'acc',
    name: 'Anterior cingulate cortex',
    shortName: 'Anterior cingulate',
    color: '#925e76',
    shape: {
      type: 'path',
      d: 'M296 77 C307 87 312 104 311 123 C310 143 304 160 297 173 C292 158 290 140 291 119 C291 101 292 87 296 77 Z',
    },
    label: { x: 301, y: 87 },
    role: 'Monitoring conflict, errors, effort, and adjustment',
    function:
      'The anterior cingulate helps detect when responses compete, notice errors, monitor whether an action is working, and signal that more control or a different strategy may be needed.',
    research:
      'Imaging studies report group-level differences in cingulate activity and connectivity during inhibition, error monitoring, and cognitive-control tasks. Results are not identical across studies or age groups.',
    daily:
      'Possible effects include noticing an error late, continuing an ineffective approach, or realizing that the priority changed only after time has already been lost.',
    limit:
      'Error monitoring and task switching are not controlled by the cingulate alone; they depend on wider frontal, parietal, and subcortical networks.',
  },
  {
    id: 'striatum',
    name: 'Striatum',
    shortName: 'Striatum',
    color: '#a96952',
    shape: { type: 'path', d: 'M272 137 C281 129 294 130 301 139 C303 148 297 157 286 160 C276 158 269 149 272 137 Z M321 137 C330 129 343 130 350 139 C352 148 346 157 335 160 C325 158 318 149 321 137 Z' },
    label: { x: 311, y: 139 },
    role: 'Selecting actions, learning from reward, and forming habits',
    function:
      'The striatum includes the caudate, putamen, and nucleus accumbens. It helps choose and prepare actions, learn from feedback, estimate reward and effort, support movement, and build repeated behavior patterns.',
    research:
      'Frontal–striatal circuitry is central to many ADHD models. In 2024, an NIH-supported analysis of more than 8,000 youth linked ADHD symptoms with atypical connectivity between frontal regions and the caudate, putamen, and nucleus accumbens.',
    daily:
      'This may help explain why immediate feedback, visible progress, novelty, or urgency can change task initiation and persistence, while distant or uncertain outcomes have less influence in the moment.',
    limit:
      'Reward-system findings do not mean that people with ADHD only care about enjoyable activities. Values, stress, learning, sleep, and task design also affect action.',
  },
  {
    id: 'insula',
    name: 'Insula',
    shortName: 'Insula',
    color: '#6b9ba8',
    shape: {
      type: 'path',
      d: 'M137 137 C147 131 159 133 166 142 C167 152 160 160 150 162 C141 158 135 149 137 137 Z',
    },
    label: { x: 151, y: 138 },
    role: 'Detecting important internal and external signals',
    function:
      'The insula helps represent body state, detect salient events, and coordinate switching between networks used for internal thought and goal-directed control.',
    research:
      'Recent large-scale ADHD connectivity work implicated the insula alongside frontal, parietal, and deep brain structures. It is best understood as one part of a broader salience and control system.',
    daily:
      'Possible relevance includes a vivid distraction or internal sensation capturing attention more strongly than a quiet future priority.',
    limit:
      'The insula lies beneath the outer cortex. Its position is shown schematically here and cannot be interpreted as a diagnostic finding.',
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    shortName: 'Cerebellum',
    color: '#7e8249',
    shape: {
      type: 'path',
      d: 'M142 188 C165 180 195 184 211 198 C204 216 178 224 154 216 C144 208 139 198 142 188 Z',
    },
    label: { x: 177, y: 220 },
    role: 'Timing, prediction, coordination, and learning',
    function:
      'The cerebellum coordinates movement, but it also contributes to timing, prediction, repeated learning, and the smooth coordination of cognitive operations with cortical systems.',
    research:
      'Frontal–striatal–cerebellar circuits are repeatedly studied in ADHD, particularly during response-control, timing, and executive-function tasks. Findings are statistical group patterns, not a universal marker.',
    daily:
      'Possible relevance includes variable response timing, difficulty pacing an action, or less consistent coordination between a plan and its execution.',
    limit:
      'The cerebellum does not explain ADHD by itself. Timing and coordination depend on wider networks and the demands of the current task.',
  },
];

const circuits: BrainCircuit[] = [
  {
    id: 'control-action',
    name: 'Control and action',
    color: '#a96952',
    path: 'M555 124 C535 132 518 143 500 150',
    nodes: ['Prefrontal cortex', 'Anterior cingulate', 'Striatum'],
    role: 'Connects goals and response control with action selection and feedback learning.',
    research:
      'Frontal–striatal circuits are among the most consistently discussed networks in ADHD research, although no single connection pattern is shared by everyone.',
    daily:
      'Relevant to inhibition, starting an action, learning from consequences, and the strong effect of immediate feedback.',
  },
  {
    id: 'attention',
    name: 'Attention control',
    color: '#5b6f96',
    path: 'M552 112 C525 94 489 91 456 108',
    nodes: ['Prefrontal cortex', 'Parietal cortex', 'Insula'],
    role: 'Keeps task goals active and directs attention toward relevant information.',
    research:
      'Frontoparietal and salience-control networks are implicated in sustained attention, working memory, and deliberate switching of attention.',
    daily:
      'Relevant to keeping track of instructions, resisting competing information, and returning attention after an interruption.',
  },
  {
    id: 'monitoring',
    name: 'Salience and monitoring',
    color: '#925e76',
    path: 'M530 120 C511 133 496 146 482 160',
    nodes: ['Anterior cingulate', 'Insula', 'Frontal control regions'],
    role: 'Detects important signals, monitors conflict, and helps redirect control.',
    research:
      'Studies associate ADHD with differences in coordination among salience, attention, and control networks, but findings vary across tasks and people.',
    daily:
      'Relevant when a vivid distraction wins over a quiet priority or when the need to switch is noticed late.',
  },
  {
    id: 'timing',
    name: 'Timing and coordination',
    color: '#7e8249',
    path: 'M548 136 C512 155 463 179 422 195',
    nodes: ['Prefrontal cortex', 'Striatum', 'Cerebellum'],
    role: 'Coordinates planning, timing, prediction, and execution.',
    research:
      'Frontal–striatal–cerebellar networks are studied in ADHD during timing, response-control, and executive-function tasks.',
    daily:
      'Relevant to pacing, transitions, response timing, and translating a plan into a sequence of actions.',
  },
];

function handleSvgKey(event: KeyboardEvent<SVGElement>, onSelect: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onSelect();
  }
}

function RegionShape({
  region,
  selected,
  hovered,
  dimmed,
  onSelect,
  onHover,
}: {
  region: BrainRegion;
  selected: boolean;
  hovered: boolean;
  dimmed: boolean;
  onSelect: () => void;
  onHover: (active: boolean) => void;
}) {
  const opacity = dimmed ? 0.16 : selected ? 0.72 : hovered ? 0.58 : 0.34;
  const isInternal = region.id === 'acc' || region.id === 'striatum' || region.id === 'insula';
  const props = {
    fill: region.color,
    opacity,
    stroke: selected ? '#fffdf8' : region.color,
    strokeWidth: selected ? 4 : 2,
    strokeDasharray: isInternal ? '6 4' : undefined,
    role: 'button',
    tabIndex: 0,
    'aria-label': `Show information about ${region.name}`,
    onClick: onSelect,
    onMouseEnter: () => onHover(true),
    onMouseLeave: () => onHover(false),
    onFocus: () => onHover(true),
    onBlur: () => onHover(false),
    onKeyDown: (event: KeyboardEvent<SVGElement>) => handleSvgKey(event, onSelect),
    style: { cursor: 'pointer', outline: 'none' },
  };

  return (
    <g>
      {region.shape.type === 'path' ? (
        <motion.path d={region.shape.d} {...props} animate={{ opacity }} transition={{ duration: 0.18 }} />
      ) : (
        <motion.ellipse
          cx={region.shape.cx}
          cy={region.shape.cy}
          rx={region.shape.rx}
          ry={region.shape.ry}
          transform={`rotate(${region.shape.rotate ?? 0} ${region.shape.cx} ${region.shape.cy})`}
          {...props}
          animate={{ opacity }}
          transition={{ duration: 0.18 }}
        />
      )}

      {(selected || hovered) && !dimmed && (
        <g pointerEvents="none">
          <rect
            x={region.label.x - 66}
            y={region.label.y - 30}
            width="132"
            height="28"
            rx="9"
            fill="#fffdf8"
            stroke={region.color}
            strokeWidth="1.5"
          />
          <text x={region.label.x} y={region.label.y - 11} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#2c332d">
            {region.shortName}
          </text>
        </g>
      )}
    </g>
  );
}

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-sage-green/10 pt-4 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-bold text-foreground">{label}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

export default function BrainNetworkViz() {
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<ViewMode>('regions');
  const [selectedRegionId, setSelectedRegionId] = useState('pfc');
  const [selectedCircuitId, setSelectedCircuitId] = useState('control-action');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  const selectedRegion = useMemo(
    () => regions.find((region) => region.id === selectedRegionId) ?? regions[0],
    [selectedRegionId],
  );
  const selectedCircuit = useMemo(
    () => circuits.find((circuit) => circuit.id === selectedCircuitId) ?? circuits[0],
    [selectedCircuitId],
  );

  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-sage-green/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-foreground">Anatomical brain map</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The three anatomical views provide orientation. Colored overlays show approximate regions relevant to ADHD research; deep structures are marked schematically and this is not a diagnostic scan.
          </p>
        </div>
        <div className="inline-flex self-start rounded-xl border border-sage-green/15 bg-warm-cream p-1" role="tablist" aria-label="Brain diagram view">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'regions'}
            onClick={() => setView('regions')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              view === 'connections' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Network className="h-4 w-4" /> Connections
          </button>
        </div>
      </div>

      <div className="grid min-w-0 lg:grid-cols-5">
        <div className="min-w-0 border-b border-sage-green/10 bg-gradient-to-br from-[#fbf7ed] to-[#eef1eb] p-4 sm:p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 612 315"
            className="mx-auto h-auto w-full max-w-[42rem]"
            role="img"
            aria-label="Interactive anatomical brain reference showing approximate regions and connections relevant to ADHD research"
          >
            <defs>
              <filter id="brainImageShadow" x="-10%" y="-15%" width="120%" height="135%">
                <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#526050" floodOpacity="0.12" />
              </filter>
              {circuits.map((circuit) => (
                <marker
                  key={circuit.id}
                  id={`arrow-${circuit.id}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={circuit.color} />
                </marker>
              ))}
            </defs>

            <rect x="0" y="0" width="612" height="315" rx="22" fill="#f8f0d9" opacity="0.34" />
            <g filter="url(#brainImageShadow)">
              <image
                href="/images/brain-anatomy-reference.png"
                x="0"
                y="12"
                width="612"
                height="291"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            <text x="112" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6f746d">
              Outer side view
            </text>
            <text x="306" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6f746d">
              Top view
            </text>
            <text x="503" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6f746d">
              Network view
            </text>

            {regions.map((region) => (
              <RegionShape
                key={region.id}
                region={region}
                selected={view === 'regions' && selectedRegionId === region.id}
                hovered={hoveredRegionId === region.id}
                dimmed={view === 'connections'}
                onSelect={() => {
                  setView('regions');
                  setSelectedRegionId(region.id);
                }}
                onHover={(active) => setHoveredRegionId(active ? region.id : null)}
              />
            ))}

            {view === 'connections' &&
              circuits.map((circuit) => {
                const selected = selectedCircuit.id === circuit.id;
                return (
                  <motion.path
                    key={circuit.id}
                    d={circuit.path}
                    fill="none"
                    stroke={circuit.color}
                    strokeWidth={selected ? 7 : 4}
                    strokeLinecap="round"
                    strokeDasharray={selected ? '0' : '8 8'}
                    opacity={selected ? 0.95 : 0.38}
                    markerEnd={`url(#arrow-${circuit.id})`}
                    initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: selected ? 0.95 : 0.38 }}
                    transition={{ duration: 0.6 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${circuit.name}`}
                    onClick={() => setSelectedCircuitId(circuit.id)}
                    onKeyDown={(event) => handleSvgKey(event, () => setSelectedCircuitId(circuit.id))}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  />
                );
              })}

            <text x="306" y="310" textAnchor="middle" fontSize="10.5" fill="#77756f">
              Deep structures are shown schematically because they are not visible on the brain surface.
            </text>
          </svg>

          {view === 'regions' ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Brain regions">
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegionId(region.id)}
                  className="rounded-xl border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-4"
                  style={{
                    borderColor: selectedRegion.id === region.id ? region.color : `${region.color}44`,
                    backgroundColor: selectedRegion.id === region.id ? region.color : '#ffffff',
                    color: selectedRegion.id === region.id ? '#ffffff' : region.color,
                  }}
                >
                  {region.shortName}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Brain connections">
              {circuits.map((circuit) => (
                <button
                  key={circuit.id}
                  type="button"
                  onClick={() => setSelectedCircuitId(circuit.id)}
                  className="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-4"
                  style={{
                    borderColor: selectedCircuit.id === circuit.id ? circuit.color : `${circuit.color}44`,
                    backgroundColor: selectedCircuit.id === circuit.id ? circuit.color : '#ffffff',
                    color: selectedCircuit.id === circuit.id ? '#ffffff' : circuit.color,
                  }}
                >
                  {circuit.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 p-5 sm:p-7 lg:col-span-2">
          <AnimatePresence mode="wait">
            {view === 'regions' ? (
              <motion.div
                key={selectedRegion.id}
                initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
                  style={{ backgroundColor: selectedRegion.color }}
                >
                  Brain region
                </span>
                <h3 className="mt-4 font-serif text-3xl font-bold text-foreground">{selectedRegion.name}</h3>
                <p className="mt-2 text-base font-semibold leading-relaxed" style={{ color: selectedRegion.color }}>
                  {selectedRegion.role}
                </p>
                <div className="mt-6 space-y-4">
                  <Section label="Main function" text={selectedRegion.function} />
                  <Section label="ADHD research" text={selectedRegion.research} />
                  <Section label="Possible everyday relevance" text={selectedRegion.daily} />
                  <Section label="Important limitation" text={selectedRegion.limit} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCircuit.id}
                initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white"
                  style={{ backgroundColor: selectedCircuit.color }}
                >
                  Brain connection
                </span>
                <h3 className="mt-4 font-serif text-3xl font-bold text-foreground">{selectedCircuit.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCircuit.nodes.map((node) => (
                    <span key={node} className="rounded-full bg-warm-cream px-3 py-1 text-xs font-semibold text-foreground">
                      {node}
                    </span>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <Section label="What the circuit supports" text={selectedCircuit.role} />
                  <Section label="ADHD research" text={selectedCircuit.research} />
                  <Section label="Possible everyday relevance" text={selectedCircuit.daily} />
                  <Section
                    label="Important limitation"
                    text="These lines are a teaching aid. Real brain networks are three-dimensional, bidirectional, and much more complex, and their appearance cannot diagnose ADHD in one person."
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-sage-green/10 bg-warm-cream/60 px-5 py-4 text-xs leading-relaxed text-muted-foreground sm:px-7">
        Educational model based on established brain anatomy and ADHD network research. Shapes and connection lines are approximate and intentionally simplified for clarity.
      </div>
    </div>
  );
}
