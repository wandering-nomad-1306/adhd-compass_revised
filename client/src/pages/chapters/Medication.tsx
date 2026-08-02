import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Clock3,
  HeartPulse,
  Layers3,
  ListChecks,
  Moon,
  Pill,
  Scale,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Target,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import MedicationExplorer from '@/components/MedicationExplorer';
import SourceList from '@/components/SourceList';

const pathways = [
  {
    id: 'stimulant',
    label: 'Stimulants',
    color: '#4e72a2',
    eyebrow: 'Fastest and most commonly used',
    summary:
      'Stimulants are the best-known and most widely used ADHD medicines. They include two families—methylphenidate and amphetamine—and are available in many short- and long-acting forms.',
    howWorks:
      'Brain cells communicate using chemical messengers. Stimulants make dopamine and norepinephrine more available, strengthening the signal between cells involved in attention, impulse control, and activity regulation.',
    onset: 'Often noticeable within 30–60 minutes once the medicine and dose fit.',
    coverage: 'About 3–6 hours for many immediate-release products and roughly 8–16 hours for many extended-release products.',
    response:
      'The AACAP/APA guide reports that about three-quarters of children experience fewer symptoms with a stimulant. CDC currently summarizes response at roughly 70–80% of children.',
    examples: ['Methylphenidate: Ritalin, Concerta, Focalin, Daytrana, Jornay PM', 'Amphetamine: Adderall, Dexedrine, Vyvanse, Mydayis'],
    usefulWhen: [
      'A fast, clearly observable effect is useful',
      'Core inattention, hyperactivity, or impulsivity causes substantial impairment',
      'A variety of duration and dosage forms is helpful',
    ],
    strengths: [
      'Strongest average symptom effect among ADHD medicines',
      'Benefit can often be assessed quickly',
      'Many formulations allow short, school-day, full-day, liquid, chewable, capsule, tablet, or patch options',
      'A poor response to one stimulant family does not mean the other family will fail',
    ],
    limitations: [
      'Controlled substances with misuse, diversion, safe-storage, and refill considerations',
      'Can reduce appetite, delay sleep, or increase pulse and blood pressure',
      'May worsen anxiety, irritability, tics, or mood symptoms in some people',
      'Coverage may end too early, last too long, or produce rebound as it wears off',
    ],
    commonEffects: ['Lower appetite or weight loss', 'Difficulty falling asleep', 'Headache or stomachache', 'Irritability or moodiness', 'Mild pulse or blood-pressure increase'],
    monitor: ['Target symptoms and real-life functioning', 'Appetite, weight, and growth in children', 'Sleep and time of last dose', 'Pulse and blood pressure', 'Mood, anxiety, tics, and unusual behavior', 'Storage, adherence, misuse, or diversion'],
    keyPoint:
      'Methylphenidate and amphetamine work somewhat differently. Someone may respond poorly to one family and very well to the other, so the first unsuccessful trial is not the end of the medication process.',
  },
  {
    id: 'nonstimulant',
    label: 'Nonstimulants',
    color: '#925e76',
    eyebrow: 'Daily treatment that builds gradually',
    summary:
      'The main FDA-approved nonstimulants in this pathway are atomoxetine and viloxazine extended release. They are taken consistently and usually need time at a useful dose before the effect can be judged.',
    howWorks:
      'Atomoxetine and viloxazine increase norepinephrine signaling through different mechanisms. The effect develops gradually rather than producing the same-day “on/off” pattern typical of stimulants.',
    onset: 'Usually measured in weeks, not hours. A single dose does not show whether the medicine will work.',
    coverage: 'Designed for steady daily coverage rather than a short window of effect.',
    response:
      'On average, nonstimulants are somewhat less effective than stimulants, but they can be very useful when stimulants do not work, are not tolerated, are not preferred, or do not fit the clinical picture.',
    examples: ['Atomoxetine (Strattera or generic)', 'Viloxazine extended release (Qelbree)'],
    usefulWhen: [
      'Stimulants are ineffective or cause unacceptable side effects',
      'A non-controlled medicine is preferred',
      'Anxiety, tics, medical risk, or substance-misuse concerns affect the decision',
    ],
    strengths: [
      'Not controlled substances',
      'Steady all-day treatment without timing an immediate-release and extended-release window',
      'May have less impact on appetite or sleep for some people',
      'Can be useful when stimulant response is incomplete or inconsistent',
    ],
    limitations: [
      'Slower onset means the trial requires patience and consistent dosing',
      'Still has meaningful side effects and drug interactions',
      'Atomoxetine and viloxazine carry important mood/suicidality warnings',
      'May not reduce symptoms as strongly as a well-matched stimulant',
    ],
    commonEffects: ['Tiredness or sleepiness', 'Nausea or stomach discomfort', 'Reduced appetite', 'Headache', 'Insomnia or irritability'],
    monitor: ['Mood and suicidal thoughts or behavior', 'Appetite and weight', 'Sleep and daytime fatigue', 'Pulse and blood pressure', 'Drug interactions and caffeine with viloxazine', 'Rare liver symptoms with atomoxetine'],
    keyPoint:
      '“Nonstimulant” does not mean mild, risk-free, or optional to monitor. These medicines have real benefits, real adverse effects, and different timelines for judging success.',
  },
  {
    id: 'alpha',
    label: 'Alpha-2 agonists',
    color: '#9a7648',
    eyebrow: 'Calming adrenergic signaling',
    summary:
      'Guanfacine extended release and clonidine extended release are nonstimulant alpha-2 agonists. They can be used alone or added to a stimulant and may be especially relevant when sleep, tics, impulsivity, aggression, or behavioral dysregulation are part of the picture.',
    howWorks:
      'These medicines reduce certain adrenergic signals and strengthen regulation in brain networks involved in attention and impulse control. They were also developed for blood-pressure effects, which explains several of their cautions.',
    onset: 'Benefit generally builds over days to weeks rather than appearing after one dose.',
    coverage: 'Guanfacine ER is usually once daily. Clonidine ER is often divided between morning and bedtime after titration.',
    response:
      'Their average effect on core ADHD symptoms is usually smaller than stimulants, but their different profile can be valuable alone or as an add-on.',
    examples: ['Guanfacine ER (Intuniv or generic)', 'Clonidine ER (Kapvay or generic)'],
    usefulWhen: [
      'Tics, sleep problems, aggression, or marked impulsivity coexist',
      'A stimulant helps but does not cover the whole symptom picture',
      'A non-controlled option is needed and sedation can be managed',
    ],
    strengths: [
      'Not controlled substances',
      'Approved as monotherapy and as adjunctive treatment to stimulants',
      'May help with tics, sleep, evening behavior, or hyperarousal in some patients',
      'Can smooth residual symptoms when a stimulant is otherwise useful',
    ],
    limitations: [
      'Drowsiness and fatigue can be substantial',
      'Can lower blood pressure and heart rate or cause dizziness',
      'Missed doses and abrupt stopping can cause rebound hypertension',
      'The dose must be tapered rather than stopped suddenly',
    ],
    commonEffects: ['Drowsiness', 'Fatigue', 'Dizziness', 'Low blood pressure', 'Slow heart rate or dry mouth'],
    monitor: ['Daytime alertness', 'Blood pressure and pulse', 'Dizziness or fainting', 'Missed doses', 'Medication interactions', 'A gradual taper plan before stopping'],
    keyPoint:
      'These are not simply “sleep medicines.” Their role is broader, but sedation and cardiovascular effects are central to safe use.',
  },
] as const;

type PathwayId = (typeof pathways)[number]['id'];

function PathwayExplorer() {
  const [selectedId, setSelectedId] = useState<PathwayId>('stimulant');
  const selected = pathways.find((item) => item.id === selectedId)!;

  return (
    <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      <div className="grid border-b border-sage-green/10 md:grid-cols-3">
        {pathways.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            aria-pressed={selectedId === item.id}
            className="relative border-b border-sage-green/10 px-5 py-5 text-left transition-colors last:border-b-0 hover:bg-warm-cream md:border-b-0 md:border-r md:last:border-r-0"
            style={{ backgroundColor: selectedId === item.id ? `${item.color}12` : undefined }}
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">{item.eyebrow}</span>
            <span className="mt-1 block text-lg font-bold" style={{ color: item.color }}>{item.label}</span>
            {selectedId === item.id && <motion.span layoutId="med-pathway" className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: item.color }} />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="p-6 md:p-9"
        >
          <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: selected.color }}>{selected.eyebrow}</p>
              <h3 className="mt-2 font-serif text-4xl font-bold text-foreground">{selected.label}</h3>
              <p className="mt-5 text-lg leading-relaxed text-foreground">{selected.summary}</p>
              <div className="mt-6 rounded-2xl bg-warm-cream p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground"><BrainCircuit className="h-5 w-5" style={{ color: selected.color }} /> How it works</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{selected.howWorks}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Onset', selected.onset, Clock3],
                ['Typical coverage', selected.coverage, Layers3],
                ['What the evidence means', selected.response, CircleGauge],
              ].map(([label, text, Icon]) => {
                const IconComponent = Icon as typeof Clock3;
                return (
                  <div key={label as string} className="rounded-2xl border border-sage-green/10 p-5">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground">
                      <IconComponent className="h-4 w-4" style={{ color: selected.color }} /> {label as string}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-sage-green/10 p-5">
              <p className="text-sm font-bold" style={{ color: selected.color }}>Examples in this pathway</p>
              <ul className="mt-4 space-y-3">
                {selected.examples.map((item) => <li key={item} className="text-sm leading-relaxed text-foreground">{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-sage-green/10 p-5">
              <p className="text-sm font-bold" style={{ color: selected.color }}>Often considered when</p>
              <ul className="mt-4 space-y-3">
                {selected.usefulWhen.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: selected.color }} />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sage-green/10 p-5">
              <p className="text-sm font-bold" style={{ color: selected.color }}>The key idea</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{selected.keyPoint}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-sage-green/[0.07] p-6">
              <p className="text-sm font-bold text-sage-green">Potential strengths</p>
              <ul className="mt-4 space-y-3">
                {selected.strengths.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-green" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#a96952]/[0.07] p-6">
              <p className="text-sm font-bold text-[#8f5541]">Limitations and trade-offs</p>
              <ul className="mt-4 space-y-3">
                {selected.limitations.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a96952]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-sage-green/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Common effects to know</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.commonEffects.map((item) => <span key={item} className="rounded-full bg-warm-cream px-3 py-2 text-xs text-foreground">{item}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-sage-green/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">What is monitored</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {selected.monitor.map((item) => <span key={item} className="rounded-xl bg-warm-cream p-3 text-xs leading-relaxed text-foreground">{item}</span>)}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const sideEffectGroups = [
  {
    id: 'stimulant',
    label: 'Stimulants',
    color: '#4e72a2',
    rows: [
      {
        issue: 'Lower appetite or weight loss',
        notice: 'Meals may be smaller while the medicine is active; weight can fall early in treatment.',
        response: 'Track weight and growth. The guide suggests giving the stimulant with meals and concentrating nutritious calories when appetite is better, often later in the day. Do not force food.',
        urgency: 'Routine discussion unless weight loss is substantial, growth falters, or eating becomes unsafe.',
      },
      {
        issue: 'Difficulty falling asleep',
        notice: 'The medicine may last too late, or ADHD-related sleep problems may already be present.',
        response: 'Strengthen sleep routines, avoid caffeine, review naps and screens, move the dose earlier, or discuss a shorter-acting preparation or removal of a late dose.',
        urgency: 'Contact the prescriber if sleep loss is persistent or causing daytime impairment.',
      },
      {
        issue: 'Dizziness or feeling faint',
        notice: 'Light-headedness, weakness, or near-fainting may reflect hydration, food intake, blood pressure, or another problem.',
        response: 'The guide advises holding the next dose and contacting the practitioner, checking pulse and blood pressure, fluids, and food.',
        urgency: 'Urgent assessment for fainting, chest pain, severe shortness of breath, or a concerning heart rhythm.',
      },
      {
        issue: 'Irritability, moodiness, or rebound',
        notice: 'Mood may worsen while the dose is active, as it wears off, or because another mood problem is present.',
        response: 'Record the timing. The clinician may change dose, timing, formulation, stimulant family, or assess a separate mood condition.',
        urgency: 'Prompt contact for severe agitation, mania, hallucinations, suicidal behavior, or dangerous aggression.',
      },
      {
        issue: 'Growth concerns',
        notice: 'Some children grow or gain weight more slowly while taking stimulants.',
        response: 'Measure height and weight regularly—AACAP suggests at least every six months—and discuss nutrition, dose, timing, formulation, or carefully planned medication breaks.',
        urgency: 'Routine but important follow-up; do not create medication holidays without the prescriber.',
      },
    ],
  },
  {
    id: 'nonstimulant',
    label: 'Atomoxetine & viloxazine',
    color: '#925e76',
    rows: [
      {
        issue: 'Tiredness or sleepiness',
        notice: 'Often most noticeable when treatment begins or after a dose increase.',
        response: 'Start low and increase gradually. Timing or divided dosing may be adjusted for atomoxetine; the prescriber decides.',
        urgency: 'Contact the prescriber if sedation is severe, unsafe, or persistent.',
      },
      {
        issue: 'Nausea, stomach pain, or vomiting',
        notice: 'Gastrointestinal effects can occur early and may improve with time.',
        response: 'Track timing, food, hydration, and severity. The prescriber may slow titration, change timing, or reconsider the medicine.',
        urgency: 'Prompt review for persistent vomiting, dehydration, severe abdominal pain, or jaundice.',
      },
      {
        issue: 'Appetite or sleep changes',
        notice: 'Appetite may decrease; either sleepiness or insomnia can occur.',
        response: 'Monitor meals, weight, sleep timing, and daytime function rather than assuming every change is caused by ADHD itself.',
        urgency: 'Contact the prescriber if weight, sleep, or daily safety is significantly affected.',
      },
      {
        issue: 'Mood or suicidal thoughts',
        notice: 'Atomoxetine has a boxed warning for suicidal ideation in children and adolescents; viloxazine has a boxed warning for suicidal thoughts and behaviors in pediatric and adult patients.',
        response: 'Watch closely for new or sudden changes in mood, behavior, thoughts, or feelings, particularly early in treatment and after dose changes.',
        urgency: 'Immediate clinical or emergency help for suicidal thoughts, actions, or dangerous behavior.',
      },
      {
        issue: 'Drug interactions',
        notice: 'Liver metabolism affects atomoxetine; viloxazine has important interactions and can increase caffeine exposure.',
        response: 'Give the prescriber and pharmacist a complete list of prescriptions, over-the-counter medicines, supplements, and caffeine use.',
        urgency: 'Prompt advice before adding or stopping interacting medicines.',
      },
    ],
  },
  {
    id: 'alpha',
    label: 'Alpha-2 agonists',
    color: '#9a7648',
    rows: [
      {
        issue: 'Drowsiness and fatigue',
        notice: 'The most common limitation, especially when starting or increasing the dose.',
        response: 'Start very low and increase gradually. Review timing and avoid driving or unsafe activity until the effect is understood.',
        urgency: 'Contact the prescriber for severe sedation, confusion, falls, or inability to function safely.',
      },
      {
        issue: 'Low blood pressure, dizziness, or slow pulse',
        notice: 'Standing dizziness, weakness, faintness, or unusual fatigue can occur.',
        response: 'Monitor blood pressure and pulse, hydration, and interacting medicines. Rise slowly and discuss symptoms with the prescriber.',
        urgency: 'Urgent assessment for fainting, chest pain, severe weakness, or very slow heart rate with symptoms.',
      },
      {
        issue: 'Missed doses or abrupt stopping',
        notice: 'Stopping suddenly can cause rebound hypertension; higher doses increase concern.',
        response: 'Do not double missed doses or stop abruptly. Follow the product-specific missed-dose and taper plan.',
        urgency: 'Prompt advice for several missed doses, severe headache, marked blood-pressure rise, or concerning symptoms.',
      },
      {
        issue: 'Mood symptoms',
        notice: 'Irritability or mood changes can occur and may overlap with fatigue or the underlying condition.',
        response: 'Track timing and discuss whether the dose, schedule, combination, or diagnosis needs review.',
        urgency: 'Prompt help for dangerous behavior, severe depression, or suicidal thoughts.',
      },
    ],
  },
] as const;

function SideEffectGuide() {
  const [selectedId, setSelectedId] = useState<(typeof sideEffectGroups)[number]['id']>('stimulant');
  const selected = sideEffectGroups.find((item) => item.id === selectedId)!;

  return (
    <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-sage-green/10 p-4">
        {sideEffectGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            aria-pressed={selectedId === item.id}
            className="rounded-full border px-4 py-2 text-sm font-semibold transition"
            style={{
              borderColor: selectedId === item.id ? item.color : 'rgba(86,114,95,.2)',
              backgroundColor: selectedId === item.id ? `${item.color}16` : 'white',
              color: selectedId === item.id ? item.color : 'inherit',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="divide-y divide-sage-green/10">
          {selected.rows.map((row) => (
            <div key={row.issue} className="grid gap-4 p-5 md:grid-cols-[.7fr_1fr_1.25fr_1fr] md:p-6">
              <div>
                <p className="font-bold" style={{ color: selected.color }}>{row.issue}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">What it may look like</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{row.notice}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">What is usually discussed</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{row.response}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-muted-foreground">When to escalate</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{row.urgency}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  {
    question: 'What if the first medication does not work?',
    answer:
      'That is common and does not mean medication as a whole has failed. The dose may be too low, too high, too short, too long, or the formulation may not match the day. A person may also respond to methylphenidate but not amphetamine—or vice versa. The clinician reviews whether there was a fair trial, then changes one variable at a time.',
  },
  {
    question: 'Does medication cure ADHD?',
    answer:
      'No. Medication can reduce core symptoms while it is active and may make learning or using skills easier. It does not teach organization, repair a learning disability, create motivation on command, or remove every difficulty. Many people benefit from medication plus skills, therapy, environmental changes, sleep support, and accommodations.',
  },
  {
    question: 'Are generic and brand-name medicines identical?',
    answer:
      'They contain the same active ingredient and must meet regulatory standards, but extended-release delivery systems and inactive ingredients can differ. Some people notice a meaningful difference in timing or tolerability. Record the manufacturer and discuss consistent changes with the prescriber or pharmacist rather than changing doses independently.',
  },
  {
    question: 'Can medication be used when someone has tics?',
    answer:
      'Tics require an individualized plan. The AACAP guide notes that atomoxetine and alpha-2 agonists may be helpful when ADHD and tics occur together, and guanfacine or clonidine can also be combined with a stimulant. The clinician considers whether symptoms are pre-existing, medication-related, or fluctuating naturally.',
  },
  {
    question: 'Can two ADHD medicines be combined?',
    answer:
      'Yes, in selected cases. Guanfacine ER and clonidine ER are FDA-labeled as monotherapy or adjunctive therapy to stimulants. Other combinations are used clinically but may have less evidence or may not be FDA-approved as a combination. The purpose should be explicit: extend coverage, treat residual symptoms, address tics or sleep, or reduce a limiting side effect.',
  },
  {
    question: 'Should medication be taken only on difficult days?',
    answer:
      'It depends on the medicine and treatment plan. Some short-acting stimulants have flexible schedules, while nonstimulants and alpha-2 agonists need consistent daily dosing and should not be started and stopped casually. Any planned breaks should balance symptom return, driving or safety, relationships, school or work, side effects, and the product’s stopping instructions.',
  },
  {
    question: 'How do we know the dose is right?',
    answer:
      'The best dose is not the highest dose and not a standard number. It is the lowest practical dose that produces meaningful improvement in agreed targets with tolerable side effects across the whole day. A good review includes onset, duration, rebound, appetite, sleep, mood, pulse, blood pressure, and functioning—not only whether the person “felt focused.”',
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-sage-green/10 overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl font-bold text-foreground">{item.question}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="rounded-full bg-warm-cream p-2 text-sage-green"><ChevronDown className="h-5 w-5" /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-6 text-base leading-relaxed text-foreground md:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Medication() {
  const [, setLocation] = useLocation();

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ChapterLayout
      title="Medication"
      subtitle="Understand the options, trade-offs, and monitoring"
      chapterNumber={8}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4e72a2]">A complete, calm guide</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl">ADHD medication, explained clearly</h1>
          <p className="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-muted-foreground">
            Learn what the main medication pathways do, how quickly they work, where they can help, what they cannot do, how side effects are managed, and how a prescriber finds a useful medicine and dose without treating you like a checklist.
          </p>
        </section>

        <section className="rounded-3xl border border-[#a96952]/25 bg-[#a96952]/[0.06] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Stethoscope className="mt-1 h-7 w-7 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">How to use this page</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                This is education, not a prescription. It draws heavily from the AACAP and American Psychiatric Association <em>Parents’ Medication Guide</em>, which is child/adolescent focused, and adds current U.S. label context where the guide is older. Doses are shown only to explain how products differ. Do not start, switch, split, combine, skip, taper, or stop medication from this page.
              </p>
            </div>
          </div>
        </section>

        <nav aria-label="Medication page sections" className="rounded-3xl border border-sage-green/15 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Jump to what you need</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ['pathways', 'The 3 pathways'],
              ['effectiveness', 'Effectiveness & limits'],
              ['timing', 'Short vs long acting'],
              ['directory', 'Medication cards'],
              ['side-effects', 'Side effects'],
              ['titration', 'Finding the right fit'],
              ['combinations', 'Combinations'],
              ['faq', 'Common questions'],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => jumpTo(id)} className="rounded-full border border-sage-green/20 bg-warm-cream/40 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-sage-green/50 hover:bg-warm-cream">
                {label}
              </button>
            ))}
          </div>
        </nav>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><Target className="h-6 w-6 text-sage-green" /><h2 className="font-serif text-3xl font-bold text-foreground">What medication can do</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Reduce inattention, hyperactivity, and impulsivity while the treatment is active',
                'Improve the ability to pause, sustain effort, complete work, and use learned strategies',
                'Reduce impairment at school, work, home, while driving, and in relationships for many people',
                'Create enough symptom relief for therapy, coaching, routines, and accommodations to work better',
              ].map((item) => <li key={item} className="flex gap-3 leading-relaxed text-foreground"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sage-green" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#a96952]/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><AlertCircle className="h-6 w-6 text-[#a96952]" /><h2 className="font-serif text-3xl font-bold text-foreground">What medication cannot do alone</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Cure ADHD or permanently change every symptom',
                'Teach planning, organization, emotional skills, or study habits automatically',
                'Fix a learning disability, unsuitable environment, sleep deprivation, trauma, or another untreated condition',
                'Guarantee motivation, happiness, perfect grades, or conflict-free relationships',
              ].map((item) => <li key={item} className="flex gap-3 leading-relaxed text-foreground"><AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#a96952]" />{item}</li>)}
            </ul>
          </article>
        </section>

        <section id="pathways" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Start with the big picture</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Three broad medication pathways</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Stimulants, daily nonstimulants, and alpha-2 agonists differ in speed, strength, side effects, and the situations in which they are useful. Select each pathway for a complete explanation.
            </p>
          </div>
          <PathwayExplorer />
        </section>

        <section className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-[#4e72a2]/[0.08] via-white to-sage-green/[0.08] p-7 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4e72a2]">One useful diagram</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">How stimulants strengthen the signal</h2>
              <p className="mt-4 leading-relaxed text-foreground">
                The guide describes stimulant benefit as improved communication between brain cells. This is not “speeding up the whole brain.” It is making important dopamine and norepinephrine signals more available in networks involved in attention and self-control.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {[
                ['1', 'Signal is too weak or inconsistent', 'Important messages compete with noise.'],
                ['2', 'Medication increases availability', 'Dopamine and norepinephrine signaling becomes stronger.'],
                ['3', 'Regulation becomes easier', 'Pausing, sustaining attention, and using skills may require less effort.'],
              ].map(([number, title, text], index) => (
                <div key={number} className="contents">
                  <div className="rounded-2xl border border-[#4e72a2]/15 bg-white p-5 shadow-sm">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4e72a2]/10 font-bold text-[#4e72a2]">{number}</span>
                    <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                  {index < 2 && <ArrowRight className="mx-auto hidden h-5 w-5 text-[#4e72a2]/45 sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="effectiveness" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">What “effective” really means</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Benefit is measurable—but not magical</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['About 70–80%', 'of children have fewer ADHD symptoms with fast-acting stimulant medication, according to CDC.', CircleGauge],
              ['About 40–50%', 'symptom reduction is described in the AACAP/APA guide for children who respond to stimulants.', Activity],
              ['Not every symptom', 'goes away. The goal is noticeable improvement in functioning, not becoming a different person.', Sparkles],
            ].map(([big, text, Icon]) => {
              const IconComponent = Icon as typeof CircleGauge;
              return (
                <article key={big as string} className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
                  <IconComponent className="h-7 w-7 text-[#4e72a2]" />
                  <p className="mt-5 font-serif text-4xl font-bold text-foreground">{big as string}</p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text as string}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <h3 className="font-serif text-3xl font-bold text-foreground">Look for function, not just “focus”</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Can the person start and finish more of the intended task?',
                  'Are unsafe impulses, interruptions, or conflicts less frequent?',
                  'Does benefit last through the part of the day that matters?',
                  'Can learned strategies be used more consistently?',
                  'Are school, work, driving, home, and relationships meaningfully easier?',
                  'Are side effects small enough that the overall trade-off is worthwhile?',
                ].map((item) => <div key={item} className="rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground">{item}</div>)}
              </div>
            </article>
            <article className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7">
              <h3 className="font-serif text-3xl font-bold text-foreground">Important limitation</h3>
              <p className="mt-4 leading-relaxed text-foreground">
                The guide is explicit: medication does not provide organizational skills and does not overcome a learning disability. Symptom relief can create a better opportunity to learn, practice, and use those supports—but the supports still matter.
              </p>
            </article>
          </div>
        </section>

        <section id="timing" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Forms and duration</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">The same family can feel different in a different formulation</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A medication name is only part of the story. Release system, dose timing, duration, meals, metabolism, and the shape of the day all influence whether it feels smooth, too short, too long, or uneven.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Clock3,
                title: 'Immediate release',
                range: 'Often about 3–6 hours',
                text: 'Starts quickly and gives a clear window of effect. It can be flexible, but may require two or more doses and can produce a more obvious wear-off.',
                best: 'Useful for short coverage, dose finding, or a clinician-prescribed late-day booster.',
              },
              {
                icon: Layers3,
                title: 'Extended release',
                range: 'Often about 8–16 hours',
                text: 'Designed to cover more of the school or work day with one morning dose. Different delivery systems can have very different onset and wear-off patterns.',
                best: 'Useful when avoiding a midday dose and smoother all-day coverage are priorities.',
              },
              {
                icon: Moon,
                title: 'Delayed / special delivery',
                range: 'Timing depends on the product',
                text: 'Examples include evening-dosed methylphenidate, patches, liquids, chewables, and sprinkle capsules. These solve practical problems—not just swallowing pills.',
                best: 'Useful when early mornings, swallowing, meals, or an unusual schedule shape the treatment need.',
              },
            ].map(({ icon: Icon, title, range, text, best }) => (
              <article key={title} className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
                <Icon className="h-7 w-7 text-[#4e72a2]" />
                <h3 className="mt-5 font-serif text-3xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm font-bold text-[#4e72a2]">{range}</p>
                <p className="mt-4 leading-relaxed text-foreground">{text}</p>
                <div className="mt-5 rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground"><strong>Often useful when:</strong> {best}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="directory" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Interactive medication directory</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Explore medicines by stimulant, nonstimulant, or alpha-2 pathway</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Search or filter the cards. Methylphenidate and amphetamine are shown as subfamilies inside the stimulant pathway—not as competing top-level categories. Open a card for use cases, starting information, strengths, limitations, side effects, and safety notes.
            </p>
          </div>
          <MedicationExplorer />
        </section>

        <section id="side-effects" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Side effects without panic</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">What to watch, what is usually adjusted, and when to escalate</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Side effects are not all equal. Some improve with time or a change in food, timing, dose, or formulation. Others require prompt contact or urgent help. Select a pathway below.
            </p>
          </div>
          <SideEffectGuide />
        </section>

        <section id="titration" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Finding the right fit</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Titration is a structured experiment</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The aim is not “take more until you feel focused.” The prescriber starts conservatively, changes one variable at a time, and looks for the best balance of benefit and adverse effects.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              [ListChecks, '01', 'Define targets', 'Choose two or three observable outcomes before treatment.'],
              [Scale, '02', 'Record baseline', 'Symptoms, function, sleep, appetite, mood, pulse, blood pressure, and growth when relevant.'],
              [Pill, '03', 'Start low', 'Use the product-specific starting plan and give it the correct amount of time.'],
              [CircleGauge, '04', 'Adjust carefully', 'Change one variable and record onset, duration, rebound, benefit, and side effects.'],
              [Target, '05', 'Keep only useful treatment', 'Continue, switch, combine, or stop based on measurable net benefit.'],
            ].map(([Icon, number, title, text], index) => {
              const IconComponent = Icon as typeof ListChecks;
              return (
                <motion.article key={number as string} className="relative rounded-2xl border border-sage-green/15 bg-white p-5 shadow-sm" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }}>
                  <div className="flex items-center justify-between"><IconComponent className="h-6 w-6 text-[#4e72a2]" /><span className="font-serif text-2xl font-bold text-[#4e72a2]/25">{number as string}</span></div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{title as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text as string}</p>
                  {index < 4 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 text-sage-green/35 md:block" />}
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3"><HeartPulse className="h-6 w-6 text-sage-green" /><h3 className="font-serif text-3xl font-bold text-foreground">What belongs in a follow-up review</h3></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'What improved in real life?',
                  'When does benefit begin and end?',
                  'Is there rebound as it wears off?',
                  'What happened to appetite and weight?',
                  'What happened to sleep and daytime energy?',
                  'Any mood, anxiety, tics, or unusual behavior?',
                  'Pulse, blood pressure, dizziness, or fainting?',
                  'Any missed doses, refill, storage, or misuse concerns?',
                ].map((item) => <div key={item} className="rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground">{item}</div>)}
              </div>
            </article>
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3"><Utensils className="h-6 w-6 text-[#9a7648]" /><h3 className="font-serif text-3xl font-bold text-foreground">A simple daily log</h3></div>
              <p className="mt-4 leading-relaxed text-foreground">A one-minute record is more useful than a vague memory at the next appointment.</p>
              <div className="mt-5 space-y-3">
                {[
                  ['Morning', 'Dose/time • breakfast • baseline mood'],
                  ['Midday', 'Benefit 0–10 • appetite • pulse/BP if requested'],
                  ['Evening', 'Wear-off/rebound • dinner • relationships'],
                  ['Night', 'Sleepiness/insomnia • time asleep • unusual symptoms'],
                ].map(([time, details]) => <div key={time} className="grid grid-cols-[85px_1fr] gap-3 rounded-xl border border-sage-green/10 p-4 text-sm"><strong className="text-sage-green">{time}</strong><span className="text-foreground">{details}</span></div>)}
              </div>
            </article>
          </div>
        </section>

        <section id="combinations" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Combination treatment</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Why a prescriber may use more than one medicine</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <div className="w-full rounded-2xl bg-[#4e72a2]/10 p-5 text-center sm:w-48"><Pill className="mx-auto h-7 w-7 text-[#4e72a2]" /><p className="mt-3 font-bold text-foreground">Stimulant</p><p className="mt-1 text-xs text-muted-foreground">Core symptoms and daytime coverage</p></div>
                <div className="flex items-center gap-2 text-sage-green"><span className="h-px w-8 bg-sage-green/30" /><span className="text-xl font-bold">+</span><span className="h-px w-8 bg-sage-green/30" /></div>
                <div className="w-full rounded-2xl bg-[#9a7648]/10 p-5 text-center sm:w-48"><Moon className="mx-auto h-7 w-7 text-[#9a7648]" /><p className="mt-3 font-bold text-foreground">Alpha-2 agonist</p><p className="mt-1 text-xs text-muted-foreground">Residual impulsivity, tics, sleep, or evening behavior</p></div>
              </div>
              <p className="mt-6 text-center text-sm leading-relaxed text-foreground">
                Guanfacine ER and clonidine ER are FDA-labeled for use alone or as adjunctive therapy to stimulant medication. The combination should have a clear purpose and its own monitoring plan.
              </p>
            </article>
            <article className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7">
              <h3 className="font-serif text-3xl font-bold text-foreground">Combinations are not automatically “stronger”</h3>
              <ul className="mt-5 space-y-4">
                {[
                  'A second medicine may extend coverage or address a different symptom cluster.',
                  'It may allow a lower dose of the first medicine when side effects limit treatment.',
                  'Other combinations are used clinically but may have less evidence or may not be FDA-approved as a combination.',
                  'Every added medicine adds interactions, adherence burden, and another possible source of side effects.',
                ].map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a96952]" />{item}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Less commonly used options</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Second-line and off-label medicines</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Bupropion', 'An antidepressant used off-label for ADHD in some adolescents and adults, especially when mood or smoking concerns are also relevant. It can cause insomnia or irritability and carries a seizure risk in susceptible people.'],
              ['Modafinil', 'Infrequently used for ADHD and not FDA-approved for ADHD. The AACAP guide highlights the need to watch for rash.'],
              ['Tricyclic antidepressants', 'Infrequently used and require more intensive safety monitoring, which may include blood levels and an electrocardiogram.'],
            ].map(([title, text]) => <article key={title} className="rounded-3xl border border-sage-green/15 bg-white p-6 shadow-sm"><h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3><p className="mt-4 text-sm leading-relaxed text-foreground">{text}</p></article>)}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-sage-green" /><h2 className="font-serif text-3xl font-bold text-foreground">Before medication starts</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Confirm that a thorough evaluation supports ADHD and considers other explanations',
                'Review developmental, medical, neurological, psychiatric, family, and substance-use history',
                'List every prescription, over-the-counter medicine, supplement, caffeine source, and substance use',
                'Review heart symptoms and family cardiac history; examine pulse and blood pressure',
                'Record baseline appetite, weight, growth in children, sleep, mood, tics, and functional targets',
                'Agree on follow-up timing and what symptoms require a call or urgent care',
              ].map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-green" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#a96952]/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><AlertTriangle className="h-6 w-6 text-[#a96952]" /><h2 className="font-serif text-3xl font-bold text-foreground">When to seek help quickly</h2></div>
            <p className="mt-4 leading-relaxed text-foreground">Product-specific instructions differ. Contact the prescriber promptly for significant or persistent adverse effects, marked mood or behavior changes, new tics, fainting, or a treatment pattern that is clearly not working.</p>
            <div className="mt-5 rounded-xl bg-[#a96952]/[0.07] p-5">
              <p className="font-bold text-[#8f5541]">Urgent or emergency evaluation</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">Chest pain, severe shortness of breath, fainting with concerning symptoms, seizure, serious allergic reaction, suicidal behavior, new hallucinations or mania, dangerous agitation, or signs of severe overdose.</p>
            </div>
          </article>
        </section>

        <section id="faq" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Common questions</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">The questions people usually have after the basic explanation</h2>
          </div>
          <FAQSection />
        </section>

        <section className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-[#4e72a2]/[0.08] to-sage-green/[0.08] p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Questions worth taking to the appointment</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              'Which two or three outcomes will tell us this medication is helping?',
              'Why are you choosing this pathway and formulation for this person?',
              'How quickly should benefit appear, and how long should it cover?',
              'Which side effects are expected, which need a call, and which are urgent?',
              'What should be checked before treatment and at each follow-up?',
              'What is the plan if the first dose, formulation, or stimulant family does not fit?',
              'Could another condition or medicine be affecting the response?',
              'How should missed doses, travel, refills, storage, combinations, and stopping be handled?',
            ].map((question) => <div key={question} className="flex gap-3 rounded-xl bg-white/75 p-4 text-sm leading-relaxed text-foreground"><span className="font-bold text-[#4e72a2]">?</span>{question}</div>)}
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'ADHD: Parents’ Medication Guide',
              organization: 'AACAP and American Psychiatric Association',
              url: '/resources/ADHD_Medication_Guide-web.pdf',
              note: 'Primary content backbone for this page: treatment pathways, stimulant table, dosing concepts, effectiveness, side-effect management, nonstimulants, alpha agonists, combinations, and FAQs.',
            },
            {
              title: 'Treatment of ADHD',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/treatment/index.html',
              note: 'Current overview of stimulant and nonstimulant treatment, response, side effects, and monitoring.',
            },
            {
              title: 'Clinical Care of ADHD in Children',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/hcp/treatment-recommendations/index.html',
              note: 'Summarizes AAP recommendations on age-specific treatment and dose adjustment for maximum benefit with tolerable side effects.',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'DailyMed drug labels',
              organization: 'U.S. National Library of Medicine',
              url: 'https://dailymed.nlm.nih.gov/dailymed/',
              note: 'Current U.S. prescribing information used for adult approvals, boxed warnings, starting information, adjunctive indications, and tapering cautions.',
            },
            {
              title: 'ADHD Resource Center',
              organization: 'American Academy of Child and Adolescent Psychiatry',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
            },
          ]}
        />

        <button type="button" onClick={() => jumpTo('pathways')} className="mx-auto flex items-center gap-2 rounded-full border border-sage-green/20 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-sage-green/50">
          Back to the three pathways <ArrowDown className="h-4 w-4 rotate-180" />
        </button>
      </motion.div>
    </ChapterLayout>
  );
}
