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
  badge: string;
  badgeBg: string;
  badgeText: string;
  color: string;
  headline: string;
  leadSubtitle: string;
  likelihoodSummary: string;
  // Answer summary replicating Image 3 layout with clean delivery
  answerHeadline: string;
  primarySummaryParagraph: string;
  contextBoxText: string;
  // Non-diagnostic clinical suggestion
  doctorSuggestion: string;
}

const SCENARIOS: Record<ScenarioKey, ScenarioData> = {
  high_combined: {
    key: 'high_combined',
    label: 'Scenario A: High Chances (7 Inattentive, 6 Restless)',
    badge: 'HIGH MATCH · COMBINED INATTENTIVE & HYPERACTIVE PROFILE',
    badgeBg: 'bg-[#991b1b]',
    badgeText: 'text-white',
    color: '#991b1b', // Deep rich crimson burgundy
    headline: 'Your responses reflect a strong Combined profile with elevated inattention and restlessness.',
    leadSubtitle: 'Meets adult statutory thresholds across both attention and restlessness domains.',
    likelihoodSummary:
      'Based on your answers, your daily experiences strongly match the patterns seen in ADHD. You reported frequent, persistent challenges across both executive focus and restless impulsivity that create noticeable friction across multiple areas of your life.',
    answerHeadline: 'Restlessness, impulse control, and task focus stood out most in your answers.',
    primarySummaryParagraph:
      'You frequently reported forgetting routine obligations, struggling to break through task paralysis on multi-step projects, fidgeting with hands or feet when seated, feeling constantly "on the go", and blurting out answers or interrupting others before they finish.',
    contextBoxText:
      'You also reported noticeable difficulties across several areas, including work, university or studies, and personal relationships. Overall, you noted a high amount of everyday interference, and recalled experiencing similar patterns in childhood before age 12.',
    doctorSuggestion:
      'Because these patterns are creating ongoing friction across multiple areas of your life, we strongly suggest discussing these results with a doctor, psychiatrist, or clinical psychologist. They can provide an official, comprehensive evaluation.',
  },
  moderate_inattentive: {
    key: 'moderate_inattentive',
    label: 'Scenario B: Moderate Chances (Inattentive with Masking)',
    badge: 'MODERATE MATCH · INATTENTIVE / MASKING PROFILE',
    badgeBg: 'bg-[#b45309]',
    badgeText: 'text-white',
    color: '#b45309', // Warm rich burnt amber / chestnut as in Image 1
    headline: 'Your responses reflect a notable Inattentive profile with potential high-effort compensation.',
    leadSubtitle: 'Meets adult Inattentive threshold with lower physical restlessness, characteristic of high masking.',
    likelihoodSummary:
      'Your answers show a noticeable match with inattentive ADHD patterns. You reported frequent difficulties with focus, starting tasks, and mental fatigue, while reporting fewer signs of physical hyperactivity. This is very common in people who have learned to mask their difficulties or work twice as hard behind the scenes to keep up.',
    answerHeadline: 'Attention, organization, and mental fatigue stood out most in your answers.',
    primarySummaryParagraph:
      'You frequently reported struggling to sustain focus during long reading or paperwork unless deeply interesting, putting off tasks requiring sustained mental effort, re-reading the same page multiple times, and feeling silent exhaustion from constantly trying to stay organized.',
    contextBoxText:
      'You also reported noticeable difficulties across several areas, primarily in work, studies, and personal administrative routines. Overall, you noted a moderate amount of everyday interference. You noted that you were unsure or did not fully recall similar difficulties before age 12, which frequently happens when intellect or high structure masked symptoms early on.',
    doctorSuggestion:
      'A formal conversation with a healthcare professional can help clarify whether your focus difficulties stem from inattentive ADHD, high-effort compensation, anxiety, or chronic cognitive burnout.',
  },
  low_subthreshold: {
    key: 'low_subthreshold',
    label: 'Scenario C: Low Chances (Few Symptoms Reported)',
    badge: 'LOW MATCH · FEW ELEVATED SYMPTOMS REPORTED',
    badgeBg: 'bg-[#1e3a2f]',
    badgeText: 'text-white',
    color: '#1e3a2f', // Deep rich forest spruce
    headline: 'Your responses reflect low chances of ADHD with few elevated symptoms.',
    leadSubtitle: 'Reported symptoms fall below clinical thresholds for adult ADHD.',
    likelihoodSummary:
      'Based on your answers, there is a low likelihood that ADHD is the primary cause of your difficulties. You reported experiencing occasional moments of distraction or restlessness, but they do not appear at the persistent, cross-situational frequency typical of ADHD.',
    answerHeadline: 'Few frequent attention or restlessness symptoms reported.',
    primarySummaryParagraph:
      'You reported occasional procrastination on boring tasks (a normal human experience that happens to almost everyone), periodic forgetfulness when tired or stressed, and a generally good ability to maintain focus and follow through when tasks are structured.',
    contextBoxText:
      'You noted that these moments are mostly situational rather than pervasive across settings. Overall, you noted minimal or no major interference in your everyday life, and did not recall experiencing persistent attention difficulties in childhood.',
    doctorSuggestion:
      'While ADHD appears unlikely from your answers, if you are currently feeling overwhelmed or struggling to concentrate, it may be helpful to look into sleep quality, stress levels, or recent lifestyle changes with a doctor.',
  },
};

export default function TestResultsPrototype() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioKey>('moderate_inattentive');
  const data = SCENARIOS[currentScenario];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-foreground py-8 px-4 sm:px-6">
      {/* Interactive Scenario Switcher Bar (Prototype-only tool) */}
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <div className="rounded-2xl border-2 border-sage-green/40 bg-warm-cream p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-green text-white font-bold text-xs shadow-2xs">
                PRO
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sage-green">
                  Results Prototype · Color Indicator & Delivery Preview
                </p>
                <p className="text-xs text-foreground/80 mt-0.5">
                  Red = High chances · Amber = Moderate chances · Slate/Green = Low chances. No academic jargon.
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
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      active
                        ? 'bg-sage-green text-white shadow-2xs'
                        : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                    }`}
                  >
                    {key === 'high_combined'
                      ? 'High Chances (Red)'
                      : key === 'moderate_inattentive'
                      ? 'Moderate Chances (Amber)'
                      : 'Low Chances (Green/Slate)'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Bar matching user's Image 1 */}
        <div className="flex items-center justify-between text-sm print:hidden">
          <Link
            href="/chapter/getting-diagnosed"
            className="inline-flex items-center gap-2 font-semibold text-sage-green hover:underline text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Chapter 7 Overview
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/90 bg-white px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-2xs"
            >
              <Printer className="h-4 w-4 text-sage-green" /> Print / Save PDF
            </button>
            <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              SELF-ASSESSMENT SUMMARY
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION 1: LIKELIHOOD CARD (REPLICATING USER'S FIRST IMAGE)        */}
        {/* Sophisticated warm cream card, solid rich pill, zero cheap pastel  */}
        {/* ================================================================== */}
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#fefbf6] via-[#faf7f2] to-[#f5f0e8] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-emerald-900/10 shadow-sm space-y-6"
        >
          {/* Subtle warm ambient corner blur matching the likelihood color */}
          <div
            className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: data.color }}
            aria-hidden="true"
          />

          {/* Solid Rich Color-Coded Pill Badge (Image 1 style) */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${data.badgeBg} ${data.badgeText} shadow-2xs`}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              {data.badge}
            </span>
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
              Evaluated: Adult DSM-5-TR Standard
            </span>
          </div>

          {/* Main Editorial Headline & Lead */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              {data.headline}
            </h1>
            <p
              className="text-base sm:text-lg font-medium leading-relaxed"
              style={{ color: data.color }}
            >
              {data.leadSubtitle}
            </p>
            <p className="text-base sm:text-[17px] leading-[1.8] text-foreground/90 font-normal pt-1">
              {data.likelihoodSummary}
            </p>
          </div>

          {/* Non-Diagnostic Suggestion Box */}
          <div className="rounded-2xl border border-stone-200/80 bg-white/75 p-5 sm:p-6 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-stone-800">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                Important note on diagnosis
              </h4>
            </div>
            <p className="text-base sm:text-[17px] leading-[1.75] text-foreground/90">
              <strong>This is a screening guide, not an official medical diagnosis.</strong> An online test can help you organize what you are experiencing, but only a licensed healthcare professional (such as a psychiatrist or clinical psychologist) can officially diagnose ADHD.
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-200/70 pt-2.5">
              {data.doctorSuggestion}
            </p>
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* SECTION 2: ANSWER SUMMARY (REPLICATING USER'S IMAGE 3 LAYOUT)      */}
        {/* Clean, digestible, warm presentation of what stood out            */}
        {/* ================================================================== */}
        <motion.div
          key={`${currentScenario}-summary`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#fefbf6] via-[#faf7f2] to-[#f5f0e8] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-emerald-900/10 shadow-sm space-y-6"
        >
          {/* Header matching Image 3 */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sage-green/15 text-sage-green">
              <Sparkles className="h-3.5 w-3.5" /> What your answers showed
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Age Group: 18 or older
            </span>
          </div>

          {/* Headline matching Image 3 serif */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-snug">
            {data.answerHeadline}
          </h2>

          {/* Primary reported symptoms description */}
          <p className="text-base sm:text-[17px] leading-[1.8] text-foreground/90 font-normal">
            {data.primarySummaryParagraph}
          </p>

          {/* Context Box matching Image 3 layout */}
          <div className="rounded-2xl border border-stone-200/70 bg-[#faf7f2]/90 p-5 sm:p-6 text-base sm:text-[17px] leading-[1.8] text-foreground/90 shadow-2xs">
            {data.contextBoxText}
          </div>

          {/* Action button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-200/60">
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
        {/* STRICTLY NO MEDICATION LINK per explicit instructions              */}
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
                  • <strong>Attention & Focus:</strong> Frequent difficulties with task initiation, sustained focus, and mental fatigue.
                </p>
                <p className="text-sm text-stone-700">
                  • <strong>Restlessness / Impulsivity:</strong> {data.key === 'high_combined' ? 'Frequent physical or mental restlessness.' : 'Lower physical restlessness; primarily inattentive or masked.'}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                <p className="font-bold text-foreground">Impact & History</p>
                <p className="text-sm text-stone-700">
                  • <strong>Life Settings:</strong> Difficulties reported across work, study, or everyday personal administrative life.
                </p>
                <p className="text-sm text-stone-700">
                  • <strong>Everyday Impact:</strong> Noticeable disruption to daily energy, consistency, or routine completion.
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
