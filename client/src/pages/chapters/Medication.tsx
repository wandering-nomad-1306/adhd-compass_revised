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
  Eye,
  HeartPulse,
  Info,
  Layers3,
  ListChecks,
  Moon,
  Pill,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import MedicationExplorer from '@/components/MedicationExplorer';
import SourceList from '@/components/SourceList';

const pathways = [
  {
    id: 'stimulant',
    label: 'Stimulants',
    color: '#4e72a2',
    eyebrow: 'Fastest-acting & most extensively researched',
    summary:
      'Stimulants are the most effective, first-line medications for ADHD across children, teens, and adults. They fall into two distinct medication families—methylphenidate and amphetamine—offered in fast-acting (short-duration) and once-daily (extended-release) formulations.',
    howWorks:
      'Stimulants boost two essential brain signaling chemicals—dopamine (which powers motivation and attention) and norepinephrine (which filters out mental distractions). However, the two stimulant families work through completely different gears:\n\n' +
      '• Methylphenidates (Ritalin, Concerta, Focalin, Jornay PM) act as a temporary gatekeeper. Normally, brain cells use tiny vacuum pumps (transporters) to suck signaling chemicals out of the communication gap. Methylphenidate temporarily blocks these pumps, allowing your natural chemical signals to linger longer and deliver clear messages.\n\n' +
      '• Amphetamines (Adderall, Vyvanse, Dexedrine) provide a two-way boost. In addition to blocking the cleanup pumps, they travel inside brain cells and encourage internal storage pouches to release fresh reserves of dopamine and norepinephrine into the communication gap.\n\n' +
      'Because they operate through different cellular mechanisms, not responding well to one family does NOT mean stimulants won’t work for you. About 40% of people who do not benefit from one family respond smoothly and successfully to the other.',
    onset: 'Noticeable within 30–60 minutes once an effective therapeutic dose is reached.',
    coverage: 'About 3–5 hours for immediate-release tablets; 8–14 hours for once-daily extended-release capsules.',
    response:
      'In landmark global reviews (Cortese et al., Lancet Psychiatry 2018), stimulants showed the highest response rates of any ADHD medication. Approximately 70–80% of children and adults experience substantial, real-world symptom reduction on an optimized stimulant.',
    examples: [
      'Methylphenidate family: Ritalin IR, Concerta (smooth osmotic shell), Focalin XR, Daytrana skin patch, Jornay PM (taken at bedtime for morning focus)',
      'Amphetamine family: Adderall IR/XR (mixed salts), Dexedrine, Vyvanse (lisdexamfetamine prodrug activated in red blood cells)',
    ],
    usefulWhen: [
      'A rapid, noticeable improvement is needed for school, work, or driving safety',
      'Core inattention, hyperactivity, or impulsive decision-making disrupts daily life',
      'You need flexible coverage options (such as a 4-hour booster or a 12-hour school/workday capsule)',
    ],
    strengths: [
      'Highest average effectiveness across all ADHD medication classes in clinical trials',
      'Benefits can be evaluated on the very first day an effective dose is reached',
      'Wide variety of delivery formats: swallowable capsules, sprinkle beads, chewables, liquids, and skin patches',
      'High switching success: trying the alternative stimulant family works for the majority of non-responders',
    ],
    limitations: [
      'Schedule II regulated medicines requiring locked storage, monthly refills, and prescriber follow-up',
      'FDA Universal Boxed Warning regarding risks of misuse, dependency, diversion, and overdose',
      'Can reduce appetite during active hours, delay evening sleep, or mildly raise heart rate and blood pressure',
      'Strictly prohibited with MAO inhibitors (mandatory 14-day gap) and in individuals with serious structural heart abnormalities',
    ],
    commonEffects: [
      'Reduced appetite during active hours',
      'Trouble falling asleep if taken too late',
      'Mild headache or temporary stomach discomfort',
      'Slight increase in pulse (3–6 bpm) and blood pressure (2–4 mmHg)',
      'Late-afternoon rebound irritability as medication clears',
    ],
    monitor: [
      'Real-world functional gains (completing projects, driving focus, emotional regulation)',
      'Baseline and routine blood pressure and resting pulse checks',
      'Appetite, healthy calorie intake, and pediatric growth curves',
      'Bedtime routines, sleep quality, and dosing schedule',
      'Emergence of mood swings, irritability, or unusual anxiety',
      'Secure locked medication storage and refill tracking',
    ],
    keyPoint:
      'Methylphenidate (a cleanup blocker) and amphetamine (a cleanup blocker plus active releaser) work through different biological mechanisms. If one family makes you feel jittery, emotionally flat, or ineffective, switching to the other family has a very high success rate.',
  },
  {
    id: 'nonstimulant',
    label: 'Daily Nonstimulants',
    color: '#925e76',
    eyebrow: 'Continuous 24-hour steady coverage',
    summary:
      'The primary FDA-approved daily nonstimulants are atomoxetine (Strattera) and viloxazine extended-release (Qelbree). Taken consistently every day, they build steady-state blood levels over several weeks, providing 24-hour symptom coverage without daily peaks, crashes, or rebound.',
    howWorks:
      'Daily nonstimulants work through a steady, non-addictive pathway:\n\n' +
      '• Selective prefrontal tuning: In the brain’s front executive center (the prefrontal cortex), the norepinephrine cleanup pump naturally cleans up both norepinephrine and dopamine. Atomoxetine and viloxazine slow down this pump, gently raising levels of both focus chemicals right where you need them.\n\n' +
      '• Zero addiction potential: Unlike stimulants, nonstimulants do NOT trigger rapid dopamine surges in the brain’s pleasure and reward center (the nucleus accumbens). Because of this, they carry zero abuse risk, have no street value, and are regular non-controlled prescriptions.\n\n' +
      '• Around-the-clock consistency: Because the medication remains active in your system continuously, it covers early mornings before breakfast and late evenings without wearing off.',
    onset: 'Gradual onset over 2 to 6 weeks, reaching full therapeutic strength at 6 to 8 weeks. Single doses do not show immediate benefit.',
    coverage: 'Continuous 24-hour steady-state coverage with no daily wear-off or rebound crash.',
    response:
      'While average response sizes are slightly lower than stimulants in group studies, nonstimulants provide profound relief for many individuals. They are especially valuable when stimulants cause intolerable side effects, when co-occurring anxiety or tic disorders exist, or when non-controlled prescriptions are preferred.',
    examples: ['Atomoxetine (Strattera or generic)', 'Viloxazine extended-release (Qelbree)'],
    usefulWhen: [
      'Stimulants cause intolerable side effects (severe appetite loss, sleep loss, palpitations, or mood dips)',
      'A regular, non-controlled prescription with automatic refills is preferred',
      'Co-occurring anxiety, emotional dysregulation, tics, or substance misuse risk shapes the care plan',
      'You need all-day coverage that supports early morning wake-ups and evening family life',
    ],
    strengths: [
      'Non-controlled status: regular prescription refills without special controlled-substance hurdles',
      'Continuous 24-hour coverage without afternoon crashes or rebound irritability',
      'Does not aggravate anxiety and often helps soothe emotional reactivity',
      'Viloxazine is FDA-approved across both children (ages 6+) and adults',
    ],
    limitations: [
      'Takes 4 to 8 weeks of daily use to evaluate whether the dose is working',
      'FDA Boxed Warning for increased risk of suicidal thoughts in children, teens, and young adults (requires close monitoring)',
      'Severe liver enzyme interaction: Viloxazine must NEVER be taken with asthma medication (theophylline) or muscle relaxants (tizanidine)',
      'Requires a strict 14-day gap before or after taking MAO inhibitor medications',
      'Common early side effects include daytime sleepiness, nausea, fatigue, and decreased appetite',
    ],
    commonEffects: [
      'Daytime sleepiness or fatigue (often improves after initial weeks)',
      'Nausea or stomach upset (greatly reduced when taken with a substantial meal)',
      'Mild reductions in appetite or weight',
      'Mild increases in heart rate and blood pressure',
      'Occasional adult sexual side effects or urinary hesitancy (atomoxetine)',
    ],
    monitor: [
      'Mood shifts, agitation, or emergence of suicidal thoughts (FDA Boxed Warning)',
      'Baseline and periodic pulse and blood pressure measurements',
      'Drug interactions: Viloxazine CYP1A2 interactions (including caffeine sensitivity) and Atomoxetine CYP2D6 metabolism',
      'Dietary intake, meal timing, and daytime alertness',
      'Rare liver symptoms with atomoxetine (dark urine, yellowing eyes, severe abdominal pain)',
    ],
    keyPoint:
      '“Nonstimulant” does not mean weak or risk-free. These are potent psychiatric medications that provide continuous 24-hour stability, but they require 4–8 weeks of patient consistency, careful monitoring of mood, and strict attention to drug interactions.',
  },
  {
    id: 'alpha',
    label: 'Alpha-2 Agonists',
    color: '#9a7648',
    eyebrow: 'Targeted calming for impulses, tics & sleep',
    summary:
      'Guanfacine extended-release (Intuniv) and clonidine extended-release (Kapvay) are calming medications originally developed for blood pressure. In ADHD, they selectively strengthen executive brain circuits to improve impulse control, emotional reactivity, bedtime hyperarousal, and co-occurring tics.',
    howWorks:
      'Alpha-2 agonists act as noise-canceling filters for executive brain circuits:\n\n' +
      '• Sealing leaky attention channels: In your prefrontal cortex, brain cells have microscopic doors (ion channels) that let attention signals leak out when you are overwhelmed or under-stimulated. Guanfacine and clonidine activate special control switches (alpha-2A receptors) that seal those leaky doors shut. This strengthens priority signals and tunes out distracting background mental noise.\n\n' +
      '• Calming without dopamine: They improve frustration tolerance, impulse control, and working memory without stimulating dopamine circuits.\n\n' +
      '• Blood pressure origins: Because they relax the body’s adrenaline pathways, their most noticeable effects are lowering blood pressure, slowing the pulse, and causing drowsiness. This is also why they must NEVER be stopped abruptly.',
    onset: 'Benefits build steadily over 2 to 4 weeks; not designed for instant same-day focus.',
    coverage: 'Guanfacine ER is taken once daily (morning or evening). Clonidine ER is usually taken twice daily, with the larger dose at bedtime.',
    response:
      'Particularly effective for hyperactive restlessness, impulsive outbursts, emotional volatility, co-occurring motor/vocal tics, and chronic bedtime insomnia. They are frequently combined with daytime stimulants to smooth late-day crashes and cover evening hours.',
    examples: [
      'Guanfacine ER (Intuniv or generic) — highly selective for prefrontal alpha-2A focus receptors',
      'Clonidine ER (Kapvay or generic) — broader action, typically more sedating, excellent for severe sleep latency and tics',
    ],
    usefulWhen: [
      'Physical hyperactivity, impulsive conflict, or intense emotional volatility dominates daily life',
      'Co-occurring motor or vocal tics (Tourette syndrome) make stimulants difficult to use alone',
      'Severe bedtime restlessness and racing thoughts prevent falling asleep',
      'An add-on medication is needed to smooth afternoon stimulant crashes and improve evening family life',
    ],
    strengths: [
      'Non-controlled medications with zero abuse, misuse, or street value',
      'FDA-approved for children and teens as both stand-alone treatment and add-on therapy with stimulants',
      'Clinically proven to reduce motor/vocal tics and ease behavioral meltdowns',
      'Helps calm racing thoughts at night without dependency',
    ],
    limitations: [
      'FDA approval is pediatric (ages 6–17); prescribing in adults with ADHD is clinically common but technically off-label',
      'Significant daytime drowsiness, sedation, and fatigue (especially during the first month)',
      'Lowers blood pressure and heart rate; can cause dizziness when standing up quickly',
      'CRITICAL REBOUND WARNING: Must NEVER be stopped cold turkey. Abruptly missing or stopping doses can cause a dangerous, rapid spike in blood pressure and racing heart rate; requires a gradual medical taper',
    ],
    commonEffects: [
      'Drowsiness and daytime sleepiness',
      'Fatigue or low physical energy',
      'Dizziness or lightheadedness when standing up quickly',
      'Mild drops in resting blood pressure and pulse',
      'Dry mouth, headache, or mild stomach pain',
    ],
    monitor: [
      'Baseline and routine sitting and standing blood pressure and resting heart rate',
      'Daytime alertness and safety when driving or doing sports',
      'Strict adherence: ensuring pills are never skipped or stopped suddenly',
      'Mandatory slow tapering schedule under prescriber supervision if stopping',
      'Interactions with other sedatives, allergy medicines, or blood pressure drugs',
    ],
    keyPoint:
      'Alpha-2 agonists are not just mild sleep aids. They directly strengthen impulse control and working memory by sealing leaky prefrontal circuits. However, because they lower blood pressure, avoiding sudden missed doses and tapering off slowly is an absolute medical requirement.',
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
              <div className="mt-6 rounded-2xl bg-warm-cream p-5 sm:p-6 border border-stone-200/60">
                <p className="flex items-center gap-2 text-base font-bold text-foreground"><BrainCircuit className="h-5 w-5" style={{ color: selected.color }} /> How This Medication Works in the Brain</p>
                <p className="mt-3 text-[15px] sm:text-base leading-[1.75] text-foreground/90 whitespace-pre-line">{selected.howWorks}</p>
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
                  <div key={label as string} className="rounded-2xl border border-stone-200/80 p-5 shadow-2xs">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-muted-foreground">
                      <IconComponent className="h-4 w-4" style={{ color: selected.color }} /> {label as string}
                    </p>
                    <p className="mt-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-2xs">
              <p className="text-base font-bold" style={{ color: selected.color }}>Examples in this pathway</p>
              <ul className="mt-4 space-y-3">
                {selected.examples.map((item) => <li key={item} className="text-[15px] sm:text-base leading-[1.75] text-foreground/90">• {item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-2xs">
              <p className="text-base font-bold" style={{ color: selected.color }}>Often considered when</p>
              <ul className="mt-4 space-y-3">
                {selected.usefulWhen.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] sm:text-base leading-[1.75] text-foreground/90"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={{ color: selected.color }} />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-2xs">
              <p className="text-base font-bold" style={{ color: selected.color }}>The key idea</p>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-foreground/90">{selected.keyPoint}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-sage-green/[0.08] p-6 border border-sage-green/20">
              <p className="text-base font-bold text-sage-green">Potential strengths</p>
              <ul className="mt-4 space-y-3">
                {selected.strengths.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] sm:text-base leading-[1.75] text-foreground/90"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sage-green" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#a96952]/[0.08] p-6 border border-[#a96952]/20">
              <p className="text-base font-bold text-[#8f5541]">Limitations and trade-offs</p>
              <ul className="mt-4 space-y-3">
                {selected.limitations.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] sm:text-base leading-[1.75] text-foreground/90"><AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[#a96952]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200/80 p-6 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-600">Common effects to know</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.commonEffects.map((item) => <span key={item} className="rounded-full bg-warm-cream px-3.5 py-1.5 text-xs sm:text-sm font-medium text-stone-800">{item}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200/80 p-6 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-600">What is monitored</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {selected.monitor.map((item) => <span key={item} className="rounded-xl bg-warm-cream p-3 text-xs sm:text-sm leading-relaxed text-stone-800 font-medium">{item}</span>)}
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
        response: 'Track weight and growth. Giving the stimulant with or after meals and concentrating nutritious calories when appetite rebounds (early morning and late evening) helps maintain growth velocity. Do not force meals.',
        urgency: 'Routine discussion unless weight loss is substantial, growth velocity falters, or eating becomes unsafe.',
      },
      {
        issue: 'Difficulty falling asleep (insomnia)',
        notice: 'The medicine may last too late into the evening, or pre-existing ADHD sleep delay may be unmasked.',
        response: 'Strengthen sleep hygiene, eliminate evening screens, avoid caffeine, move the morning dose earlier, or discuss switching to an earlier-wearing formulation or eliminating an afternoon booster.',
        urgency: 'Contact the prescriber if severe sleep deprivation impairs daytime safety, cognitive function, or school/work attendance.',
      },
      {
        issue: 'Dizziness, palpitations, or lightheadedness',
        notice: 'Lightheadedness upon standing, racing pulse, or weakness can reflect dehydration, inadequate caloric intake, or cardiovascular elevation.',
        response: 'Check hydration and food intake; check pulse and blood pressure sitting and standing. Clinician may adjust dose or evaluate cardiac function.',
        urgency: 'EMERGENCY assessment if accompanied by chest pain, shortness of breath, unexplained fainting (syncope), or irregular heart rhythm.',
      },
      {
        issue: 'Irritability, rebound moodiness, or emotional lability',
        notice: 'Mood may dip abruptly as the medication wears off in the late afternoon (rebound phenomenon) or become flattened while active.',
        response: 'Record the exact time of onset. The clinician may smooth the wearing-off curve by adding a small booster, switching to an alternative release system, or trialing the opposite stimulant family.',
        urgency: 'Prompt clinical evaluation for acute depressive symptoms, severe agitation, hallucinations, mania, or emergence of suicidal behavior.',
      },
      {
        issue: 'Pediatric growth velocity attenuation',
        notice: 'Some children exhibit a temporary modest deceleration in height and weight velocity during continuous stimulant treatment.',
        response: 'Plot height and weight on standardized CDC/WHO growth charts at least every 6 months. Review nutrition and caloric density. Planned medication pauses should only be undertaken in consultation with the prescriber.',
        urgency: 'Routine clinical tracking; persistent downward crossing of height percentiles warrants pediatric endocrinology or nutrition review.',
      },
    ],
  },
  {
    id: 'nonstimulant',
    label: 'Atomoxetine & viloxazine',
    color: '#925e76',
    rows: [
      {
        issue: 'Tiredness, sedation, or daytime sleepiness',
        notice: 'Often most pronounced during initial titration or after dose escalations.',
        response: 'Titrate slowly. For atomoxetine, splitting the daily dose into twice-daily administration or shifting the dose to bedtime can reduce daytime sedation.',
        urgency: 'Contact the prescriber if sedation impairs daytime safety, driving, or basic function.',
      },
      {
        issue: 'Gastrointestinal distress (nausea, stomach pain, vomiting)',
        notice: 'Dyspepsia, nausea, or abdominal discomfort can occur, particularly when taken on an empty stomach.',
        response: 'Administer capsules with a substantial meal. Do not open atomoxetine capsules (powder is an ocular irritant). Viloxazine capsules may be opened and sprinkled on cold soft food per label.',
        urgency: 'Prompt medical review for persistent intractable vomiting, dehydration, severe abdominal pain, or signs of jaundice.',
      },
      {
        issue: 'Appetite suppression or sleep disturbance',
        notice: 'Appetite reduction, early insomnia, or mid-night awakenings can occur.',
        response: 'Monitor meals, weight, sleep patterns, and caffeine intake (viloxazine inhibits CYP1A2, substantially increasing caffeine exposure).',
        urgency: 'Contact the prescriber if nutrition, weight, or sleep is markedly impaired.',
      },
      {
        issue: 'Suicidal ideation or mood changes (FDA Boxed Warning)',
        notice: 'Both atomoxetine and viloxazine carry FDA Boxed Warnings for increased risk of suicidal thoughts and behaviors in pediatric and young adult patients.',
        response: 'Caregivers and adult patients must actively monitor for emergence of suicidal thinking, depressive mood, hostility, agitation, or unusual behavioral changes, especially in the first 8 weeks.',
        urgency: 'IMMEDIATE psychiatric evaluation or crisis care (dial 988 in the U.S. / Canada, or local emergency services) for any suicidal thoughts or dangerous behavior.',
      },
      {
        issue: 'Drug-drug interactions & hepatic metabolism',
        notice: 'Atomoxetine is metabolized by CYP2D6 (sensitive to fluoxetine/paroxetine); viloxazine is a potent CYP1A2 inhibitor.',
        response: 'Provide the prescriber and pharmacist an exhaustive list of all medications. Concomitant viloxazine with theophylline or tizanidine is STRICTLY CONTRAINDICATED.',
        urgency: 'Contact the prescriber immediately prior to taking new prescriptions, over-the-counter medicines, or herbal supplements.',
      },
    ],
  },
  {
    id: 'alpha',
    label: 'Alpha-2 agonists',
    color: '#9a7648',
    rows: [
      {
        issue: 'Somnolence and daytime fatigue',
        notice: 'The most frequent adverse effect, especially during initial titration and dose increases.',
        response: 'Start at the lowest available dose and titrate in small weekly steps. Dosing guanfacine or the larger portion of clonidine at bedtime helps mitigate daytime drowsiness.',
        urgency: 'Contact the prescriber if somnolence causes falls, confusion, or unsafe daytime impairment.',
      },
      {
        issue: 'Low blood pressure, bradycardia, or orthostasis',
        notice: 'Dizziness upon standing, lightheadedness, weakness, or unusual lethargy.',
        response: 'Monitor sitting and standing blood pressure and heart rate. Maintain adequate hydration. Rise slowly from sitting or lying positions.',
        urgency: 'Urgent evaluation for syncope (fainting), chest pain, severe weakness, or symptomatic bradycardia (heart rate < 50 bpm with dizziness).',
      },
      {
        issue: 'Missed doses and abrupt discontinuation (Rebound risk)',
        notice: 'Abruptly stopping alpha-2 agonists can precipitate acute rebound hypertension and reflex tachycardia.',
        response: 'Never stop suddenly or double up on missed doses. Always maintain an uninterrupted medication supply and plan travel refills well in advance.',
        urgency: 'Emergency medical consultation if multiple consecutive doses are missed and severe headache, nausea, rapid pulse, or acute blood pressure elevation occurs.',
      },
      {
        issue: 'Irritability or depressive affect',
        notice: 'Emotional blunting, irritability, or depressive symptoms can occasionally occur, overlapping with fatigue.',
        response: 'Track symptom timing in relation to doses. The clinician may evaluate whether the dose is too high, titration was too fast, or a different treatment is indicated.',
        urgency: 'Prompt review for severe depressive symptoms, self-harm thoughts, or behavioral crises.',
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
                <p className="font-bold text-base sm:text-lg" style={{ color: selected.color }}>{row.issue}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-600">What it may look like</p>
                <p className="mt-2 text-[15px] sm:text-base leading-[1.7] text-foreground/90">{row.notice}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-600">What is usually discussed</p>
                <p className="mt-2 text-[15px] sm:text-base leading-[1.7] text-foreground/90">{row.response}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-600">When to escalate</p>
                <p className="mt-2 text-[15px] sm:text-base leading-[1.7] text-foreground/90">{row.urgency}</p>
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
      'That is common and does not indicate medication has failed. The dose may have been suboptimal, the formulation may not match the daily routine, or the patient may be a non-responder to that specific drug family. In clinical trials, approximately 40% of patients who fail methylphenidate respond robustly to amphetamines, and vice versa. Nonstimulants (atomoxetine, viloxazine) and alpha-2 agonists (guanfacine, clonidine) provide further evidence-based alternatives.',
  },
  {
    question: 'Does medication cure ADHD?',
    answer:
      'No. Medication reduces core symptoms while pharmacologically active by optimizing catecholaminergic transmission in executive brain networks. It does not teach executive habits, organizational strategies, or emotional regulation skills automatically. Comprehensive treatment integrates medication with behavioral therapy, psychoeducation, environmental scaffolding, sleep support, and workplace or educational accommodations.',
  },
  {
    question: 'Are generic and brand-name ADHD medicines identical?',
    answer:
      'Generics share identical active pharmaceutical ingredients and must demonstrate bioequivalence within standard pharmacokinetic bounds. However, extended-release delivery systems (such as OROS osmotic pumps, bimodal bead coatings, or matrix systems) and inactive excipients can differ between manufacturers. Some individuals experience noticeable changes in absorption rate or daily duration. Keep track of the specific generic manufacturer on your pharmacy label and discuss any changes with your prescriber.',
  },
  {
    question: 'Can ADHD medication be prescribed when someone has tics?',
    answer:
      'Yes, with careful individualization. Extensive clinical evidence demonstrates that stimulants do not cause chronic tic disorders and do not worsen tics in the majority of patients. When tics and ADHD co-occur, alpha-2 agonists (guanfacine ER, clonidine ER) or atomoxetine are frequently selected because they reduce ADHD symptoms while simultaneously reducing tic severity. Alpha-2 agonists can also be safely combined with stimulants under medical guidance.',
  },
  {
    question: 'Can two ADHD medications be combined?',
    answer:
      'Yes, under qualified clinical supervision. Guanfacine ER and clonidine ER are FDA-approved as adjunctive therapy to stimulants in pediatric ADHD to smooth late-day rebound, treat residual impulsivity, and assist with bedtime winding down. Other combinations are used off-label in clinical practice but require explicit rationales, careful cardiovascular tracking, and systematic documentation of benefit versus added side effects.',
  },
  {
    question: 'Should medication be taken only on difficult days (“drug holidays”)?',
    answer:
      'It depends strictly on the drug class. Immediate-release stimulants can allow flexible scheduling if approved by the prescriber. In contrast, nonstimulants (atomoxetine, viloxazine) and alpha-2 agonists (guanfacine, clonidine) require consistent daily dosing to maintain steady-state efficacy and MUST NEVER be stopped casually. Abrupt cessation of alpha-2 agonists risks life-threatening rebound hypertension. Discuss all planned breaks with your prescriber.',
  },
  {
    question: 'How do we know the dose is right?',
    answer:
      'The optimal dose is the lowest effective dose that provides meaningful functional improvement across the required daily window with tolerable adverse effects. It is never determined by body weight alone for stimulants. Optimal titration tracks observable real-life outcomes: sustained task completion, emotional regulation, driving safety, pulse, blood pressure, appetite, and sleep latency.',
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
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="rounded-full bg-warm-cream p-2 text-sage-green">
                <ChevronDown className="h-5 w-5" />
              </motion.span>
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
    <ChapterLayoutWide
      title="Medication"
      subtitle="Options, cellular mechanisms, trade-offs, and clinical monitoring."
      chapterNumber={6}
      totalChapters={8}
      badgeText="Chapter 6 · Pharmacotherapy"
      estimatedReadingTime="9 min read"
      bgClass="bg-[#FAF7F2]"
      accentColor="#7a5933"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/what-helps')}
      onNext={() => setLocation('/chapter/getting-diagnosed')}
    >
      <motion.div className="space-y-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        <section className="rounded-3xl border border-[#a96952]/25 bg-[#a96952]/[0.06] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <Stethoscope className="mt-1 h-7 w-7 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">How to use this medical guide</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                This is educational clinical information, not personal medical advice. It integrates evidence from the American Academy of Pediatrics (AAP 2019), the American Academy of Child and Adolescent Psychiatry (AACAP Practice Parameters), international network meta-analyses (Cortese et al., <em>Lancet Psychiatry</em> 2018; Faraone et al., 2021), and current FDA DailyMed prescribing information. Dosages and parameters illustrate pharmacological distinctions and regulatory approvals. Never initiate, alter, combine, taper, or stop psychiatric medication without direct guidance from a licensed medical prescriber.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><Target className="h-6 w-6 text-sage-green" /><h2 className="font-serif text-3xl font-bold text-foreground">What medication can do</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Substantially reduce inattention, hyperactivity, and impulsivity while pharmacologically active',
                'Enhance prefrontal signal-to-noise ratio, improving working memory, response inhibition, and sustained effort',
                'Reduce functional impairment across academic, workplace, driving, and social settings',
                'Lower long-term risks of motor vehicle accidents, accidental injuries, and academic underachievement (Faraone et al., 2021)',
                'Create sufficient symptom stabilization for behavioral therapy, skill coaching, and accommodations to work effectively',
              ].map((item) => <li key={item} className="flex gap-3 leading-relaxed text-foreground"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sage-green" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#a96952]/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><AlertCircle className="h-6 w-6 text-[#a96952]" /><h2 className="font-serif text-3xl font-bold text-foreground">What medication cannot do alone</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Cure ADHD or permanently reorganize neurodevelopmental circuits',
                'Automatically teach organizational skills, time management, emotional regulation, or study strategies',
                'Remediate learning disabilities, unsupportive environments, chronic sleep deprivation, or trauma',
                'Guarantee internal motivation for uninteresting tasks without deliberate scaffolding and routines',
              ].map((item) => <li key={item} className="flex gap-3 leading-relaxed text-foreground"><AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#a96952]" />{item}</li>)}
            </ul>
          </article>
        </section>

        <section id="pathways" data-page-label="Medication pathways" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Start with the big picture</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Three broad medication pathways</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Stimulants, daily nonstimulants, and alpha-2 agonists differ fundamentally in cellular mechanisms, speed of onset, duration, cardiovascular profiles, and clinical indications. Select each pathway for a complete breakdown.
            </p>
          </div>
          <PathwayExplorer />
        </section>

        <section className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-[#4e72a2]/[0.08] via-white to-sage-green/[0.08] p-7 md:p-10 shadow-sm">
          <div className="grid items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4e72a2]">Cellular neuroscience explained</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">How ADHD medications optimize the brain's signal-to-noise ratio</h2>
              <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
                ADHD medications do not “speed up the entire brain” or make someone hyperactive. As demonstrated in landmark Yale research by Dr. Amy Arnsten, therapeutic doses balance two essential signaling chemicals in the brain's front executive network:
              </p>
              <ul className="mt-3.5 space-y-2 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#4e72a2]">•</span>
                  <span><strong>Norepinephrine strengthens the SIGNAL:</strong> It turns up the volume on priority tasks, working memory, and long-term goals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#4e72a2]">•</span>
                  <span><strong>Dopamine mutes the NOISE:</strong> It quiets distracting background thoughts, sensory chaos, and impulsive interruptions.</span>
                </li>
              </ul>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {[
                ['1', 'Low chemical signaling', 'Priority tasks fade out quickly; background sensory noise and random thoughts compete for your attention.'],
                ['2', 'Targeted receptor balancing', 'Medication gently restores dopamine and norepinephrine to their optimal working window in executive circuits.'],
                ['3', 'Sharp signal, quiet background', 'Goals stay anchored in working memory; resisting distractions and sustaining focus feels manageable and natural.'],
              ].map(([number, title, text], index) => (
                <div key={number} className="contents">
                  <div className="rounded-2xl border border-[#4e72a2]/20 bg-white p-5 sm:p-6 shadow-2xs">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4e72a2]/10 font-bold text-[#4e72a2]">{number}</span>
                    <h3 className="mt-4 font-bold text-foreground text-base">{title}</h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                  {index < 2 && <ArrowRight className="mx-auto hidden h-5 w-5 text-[#4e72a2]/45 sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Medical Contraindications & Safety Section */}
        <section id="contraindications" data-page-label="Contraindications and safety" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Patient Safety & Regulatory Rules</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Critical Contraindications & Dangerous Interactions</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Certain health conditions and drug combinations pose severe, life-threatening risks. These formal medical contraindications and class-wide warnings from the U.S. FDA, AAP, and NICE must be reviewed before starting or altering any ADHD medication.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* MAOI Washout */}
            <article className="rounded-3xl border border-red-500/30 bg-red-500/[0.06] p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-red-600 shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-red-950">Mandatory 14-Day MAOI Washout</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-900">
                Fatal Blood Pressure Spike Risk · Absolute Contraindication
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Taking any stimulant (*methylphenidate or amphetamine*), atomoxetine, or viloxazine at the same time as—or within <strong className="text-red-950 underline decoration-red-400">14 days of stopping</strong>—a Monoamine Oxidase Inhibitor (MAOI) is strictly prohibited. Common MAOIs include phenelzine (*Nardil*), tranylcypromine (*Parnate*), selegiline, rasagiline, the antibiotic linezolid, and intravenous methylene blue.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-red-200/80 pt-3">
                <p>
                  <strong>Why this rule exists:</strong> MAOIs completely block the breakdown of brain signaling chemicals, while ADHD medications increase their availability. Combining them triggers a massive, uncontrolled adrenaline surge throughout the body, leading to <strong>dangerously high fevers</strong>, <strong>extreme blood pressure spikes</strong>, seizures, or fatal brain bleeding.
                </p>
              </div>
            </article>

            {/* Viloxazine CYP1A2 */}
            <article className="rounded-3xl border border-red-500/30 bg-red-500/[0.06] p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-red-600 shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-red-950">Viloxazine (Qelbree) CYP1A2 Blockade</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-900">
                Theophylline & Tizanidine · Strict FDA Contraindication
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Viloxazine strongly shuts down your liver’s CYP1A2 breakdown pathway. Taking viloxazine together with the asthma medicine <strong className="text-red-950">theophylline</strong> or the muscle relaxant <strong className="text-red-950">tizanidine</strong> is <strong className="text-red-950 underline decoration-red-400">strictly forbidden</strong> by the FDA.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-red-200/80 pt-3">
                <p>
                  <strong>Why this rule exists:</strong> Because viloxazine blocks their only exit door, tizanidine or theophylline quickly accumulate to <strong>toxic, life-threatening blood levels</strong> (up to 10 times normal), causing severe drops in blood pressure, dangerously slowed heart rate, and respiratory collapse. Viloxazine also slows caffeine clearance, making a morning cup of coffee feel 3 times stronger.
                </p>
              </div>
            </article>

            {/* Cardiovascular Pre-Screening & Disease */}
            <article className="rounded-3xl border border-amber-600/30 bg-amber-500/[0.06] p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-6 w-6 text-amber-700 shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">Cardiovascular Pre-Screening & Heart Disease</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-950">
                Structural Defects & Uncontrolled Blood Pressure
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Stimulants and atomoxetine are contraindicated in individuals with active heart disease, pre-existing structural heart abnormalities (*such as enlarged heart muscle or coronary artery malformations*), serious irregular heart rhythms, or moderate-to-severe uncontrolled high blood pressure.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-amber-200/80 pt-3">
                <p>
                  <strong>Required clinical screening:</strong> Before prescribing, doctors follow the <strong>AAP / AHA cardiac screening protocol</strong>: reviewing your personal and family history (*checking for unexplained fainting during exercise or early sudden cardiac death under age 40*) and measuring baseline blood pressure and resting pulse.
                </p>
              </div>
            </article>

            {/* Angle-Closure Glaucoma */}
            <article className="rounded-3xl border border-amber-600/30 bg-amber-500/[0.06] p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-amber-700 shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">Angle-Closure (Narrow-Angle) Glaucoma</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-950">
                Ophthalmic Emergency Precaution
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Both stimulants and atomoxetine slightly widen your pupils (*mydriasis*). In individuals born with anatomically narrow drainage angles in the eye, this normal widening can physically pinch shut the eye's fluid drainage canals.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-amber-200/80 pt-3">
                <p>
                  <strong>Why this matters:</strong> If fluid cannot drain, internal eye pressure spikes rapidly (*an acute angle-closure attack*), causing <strong>severe eye pain, blurred vision, intense headaches, and rapid permanent vision damage</strong> if not treated as an emergency. Active narrow-angle glaucoma is a strict contraindication.
                </p>
              </div>
            </article>

            {/* OROS Delivery Mechanical Narrowing */}
            <article className="rounded-3xl border border-sage-green/25 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <Layers3 className="h-6 w-6 text-sage-green shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-foreground">Concerta OROS & Digestive Narrowing</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-warm-cream px-3.5 py-1 text-xs font-bold text-stone-700">
                Rigid Shell Precaution · Swallow Whole Only
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Concerta uses an advanced rigid shell (*the OROS osmotic pump*) that does not dissolve or soften in the stomach or intestines. It pushes medication out steadily through a microscopic laser-drilled hole, and the empty shell passes harmlessly into the toilet.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-sage-green/15 pt-3">
                <p>
                  <strong>Crucial administration rules:</strong> Concerta is contraindicated in patients with severe pre-existing digestive tract narrowing (*such as strictures, motility disorders, or past intestinal blockages*). <strong>Concerta tablets must always be swallowed whole</strong> with fluids and <strong>must NEVER be crushed, chewed, or cut in half</strong>.
                </p>
              </div>
            </article>

            {/* Alpha-2 Rebound Hypertension */}
            <article className="rounded-3xl border border-red-500/30 bg-red-500/[0.06] p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 shrink-0" />
                <h3 className="font-serif text-2xl font-bold text-red-950">Alpha-2 Agonist Abrupt Discontinuation</h3>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-900">
                Severe Rebound Blood Pressure Spike · Never Stop Suddenly
              </span>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground">
                Alpha-2 medications (*clonidine / Kapvay, guanfacine / Intuniv*) act as a steady brake pedal on your body's adrenaline system. If you take your foot off the brake abruptly by stopping cold-turkey, your body experiences an acute adrenaline rebound.
              </p>
              <div className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/90 border-t border-red-200/80 pt-3">
                <p>
                  <strong>Mandatory tapering protocol:</strong> Alpha-2 agonists <strong>must NEVER be stopped abruptly</strong>. Missing multiple consecutive doses can trigger <strong>dangerously high blood pressure, racing heartbeat, pounding headaches, and shaking</strong>. Any decision to stop requires a gradual, step-by-step taper supervised by your doctor.
                </p>
              </div>
            </article>
          </div>

          {/* 2023 Universal FDA Boxed Warning Callout */}
          <div className="mt-7 rounded-3xl border border-amber-600/30 bg-amber-500/[0.08] p-7 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-700" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-amber-950">
                  Universal FDA Stimulant Boxed Warning (May 2023 Update)
                </h3>
                <p className="mt-3 leading-relaxed text-amber-950 text-sm md:text-base">
                  In May 2023, the U.S. FDA issued an updated, standardized class-wide Boxed Warning across <strong>ALL prescription stimulants</strong>—including all methylphenidate and amphetamine products. The standardized warning clarifies that stimulants possess a high potential for abuse, misuse, and addiction, which can lead to overdose and death. Clinicians must assess each individual’s risk before prescribing, educate patients and families on locked storage and proper disposal, and monitor for signs of misuse and diversion throughout treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Pediatric vs Adult Regulatory Indications Callout */}
          <div className="mt-5 rounded-3xl border border-sage-green/20 bg-warm-cream/50 p-6 md:p-7">
            <div className="flex items-start gap-4">
              <Info className="mt-1 h-6 w-6 shrink-0 text-sage-green" />
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Pediatric vs. Adult FDA Indications: Regulatory Nuance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  While methylphenidate, amphetamines, atomoxetine, and viloxazine (Qelbree) have formal FDA indications for adults, <strong>alpha-2 adrenergic agonists (guanfacine ER / Intuniv, clonidine ER / Kapvay) are FDA-approved exclusively for pediatric patients ages 6 to 17</strong>. Prescribing guanfacine ER or clonidine ER in adults with ADHD is widely practiced in clinical psychiatry, but represents <strong>off-label prescribing</strong> requiring individualized clinical discussion and cardiovascular monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="effectiveness" data-page-label="Effectiveness and limits" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">What “effective” really means</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Benefit is measurable—but not magical</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['About 70–80%', 'of children and adults achieve significant symptom reduction with an optimized stimulant medication trial (Cortese et al., 2018; CDC).', CircleGauge],
              ['Effect Size ~1.0', 'average standardized mean difference for stimulants in network meta-analyses—the highest of any psychiatric drug class.', Activity],
              ['Not every barrier', 'resolves. The goal is noticeable, meaningful improvement in daily functioning, safety, and learning—not perfection.', Sparkles],
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
              <h3 className="font-serif text-3xl font-bold text-foreground">Look for functional improvement, not just “feeling focused”</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Can the person initiate, sustain, and complete priority tasks?',
                  'Are impulsive interruptions, conflicts, or dangerous actions reduced?',
                  'Does symptom control last through the critical school, work, or driving hours?',
                  'Can learned cognitive and behavioral strategies be accessed reliably?',
                  'Are relationship friction, emotional dysregulation, and home stress diminished?',
                  'Are side effects mild enough that the overall risk-benefit balance is positive?',
                ].map((item) => <div key={item} className="rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground">{item}</div>)}
              </div>
            </article>
            <article className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7">
              <h3 className="font-serif text-3xl font-bold text-foreground">Essential Clinical Limitation</h3>
              <p className="mt-4 leading-relaxed text-foreground">
                Clinical practice guidelines emphasize: medication reduces core neurochemical barriers, but it does not teach organizational skills, time management, or overcome co-occurring learning differences. Symptom relief creates the neurological window for therapy, coaching, and environmental accommodations to take root.
              </p>
            </article>
          </div>
        </section>

        <section id="timing" data-page-label="Short vs long acting" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Pharmacokinetics and delivery</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Formulation shapes the clinical experience</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A molecule is only part of the story. Release mechanisms (osmotic pumps, bimodal beads, transdermal matrices, prodrug cleavage) govern onset speed, smoothness, daytime duration, and rebound profiles.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Clock3,
                title: 'Immediate release',
                range: 'Typically 3–5 hours',
                text: 'Fast onset (20–30 minutes) with a distinct peak and wear-off window. Flexible for specific tasks, but multiple daytime doses can be inconvenient and provoke noticeable rebound irritability.',
                best: 'Useful for short coverage, dose exploration, or as a late-afternoon booster dose.',
              },
              {
                icon: Layers3,
                title: 'Extended release',
                range: 'Typically 8–14 hours',
                text: 'Engineered to cover an entire school or workday with a single morning dose. Advanced bead matrices and osmotic pumps smooth out peaks and valleys.',
                best: 'Standard first-line choice: eliminates school/work daytime redosing and reduces rebound.',
              },
              {
                icon: Moon,
                title: 'Delayed / special delivery',
                range: 'Product-specific kinetics',
                text: 'Includes evening-dosed delayed-release capsules (Jornay PM), transdermal patches (Daytrana), chewable tablets, liquids, and prodrugs (Vyvanse).',
                best: 'Solves swallowing barriers, early-morning impairment, or need for flexible duration.',
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

        <section id="directory" data-page-label="Medication directory" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Interactive medication directory</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Explore medicines by pathway, mechanism, and indications</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Search or filter cards across stimulants, nonstimulants, and alpha-2 agonists. Click any card to review cellular mechanisms, starting information, advantages, limitations, side effects, FDA Boxed Warnings, and strict contraindications.
            </p>
          </div>
          <MedicationExplorer />
        </section>

        <section id="side-effects" data-page-label="Side effects" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Side effects without panic</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">What to watch, what is adjusted, and when to seek urgent care</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Side effects vary widely in severity and management. Many resolve spontaneously with time, dose titration, or meal adjustments. Others require prompt clinical contact or emergency evaluation.
            </p>
          </div>
          <SideEffectGuide />
        </section>

        <section id="titration" data-page-label="Finding the right fit" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Finding the right fit</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Titration is a structured clinical trial of one</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The goal of titration is not “take more until focus is forced.” The prescriber starts conservatively, adjusts one variable at a time, and identifies the lowest dose that maximizes functional gains with acceptable tolerability.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              [ListChecks, '01', 'Define targets', 'Identify 2–3 specific, observable functional goals prior to treatment.'],
              [Scale, '02', 'Record baseline', 'Document baseline symptoms, vitals (BP/pulse), sleep, appetite, and growth.'],
              [Pill, '03', 'Start low', 'Begin at the lowest recommended starting dose and maintain for an adequate trial.'],
              [CircleGauge, '04', 'Adjust carefully', 'Adjust dose or timing in small steps; track onset, duration, rebound, and side effects.'],
              [Target, '05', 'Evaluate net benefit', 'Continue, switch, combine, or taper based on measurable functional improvement.'],
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
                  'What observable functional goals improved?',
                  'When does symptom control begin and wear off?',
                  'Is late-afternoon rebound irritability present?',
                  'Appetite, caloric intake, and pediatric growth velocity?',
                  'Sleep latency, bedtime routine, and morning wakefulness?',
                  'Any emergent anxiety, mood flattening, or tics?',
                  'Sitting/standing blood pressure and heart rate?',
                  'Medication adherence, refill scheduling, and locked storage?',
                ].map((item) => <div key={item} className="rounded-xl bg-warm-cream p-4 text-sm leading-relaxed text-foreground">{item}</div>)}
              </div>
            </article>
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3"><Utensils className="h-6 w-6 text-[#9a7648]" /><h3 className="font-serif text-3xl font-bold text-foreground">A simple daily medication log</h3></div>
              <p className="mt-4 leading-relaxed text-foreground">A brief daily note provides reliable longitudinal data during clinical appointments.</p>
              <div className="mt-5 space-y-3">
                {[
                  ['Morning', 'Dose & time taken • breakfast composition • morning mood/focus'],
                  ['Midday', 'Symptom rating (1–10) • lunch appetite • school/work performance'],
                  ['Evening', 'Wear-off time • rebound irritability • dinner appetite • family friction'],
                  ['Night', 'Bedtime routine • sleep latency • nighttime awakenings • unusual symptoms'],
                ].map(([time, details]) => <div key={time} className="grid grid-cols-[85px_1fr] gap-3 rounded-xl border border-sage-green/10 p-4 text-sm"><strong className="text-sage-green">{time}</strong><span className="text-foreground">{details}</span></div>)}
              </div>
            </article>
          </div>
        </section>

        <section id="combinations" data-page-label="Combination treatment" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Combination treatment</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Why a prescriber may combine medications</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <div className="w-full rounded-2xl bg-[#4e72a2]/10 p-5 text-center sm:w-48"><Pill className="mx-auto h-7 w-7 text-[#4e72a2]" /><p className="mt-3 font-bold text-foreground">Stimulant</p><p className="mt-1 text-xs text-muted-foreground">Daytime executive function & core focus</p></div>
                <div className="flex items-center gap-2 text-sage-green"><span className="h-px w-8 bg-sage-green/30" /><span className="text-xl font-bold">+</span><span className="h-px w-8 bg-sage-green/30" /></div>
                <div className="w-full rounded-2xl bg-[#9a7648]/10 p-5 text-center sm:w-48"><Moon className="mx-auto h-7 w-7 text-[#9a7648]" /><p className="mt-3 font-bold text-foreground">Alpha-2 agonist</p><p className="mt-1 text-xs text-muted-foreground">Residual impulsivity, tics, sleep, or evening behavior</p></div>
              </div>
              <p className="mt-6 text-center text-sm leading-relaxed text-foreground">
                Guanfacine ER and clonidine ER are FDA-approved as monotherapy or adjunctive therapy to stimulants specifically for children and adolescents ages 6 to 17; use in adults with ADHD is clinically common but formally off-label. The combination should have an explicit clinical goal and its own dedicated cardiovascular monitoring plan.
              </p>
            </article>
            <article className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7">
              <h3 className="font-serif text-3xl font-bold text-foreground">Combinations are not automatically “stronger”</h3>
              <ul className="mt-5 space-y-4">
                {[
                  'An adjunctive agent may smooth late-day rebound or address comorbid tics, sleep, or emotional dysregulation.',
                  'It may allow a lower dose of the primary stimulant when dose-limiting side effects (e.g. tachycardia or anorexia) occur.',
                  'Other combinations (e.g. stimulant + atomoxetine) are prescribed off-label and require specialist oversight.',
                  'Every added agent introduces potential drug-drug interactions, adherence burden, and cumulative side-effect risks.',
                ].map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a96952]" />{item}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section>
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Less commonly used options</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Second-line and off-label medications</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Bupropion (Wellbutrin)', 'An aminoketone antidepressant with dual norepinephrine and dopamine reuptake inhibition (NDRI). Used off-label for adult ADHD, especially when co-occurring depressive symptoms or smoking cessation are clinical targets. It carries a dose-dependent seizure risk in susceptible individuals and should not be used in eating disorders.'],
              ['Modafinil (Provigil)', 'A wakefulness-promoting agent approved for narcolepsy and sleep apnea, used off-label in selected adult ADHD cases. AACAP and FDA guidelines emphasize vigilance for serious cutaneous reactions, including Stevens-Johnson syndrome.'],
              ['Tricyclic antidepressants (TCAs)', 'Tertiary/secondary amines (such as desipramine, imipramine, and nortriptyline) occasionally used off-label when first- and second-line treatments fail. They carry significant cardiotoxicity risks in overdose, anticholinergic side effects, and require baseline and periodic ECG monitoring.'],
            ].map(([title, text]) => <article key={title} className="rounded-3xl border border-sage-green/15 bg-white p-6 shadow-sm"><h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3><p className="mt-4 text-sm leading-relaxed text-foreground">{text}</p></article>)}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-sage-green" /><h2 className="font-serif text-3xl font-bold text-foreground">Before medication starts</h2></div>
            <ul className="mt-6 space-y-4">
              {[
                'Confirm a comprehensive clinical evaluation establishing DSM-5-TR diagnostic criteria across multiple settings',
                'Detailed personal and family cardiovascular screening (syncope, sudden early cardiac death, chest pain, arrhythmias)',
                'Baseline measurement of blood pressure, resting heart rate, height, weight, and sleep patterns',
                'Exhaustive reconciliation of all current prescriptions, OTC drugs, vitamins, supplements, and caffeine intake',
                'Screening for personal or family psychiatric history, substance use disorders, and glaucoma risk',
                'Mutual agreement on 2–3 objective target outcomes, scheduled titration reviews, and emergency contact procedures',
              ].map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-green" />{item}</li>)}
            </ul>
          </article>
          <article className="rounded-3xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-7 shadow-sm">
            <div className="flex items-center gap-3"><AlertTriangle className="h-6 w-6 text-[#a96952]" /><h2 className="font-serif text-3xl font-bold text-foreground">When to seek help quickly</h2></div>
            <p className="mt-4 leading-relaxed text-foreground">Contact the prescriber promptly for persistent adverse effects, marked depressive mood, new or worsening motor/vocal tics, severe insomnia, or suspected drug interactions.</p>
            <div className="mt-5 rounded-2xl bg-white p-5 border border-[#a96952]/20">
              <p className="font-bold text-red-700">Immediate Emergency / Crisis Evaluation</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                Seek immediate emergency medical attention (dial 911/988 in the U.S. / Canada, or local emergency services) for: chest pain, exertional syncope (fainting), severe shortness of breath, seizure, severe acute allergic reaction (angioedema, anaphylaxis), acute emergence of suicidal behavior or intent, new hallucinations or psychotic symptoms, severe agitation, or signs of suspected overdose.
              </p>
            </div>
          </article>
        </section>

        <section id="faq" data-page-label="Common questions" className="scroll-mt-24">
          <div className="mb-8 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4e72a2]">Frequently asked questions</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Clinical answers to common questions</h2>
          </div>
          <FAQSection />
        </section>

        <section className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-[#4e72a2]/[0.08] to-sage-green/[0.08] p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Questions worth taking to your appointment</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              'Which 2–3 specific functional outcomes will we monitor to determine whether this medication is working?',
              'Why are you recommending this specific medication family and formulation for my clinical profile?',
              'What is the expected onset time, peak duration, and wearing-off pattern for this formulation?',
              'What cardiovascular parameters (blood pressure, pulse) will we track, and how often?',
              'What is our contingency plan if this first drug family or formulation proves ineffective or intolerable?',
              'Are there any dangerous interactions with my current medications, supplements, or dietary habits (e.g. caffeine)?',
              'What are the product-specific instructions for missed doses, secure locked storage, and refills?',
              'How will we manage titration reviews, and when should I call versus seek emergency evaluation?',
            ].map((question) => <div key={question} className="flex gap-3 rounded-xl bg-white/80 p-4 text-sm leading-relaxed text-foreground"><span className="font-bold text-[#4e72a2]">?</span>{question}</div>)}
          </div>
        </section>

        <SourceList
          sources={[
            {
              title: 'Comparative efficacy and tolerability of medications for attention-deficit hyperactivity disorder in children, adolescents, and adults: a systematic review and network meta-analysis',
              organization: 'The Lancet Psychiatry (Cortese et al., 2018)',
              url: 'https://doi.org/10.1016/S2215-0366(18)30269-4',
              note: 'Landmark network meta-analysis of 133 double-blind randomized controlled trials evaluating comparative efficacy and tolerability across stimulants and nonstimulants.',
            },
            {
              title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder',
              organization: 'Neuroscience & Biobehavioral Reviews (Faraone et al., 2021)',
              url: 'https://doi.org/10.1016/j.neubiorev.2021.01.022',
              note: 'Consensus statement synthesizing international empirical findings on ADHD genetics, neurobiology, clinical presentation, and pharmacotherapy.',
            },
            {
              title: 'Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of ADHD in Children and Adolescents',
              organization: 'American Academy of Pediatrics (Wolraich et al., Pediatrics 2019)',
              url: 'https://doi.org/10.1542/peds.2019-2528',
              note: 'AAP evidence-based guidelines for age-specific multimodal care, cardiovascular pre-screening, stimulant titration, and follow-up tracking.',
            },
            {
              title: 'Attention deficit hyperactivity disorder: diagnosis and management (NICE Guideline NG87)',
              organization: 'National Institute for Health and Care Excellence (NICE 2018, updated 2024)',
              url: 'https://www.nice.org.uk/guidance/ng87',
              note: 'UK clinical practice guidelines covering first-line stimulant hierarchy, nonstimulant indications, cardiovascular baseline monitoring, and contraindications.',
            },
            {
              title: 'FDA Drug Safety Communication: FDA updates Boxed Warning for prescription stimulants to address misuse, abuse, addiction, and overdose',
              organization: 'U.S. Food and Drug Administration (FDA, May 2023)',
              url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-updates-boxed-warning-prescription-stimulants-improve-safe-use-and-address-misuse-abuse-addiction',
              note: 'Standardized class-wide Boxed Warning update across all prescription methylphenidate and amphetamine medications regarding abuse, misuse, addiction, and diversion.',
            },
            {
              title: 'DailyMed Prescribing Information (FDA Package Inserts)',
              organization: 'U.S. National Library of Medicine',
              url: 'https://dailymed.nlm.nih.gov/dailymed/',
              note: 'Official FDA package inserts for Ritalin, Concerta, Focalin XR, Daytrana, Adderall IR/XR, Vyvanse, Jornay PM, Strattera, Qelbree, Intuniv, and Kapvay.',
            },
            {
              title: 'Catecholamine regulation of the prefrontal cortex: Cognitive function and ADHD pharmacotherapy',
              organization: 'Neuropharmacology (Arnsten, A. F. T., 2020)',
              url: 'https://doi.org/10.1016/j.neuropharm.2020.108343',
              note: 'Cellular neurobiology detailing alpha-2A adrenergic receptor and dopamine D1 receptor modulation of working memory and prefrontal signal-to-noise ratio.',
            },
            {
              title: 'Clinical Update: ADHD Across the Lifespan',
              organization: 'American Academy of Child and Adolescent Psychiatry (AACAP)',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
              note: 'Practice parameters for comprehensive diagnostic assessment, stimulant titration protocols, adjunctive alpha-2 agonist usage, and multimodal intervention.',
            },
          ]}
        />

        <button type="button" onClick={() => jumpTo('pathways')} className="mx-auto flex items-center gap-2 rounded-full border border-sage-green/20 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-sage-green/50">
          Back to the three pathways <ArrowDown className="h-4 w-4 rotate-180" />
        </button>
      </motion.div>
    </ChapterLayoutWide>
  );
}
