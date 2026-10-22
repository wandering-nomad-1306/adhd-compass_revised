import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  BrainCircuit,
  ChevronDown,
  Clock3,
  Gauge,
  Info,
  Layers3,
  Pill,
  Search,
  ShieldAlert,
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
  fdaAge: string;
  mechanism: string;
  coverage: string;
  startingPoint: string;
  adjustment: string;
  usefulWhen: string[];
  advantages: string[];
  limitations: string[];
  commonEffects: string[];
  safety: string;
  contraindications: string[];
  boxedWarning?: string;
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
    fdaAge: 'FDA-approved for pediatric patients (ages 6+) and adults with ADHD.',
    mechanism:
      'Competitive dopamine transporter (DAT) and norepinephrine transporter (NET) reuptake inhibitor. Prolongs synaptic availability of dopamine and norepinephrine in the prefrontal cortex and striatum without inducing active vesicular release.',
    coverage: 'Usually about 3–4 hours; often requires 2–3 doses daily for full-day coverage.',
    startingPoint:
      'Standard starting dose is 5 mg twice daily (before breakfast and lunch), titrated in 5–10 mg weekly increments up to a maximum recommended dose of 60 mg/day.',
    adjustment:
      'Short-acting stimulants can be adjusted in small steps to establish individual dose response, but multiple daytime doses require reliable scheduling.',
    usefulWhen: [
      'short, clearly defined coverage is needed',
      'a flexible schedule between activities is required',
      'establishing dose sensitivity before switching to an extended-release product',
    ],
    advantages: ['rapid onset (20–30 minutes)', 'dose flexibility throughout the day', 'clear start and end of medication action'],
    limitations: [
      'short coverage of 3–4 hours',
      'requires multiple daytime doses at school or work',
      'rebound irritability can occur as each dose wears off',
    ],
    commonEffects: [
      'decreased appetite',
      'difficulty sleeping if taken late',
      'headache or stomach discomfort',
      'mild pulse or blood pressure increase',
    ],
    safety:
      'Schedule II controlled substance. Monitor blood pressure, heart rate, pediatric growth charts, and screen for psychiatric and cardiovascular symptoms.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Evaluate risk prior to prescribing, educate on secure storage, and monitor throughout therapy.',
    contraindications: [
      'Concomitant use of monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuing an MAOI (fatal hypertensive crisis risk)',
      'Known hypersensitivity to methylphenidate or product excipients',
      'Marked anxiety, motor agitation, or tension',
      'Angle-closure (narrow-angle) glaucoma',
      'Pre-existing structural cardiac abnormalities, cardiomyopathy, serious arrhythmias, or moderate-to-severe hypertension',
      'Untreated hyperthyroidism',
    ],
    color: '#477f72',
  },
  {
    id: 'concerta',
    brand: 'Concerta',
    generic: 'methylphenidate extended release (OROS)',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'OROS (osmotic-release oral system) extended-release tablet',
    controlled: true,
    fdaAge: 'FDA-approved for children (ages 6–12), adolescents (ages 13–17), and adults (up to age 65).',
    mechanism:
      'Osmotic-controlled release oral delivery system (OROS) providing biphasic methylphenidate release (22% immediate overcoat, 78% continuous osmotic pumping over 10–12 hours). Acts as a selective DAT and NET reuptake inhibitor.',
    coverage: 'Approximately 10–12 hours of smooth daytime coverage.',
    startingPoint:
      '18 mg once daily in the morning for methylphenidate-naive patients; may be titrated by 18 mg weekly to a maximum of 54 mg/day (children) or 72 mg/day (adolescents/adults).',
    adjustment:
      'Dose is increased gradually in weekly steps while monitoring daytime symptom control, pulse, blood pressure, appetite, sleep, and mood.',
    usefulWhen: [
      'once-daily morning dosing is preferred',
      'avoiding school or workplace medication administration',
      'a smooth ascending pharmacokinetic profile is preferred to reduce rebound',
    ],
    advantages: [
      'long daytime coverage with a single morning tablet',
      'OROS delivery minimizes peak-to-trough fluctuations',
      'non-deformable shell reduces abuse/diversion potential compared to IR formulations',
    ],
    limitations: [
      'tablet must be swallowed whole—cannot be crushed, split, or chewed',
      'non-absorbable tablet shell is eliminated intact in stool',
      'contraindicated in severe pre-existing gastrointestinal narrowing',
    ],
    commonEffects: ['decreased appetite', 'insomnia', 'headache', 'dry mouth', 'stomach discomfort'],
    safety:
      'Do not crush or split the extended-release tablet. Monitor blood pressure, heart rate, growth in children, and screen for cardiovascular and psychiatric risks.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Universal class warning across all methylphenidate and amphetamine stimulants.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (risk of fatal hypertensive crisis)',
      'Severe pre-existing gastrointestinal narrowing, severe motility disorders, or bowel obstruction (non-deformable OROS shell poses mechanical obstruction risk)',
      'Known hypersensitivity to methylphenidate or tablet excipients',
      'Angle-closure (narrow-angle) glaucoma',
      'Structural cardiac abnormalities, cardiomyopathy, serious arrhythmias, coronary artery disease, or uncontrolled hypertension',
      'Untreated hyperthyroidism',
    ],
    color: '#548779',
  },
  {
    id: 'focalin-xr',
    brand: 'Focalin XR',
    generic: 'dexmethylphenidate extended release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Bimodal extended-release capsule (50% IR beads / 50% enteric-coated delayed-release beads)',
    controlled: true,
    fdaAge: 'FDA-approved for pediatric patients (ages 6+) and adults with ADHD.',
    mechanism:
      'D-threo-enantiomer of racemic methylphenidate (the primary pharmacologically active isomer). Selectively inhibits presynaptic DAT and NET reuptake with approximately twice the potency by weight of racemic methylphenidate.',
    coverage: 'Approximately 10–12 hours of bimodal daytime coverage.',
    startingPoint:
      '5 mg once daily in the morning for pediatric patients new to methylphenidate (or 10 mg for adults), titrated weekly up to a maximum of 30 mg/day (pediatric) or 40 mg/day (adults).',
    adjustment:
      'Individualized titration; dexmethylphenidate requires approximately half the milligram dose of racemic methylphenidate products.',
    usefulWhen: [
      'an isolated active d-enantiomer is preferred over racemic methylphenidate',
      'swallowing whole pills is difficult (capsule can be opened and sprinkled on applesauce)',
      'long daytime coverage with bimodal release is needed',
    ],
    advantages: [
      'contains only the active d-enantiomer',
      'capsule can be opened and sprinkled onto cold soft food',
      'once-daily morning administration',
    ],
    limitations: [
      'not milligram-for-milligram equivalent to racemic methylphenidate (requires half the dose)',
      'may suppress appetite or sleep',
      'Schedule II controlled substance',
    ],
    commonEffects: ['decreased appetite', 'insomnia', 'headache', 'abdominal pain', 'anxiety'],
    safety:
      'Do not crush, chew, or heat capsule beads. Screen for cardiac structural abnormalities, psychiatric history, and monitor vitals and growth.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Class-wide stimulant warning.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (fatal hypertensive crisis risk)',
      'Known hypersensitivity to dexmethylphenidate, methylphenidate, or formulation components',
      'Angle-closure (narrow-angle) glaucoma',
      'Structural cardiac abnormalities, advanced arteriosclerosis, severe arrhythmias, or moderate-to-severe hypertension',
      'Untreated hyperthyroidism',
      'Marked anxiety, motor agitation, or tension',
    ],
    color: '#5b8e83',
  },
  {
    id: 'daytrana',
    brand: 'Daytrana',
    generic: 'methylphenidate transdermal system',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Transdermal adhesive patch',
    controlled: true,
    fdaAge: 'FDA-approved for pediatric and adolescent ADHD (ages 6–17).',
    mechanism:
      'Transdermal delivery of racemic methylphenidate directly into systemic circulation; competitively inhibits presynaptic DAT and NET reuptake transporters, bypassing first-pass hepatic metabolism.',
    coverage:
      'Up to 9–12 hours when patch is worn for the recommended 9 hours; duration can be adjusted by peeling the patch off earlier.',
    startingPoint:
      '10 mg patch (applied to alternating hips daily for up to 9 hours), titrated weekly to 15 mg, 20 mg, or 30 mg patch strengths.',
    adjustment:
      'Prescribers can modify both patch dose and wear duration. Therapeutic effects typically persist 2–3 hours following patch removal.',
    usefulWhen: [
      'swallowing pills is difficult or refused',
      'wear time needs to be adjustable to shape daily duration',
      'gastrointestinal absorption of oral stimulants is irregular',
    ],
    advantages: ['non-oral option', 'wear time can be tailored to individual schedule', 'bypasses first-pass liver metabolism'],
    limitations: [
      'application-site erythema and contact dermatitis',
      'risk of chemical leukoderma (permanent loss of skin pigmentation)',
      'external heat exposure (fever, heating pads) drastically accelerates drug absorption',
    ],
    commonEffects: ['application-site redness or itching', 'decreased appetite', 'insomnia', 'headache', 'nausea'],
    safety:
      'Rotate patch application sites daily across alternating hips. Never apply external heat (heating pads, electric blankets). Avoid touching adhesive and fold patch before disposal.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High risk of abuse, misuse, addiction, and diversion. Patch labeling also includes a dedicated warning for chemical leukoderma (permanent skin depigmentation).',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (hypertensive crisis risk)',
      'Known hypersensitivity to methylphenidate or acrylic patch adhesives',
      'Angle-closure (narrow-angle) glaucoma',
      'Pre-existing structural cardiac disease, serious arrhythmias, or severe hypertension',
      'Untreated hyperthyroidism',
    ],
    color: '#698f86',
  },
  {
    id: 'adderall-ir',
    brand: 'Adderall IR',
    generic: 'mixed amphetamine salts immediate release',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Immediate-release scored tablet (3:1 ratio of dextro- to levo-amphetamine salts)',
    controlled: true,
    fdaAge: 'FDA-approved for pediatric ADHD (ages 3+) and adults with ADHD.',
    mechanism:
      'Dual-action catecholamine releaser and reuptake inhibitor: competitively inhibits DAT and NET; enters presynaptic terminals via diffusion and DAT/NET; reverses vesicular monoamine transporter 2 (VMAT2) to release stored dopamine/norepinephrine into the cytoplasm; activates trace amine-associated receptor 1 (TAAR1); and reverses DAT/NET to actively pump dopamine and norepinephrine into the synaptic cleft.',
    coverage: 'Typically 4–6 hours of coverage per dose; often requires 2 to 3 doses daily.',
    startingPoint:
      'For children ages 6+: 5 mg once or twice daily, titrated in 5 mg weekly increments up to 40 mg/day (rarely 60 mg/day). First dose upon waking; second dose 4–6 hours later.',
    adjustment:
      'Short-acting amphetamine is titrated gradually in small steps. Later-day doses should be timed carefully to avoid interfering with nocturnal sleep.',
    usefulWhen: [
      'fast-acting symptom relief is required',
      'flexible scheduling or late-afternoon booster coverage is needed',
      'a patient did not achieve adequate response on methylphenidate',
    ],
    advantages: [
      'dual release and reuptake mechanism produces potent symptom reduction',
      'fast onset (30–45 minutes)',
      'scored tablets allow precise dose adjustments',
    ],
    limitations: [
      'short duration requires multiple daily doses',
      'higher potential for afternoon rebound and irritability',
      'Schedule II controlled substance with misuse and diversion liability',
    ],
    commonEffects: [
      'decreased appetite',
      'insomnia',
      'dry mouth',
      'headache',
      'elevated heart rate and blood pressure',
      'nervousness',
    ],
    safety:
      'Cardiovascular monitoring (baseline and ongoing blood pressure and heart rate), pediatric growth tracking, and psychiatric assessment. Secure storage is mandatory.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Evaluate risk prior to prescribing, monitor signs of misuse and diversion, and educate on safe storage.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (risk of severe, potentially fatal hypertensive crisis, hyperpyrexia, and convulsions)',
      'Advanced arteriosclerosis, symptomatic cardiovascular disease, moderate to severe hypertension, or structural cardiac abnormalities',
      'Untreated hyperthyroidism',
      'Known hypersensitivity or idiosyncrasy to sympathomimetic amines',
      'Angle-closure (narrow-angle) glaucoma',
      'Agitated states or active substance use disorder',
    ],
    color: '#4e72a2',
  },
  {
    id: 'adderall-xr',
    brand: 'Adderall XR',
    generic: 'mixed amphetamine salts extended release',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Extended-release capsule (50% immediate-release beads / 50% delayed-release enteric-coated beads)',
    controlled: true,
    fdaAge: 'FDA-approved for children (ages 6–12), adolescents (ages 13–17), and adults with ADHD.',
    mechanism:
      'Dual-action catecholamine releaser and reuptake inhibitor (DAT/NET blockade, VMAT2 vesicular release, and TAAR1-mediated transporter reversal) delivered via a 2-stage bead formulation providing immediate release followed by delayed release approximately 4 hours later.',
    coverage: 'Approximately 10–12 hours of dual-peak daytime coverage.',
    startingPoint:
      '10 mg once daily in the morning for pediatric patients (or 20 mg for adults), titrated weekly by 5–10 mg up to a maximum recommended dose of 30 mg/day.',
    adjustment:
      'Morning titration in 5–10 mg steps while tracking clinical benefit, appetite, sleep, mood, pulse, blood pressure, and misuse risk.',
    usefulWhen: [
      'full-day amphetamine coverage is needed from a single morning capsule',
      'swallowing pills is challenging (capsule can be opened and sprinkled on applesauce)',
      'previous methylphenidate trials were ineffective or poorly tolerated',
    ],
    advantages: [
      'single morning dose covers school/workday',
      'capsule can be opened and sprinkled onto cold food without altering kinetics',
      'established clinical efficacy profile',
    ],
    limitations: [
      'potential late-day appetite suppression and insomnia',
      'cardiovascular elevation (pulse and BP)',
      'Schedule II controlled substance',
    ],
    commonEffects: ['decreased appetite', 'insomnia', 'dry mouth', 'headache', 'abdominal pain', 'weight loss'],
    safety:
      'Do not crush, chew, or heat capsule beads. Measure baseline and follow-up cardiovascular parameters and pediatric growth.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Standardized class warning across all prescription stimulants.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (risk of severe, potentially fatal hypertensive crisis)',
      'Advanced arteriosclerosis, symptomatic cardiovascular disease, structural cardiac abnormalities, cardiomyopathy, or moderate-to-severe hypertension',
      'Untreated hyperthyroidism',
      'Known hypersensitivity or idiosyncrasy to sympathomimetic amines',
      'Angle-closure (narrow-angle) glaucoma',
      'Agitated states or active substance use disorder',
    ],
    color: '#5576a3',
  },
  {
    id: 'vyvanse',
    brand: 'Vyvanse',
    generic: 'lisdexamfetamine dimesylate',
    pathway: 'Stimulant',
    family: 'Amphetamine family',
    form: 'Oral capsule or chewable tablet (inactive prodrug)',
    controlled: true,
    fdaAge: 'FDA-approved for pediatric patients (ages 6+), adolescents, and adults with ADHD.',
    mechanism:
      'Therapeutically inactive prodrug; after oral absorption, lisdexamfetamine is converted via rate-limited enzymatic hydrolysis by red blood cells into l-lysine and active dextroamphetamine. Active dextroamphetamine provides dual-action DAT/NET reuptake inhibition, VMAT2 inhibition, and TAAR1-mediated reverse transport of dopamine and norepinephrine.',
    coverage: 'Approximately 12–14 hours of smooth, continuous daytime coverage.',
    startingPoint:
      '30 mg once daily in the morning for patients age 6 and older; titrated in 10–20 mg weekly increments to a maximum of 70 mg/day.',
    adjustment:
      'Titration occurs weekly based on clinical efficacy and tolerability. The rate of red-blood-cell enzymatic cleavage provides consistent pharmacokinetic exposure without sudden peaks.',
    usefulWhen: [
      'consistent, smooth 12–14 hour coverage is needed',
      'lowered peak-related jitteriness or abrupt wear-off is desired',
      'capsule opening or chewable tablet formulation is preferred',
      'reducing non-oral abuse liability is prioritized',
    ],
    advantages: [
      'smooth pharmacokinetic release profile without multiple peaks',
      'capsule contents can be dissolved completely in water, yogurt, or orange juice',
      'chewable tablet formulation available',
      'inactive prodrug limits abuse via nasal or intravenous routes',
    ],
    limitations: [
      'longer duration of action can cause sleep onset delay if taken late in morning',
      'appetite and weight suppression',
      'Schedule II controlled substance',
    ],
    commonEffects: ['decreased appetite', 'insomnia', 'dry mouth', 'headache', 'irritability or anxiety', 'elevated heart rate'],
    safety:
      'Must be taken in the morning to avoid insomnia. Screen cardiovascular history and monitor vitals, pediatric height/weight, and psychiatric symptoms.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Evaluate risk prior to prescribing.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (risk of fatal hypertensive crisis and serotonin syndrome)',
      'Known hypersensitivity or idiosyncrasy to sympathomimetic amines or formulation ingredients',
      'Advanced arteriosclerosis, symptomatic cardiovascular disease, structural cardiac abnormalities, severe arrhythmias, moderate-to-severe hypertension',
      'Untreated hyperthyroidism',
      'Angle-closure (narrow-angle) glaucoma',
      'Agitated states',
    ],
    color: '#5b6f96',
  },
  {
    id: 'jornay-pm',
    brand: 'Jornay PM',
    generic: 'methylphenidate delayed/extended release',
    pathway: 'Stimulant',
    family: 'Methylphenidate family',
    form: 'Evening-dosed delayed-release and extended-release capsule (Delexis delivery system)',
    controlled: true,
    fdaAge: 'FDA-approved for pediatric patients (ages 6+) and adults with ADHD (FDA approval August 2018).',
    mechanism:
      'Dual-layer Delexis micro-bead technology: outer delayed-release coating delays initial drug release by 8–10 hours, while inner extended-release coating sustains methylphenidate release throughout the following day. Acts via selective DAT and NET reuptake inhibition.',
    coverage:
      'Taken in the evening (between 6:30 PM and 9:30 PM); therapeutic release begins the following morning and extends through the evening.',
    startingPoint:
      'Initial U.S. labeling recommends 20 mg once daily in the evening at 8:00 PM. Titrated weekly in 20 mg increments (maximum 100 mg/day) to balance morning onset and daytime duration.',
    adjustment:
      'Both the dosage and the evening administration time (between 6:30 PM and 9:30 PM) can be adjusted to optimize symptom control upon waking and throughout the day.',
    usefulWhen: [
      'early-morning functional impairment and school/work preparation are severe',
      'taking a morning pill reliably is a major barrier',
      'methylphenidate is otherwise effective',
    ],
    advantages: [
      'active right upon waking before morning routines begin',
      'avoids the morning struggle of taking medication',
      'capsule can be opened and sprinkled on applesauce immediately before swallowing',
    ],
    limitations: [
      'evening dosing requires strict timing consistency',
      'may affect sleep architecture or cause evening insomnia if dosed inappropriately',
      'cannot be substituted milligram-for-milligram with other methylphenidates',
    ],
    commonEffects: ['decreased appetite', 'insomnia', 'headache', 'mood changes or irritability', 'nausea'],
    safety:
      'Must be taken consistently in the evening. Adjust timing only in consultation with the prescriber. Monitor blood pressure, pulse, growth, and psychiatric symptoms.',
    boxedWarning:
      'FDA Universal Boxed Warning (updated May 2023): High potential for abuse, misuse, and addiction, which can lead to overdose and death. Universal class warning across all prescription stimulants.',
    contraindications: [
      'Concurrent use of MAOIs or within 14 days of discontinuation (hypertensive crisis risk)',
      'Known hypersensitivity to methylphenidate or capsule components',
      'Angle-closure (narrow-angle) glaucoma',
      'Structural cardiac abnormalities, cardiomyopathy, serious arrhythmias, coronary artery disease, or moderate-to-severe hypertension',
      'Untreated hyperthyroidism',
    ],
    color: '#6c8b79',
  },
  {
    id: 'atomoxetine',
    brand: 'Strattera / atomoxetine',
    generic: 'atomoxetine hydrochloride',
    pathway: 'Nonstimulant',
    family: 'Selective norepinephrine reuptake inhibitor (NRI)',
    form: 'Daily oral capsule',
    controlled: false,
    fdaAge: 'FDA-approved for children (ages 6+), adolescents, and adults with ADHD.',
    mechanism:
      'Potent and selective inhibitor of the presynaptic norepinephrine transporter (NET). In the prefrontal cortex, where dopamine transporters (DAT) are sparse, NET clears both norepinephrine and dopamine; atomoxetine selectively elevates both catecholamines in the prefrontal cortex without increasing dopamine in the nucleus accumbens, preventing abuse liability.',
    coverage: 'Continuous 24-hour therapeutic coverage once steady-state is achieved after 4–8 weeks of daily administration.',
    startingPoint:
      'Weight-based for patients under 70 kg (initial 0.5 mg/kg/day, titrated after ≥ 3 days to target 1.2 mg/kg/day, max 1.4 mg/kg/day). Fixed dose for patients 70 kg and above (initial 40 mg/day, titrated after ≥ 3 days to target 80 mg/day, max 100 mg/day).',
    adjustment:
      'Therapeutic benefit builds gradually over 4–8 weeks. Efficacy cannot be judged after a few days. Metabolized by CYP2D6; poor metabolizers or co-administration with strong CYP2D6 inhibitors (fluoxetine, paroxetine, bupropion) significantly increases drug exposure.',
    usefulWhen: [
      'stimulants are ineffective, contraindicated, or poorly tolerated',
      'co-occurring anxiety, depression, or tics are present',
      'a non-controlled substance is preferred or substance misuse history exists',
      'continuous 24-hour symptom coverage including early morning/evening is needed',
    ],
    advantages: [
      'not a controlled substance (no federal Schedule, no refill restrictions)',
      'continuous 24-hour symptom coverage without wear-off or rebound',
      'does not exacerbate tics and may improve comorbid anxiety',
    ],
    limitations: [
      'delayed onset of therapeutic effect (requires 4 to 8 weeks)',
      'capsule contains an ocular irritant and must be swallowed whole—cannot be opened or sprinkled',
      'CYP2D6 drug interactions',
      'rare reports of severe idiosyncratic liver injury',
    ],
    commonEffects: [
      'fatigue or somnolence',
      'nausea, vomiting, or abdominal pain',
      'decreased appetite',
      'dry mouth',
      'dizziness',
      'mild increase in heart rate and blood pressure',
      'erectile or urinary dysfunction in adults',
    ],
    safety:
      'Monitor for clinical worsening and suicidality. Perform periodic liver function monitoring if jaundice or clinical signs appear. Swallow capsule whole.',
    boxedWarning:
      'FDA Boxed Warning: Increased risk of suicidal ideation in children and adolescents. Families and caregivers must monitor closely for emergence of suicidal thoughts, worsening depression, agitation, or unusual behavioral changes.',
    contraindications: [
      'Concomitant use of monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuation (risk of hyperthermia, rigidity, autonomic instability, and fatal hypertensive crisis)',
      'Angle-closure (narrow-angle) glaucoma',
      'Pheochromocytoma or history of pheochromocytoma (risk of severe, uncontrolled blood pressure elevation)',
      'Severe cardiovascular disease, advanced arteriosclerosis, severe heart failure, structural cardiac disease, or moderate-to-severe hypertension',
      'Known hypersensitivity to atomoxetine or product excipients',
    ],
    color: '#925e76',
  },
  {
    id: 'qelbree',
    brand: 'Qelbree',
    generic: 'viloxazine extended release',
    pathway: 'Nonstimulant',
    family: 'Selective norepinephrine reuptake inhibitor (NRI) with serotonergic modulation',
    form: 'Once-daily extended-release capsule',
    controlled: false,
    fdaAge: 'FDA-approved for pediatric patients (ages 6–17, approved April 2021) and adults (ages 18+, approved April 2022).',
    mechanism:
      'Selective norepinephrine reuptake inhibitor (NRI) that also exerts antagonist activity at serotonin 5-HT2B receptors and agonist activity at 5-HT2C receptors; increases prefrontal levels of norepinephrine and dopamine.',
    coverage:
      'Steady 24-hour coverage with once-daily morning or evening administration; clinical response typically emerges over 2–6 weeks.',
    startingPoint:
      'Ages 6–11: 100 mg once daily, titrated weekly by 100 mg (max 400 mg/day). Adolescents (12–17) and adults: 200 mg once daily, titrated weekly by 200 mg (max 400 mg/day in youth, 600 mg/day in adults).',
    adjustment:
      'Titrated weekly based on clinical response and tolerability. Dose reductions required in severe renal impairment.',
    usefulWhen: [
      'a non-controlled once-daily medication is wanted for pediatric or adult ADHD',
      'stimulant treatment is unsuitable or poorly tolerated',
      'swallowing difficulties exist (capsules can be opened and sprinkled on applesauce or pudding)',
    ],
    advantages: [
      'not a controlled substance',
      'FDA-approved across the lifespan (ages 6 through adults)',
      'capsule can be opened and sprinkled onto applesauce or pudding',
      'faster nonstimulant onset than atomoxetine in clinical trials (benefits observed at weeks 1–2)',
    ],
    limitations: [
      'strong CYP1A2 inhibitor causing critical drug-drug contraindications',
      'slower full therapeutic onset than stimulants',
      'can cause somnolence or insomnia',
      'requires careful dose titration',
    ],
    commonEffects: [
      'somnolence or fatigue',
      'decreased appetite',
      'nausea or vomiting',
      'insomnia',
      'irritability',
      'mild increases in heart rate and blood pressure',
    ],
    safety:
      'Strong CYP1A2 inhibitor: strictly contraindicated with theophylline and tizanidine. Limit caffeine intake (viloxazine significantly increases caffeine plasma levels). Monitor pulse, blood pressure, and mood.',
    boxedWarning:
      'FDA Boxed Warning: Increased risk of suicidal thoughts and behaviors in pediatric and adult patients. Monitor for suicidal thoughts, emergent depression, or clinical worsening.',
    contraindications: [
      'Concomitant administration with sensitive CYP1A2 substrates or CYP1A2 substrates with a narrow therapeutic range (STRICTLY CONTRAINDICATED with theophylline and tizanidine; causes dramatic drug accumulation and severe toxicity)',
      'Concomitant use of monoamine oxidase inhibitors (MAOIs) or within 14 days of discontinuing an MAOI (fatal hypertensive crisis and serotonin syndrome risk)',
      'Known hypersensitivity to viloxazine or capsule ingredients',
    ],
    color: '#8c6680',
  },
  {
    id: 'guanfacine-er',
    brand: 'Intuniv / guanfacine ER',
    generic: 'guanfacine extended release',
    pathway: 'Alpha-2 agonist',
    family: 'Selective postsynaptic alpha-2A adrenergic receptor agonist',
    form: 'Once-daily extended-release tablet',
    controlled: false,
    fdaAge: 'FDA-approved exclusively for pediatric patients ages 6–17 years (as monotherapy and adjunctive to stimulants). Prescribing for adults (18+) is clinical off-label.',
    mechanism:
      'Selectively stimulates postsynaptic alpha-2A adrenergic receptors in the prefrontal cortex; inhibits cAMP production and closes HCN ion channels, strengthening prefrontal network connectivity, working-memory representations, and impulse regulation without directly stimulating dopamine pathways.',
    coverage:
      'Continuous 24-hour coverage with once-daily morning or evening dosing; full therapeutic effect emerges over 2–4 weeks.',
    startingPoint:
      '1 mg once daily, titrated in 1 mg/day weekly increments based on weight and response to a target range of 0.05–0.12 mg/kg/day (maximum 4 mg/day for ages 6–12, 7 mg/day for ages 13–17).',
    adjustment:
      'Adjusted in weekly steps while monitoring blood pressure, pulse, somnolence, and clinical benefit. Not interchangeable milligram-for-milligram with immediate-release guanfacine.',
    usefulWhen: [
      'prominent hyperactivity, impulsivity, emotional dysregulation, or aggression',
      'comorbid chronic tics or Tourette syndrome',
      'co-occurring bedtime sleep disturbances',
      'adjunctive add-on to augment daytime stimulant therapy',
    ],
    advantages: [
      'not a controlled substance',
      'FDA-approved as both monotherapy and adjunctive therapy to stimulants',
      'reduces tics and emotional volatility',
      'improves evening rebound and sleep latency',
    ],
    limitations: [
      'FDA approval is pediatric only (ages 6–17); adult use is off-label',
      'significant somnolence and sedation',
      'can cause marked hypotension, bradycardia, or syncope',
      'tablets must be swallowed whole with fluids—do not crush or chew',
      'must be tapered gradually to avoid rebound hypertension',
    ],
    commonEffects: [
      'somnolence and sedation',
      'fatigue',
      'dizziness and orthostasis',
      'hypotension and bradycardia',
      'dry mouth',
      'headache',
      'abdominal discomfort',
    ],
    safety:
      'CRITICAL WARNING: NEVER STOP ABRUPTLY. Sudden discontinuation can precipitate severe rebound hypertension, tachycardia, and hypertensive encephalopathy. Taper by no more than 1 mg every 3–7 days. Do not administer with high-fat meals (significantly increases absorption). Dose adjustment needed with strong CYP3A4 inhibitors/inducers.',
    contraindications: [
      'Known hypersensitivity to guanfacine or formulation excipients',
      'Severe preexisting sinus node dysfunction, significant bradycardia, or second/third-degree heart block (without a functioning pacemaker)',
      'Severe preexisting hypotension or history of recurrent syncope without cardiologist clearance',
      'MANDATORY REBOUND WARNING: Abrupt discontinuation is contraindicated. Must be tapered in gradual increments under clinical supervision.',
    ],
    color: '#9a7648',
  },
  {
    id: 'clonidine-er',
    brand: 'Kapvay / clonidine ER',
    generic: 'clonidine hydrochloride extended release',
    pathway: 'Alpha-2 agonist',
    family: 'Centrally acting alpha-2 adrenergic receptor agonist (alpha-2A, 2B, and 2C)',
    form: 'Extended-release tablet, typically administered twice daily (morning and bedtime)',
    controlled: false,
    fdaAge: 'FDA-approved exclusively for pediatric patients ages 6–17 years (as monotherapy and adjunctive to stimulants). Prescribing for adults (18+) is clinical off-label.',
    mechanism:
      'Non-selective central alpha-2 adrenergic agonist (stimulating alpha-2A, alpha-2B, and alpha-2C receptors in the nucleus tractus solitarius and locus coeruleus); reduces sympathetic outflow, lowers peripheral vascular resistance, and modulates prefrontal arousal networks.',
    coverage:
      'Continuous 12–24 hour coverage; after titration, total daily dosage is divided twice daily with the larger portion given at bedtime.',
    startingPoint:
      '0.1 mg once daily at bedtime; titrated weekly in 0.1 mg/day increments up to a maximum recommended dose of 0.4 mg/day (divided twice daily: 0.2 mg AM and 0.2 mg at bedtime).',
    adjustment:
      'Titration guided by blood pressure, heart rate, and daytime somnolence. Cannot be substituted milligram-for-milligram with immediate-release clonidine or transdermal clonidine.',
    usefulWhen: [
      'severe bedtime sleep disruption and hyperarousal are prominent',
      'comorbid tic disorders or severe behavioral dysregulation',
      'adjunctive therapy to smooth out late-day stimulant rebound and promote sleep',
    ],
    advantages: [
      'not a controlled substance',
      'FDA-approved as monotherapy and adjunctive therapy in youth',
      'effective for severe bedtime sleep latency problems and co-occurring tics',
      'bedtime-weighted dosing aligns with natural sleep-wake cycles',
    ],
    limitations: [
      'FDA approval is pediatric only (ages 6–17); adult use is off-label',
      'more sedating than guanfacine due to broader alpha-2B/2C activity',
      'requires twice-daily dosing after titration',
      'tablets must be swallowed whole—cannot be crushed, chewed, or divided',
      'mandatory slow taper required to prevent rebound hypertension',
    ],
    commonEffects: [
      'somnolence and sedation (very common)',
      'fatigue and lethargy',
      'dizziness and lightheadedness',
      'dry mouth',
      'hypotension and bradycardia',
      'constipation',
    ],
    safety:
      'CRITICAL WARNING: NEVER DISCONTINUE ABRUPTLY. Abrupt cessation can cause severe sympathetic rebound hypertension, tachycardia, tremors, and agitation. When stopping, taper dose by no more than 0.1 mg every 3 to 7 days. Monitor blood pressure and pulse at baseline and regular intervals.',
    contraindications: [
      'Known hypersensitivity to clonidine or product ingredients',
      'Severe preexisting bradycardia, sinus node disease, or advanced atrioventricular (AV) block',
      'Severe hypotension or autonomic instability',
      'MANDATORY REBOUND WARNING: Abrupt discontinuation is contraindicated. Discontinuation requires a gradual supervised taper.',
    ],
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
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                style={{ backgroundColor: `${medication.color}18`, color: medication.color }}
              >
                {medication.pathway}
              </span>
              <span className="rounded-full bg-warm-cream px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {medication.family}
              </span>
              <span className="rounded-full bg-warm-cream px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {medication.controlled ? 'Schedule II Controlled' : 'Non-controlled'}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">{medication.brand}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{medication.generic}</p>
            <p className="mt-2 text-xs font-semibold text-sage-green">{medication.fdaAge}</p>
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
              {/* Mechanism of Action */}
              <div className="rounded-xl border border-sage-green/15 bg-warm-cream/50 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <BrainCircuit className="h-4 w-4 text-sage-green" /> Pharmacodynamic Mechanism
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.mechanism}</p>
              </div>

              {/* Boxed Warning (if applicable) */}
              {medication.boxedWarning && (
                <div className="rounded-xl border border-amber-600/30 bg-amber-500/[0.08] p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-700" /> FDA Boxed Warning
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-amber-950 font-medium">{medication.boxedWarning}</p>
                </div>
              )}

              {/* Strict Contraindications & Dangerous Interactions */}
              <div className="rounded-xl border border-red-500/25 bg-red-500/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-red-900">
                  <ShieldAlert className="h-4 w-4 text-red-700" /> Strict Contraindications & Critical Interactions
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {medication.contraindications.map((item) => (
                    <li key={item} className="flex gap-2 text-xs leading-relaxed text-red-950">
                      <span className="font-bold text-red-600 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-sage-green/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-sage-green">
                    <Gauge className="h-4 w-4" /> Starting Information
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.startingPoint}</p>
                </div>
                <div className="rounded-xl border border-sage-green/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-sage-green">
                    <Sparkles className="h-4 w-4" /> How It Is Adjusted
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{medication.adjustment}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#4e72a2]">Often considered when</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {medication.usefulWhen.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#4e72a2]/[0.08] px-3 py-2 text-xs leading-relaxed text-foreground"
                    >
                      {item}
                    </span>
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
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8f5541]">Prescribing & Safety Notes</p>
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
      const textMatch =
        !normalized ||
        [medication.brand, medication.generic, medication.family, medication.form, medication.mechanism]
          .join(' ')
          .toLowerCase()
          .includes(normalized);
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
            placeholder="Search a brand, generic name, family, form, or mechanism"
            className="w-full rounded-xl border border-sage-green/20 bg-warm-cream/45 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sage-green focus:ring-2 focus:ring-sage-green/15"
          />
        </label>
        <p className="text-xs text-muted-foreground">
          {visible.length} medication {visible.length === 1 ? 'card' : 'cards'}
        </p>
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
          No medication card matches that search. Try a generic name such as methylphenidate, amphetamine, atomoxetine, viloxazine, guanfacine, or clonidine.
        </div>
      )}

      <div className="mt-7 flex gap-3 rounded-xl border border-[#a96952]/20 bg-[#a96952]/[0.06] p-5">
        <Pill className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
        <p className="text-sm leading-relaxed text-foreground">
          Starting and mechanism information is included for clinical education—not to prescribe or direct self-treatment. Product labels, indications, approved ages, contraindications, and availability change. A qualified medical prescriber must evaluate, select, start, combine, taper, and monitor all psychiatric medications.
        </p>
      </div>
    </div>
  );
}
