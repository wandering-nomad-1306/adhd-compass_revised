import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import LayeredContent from '@/components/LayeredContent';

interface Experience {
  question: string;
  validation: string;
  deeperExplanation: string;
}

const experiences: Experience[] = [
  {
    question: 'Why can\'t I just start?',
    validation: 'Task initiation paralysis is one of the most frustrating parts of ADHD. You know what you need to do. You might even want to do it. But something stops you from beginning.',
    deeperExplanation: 'This relates to dopamine dynamics. Your brain has lower baseline (tonic) dopamine, which reduces intrinsic motivation. You rely on external urgency (deadlines, someone watching) or immediate interest to trigger the phasic dopamine spike needed to start. Tasks that are boring, important but not urgent, or lack immediate reward are hardest to begin.',
  },
  {
    question: 'Why do deadlines suddenly work?',
    validation: 'You might notice you can hyperfocus and complete tasks at the last minute, even though you struggled to start them days earlier. This isn\'t laziness—it\'s how your brain is wired.',
    deeperExplanation: 'Deadlines activate the amygdala (threat detection) and create urgency, which floods your system with dopamine and adrenaline. This is the external structure your brain needs. It\'s why you can suddenly focus when the pressure is on, even though you couldn\'t focus for weeks before.',
  },
  {
    question: 'Why is emotional regulation so hard?',
    validation: 'You might feel emotions more intensely than others. Small frustrations can feel overwhelming. You might cry easily, get angry quickly, or struggle to calm down once you\'re upset.',
    deeperExplanation: 'Emotional dysregulation in ADHD involves differences in the amygdala and prefrontal cortex connectivity. Your amygdala (emotion center) is more reactive, and your prefrontal cortex (regulation center) has less ability to calm it down. This isn\'t a character flaw—it\'s neurobiology.',
  },
  {
    question: 'Why do I hyperfocus on some things but can\'t focus on others?',
    validation: 'You might be able to spend 8 hours on a video game or hobby but can\'t focus on work for 30 minutes. This isn\'t inconsistency—it\'s your interest-based nervous system at work.',
    deeperExplanation: 'Unlike neurotypical brains that can prioritize based on importance, ADHD brains are driven by an interest-based nervous system. When a task is novel, challenging, or inherently interesting, it triggers dopamine release and you can hyperfocus. Boring tasks, regardless of importance, don\'t trigger this response.',
  },
  {
    question: 'Why do I forget everything?',
    validation: 'You might forget conversations, appointments, or tasks you just agreed to. Your working memory feels like a leaky bucket.',
    deeperExplanation: 'Working memory deficits in ADHD relate to prefrontal cortex function and dopamine availability. Without sufficient dopamine, information doesn\'t get properly encoded into working memory. External systems (calendars, reminders, written notes) aren\'t workarounds—they\'re necessary accommodations.',
  },
  {
    question: 'Why is it so hard to switch tasks?',
    validation: 'You might struggle to shift from one task to another, even when you need to. You get stuck in one mode and can\'t easily pivot.',
    deeperExplanation: 'Task switching involves the anterior cingulate cortex and prefrontal cortex working together. In ADHD, this switching mechanism is less efficient. You might need a break, a physical movement, or external cues to successfully transition between tasks.',
  },
];

export default function WhyItFeelsLikeThis() {
  const [, setLocation] = useLocation();

  const handlePrevious = () => setLocation('/chapter/welcome');
  const handleNext = () => setLocation('/chapter/brain');

  return (
    <ChapterLayout
      title="Why It Feels Like This"
      subtitle="Validating your experiences through science"
      chapterNumber={2}
      totalChapters={10}
      onPrevious={handlePrevious}
      onNext={handleNext}
    >
      <motion.div
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Introduction */}
        <section>
          <motion.p
            className="text-xl text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Before we dive into the neuroscience, let's talk about what ADHD actually feels like. These are the experiences that probably brought you here—the frustrations, the struggles, the things that don't make sense.
          </motion.p>

          <motion.p
            className="text-lg text-foreground leading-relaxed font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The first thing to know: these experiences are real. They're not character flaws. They're not laziness. They're not you being broken. They're how your brain is wired.
          </motion.p>
        </section>

        {/* Experiences */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-8 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Common ADHD Experiences
          </motion.h2>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                    {exp.question}
                  </h3>
                  <p className="text-lg text-sage-green font-semibold mb-4 leading-relaxed">
                    ✓ {exp.validation}
                  </p>
                </div>

                <LayeredContent
                  layers={[
                    {
                      title: 'Why This Happens',
                      description: '',
                      content: <p className="text-foreground">{exp.deeperExplanation}</p>,
                    },
                    {
                      title: 'What You Can Do',
                      description: '',
                      content: (
                        <div className="space-y-3 text-foreground">
                          <p>We'll explore specific strategies in later chapters. For now, know that this isn't something to fix through willpower alone. External systems, structure, and accommodations aren't crutches—they're how your brain works best.</p>
                        </div>
                      ),
                    },
                  ]}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* The pattern */}
        <motion.section
          className="p-8 rounded-lg bg-gradient-to-r from-sage-green/5 to-muted-teal/5 border border-sage-green/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            The Pattern Behind It All
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            If you notice a theme in these experiences, you're right. Many of them come down to the same core issue: your brain is driven by interest, novelty, and urgency rather than importance. Your motivation system works differently.
          </p>
          <p className="text-foreground leading-relaxed">
            This isn't a flaw. It's just different. And in the next chapter, we'll explore the neuroscience that explains why.
          </p>
        </motion.section>

        {/* Validation section */}
        <motion.section
          className="p-8 rounded-lg bg-white border border-sage-green/20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            You Are Not Alone
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Millions of people experience these exact same struggles. You're not broken. You're not lazy. You're not making excuses. Your brain simply works differently, and that's okay.
          </p>
          <p className="text-foreground italic">
            The next chapter explains the neuroscience behind these experiences. You'll understand not just what's happening, but why.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="text-center py-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Ready for the Neuroscience?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            In the next chapter, we'll explore your brain—the networks, the neurotransmitters, and the mechanisms that explain everything you just read.
          </p>
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-sage-green text-white font-semibold hover:bg-sage-green/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Next: Meet Your Brain
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </motion.section>
      </motion.div>
    </ChapterLayout>
  );
}
