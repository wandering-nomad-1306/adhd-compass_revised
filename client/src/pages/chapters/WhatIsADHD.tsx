import { AnimatePresence, motion } from 'framer-motion';
import { Brain, CheckCircle2, CircleHelp, Dna, Scale, Sparkles, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import ADHDPresentationExplorer from '@/components/ADHDPresentationExplorer';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';

const myths = [
  {
    statement: '“Everyone has a little ADHD.”',
    verdict: 'Not accurate',
    explanation:
      'Everyone can be distracted, disorganized, or impulsive when stressed, tired, or bored. ADHD is <strong>not an occasional bad day</strong>—it is a lifelong, biologically grounded neurodevelopmental condition that creates <strong>persistent, measurable challenges across multiple settings</strong> (work, home, and relationships).',
  },
  {
    statement: '“ADHD is caused by laziness or bad parenting.”',
    verdict: 'Completely false',
    explanation:
      'ADHD is a <strong>complex genetic neurodevelopmental condition</strong> related to how brain executive networks develop. Parenting styles, screen time, and dietary sugar do NOT cause ADHD. <strong>Clear routines and supportive environments help manage symptoms</strong>, but blaming the individual or their parents contradicts decades of neuroscience.',
  },
  {
    statement: '“You cannot have ADHD if you can focus for hours.”',
    verdict: 'False (In fact, that is a hallmark feature)',
    explanation:
      'ADHD is an <strong>attention regulation challenge, not an absence of attention</strong>. When a topic offers high personal interest, urgent pressure, or novelty, the ADHD brain can lock into intense focus (<strong>hyperfocus</strong>). Difficulties arise when trying to initiate, sustain, and switch attention on repetitive or low-stimulation tasks.',
  },
  {
    statement: '“People grow out of ADHD.”',
    verdict: 'Symptoms change form—they rarely disappear',
    explanation:
      'Visible physical hyperactivity often <strong>mellows with age into internal restlessness, fidgeting, or chronic racing thoughts</strong>. Meanwhile, executive challenges with <strong>time estimation, organization, emotional control, and working memory</strong> frequently continue into adulthood.',
  },
] as const;

const coexisting = [
  'Anxiety or depression',
  'Learning or language differences',
  'Autism spectrum profile',
  'Sleep latency and apnea concerns',
  'Oppositional or emotional reactivity',
  'Tic disorders or sensory overload',
];

function MythExplorer() {
  const [selected, setSelected] = useState(0);
  const item = myths[selected];

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid grid-cols-2 gap-2 sm:block sm:space-y-3" role="tablist" aria-label="Common ADHD myths">
        {myths.map((myth, index) => {
          const active = index === selected;
          return (
            <button
              key={myth.statement}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(index)}
              className={`flex min-h-14 w-full items-center justify-center rounded-xl border p-3 text-center transition-all sm:min-h-0 sm:block sm:p-4 sm:text-left ${
                active
                  ? 'border-sage-green bg-sage-green/[0.08] shadow-sm'
                  : 'border-sage-green/15 bg-white hover:border-sage-green/35'
              }`}
            >
              <span className="flex items-center justify-center gap-3 sm:justify-start">
                <CircleHelp className={`hidden h-5 w-5 shrink-0 sm:block ${active ? 'text-sage-green' : 'text-muted-foreground'}`} />
                <span className="text-xs font-semibold leading-snug text-foreground sm:text-base">{myth.statement}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.statement}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="flex min-h-0 flex-col justify-center rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs sm:min-h-64 sm:p-7"
        >
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-sage-green">
            <CheckCircle2 className="h-5 w-5" /> Evidence-based answer
          </div>
          <h3 className="mt-5 font-serif text-2xl font-bold text-foreground">{item.verdict}</h3>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: item.explanation }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WhatIsADHD() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title="What is ADHD?"
      subtitle="A clear clinical definition without reducing a person to a checklist."
      chapterNumber={3}
      totalChapters={8}
      badgeText="Chapter 3 · Clinical Definition"
      estimatedReadingTime="5 min read"
      bgClass="bg-[#FAF8F3]"
      accentColor="#6b5c3e"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/why-feels')}
      onNext={() => setLocation('/chapter/brain')}
    >
      <motion.div className="space-y-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Foundation Definition Banner */}
        <div className="rounded-2xl border border-[#6b5c3e]/15 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-2xs">
          <p className="text-base sm:text-lg leading-relaxed text-stone-800">
            ADHD is a neurodevelopmental condition marked by persistent patterns of inattention and/or hyperactivity-impulsivity that begin in childhood, exist across multiple settings, and meaningfully interfere with everyday functioning.
          </p>
        </div>

        <motion.section
          className="grid gap-5 md:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Brain,
              title: 'Developmental',
              text: 'It relates to how attention, inhibition, activity, and self-management develop—not to intelligence or moral character.',
            },
            {
              icon: Scale,
              title: 'Persistent and impairing',
              text: 'The pattern lasts over time and creates real difficulty in more than one important part of life, not just an occasional bad day.',
            },
            {
              icon: Sparkles,
              title: 'Different for each person',
              text: 'Symptoms, strengths, environments, coexisting conditions, and support needs can look very different from one person to another.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-foreground">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </motion.section>

        <section id="presentations" data-page-label="Three ADHD presentations" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Explore the pattern</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Three ADHD presentations</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              ADHD is described using three <strong className="font-semibold text-foreground">presentations</strong>: predominantly inattentive, predominantly hyperactive-impulsive, and combined. The presentation reflects which symptom criteria have been met over the previous six months, so it can change over time as the balance of symptoms changes. Context can affect how noticeable symptoms are, but ADHD still requires symptoms in more than one setting.
            </p>
          </div>
          <ADHDPresentationExplorer />
        </section>

        <section id="diagnostic-criteria" data-page-label="Clinical threshold" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">The Clinical Standard</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">What separates ADHD from everyday distraction?</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Everyone misplaces their keys, zones out during dull meetings, or procrastinates on paperwork. A formal diagnosis requires meeting strict clinical criteria under the statutory <strong>DSM-5-TR standard</strong>:
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-sage-green/15 bg-white shadow-sm">
            {[
              [
                'Duration (6+ Months)',
                'Symptoms must persist for <strong>at least 6 continuous months</strong> to a degree that is inconsistent with a person’s developmental level and directly interferes with everyday goals.',
              ],
              [
                'Symptom Threshold',
                '<strong>Children and teens up to age 16</strong> must meet at least <strong>6 out of 9 symptoms</strong> in inattention or hyperactivity-impulsivity. <strong>Teens age 17 and adults</strong> need at least <strong>5 symptoms</strong>. The Combined presentation requires meeting thresholds in both categories.',
              ],
              [
                'Childhood History (Before Age 12)',
                'Several symptoms must have been <strong>present before age 12</strong>. Even when an adult is diagnosed in their 30s or 50s, a retrospective look reveals childhood patterns—even if they were high-achieving or masked by intense effort.',
              ],
              [
                'Multiple Settings (2+ Areas)',
                'Difficulties cannot happen in only one room. The pattern must cause noticeable friction in <strong>at least two important settings</strong> (such as school/work <em>and</em> home, finances, or relationships).',
              ],
              [
                'Functional Impairment',
                'Symptoms must genuinely <strong>disrupt or reduce the quality</strong> of academic achievement, job stability, safety (such as driving), or personal relationships—not just represent an eccentric personality trait.',
              ],
              [
                'Context & Medical Rule-Outs',
                'Difficulties cannot be better explained by another condition. A thorough clinical evaluation systematically rules out <strong>chronic sleep apnea, thyroid imbalances, unmanaged anxiety, clinical depression, learning disabilities, or trauma</strong> before confirming ADHD.',
              ],
            ].map(([label, textHtml], index) => (
              <div key={label} className="grid gap-2 border-b border-sage-green/10 p-5 last:border-b-0 md:grid-cols-[170px_1fr] md:p-6">
                <span className="flex items-center gap-2 font-bold text-sage-green text-sm sm:text-base">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-green/10 text-xs">{index + 1}</span>
                  {label}
                </span>
                <p className="text-[15px] sm:text-base leading-[1.75] text-foreground/90" dangerouslySetInnerHTML={{ __html: textHtml }} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            This framework establishes the clinical threshold. Chapter 7 (<em>Getting Diagnosed</em>) details who performs evaluations, what questions they ask, and how to prepare.
          </p>
        </section>

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Test a belief</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Common myths, unpacked</h2>
          </div>
          <MythExplorer />
        </section>

        <section className="grid gap-7 lg:grid-cols-2">
          <article className="rounded-2xl border border-stone-200/80 bg-white p-7 sm:p-8 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-sage-green">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
                <Dna className="h-5 w-5" />
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">What causes ADHD?</h2>
            </div>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-foreground">
              ADHD is a <strong>highly heritable, neurodevelopmental condition</strong> with an estimated heritability of 70–80%. Research shows it is shaped by complex genetic variations influencing dopamine and norepinephrine transmission.
            </p>
            <div className="mt-5 rounded-2xl bg-warm-cream p-5 sm:p-6 border border-stone-200/60">
              <p className="font-bold text-base text-foreground">What science proves does NOT cause ADHD</p>
              <p className="mt-2 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
                ADHD is <strong>never caused by personal laziness, poor discipline, dietary sugar, or standard screen time</strong>. While stress and lack of sleep certainly make symptoms worse, blaming the individual or their upbringing contradicts decades of peer-reviewed neuroscience.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-stone-200/80 bg-white p-7 sm:p-8 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-sage-green">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">ADHD often overlaps with other needs</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground">
              Approximately <strong>80% of adults with ADHD have at least one co-occurring condition</strong>. Evaluating these overlaps is essential because treating anxiety or sleep deprivation can dramatically improve daily functioning:
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {coexisting.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-warm-cream p-3.5 text-[15px] sm:text-base font-medium text-foreground border border-stone-200/50">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sage-green" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <motion.section
          className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <XCircle className="mt-1 h-6 w-6 shrink-0 text-[#a96952]" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">A diagnosis is not a complete description of a person</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                ADHD names a pattern of impairment that can guide care. It does not tell you someone's values, creativity, intelligence, personality, effort, or future. A useful understanding includes both the barriers that need support and the strengths the person brings.
              </p>
            </div>
          </div>
        </motion.section>

        <SourceList
          sources={[
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'ADHD in Children',
              organization: 'Centers for Disease Control and Prevention',
              url: 'https://www.cdc.gov/adhd/about/index.html',
            },
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'MedlinePlus, U.S. National Library of Medicine',
              url: 'https://medlineplus.gov/attentiondeficithyperactivitydisorder.html',
            },
            {
              title: 'What is ADHD?',
              organization: 'American Psychiatric Association',
              url: 'https://www.psychiatry.org/patients-families/adhd/what-is-adhd',
            },
            {
              title: 'Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)',
              organization: 'American Psychiatric Association (2022)',
              url: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
              note: 'Current statutory diagnostic manual defining the 18 criteria, age-specific thresholds (≥ 6 for age ≤ 16; ≥ 5 for age ≥ 17), and duration/impairment requirements.',
            },
            {
              title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder',
              organization: 'Neuroscience & Biobehavioral Reviews (Faraone et al., 2021)',
              url: 'https://doi.org/10.1016/j.neubiorev.2021.01.022',
              note: 'Synthesizes global epidemiological, genetic, neuroimaging, and clinical consensus on ADHD etiology and validity.',
            },
            {
              title: 'ADHD Resource Center',
              organization: 'American Academy of Child and Adolescent Psychiatry',
              url: 'https://www.aacap.org/AACAP/Families_and_Youth/Resource_Centers/ADHD_Resource_Center/Home.aspx',
            },
            {
              title: 'ADHD: The Facts',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/adhd-facts/',
            },
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'StatPearls, NCBI Bookshelf',
              url: 'https://www.ncbi.nlm.nih.gov/books/NBK493361/',
            },
            {
              title: 'Understanding ADHD: What You Need to Know',
              organization: 'NIH MedlinePlus Magazine',
              url: 'https://magazine.medlineplus.gov/article/understanding-adhd-what-you-need-to-know/',
            },
          ]}
        />
      </motion.div>
    </ChapterLayoutWide>
  );
}
