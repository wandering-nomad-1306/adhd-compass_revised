import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Clock } from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';

interface Experience {
  question: string;
  tag: string;
  validation: string;
  deeperExplanation: {
    neurocognitive: string;
    context: string;
  };
  id: string;
  strategyAnchor: string;
  strategyLabel: string;
}

const experiences: Experience[] = [
  {
    id: 'experience-starting',
    question: 'Why can’t I just start?',
    tag: 'Starting Blocks & Task Initiation',
    validation:
      'Knowing what to do and being able to begin are completely different neurological processes. Many adults with ADHD describe a painful, frustrating gap between intention and action.',
    deeperExplanation: {
      neurocognitive:
        'Starting any task requires multiple front-of-brain circuits at once: holding the goal in mind, estimating effort, blocking distractions, and generating enough dopamine to spark motivation. In ADHD, baseline dopamine signaling is lower in reward-anticipation circuits, making non-urgent tasks feel like they lack the initial spark needed to begin.',
      context:
        'Tasks with delayed payoffs, ambiguous sub-steps, or minimal external structure can feel like an impassable brick wall. This is known as executive paralysis—it is a biological ignition block, not a lack of willpower, caring, or effort.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=starting#common-difficulties',
    strategyLabel: 'See Task Initiation & Micro-Entry Strategies',
  },
  {
    id: 'experience-deadlines',
    question: 'Why do deadlines suddenly work?',
    tag: 'Adrenaline Focus & Urgent Deadlines',
    validation:
      'A project that felt physically impossible for days or weeks often becomes effortlessly doable when the deadline is hours away. The cognitive ability was always there, but accessing it required emergency adrenaline.',
    deeperExplanation: {
      neurocognitive:
        'Imminent deadlines trigger a surge of noradrenaline and adrenaline. This emergency stress response floods prefrontal attention networks, temporarily compensating for low baseline dopamine. High urgency sharpens focus, strips away choices, and silences decision paralysis.',
      context:
        'While crisis-driven activation gets tasks finished, relying on emergency adrenaline takes a heavy physical toll, fosters chronic guilt, and quickly leads to burnout. It does not mean earlier difficulty was voluntary laziness.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=time#common-difficulties',
    strategyLabel: 'See Time Visibility & Checkpoint Strategies',
  },
  {
    id: 'experience-emotion',
    question: 'Why is emotional regulation so hard?',
    tag: 'Big Feelings & Emotional Speed',
    validation:
      'Many people with ADHD experience emotions that arrive with lightning speed, feel all-consuming, and take longer to settle. This can create friction in relationships, work conversations, and self-confidence.',
    deeperExplanation: {
      neurocognitive:
        'Brain scans show that the communication bridge between the logical prefrontal cortex and the emotional alarm center (the amygdala) works on a slight delay. Emotional impulses register at full volume before executive braking systems can evaluate or moderate the reaction.',
      context:
        'Emotional reactivity is not a standalone diagnostic requirement in the DSM-5, but it is one of the most widespread challenges reported by adults with ADHD. It is frequently magnified by chronic sleep debt, sensory overload, and daily fatigue.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=emotion#common-difficulties',
    strategyLabel: 'See Emotional De-escalation & Pause Strategies',
  },
  {
    id: 'experience-focus',
    question: 'Why can I focus deeply on one thing but not another?',
    tag: 'Hyperfocus vs. Low Interest',
    validation:
      'ADHD is not a shortage of attention. It is a difficulty directing and maintaining attention on demand based on conscious intent rather than immediate neurochemical interest.',
    deeperExplanation: {
      neurocognitive:
        'Novelty, immediate feedback, high stakes, and intense personal interest trigger a natural surge of dopamine, locking the brain into effortless, hours-long absorption (often called hyperfocus). In contrast, routine, administrative, or repetitive tasks starve these circuits of chemical fuel.',
      context:
        'Attention in ADHD is interest-based rather than importance-based. Being able to code or paint for 8 hours while struggling to open a one-page electric bill is the defining hallmark of attentional regulation differences, not selective caring.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=distraction#common-difficulties',
    strategyLabel: 'See Distraction Shielding & Parking Lot Strategies',
  },
  {
    id: 'experience-forgetting',
    question: 'Why do I forget things I genuinely meant to remember?',
    tag: 'Working Memory & Vanishing Cues',
    validation:
      'Forgetting an appointment, an instruction, or a promise never means the person or task was unimportant to you.',
    deeperExplanation: {
      neurocognitive:
        'Working memory serves as the brain’s temporary mental desktop, while prospective memory remembers to carry out an action in the future. Both depend on prefrontal holding loops that are fragile and easily cleared the second attention is interrupted.',
      context:
        'The instant attention shifts to a new stimulus, the previous intention drops out of conscious awareness unless it is anchored to a visible physical reminder in the immediate environment. If it is out of sight, it is truly out of mind.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=forgetting#common-difficulties',
    strategyLabel: 'See Point-of-Performance Memory Scaffolding',
  },
  {
    id: 'experience-switching',
    question: 'Why is switching tasks so difficult?',
    tag: 'Transition Friction & Task Drag',
    validation:
      'Stopping one activity and shifting your focus to another can feel like shifting gears without a clutch—it causes jarring mental friction and heavy resistance.',
    deeperExplanation: {
      neurocognitive:
        'Task switching (cognitive flexibility) requires shutting down an active brain network, wiping the mental scratchpad, and loading new instructions. Disengaging from a stimulating task causes an abrupt drop in dopamine, which the brain perceives as deeply uncomfortable.',
      context:
        'Transition friction is most intense when moving from an engaging task to an ambiguous or tedious chore, or when an interruption happens without advance warning or a clear bridge note.',
    },
    strategyAnchor: '/chapter/what-helps?difficulty=switching#common-difficulties',
    strategyLabel: 'See Bridge Notes & Transition Strategies',
  },
];

export default function WhyItFeelsLikeThis() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title="Why It Feels Like This"
      subtitle="Identifying repeated daily patterns can turn confusing private struggles into actionable understanding."
      chapterNumber={2}
      totalChapters={8}
      badgeText="Chapter 2 · Everyday Patterns"
      estimatedReadingTime="6 min read"
      bgClass="bg-[#F8F7FA]"
      accentColor="#585274"
      maxWidthClass="max-w-[76rem]"
      onPrevious={() => setLocation('/chapter/welcome')}
      onNext={() => setLocation('/chapter/what-is')}
    >
      <motion.div className="space-y-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Intro Overview Card */}
        <div className="rounded-2xl border border-[#585274]/15 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-2xs">
          <p className="text-base sm:text-lg leading-relaxed text-stone-700">
            ADHD affects attention regulation, impulse control, working memory, and consistency. No single experience proves someone has ADHD, but identifying repeated patterns across different settings can turn confusing private struggles into clear, actionable neurocognitive understanding.
          </p>
        </div>

        {/* Patterns List */}
        <section className="space-y-6" id="patterns" data-page-label="Everyday patterns">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.question}
              id={experience.id}
              className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-8 shadow-2xs transition-all duration-300 hover:shadow-xl hover:border-sage-green hover:bg-[#fffdf9] scroll-mt-24"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.008 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-sage-green/10 px-3 py-1 text-xs font-bold text-sage-green tracking-wide">
                  Pattern {index + 1}
                </span>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600">
                  {experience.tag}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl leading-snug">{experience.question}</h2>
              <p className="mt-4 border-l-4 border-sage-green/60 pl-5 text-[17px] sm:text-lg leading-relaxed text-stone-800 font-medium">
                {experience.validation}
              </p>

              <details className="group mt-6 rounded-2xl border border-stone-200/80 bg-warm-cream/40 p-2 transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-3.5 font-sans font-bold text-foreground transition hover:bg-white/80">
                  <span className="text-sm sm:text-base">Why this happens · Neurocognitive breakdown</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-sage-green transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-stone-200/60 px-4 sm:px-5 py-5 space-y-4">
                  <div className="rounded-xl bg-white p-4 sm:p-5 border border-stone-200/70 shadow-2xs">
                    <p className="text-[15px] sm:text-base leading-[1.75] text-stone-800">
                      <strong className="text-foreground font-bold">Brain Mechanism: </strong>
                      {experience.deeperExplanation.neurocognitive}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 sm:p-5 border border-stone-200/70 shadow-2xs">
                    <p className="text-[15px] sm:text-base leading-[1.75] text-stone-700">
                      <strong className="text-foreground font-bold">Real-World Context: </strong>
                      {experience.deeperExplanation.context}
                    </p>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setLocation(experience.strategyAnchor)}
                      className="inline-flex items-center gap-2 rounded-xl bg-sage-green/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-sage-green hover:bg-sage-green/20 transition-colors"
                    >
                      <span>{experience.strategyLabel}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </details>
            </motion.article>
          ))}
        </section>

        {/* Clues vs Diagnosis */}
        <motion.section
          id="clues-vs-diagnosis"
          data-page-label="Clues vs diagnosis"
          className="rounded-2xl border border-sage-green/20 bg-gradient-to-br from-sage-green/[0.08] via-white to-muted-teal/[0.08] p-7 sm:p-9 shadow-2xs transition-all duration-300 hover:shadow-xl hover:border-sage-green"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.008 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">These experiences are clues, not a standalone diagnosis</h2>
          <p className="mt-4 text-[16px] sm:text-lg leading-[1.8] text-stone-800">
            <strong>Similar difficulties can also emerge</strong> from chronic stress, severe sleep deprivation, generalized anxiety, major depression, learning differences, trauma, or medical thyroid conditions. ADHD is diagnosed only when there is a <strong>persistent developmental history across multiple life settings</strong> (such as home, school, and work) that causes meaningful functional impairment—not simply because you relate to a single card.
          </p>
        </motion.section>

        {/* Managing Difficulties Bridge */}
        <motion.section
          id="managing-difficulties"
          data-page-label="Managing difficulties"
          className="rounded-2xl border border-stone-200/80 bg-white p-7 sm:p-9 shadow-2xs transition-all duration-300 hover:shadow-xl hover:border-sage-green"
          whileHover={{ y: -4, scale: 1.008 }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Moving from recognition to management</h2>
          <p className="mt-4 text-[16px] sm:text-lg leading-[1.8] text-stone-700">
            Understanding your brain’s operating manual is the essential first step. The remaining chapters translate these neurobiological realities into <strong>evidence-based treatments</strong>, including comprehensive clinical evaluations, ADHD-adapted cognitive behavioral tools, point-of-performance accommodations, and first-line medical therapies.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setLocation('/chapter/what-helps')}
              className="inline-flex items-center gap-2 rounded-xl bg-sage-green px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-sage-green/90 transition-all"
            >
              Explore Practical Strategies (Chapter 5) <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setLocation('/chapter/medication')}
              className="inline-flex items-center gap-2 rounded-xl border border-sage-green/30 bg-white px-5 py-3 text-sm font-bold text-sage-green shadow-2xs hover:bg-sage-green/[0.08] transition-all"
            >
              Medication Guide (Chapter 6) <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>

        {/* Sources */}
        <SourceList
          sources={[
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'Understanding ADHD: What You Need to Know',
              organization: 'NIH MedlinePlus Magazine',
              url: 'https://magazine.medlineplus.gov/article/understanding-adhd-what-you-need-to-know/',
            },
            {
              title: 'What is ADHD?',
              organization: 'American Psychiatric Association',
              url: 'https://www.psychiatry.org/patients-families/adhd/what-is-adhd',
            },
          ]}
        />

        {/* Next Chapter Prompt */}
        <motion.section id="next-chapter" data-page-label="Next chapter" className="text-center py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl font-bold text-foreground">Next: What is ADHD?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Connect these everyday experiences to the formal clinical definitions, DSM-5 diagnostic thresholds, and the three presentations of ADHD.
          </p>
          <button
            type="button"
            onClick={() => setLocation('/chapter/what-is')}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-sage-green px-7 py-3 font-sans font-bold text-warm-cream shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Next: What is ADHD?
          </button>
        </motion.section>
      </motion.div>
    </ChapterLayoutWide>
  );
}
