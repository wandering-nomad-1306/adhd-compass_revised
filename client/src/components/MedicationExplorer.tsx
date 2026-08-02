import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ChevronDown,
  Clock3,
  Gauge,
  Layers3,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type MedicationPathway = 'All' | 'Stimulant' | 'Nonstimulant' | 'Alpha-2 agonist';

type Medication = {
  id: string;
  brand: string;
  generic: string;
  pathway: Exclude<MedicationPathway, 'All'>;
  family: string;
  form: string;
  controlled: boolean;
  coverage: string;
  startingPoint: string;
  adjustment: string;
  usefulWhen: string[];
  advantages: string[];
  limitations: string[];
  commonEffects: string[];
  safety: string;
  color: string;
};

const medications: Medication[] = [
  {
    id: 'ritalin-ir',
    brand: 'Ritalin IR',
    generic: 'methylphenidate immediate release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Immediate-release tablet',
    controlled: true,
    coverage: 'Usually about 3–4 hours in the AACAP guide; often requires more than one dose to cover a full day.',
    startingPoint: 'The guide lists 5 mg as a pediatric starting dose. Current prescribing depends on age, prior exposure, and the exact product label.',
    adjustment: 'Short-acting stimulants can be adjusted in small steps and may help identify a useful dose, but repeated daytime dosing can be inconvenient.',
    usefulWhen: ['short, clearly defined coverage is wanted', 'a flexible schedule is useful', 'a prescriber wants a short-acting trial'],
    advantages: ['quick onset', 'flexible timing', 'easier to see when benefit begins and ends'],
    limitations: ['short coverage', 'school or work dosing may be needed', 'rebound symptoms may be noticeable as it wears off'],
    commonEffects: ['lower appetite', 'difficulty sleeping if taken late', 'headache or stomach discomfort', 'increased pulse or blood pressure'],
    safety: 'As with all stimulants: screen for cardiovascular and psychiatric risk, monitor growth in children, and store securely because of misuse and diversion risk.',
    color: '#477f72',
  },
  {
    id: 'concerta',
    brand: 'Concerta',
    generic: 'methylphenidate extended release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Long-acting tablet',
    controlled: true,
    coverage: 'The AACAP guide describes about 12 hours of coverage, though the useful window varies by person.',
    startingPoint: 'The guide lists 18 mg. Current U.S. labeling also uses 18 mg once daily for many patients new to methylphenidate.',
    adjustment: 'Dose is usually increased gradually while tracking benefit across the school or work day, appetite, sleep, mood, pulse, and blood pressure.',
    usefulWhen: ['once-daily morning dosing is preferred', 'school or workday coverage is needed', 'methylphenidate is the chosen stimulant family'],
    advantages: ['long daytime coverage', 'avoids a school-time dose for many people', 'well-studied formulation'],
    limitations: ['tablet must be swallowed whole', 'coverage may be too long or too short for an individual', 'controlled substance'],
    commonEffects: ['lower appetite', 'insomnia', 'headache', 'stomach discomfort'],
    safety: 'Do not crush or split the extended-release tablet. Monitor the same stimulant risks, including misuse, cardiovascular effects, mood changes, tics, and growth in children.',
    color: '#548779',
  },
  {
    id: 'focalin-xr',
    brand: 'Focalin XR',
    generic: 'dexmethylphenidate extended release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Long-acting capsule',
    controlled: true,
    coverage: 'The guide describes about 10–12 hours.',
    startingPoint: 'The guide lists 5 mg. The exact starting dose differs for children, adults, and people switching from another methylphenidate product.',
    adjustment: 'The dose is individualized; dexmethylphenidate is not milligram-for-milligram equivalent to every methylphenidate product.',
    usefulWhen: ['a once-daily methylphenidate-family option is wanted', 'a capsule/sprinkle option is helpful', 'another methylphenidate formulation did not fit'],
    advantages: ['once-daily dosing', 'capsule can be opened and sprinkled according to the label', 'longer coverage than immediate release'],
    limitations: ['not directly interchangeable with other products', 'may suppress appetite or sleep', 'controlled substance'],
    commonEffects: ['lower appetite', 'insomnia', 'headache', 'abdominal pain'],
    safety: 'Do not crush or chew the extended-release contents. Screen and monitor as with other stimulants.',
    color: '#5b8e83',
  },
  {
    id: 'daytrana',
    brand: 'Daytrana',
    generic: 'methylphenidate transdermal system',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Skin patch',
    controlled: true,
    coverage: 'The AACAP guide lists roughly 6–16 hours depending partly on how long the patch is worn.',
    startingPoint: 'The guide lists a 10 mg patch as the starting strength. Patch timing, placement, and wear duration must follow the current label.',
    adjustment: 'The prescriber can adjust patch strength and wear time. Effects may continue after the patch is removed.',
    usefulWhen: ['swallowing pills is difficult', 'wear time needs to be adjustable', 'a non-oral stimulant form is preferred'],
    advantages: ['non-oral option', 'wear time can shape duration', 'once-daily application'],
    limitations: ['skin irritation or discoloration can occur', 'absorption can vary with heat', 'patch handling and disposal require care'],
    commonEffects: ['lower appetite', 'insomnia', 'skin irritation', 'headache or nausea'],
    safety: 'Follow the label exactly for placement, heat exposure, removal, and disposal. The patch remains a controlled stimulant medication.',
    color: '#698f86',
  },
  {
    id: 'adderall-ir',
    brand: 'Adderall IR',
    generic: 'mixed amphetamine salts immediate release',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Immediate-release tablet',
    controlled: true,
    coverage: 'The guide describes about 6 hours, with individual variation.',
    startingPoint: 'The AACAP guide lists 2.5–5 mg. Current label dosing depends on age and clinical context.',
    adjustment: 'Short-acting amphetamine can be adjusted gradually. Later doses may interfere with sleep.',
    usefulWhen: ['shorter flexible coverage is wanted', 'an amphetamine-family trial is appropriate', 'a booster dose is prescribed for late-day coverage'],
    advantages: ['fast onset', 'flexible schedule', 'different stimulant family from methylphenidate'],
    limitations: ['may require more than one dose', 'more noticeable wear-off for some people', 'controlled substance with misuse risk'],
    commonEffects: ['lower appetite', 'insomnia', 'dry mouth', 'increased pulse or blood pressure'],
    safety: 'Current stimulant labels carry strong warnings about abuse, misuse, addiction, overdose, and secure storage.',
    color: '#4e72a2',
  },
  {
    id: 'adderall-xr',
    brand: 'Adderall XR',
    generic: 'mixed amphetamine salts extended release',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Long-acting capsule',
    controlled: true,
    coverage: 'The guide describes about 12 hours.',
    startingPoint: 'Current U.S. labeling commonly starts many children and adolescents at 10 mg each morning; adult starting information differs. The prescriber follows the current label.',
    adjustment: 'Dose is adjusted at intervals while tracking benefit, appetite, sleep, mood, pulse, blood pressure, and misuse risk.',
    usefulWhen: ['once-daily amphetamine coverage is wanted', 'methylphenidate did not work well or caused more side effects', 'a capsule/sprinkle formulation is helpful'],
    advantages: ['once-daily dosing', 'long school/workday coverage', 'capsule can be opened and sprinkled according to the label'],
    limitations: ['afternoon dosing can worsen insomnia', 'appetite and cardiovascular effects', 'controlled substance'],
    commonEffects: ['lower appetite', 'insomnia', 'dry mouth', 'headache or stomach discomfort'],
    safety: 'The current label includes a boxed warning about abuse, misuse, and addiction. Safe storage and regular review are essential.',
    color: '#5576a3',
  },
  {
    id: 'vyvanse',
    brand: 'Vyvanse',
    generic: 'lisdexamfetamine',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Long-acting prodrug capsule or chewable',
    controlled: true,
    coverage: 'The AACAP guide describes roughly 12–14 hours.',
    startingPoint: 'The guide and current U.S. labeling use 30 mg each morning for many patients age 6 and older, with gradual adjustment by the prescriber.',
    adjustment: 'The medication is converted in the body to active dextroamphetamine. Dose is adjusted based on response and tolerability, not body size alone.',
    usefulWhen: ['long, steady daytime coverage is wanted', 'a capsule or chewable option helps', 'an amphetamine-family option is appropriate'],
    advantages: ['once-daily dosing', 'long coverage', 'capsule and chewable forms'],
    limitations: ['may affect appetite, sleep, pulse, or blood pressure', 'not appropriate with MAO inhibitors', 'controlled substance'],
    commonEffects: ['lower appetite', 'insomnia', 'dry mouth', 'anxiety or stomach discomfort'],
    safety: 'Screen for cardiac and psychiatric risk and monitor for adverse effects, growth in children, and misuse or diversion.',
    color: '#5b6f96',
  },
  {
    id: 'jornay-pm',
    brand: 'Jornay PM',
    generic: 'methylphenidate delayed/extended release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Evening-dosed delayed/extended-release capsule',
    controlled: true,
    coverage: 'Taken in the evening so release begins the next morning and continues through the day.',
    startingPoint: 'The AACAP guide lists 20 mg. The evening administration time is individualized within the label’s timing window.',
    adjustment: 'Both dose and evening timing may be adjusted. It should not be substituted milligram-for-milligram with another methylphenidate product.',
    usefulWhen: ['early-morning impairment is a major target', 'a morning dose is hard to take reliably', 'methylphenidate is otherwise a good fit'],
    advantages: ['targets the early morning', 'once-daily evening routine', 'capsule can be sprinkled according to the label'],
    limitations: ['unusual timing requires consistency', 'may worsen sleep', 'controlled substance'],
    commonEffects: ['lower appetite', 'insomnia', 'headache', 'mood changes'],
    safety: 'The same stimulant warnings and monitoring apply. Evening timing should be changed only with the prescriber.',
    color: '#6c8b79',
  },
  {
    id: 'atomoxetine',
    brand: 'Strattera / atomoxetine',
    generic: 'atomoxetine',
    pathway: 'Nonstimulant',
    family: 'Selective norepinephrine reuptake inhibitor',
    form: 'Daily capsule',
    controlled: false,
    coverage: 'Taken consistently each day; benefit may take several weeks at a useful dose.',
    startingPoint: 'Dosing is weight-based below 70 kg and uses fixed doses at 70 kg or above. The prescriber starts low and increases gradually.',
    adjustment: 'Unlike stimulants, benefit is not judged after one dose. A fair trial requires enough time at an appropriate dose.',
    usefulWhen: ['stimulants are ineffective or poorly tolerated', 'a non-controlled option is preferred', 'anxiety or tics are part of the clinical picture'],
    advantages: ['not a controlled substance', 'all-day treatment', 'no need for immediate-release/extended-release scheduling'],
    limitations: ['slower onset', 'capsule should be swallowed whole', 'liver metabolism creates important drug interactions'],
    commonEffects: ['tiredness', 'nausea or stomach pain', 'reduced appetite', 'headache or sleep changes'],
    safety: 'The U.S. label has a boxed warning for suicidal ideation in children and adolescents. Monitor mood and behavior; rare severe liver injury is also described.',
    color: '#925e76',
  },
  {
    id: 'qelbree',
    brand: 'Qelbree',
    generic: 'viloxazine extended release',
    pathway: 'Nonstimulant',
    family: 'Selective norepinephrine reuptake inhibitor',
    form: 'Once-daily extended-release capsule',
    controlled: false,
    coverage: 'Taken daily; noticeable benefit may take several weeks.',
    startingPoint: 'Current U.S. labeling uses age-based starting doses: 100 mg for ages 6–11 and 200 mg for adolescents and adults.',
    adjustment: 'The dose may be increased weekly according to age, response, tolerability, kidney function, and the current label.',
    usefulWhen: ['a non-controlled daily option is wanted', 'stimulants are ineffective or not tolerated', 'a capsule that can be opened is helpful'],
    advantages: ['not a controlled substance', 'approved in the U.S. for adults and ages 6+', 'capsule may be sprinkled on applesauce or pudding according to the label'],
    limitations: ['slower onset than stimulants', 'important drug interactions', 'can raise heart rate or blood pressure'],
    commonEffects: ['sleepiness or fatigue', 'decreased appetite', 'nausea', 'insomnia or irritability'],
    safety: 'The label has a boxed warning for suicidal thoughts and behaviors. Monitor mood, blood pressure, pulse, and possible bipolar activation.',
    color: '#8c6680',
  },
  {
    id: 'guanfacine-er',
    brand: 'Intuniv / guanfacine ER',
    generic: 'guanfacine extended release',
    pathway: 'Alpha-2 agonist',
    family: 'Alpha-2A adrenergic agonist',
    form: 'Once-daily extended-release tablet',
    controlled: false,
    coverage: 'Once daily in the morning or evening; full benefit can take several weeks.',
    startingPoint: 'Current labels begin at 1 mg once daily and use gradual weekly increases within a weight-based target range.',
    adjustment: 'Blood pressure, pulse, sleepiness, and dizziness guide adjustment. Extended-release guanfacine is not substituted milligram-for-milligram with immediate-release guanfacine.',
    usefulWhen: ['impulsivity or behavioral dysregulation is prominent', 'tics or sleep difficulty are part of the picture', 'an add-on to a stimulant is being considered'],
    advantages: ['not controlled', 'can be used alone or with a stimulant', 'may help tics, sleep, or evening behavior in some patients'],
    limitations: ['drowsiness can be prominent', 'may lower blood pressure or heart rate', 'must be tapered rather than stopped abruptly'],
    commonEffects: ['sleepiness', 'fatigue', 'dizziness', 'low blood pressure or dry mouth'],
    safety: 'Do not stop suddenly because rebound hypertension can occur. Swallow extended-release tablets whole and discuss interacting medicines.',
    color: '#9a7648',
  },
  {
    id: 'clonidine-er',
    brand: 'Kapvay / clonidine ER',
    generic: 'clonidine hydrochloride extended release',
    pathway: 'Alpha-2 agonist',
    family: 'Alpha-2 adrenergic agonist',
    form: 'Extended-release tablet, often split morning/bedtime',
    controlled: false,
    coverage: 'After titration, the daily amount is commonly divided between morning and bedtime.',
    startingPoint: 'Current U.S. labeling begins with 0.1 mg at bedtime and increases in 0.1 mg/day weekly steps when needed.',
    adjustment: 'Sedation, blood pressure, pulse, and daytime function guide adjustment. Extended-release clonidine is not interchangeable milligram-for-milligram with other clonidine products.',
    usefulWhen: ['sleep or tics are concerns', 'hyperactivity or impulsivity remains despite another treatment', 'an adjunct to a stimulant is being considered'],
    advantages: ['not controlled', 'can be used alone or with a stimulant', 'bedtime-weighted dosing may fit some symptom patterns'],
    limitations: ['often sedating', 'may cause low blood pressure or slow heart rate', 'usually requires twice-daily dosing after titration'],
    commonEffects: ['drowsiness', 'fatigue', 'dizziness', 'slow heart rate or constipation'],
    safety: 'Do not stop suddenly. Current labels direct a gradual taper to reduce rebound hypertension risk.',
    color: '#a98652',
  },
];

const filters: MedicationPathway[] = ['All', 'Stimulant', 'Nonstimulant', 'Alpha-2 agonist'];

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
                {medication.pathway}
              </span>
              <span className="rounded-full bg-warm-cream px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {medication.family}
              </span>
              <span className="rounded-full bg-warm-cream px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {medication.controlled ? 'Controlled' : 'Not controlled'}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">{medication.brand}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{medication.generic}</p>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="mt-1 rounded-full bg-warm-cream p-2 text-sage-green">
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-warm-cream p-4 sm:col-span-1">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <Layers3 className="h-4 w-4" /> Form
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.form}</p>
          </div>
          <div className="rounded-xl bg-warm-cream p-4 sm:col-span-2">
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
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-sage-green/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-sage-green"><Gauge className="h-4 w-4" /> Starting information</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.startingPoint}</p>
                </div>
                <div className="rounded-xl border border-sage-green/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-sage-green"><Sparkles className="h-4 w-4" /> How it is adjusted</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.adjustment}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#4e72a2]">Often considered when</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {medication.usefulWhen.map((item) => (
                    <span key={item} className="rounded-full bg-[#4e72a2]/[0.08] px-3 py-2 text-xs leading-relaxed text-foreground">{item}</span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-bold text-sage-green">Potential advantages</p>
                  <ul className="mt-3 space-y-2">
                    {medication.advantages.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-green" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#a96952]">Limitations / trade-offs</p>
                  <ul className="mt-3 space-y-2">
                    {medication.limitations.map((item) => (
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
  const [filter, setFilter] = useState<MedicationPathway>('All');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return medications.filter((medication) => {
      const pathwayMatch = filter === 'All' || medication.pathway === filter;
      const textMatch = !normalized || [medication.brand, medication.generic, medication.family, medication.form].join(' ').toLowerCase().includes(normalized);
      return pathwayMatch && textMatch;
    });
  }, [filter, query]);

  return (
    <div>
      <div className="mb-6 grid gap-4 rounded-2xl border border-sage-green/15 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <span className="sr-only">Search medication names</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a brand, generic name, family, or form"
            className="w-full rounded-xl border border-sage-green/20 bg-warm-cream/45 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sage-green focus:ring-2 focus:ring-sage-green/15"
          />
        </label>
        <p className="text-xs text-muted-foreground">{visible.length} medication {visible.length === 1 ? 'card' : 'cards'}</p>
      </div>

      <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter medications by broad pathway">
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

      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-sage-green/25 bg-white p-8 text-center text-sm text-muted-foreground">
          No medication card matches that search. Try a generic name such as methylphenidate, amphetamine, atomoxetine, guanfacine, or clonidine.
        </div>
      )}

      <div className="mt-7 flex gap-3 rounded-xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-5">
        <Pill className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
        <p className="text-sm leading-relaxed text-foreground">
          Starting information is included to explain how products differ—not to tell anyone what to take. Product labels, available strengths, approvals, and brand availability change. A qualified prescriber must select, start, switch, combine, taper, and monitor medication.
        </p>
      </div>
    </div>
  );
}
