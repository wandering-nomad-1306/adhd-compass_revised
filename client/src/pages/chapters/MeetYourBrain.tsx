import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  BookOpenCheck,
  Eye,
  Gauge,
  Info,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BrainNetworkViz from '@/components/BrainNetworkViz';
import ChapterLayout from '@/components/ChapterLayout';
import SourceList from '@/components/SourceList';

const brainSystems = [
  {
    id: 'control',
    icon: Target,
    title: 'Executive control',
    subtitle: 'Keeping a goal active and guiding behaviour toward it',
    regions: 'Prefrontal and frontoparietal systems, working with the striatum and other regions',
    job: 'These systems help keep a future goal active long enough to guide the present moment. They support working memory, inhibition, planning, error monitoring, and flexible adjustment when the situation changes. This is about access to control—not intelligence or knowing the rule.',
    research:
      'ADHD research repeatedly finds group-level differences in activation and connectivity across frontal-control circuits. A large NIH-supported analysis published in 2024 also linked ADHD symptoms in youth with atypical interactions between the frontal cortex and deeper information-processing regions.',
    daily:
      'The result may look like inconsistent inhibition, losing track of a plan, difficulty beginning a multi-step task, or knowing a rule but failing to use it at the right moment.',
    limit:
      'Executive-function test results vary widely. Some people with ADHD perform within an average range on a structured test but struggle when everyday tasks are long, unstructured, or unsupported.',
  },
  {
    id: 'attention',
    icon: Eye,
    title: 'Attention and salience',
    subtitle: 'Selecting what matters now and shifting between internal and external information',
    regions: 'Frontal and parietal attention systems, anterior cingulate, insula, and connected sensory regions',
    job: 'Attention is not one on/off switch. The brain must select what matters, reduce competition from other signals, sustain the current goal, and redirect attention when priorities change. ADHD often affects the regulation and consistency of attention rather than the total ability to focus.',
    research:
      'Neuroimaging studies associate ADHD with altered coordination across attention, salience, and cognitive-control networks. These are average differences across groups—not a single pattern shared by every person.',
    daily:
      'This may contribute to distractibility, variable response speed, missed details, or attention that is strong in one context and difficult to sustain in another.',
    limit:
      'Being distracted is not specific to ADHD. Sleep loss, anxiety, depression, stress, pain, medication effects, and many other conditions can disrupt the same systems.',
  },
  {
    id: 'reward',
    icon: Sparkles,
    title: 'Reward and motivation',
    subtitle: 'Estimating effort, reward, delay, and whether an action is worth starting',
    regions: 'The striatum and connected frontal circuits involved in reward learning, motivation, and action selection',
    job: 'Reward systems help estimate effort, expected value, delay, and which action is worth starting. Immediate and certain feedback usually has more influence on present behaviour than a distant or unclear payoff. This is not a lack of caring; it is a difference in how strongly a future outcome guides action now.',
    research:
      'ADHD has been associated with differences in reward processing and, in some studies, a stronger preference for immediate rewards over delayed rewards. This can help explain why context and feedback change performance.',
    daily:
      'A repetitive task with a distant payoff may be harder to initiate or sustain, while immediate feedback, novelty, visible progress, or urgency can make the same person’s performance look very different.',
    limit:
      'This does not mean people with ADHD only care about fun or cannot value long-term goals. It describes how effectively a goal influences behaviour in a particular moment.',
  },
  {
    id: 'coordination',
    icon: Network,
    title: 'Network coordination',
    subtitle: 'Moving between mind-wandering, task focus, and monitoring what deserves attention',
    regions: 'Default-mode, frontoparietal, salience, and task-related networks',
    job: 'The default-mode network supports internally focused thought, memory, and imagination. Task-control networks support externally directed work, while salience systems help decide which network should take priority. The useful question is not whether one network is active, but whether switching and coordination match the task.',
    research:
      'Studies have reported altered communication between default-mode and control networks in ADHD. One proposed explanation is that internally directed activity may intrude during tasks that require sustained external attention.',
    daily:
      'This may feel like losing the thread of a task, drifting into unrelated thought, or repeatedly needing to re-enter “work mode.”',
    limit:
      'The default-mode network is not bad and mind-wandering is not a defect. It supports memory, imagination, and self-reflection. The issue is coordination and timing, not eliminating internal thought.',
  },
] as const;


const chemicalSystems = [
  {
    id: 'dopamine',
    name: 'Dopamine',
    accent: '#5b6f96',
    overview:
      'Dopamine is a neuromodulator. It changes how strongly networks respond to information and how the brain learns from outcomes; it is not a single “motivation chemical” and ADHD is not explained by a simple global dopamine shortage.',
    role:
      'In frontal and striatal circuits, dopamine contributes to action selection, reward prediction, learning from feedback, movement, effort allocation and the stability of goal-relevant information. Different dopamine receptors and pathways can have different effects, so the useful question is how dopamine is regulated in a particular circuit rather than whether the whole brain has “too little.”',
    adhd:
      'Dopamine is clearly relevant to ADHD, but the evidence does not support one universal dopamine abnormality in every person. Research has reported differences in dopamine transporters, receptors, synthesis, release and reward-related signalling, while other studies do not find the same pattern. A 2024 review concluded that altered dopamine regulation remains plausible but that the classic simple “low dopamine” hypothesis is too narrow.',
    daily:
      'Reward-related circuits help explain why immediate feedback, visible progress, novelty or urgency may make an action easier to start or sustain, while a distant payoff may exert less influence in the present moment. That is a possible mechanism, not a statement that a person does not value long-term goals.',
    medication:
      'Stimulant medications increase catecholamine signalling, including dopamine, in relevant circuits. Their clinical effect is not the same as “adding motivation”; they can improve the conditions under which attention, inhibition and goal-directed behaviour are regulated.',
    caution:
      'There is no routine dopamine test that diagnoses ADHD. Dopamine findings are group-level research results and vary by brain region, receptor, age, medication history and study method.',
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    accent: '#477f72',
    overview:
      'Norepinephrine is another neuromodulator that is especially important for alertness and prefrontal control. It helps task-relevant signals stand out from competing activity and supports the stability of working-memory representations.',
    role:
      'In the prefrontal cortex, norepinephrine helps regulate attention, working memory and response control. Its effects depend strongly on receptor type and arousal level: an appropriate range can strengthen useful network activity, while very low alertness or very high stress can make deliberate control less reliable.',
    adhd:
      'ADHD research has implicated norepinephrine transmission and attention networks, although the evidence is smaller than the dopamine literature and does not define one universal abnormality. The important point is that dopamine and norepinephrine interact in frontal control systems rather than operating as two separate switches.',
    daily:
      'This helps explain why fatigue, stress and arousal can change how consistently a person can hold instructions in mind, resist a distraction or return attention to a goal. It does not mean that every fluctuation in alertness is an ADHD symptom.',
    medication:
      'Several ADHD medications influence norepinephrine signalling. Stimulants affect catecholamine availability, atomoxetine primarily blocks norepinephrine reuptake, and alpha-2 agonists act on adrenergic receptors. Different mechanisms can improve overlapping functions without proving that ADHD is caused by a single chemical deficit.',
    caution:
      'More norepinephrine is not automatically better. High stress can impair prefrontal function, and medication effects depend on dose, receptor activity, individual biology and clinical context.',
  },
] as const;

function BrainSystemExplorer() {
  const [selected, setSelected] = useState(0);
  const active = brainSystems[selected];
  const Icon = active.icon;

  return (
    <div className="grid min-w-0 gap-4 lg:gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <div className="grid grid-cols-2 gap-2 lg:block lg:space-y-3" role="tablist" aria-label="Brain systems associated with ADHD">
        {brainSystems.map((system, index) => {
          const SystemIcon = system.icon;
          const isActive = selected === index;
          return (
            <button
              key={system.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(index)}
              className={`flex min-h-12 w-full min-w-0 items-center justify-center rounded-xl border px-3 py-2.5 text-center font-sans text-sm font-bold leading-tight transition-all lg:min-h-0 lg:justify-start lg:gap-4 lg:rounded-2xl lg:p-4 lg:text-left lg:text-base ${
                isActive
                  ? 'border-sage-green bg-sage-green/[0.08] shadow-sm'
                  : 'border-sage-green/15 bg-white hover:border-sage-green/40'
              }`}
            >
              <span className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-full lg:flex ${isActive ? 'bg-sage-green text-warm-cream' : 'bg-warm-cream text-sage-green'}`}>
                <SystemIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block break-words font-bold text-foreground">{system.title}</span>
                <span className="mt-1 hidden text-sm leading-snug text-muted-foreground lg:block">{system.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="min-w-0 overflow-hidden rounded-3xl border border-sage-green/15 bg-white p-5 shadow-sm sm:p-7 md:p-8 lg:overflow-visible"
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 text-sage-green">
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-green">Connected system</p>
              <h3 className="mt-1 break-words font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">{active.title}</h3>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {[
              ['Main regions and circuits', active.regions],
              ['What the system normally does', active.job],
              ['What research suggests in ADHD', active.research],
              ['How this may appear in daily life', active.daily],
            ].map(([label, text]) => (
              <div key={label} className="min-w-0 border-l-2 border-sage-green/30 pl-4">
                <p className="font-bold text-foreground">{label}</p>
                <p className="mt-2 break-words leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex gap-3 rounded-2xl bg-warm-cream p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sage-green" />
            <div>
              <p className="font-bold text-foreground">Important limit</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.limit}</p>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function ChemicalSignalExplorer() {
  const [selected, setSelected] = useState(0);
  const active = chemicalSystems[selected];

  return (
    <div className="overflow-hidden rounded-3xl border border-[#4f7659]/15 bg-white shadow-sm">
      <div className="flex border-b border-sage-green/10 bg-warm-cream/50 p-2" role="tablist" aria-label="Chemical messenger explorer">
        {chemicalSystems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected === index}
            onClick={() => setSelected(index)}
            className="flex-1 rounded-xl px-4 py-3 text-sm font-bold transition sm:text-base"
            style={selected === index ? { backgroundColor: item.accent, color: 'white', boxShadow: `0 6px 18px ${item.accent}25` } : { color: '#4b514d' }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-7 md:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: active.accent }}>Neurotransmitter / neuromodulator</p>
            <h3 className="mt-2 font-serif text-3xl font-bold text-foreground">{active.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-foreground">{active.overview}</p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              ['What it normally does', active.role],
              ['How it connects to ADHD', active.adhd],
              ['What this can look like in daily life', active.daily],
              ['Why medication affects it', active.medication],
            ].map(([title, text]) => (
              <section key={title} className="rounded-2xl border border-sage-green/10 bg-[#fbf8f0] p-5">
                <h4 className="font-bold text-foreground">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </section>
            ))}
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl border border-[#a96952]/15 bg-[#a96952]/[0.05] p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#a96952]" />
            <div>
              <p className="font-bold text-foreground">Important limit</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{active.caution}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-sage-green/15 bg-sage-green/[0.05] p-5">
            <p className="font-bold text-foreground">How dopamine and norepinephrine fit together</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Both systems influence prefrontal and connected networks. Dopamine is particularly important in reward learning, action selection and frontal-striatal signalling; norepinephrine is especially important for alertness and strengthening task-relevant prefrontal signals. Their functions overlap, and neither chemical alone explains ADHD.
            </p>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

export default function MeetYourBrain() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayout
      title="Meet Your Brain"
      subtitle="Brain systems, neurochemistry, and executive functions"
      chapterNumber={4}
      totalChapters={10}
      onPrevious={() => setLocation('/chapter/what-is')}
      onNext={() => setLocation('/chapter/what-helps')}
    >
      <motion.div className="space-y-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <section className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sage-green">ADHD neuroscience</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
            ADHD and the brain
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ADHD research examines how brain development, connected networks, executive control, attention, reward processing, and chemical signalling relate to symptoms. The findings describe patterns across groups and cannot diagnose one individual.
          </p>
        </section>

        <motion.section id="research-limits" data-page-label="Research limits"
          className="rounded-2xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.08] to-muted-teal/[0.08] p-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <BrainCircuit className="mt-1 h-7 w-7 shrink-0 text-sage-green" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Research limits</h2>
              <p className="mt-3 leading-relaxed text-foreground">
                “Associated with ADHD” means researchers found an average relationship—not that every person has the same brain pattern, that the pattern causes every symptom, or that imaging can confirm a diagnosis. ADHD remains a clinical diagnosis based on development, symptoms, impairment, and context.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section id="brain-map" data-page-label="Brain map" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Interactive map</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Brain regions and connections</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Explore approximate brain regions, then switch to the connections view to see how frontal, parietal, striatal, salience, and cerebellar systems work together.
            </p>
          </div>
          <BrainNetworkViz />
        </motion.section>

        <section id="brain-systems" data-page-label="Brain systems">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">From regions to circuits</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Four systems that make the ADHD brain easier to understand</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Select a system to see its normal job, what studies suggest, how it can appear in daily life, and the limit of the explanation.
            </p>
          </div>
          <BrainSystemExplorer />
        </section>

        <section id="neurochemistry" data-page-label="Neurochemistry">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Neurochemistry</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">Dopamine and norepinephrine</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Dopamine and norepinephrine influence attention, working memory, reward, arousal and behavioural control through overlapping brain circuits. The key is regulation within specific networks—not a simple “chemical shortage.”
            </p>
          </div>
          <ChemicalSignalExplorer />
        </section>

        <section id="executive-functions" data-page-label="Executive functions">
          <div className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">Executive functions</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">How goals become actions</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Executive functions are the mental processes used to keep a goal active, hold information in working memory, pause a response, organize steps, estimate time, begin, monitor, switch, and finish. These difficulties are central to many people’s experience of ADHD, but they are not unique to ADHD and they do not appear in the same pattern for everyone.
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green">
                <BookOpenCheck className="h-7 w-7" />
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLocation('/chapter/brain/executive-functions')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sage-green px-5 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Explore executive functions
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section id="performance" data-page-label="Why performance varies" className="rounded-3xl border border-[#4f7659]/15 bg-white p-7 shadow-sm md:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4f7659]/10 text-[#4f7659]">
              <Activity className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4f7659]">Context and performance</p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-foreground">Why performance varies</h2>
            </div>
          </div>

          <p className="mt-5 text-lg leading-relaxed text-foreground">
            The same person can perform very differently across situations because the amount of executive control a task requires and the support available at that moment both change.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Task demands',
                text: 'Long duration, repetition, delayed reward, unclear steps, interruptions, and too many choices increase the amount of control the task requires.',
              },
              {
                icon: Gauge,
                title: 'Current state',
                text: 'Sleep, stress, mood, hunger, pain, arousal, and medication can change how consistently attention and working memory are available.',
              },
              {
                icon: SlidersHorizontal,
                title: 'External support',
                text: 'Visible instructions, immediate feedback, shorter steps, reminders, accountability, and a quieter environment can reduce the load on executive functions.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl bg-[#fbf7ed] p-5">
                <Icon className="h-5 w-5 text-[#4f7659]" />
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#4f7659]/15 bg-[#4f7659]/[0.05] p-5">
            <p className="font-bold text-foreground">What this means</p>
            <p className="mt-2 break-words leading-relaxed text-muted-foreground">
              Doing something successfully once shows that the skill exists. It does not prove that the same level of access will be available under different demands, stress, fatigue, or support. Performance variability is not the same as lack of effort.
            </p>
          </div>
        </section>

        <section id="emotion-movement" data-page-label="Emotion and movement" className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-foreground">Emotional regulation</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              Difficulty regulating emotion is common in ADHD and can be highly impairing, although it is not one of the core DSM symptom lists. Executive-control, reward, and emotion systems interact, so frustration may rise quickly and take longer to settle.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              It should not automatically be attributed to ADHD. Anxiety, depression, trauma, sleep disruption, autism, bipolar disorder, and other conditions can affect emotions and may require separate assessment.
            </p>
          </article>

          <article className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm">
            <h2 className="font-serif text-3xl font-bold text-foreground">Movement and timing</h2>
            <p className="mt-4 leading-relaxed text-foreground">
              ADHD research extends beyond the frontal lobes. The basal ganglia, cerebellum, and their connections with the cortex contribute to timing, movement, learning, and the coordination of cognitive control.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This does not mean ADHD is a movement disorder or that one structure explains the condition. It reinforces the idea that ADHD involves distributed circuits.
            </p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#477f72]/25 bg-[#477f72]/[0.07] p-7">
            <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
              <ShieldCheck className="h-6 w-6 text-[#477f72]" /> What neuroscience can tell us
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground">
              <li>• ADHD is a neurodevelopmental condition, not a failure of effort or intelligence.</li>
              <li>• Attention, executive control, reward, and network coordination are useful parts of the explanation.</li>
              <li>• Performance can vary because brain systems interact with task demands and current state.</li>
              <li>• Treatments can target symptoms and functioning without changing a person’s identity.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-[#a96952]/25 bg-[#a96952]/[0.07] p-7">
            <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
              <Info className="h-6 w-6 text-[#a96952]" /> What it cannot tell us
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground">
              <li>• A routine brain scan cannot diagnose ADHD.</li>
              <li>• One region, network, gene, or neurotransmitter does not explain every person.</li>
              <li>• A group-average difference does not predict an individual’s strengths, future, or treatment response.</li>
              <li>• Neuroscience does not replace a developmental and clinical evaluation.</li>
            </ul>
          </article>
        </section>

        <SourceList
          sources={[
            {
              title: 'Inside the ADHD Brain: Structure, Function, and Chemistry',
              organization: 'Attention Deficit Disorder Association',
              url: 'https://add.org/adhd-brain/',
              note: 'Plain-language overview of frontal systems, brain networks, dopamine, norepinephrine, and executive dysfunction.',
            },
            {
              title: 'The dopamine hypothesis for ADHD: An evaluation of evidence',
              organization: 'Frontiers in Psychiatry',
              url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2024.1492126/full',
              note: 'Critical review explaining why ADHD should not be reduced to a simple global dopamine deficiency.',
            },
            {
              title: 'Attention-Deficit/Hyperactivity Disorder: What You Need to Know',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/health/publications/attention-deficit-hyperactivity-disorder-what-you-need-to-know',
            },
            {
              title: 'NIH Researchers Identify Brain Connections Associated With ADHD in Youth',
              organization: 'National Institute of Mental Health',
              url: 'https://www.nimh.nih.gov/news/science-updates/2024/nih-researchers-identify-brain-connections-associated-with-adhd-in-youth',
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
            {
              title: 'Attention Deficit Hyperactivity Disorder',
              organization: 'MedlinePlus, U.S. National Library of Medicine',
              url: 'https://medlineplus.gov/attentiondeficithyperactivitydisorder.html',
            },
            {
              title: 'Executive function deficits in ADHD and autism spectrum disorder',
              organization: 'Nature Reviews Psychology / PubMed Central',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11485171/',
              note: '2024 critical review of executive-function components, heterogeneity, and measurement limitations.',
            },
            {
              title: 'ADHD Neuroscience 101',
              organization: 'ADDitude',
              url: 'https://www.additudemag.com/adhd-neuroscience-101/',
              note: 'Plain-language secondary overview; the scientific claims on this page are cross-checked against the primary and government sources listed here.',
            },
            {
              title: 'Catecholamine influences on prefrontal cortical function',
              organization: 'PubMed, National Library of Medicine',
              url: 'https://pubmed.ncbi.nlm.nih.gov/21295057/',
              note: 'Review of dopamine and norepinephrine modulation of prefrontal attention, working memory, behaviour, and emotion.',
            },
            {
              title: 'An overview on neurobiology and therapeutics of ADHD',
              organization: 'PubMed Central, National Library of Medicine',
              url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10501041/',
            },
          ]}
        />

        <motion.section className="text-center py-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl font-bold text-foreground">Next: What Actually Helps?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Use this neuroscience as context—not as a treatment plan. The next page explains the major support pathways and what each is designed to change.
          </p>
          <button
            type="button"
            onClick={() => setLocation('/chapter/what-helps')}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-sage-green px-7 py-3 font-sans font-bold text-warm-cream shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Next: What Actually Helps?
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.section>
      </motion.div>
    </ChapterLayout>
  );
}
