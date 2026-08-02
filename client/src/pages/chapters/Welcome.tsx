import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import ChapterLayout from '@/components/ChapterLayout';
import LayeredContent from '@/components/LayeredContent';

export default function Welcome() {
  const [, setLocation] = useLocation();

  const handleNext = () => setLocation('/chapter/why-feels');

  return (
    <ChapterLayout
      title="Welcome"
      subtitle="You're not alone in this"
      chapterNumber={1}
      totalChapters={10}
      onNext={handleNext}
    >
      <motion.div
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Opening section */}
        <section>
          <motion.p
            className="text-xl text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            If you've just been diagnosed with ADHD, you might feel a mix of emotions: relief, confusion, frustration, hope, or maybe all of them at once. That's completely normal. This moment—"I have ADHD. Now what?"—is exactly where this journey begins.
          </motion.p>

          <motion.p
            className="text-lg text-foreground leading-relaxed font-serif"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            This website exists because you deserve clarity, not overwhelm. You deserve to understand your brain without shame. And you deserve to know that nothing is wrong with you—your brain simply works differently.
          </motion.p>
        </section>

        {/* What this is section */}
        <section>
          <motion.h2
            className="text-3xl font-serif font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            What This Is
          </motion.h2>

          <LayeredContent
            layers={[
              {
                title: 'A guided journey',
                description: 'This is not a collection of articles. It\'s an interactive book that builds on itself, chapter by chapter.',
                content: (
                  <div className="space-y-3">
                    <p>Each chapter is designed to build on the previous one, creating a coherent narrative about ADHD, your brain, and what actually helps.</p>
                  </div>
                ),
              },
              {
                title: 'Built for your brain',
                description: 'Every page is designed with ADHD in mind—layered learning, beautiful interactions, and a respectful tone.',
                content: (
                  <div className="space-y-3">
                    <p>Each topic has multiple layers of depth. Click to expand and go as deep as you want. Some days you need the quick version. Other days you want the full neuroscience. You choose.</p>
                  </div>
                ),
              },
              {
                title: 'Evidence-based, not clinical',
                description: 'Everything here is grounded in peer-reviewed research, clinical guidelines, and real experiences.',
                content: (
                  <div className="space-y-3">
                    <p>But it's written in plain language. No jargon. No condescension. Just clear, beautiful explanations of how your brain works.</p>
                    <p className="mt-3">We also acknowledge what we don't know yet. Neuroscience is still evolving, and we're honest about uncertainty.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* How this works section */}
        <motion.section
          className="p-6 rounded-lg bg-white border border-sage-green/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            How to Navigate
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Each chapter in the compass is self-contained. You can start with "Welcome" or jump straight to "Meet Your Brain" if you prefer. There's no required order—just explore what you're curious about.
          </p>
        </motion.section>

        {/* Emotional outcome section */}
        <motion.section
          className="p-8 rounded-lg bg-gradient-to-r from-sage-green/5 to-muted-teal/5 border border-sage-green/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            The Goal
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-4">
            By the end of this journey, we hope you feel something like this:
          </p>
          <p className="text-xl font-serif italic text-sage-green">
            "Nothing is wrong with me. My brain simply works differently, and now I understand why."
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Not toxic positivity. Not the "superpower" narrative. Just clarity, self-understanding, and hope.
          </p>
        </motion.section>

        {/* Ready to begin section */}
        <motion.section
          className="text-center py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Ready to Begin?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The next chapter explores common ADHD experiences and validates what you've been feeling all along. Let's start there.
          </p>
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-sage-green text-white font-semibold hover:bg-sage-green/90 transition-colors duration-300 shadow-lg hover:shadow-xl" style={{color: '#252525'}}
          >
            Next: Why It Feels Like This
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
