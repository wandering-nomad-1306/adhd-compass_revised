import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Mail, Sparkles } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import SiteFooter from '@/components/SiteFooter';

const scatteredTopics = [
  { label: 'executive functioning', x: '8%', y: '21%', rotate: -5 },
  { label: 'medication', x: '70%', y: '18%', rotate: 4 },
  { label: 'focus', x: '13%', y: '65%', rotate: 5 },
  { label: 'emotions', x: '72%', y: '66%', rotate: -4 },
  { label: 'sleep', x: '39%', y: '9%', rotate: 3 },
  { label: 'diagnosis', x: '42%', y: '77%', rotate: -3 },
  { label: 'time', x: '82%', y: '40%', rotate: 6 },
  { label: 'working memory', x: '4%', y: '43%', rotate: -6 },
] as const;


export default function About() {
  const [, setLocation] = useLocation();
  const reducedMotion = useReducedMotion();
  const [gathered, setGathered] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start 78%', 'end 35%'],
  });
  const threadProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.45 });

  const topicPositions = useMemo(
    () => scatteredTopics.map((topic, index) => ({
      ...topic,
      gatheredX: `${43 + (index % 3) * 7}%`,
      gatheredY: `${44 + Math.floor(index / 3) * 7}%`,
    })),
    [],
  );

  const sections = [
    {
      id: 'sources',
      eyebrow: 'Sources',
      title: 'Where the information comes from',
      body: (
        <>
          <p>
            Government and official health resources are given the most weight so the information stays credible and research-backed. Other resources are used when they explain a difficult idea particularly well, but health claims are checked against stronger sources.
          </p>
          <p className="mt-5">Every substantive ADHD page shows the sources used for that page, so you can read further whenever you want to.</p>
        </>
      ),
    },
    {
      id: 'medical',
      eyebrow: 'Medical information',
      title: 'What this site can and cannot do',
      body: (
        <p>
          ADHD Compass is educational. It can help you understand ADHD, the language around it, and the options that exist. It cannot diagnose ADHD or decide which treatment or medication is right for you. Individual medical decisions belong with an appropriate qualified health professional.
        </p>
      ),
    },
    {
      id: 'privacy',
      eyebrow: 'About the site',
      title: 'Independent and private',
      body: (
        <>
          <p>
            ADHD Compass is an independent website. It is not sponsored or endorsed by any organization or company.
          </p>
          <p className="mt-5">
            You do not need to log in or create an ADHD profile to use the site, and ADHD Compass does not ask you to submit your symptoms or medication history.
          </p>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3e9] text-foreground">
      <button
        type="button"
        onClick={() => setLocation('/')}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-sage-green/15 bg-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </button>

      <section className="relative flex min-h-[92svh] items-center justify-center px-5 py-24 sm:px-8">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(72vw,42rem)] w-[min(72vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage-green/10"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(52vw,31rem)] w-[min(52vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-muted-teal/10"
            animate={reducedMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -left-24 top-[15%] h-64 w-64 rounded-full bg-[#dce7d8]/35 blur-3xl"
            animate={reducedMotion ? undefined : { x: [0, 45, 0], y: [0, -24, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-20 bottom-[12%] h-72 w-72 rounded-full bg-[#dce8ee]/35 blur-3xl"
            animate={reducedMotion ? undefined : { x: [0, -40, 0], y: [0, 26, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          {topicPositions.map((topic, index) => (
            <motion.span
              key={topic.label}
              className="absolute rounded-full border border-sage-green/15 bg-white/75 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
              style={{ left: topic.x, top: topic.y }}
              animate={gathered
                ? { left: topic.gatheredX, top: topic.gatheredY, rotate: 0, scale: 0.92, opacity: 0.74 }
                : reducedMotion
                  ? { rotate: topic.rotate }
                  : { rotate: [topic.rotate - 1, topic.rotate + 1, topic.rotate - 1], y: [0, -5, 0] }}
              transition={gathered
                ? { duration: 0.65, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }
                : { duration: 4.5 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
            >
              {topic.label}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">Why ADHD Compass exists</p>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-[0.98] sm:text-6xl md:text-7xl">
            The information was there.
            <span className="block text-sage-green">It was just everywhere.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            After I was diagnosed with ADHD, I went online looking for answers. I found good resources—but they were scattered across different sites, different terms, and different levels of detail.
          </p>
          <button
            type="button"
            onClick={() => setGathered((value) => !value)}
            className="mt-8 rounded-full border border-sage-green/25 bg-white/85 px-5 py-2.5 text-sm font-bold text-sage-green shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20"
          >
            {gathered ? 'Scatter the pieces' : 'Bring the pieces together'}
          </button>
        </motion.div>
      </section>

      <section ref={storyRef} className="relative mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <div className="pointer-events-none absolute bottom-24 left-0 top-2 hidden w-px bg-[#4f7659]/10 sm:block" aria-hidden="true">
          <motion.div className="h-full w-px origin-top bg-gradient-to-b from-[#4f7659] via-[#7ca0a6] to-[#c49178]" style={{ scaleY: reducedMotion ? 1 : threadProgress }} />
        </div>

        <motion.div
          className="space-y-7 font-serif text-[1.45rem] leading-[1.6] text-foreground sm:text-[1.7rem]"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            The part that stayed with me was <em>executive functioning</em>. I only knew to look it up because my therapist mentioned it. Once I had the words, suddenly there was useful information everywhere. Without those words, I probably would never have known what to search for in the first place.
          </p>
          <p>
            That felt backwards. You should not have to already understand ADHD before you can find the information that helps you understand ADHD.
          </p>
          <p>
            So I made ADHD Compass for anyone who has been diagnosed, thinks ADHD might be relevant to their life, or simply wants to understand it better. The aim is simple: put the important pieces in one place, explain them clearly, and let you explore them in whatever order makes sense to you.
          </p>
        </motion.div>

        <div className="mt-20 space-y-0">
          {sections.map((section, index) => (
            <motion.section
              id={section.id}
              key={section.id}
              className="group relative scroll-mt-24 border-t border-sage-green/15 py-16 sm:py-20"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.62, delay: reducedMotion ? 0 : index * 0.035 }}
            >
              <motion.div
                className="pointer-events-none absolute -left-12 top-14 hidden h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:block"
                style={{ backgroundColor: index % 2 ? '#dce8ee' : '#dce7d8' }}
                aria-hidden="true"
              />
              <motion.span
                className="mb-6 block h-3 w-3 rounded-full bg-sage-green"
                animate={reducedMotion ? undefined : { scale: [1, 1.4, 1], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-sage-green sm:text-base">{section.eyebrow}</p>
              <h2 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] sm:text-6xl">{section.title}</h2>
              <motion.div
                className="mt-6 max-w-3xl font-serif text-xl leading-[1.65] text-muted-foreground sm:text-[1.4rem]"
                whileHover={reducedMotion ? undefined : { x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {section.body}
              </motion.div>
            </motion.section>
          ))}

          <motion.section
            id="contact"
            className="relative scroll-mt-24 border-y border-sage-green/15 py-16 sm:py-20"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62 }}
          >
            <motion.div
              className="absolute right-2 top-14 hidden sm:block"
              animate={reducedMotion ? undefined : { rotate: [0, 7, -5, 0], y: [0, -5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sage-green/15 bg-white/60 text-sage-green shadow-sm">
                <Sparkles className="h-5 w-5" />
              </span>
            </motion.div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-sage-green sm:text-base">Contact</p>
            <h2 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] sm:text-6xl">Corrections and feedback</h2>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-[1.65] text-muted-foreground sm:text-[1.4rem]">
              If you find something inaccurate, outdated, unclear, broken, or difficult to use, send a note. Accessibility feedback is welcome too.
            </p>
            <motion.a
              href="mailto:myadhdcompass@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-green px-5 py-3 font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20"
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              <Mail className="h-4 w-4" /> myadhdcompass@gmail.com
            </motion.a>
          </motion.section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
