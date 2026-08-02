import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import LayeredContent from '@/components/LayeredContent';
import BrainNetworkViz from '@/components/BrainNetworkViz';

export default function MeetYourBrain() {
  const [, setLocation] = useLocation();

  const handlePrevious = () => setLocation('/chapter/why-feels');
  const handleNext = () => setLocation('/chapter/what-is');

  const networks = [
    {
      title: 'Default Mode Network (DMN)',
      color: 'sage-green',
      shortExplanation: 'This network is active when your mind wanders or you\'re thinking about yourself. In ADHD, it doesn\'t quiet down when you need to focus.',
      deeperExplanation: 'The DMN includes regions like the medial prefrontal cortex and posterior cingulate. In neurotypical brains, the DMN deactivates during focused tasks. In ADHD brains, it stays active, leading to mind-wandering and difficulty sustaining attention.',
    },
    {
      title: 'Task Positive Network (TPN)',
      color: 'muted-teal',
      shortExplanation: 'This network activates when you\'re focused on external tasks. It\'s your "work mode." In ADHD, the DMN interferes with it.',
      deeperExplanation: 'The TPN includes the dorsolateral prefrontal cortex and posterior parietal cortex. Normally, the DMN and TPN work in opposition—one activates while the other quiets. In ADHD, this anti-correlation is weakened, causing interference.',
    },
    {
      title: 'Salience Network (SN)',
      color: 'subtle-blue',
      shortExplanation: 'This network decides what\'s important and worth paying attention to. In ADHD, it prioritizes novelty and urgency over importance.',
      deeperExplanation: 'The SN includes the anterior insula and anterior cingulate cortex. It acts as a switch between the DMN and TPN. In ADHD, the SN is biased toward novel and urgent stimuli, making it hard to focus on important but boring tasks.',
    },
  ];

  const executiveFunctions = [
    {
      title: 'Inhibition',
      description: 'The ability to stop yourself from acting on impulses. In ADHD, this is harder, leading to impulsivity.',
    },
    {
      title: 'Working Memory',
      description: 'Holding and manipulating information temporarily. Deficits here lead to forgetfulness and difficulty following multi-step instructions.',
    },
    {
      title: 'Task Switching',
      description: 'Moving between different tasks or mental sets. This is cognitively expensive in ADHD brains.',
    },
    {
      title: 'Planning & Organization',
      description: 'Breaking down goals into steps and organizing them. ADHD brains struggle with this, especially for boring tasks.',
    },
  ];

  return (
    <ChapterLayout
      title="Meet Your Brain"
      subtitle="The neuroscience of ADHD"
      chapterNumber={3}
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
            This is the heart of understanding ADHD. Not as a disorder, but as a difference in how your brain is wired. The struggles you've experienced aren't character flaws—they're the result of specific neurobiological differences.
          </motion.p>

          <motion.p
            className="text-lg text-foreground leading-relaxed font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's explore the key brain systems involved in ADHD and understand how they work differently.
          </motion.p>
        </section>

        {/* Brain regions interactive */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">
            Key Brain Regions in ADHD
          </h2>
          <BrainNetworkViz />
        </motion.section>

        {/* Brain Networks */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-8 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Brain Networks: The Big Picture
          </motion.h2>

          <div className="space-y-6">
            {networks.map((network, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                    {network.title}
                  </h3>
                </div>

                <LayeredContent
                  layers={[
                    {
                      title: 'The Simple Version',
                      description: '',
                      content: <p className="text-foreground">{network.shortExplanation}</p>,
                    },
                    {
                      title: 'How It Works',
                      description: '',
                      content: <p className="text-foreground">{network.deeperExplanation}</p>,
                    },
                    {
                      title: 'What This Means for You',
                      description: '',
                      content: (
                        <p className="text-foreground">
                          Understanding these networks explains why you struggle with sustained attention on boring tasks but can hyperfocus on interesting ones. Your brain is not broken—it's just wired to prioritize differently.
                        </p>
                      ),
                    },
                  ]}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dopamine */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-8 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Dopamine: The Motivation Molecule
          </motion.h2>

          <LayeredContent
            layers={[
              {
                title: 'What is dopamine?',
                description: '',
                content: (
                  <p className="text-foreground">
                    Dopamine is a neurotransmitter that plays a crucial role in motivation, reward, and attention. In ADHD, dopamine levels and dynamics are different.
                  </p>
                ),
              },
              {
                title: 'Tonic vs. Phasic Dopamine',
                description: '',
                content: (
                  <div className="space-y-3 text-foreground">
                    <p>
                      <strong>Tonic dopamine</strong> is the steady, background level. In ADHD, tonic dopamine is lower, reducing baseline motivation and making it hard to start tasks without external pressure.
                    </p>
                    <p>
                      <strong>Phasic dopamine</strong> is the burst released in response to novelty, reward, or urgency. In ADHD, phasic dopamine is more reactive, which is why deadlines and interesting tasks suddenly become possible.
                    </p>
                  </div>
                ),
              },
              {
                title: 'The Interest-Based Nervous System',
                description: '',
                content: (
                  <p className="text-foreground">
                    Your brain is driven by an interest-based nervous system, not an importance-based one. This means your dopamine system engages when something is novel, challenging, or immediately rewarding—not when it's important but boring. This is not laziness. It's neurobiology.
                  </p>
                ),
              },
            ]}
          />
        </section>

        {/* Executive Functions */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-8 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Executive Functions: Your Brain's Control Center
          </motion.h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            Executive functions are the cognitive processes that let you plan, organize, and execute goal-directed behavior. In ADHD, these are less efficient.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {executiveFunctions.map((fn, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-white border border-sage-green/10 hover:border-sage-green/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif font-bold text-lg mb-2 text-foreground">{fn.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fn.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Emotional Dysregulation */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-8 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Emotional Dysregulation
          </motion.h2>

          <LayeredContent
            layers={[
              {
                title: 'What is it?',
                description: '',
                content: (
                  <p className="text-foreground">
                    Emotional dysregulation means your emotions are more intense and harder to control. You might cry easily, get angry quickly, or struggle to calm down.
                  </p>
                ),
              },
              {
                title: 'Why does it happen?',
                description: '',
                content: (
                  <p className="text-foreground">
                    Your amygdala (emotion center) is more reactive, and your prefrontal cortex (regulation center) has less ability to calm it down. This is a neurobiological difference, not a character flaw.
                  </p>
                ),
              },
              {
                title: 'What you can do',
                description: '',
                content: (
                  <p className="text-foreground">
                    Strategies like deep breathing, physical movement, and external structure can help. Medication can also help by improving prefrontal cortex function. We'll explore these in later chapters.
                  </p>
                ),
              },
            ]}
          />
        </section>

        {/* Takeaway */}
        <motion.section
          className="p-8 rounded-lg bg-gradient-to-r from-sage-green/5 to-muted-teal/5 border border-sage-green/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            The Big Picture
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            ADHD is not a deficit of attention. It's a difference in how your brain prioritizes, regulates dopamine, and manages executive functions. Your brain is wired to be driven by interest, novelty, and urgency rather than importance.
          </p>
          <p className="text-foreground leading-relaxed">
            This explains everything you've experienced. And in the next chapters, we'll explore what actually helps.
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
            Next: What is ADHD?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Now that you understand how your brain works, let's explore the formal diagnosis and what it means.
          </p>
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-sage-green text-white font-semibold hover:bg-sage-green/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Next: What is ADHD?
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
