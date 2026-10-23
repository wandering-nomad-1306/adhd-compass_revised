import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  HelpCircle,
  Sparkles,
  Stethoscope,
  Target,
  UserCheck,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';

export default function GettingDiagnosed() {
  const [, setLocation] = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <ChapterLayoutWide
      title="Getting Diagnosed"
      subtitle="Understanding how clinical evaluations work, what to expect, and where to begin."
      chapterNumber={7}
      totalChapters={8}
      badgeText="Chapter 7 · Evaluation & Assessment"
      estimatedReadingTime="4 min read"
      bgClass="bg-[#F5F8F7]"
      accentColor="#335952"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/medication')}
      onNext={() => setLocation('/chapter/accommodations')}
    >
      <div className="max-w-4xl mx-auto space-y-12 py-2">
        {/* ================================================================== */}
        {/* HERO SECTION: Motivating, Clear, Inviting with Ambient Hover Glow */}
        {/* ================================================================== */}
        <motion.section
          whileHover={reducedMotion ? undefined : { scale: 1.008 }}
          transition={{ duration: 0.3 }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-green/15 via-[#fffdf8] to-muted-teal/10 border-2 border-sage-green/30 p-8 sm:p-12 shadow-sm text-center md:text-left transition-shadow duration-300 hover:shadow-xl"
        >
          {/* Subtle Ambient Hover Glowing Orbs (like About.tsx) */}
          <div
            className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-[#dce7d8]/50 blur-3xl opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-125"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-[#dce8ee]/50 blur-3xl opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-125"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-green/15 text-sage-green text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 group-hover:bg-sage-green group-hover:text-white">
                <Sparkles className="h-4 w-4" /> ADHD Self-Assessment
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-[1.15]">
                ADHD Self-Assessment
              </h1>
              <p className="text-foreground/80 text-base sm:text-lg lg:text-xl leading-relaxed">
                Explore patterns you have noticed and organize information you may want to discuss during an ADHD evaluation.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5 font-medium transition-colors group-hover:text-foreground">
                  <Target className="h-4 w-4 text-sage-green" /> 26 questions (Core + Context)
                </span>
                <span className="flex items-center gap-1.5 font-medium transition-colors group-hover:text-foreground">
                  <Clock className="h-4 w-4 text-sage-green" /> ~5 minutes
                </span>
                <span className="flex items-center gap-1.5 font-medium transition-colors group-hover:text-foreground">
                  <UserCheck className="h-4 w-4 text-sage-green" /> Completely private & free
                </span>
              </div>
            </div>

            <div className="shrink-0 flex justify-center">
              <Link
                href="/chapter/getting-diagnosed/test"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-sage-green text-white font-semibold text-lg sm:text-xl shadow-lg hover:bg-sage-green/90 hover:scale-[1.03] active:scale-[0.98] transition-all text-center w-full sm:w-auto"
              >
                Start the Test <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ================================================================== */}
        {/* SECTION 2: What this self-assessment can and cannot inform you about */}
        {/* ================================================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sage-green">
              Setting Expectations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
              What this self-assessment can and cannot inform you about
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 pt-2">
            {/* Card 1: What this self-assessment will tell you */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3 transition-all duration-300 hover:shadow-xl hover:border-emerald-400 hover:bg-emerald-50/80"
            >
              <div
                className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-emerald-200/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 font-bold text-emerald-950 text-base sm:text-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6" />
                <span>What this self-assessment will tell you</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-foreground/85 leading-relaxed">
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>A clear summary of core inattention and hyperactivity/impulsivity patterns you report.</span>
                </li>
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Contextual insight into where challenges occur across school, work, or home life.</span>
                </li>
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>An organized discussion summary to help you talk with a doctor or psychologist.</span>
                </li>
              </ul>
            </motion.div>

            {/* Card 2: What this self-assessment cannot do */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 transition-all duration-300 hover:shadow-xl hover:border-stone-400 hover:bg-stone-100/70"
            >
              <div
                className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-stone-300/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 font-bold text-stone-800 text-base sm:text-lg">
                <AlertCircle className="h-5 w-5 text-stone-500 shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6" />
                <span>What this self-assessment cannot do</span>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-foreground/85 leading-relaxed">
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-stone-500 font-bold">•</span>
                  <span>It cannot give you a formal medical diagnosis or rule one out.</span>
                </li>
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-stone-500 font-bold">•</span>
                  <span>It cannot determine whether symptoms are better explained by sleep, anxiety, or burnout.</span>
                </li>
                <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <span className="text-stone-500 font-bold">•</span>
                  <span>It cannot prescribe medication or therapy by itself.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: How clinical diagnosis actually works (Interactive Cards) */}
        {/* ================================================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sage-green">
              Medical Realities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
              How a real diagnosis actually works
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              No doctor uses a brain scan or blood test for ADHD. A legitimate assessment is a comprehensive conversation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            {/* Step 1 */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.22 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-warm-cream/40 border border-stone-200 space-y-3 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#dce7d8]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="inline-flex w-8 h-8 rounded-lg bg-sage-green/15 text-sage-green items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-sage-green group-hover:text-white">
                1
              </span>
              <h3 className="font-bold text-foreground text-lg sm:text-xl transition-colors duration-200 group-hover:text-sage-green">
                In-Depth Clinical Interview
              </h3>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                A licensed specialist conducts a <strong>structured clinical conversation</strong> mapping your daily friction points with <strong>focus, time estimation, organization, and emotional regulation</strong> across the lifespan.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.22 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-warm-cream/40 border border-stone-200 space-y-3 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#dce7d8]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="inline-flex w-8 h-8 rounded-lg bg-sage-green/15 text-sage-green items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-sage-green group-hover:text-white">
                2
              </span>
              <h3 className="font-bold text-foreground text-lg sm:text-xl transition-colors duration-200 group-hover:text-sage-green">
                Childhood History & Retrospective Review
              </h3>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                Because ADHD is neurodevelopmental, <strong>key symptoms must have been present before age 12</strong>—even if compensated for by high intelligence, family structure, or masked by intense perfectionism.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.22 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-warm-cream/40 border border-stone-200 space-y-3 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#dce7d8]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="inline-flex w-8 h-8 rounded-lg bg-sage-green/15 text-sage-green items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-sage-green group-hover:text-white">
                3
              </span>
              <h3 className="font-bold text-foreground text-lg sm:text-xl transition-colors duration-200 group-hover:text-sage-green">
                Cross-Setting Functional Impairment
              </h3>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                Symptoms cannot exist only in a vacuum. Challenges must cause <strong>persistent, measurable friction across at least two life areas</strong> (such as work/school, personal finances, home life, or relationships).
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.22 }}
              className="group relative overflow-hidden p-6 rounded-2xl bg-warm-cream/40 border border-stone-200 space-y-3 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#dce7d8]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="inline-flex w-8 h-8 rounded-lg bg-sage-green/15 text-sage-green items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-sage-green group-hover:text-white">
                4
              </span>
              <h3 className="font-bold text-foreground text-lg sm:text-xl transition-colors duration-200 group-hover:text-sage-green">
                Differential Medical & Psychological Rule-Outs
              </h3>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                Systematic screening ensures focus problems are not caused by <strong>sleep apnea, thyroid imbalances, clinical depression, unmanaged anxiety, sensory overload, or trauma history</strong>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: Who to See (Interactive Specialist Hover Cards) */}
        {/* ================================================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sage-green">
              Healthcare Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-1">
              Who should you consult?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Psychiatrist */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-3.5 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-[#dce7d8]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 font-bold text-foreground text-lg sm:text-xl transition-colors group-hover:text-sage-green">
                <Stethoscope className="h-6 w-6 text-sage-green transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6" />
                <span>Psychiatrist (MD / DO)</span>
              </div>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                A medical doctor who evaluates mental health, rules out physical conditions, and can prescribe ADHD medications if appropriate.
              </p>
              <div className="text-sm sm:text-base text-foreground/90 pt-3 border-t border-stone-200/60 leading-relaxed">
                <strong>Best when:</strong> You want a formal clinical diagnosis and wish to explore medical treatment or prescription options.
              </div>
            </motion.div>

            {/* Psychologist */}
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-3.5 transition-all duration-300 hover:border-sage-green hover:shadow-xl hover:bg-[#fffdf9]"
            >
              <div
                className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-[#dce8ee]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2.5 font-bold text-foreground text-lg sm:text-xl transition-colors group-hover:text-sage-green">
                <Brain className="h-6 w-6 text-sage-green transition-transform duration-300 group-hover:scale-120 group-hover:-rotate-6" />
                <span>Clinical Psychologist (PhD / PsyD)</span>
              </div>
              <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed">
                A psychologist who specializes in detailed cognitive testing, behavioral evaluation, and ADHD-adapted coaching or psychotherapy.
              </p>
              <div className="text-sm sm:text-base text-foreground/90 pt-3 border-t border-stone-200/60 leading-relaxed">
                <strong>Best when:</strong> You want an in-depth cognitive assessment, academic/workplace paperwork, or non-medication strategies.
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* BOTTOM CTA: Interactive Hover Button */}
        {/* ================================================================== */}
        <motion.div
          whileHover={reducedMotion ? undefined : { y: -3 }}
          className="text-center py-6"
        >
          <Link
            href="/chapter/getting-diagnosed/test"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-sage-green text-white font-semibold text-xl shadow-xl hover:bg-sage-green/90 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Start the Self-Assessment <ArrowRight className="h-6 w-6" />
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            Takes ~5 minutes • 26 questions • Completely private in-browser tool
          </p>
        </motion.div>
      </div>
    </ChapterLayoutWide>
  );
}
