import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  Printer,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

type ScenarioKey = 'high_combined' | 'moderate_inattentive' | 'low_subthreshold';

interface ScenarioData {
  key: ScenarioKey;
  label: string;
  badge: string;
  badgeColor: string;
  likelihood: 'High Likelihood' | 'Moderate Likelihood' | 'Low Likelihood';
  likelihoodSubtext: string;
  inattentionCount: number;
  hyperactiveCount: number;
  settingsCount: number;
  childhoodOnset: 'Confirmed before age 12' | 'Possible / Unsure' | 'No recalled onset';
  overallImpact: 'Severe everyday interference' | 'Noticeable everyday interference' | 'Minimal interference';
  headline: string;
  neuroExplanation: string;
  everydayManifestation: string[];
  clinicalSuggestion: string;
  differentialCautions: string[];
}

const SCENARIOS: Record<ScenarioKey, ScenarioData> = {
  high_combined: {
    key: 'high_combined',
    label: 'Scenario A: High Likelihood (Combined ADHD)',
    badge: 'Strong Symptom Match · Likely ADHD Indication',
    badgeColor: '#2e7d32', // Rich clinical green
    likelihood: 'High Likelihood',
    likelihoodSubtext: 'Substantially exceeds DSM-5-TR adult clinical thresholds in both attention and restlessness domains.',
    inattentionCount: 7,
    hyperactiveCount: 6,
    settingsCount: 3,
    childhoodOnset: 'Confirmed before age 12',
    overallImpact: 'Severe everyday interference',
    headline: 'Your responses strongly align with the clinical profile of Combined Presentation ADHD.',
    neuroExplanation:
      'You met statutory frequency thresholds on 7 of 9 Inattention symptoms and 6 of 9 Hyperactivity/Impulsivity symptoms. For adults, DSM-5-TR requires at least 5 symptoms in either domain. Your answers indicate substantial differences in frontostriatal dopamine regulation and executive control circuits, making spontaneous task initiation, sustained focus, and physical/mental stillness significantly harder to maintain.',
    everydayManifestation: [
      'Frequent task paralysis on non-urgent obligations despite high genuine intention to finish.',
      'Time blindness: chronically misjudging duration and relying on adrenaline deadlines to start.',
      'Internal motor or cognitive restlessness: racing thoughts, fidgeting, or rapid topic jumping.',
      'Working memory drops: forgetting verbal instructions, misplaced daily items, or zoning out mid-conversation.',
    ],
    clinicalSuggestion:
      'We strongly recommend scheduling an appointment with a licensed psychiatrist or clinical psychologist for a formal evaluation. This screener provides compelling documentation to bring to your clinical consultation.',
    differentialCautions: [
      'ADHD cannot be diagnosed from an online screener alone. A comprehensive clinical interview is required.',
      'Clinicians must evaluate developmental history, symptom onset before age 12, and rule out lookalikes such as chronic sleep apnea, burnout, generalized anxiety, or thyroid irregularities.',
    ],
  },
  moderate_inattentive: {
    key: 'moderate_inattentive',
    label: 'Scenario B: Moderate Likelihood (Inattentive with Masking)',
    badge: 'Moderate Match · Inattentive / Masking Profile',
    badgeColor: '#b45309', // Warm clinical amber
    likelihood: 'Moderate Likelihood',
    likelihoodSubtext: 'Meets adult Inattentive threshold with lower physical restlessness, characteristic of high masking.',
    inattentionCount: 5,
    hyperactiveCount: 2,
    settingsCount: 2,
    childhoodOnset: 'Possible / Unsure',
    overallImpact: 'Noticeable everyday interference',
    headline: 'Your responses reflect a notable Inattentive profile with potential high-effort compensation.',
    neuroExplanation:
      'You met statutory frequency thresholds on 5 of 9 Inattention symptoms and 2 of 9 Hyperactivity symptoms. In adults, meeting 5+ inattentive items is consistent with Predominantly Inattentive ADHD. Many adults—particularly women and high-achieving professionals—mask hyperactivity as internal mental anxiety or intense perfectionism, compensating until adult demands exceed cognitive scaffolding.',
    everydayManifestation: [
      'Mental exhaustion from exerting massive extra willpower to keep up with routine paperwork and tasks.',
      'Inattentive drift: reading the same paragraph 3 times or losing track of instructions during meetings.',
      'Task avoidance: putting off administrative tasks because of overwhelming friction to start.',
      'Perfectionistic overcompensation: double-checking compulsively to avoid making careless errors.',
    ],
    clinicalSuggestion:
      'A formal clinical evaluation is warranted to explore whether your executive friction reflects Inattentive ADHD, secondary anxiety/depression, or chronic cognitive burnout.',
    differentialCautions: [
      'Inattentive symptoms overlap heavily with chronic sleep deprivation, thyroid conditions, and high-functioning anxiety.',
      'A thorough developmental history will investigate whether subtle compensation masked these challenges throughout childhood.',
    ],
  },
  low_subthreshold: {
    key: 'low_subthreshold',
    label: 'Scenario C: Low Likelihood (Subthreshold Symptoms)',
    badge: 'Low Match · Subthreshold Indication',
    badgeColor: '#475569', // Slate
    likelihood: 'Low Likelihood',
    likelihoodSubtext: 'Reported symptoms are below the statutory diagnostic frequency threshold for adult ADHD.',
    inattentionCount: 2,
    hyperactiveCount: 1,
    settingsCount: 1,
    childhoodOnset: 'No recalled onset',
    overallImpact: 'Minimal interference',
    headline: 'Your responses indicate mild, subthreshold difficulties that do not strongly point to ADHD.',
    neuroExplanation:
      'You met frequency thresholds on only 2 of 9 Inattention symptoms and 1 of 9 Hyperactivity symptoms. Standard DSM-5-TR criteria require at least 5 persistent symptoms for an adult diagnosis. While occasional forgetfulness, fatigue, and distraction are universal human experiences, your pattern does not suggest the pervasive, lifelong neurodevelopmental impairment characteristic of ADHD.',
    everydayManifestation: [
      'Occasional difficulty focusing during tedious or uninteresting tasks (common neurotypical fatigue).',
      'Situational procrastination that responds to ordinary time-management tools and scheduling.',
      'Periodic restlessness driven by stress, lack of sleep, or excessive screen time rather than baseline neuroanatomy.',
    ],
    clinicalSuggestion:
      'While ADHD appears less likely from this screener, if attention or fatigue is causing genuine distress in your life, discuss your sleep quality, stress levels, and emotional wellness with a primary care doctor.',
    differentialCautions: [
      'Subthreshold symptoms can still cause distress if you are experiencing acute burnout, grief, or major lifestyle changes.',
      'If your difficulties escalated recently rather than persisting since childhood, look into sleep studies, iron/vitamin deficiencies, and stress reduction.',
    ],
  },
};

export default function TestResultsPrototype() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioKey>('high_combined');
  const data = SCENARIOS[currentScenario];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-foreground py-8 px-4 sm:px-6">
      {/* Interactive Scenario Switcher Bar */}
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <div className="rounded-2xl border-2 border-sage-green/40 bg-warm-cream p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage-green text-white font-bold text-xs shadow-2xs">
                PRO
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sage-green">
                  Results Redesign Prototype Preview
                </p>
                <p className="text-xs text-foreground/80">
                  Select a test scenario to inspect how the enhanced likelihood indication, clinical benchmarks, and actionable suggestions appear in the actual site design:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => {
                const s = SCENARIOS[key];
                const active = currentScenario === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCurrentScenario(key)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
                      active
                        ? 'bg-sage-green text-white shadow-xs'
                        : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {s.label.split(':')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between text-sm print:hidden">
          <Link
            href="/chapter/getting-diagnosed"
            className="inline-flex items-center gap-2 font-semibold text-sage-green hover:underline text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Chapter 7 Overview
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-2xs"
            >
              <Printer className="h-3.5 w-3.5 text-sage-green" /> Print / Save PDF
            </button>
            <span className="text-muted-foreground text-xs font-mono uppercase tracking-wider hidden sm:inline">
              Self-Assessment Summary
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* CARD 1: PRIMARY CLINICAL LIKELIHOOD & SYMPTOM BENCHMARK (NEW)     */}
        {/* Replaces redundant echoed answers with clear, definitive meaning! */}
        {/* ================================================================== */}
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden bg-white rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9] space-y-6"
        >
          {/* Subtle background glow */}
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: data.badgeColor }}
            aria-hidden="true"
          />

          {/* Header row: Likelihood Tier & Age */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-2xs"
                style={{ backgroundColor: data.badgeColor }}
              >
                {data.likelihood === 'High Likelihood' ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : data.likelihood === 'Moderate Likelihood' ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
                {data.badge}
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Evaluated: Adult DSM-5-TR Standard
            </span>
          </div>

          {/* Clear Headline */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground leading-tight">
              {data.headline}
            </h1>
            <p className="mt-2 text-sm sm:text-base font-semibold leading-relaxed" style={{ color: data.badgeColor }}>
              {data.likelihoodSubtext}
            </p>
          </div>

          {/* DSM-5-TR Statutory Clinical Score Box */}
          <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/60 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/70 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-green flex items-center gap-1.5">
                <Target className="h-4 w-4" /> DSM-5-TR Adult Clinical Thresholds
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Adult Benchmark: ≥ 5 frequent symptoms
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5 p-3 rounded-xl bg-white border border-stone-200/80">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>Attention & Working Memory</span>
                  <span className={`font-mono text-sm ${data.inattentionCount >= 5 ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {data.inattentionCount} / 9 criteria met
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(data.inattentionCount / 9) * 100}%`,
                      backgroundColor: data.inattentionCount >= 5 ? '#2e7d32' : '#94a3b8',
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {data.inattentionCount >= 5
                    ? '✓ Exceeds adult statutory diagnostic threshold (≥ 5)'
                    : 'Below statutory threshold for inattentive presentation'}
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-white border border-stone-200/80">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>Restlessness & Impulsivity</span>
                  <span className={`font-mono text-sm ${data.hyperactiveCount >= 5 ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {data.hyperactiveCount} / 9 criteria met
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(data.hyperactiveCount / 9) * 100}%`,
                      backgroundColor: data.hyperactiveCount >= 5 ? '#2e7d32' : '#94a3b8',
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {data.hyperactiveCount >= 5
                    ? '✓ Exceeds adult statutory diagnostic threshold (≥ 5)'
                    : 'Below statutory threshold for hyperactive presentation'}
                </p>
              </div>
            </div>

            {/* Context & Persistence Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Independent Settings</p>
                <p className="font-bold text-foreground mt-0.5">{data.settingsCount} Life Domains</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Childhood Evidence</p>
                <p className="font-bold text-foreground mt-0.5">{data.childhoodOnset.split(' ')[0]} before 12</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center col-span-2 sm:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Functional Impact</p>
                <p className="font-bold text-foreground mt-0.5">{data.overallImpact.split(' ')[0]} Interference</p>
              </div>
            </div>
          </div>

          {/* Neurocognitive Meaning */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xl text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-sage-green" /> What this result actually indicates
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
              {data.neuroExplanation}
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Typical manifestations aligned with your answers:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-foreground/85">
                {data.everydayManifestation.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-sage-green font-bold shrink-0 mt-0.5">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Essential Non-Diagnostic Note & Clinical Suggestion */}
          <div className="rounded-2xl border-2 border-stone-200 bg-[#fffdf9] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-sage-green">
              <ShieldAlert className="h-5 w-5 text-[#b45309]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                Clinical Suggestion & Scope Limitation
              </h4>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
              {data.clinicalSuggestion}
            </p>

            <div className="border-t border-stone-200/70 pt-3 space-y-1.5 text-xs text-muted-foreground">
              <p className="font-bold text-stone-700">Important medical boundaries to keep in mind:</p>
              {data.differentialCautions.map((caution, idx) => (
                <p key={idx} className="leading-relaxed">
                  • {caution}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Doctor Discussion Packet CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-100">
            <div>
              <p className="text-sm font-bold text-foreground">Taking this to an appointment?</p>
              <p className="text-xs text-muted-foreground">
                Download a clean, organized 1-page clinician discussion summary formatted for clinical interviews.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sage-green px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md shrink-0 text-sm"
            >
              <FileCheck className="h-4 w-4" /> Download Clinician Packet
            </button>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* CARD 2: ACTIONABLE CLINICAL PREPARATION & RECOMMENDED GUIDES       */}
        {/* ================================================================== */}
        <div className="grid sm:grid-cols-3 gap-4 print:hidden">
          <Link
            href="/chapter/getting-diagnosed"
            className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                1
              </span>
              <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-sage-green transition-colors">
                How to Prepare for an Assessment
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                What clinicians ask, how to collect childhood school reports, and which questions to bring to your appointment.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-green group-hover:underline">
              Read Chapter 7 Guide <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href="/chapter/what-helps"
            className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                2
              </span>
              <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-sage-green transition-colors">
                What Actually Helps Today
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Evidence-based non-pharmacological tools: externalizing memory, body doubling, and low-friction task initiation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-green group-hover:underline">
              Read Chapter 5 Tools <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link
            href="/chapter/medication"
            className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                3
              </span>
              <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-sage-green transition-colors">
                ADHD Medication Guide
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Objective pharmacodynamics: methylphenidate vs amphetamines, atomoxetine, receptor mechanisms, and titration safely.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-green group-hover:underline">
              Read Chapter 6 Pharmacology <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {/* ================================================================== */}
        {/* CARD 3: CLINICIAN DISCUSSION AID / PRINT PACKET (PRINT OPTIMIZED)   */}
        {/* ================================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200/70 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-green">
                Doctor Discussion Aid
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-0.5">
                Itemized Summary for Your Healthcare Provider
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              ADHD Compass Screening Aid
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <p className="text-foreground/80 leading-relaxed">
              If you schedule a clinical evaluation, psychiatrists and psychologists appreciate organized data on symptom domains and real-world impairment. Below is a structured synopsis of your answers:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                <p className="font-bold text-foreground">Symptom Domains (DSM-5-TR)</p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Inattentive Domain:</strong> {data.inattentionCount} of 9 criteria reported at high clinical frequency (Often / Very Often).
                </p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Hyperactive/Impulsive Domain:</strong> {data.hyperactiveCount} of 9 criteria reported at high clinical frequency.
                </p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Adult Criteria Benchmark:</strong> Statutory diagnostic threshold requires ≥ 5 criteria in either domain.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                <p className="font-bold text-foreground">Contextual & Longitudinal Factors</p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Cross-Setting Impairment:</strong> Reported in {data.settingsCount} life settings (work/school, home, personal).
                </p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Onset Timeline:</strong> {data.childhoodOnset}.
                </p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  • <strong>Everyday Interference:</strong> {data.overallImpact}.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-muted-foreground leading-relaxed">
              <strong>Notice for Healthcare Professionals: </strong>
              This instrument is an educational patient screening aid based on standard DSM-5-TR adult symptom criteria. It does not replace a comprehensive neuropsychiatric assessment, developmental collateral interview, or differential medical workup.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
