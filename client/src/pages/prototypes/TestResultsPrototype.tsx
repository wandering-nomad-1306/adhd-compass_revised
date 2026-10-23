import { AnimatePresence, motion } from 'framer-motion';
import {
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
  // Traffic-light likelihood color coding: Red = High, Yellow/Amber = Moderate, Green = Low
  badge: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  color: string;
  likelihoodTitle: string;
  likelihoodSummary: string;
  // Answer summary (Replicating Image 3 with cleaner, better delivery)
  answerHeadline: string;
  primaryReportedSymptoms: string[];
  settingsSummary: string;
  impactSummary: string;
  childhoodSummary: string;
  // Non-diagnostic clinical suggestion
  doctorSuggestion: string;
}

const SCENARIOS: Record<ScenarioKey, ScenarioData> = {
  high_combined: {
    key: 'high_combined',
    label: 'Scenario A: High Chances (7 Inattentive, 6 Restless)',
    badge: 'High Likelihood · Strong Symptom Match',
    badgeBg: 'bg-red-50',
    badgeBorder: 'border-red-300',
    badgeText: 'text-red-700',
    color: '#dc2626', // Red
    likelihoodTitle: 'High chances that you have ADHD',
    likelihoodSummary:
      'Based on your answers, your daily experiences strongly match the patterns seen in ADHD (both attention difficulties and physical or mental restlessness). You reported frequent struggles across several core areas that significantly exceed the standard benchmarks for adult ADHD.',
    answerHeadline: 'Difficulties with both attention and restlessness stood out most in your answers.',
    primaryReportedSymptoms: [
      'Frequent task paralysis: wanting to start important work, but feeling stuck behind a heavy wall of friction.',
      'Time blindness: struggling to estimate how long tasks take, often relying on last-minute deadline pressure.',
      'Forgetting routine obligations, losing track of personal items, or needing multiple reminders.',
      'Physical or mental restlessness: fidgeting with hands or feet, feeling constantly "on the go", or feeling mentally revved up.',
      'Conversational impulsivity: finding it difficult to wait when speaking or frequently blurting out answers.',
    ],
    settingsSummary: 'You reported that these difficulties happen across multiple areas of your life, including work or studies, home routines, and relationships.',
    impactSummary: 'Overall, you noted that these challenges create a noticeable, high amount of interference in your daily life.',
    childhoodSummary: 'You recalled experiencing similar patterns during childhood before age 12, which is an important sign that these are lifelong traits.',
    doctorSuggestion:
      'Because these patterns are creating real friction across multiple parts of your life, we strongly suggest discussing these results with a doctor, psychiatrist, or clinical psychologist. They can provide a proper, personalized evaluation.',
  },
  moderate_inattentive: {
    key: 'moderate_inattentive',
    label: 'Scenario B: Moderate Chances (Inattentive with Masking)',
    badge: 'Moderate Likelihood · Notable Inattentive Match',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-800',
    color: '#d97706', // Yellow / Amber
    likelihoodTitle: 'Moderate chances that you have ADHD',
    likelihoodSummary:
      'Your answers show a noticeable match with inattentive ADHD patterns. You reported frequent difficulties with focus, starting tasks, and staying organized, while reporting fewer signs of physical hyperactivity. This is very common in people who have learned to mask their difficulties or work extra hard behind the scenes to keep up.',
    answerHeadline: 'Attention, organization, and mental fatigue stood out most in your answers.',
    primaryReportedSymptoms: [
      'Struggling to sustain focus during long reading, meetings, or repetitive paperwork unless it is deeply interesting.',
      'Procrastinating on tasks that require sustained mental effort, feeling overwhelmed by multi-step projects.',
      'Losing focus mid-conversation or re-reading the same page multiple times.',
      'Exerting massive mental energy just to appear organized, leading to silent exhaustion or burnout.',
    ],
    settingsSummary: 'You reported noticing these challenges mainly at work, university, or in managing everyday administrative responsibilities.',
    impactSummary: 'Overall, you noted that these difficulties have a noticeable effect on your daily energy and consistency.',
    childhoodSummary: 'You noted that you may have had similar difficulties in childhood or were unsure, which is common when intellect or structure masked symptoms early on.',
    doctorSuggestion:
      'A formal conversation with a healthcare professional can help clarify whether your focus difficulties stem from inattentive ADHD, high-effort masking, anxiety, or chronic cognitive burnout.',
  },
  low_subthreshold: {
    key: 'low_subthreshold',
    label: 'Scenario C: Low Chances (Few Symptoms Reported)',
    badge: 'Low Likelihood · Few Symptoms Reported',
    badgeBg: 'bg-green-50',
    badgeBorder: 'border-green-300',
    badgeText: 'text-green-700',
    color: '#16a34a', // Green
    likelihoodTitle: 'Low chances that you have ADHD',
    likelihoodSummary:
      'Based on your answers, there is a low likelihood that ADHD is the main cause of your difficulties. You reported experiencing occasional moments of distraction or restlessness, but they do not appear at the persistent, frequent level typically seen in ADHD.',
    answerHeadline: 'You reported these difficulties less often overall.',
    primaryReportedSymptoms: [
      'Occasional procrastination on boring tasks (a normal human experience that happens to almost everyone).',
      'Periodic forgetfulness or restlessness that usually connects to being tired, stressed, or having too much on your plate.',
      'Good ability to maintain attention and follow through when tasks are structured or clear.',
    ],
    settingsSummary: 'You reported that these moments are situational and do not consistently disrupt your day across multiple settings.',
    impactSummary: 'Overall, you noted minimal or no major interference in your everyday life.',
    childhoodSummary: 'You did not recall experiencing persistent attention or restlessness issues during early childhood.',
    doctorSuggestion:
      'While ADHD appears unlikely from your answers, if you are currently feeling overwhelmed or struggling to concentrate, it may be helpful to look into sleep quality, stress levels, or recent lifestyle changes with a doctor.',
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
        <div className="rounded-2xl border-2 border-sage-green/40 bg-warm-cream p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-green text-white font-bold text-xs shadow-2xs">
                PRO
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sage-green">
                  Results Prototype · Color-Coded Likelihood Preview
                </p>
                <p className="text-xs text-foreground/80 mt-0.5">
                  Red = High chances · Yellow = Moderate chances · Green = Low chances. No academic jargon.
                </p>
              </div>
            </div>

            {/* Quick Switch Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => {
                const s = SCENARIOS[key];
                const active = currentScenario === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCurrentScenario(key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-2xs ${
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/90 bg-white px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-2xs"
            >
              <Printer className="h-4 w-4 text-sage-green" /> Print / Save Summary
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION 1: LIKELIHOOD & CHANCES (RED / YELLOW / GREEN)            */}
        {/* Clear, direct, zero academic jargon                                */}
        {/* ================================================================== */}
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="group relative overflow-hidden bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9] space-y-6"
        >
          {/* Subtle background glow based on likelihood color */}
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: data.color }}
            aria-hidden="true"
          />

          {/* Color-Coded Likelihood Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${data.badgeBg} ${data.badgeBorder} ${data.badgeText} shadow-2xs`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: data.color }}
              />
              {data.badge}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Adult Self-Assessment (ASRS / DSM-5)
            </span>
          </div>

          {/* Main Plain-English Likelihood Headline */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground leading-tight">
              {data.likelihoodTitle}
            </h1>
            <p className="mt-3 text-base sm:text-[17px] leading-[1.8] text-foreground/90 font-normal">
              {data.likelihoodSummary}
            </p>
          </div>

          {/* Non-Diagnostic Suggestion Box */}
          <div className="rounded-2xl border-2 border-stone-200/80 bg-warm-cream/60 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-stone-800">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                Important note on diagnosis
              </h4>
            </div>
            <p className="text-base leading-[1.75] text-foreground/90">
              <strong>This is a screening guide, not an official medical diagnosis.</strong> An online test can help you organize what you are experiencing, but only a licensed healthcare professional (such as a psychiatrist or clinical psychologist) can officially diagnose ADHD.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed border-t border-stone-200/70 pt-2.5">
              {data.doctorSuggestion}
            </p>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* SECTION 2: ANSWER SUMMARY (LIKE IMAGE 3 WITH BETTER DELIVERY)      */}
        {/* Clean, digestible, warm presentation of what stood out            */}
        {/* ================================================================== */}
        <motion.div
          key={`${currentScenario}-summary`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="group relative overflow-hidden bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9] space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sage-green/15 text-sage-green">
              <Sparkles className="h-3.5 w-3.5" /> What your answers showed
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Age Group: 18 or older
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            {data.answerHeadline}
          </h2>

          {/* Primary Reported Symptoms in Daily Life */}
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-stone-600">
              Patterns you reported experiencing most often:
            </p>
            <ul className="space-y-2.5">
              {data.primaryReportedSymptoms.map((symptom, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-base leading-[1.7] text-foreground/90"
                >
                  <span className="text-sage-green font-bold text-lg leading-none mt-1 shrink-0">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Context & Life Impact Box (Cleaner delivery of Image 3's box) */}
          <div className="rounded-2xl border border-stone-200/80 bg-warm-cream/50 p-5 sm:p-6 space-y-3 text-base leading-[1.75] text-stone-700">
            <p>
              <strong className="font-semibold text-foreground">Where it happens: </strong>
              {data.settingsSummary}
            </p>
            <p>
              <strong className="font-semibold text-foreground">Everyday impact: </strong>
              {data.impactSummary}
            </p>
            <p className="border-t border-stone-200/70 pt-2.5">
              <strong className="font-semibold text-foreground">Childhood history: </strong>
              {data.childhoodSummary}
            </p>
          </div>

          {/* Action button: Download Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-100">
            <div>
              <p className="text-base font-bold text-foreground">Taking this to an appointment?</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Print or save a clean 1-page summary to show your doctor or therapist.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sage-green px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md shrink-0 text-base"
            >
              <FileCheck className="h-4 w-4" /> Print / Save Summary
            </button>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* SECTION 3: PERSONALIZED GUIDANCE ("Explore what may be relevant")  */}
        {/* NO MEDICATION LINK per explicit instructions                       */}
        {/* ================================================================== */}
        <div className="space-y-4 print:hidden">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-green">
              Personalized Guidance
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-0.5">
              Explore what may be relevant to you
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Practical, compassionate chapters chosen based on what you reported:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Guide 1: Getting Diagnosed (Chapter 7) */}
            <Link
              href="/chapter/getting-diagnosed"
              className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                  1
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                  How an Assessment Works
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  What clinicians ask, who can evaluate adult ADHD, and what questions to bring to your doctor visit.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                Read Chapter 7 Guide <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Guide 2: What Actually Helps (Chapter 5) */}
            <Link
              href="/chapter/what-helps"
              className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                  2
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                  What Actually Helps Today
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Practical, low-friction strategies: externalizing memory, body doubling, and breaking through task paralysis.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                Read Chapter 5 Tools <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Guide 3: Why It Feels Like This (Chapter 2) */}
            <Link
              href="/chapter/why-feels"
              className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                  3
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                  Why It Feels Like This
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Why starting feels physically impossible, why deadlines trigger adrenaline, and letting go of shame.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                Read Chapter 2 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION 4: PRINT SUMMARY FOR CLINICAL CONSULTATION                 */}
        {/* ================================================================== */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200/70 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sage-green">
                Doctor Discussion Summary
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-0.5">
                Summary for a Consultation
              </h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              ADHD Compass Screening Aid
            </span>
          </div>

          <div className="space-y-4 text-base leading-[1.75] text-foreground/85">
            <p>
              If you decide to talk to a healthcare professional, you can share this page or take this summary with you:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                <p className="font-bold text-foreground">Symptom Overview</p>
                <p className="text-sm text-stone-700">
                  • <strong>Attention & Focus:</strong> Frequent difficulties with task initiation, losing details, and sustained attention.
                </p>
                <p className="text-sm text-stone-700">
                  • <strong>Restlessness / Impulsivity:</strong> {data.key === 'high_combined' ? 'Frequent physical or mental restlessness.' : 'Lower physical restlessness; primarily inattentive or masked.'}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                <p className="font-bold text-foreground">Impact & History</p>
                <p className="text-sm text-stone-700">
                  • <strong>Life Settings:</strong> {data.settingsSummary}
                </p>
                <p className="text-sm text-stone-700">
                  • <strong>Childhood History:</strong> {data.childhoodSummary}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-muted-foreground leading-relaxed">
              <strong>Notice for Healthcare Professionals: </strong>
              This instrument is an educational patient screening aid based on standard adult ADHD symptom criteria. It does not replace a comprehensive neuropsychiatric assessment or clinical interview.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
