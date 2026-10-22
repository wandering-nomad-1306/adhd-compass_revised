import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  Brain,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  Clock3,
  ExternalLink,
  FileText,
  Focus,
  HeartHandshake,
  ListChecks,
  MoveRight,
  Repeat2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TimerReset,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import ChapterLayoutWide from '@/components/ChapterLayoutWide';
import SourceList from '@/components/SourceList';
import VariableProximity from '@/components/VariableProximity';

interface ChallengeAction {
  title: string;
  signpost: string;
  isPrimary?: boolean;
  highlightPhrase: string;
  detailPrefix: string;
  detailSuffix: string;
}

interface ChallengeGuide {
  id: string;
  title: string;
  shortTitle: string;
  icon: typeof BellRing;
  summary: string;
  mechanismTag: string;
  whyItHappens: {
    lead: string;
    highlight: string;
    rest: string;
  };
  actions: ChallengeAction[];
  why: {
    lead: string;
    highlight: string;
    rest: string;
  };
  example: {
    scenario: string;
    steps: {
      label: string;
      text: string;
    }[];
  };
  moreSupport: {
    threshold: string;
    modalities: string;
  };
}

const challenges: ChallengeGuide[] = [
  {
    id: 'forgetting',
    title: 'I forget tasks, appointments, or where I put things',
    shortTitle: 'Forgetting & Lost Items',
    icon: BellRing,
    summary:
      'Do not rely on holding an intention in your head until the right moment. Place visual cues directly where and when you need to act.',
    mechanismTag: 'Working memory limits & future task cues',
    whyItHappens: {
      lead: 'Working memory acts as the brain’s temporary scratchpad, and its capacity is strictly limited. Remembering to carry out an intended task in the future requires strong internal reminders. In ADHD, these internal signals are ',
      highlight: 'vulnerable to immediate distraction whenever new stimuli appear',
      rest: '. This is a cognitive cueing difference, not a lack of caring or responsibility.',
    },
    actions: [
      {
        title: 'Keep tasks in one single place',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'exactly one digital calendar and one physical notebook',
        detailPrefix: 'Maintain ',
        detailSuffix:
          ' for tasks. Avoid scattering reminders across random sticky notes, separate apps, and loose paper scraps.',
      },
      {
        title: 'Place items where the action happens',
        signpost: '📍 Physical Environment',
        highlightPhrase: 'immediate sensory contact with your next step',
        detailPrefix: 'Keep objects in ',
        detailSuffix:
          ': your daily medication right next to the kettle, or your gym bag looped directly over the front door handle.',
      },
      {
        title: 'Use two alarms (transition & departure)',
        signpost: '🕒 Timing & Pacing',
        highlightPhrase: 'alert 1 to wrap up, and alert 2 to walk out the door',
        detailPrefix: 'For a 3:00 PM appointment, set an ',
        detailSuffix:
          ' (e.g. 2:15 PM and 2:30 PM), rather than relying on a single alarm at the exact meeting time.',
      },
      {
        title: 'Set a designated drop tray by the entrance',
        signpost: '🏠 Home Scaffolding',
        highlightPhrase: 'keys, wallet, phone, and transit pass',
        detailPrefix: 'Place a high-contrast tray right by your entryway specifically for ',
        detailSuffix:
          '. Make placing items there the automatic first step the moment you walk inside.',
      },
    ],
    why: {
      lead: 'Placing visual cues in your physical environment frees your working memory from repeating reminders. When an item is physically in your path, ',
      highlight: 'sensory perception triggers the action instead of fragile internal recall',
      rest: ', drastically lowering the mental effort needed to remember.',
    },
    example: {
      scenario:
        'You have a doctor appointment across town at 2:30 PM, but you get absorbed in computer work and realize at 2:25 PM that you are still at your desk.',
      steps: [
        { label: 'Night before', text: 'Put your health card and car keys in the designated entryway bowl.' },
        { label: 'Alarm 1 (1:45 PM)', text: '"Save active documents, use the restroom, and pack bag."' },
        { label: 'Alarm 2 (2:00 PM)', text: '"Step into the car and start GPS navigation."' },
      ],
    },
    moreSupport: {
      threshold:
        'When forgetting creates severe safety risks (leaving stove burners or heaters on, missing critical medications), results in repeated employment reprimands, or persists despite structured external cueing.',
      modalities:
        'Consult with an ADHD coach, occupational therapist, or physician to explore sensory environmental cueing or evaluate clinical medical treatment.',
    },
  },
  {
    id: 'starting',
    title: 'I know what to do, but I cannot get started',
    shortTitle: 'Starting Tasks & Paralysis',
    icon: MoveRight,
    summary:
      'Make the first physical step small and concrete. "Start the report" creates mental resistance; "open the document and type the title" gives the brain an immediate entry point.',
    mechanismTag: 'Reward signaling & task initiation hurdles',
    whyItHappens: {
      lead: 'Starting a task requires the brain to estimate effort, suppress competing impulses, and generate anticipatory motivation. In ADHD, baseline dopamine signaling is lower for tasks with delayed, abstract, or non-urgent rewards, making initiation feel like ',
      highlight: 'an impassable wall—often called task paralysis',
      rest: '. It is a neurochemical initiation hurdle, not laziness.',
    },
    actions: [
      {
        title: 'Define just the very first physical step',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'first concrete verb: open, click, place, type, or dial',
        detailPrefix: 'Identify only the immediate ',
        detailSuffix:
          '. Ignore the rest of the project completely until that single physical motion is completed.',
      },
      {
        title: 'Set a 5-minute checkpoint',
        signpost: '🕒 Timing & Pacing',
        highlightPhrase: 'give yourself explicit permission to stop after 5 minutes',
        detailPrefix: 'Start with low stakes: ',
        detailSuffix:
          '. If forward momentum builds, keep going; if strong resistance remains, you have broken the initial inertia for today.',
      },
      {
        title: 'Prepare the workspace in advance',
        signpost: '📍 Physical Setup',
        highlightPhrase: 'lay out tools or open the file the night before',
        detailPrefix: 'To eliminate setup resistance, ',
        detailSuffix:
          ' so that starting tomorrow requires zero decision-making.',
      },
      {
        title: 'Body doubling (working alongside someone)',
        signpost: '🤝 Social Accountability',
        highlightPhrase: 'work in the presence of another focused person',
        detailPrefix: 'Quiet external energy works wonders: ',
        detailSuffix:
          ' in-person or on virtual co-working platforms (such as Focusmate) to provide gentle social anchoring.',
      },
    ],
    why: {
      lead: 'Large or vaguely defined projects trigger cognitive overload because the brain tries to calculate the entire sequence at once. Shrinking the task to a micro-action ',
      highlight: 'removes decision fatigue and lowers the neural threshold required to begin',
      rest: '.',
    },
    example: {
      scenario:
        'You need to organize a chaotic spreadsheet of financial expenses and have avoided opening the computer for four days.',
      steps: [
        { label: 'Step 1 (Timer)', text: 'Set a timer for 5 minutes with zero obligation to finish the whole sheet.' },
        { label: 'Step 2 (Action)', text: 'Open the file, highlight row 1 in blue, and click save.' },
        { label: 'Step 3 (Result)', text: 'The initial barrier is broken; continuing usually feels far easier than starting did.' },
      ],
    },
    moreSupport: {
      threshold:
        'When chronic paralysis leads to academic disqualification, job loss, unpayable bills, or severe depressive freeze.',
      modalities:
        'ADHD-adapted Cognitive Behavioral Therapy (CBT), specialized ADHD coaching, or medical consultation for ADHD pharmacotherapy to support baseline executive function.',
    },
  },
  {
    id: 'time',
    title: 'I lose track of time or underestimate how long things take',
    shortTitle: 'Time Blindness & Deadlines',
    icon: Clock3,
    summary:
      'Transform invisible time into a visible dimension. Standard clocks display abstract numbers; visual timers and backward scheduling reveal the actual passage and limits of time.',
    mechanismTag: 'Time perception & tracking deadlines',
    whyItHappens: {
      lead: 'People with ADHD frequently experience "time blindness"—a neurological difference in how the brain tracks passing intervals. Time is often perceived in binary terms: "Now" or "Not Now". Until an upcoming deadline enters the immediate "Now" window, ',
      highlight: 'internal urgency signals stay quiet, causing chronic miscalculation',
      rest: ' of transit, prep, and task durations.',
    },
    actions: [
      {
        title: 'Use analog visual countdown timers',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'see time physically disappear as a shrinking colored wedge',
        detailPrefix: 'Use a visual clock (such as a Time Timer) to ',
        detailSuffix:
          '. Concrete sensory feedback bypasses inaccurate internal time guesses.',
      },
      {
        title: 'Add a 1.5x time buffer',
        signpost: '🕒 Estimation Reality',
        highlightPhrase: 'multiply your intuitive estimate by 1.5',
        detailPrefix: 'To prevent rushing, ',
        detailSuffix:
          '. This systematically accounts for misplaced keys, unexpected traffic, and transition lag.',
      },
      {
        title: 'Schedule departure, not arrival',
        signpost: '📍 Calendar Anchor',
        highlightPhrase: 'put your departure time on your calendar rather than event start',
        detailPrefix: 'Avoid arrival traps: ',
        detailSuffix:
          ' (for example: "10:15 AM Leave for 11:00 AM Meeting").',
      },
      {
        title: 'Measure everyday routines with a stopwatch once',
        signpost: '⏱️ Duration Audit',
        highlightPhrase: 'time routine activities (showering, getting ready, commute) once',
        detailPrefix: 'Gather real data: ',
        detailSuffix:
          ' with a stopwatch to replace optimistic assumptions with measured reality.',
      },
    ],
    why: {
      lead: 'Visual time tools convert abstract mental calculations into concrete physical boundaries. ',
      highlight: 'Visible limits allow the brain to perceive approaching deadlines',
      rest: ' without needing last-minute adrenaline surges to take action.',
    },
    example: {
      scenario:
        'You assume getting ready and leaving for work takes "15 minutes", but you are consistently 20 minutes late every morning.',
      steps: [
        { label: 'Stopwatch test', text: 'Shower (12m) + Dressing (8m) + Coffee & keys (7m) + Walk to car (5m) = 32 minutes actual.' },
        { label: 'Calendar update', text: 'Set morning departure alert to 7:45 AM instead of 8:15 AM.' },
        { label: 'Visual anchor', text: 'Place a visual countdown timer on the bathroom counter set to 25 minutes.' },
      ],
    },
    moreSupport: {
      threshold:
        'When time blindness leads to workplace disciplinary action, missed essential healthcare visits, or severe relationship strain.',
      modalities:
        'ADHD coaching for scheduling systems, occupational therapy, or ADHD-adapted CBT for pacing and avoidance.',
    },
  },
  {
    id: 'distraction',
    title: 'I am pulled away by noise, messages, or unrelated thoughts',
    shortTitle: 'Distraction & Wandering Focus',
    icon: Focus,
    summary:
      'Reduce competing signals in your environment before demanding willpower. Keep your single active task directly in your line of sight.',
    mechanismTag: 'Sensory filtering & focus control',
    whyItHappens: {
      lead: 'The brain relies on frontostriatal networks to filter out background sensory input and unrelated thoughts. In ADHD, this filtering system is more permeable: ',
      highlight: 'background sounds, alerts, and sudden ideas carry equal neurological urgency',
      rest: ', frequently pulling the brain away from the primary task.',
    },
    actions: [
      {
        title: 'Keep a "Parking Lot" pad beside your keyboard',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'write random urgent impulses on paper immediately',
        detailPrefix: 'When a distracting idea strikes, ',
        detailSuffix:
          ' ("look up flight tickets") and return to work without opening a new browser tab.',
      },
      {
        title: 'Use headphones with steady brown noise',
        signpost: '🎧 Sensory Shielding',
        highlightPhrase: 'mask abrupt acoustic disruptions with continuous brown noise',
        detailPrefix: 'Wear noise-canceling headphones to ',
        detailSuffix:
          ' or instrumental soundtracks, keeping auditory channels evenly saturated.',
      },
      {
        title: 'Work in fullscreen single-task mode',
        signpost: '💻 Digital Environment',
        highlightPhrase: 'maximize the active document to hide desktop icons and tabs',
        detailPrefix: 'Eliminate visual competitors: ',
        detailSuffix:
          ' so competing red notification badges are entirely out of sight.',
      },
      {
        title: 'Clear your immediate desk perimeter',
        signpost: '📍 Physical Space',
        highlightPhrase: 'remove all objects from your desk except the tools needed now',
        detailPrefix: 'Protect your visual field: ',
        detailSuffix:
          ' for the current 30-minute block.',
      },
    ],
    why: {
      lead: 'Every competing sensory alert requires the brain to make an executive decision: "Ignore or look?" ',
      highlight: 'Reducing ambient stimuli preserves limited mental stamina',
      rest: ' for the task itself rather than wasting it on impulse suppression.',
    },
    example: {
      scenario:
        'While drafting a work report, you remember you need to buy home filters, open a browser tab, and lose 45 minutes comparing specifications.',
      steps: [
        { label: 'Action 1', text: 'Keep a notepad titled "Parking Lot" right beside your mousepad.' },
        { label: 'Action 2', text: 'When the urge hits, jot down: "Air filters (size 20x25)" on paper.' },
        { label: 'Action 3', text: 'Return immediately to the document. Review the notepad only on your scheduled break.' },
      ],
    },
    moreSupport: {
      threshold:
        'When distractibility prevents sustained employment, impairs safe vehicle operation, or co-occurs with severe sensory processing overload.',
      modalities:
        'Comprehensive medical assessment for ADHD medication (which supports attention network filtering), workplace sensory adjustments, or occupational therapy.',
    },
  },
  {
    id: 'overwhelmed',
    title: 'Large or multi-step tasks become overwhelming',
    shortTitle: 'Task Overwhelm & Freeze',
    icon: ListChecks,
    summary:
      'Move the sequence from your head onto paper. Hide future steps so your working memory only needs to manage one single action at a time.',
    mechanismTag: 'Managing multiple steps & mental overload',
    whyItHappens: {
      lead: 'Working memory can hold only 3 to 4 pieces of information simultaneously. When a project involves tracking 10 interrelated steps, dependencies, and deadlines, ',
      highlight: 'the brain experiences cognitive congestion and triggers a freeze response',
      rest: ' that feels like physical exhaustion.',
    },
    actions: [
      {
        title: 'Do an unformatted brain dump on paper',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'write every thought onto blank paper with zero structure',
        detailPrefix: 'Get it out of your head: ',
        detailSuffix:
          ' without worrying about neatness, sequence, or formatting.',
      },
      {
        title: 'Cover future steps with an index card',
        signpost: '📄 Cognitive Scaffolding',
        highlightPhrase: 'write only step 1 on a card and cover steps 2 through 10',
        detailPrefix: 'Prevent visual panic: ',
        detailSuffix:
          ' so your eyes are physically prevented from seeing future tasks until step 1 is done.',
      },
      {
        title: 'Write a clear "Definition of Done"',
        signpost: '🎯 Scope Boundary',
        highlightPhrase: 'write one sentence defining what "good enough to submit" looks like',
        detailPrefix: 'Stop endless tinkering: ',
        detailSuffix:
          ' to prevent perfectionistic scope creep.',
      },
      {
        title: 'Schedule a mid-point review date',
        signpost: '🕒 Pacing Checkpoint',
        highlightPhrase: 'set a calibration check-in at 40% completion',
        detailPrefix: 'Calibrate progress early: ',
        detailSuffix:
          ' before deadline panic sets in.',
      },
    ],
    why: {
      lead: 'Hiding future steps reduces cognitive demand to a single item (N=1). Your brain can ',
      highlight: 'allocate all of its working memory to executing the current action',
      rest: ' rather than frantically juggling the entire project plan.',
    },
    example: {
      scenario:
        'Your room is thoroughly cluttered, and walking inside sparks immediate mental paralysis and the urge to look at your phone.',
      steps: [
        { label: 'Step 1 (Zones)', text: 'Write a list of 5 zones (clothes, dishes, desk trash, bedding, floor).' },
        { label: 'Step 2 (Isolation)', text: 'Fold the paper so only "Dishes" is visible.' },
        { label: 'Step 3 (Execution)', text: 'Collect dishes and carry them to the kitchen. Pause before opening the next zone.' },
      ],
    },
    moreSupport: {
      threshold:
        'When task overwhelm leads to complete withdrawal from work or school, persistent depressive hopelessness, or panic attacks whenever new tasks are assigned.',
      modalities:
        'ADHD-adapted CBT (addressing perfectionism and avoidance), formal school or workplace accommodations, and psychiatric consultation.',
    },
  },
  {
    id: 'switching',
    title: 'I struggle to stop one activity and move to another',
    shortTitle: 'Task Switching & Hyperfocus',
    icon: Repeat2,
    summary:
      'Treat switching as a distinct phase with a dedicated transition bridge, rather than expecting an immediate mental leap.',
    mechanismTag: 'Transition friction & shifting focus',
    whyItHappens: {
      lead: 'Shifting attention requires three executive steps: disengaging from the current task, holding the new goal in mind, and initiating the new behavior. When an ADHD brain is deeply immersed in an engaging activity, ',
      highlight: 'the drop in stimulation upon stopping feels physically uncomfortable',
      rest: ', generating strong mental inertia.',
    },
    actions: [
      {
        title: 'Leave a "Bridge Note" before stepping away',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'write one sentence: "I just finished step 3; next is drafting section 2"',
        detailPrefix: 'Save your mental place: ',
        detailSuffix:
          '. This removes the anxiety that stepping away means losing your hard-won train of thought.',
      },
      {
        title: 'Set staged audio countdown warnings',
        signpost: '🕒 Staged Transition',
        highlightPhrase: 'set gentle chimes at 15m, 5m, and stop time',
        detailPrefix: 'Give your brain advance notice: ',
        detailSuffix:
          ' so attentional disengagement happens gradually rather than abruptly.',
      },
      {
        title: 'Use a physical movement reset',
        signpost: '🚶 Somatic Reset',
        highlightPhrase: 'stand up, stretch, and wash your hands with cool water',
        detailPrefix: 'Signal the transition physically: ',
        detailSuffix:
          ' to break attentional hyperfocus through bodily sensation.',
      },
      {
        title: 'Set out materials for the next task first',
        signpost: '📍 Lowered Friction',
        highlightPhrase: 'place your gym gear or open the file before stepping away',
        detailPrefix: 'Pre-stage the landing pad: ',
        detailSuffix:
          ', making entry into the next activity effortless.',
      },
    ],
    why: {
      lead: 'Bridge notes preserve your train of thought on paper, eliminating the worry of losing momentum. ',
      highlight: 'Staged alerts allow emotional and mental disengagement to occur gradually',
      rest: ', minimizing switching friction.',
    },
    example: {
      scenario:
        'You are absorbed in computer work and need to stop to cook dinner, but you repeatedly ignore family reminders for another hour.',
      steps: [
        { label: 'Timer set', text: 'Set a countdown chime for 10 minutes before dinner.' },
        { label: 'Bridge Note', text: 'Write a sticky note: "Left off on line 42; need to verify database response" on your screen.' },
        { label: 'Transition', text: 'Close the laptop lid and walk straight to the kitchen.' },
      ],
    },
    moreSupport: {
      threshold:
        'When task switching triggers intense meltdowns, severe arguments, or neglect of essential physical needs (skipping meals, delaying bathroom visits, severe sleep loss).',
      modalities:
        'Family psychoeducation, behavioral therapy, or clinical consultation to address co-occurring anxiety or sensory regulation difficulties.',
    },
  },
  {
    id: 'routine',
    title: 'My routines work briefly and then fall apart',
    shortTitle: 'Routines & Restart Friction',
    icon: CalendarClock,
    summary:
      'Build routines around reliable daily anchors, create a low-energy version for difficult days, and treat restarts as normal rather than a personal failure.',
    mechanismTag: 'Novelty fade & maintaining routines',
    whyItHappens: {
      lead: 'In neurotypical brains, routines gradually transfer to automatic habit circuits. In ADHD, routines continue to require conscious mental effort. When a system is new, excitement makes it easy; once the novelty wears off, ',
      highlight: 'mental fatigue sets in, and a single disruption causes the habit to drop out of awareness',
      rest: '.',
    },
    actions: [
      {
        title: 'Attach new habits to existing daily anchors',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'pair the new behavior with an automatic daily habit',
        detailPrefix: 'Use habit stacking: ',
        detailSuffix:
          ' (for example: "While coffee is brewing, I take my morning medication and check my calendar").',
      },
      {
        title: 'Create a "Minimum Viable Routine" for low days',
        signpost: '🔋 Energy Calibration',
        highlightPhrase: 'design an emergency 2-minute version for exhausted days',
        detailPrefix: 'Protect the habit chain: ',
        detailSuffix:
          ' (for example: standard workout = 40 minutes; minimum version = 5 bodyweight squats and 1 minute of stretching).',
      },
      {
        title: 'Adopt a zero-guilt restart rule',
        signpost: '🌱 Shame-Free Reset',
        highlightPhrase: 'restart with the 1-minute version with zero apologies or redesigning',
        detailPrefix: 'Decide in advance: "If I miss two days, I ',
        detailSuffix:
          ' the whole system."',
      },
      {
        title: 'Hang a visible checklist where the task occurs',
        signpost: '📍 Visual Anchor',
        highlightPhrase: 'place a simple dry-erase checklist directly on the wall',
        detailPrefix: 'Keep it in your sightline: ',
        detailSuffix:
          ' where the activity takes place.',
      },
    ],
    why: {
      lead: 'Stacking habits onto existing daily anchors removes the need to remember when to act. ',
      highlight: 'A minimum viable routine prevents all-or-nothing thinking',
      rest: ', keeping the neural pathway warm with minimal mental effort.',
    },
    example: {
      scenario:
        'You created an elaborate 7-step morning routine that worked for a week, but after one late night, you missed four days and felt completely discouraged.',
      steps: [
        { label: 'Single Anchor', text: 'Pare down to 1 anchor: "Turn off alarm -> Drink the glass of water on the nightstand."' },
        { label: 'Minimum Rule', text: 'Even on exhausted days, drinking the water keeps the habit chain unbroken.' },
        { label: 'Restart', text: 'Resume the next morning without feeling guilty about the missed days.' },
      ],
    },
    moreSupport: {
      threshold:
        'When routine breakdown endangers essential health routines (missed medications, neglected nutrition, dental health, or basic self-care).',
      modalities:
        'ADHD coaching for environmental organization, occupational therapy for habit scaffolding, or clinical review of sleep patterns.',
    },
  },
  {
    id: 'emotion',
    title: 'Strong emotions interrupt what I need to do',
    shortTitle: 'Emotional Spikes & Reactivity',
    icon: Sparkles,
    summary:
      'Let physical intensity settle before trying to problem-solve. Thoughtful reasoning is harder to access when emotional arousal is high.',
    mechanismTag: 'Emotional regulation & intense reactions',
    whyItHappens: {
      lead: 'Brain imaging shows altered communication between the prefrontal cortex and emotional centers in ADHD. Emotional events can trigger fast, intense reactions before conscious evaluation can soften the response: ',
      highlight: 'low frustration tolerance, sudden anger, or sharp sensitivity to perceived criticism',
      rest: '. The feelings are physiologically real and intense.',
    },
    actions: [
      {
        title: 'Take a brief pause before responding',
        signpost: '⚡ Start Here · Recommended First Step',
        isPrimary: true,
        highlightPhrase: 'take a 10-minute pause before sending any reply or confrontation',
        detailPrefix: 'When an emotional spike hits, ',
        detailSuffix:
          '. Say: "I need 10 minutes before I respond" and step away from the keyboard or room.',
      },
      {
        title: 'Use cool water to settle physical arousal',
        signpost: '💧 Somatic Regulation',
        highlightPhrase: 'splash cool water on your face or hold a cold beverage',
        detailPrefix: 'Settle the nervous system: ',
        detailSuffix:
          ' to stimulate calming autonomic reflexes and steady your heart rate.',
      },
      {
        title: 'Name the physical sensation objectively',
        signpost: '🧠 Cognitive Framing',
        highlightPhrase: 'remind yourself: "This is a temporary adrenaline spike, not a catastrophe"',
        detailPrefix: 'Objectify the feeling: ',
        detailSuffix:
          ' to prevent emotional flooding from dictating choices.',
      },
      {
        title: 'Avoid resolving conflicts when exhausted',
        signpost: '🛡️ Bandwidth Protection',
        highlightPhrase: 'postpone difficult conversations when hungry, tired, or depleted',
        detailPrefix: 'Protect relationships: ',
        detailSuffix:
          ' late in the evening when mental energy is at its lowest.',
      },
    ],
    why: {
      lead: 'High emotional arousal directs brain resources toward immediate stress responses. ',
      highlight: 'Allowing your physical state to settle restores blood flow to executive brain areas',
      rest: ', helping balanced perspective and impulse control return.',
    },
    example: {
      scenario:
        'Your supervisor sends brief 3-word email feedback ("Please redo slide 4") and you instantly feel crushed, humiliated, and tempted to quit your job on the spot.',
      steps: [
        { label: 'Notice spike', text: 'Recognize: "This is heightened sensitivity reacting to a brief message."' },
        { label: 'Step away', text: 'Drink a glass of water and take 10 slow, deep diaphragmatic breaths.' },
        { label: 'Respond settled', text: 'Wait 15 minutes until heart rate settles, then ask what specific revision is needed.' },
      ],
    },
    moreSupport: {
      threshold:
        'When emotional volatility causes impulsive aggression, relationship breakdowns, self-harm, chronic depression, or panic episodes.',
      modalities:
        'Dialectical Behavior Therapy (DBT) skills, ADHD-adapted CBT, or psychiatric evaluation to assess for co-occurring mood disorders, trauma, and targeted medical care.',
    },
  },
];

interface Modality {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: typeof Brain;
  color: string;
  howItWorks: string;
  keyTargets: string[];
  evidenceNote: string;
  limits: string;
  firstStep: string;
}

const modalities: Modality[] = [
  {
    id: 'cbt',
    title: 'ADHD-Adapted CBT',
    subtitle: 'Structuring thoughts and practical daily habits',
    badge: 'Cognitive & Behavioral',
    icon: Brain,
    color: '#4f7659',
    howItWorks:
      'Unlike traditional talk therapy that focuses primarily on childhood experiences, ADHD-adapted CBT (such as the Safren or Ramsay protocols) focuses directly on practical executive skills, breaking cycles of avoidance and guilt, and reframing self-critical thoughts ("I am broken / lazy").',
    keyTargets: [
      'Procrastination and avoidance spirals',
      'All-or-nothing thinking ("I missed one day, so the whole week is ruined")',
      'Emotional distress and shame around past unfinished projects',
      'Realistic estimation of time and task difficulty',
    ],
    evidenceNote:
      'Multiple randomized controlled trials show ADHD-adapted CBT produces significant, durable reductions in functional impairment, especially when paired with medical care.',
    limits:
      'CBT cannot directly alter baseline dopamine signaling; it provides cognitive and behavioral strategies that work best when foundational biological support is in place.',
    firstStep:
      'Look for licensed clinical psychologists or therapists specifically experienced in adult ADHD CBT protocols.',
  },
  {
    id: 'coaching',
    title: 'ADHD Coaching & Body Doubling',
    subtitle: 'Collaborative systems and real-time accountability',
    badge: 'Accountability & Systems',
    icon: Users,
    color: '#5b6f96',
    howItWorks:
      'A practical partnership focused on daily execution. Coaches work with you to break goals into manageable sequences, co-design personal organizational systems, and provide structured, non-judgmental check-ins. Body doubling (working alongside another focused person) provides gentle social accountability that supports task completion.',
    keyTargets: [
      'Starting tasks and maintaining momentum',
      'Designing personalized physical and digital workflows',
      'Prioritizing competing deadlines without mental freeze',
      'Regular, supportive accountability check-ins',
    ],
    evidenceNote:
      'Peer-reviewed studies report improvements in self-efficacy, organizational skills, task completion, and reduced procrastination among coached adults.',
    limits:
      'Coaching is not psychotherapy (it does not treat depression, trauma, or clinical crisis) and is not an administrative service (the individual remains an active co-creator).',
    firstStep:
      'Look for coaches credentialed through the Professional Association of ADHD Coaches (PAAC) or the International Coaching Federation (ICF), or try virtual body doubling on platforms like Focusmate.',
  },
  {
    id: 'scaffolding',
    title: 'Environmental Scaffolding',
    subtitle: 'Designing your environment to support daily focus',
    badge: 'Spatial & Sensory Design',
    icon: SlidersHorizontal,
    color: '#9a7648',
    howItWorks:
      'Based on the principle of placing support where actions occur: rather than relying on unassisted willpower to remember intentions, you arrange your physical and digital surroundings so that intended actions have low friction and common distractions are physically reduced.',
    keyTargets: [
      'Items disappearing from memory when out of sight',
      'Visual clutter fatigue and desk disorganization',
      'Digital notifications and browser distraction loops',
      'Friction points at entryways and work areas',
    ],
    evidenceNote:
      'Research consistently indicates that visual cues placed directly where behavior occurs outperform internal working memory in people with executive function differences.',
    limits:
      'No organizational system is permanent or completely immune to novelty fade. A successful system includes low-friction reset habits when disruptions happen.',
    firstStep:
      'Pick one recurring friction point (such as lost keys or excessive browser tabs) and set up a physical landing tray or a clean browser profile today.',
  },
  {
    id: 'circadian',
    title: 'Sleep Habits & Physical Movement',
    subtitle: 'Sleep patterns, movement, and brain signaling',
    badge: 'Biological Foundations',
    icon: Activity,
    color: '#7e8249',
    howItWorks:
      'Many individuals with ADHD have an underlying circadian delay (Delayed Sleep Phase Syndrome), with sleepiness arriving later in the evening. In addition, physical aerobic exercise supports dopamine and norepinephrine signaling in attention circuits and promotes neurotrophic factors that support learning and mood.',
    keyTargets: [
      'Morning sleep inertia and prolonged mental fog',
      'Late-night energy spikes and delayed sleep onset',
      'Afternoon energy dips and emotional fluctuations',
      'Baseline cognitive stamina and working memory capacity',
    ],
    evidenceNote:
      'Morning bright light exposure (such as outdoor sunlight within 30 minutes of waking) helps advance circadian timing. Regular exercise shows documented transient benefits for executive function and alertness.',
    limits:
      'Sleep and exercise provide essential biological support, but they are not moral tests and do not replace professional medical evaluation when indicated.',
    firstStep:
      'Spend 10 to 15 minutes in natural morning daylight shortly after waking, and add a brisk 20-minute walk or bike ride before starting focused work.',
  },
];

function ChallengeExplorerPrototype() {
  const getInitialDifficulty = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const diff = params.get('difficulty');
      if (diff && challenges.some((c) => c.id === diff)) {
        return diff;
      }
    } catch {}
    return challenges[0].id;
  };

  const [selectedId, setSelectedId] = useState(getInitialDifficulty);

  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const diff = params.get('difficulty');
        if (diff && challenges.some((c) => c.id === diff)) {
          setSelectedId(diff);
        }
      } catch {}
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  const selected = challenges.find((challenge) => challenge.id === selectedId) ?? challenges[0];
  const Icon = selected.icon;

  return (
    <div className="overflow-hidden rounded-3xl border border-sage-green/20 bg-white shadow-sm">
      <div className="grid min-w-0 lg:grid-cols-[18.5rem_minmax(0,1fr)]">
        {/* Navigation Sidebar with Sticky Positioning */}
        <div
          className="border-b border-sage-green/10 bg-[#FAF8F5] p-3.5 lg:border-b-0 lg:border-r lg:p-5 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto"
          role="tablist"
          aria-label="Common ADHD difficulties"
        >
          <div className="mb-3 hidden px-2 lg:flex lg:items-center lg:justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Select Difficulty
            </span>
            <span className="rounded-full bg-sage-green/15 px-2.5 py-0.5 text-[11px] font-semibold text-sage-green">
              {challenges.length} guides
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {challenges.map((challenge) => {
              const ChallengeIcon = challenge.icon;
              const active = challenge.id === selectedId;
              return (
                <button
                  key={challenge.id}
                  type="button"
                  role="tab"
                  id={`proto-tab-${challenge.id}`}
                  aria-controls={`proto-tabpanel-${challenge.id}`}
                  aria-selected={active}
                  onClick={() => setSelectedId(challenge.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition lg:w-full ${
                    active
                      ? 'bg-[#3b5b43] text-white shadow-sm'
                      : 'bg-white text-stone-800 hover:bg-[#3b5b43]/[0.08] border border-stone-200/60 lg:border-transparent'
                  }`}
                >
                  <ChallengeIcon className={`h-4 w-4 shrink-0 ${active ? 'text-white' : 'text-[#3b5b43]'}`} />
                  <span className="whitespace-normal break-words leading-snug">{challenge.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            id={`proto-tabpanel-${selected.id}`}
            role="tabpanel"
            aria-labelledby={`proto-tab-${selected.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full min-w-0 overflow-hidden p-6 sm:p-9 md:p-11 lg:overflow-visible"
          >
            {/* Header with Visual Prominence */}
            <div className="flex min-w-0 items-start gap-4 sm:gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3b5b43]/10 text-[#3b5b43] sm:h-16 sm:w-16">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-sage-green/15 px-3 py-1 text-xs font-bold text-sage-green">
                    Problem-First Guide
                  </span>
                  <span className="rounded-full border border-sage-green/20 bg-[#FAF8F5] px-3 py-1 text-xs font-medium text-stone-700">
                    {selected.mechanismTag}
                  </span>
                </div>
                <h3 className="mt-3 break-words font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  {selected.title}
                </h3>
                <p className="mt-3.5 break-words text-lg leading-relaxed text-stone-700 sm:text-xl">
                  {selected.summary}
                </p>
              </div>
            </div>



            {/* Part 1: Why This Can Happen (Large Legible Scale + Highlighted Core) */}
            <section
              id="proto-why-happens"
              className="mt-9 scroll-mt-28 rounded-2xl border border-sage-green/20 bg-sage-green/[0.06] p-6 sm:p-8"
            >
              <div className="flex items-center gap-2.5">
                <Brain className="h-5 w-5 text-sage-green" />
                <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-sage-green">
                  1. Why this can happen
                </h4>
                <span className="text-xs sm:text-sm text-stone-500 font-normal">· Brain & cognitive factors</span>
              </div>
              <p className="mt-3.5 text-base sm:text-lg leading-[1.75] text-stone-800">
                {selected.whyItHappens.lead}
                <strong className="font-semibold text-foreground bg-[#edf4ee] px-1.5 py-0.5 rounded">
                  {selected.whyItHappens.highlight}
                </strong>
                {selected.whyItHappens.rest}
              </p>
            </section>

            {/* Part 2: What to Try (Selective Semantic Highlighting & Start Here Signpost) */}
            <section id="proto-what-to-try" className="mt-10 scroll-mt-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ListChecks className="h-5 w-5 text-sage-green" />
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-sage-green">
                    2. What to try
                  </h4>
                  <span className="text-xs sm:text-sm text-stone-500 font-normal">· Practical strategies to test</span>
                </div>
                <span className="hidden sm:inline-block text-xs text-muted-foreground font-medium">
                  Key action phrases are highlighted below
                </span>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {selected.actions.map((action, index) => (
                  <div
                    key={action.title}
                    className={`flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-md ${
                      action.isPrimary
                        ? 'border-sage-green/40 border-l-4 border-l-[#3b5b43] bg-[#fbfdfa] shadow-xs'
                        : 'border-sage-green/15 bg-white shadow-2xs hover:border-sage-green/35'
                    }`}
                  >
                    <div>
                      {/* Priority Signpost */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            action.isPrimary
                              ? 'bg-sage-green/15 text-[#3b5b43]'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {action.signpost}
                        </span>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3b5b43] text-xs font-bold text-white">
                          {index + 1}
                        </span>
                      </div>

                      {/* Action Title */}
                      <p className="font-bold text-foreground text-lg sm:text-xl leading-snug">
                        {action.title}
                      </p>

                      {/* Detail with Selective Semantic Highlighting */}
                      <p className="mt-3 text-[15px] sm:text-base leading-[1.7] text-stone-700">
                        {action.detailPrefix}
                        <strong className="font-semibold text-foreground bg-[#edf4ee] px-1 py-0.5 rounded">
                          {action.highlightPhrase}
                        </strong>
                        {action.detailSuffix}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Part 3 & Part 4: Why this helps & Real Scenario Example (Balanced Pair) */}
            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {/* Part 3 */}
              <section
                id="proto-why-helps"
                className="scroll-mt-28 rounded-2xl border border-sage-green/15 bg-[#FAF8F5] p-6 sm:p-7"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#3b5b43]" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3b5b43]">
                    3. Why this may help
                  </h4>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">Reducing mental effort</p>
                <p className="mt-3 text-sm sm:text-base leading-[1.7] text-stone-800">
                  {selected.why.lead}
                  <strong className="font-semibold text-foreground bg-white px-1 py-0.5 rounded shadow-2xs">
                    {selected.why.highlight}
                  </strong>
                  {selected.why.rest}
                </p>
              </section>

              {/* Part 4 */}
              <section
                id="proto-example"
                className="scroll-mt-28 rounded-2xl border border-[#5b6f96]/20 bg-[#5b6f96]/[0.05] p-6 sm:p-7"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#5b6f96]" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5b6f96]">
                    4. Practical example
                  </h4>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-stone-500">Realistic scenario</p>
                <p className="mt-3 text-sm sm:text-base font-semibold text-foreground">
                  {selected.example.scenario}
                </p>
                <ul className="mt-3.5 space-y-2 border-t border-[#5b6f96]/15 pt-3 text-xs sm:text-sm text-stone-700">
                  {selected.example.steps.map((step) => (
                    <li key={step.label} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b6f96]" />
                      <span>
                        <strong className="font-semibold text-foreground">{step.label}: </strong>
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Part 5: When Additional Support May Be Useful */}
            <section
              id="proto-more-support"
              className="mt-7 scroll-mt-28 rounded-2xl border border-[#a96952]/25 bg-[#a96952]/[0.05] p-6 sm:p-7"
            >
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#a96952]" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#a96952]">
                    5. When additional support may be useful
                  </h4>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-stone-800">
                    <strong className="text-foreground">Clinical threshold: </strong>
                    {selected.moreSupport.threshold}
                  </p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-stone-600">
                    <strong className="text-foreground">Recommended pathways: </strong>
                    {selected.moreSupport.modalities}
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ModalitiesExplorerPrototype() {
  const [activeModalityId, setActiveModalityId] = useState(modalities[0].id);
  const active = modalities.find((m) => m.id === activeModalityId) ?? modalities[0];
  const Icon = active.icon;

  return (
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="tablist" aria-label="Non-pharmacological modalities">
        {modalities.map((item) => {
          const ModalityIcon = item.icon;
          const isSelected = item.id === activeModalityId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveModalityId(item.id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                isSelected
                  ? 'border-sage-green bg-white shadow-sm ring-2 ring-sage-green/20'
                  : 'border-sage-green/15 bg-white/70 hover:bg-white text-muted-foreground'
              }`}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl transition"
                style={{
                  backgroundColor: isSelected ? `${item.color}15` : '#f7f4ed',
                  color: item.color,
                }}
              >
                <ModalityIcon className="h-5 w-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.badge}
              </span>
              <span className="text-sm font-bold text-foreground leading-tight">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      <AnimatePresence mode="wait">
        <motion.article
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl border border-sage-green/15 bg-white p-7 shadow-sm md:p-9"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${active.color}15`, color: active.color }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: active.color }}>
                  {active.badge}
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">{active.title}</h3>
                <p className="text-sm text-muted-foreground">{active.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-sage-green/10 pt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sage-green">How it works</h4>
            <p className="mt-2 text-base leading-relaxed text-foreground">{active.howItWorks}</p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-sage-green/15 bg-[#FAF8F5] p-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-sage-green">Primary Targets</h4>
              <ul className="mt-3 space-y-2">
                {active.keyTargets.map((target) => (
                  <li key={target} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-green" />
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-800/15 bg-amber-500/[0.06] p-5">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-800" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  Realistic Boundaries (What it cannot do alone)
                </h4>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{active.limits}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-sage-green/[0.07] p-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sage-green">Evidence & Clinical Note</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{active.evidenceNote}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-sage-green/10 pt-5">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Getting started: </strong>
              {active.firstStep}
            </p>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

export default function WhatHelpsPrototype() {
  const [, setLocation] = useLocation();

  return (
    <ChapterLayoutWide
      title="What Helps"
      subtitle="Practical ways to reduce everyday difficulty"
      chapterNumber={6}
      totalChapters={10}
      badgeText="Chapter 6 · Practical Support"
      onPrevious={() => setLocation('/chapter/brain')}
      onNext={() => setLocation('/chapter/medication')}
      estimatedReadingTime="8 min read"
      bgClass="bg-[#FAF8F5]"
      accentColor="#34533d"
      maxWidthClass="max-w-[76rem]"
    >
      <motion.div className="space-y-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        {/* Prototype Header Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-sage-green/30 bg-sage-green/[0.08] px-5 py-3 text-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-green text-xs font-bold text-white">
              P
            </span>
            <span className="font-medium text-foreground">
              <strong>Prototype View:</strong> Atmospheric visual background, selective keyword highlighting & larger scannable typography.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLocation('/chapter/what-helps')}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-sage-green/30 bg-white px-3 py-1.5 text-xs font-bold text-sage-green shadow-2xs hover:bg-sage-green/10 transition"
          >
            Compare with Original Live View <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Section 1: Strategies for Common Difficulties */}
        <section id="common-difficulties" data-page-label="Common difficulties" className="scroll-mt-24">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Strategies for common difficulties
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-stone-700">
              Select your primary bottleneck below. Every guide follows a direct 5-part structure: underlying brain factors, practical steps to test, why it reduces mental demand, a real-world example, and when to seek clinical support.
            </p>
          </div>
          <ChallengeExplorerPrototype />
        </section>

        {/* Section 2: Non-Pharmacological Evidence-Based Modalities */}
        <section id="evidence-modalities" data-page-label="Evidence-based care">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sage-green">
              The Multimodal Care Ecosystem
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Evidence-based non-pharmacological care
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-stone-700">
              Personal habits are only one tier of care. These four clinical and behavioral modalities have documented empirical backing in supporting executive function and reducing ADHD-related impairment.
            </p>
          </div>
          <ModalitiesExplorerPrototype />
        </section>

        {/* Section 3: A Basic Support System */}
        <section id="support-system" data-page-label="Basic support system">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">A basic support system</h2>
            <p className="mt-3 text-lg leading-relaxed text-stone-700">
              These four environmental principles can be deployed across home, university, and the workplace. They are intentionally simple so they remain usable when executive bandwidth is exhausted.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-sage-green/15 bg-white shadow-sm">
            {[
              {
                icon: FileText,
                title: 'Store information outside your memory',
                highlight: 'one single calendar and one capture inbox',
                text: 'Use one single calendar, one task-capture inbox, written instructions, visible checklists, and assigned landing zones for critical objects. External systems are essential tools that offload limited working memory.',
              },
              {
                icon: ListChecks,
                title: 'Make the next physical step visible',
                highlight: 'short micro-steps defined by concrete verbs',
                text: 'Break complex projects into short micro-steps defined by concrete verbs. Keep only the active step in view. A concrete micro-action lowers activation resistance and makes restarting after distraction straightforward.',
              },
              {
                icon: TimerReset,
                title: 'Make time and transitions visible',
                highlight: 'analog visual timers and realistic departure buffers',
                text: 'Use analog visual timers, advance warning chimes, realistic departure buffers, and duration audits. Always plan the transition ritual itself, not only the activities before and after it.',
              },
              {
                icon: Focus,
                title: 'Engineer the environment before demanding willpower',
                highlight: 'shaping the room is far more reliable than unassisted self-control',
                text: 'Shield sensory distractions with headphones, clear physical desks, limit choices when overwhelmed, and prepare tomorrow’s tools in advance. Shaping the room is far more reliable than demanding unassisted self-control.',
              },
            ].map(({ icon: Icon, title, highlight, text }, index, items) => (
              <article
                key={title}
                className={`grid gap-4 p-6 md:grid-cols-[3.5rem_1fr] md:p-8 ${
                  index < items.length - 1 ? 'border-b border-sage-green/10' : ''
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 leading-relaxed text-stone-700 text-base sm:text-lg">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: When Strategies Are Not Enough */}
        <section id="additional-support" data-page-label="When strategies are not enough">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              When strategies are not enough
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-stone-700">
              Practical scaffolds can make life significantly easier, but they do not replace formal diagnosis or medical treatment when ADHD symptoms create sustained impairment across life domains.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: 'Pharmacotherapy & Medical Evaluation',
                text: 'Stimulant and nonstimulant medications represent the most empirically validated first-line treatment for core ADHD neurobiology, supporting dopamine and norepinephrine signaling in brain circuits.',
                action: 'Open the Medication guide for a detailed, plain-language walkthrough.',
                route: '/chapter/medication',
              },
              {
                title: 'Psychotherapy & Specialized Skills Training',
                text: 'Parent behavioral training (for children), ADHD-adapted CBT, and executive function coaching help reframe emotional distress, improve distress tolerance, and establish sustainable behavioral systems.',
                action: 'Explore evidence-based therapy and coaching modalities above.',
                anchor: '#evidence-modalities',
              },
              {
                title: 'Formal School & Workplace Accommodations',
                text: 'Written instructions, reduced auditory distraction, assistive technology, flexible deadlines, and structured check-ins are legally recognized adjustments that remove systemic barriers.',
                action: 'The Accommodations page is currently in progress.',
                route: '/chapter/accommodations',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-sage-green/15 bg-white p-7 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2.5 text-base sm:text-lg leading-relaxed text-stone-700">{item.text}</p>
                    <p className="mt-3 text-sm font-semibold text-sage-green">{item.action}</p>
                  </div>
                  {item.route && (
                    <button
                      type="button"
                      onClick={() => setLocation(item.route!)}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-sage-green/25 bg-white px-4 py-2.5 text-sm font-semibold text-sage-green shadow-2xs transition hover:bg-sage-green/[0.08]"
                    >
                      Open chapter <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                  {item.anchor && (
                    <a
                      href={item.anchor}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-sage-green/25 bg-white px-4 py-2.5 text-sm font-semibold text-sage-green shadow-2xs transition hover:bg-sage-green/[0.08]"
                    >
                      View section <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 5: Experimental Mindset */}
        <section
          id="experimental-mindset"
          data-page-label="Scientific testing"
          className="rounded-3xl border border-sage-green/15 bg-gradient-to-br from-sage-green/[0.09] to-muted-teal/[0.09] p-8 md:p-10"
        >
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-8 w-8 shrink-0 text-sage-green" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Test one change at a time</h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-foreground">
                Treat yourself like a compassionate scientist. Pick exactly one difficulty from above, introduce one small behavioral adjustment, and observe the results for two weeks. Keep what measurably eases your daily effort, adapt what partly helps, and abandon without guilt any system whose maintenance cost exceeds its benefit.
              </p>
            </div>
          </div>
        </section>

        {/* Source Citations */}
        <SourceList
          sources={[
            {
              title: 'Mastering Your Adult ADHD: A Cognitive-Behavioral Treatment Program',
              organization: 'Oxford University Press (Safren, Sprich, Perlman, & Otto)',
              url: 'https://global.oup.com/academic/product/mastering-your-adult-adhd-9780190235567',
              note: 'Gold-standard evidence-based CBT therapist guide and client workbook for adult ADHD executive skill deficits.',
            },
            {
              title: 'Executive Function Disorder & ADHD',
              organization: 'Attention Deficit Disorder Association (ADDA)',
              url: 'https://add.org/executive-function-disorder/',
              note: 'Comprehensive explanation of working memory, prospective memory, time blindness, and why executive dysfunction is not a moral failing.',
            },
            {
              title: 'Treatment of ADHD across the Lifespan',
              organization: 'Centers for Disease Control and Prevention (CDC)',
              url: 'https://www.cdc.gov/adhd/treatment/index.html',
              note: 'Guidelines for behavioral management, environmental scaffolds, task breakdown, and multimodal care by age.',
            },
            {
              title: 'ADHD in Adults: Assessment and Management',
              organization: 'American Psychiatric Association (APA)',
              url: 'https://www.psychiatry.org/patients-families/adhd/adhd-in-adults',
              note: 'Clinical practice guidance covering pharmacotherapy, psychotherapy, organizational coaching, and environmental adaptation.',
            },
            {
              title: 'The Role of Circadian Rhythms and Sleep in ADHD',
              organization: 'Journal of Biological Rhythms (Bijlenga et al.)',
              url: 'https://pubmed.ncbi.nlm.nih.gov/31331238/',
              note: 'Evidence on Delayed Sleep Phase Syndrome (DSPS) in ADHD and the efficacy of morning bright light therapy and sleep hygiene.',
            },
            {
              title: 'Taking Charge of Adult ADHD (Second Edition)',
              organization: 'Guilford Press (Dr. Russell A. Barkley)',
              url: 'https://www.guilford.com/books/Taking-Charge-of-Adult-ADHD/Russell-Barkley/9781462546855',
              note: 'Foundational framework for Point-of-Performance environmental engineering and externalizing executive function.',
            },
          ]}
        />
      </motion.div>
    </ChapterLayoutWide>
  );
}
