import { AnimatePresence, motion } from 'framer-motion';
import { CircleDot, Footprints, Layers3 } from 'lucide-react';
import { useState } from 'react';

const presentations = [
  {
    id: 'inattentive',
    name: 'Predominantly inattentive',
    short: 'Attention & organization',
    color: '#6b9ba8',
    icon: CircleDot,
    description:
      'The most visible difficulties are sustaining attention, organizing work, following through, remembering everyday tasks, and resisting distraction.',
    examples: [
      'Misses details or makes avoidable mistakes',
      'Starts tasks but is pulled away before finishing',
      'Loses everyday items or forgets commitments',
      'Avoids long, effortful, or repetitive tasks',
    ],
    adultNote:
      'In adults this may look less like “not listening” and more like chronic disorganization, procrastination, missed deadlines, or difficulty managing large projects.',
  },
  {
    id: 'hyperactive',
    name: 'Predominantly hyperactive-impulsive',
    short: 'Movement & self-control',
    color: '#a96952',
    icon: Footprints,
    description:
      'The most visible difficulties are restlessness, excessive movement or talking, acting before thinking, interrupting, and waiting.',
    examples: [
      'Fidgets, moves, or feels internally restless',
      'Finds quiet activities uncomfortable',
      'Blurts out answers or interrupts conversations',
      'Chooses immediate rewards despite later consequences',
    ],
    adultNote:
      'Physical hyperactivity often becomes an internal sense of restlessness, constant stimulation-seeking, rapid speech, or difficulty slowing down.',
  },
  {
    id: 'combined',
    name: 'Combined presentation',
    short: 'Both symptom groups',
    color: '#7a9f7d',
    icon: Layers3,
    description:
      'A person has enough persistent symptoms from both the inattentive and hyperactive-impulsive groups to meet diagnostic criteria.',
    examples: [
      'Organization and follow-through are difficult',
      'Attention shifts quickly toward distractions',
      'Restlessness or impulsive decisions are common',
      'The balance of symptoms may change over time',
    ],
    adultNote:
      'The presentation label is a snapshot, not a personality type. Symptoms can change with age, demands, environment, sleep, and treatment.',
  },
] as const;

export default function ADHDPresentationExplorer() {
  const [selectedId, setSelectedId] = useState<(typeof presentations)[number]['id']>('inattentive');
  const selected = presentations.find((item) => item.id === selectedId)!;

  return (
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
            <div className="mt-6 rounded-xl bg-warm-cream p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sage-green">How it may show up</p>
              <ul className="space-y-3">
                {selected.examples.map((example) => (
                  <li key={example} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-sage-green/10 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Across the lifespan</p>
            <p className="mt-3 leading-relaxed text-foreground">{selected.adultNote}</p>
            <p className="mt-5 border-t border-sage-green/10 pt-4 text-xs leading-relaxed text-muted-foreground">
              A presentation describes the current symptom pattern. It does not measure intelligence, effort, character, or potential.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
