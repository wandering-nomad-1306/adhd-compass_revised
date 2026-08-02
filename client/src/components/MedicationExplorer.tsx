import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ChevronDown, Clock3, Gauge, Pill, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

type MedicationClass = 'All' | 'Methylphenidate' | 'Amphetamine' | 'Nonstimulant' | 'Alpha-2 agonist';

interface Medication {
  id: string;
  brand: string;
  generic: string;
  className: Exclude<MedicationClass, 'All'>;
  controlled: boolean;
  coverage: string;
  labelDose: string;
  titration: string;
  potentialAdvantages: string[];
  tradeoffs: string[];
  commonEffects: string[];
  safety: string;
  color: string;
}

const medications: Medication[] = [
  {
    id: 'concerta',
    brand: 'Concerta',
    generic: 'methylphenidate ER',
    className: 'Methylphenidate',
    controlled: true,
    coverage: 'Long-acting; often about 12 hours, but individual response varies.',
    labelDose: 'New to methylphenidate: 18 mg each morning for children/adolescents; 18 or 36 mg for adults.',
    titration: 'The label allows 18 mg increases at weekly intervals; maximum varies by age.',
    potentialAdvantages: ['once-daily morning dosing', 'school/workday coverage', 'well-studied stimulant family'],
    tradeoffs: ['tablet must be swallowed whole', 'may reduce appetite or delay sleep', 'controlled substance'],
    commonEffects: ['reduced appetite', 'insomnia', 'headache or stomach discomfort'],
    safety: 'Prescribers screen for cardiac risk, psychiatric symptoms, tics, and misuse risk, then monitor response, pulse, blood pressure, growth, and side effects.',
    color: '#477f72',
  },
  {
    id: 'focalin-xr',
    brand: 'Focalin XR',
    generic: 'dexmethylphenidate ER',
    className: 'Methylphenidate',
    controlled: true,
    coverage: 'Long-acting; commonly described as roughly 10–12 hours.',
    labelDose: 'New to methylphenidate: 5 mg each morning for pediatric patients; 10 mg for adults.',
    titration: 'Weekly 5 mg increases in pediatric patients or 10 mg increases in adults; label maximum 30 mg pediatric and 40 mg adult.',
    potentialAdvantages: ['once-daily dosing', 'capsule may be opened and sprinkled on applesauce', 'different methylphenidate formulation if another one is not a good fit'],
    tradeoffs: ['not milligram-equivalent to regular methylphenidate', 'may affect appetite or sleep', 'controlled substance'],
    commonEffects: ['reduced appetite', 'insomnia', 'headache or abdominal pain'],
    safety: 'Do not crush or chew the extended-release contents. Stimulant class warnings include misuse, cardiovascular effects, psychiatric reactions, and possible growth suppression.',
    color: '#5b8e83',
  },
  {
    id: 'jornay-pm',
    brand: 'Jornay PM',
    generic: 'methylphenidate delayed/extended release',
    className: 'Methylphenidate',
    controlled: true,
    coverage: 'Taken in the evening to begin working the next morning and continue through the day.',
    labelDose: '20 mg once daily in the evening for patients age 6 and older.',
    titration: 'May increase by 20 mg weekly; label maximum 100 mg daily. Timing is adjusted between 6:30 p.m. and 9:30 p.m.',
    potentialAdvantages: ['targets early-morning impairment', 'once-daily evening routine', 'capsule can be sprinkled on applesauce'],
    tradeoffs: ['unusual timing requires consistency', 'may affect sleep or appetite', 'controlled substance'],
    commonEffects: ['reduced appetite', 'insomnia', 'headache or mood changes'],
    safety: 'It should not be substituted milligram-for-milligram with other methylphenidate products. The same stimulant screening and monitoring principles apply.',
    color: '#6c8b79',
  },
  {
    id: 'adderall-xr',
    brand: 'Adderall XR',
    generic: 'mixed amphetamine salts ER',
    className: 'Amphetamine',
    controlled: true,
    coverage: 'Long-acting; commonly described as around 12 hours.',
    labelDose: 'Ages 6–17: 10 mg each morning when starting; adults: 20 mg each morning.',
    titration: 'Children 6–12 may increase by 5 or 10 mg weekly; label maximum 30 mg for that age group.',
    potentialAdvantages: ['once-daily dosing', 'capsule can be opened and sprinkled on applesauce', 'a different stimulant family when methylphenidate is not effective or tolerated'],
    tradeoffs: ['afternoon dosing can worsen insomnia', 'appetite and cardiovascular effects', 'controlled substance with misuse risk'],
    commonEffects: ['reduced appetite', 'insomnia', 'dry mouth, headache, or stomach discomfort'],
    safety: 'The current label carries a boxed warning about abuse, misuse, and addiction. Safe storage and regular monitoring matter.',
    color: '#4e72a2',
  },
  {
    id: 'vyvanse',
    brand: 'Vyvanse',
    generic: 'lisdexamfetamine',
    className: 'Amphetamine',
    controlled: true,
    coverage: 'Long-acting; the AACAP guide describes about 12–14 hours, with person-to-person variation.',
    labelDose: '30 mg each morning for adults and pediatric patients age 6 and older.',
    titration: 'May increase by 10 or 20 mg at weekly intervals; recommended range 30–70 mg and maximum 70 mg daily.',
    potentialAdvantages: ['once-daily prodrug formulation', 'capsule and chewable forms', 'long day coverage'],
    tradeoffs: ['may affect appetite, sleep, pulse, or blood pressure', 'cannot be used with an MAOI', 'controlled substance'],
    commonEffects: ['reduced appetite', 'insomnia', 'dry mouth, anxiety, or stomach discomfort'],
    safety: 'Like other amphetamine stimulants, it requires screening for cardiovascular and psychiatric risk and ongoing monitoring for adverse effects and misuse.',
    color: '#5b6f96',
  },
  {
    id: 'atomoxetine',
    brand: 'Strattera',
    generic: 'atomoxetine',
    className: 'Nonstimulant',
    controlled: false,
    coverage: 'Taken daily; benefit builds gradually and may take several weeks at an effective dose.',
    labelDose: 'Under 70 kg: 0.5 mg/kg/day initially. At least 70 kg and adults: 40 mg/day initially.',
    titration: 'Target is usually 1.2 mg/kg/day under 70 kg or 80 mg/day at 70 kg and above; label maximum 100 mg/day or weight-based limit.',
    potentialAdvantages: ['not a controlled substance', 'all-day treatment without a stimulant', 'may be considered when stimulants are not tolerated or effective'],
    tradeoffs: ['slower onset than stimulants', 'capsule must be swallowed whole', 'drug interactions can affect dosing'],
    commonEffects: ['tiredness', 'nausea or stomach pain', 'reduced appetite, insomnia, or headache'],
    safety: 'The label has a boxed warning for suicidal ideation in pediatric patients. Mood or behavior changes require prompt clinical contact; rare liver injury is also described.',
    color: '#925e76',
  },
  {
    id: 'qelbree',
    brand: 'Qelbree',
    generic: 'viloxazine ER',
    className: 'Nonstimulant',
    controlled: false,
    coverage: 'Once daily; noticeable benefit may take several weeks.',
    labelDose: 'Ages 6–11: 100 mg daily. Ages 12–17 and adults: 200 mg daily.',
    titration: 'Weekly increases by age group; maximum 400 mg pediatric and 600 mg adult.',
    potentialAdvantages: ['not a controlled substance', 'approved for adults and ages 6+', 'capsule can be opened and sprinkled on applesauce or pudding'],
    tradeoffs: ['slower onset than stimulants', 'can raise heart rate or blood pressure', 'can increase caffeine exposure and has important drug interactions'],
    commonEffects: ['sleepiness or fatigue', 'decreased appetite', 'nausea, insomnia, or irritability'],
    safety: 'The label has a boxed warning for suicidal thoughts and behaviors. Screen for bipolar disorder and monitor mood, blood pressure, and pulse.',
    color: '#8c6680',
  },
  {
    id: 'intuniv',
    brand: 'Intuniv',
    generic: 'guanfacine ER',
    className: 'Alpha-2 agonist',
    controlled: false,
    coverage: 'Once daily in the morning or evening; full benefit can take time.',
    labelDose: 'Begin at 1 mg once daily.',
    titration: 'Increase by no more than 1 mg per week. Current label uses a weight-based target range of 0.05–0.12 mg/kg/day, generally 1–7 mg.',
    potentialAdvantages: ['not a controlled substance', 'can be used alone or with a stimulant', 'may be useful when tics, sleep disturbance, or behavioral dysregulation are part of the picture'],
    tradeoffs: ['drowsiness can be prominent', 'may lower blood pressure or heart rate', 'must be tapered rather than stopped suddenly'],
    commonEffects: ['sleepiness', 'fatigue', 'dizziness, low blood pressure, or dry mouth'],
    safety: 'Swallow extended-release tablets whole and avoid abrupt discontinuation because rebound hypertension can occur.',
    color: '#9a7648',
  },
  {
    id: 'clonidine-er',
    brand: 'Clonidine ER',
    generic: 'clonidine hydrochloride extended release',
    className: 'Alpha-2 agonist',
    controlled: false,
    coverage: 'Usually divided between morning and bedtime after titration.',
    labelDose: 'Begin with 0.1 mg at bedtime.',
    titration: 'Increase by 0.1 mg/day at weekly intervals. Doses above 0.4 mg/day were not evaluated for ADHD and are not recommended.',
    potentialAdvantages: ['not a controlled substance', 'can be used alone or added to a stimulant', 'may be helpful when sleep or tics are concerns'],
    tradeoffs: ['often sedating', 'may lower blood pressure or heart rate', 'usually requires twice-daily dosing after titration'],
    commonEffects: ['drowsiness', 'fatigue', 'dizziness, slow heart rate, or constipation'],
    safety: 'Do not stop suddenly. The label directs tapering by no more than 0.1 mg every 3–7 days to reduce rebound hypertension risk.',
    color: '#a98652',
  },
];

const filters: MedicationClass[] = ['All', 'Methylphenidate', 'Amphetamine', 'Nonstimulant', 'Alpha-2 agonist'];

function MedicationCard({ medication }: { medication: Medication }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article layout className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full p-5 text-left md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ backgroundColor: `${medication.color}18`, color: medication.color }}>
                {medication.className}
              </span>
              <span className="rounded-full bg-warm-cream px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {medication.controlled ? 'Controlled stimulant' : 'Not controlled'}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-serif font-bold text-foreground">{medication.brand}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{medication.generic}</p>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="mt-1 rounded-full bg-warm-cream p-2 text-sage-green">
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-warm-cream p-4">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <Gauge className="h-4 w-4" /> Label starting dose
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.labelDose}</p>
          </div>
          <div className="rounded-xl bg-warm-cream p-4">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <Clock3 className="h-4 w-4" /> Timing / coverage
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.coverage}</p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-sage-green/10"
          >
            <div className="space-y-6 p-5 md:p-6">
              <div>
                <p className="text-sm font-bold text-sage-green">How dosing is adjusted</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.titration}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-bold text-sage-green">Potential advantages</p>
                  <ul className="mt-3 space-y-2">
                    {medication.potentialAdvantages.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-green" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#a96952]">Trade-offs to discuss</p>
                  <ul className="mt-3 space-y-2">
                    {medication.tradeoffs.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a96952]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-xl border border-sage-green/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Common effects to track</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.commonEffects.join(' • ')}</p>
              </div>
              <div className="rounded-xl bg-[#a96952]/[0.07] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8f5541]">Important safety note</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.safety}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function MedicationExplorer() {
  const [filter, setFilter] = useState<MedicationClass>('All');
  const visible = useMemo(
    () => (filter === 'All' ? medications : medications.filter((medication) => medication.className === filter)),
    [filter],
  );

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter medications by class">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              filter === item
                ? 'border-sage-green bg-sage-green text-white shadow-sm'
                : 'border-sage-green/20 bg-white text-foreground hover:border-sage-green/50'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-7 flex gap-3 rounded-xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-5">
        <Pill className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
        <p className="text-sm leading-relaxed text-foreground">
          These are educational summaries of selected common U.S. formulations—not a complete drug list and not dosing instructions. A prescriber chooses and titrates medication using age, weight, medical history, other medicines, symptom goals, response, and adverse effects.
        </p>
      </div>
    </div>
  );
}
