import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import InteractiveCompass from '@/components/InteractiveCompass';
import { useEffect, useState } from 'react';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  const [, setLocation] = useLocation();
  const [showCompass, setShowCompass] = useState(false);

  useEffect(() => {
    // Trigger compass animation after hero section
    const timer = setTimeout(() => setShowCompass(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (chapterId: string) => {
    setLocation(`/chapter/${chapterId}`);
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/hero-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src="/images/adhd-compass-logo.png"
              alt="ADHD Compass Logo"
              className="w-20 h-20"
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Welcome to
            <br />
            <span className="text-foreground">ADHD Compass</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore evidence-based information about ADHD at your own pace. Navigate to any topic you're curious about—there's no required order. Just clarity.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-transparent px-8 py-3 font-semibold text-[#231d17] shadow-lg transition-colors duration-300 hover:bg-white/15 hover:shadow-xl"
            >
              Begin Your Journey
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-foreground/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.section>

      {/* Interactive Compass Section */}
      {showCompass && (
        <motion.section
          id="compass-section"
          className="relative h-[100svh] min-h-[620px] bg-warm-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <InteractiveCompass onNavigate={handleNavigate} />
        </motion.section>
      )}

      {/* Info cards section */}
      <motion.section
        className="py-20 px-6 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-foreground">
            Explore by Topic
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'Your Brain',
                description: 'Understand the neuroscience behind ADHD—how your brain actually works and why it feels the way it does.',
              },
              {
                icon: '💡',
                title: 'Your Experiences',
                description: 'Learn why you struggle with certain things and excel at others.',
              },
              {
                icon: '🛠️',
                title: 'What Helps',
                description: 'Practical, evidence-informed strategies for reducing everyday difficulties and making tasks easier to manage.',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="rounded-lg border border-border bg-white p-8 transition-colors duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Design philosophy section */}
      <motion.section
        className="bg-transparent px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">
            Built for Your Brain
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            ADHD Compass is an evidence-based information resource designed specifically for people with ADHD. All content is grounded in clinical research and best practices. We provide information to help you understand yourself better—not medical advice.
          </p>
          <p className="text-base text-muted-foreground italic">
            "Nothing is wrong with me. My brain simply works differently, and now I understand why."
          </p>
        </div>
      </motion.section>
      <SiteFooter />
    </div>
  );
}
