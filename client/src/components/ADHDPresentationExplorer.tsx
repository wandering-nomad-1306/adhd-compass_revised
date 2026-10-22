import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Footprints,
  Info,
  Layers3,
  ListChecks,
} from 'lucide-react';
import { useState } from 'react';

const presentations = [
  {
    id: 'inattentive',
    name: 'Predominantly inattentive',
    short: 'Attention & organization',
    color: '#6b9ba8',
    icon: CircleDot,
    description:
      'The most visible difficulties are sustaining attention, organizing work, following through on instructions, remembering everyday tasks, and filtering out competing distraction.',
    dsmCriterion: 'DSM-5-TR Criterion A1 (Inattention): Requires ≥ 6 symptoms for children up to age 16, or ≥ 5 symptoms for individuals age 17 and older, persistent for at least 6 months.',
    examples: [
      'Overlooks details or makes careless mistakes in work or schoolwork',
      'Struggles to sustain attention during lectures, conversations, or lengthy reading',
      'Starts tasks but becomes sidetracked and fails to follow through to completion',
      'Frequently misplaces necessary items (keys, wallet, phone, work documents)',
      'Easily sidetracked by extraneous stimuli or unrelated internal thoughts',
      'Forgetful in daily activities (paying bills, keeping appointments, returning messages)',
    ],
    adultNote:
      'In adulthood, inattention rarely presents as obvious daydreaming in class. Instead, it manifests as chronic disorganization, executive procrastination, missed professional deadlines, mental fatigue during administrative tasks, or difficulty managing complex multi-step responsibilities.',
  },
  {
    id: 'hyperactive',
    name: 'Predominantly hyperactive-impulsive',
    short: 'Movement & self-control',
    color: '#a96952',
    icon: Footprints,
    description:
      'The most visible difficulties involve persistent physical or verbal restlessness, acting before reflecting, interrupting others, and marked difficulty with inhibition and waiting.',
    dsmCriterion: 'DSM-5-TR Criterion A2 (Hyperactivity-Impulsivity): Requires ≥ 6 symptoms for children up to age 16, or ≥ 5 symptoms for individuals age 17 and older, persistent for at least 6 months.',
    examples: [
      'Fidgets with hands or feet, taps, or squirms uncomfortably in seat',
      'Leaves seat in meetings, classrooms, or situations where remaining seated is expected',
      'Feels an internal motor restlessness (or physical running/climbing in children)',
      'Finds quiet leisure activities uncomfortable or difficult to engage in calmly',
      'Talks excessively or feels compelled to keep speaking',
      'Blurts out answers before a question is completed or finishes others’ sentences',
      'Has difficulty waiting turn in lines, traffic, conversations, or group activities',
      'Interrupts or intrudes on others (butts into conversations, meetings, or games)',
    ],
    adultNote:
      'Overt childhood physical running and climbing typically internalizes by adulthood into chronic subjective inner restlessness, constant stimulation-seeking, difficulty relaxing during downtime, talking rapidly, impulsive spending or decisions, and impatience with slow-paced situations.',
  },
  {
    id: 'combined',
    name: 'Combined presentation',
    short: 'Both symptom groups',
    color: '#7a9f7d',
    icon: Layers3,
    description:
      'A person meets diagnostic criteria across BOTH symptom clusters over the preceding 6 months: meeting the threshold for inattention AND the threshold for hyperactivity-impulsivity.',
    dsmCriterion: 'DSM-5-TR Combined Presentation: Requires meeting full thresholds for both Criterion A1 (Inattention) and Criterion A2 (Hyperactivity-Impulsivity) over the past 6 months.',
    examples: [
      'Sustained mental effort and organization are chronically disrupted',
      'Attention is rapidly pulled away by external distraction or internal tangents',
      'Internal restlessness or excessive verbal impulsivity is continuously present',
      'Difficulty waiting, interrupting others, and impulsive decision-making co-occur with disorganization',
    ],
    adultNote:
      'The clinical presentation is a longitudinal snapshot, not a permanent personality type. Presentations frequently fluctuate across the lifespan: a child with combined presentation may transition to predominantly inattentive in adulthood as overt hyperactivity diminishes.',
  },
] as const;

const dsmCriteria = {
  inattention: [
    { num: 'A1a', text: 'Often fails to give close attention to details or makes careless mistakes in schoolwork, at work, or during other activities (e.g., overlooks or misses details, work is inaccurate).' },
    { num: 'A1b', text: 'Often has difficulty sustaining attention in tasks or play activities (e.g., has difficulty remaining focused during lectures, conversations, or lengthy reading).' },
    { num: 'A1c', text: 'Often does not seem to listen when spoken to directly (e.g., mind seems elsewhere, even in the absence of any obvious distraction).' },
    { num: 'A1d', text: 'Often does not follow through on instructions and fails to finish schoolwork, chores, or duties in the workplace (e.g., starts tasks but quickly loses focus and is easily sidetracked).' },
    { num: 'A1e', text: 'Often has difficulty organizing tasks and activities (e.g., difficulty managing sequential tasks; difficulty keeping materials and belongings in order; messy, disorganized work; poor time management; fails to meet deadlines).' },
    { num: 'A1f', text: 'Often avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort (e.g., schoolwork or homework; for older adolescents and adults, preparing reports, completing forms, reviewing lengthy papers).' },
    { num: 'A1g', text: 'Often loses things necessary for tasks or activities (e.g., school materials, pencils, books, tools, wallets, keys, paperwork, eyeglasses, mobile telephones).' },
    { num: 'A1h', text: 'Is often easily distracted by extraneous stimuli (for older adolescents and adults, may include unrelated thoughts).' },
    { num: 'A1i', text: 'Is often forgetful in daily activities (e.g., doing chores, running errands; for older adolescents and adults, returning calls, paying bills, keeping appointments).' },
  ],
  hyperactivityImpulsivity: [
    { num: 'A2a', category: 'Hyperactivity', text: 'Often fidgets with or taps hands or feet or squirms in seat.' },
    { num: 'A2b', category: 'Hyperactivity', text: 'Often leaves seat in situations when remaining seated is expected (e.g., leaves their place in the classroom, office, or other workplace).' },
    { num: 'A2c', category: 'Hyperactivity', text: 'Often runs about or climbs in situations where it is inappropriate (Note: In adolescents or adults, may be limited to feeling restless).' },
    { num: 'A2d', category: 'Hyperactivity', text: 'Often unable to play or engage in leisure activities quietly.' },
    { num: 'A2e', category: 'Hyperactivity', text: 'Is often "on the go," acting as if "driven by a motor" (e.g., unable or uncomfortable being still for an extended time in restaurants, meetings).' },
    { num: 'A2f', category: 'Hyperactivity', text: 'Often talks excessively.' },
    { num: 'A2g', category: 'Impulsivity', text: 'Often blurts out an answer before a question has been completed (e.g., completes people’s sentences; cannot wait for turn in conversation).' },
    { num: 'A2h', category: 'Impulsivity', text: 'Often has difficulty waiting their turn (e.g., while waiting in line, in traffic, or during group activities).' },
    { num: 'A2i', category: 'Impulsivity', text: 'Often interrupts or intrudes on others (e.g., butts into conversations, games, or activities; may start using other people’s things without asking; for adolescents/adults, may intrude into or take over what others are doing).' },
  ],
};

export default function ADHDPresentationExplorer() {
  const [selectedId, setSelectedId] = useState<(typeof presentations)[number]['id']>('inattentive');
  const [showDsmDetails, setShowDsmDetails] = useState(false);
  const selected = presentations.find((item) => item.id === selectedId)!;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
        <div className="grid border-b border-sage-green/10 md:grid-cols-3">
          {presentations.map((item) => {
            const active = item.id === selectedId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                aria-pressed={active}
                className="relative flex min-h-28 items-center gap-3 border-b border-sage-green/10 px-5 py-5 text-left transition-colors last:border-b-0 hover:bg-warm-cream md:border-b-0 md:border-r md:last:border-r-0"
                style={{ backgroundColor: active ? `${item.color}14` : undefined }}
              >
                {active && (
                  <motion.span
                    layoutId="presentation-marker"
                    className="absolute inset-x-0 bottom-0 h-1 md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-1"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-serif text-lg font-bold text-foreground">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.short}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid gap-8 p-6 md:grid-cols-[1.1fr_.9fr] md:p-8"
          >
            <div>
              <p className="text-lg leading-relaxed text-foreground">{selected.description}</p>
              
              <div className="mt-4 rounded-xl border border-sage-green/20 bg-warm-cream/40 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-green">
                  Formal DSM-5-TR Diagnostic Rule
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground font-medium">
                  {selected.dsmCriterion}
                </p>
              </div>

              <div className="mt-5 rounded-xl bg-warm-cream p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sage-green">
                  Observable Symptoms in Daily Life
                </p>
                <ul className="space-y-2.5">
                  {selected.examples.map((example) => (
                    <li key={example} className="flex gap-3 text-sm leading-relaxed text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-5 rounded-xl border border-sage-green/10 p-5 bg-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Across the lifespan</p>
                <p className="mt-3 leading-relaxed text-foreground text-sm">{selected.adultNote}</p>
              </div>

              {/* Clinical distinction callout */}
              <div className="rounded-xl border border-amber-600/25 bg-amber-500/[0.06] p-4 text-xs leading-relaxed text-foreground">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <Info className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Cognitive Mechanism vs. DSM-5-TR Criterion</span>
                </div>
                <p className="text-muted-foreground">
                  Delay discounting (preferring immediate smaller rewards over delayed larger payoffs) is a well-established <strong className="text-foreground">neurocognitive characteristic</strong> of ADHD linked to striatal reward circuits, but it is <strong className="text-foreground">not</strong> one of the 9 formal DSM-5-TR diagnostic criteria. The actual DSM-5-TR impulsivity criterion is <em>difficulty waiting one's turn</em> (Criterion A2h).
                </p>
              </div>

              <p className="border-t border-sage-green/10 pt-4 text-xs leading-relaxed text-muted-foreground">
                A presentation describes the current active symptom pattern. It does not measure intelligence, effort, character, or human potential.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Expandable Full 18-Symptom DSM-5-TR Checklist & Diagnostic Requirements */}
      <div className="overflow-hidden rounded-2xl border border-sage-green/20 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setShowDsmDetails(!showDsmDetails)}
          aria-expanded={showDsmDetails}
          className="flex w-full items-center justify-between p-5 text-left transition hover:bg-warm-cream/50 md:p-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                The Complete 18-Symptom DSM-5-TR Diagnostic Criteria
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Official criteria from the American Psychiatric Association (2022) with adult and child diagnostic thresholds
              </p>
            </div>
          </div>
          <motion.span animate={{ rotate: showDsmDetails ? 180 : 0 }} className="rounded-full bg-warm-cream p-2 text-sage-green">
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>

        <AnimatePresence>
          {showDsmDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-sage-green/10 p-5 md:p-7 space-y-6"
            >
              <div className="grid gap-4 rounded-xl border border-sage-green/20 bg-warm-cream/50 p-5 sm:grid-cols-3 text-xs leading-relaxed text-foreground">
                <div>
                  <strong className="block text-sage-green font-bold uppercase tracking-wider mb-1">
                    Child Threshold (≤ 16 years)
                  </strong>
                  Requires at least <strong className="text-foreground">6 out of 9</strong> symptoms in either Inattention or Hyperactivity-Impulsivity (or both for Combined).
                </div>
                <div>
                  <strong className="block text-sage-green font-bold uppercase tracking-wider mb-1">
                    Adult Threshold (≥ 17 years)
                  </strong>
                  Requires at least <strong className="text-foreground">5 out of 9</strong> symptoms in either Inattention or Hyperactivity-Impulsivity (or both for Combined).
                </div>
                <div>
                  <strong className="block text-sage-green font-bold uppercase tracking-wider mb-1">
                    Universal Diagnostic Rules
                  </strong>
                  Persistent for ≥ 6 months; several symptoms present prior to age 12; present in ≥ 2 distinct settings; clear impairment in social/occupational life.
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* 9 Inattention Symptoms */}
                <div className="rounded-xl border border-[#6b9ba8]/25 bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6b9ba8]/20 text-[#6b9ba8] text-xs font-bold">
                      A1
                    </span>
                    <h4 className="font-serif text-lg font-bold text-foreground">
                      9 Inattention Symptoms (Criterion A1)
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {dsmCriteria.inattention.map((item) => (
                      <li key={item.num} className="text-xs leading-relaxed text-foreground border-b border-sage-green/10 pb-2.5 last:border-b-0 last:pb-0">
                        <strong className="text-[#6b9ba8] mr-2 font-mono">{item.num}</strong>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 9 Hyperactivity / Impulsivity Symptoms */}
                <div className="rounded-xl border border-[#a96952]/25 bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a96952]/20 text-[#a96952] text-xs font-bold">
                      A2
                    </span>
                    <h4 className="font-serif text-lg font-bold text-foreground">
                      9 Hyperactive-Impulsive Symptoms (Criterion A2)
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {dsmCriteria.hyperactivityImpulsivity.map((item) => (
                      <li key={item.num} className="text-xs leading-relaxed text-foreground border-b border-sage-green/10 pb-2.5 last:border-b-0 last:pb-0">
                        <span className="inline-flex items-center gap-1.5 mr-2">
                          <strong className="text-[#a96952] font-mono">{item.num}</strong>
                          <span className="rounded bg-warm-cream px-1.5 py-0.5 text-[10px] text-muted-foreground uppercase">
                            {item.category}
                          </span>
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-sage-green/15 bg-warm-cream/30 p-4 text-xs leading-relaxed text-muted-foreground">
                <strong>Source:</strong> American Psychiatric Association. (2022). <em>Diagnostic and Statistical Manual of Mental Disorders (5th ed., text rev.) (DSM-5-TR)</em>. Washington, DC. Criteria are for clinical reference only and do not substitute for a comprehensive neuropsychiatric evaluation.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
