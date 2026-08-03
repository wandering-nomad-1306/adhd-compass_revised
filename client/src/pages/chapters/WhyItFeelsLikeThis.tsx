import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';

interface Experience {
  question: string;
  validation: string;
  deeperExplanation: string;
}

const experiences: Experience[] = [
  {
    question: 'Why can’t I just start?',
    validation: 'Knowing what to do and being able to begin are not the same process. Many people with ADHD describe a frustrating gap between intention and action.',
    deeperExplanation:
      'Starting a task draws on several systems at once: holding the goal in mind, estimating effort, resisting competing actions, and expecting enough reward to begin. ADHD is associated with difficulties in executive functioning and reward processing, so tasks with delayed payoff, unclear steps, or little external structure may be especially difficult to initiate. This pattern cannot be reduced to one chemical level or a lack of caring.',
  },
  {
    question: 'Why do deadlines suddenly work?',
    validation: 'A task that felt almost impossible for days may become doable when the deadline is close. The ability was there, but access to it changed with the situation.',
    deeperExplanation:
      'Urgency makes the consequence immediate, narrows the available choices, and adds external structure. Those changes can increase arousal and make the task more salient. This may temporarily improve performance, but relying on crisis-level pressure is exhausting and does not mean the earlier difficulty was laziness.',
  },
  {
    question: 'Why is emotional regulation so hard?',
    validation: 'Some people with ADHD experience emotions that arrive quickly, feel intense, or take longer to settle. This can affect relationships and self-confidence.',
    deeperExplanation:
      'Emotional dysregulation is not one of the core diagnostic criteria, but it is a common associated difficulty. Research links ADHD with differences across executive-control, reward, and emotion-related systems. The pattern varies widely, and intense emotions can also reflect stress, anxiety, depression, trauma, sleep problems, or another condition that deserves separate attention.',
  },
  {
    question: 'Why can I focus deeply on one thing but not another?',
    validation: 'ADHD does not mean attention is absent. It often means attention is difficult to regulate consistently across different demands.',
    deeperExplanation:
      'Novelty, immediate feedback, personal interest, clear structure, and urgency can change how engaging a task feels. Research also links ADHD with differences in reward processing and sustained attention. “Hyperfocus” is a widely used description of intense absorption, but it is not itself a formal diagnostic symptom and does not occur in every person with ADHD.',
  },
  {
    question: 'Why do I forget things I genuinely meant to remember?',
    validation: 'Forgetting an appointment, instruction, or intention does not automatically mean it was unimportant to you.',
    deeperExplanation:
      'Working memory helps keep information active while you use it, while prospective memory helps you remember to act later. Both depend on attention, context, and external cues. ADHD can make these processes less reliable, particularly when several steps compete for attention or when the reminder is no longer visible.',
  },
  {
    question: 'Why is switching tasks so difficult?',
    validation: 'Stopping one activity and beginning another can feel like a larger mental shift than other people expect.',
    deeperExplanation:
      'Task switching requires you to disengage from one goal, update the rules in working memory, and activate a new plan. This is part of cognitive flexibility and executive control. Difficulty can be stronger when the current task is absorbing, the next task is unclear, or there is no transition cue.',
  },
];

export default function WhyItFeelsLikeThis() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="Common ADHD Experiences"
      subtitle="Connecting everyday patterns to what research can—and cannot—explain"
      chapterNumber={2}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/welcome')}
      onNext={() => setLocation('/chapter/what-is')}
    >
      <motion.div className="space-y-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">Recognition before explanation</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold text-foreground md:text-6xl">Do any of these patterns feel familiar?</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD can affect attention, self-control, organization, memory, and the consistency of performance. No single experience proves someone has ADHD, but seeing a repeated pattern can make the clinical language easier to understand.
          </p>
        </section>

        <section className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.question}
              className="rounded-2xl border border-sage-green/15 bg-white p-6 shadow-sm md:p-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{experience.question}</h2>
              <p className="mt-4 border-l-4 border-sage-green/40 pl-4 text-lg leading-relaxed text-foreground">
                {experience.validation}
              </p>
              <details className="group mt-5 rounded-xl bg-warm-cream p-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-4 py-3 font-sans font-bold text-foreground transition hover:bg-white/70">
                  Why this may happen
                  <ChevronDown className="h-5 w-5 shrink-0 text-sage-green transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-sage-green/10 px-4 py-4">
                  <p className="leading-relaxed text-foreground">{experience.deeperExplanation}</p>
                </div>
              </details>
            </motion.article>
          ))}
        </section>

        <motion.section
          className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold text-foreground">These experiences are clues, not a diagnosis</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            Similar difficulties can also occur with stress, poor sleep, anxiety, depression, learning differences, trauma, substance use, and medical conditions. ADHD is identified from a persistent developmental pattern, impairment, history, and information across settings—not from relating to one card.
          </p>
        </motion.section>

        <section className="rounded-2xl border border-sage-green/15 bg-white p-8">
          <h2 className="font-serif text-3xl font-bold text-foreground">Managing these difficulties</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Further pages will explain practical ways to manage these difficulties, including treatment, routines, external reminders, environmental changes, skills, and accommodations.
          </p>
        </section>

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

        <motion.section className="text-center py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl font-bold text-foreground">Next: What is ADHD?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Now connect these everyday experiences to the actual definition, diagnostic threshold, and three ADHD presentations.
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
    </ChapterLayout>
  );
}
