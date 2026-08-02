import { AnimatePresence, motion } from 'framer-motion';
import { Activity, BookOpenCheck, Brain, HeartHandshake, Pill, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const supports = [
  {
    id: 'knowledge',
    label: 'Understanding',
    color: '#477f72',
    icon: BookOpenCheck,
    summary: 'Psychoeducation turns a confusing pattern into something you can recognize, explain, and plan around.',
    helps: ['reducing shame and self-blame', 'shared language for families or partners', 'making informed treatment decisions'],
    limit: 'Information explains the problem, but usually does not change symptoms by itself.',
  },
  {
    id: 'medication',
    label: 'Medication',
    color: '#4e72a2',
    icon: Pill,
    summary: 'Medication can reduce core symptoms and make attention, inhibition, and follow-through more available.',
    helps: ['attention regulation', 'impulsivity and restlessness', 'creating capacity to use other strategies'],
    limit: 'It does not automatically teach organization, repair relationships, or remove a learning disability.',
  },
  {
    id: 'therapy',
    label: 'Therapy & skills',
    color: '#925e76',
    icon: Brain,
    summary: 'ADHD-focused therapy and skills work turn goals into repeatable systems and address emotional or behavioral patterns.',
    helps: ['planning and problem-solving', 'coping with criticism or frustration', 'changing unhelpful habits'],
    limit: 'Generic insight-oriented therapy may miss ADHD-specific executive-function barriers unless the treatment is adapted.',
  },
  {
    id: 'environment',
    label: 'Environment',
    color: '#9a7648',
    icon: SlidersHorizontal,
    summary: 'External structure reduces the amount of working memory and self-control a task requires.',
    helps: ['visual reminders and checklists', 'clear routines and fewer distractions', 'breaking work into visible next steps'],
    limit: 'A perfect system is not required. The useful system is the one that is easy enough to restart after it breaks.',
  },
  {
    id: 'relationships',
    label: 'People & support',
    color: '#7e8249',
    icon: HeartHandshake,
    summary: 'Supportive people can provide feedback, accountability, encouragement, and practical help without taking over.',
    helps: ['parent training for children', 'coaching or accountability', 'family, partner, school, or workplace collaboration'],
    limit: 'Support should increase autonomy and dignity—not become surveillance or punishment.',
  },
  {
    id: 'foundations',
    label: 'Body foundations',
    color: '#6b9ba8',
    icon: Activity,
    summary: 'Sleep, regular movement, balanced nutrition, and substance-use care can influence how manageable symptoms feel.',
    helps: ['energy and alertness', 'mood and stress regulation', 'making other treatments work more consistently'],
    limit: 'Healthy habits can support treatment, but they are not a moral test and are not a substitute for indicated care.',
  },
] as const;

export default function TreatmentEcosystem() {
  const [activeId, setActiveId] = useState<(typeof supports)[number]['id']>('medication');
  const active = supports.find((support) => support.id === activeId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[560px] rounded-full border border-sage-green/10 bg-white shadow-sm">
        <div className="absolute inset-[23%] flex items-center justify-center rounded-full border border-sage-green/20 bg-warm-cream text-center shadow-inner">
          <div className="px-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Your plan</p>
            <p className="mt-2 font-serif text-xl font-bold text-foreground sm:text-2xl">Works as a system</p>
            <p className="mt-2 hidden text-xs leading-relaxed text-muted-foreground sm:block">No single tool has to do everything.</p>
          </div>
        </div>

        {supports.map((support, index) => {
          const angle = index * 60 - 90;
          const radians = (angle * Math.PI) / 180;
          const x = 50 + Math.cos(radians) * 39;
          const y = 50 + Math.sin(radians) * 39;
          const Icon = support.icon;
          const selected = activeId === support.id;

          return (
            <button
              key={support.id}
              type="button"
              onClick={() => setActiveId(support.id)}
              aria-pressed={selected}
              className="absolute flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-white px-2 text-center shadow-sm transition-all hover:-translate-x-1/2 hover:-translate-y-[54%] hover:shadow-md sm:h-[104px] sm:w-[104px]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: selected ? support.color : `${support.color}50`,
                backgroundColor: selected ? `${support.color}14` : 'white',
                boxShadow: selected ? `0 10px 30px ${support.color}24` : undefined,
              }}
            >
              <Icon className="mb-1 h-5 w-5 sm:h-6 sm:w-6" style={{ color: support.color }} />
              <span className="text-[10px] font-bold leading-tight text-foreground sm:text-xs">{support.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[430px] items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.24 }}
            className="w-full rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: active.color }} />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Part of a complete plan</p>
            </div>
            <h3 className="mt-4 text-3xl font-serif font-bold text-foreground">{active.label}</h3>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{active.summary}</p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-sage-green">Can help with</p>
              <ul className="space-y-3">
                {active.helps.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: active.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-xl bg-warm-cream p-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">What it cannot do alone</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{active.limit}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
