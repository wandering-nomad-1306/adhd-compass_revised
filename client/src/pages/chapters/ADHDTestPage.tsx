import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  FileCheck,
  FileText,
  HeartHandshake,
  HelpCircle,
  Layers3,
  MapPin,
  Printer,
  RotateCcw,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Target,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';

// ============================================================================
// 1. QUESTION INTERFACES & DEFINITIONS
// ============================================================================

export type AgeGroup = 'under18' | 'adult';

export type QuestionType = 'single' | 'multi';

export interface OptionItem {
  label: string;
  value: number | string;
}

export const isNonApplicableValue = (val: string | number | undefined | null): boolean => {
  return val === -1 || val === 'none' || val === 'unsure' || val === 'dont_remember';
};

export interface AssessmentQuestion {
  id: number;
  section: 'core' | 'context';
  domain: 'inattention' | 'hyperactivity' | 'context';
  type?: QuestionType;
  question: string;
  prompt: string;
  customOptions?: OptionItem[];
}

// ----------------------------------------------------------------------------
// 18 Fixed Core Questions: 9 Inattentive + 9 Hyperactive/Impulsive
// Mapped 1:1 to established DSM-5-TR symptom domains.
// Written in original plain language by ADHD Compass. Kept verbatim from V2.
// ----------------------------------------------------------------------------
export const CORE_18_QUESTIONS: AssessmentQuestion[] = [
  // --- Inattention Domain (DSM-5 Criteria A1a – A1i) ---
  {
    id: 1,
    section: 'core',
    domain: 'inattention',
    question: 'Do you make careless mistakes or overlook small details when working on assignments, tasks, or projects?',
    prompt:
      'For example: Rushing through work, missing obvious typos or calculation errors, skipping parts of instructions, or having difficulty proofreading before submitting.',
  },
  {
    id: 2,
    section: 'core',
    domain: 'inattention',
    question: 'Do you find it difficult to sustain attention during lengthy reading, classes, lectures, meetings, or repetitive tasks?',
    prompt:
      'For example: Your mind drifting during long articles or discussions, taking much longer than peers to finish reading, or finding yourself re-reading the same page several times.',
  },
  {
    id: 3,
    section: 'core',
    domain: 'inattention',
    question: 'Does your mind wander or seem elsewhere when someone is speaking directly to you?',
    prompt:
      'For example: Losing track of what was just said in one-on-one conversations, missing key instructions, or frequently needing people to repeat themselves.',
  },
  {
    id: 4,
    section: 'core',
    domain: 'inattention',
    question: 'Do you struggle with follow-through, leaving chores, school assignments, or work projects unfinished?',
    prompt:
      'For example: Starting tasks with high energy but abandoning them when 70–80% complete, or needing imminent deadlines to push through to the end.',
  },
  {
    id: 5,
    section: 'core',
    domain: 'inattention',
    question: 'Do you have difficulty organizing tasks, keeping materials in order, or managing your time?',
    prompt:
      'For example: Struggling to break big projects into sequential steps, keeping a messy desk or backpack, or chronically misjudging how long tasks take.',
  },
  {
    id: 6,
    section: 'core',
    domain: 'inattention',
    question: 'Do you avoid, postpone, or intensely dread tasks that require sustained, focused mental effort?',
    prompt:
      'For example: Putting off administrative forms, detailed reports, lengthy essays, or complex paperwork because of the heavy feeling of mental friction.',
  },
  {
    id: 7,
    section: 'core',
    domain: 'inattention',
    question: 'How often do you misplace, lose, or spend time searching for items needed for daily life, school, or work?',
    prompt:
      'For example: Constantly hunting for keys, phone, student ID, wallet, textbooks, assignments, glasses, or necessary daily tools.',
  },
  {
    id: 8,
    section: 'core',
    domain: 'inattention',
    question: 'Are you easily pulled off-track by background noise, movement around you, or unrelated spontaneous thoughts?',
    prompt:
      'For example: Ambient chatter, notifications, or a passing idea derailing your concentration and making it difficult to return to what you were doing.',
  },
  {
    id: 9,
    section: 'core',
    domain: 'inattention',
    question: 'Are you forgetful in routine daily activities, obligations, or scheduled appointments?',
    prompt:
      'For example: Forgetting to return a message, missing an appointment or deadline, forgetting daily chores, or needing frequent reminders for routine errands.',
  },

  // --- Hyperactivity & Impulsivity Domain (DSM-5 Criteria A2a – A2i) ---
  {
    id: 10,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you fidget with your hands or feet, tap pencils, or squirm when seated?',
    prompt:
      'For example: Feeling a physical urge to move your hands, shift your posture constantly, tap your feet, or manipulate objects on your desk.',
  },
  {
    id: 11,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you find it difficult to remain seated in situations where sitting still is expected?',
    prompt:
      'For example: Getting up during classes, lectures, meetings, or long meals, or pacing around the room instead of remaining seated.',
  },
  {
    id: 12,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you experience an internal sense of restlessness, agitation, or a mind that is constantly on the move?',
    prompt:
      'For example: Feeling physically or mentally uneasy during quiet downtime, feeling revved up, even if you manage to look calm on the outside.',
  },
  {
    id: 13,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you find it difficult to engage in quiet leisure activities without needing background stimulation?',
    prompt:
      'For example: Needing music, videos, or podcasts playing while resting or doing routine things, or finding complete silence uncomfortable.',
  },
  {
    id: 14,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you feel "on the go," as if propelled forward by an internal motor that is hard to slow down?',
    prompt:
      'For example: A constant sense of momentum, moving at an intense pace, or having difficulty winding down and decelerating in the evening.',
  },
  {
    id: 15,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you find yourself talking excessively in conversations, classes, or social gatherings?',
    prompt:
      'For example: Speaking rapidly, over-explaining details, jumping from story to story, or being told you dominate conversations.',
  },
  {
    id: 16,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you blurt out answers before someone finishes asking, or speak before thinking things through?',
    prompt:
      'For example: Finishing other people’s sentences, answering before the question is fully spoken, or speaking impulsively before filtering.',
  },
  {
    id: 17,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you experience strong impatience or frustration when having to wait your turn?',
    prompt:
      'For example: Extreme irritation in slow lines, traffic, turn-taking in games, or waiting for someone to get to the point.',
  },
  {
    id: 18,
    section: 'core',
    domain: 'hyperactivity',
    question: 'Do you interrupt others, cut into conversations, or take over tasks without realizing it?',
    prompt:
      'For example: Butting into conversations around you, taking over when someone is moving slowly, or interrupting people when they are busy.',
  },
];

// Standard 5-point Likert scale (0 to 4) for Q1–Q18
export const STANDARD_LIKERT_OPTIONS: OptionItem[] = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Very Often', value: 4 },
];

// 5-point Impact scale for Context Questions 19–23
export const IMPACT_OPTIONS: OptionItem[] = [
  { label: 'Not at all', value: 0 },
  { label: 'A little', value: 1 },
  { label: 'A noticeable amount', value: 2 },
  { label: 'A lot', value: 3 },
  { label: "Doesn't apply to me", value: -1 },
];

// ----------------------------------------------------------------------------
// 8 Replaced Adult Context Questions (Questions 19 to 26)
// Focus on consequences, practical effects, settings, earlier history, and overall interference.
// ----------------------------------------------------------------------------
export const ADULT_CONTEXT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 19,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties with attention, organization, or following through affected your work, studies, or other important responsibilities?',
    prompt:
      'For example, taking longer to complete work, missing deadlines, struggling to keep up with several responsibilities, or needing repeated reminders.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 20,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much trouble have you had keeping up with everyday responsibilities, such as appointments, paperwork, bills, messages, or household tasks?',
    prompt:
      'For example, forgetting to respond to an important email, delaying paperwork, missing an appointment, or having several unfinished household tasks.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 21,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties with attention, remembering commitments, or acting before thinking affected your relationships with other people?',
    prompt:
      'For example, losing track during conversations, forgetting something important to another person, or interrupting without meaning to.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 22,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties estimating time, arriving on time, or keeping track of deadlines disrupted your plans?',
    prompt:
      'For example, underestimating how long it takes to get ready, losing track of time during an activity, or regularly needing to rush.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 23,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much has difficulty getting started on important tasks affected your ability to complete your responsibilities?',
    prompt:
      'For example, knowing exactly what needs to be done but repeatedly putting off starting, even when the task matters to you.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 24,
    section: 'context',
    domain: 'context',
    type: 'multi',
    question:
      'In which areas of your life, if any, have you noticed the difficulties you described?',
    prompt:
      'Select all settings that apply. (Selecting "I have not noticed these difficulties" or "I\'m not sure" will clear other choices).',
    customOptions: [
      { label: 'Work, university, or other regular responsibilities', value: 'work' },
      { label: 'Home and everyday tasks', value: 'home' },
      { label: 'Relationships and conversations', value: 'relationships' },
      { label: 'Hobbies, activities, or personal projects', value: 'hobbies' },
      { label: 'Other areas', value: 'other' },
      { label: 'I have not noticed these difficulties', value: 'none' },
      { label: "I'm not sure", value: 'unsure' },
    ],
  },
  {
    id: 25,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'Thinking back to before age 12, do you remember experiencing similar difficulties with attention, organization, restlessness, or acting impulsively?',
    prompt:
      'Recall school reports, teacher remarks, or childhood patterns. Remembering early childhood can be difficult, and not recalling something is not proof it was absent.',
    customOptions: [
      { label: 'Yes', value: 'yes' },
      { label: 'Maybe', value: 'maybe' },
      { label: 'No', value: 'no' },
      { label: "I don't remember", value: 'dont_remember' },
    ],
  },
  {
    id: 26,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'Overall, how much do the difficulties you described interfere with the things you need or want to do in everyday life?',
    prompt:
      'Consider your general stress levels, goals, energy, and how much effort is required to manage everyday demands.',
    customOptions: [
      { label: 'Not at all', value: 'not_at_all' },
      { label: 'A little', value: 'a_little' },
      { label: 'A noticeable amount', value: 'noticeable' },
      { label: 'A lot', value: 'a_lot' },
      { label: "I'm not sure", value: 'unsure' },
    ],
  },
];

// ----------------------------------------------------------------------------
// 8 Replaced Under-18 Context Questions (Questions 19 to 26)
// Clear, teenager-appropriate questions on learning, homework, school materials, exams, home, friends, settings, and overall impact.
// ----------------------------------------------------------------------------
export const UNDER_18_CONTEXT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 19,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties paying attention or keeping track of explanations affected your ability to understand what is being taught?',
    prompt:
      'For example, missing important instructions, needing explanations repeated, or realizing you missed part of a lesson.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 20,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties starting, concentrating on, or finishing homework made studying harder for you?',
    prompt:
      'For example, sitting down to study but repeatedly getting distracted, taking much longer than expected, or leaving assignments unfinished.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 21,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties keeping track of assignments, school materials, or deadlines affected your schoolwork?',
    prompt:
      'For example, forgetting something needed for class, losing an assignment, or realizing too late that work was due.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 22,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties managing attention or time during tests, exams, or longer projects affected your work?',
    prompt:
      'For example, running out of time, missing part of a question, or finding it difficult to complete a longer project even when you understand the subject.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 23,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties remembering or completing everyday routines caused problems at home?',
    prompt:
      'For example, forgetting things needed for the day, struggling to get ready on time, or leaving chores unfinished.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 24,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'How much have difficulties with attention, restlessness, or acting before thinking affected your interactions with friends or family?',
    prompt:
      'For example, interrupting conversations, missing something someone said, or reacting before thinking things through.',
    customOptions: IMPACT_OPTIONS,
  },
  {
    id: 25,
    section: 'context',
    domain: 'context',
    type: 'multi',
    question:
      'Where have you noticed the difficulties you described?',
    prompt:
      'Select all places that apply. (Selecting "I have not noticed these difficulties" or "I\'m not sure" will clear other choices).',
    customOptions: [
      { label: 'During lessons or schoolwork', value: 'school' },
      { label: 'At home', value: 'home' },
      { label: 'With friends or family', value: 'social' },
      { label: 'During sports, hobbies, or other activities', value: 'activities' },
      { label: 'Somewhere else', value: 'other' },
      { label: 'I have not noticed these difficulties', value: 'none' },
      { label: "I'm not sure", value: 'unsure' },
    ],
  },
  {
    id: 26,
    section: 'context',
    domain: 'context',
    type: 'single',
    question:
      'Overall, how much do these difficulties make school, friendships, activities, or everyday life harder for you?',
    prompt:
      'Consider your school progress, stress, friendships, and how much energy it takes to manage day-to-day expectations.',
    customOptions: [
      { label: 'Not at all', value: 'not_at_all' },
      { label: 'A little', value: 'a_little' },
      { label: 'A noticeable amount', value: 'noticeable' },
      { label: 'A lot', value: 'a_lot' },
      { label: "I'm not sure", value: 'unsure' },
    ],
  },
];

// ============================================================================
// 2. DETERMINISTIC MAPPING: CORE SYMPTOM DESCRIPTIONS & EDUCATIONAL RESOURCES
// ============================================================================

export interface CoreItemMap {
  id: number;
  domain: 'inattention' | 'hyperactivity';
  shortTitle: string;
  inSentence: string;
  resourceTitle: string;
  resourceCategory: 'Everyday Experience' | 'Practical Strategy' | 'Executive Function' | 'Overview';
  resourceReason: string;
  resourceHref: string;
  resourceAction: string;
}

export const CORE_ITEM_MAP: Record<number, CoreItemMap> = {
  1: {
    id: 1,
    domain: 'inattention',
    shortTitle: 'Making avoidable mistakes',
    inSentence: 'making avoidable mistakes or missing details in tasks',
    resourceTitle: 'Why details and instructions slip away',
    resourceCategory: 'Overview',
    resourceReason:
      'You noted making careless mistakes or missing important details. Learn how attentional regulation affects detail proofreading.',
    resourceHref: '/chapter/what-is#presentations',
    resourceAction: 'Understand inattentive presentation →',
  },
  2: {
    id: 2,
    domain: 'inattention',
    shortTitle: 'Losing focus during reading or long tasks',
    inSentence: 'losing focus during long reading, lectures, or tasks',
    resourceTitle: 'Why can I focus deeply on one thing but not another?',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You reported difficulty sustaining attention during routine tasks. This chapter explores how interest and novelty regulate focus.',
    resourceHref: '/chapter/why-feels#experience-focus',
    resourceAction: 'Explore focus regulation →',
  },
  3: {
    id: 3,
    domain: 'inattention',
    shortTitle: 'Mind wandering during direct conversations',
    inSentence: 'your mind wandering when someone speaks to you directly',
    resourceTitle: 'Conversational drift and attentional regulation',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You mentioned losing track during one-on-one conversations. Learn why attentional drift occurs even when you care about the discussion.',
    resourceHref: '/chapter/why-feels#experience-focus',
    resourceAction: 'Read about conversational focus →',
  },
  4: {
    id: 4,
    domain: 'inattention',
    shortTitle: 'Leaving started tasks unfinished',
    inSentence: 'starting projects with energy but leaving them unfinished',
    resourceTitle: 'Planning and task completion',
    resourceCategory: 'Executive Function',
    resourceReason:
      'You noted starting projects but leaving them incomplete. Learn how executive planning and checkpoints help bring projects to completion.',
    resourceHref: '/chapter/brain/executive-functions?function=planning#main-functions',
    resourceAction: 'Understand planning & completion →',
  },
  5: {
    id: 5,
    domain: 'inattention',
    shortTitle: 'Organizing tasks and tracking deadlines',
    inSentence: 'struggling to organize tasks, keep materials in order, and track deadlines',
    resourceTitle: 'Breaking down multi-step overwhelm',
    resourceCategory: 'Practical Strategy',
    resourceReason:
      'You reported difficulty organizing tasks and keeping things in order. This guide shows how offloading plans onto paper prevents freeze.',
    resourceHref: '/chapter/what-helps?difficulty=overwhelmed#common-difficulties',
    resourceAction: 'See organizational strategies →',
  },
  6: {
    id: 6,
    domain: 'inattention',
    shortTitle: 'Delaying tasks requiring sustained mental effort',
    inSentence: 'dreading or putting off tasks that require sustained mental effort',
    resourceTitle: 'Why can’t I just start?',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You reported avoiding or postponing tasks that require heavy mental effort. This section explains executive initiation friction.',
    resourceHref: '/chapter/why-feels#experience-starting',
    resourceAction: 'Explore task initiation →',
  },
  7: {
    id: 7,
    domain: 'inattention',
    shortTitle: 'Misplacing essential belongings',
    inSentence: 'misplacing or spending time searching for everyday belongings',
    resourceTitle: 'Fixed landing zones for essential items',
    resourceCategory: 'Practical Strategy',
    resourceReason:
      'You frequently reported losing essential belongings. Explore environmental landing zones that prevent items from vanishing.',
    resourceHref: '/chapter/what-helps?difficulty=forgetting#common-difficulties',
    resourceAction: 'See point-of-performance tools →',
  },
  8: {
    id: 8,
    domain: 'inattention',
    shortTitle: 'Being easily pulled off-track by distractions',
    inSentence: 'getting pulled off-track by background noise, movement, or random thoughts',
    resourceTitle: 'Distraction shielding and parking lot pads',
    resourceCategory: 'Practical Strategy',
    resourceReason:
      'You noted getting easily pulled off-track by surroundings or spontaneous thoughts. Learn ways to capture thoughts without losing your place.',
    resourceHref: '/chapter/what-helps?difficulty=distraction#common-difficulties',
    resourceAction: 'See distraction strategies →',
  },
  9: {
    id: 9,
    domain: 'inattention',
    shortTitle: 'Forgetting appointments and obligations',
    inSentence: 'forgetting routine appointments, obligations, and chores',
    resourceTitle: 'Why do I forget things I meant to remember?',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You reported frequently forgetting obligations and appointments. Explore why keeping track of future intentions requires visible external cues.',
    resourceHref: '/chapter/why-feels#experience-forgetting',
    resourceAction: 'Explore prospective memory →',
  },
  10: {
    id: 10,
    domain: 'hyperactivity',
    shortTitle: 'Fidgeting and physical restlessness',
    inSentence: 'fidgeting with hands or feet, tapping, and feeling restless when seated',
    resourceTitle: 'Movement and motor restlessness in ADHD',
    resourceCategory: 'Overview',
    resourceReason:
      'You reported frequent physical fidgeting. Learn how movement can serve as an unconscious way the nervous system stimulates alertness.',
    resourceHref: '/chapter/what-is#presentations',
    resourceAction: 'Read about hyperactive presentation →',
  },
  11: {
    id: 11,
    domain: 'hyperactivity',
    shortTitle: 'Difficulty staying seated',
    inSentence: 'feeling the urge to get up when expected to remain seated',
    resourceTitle: 'Active work and movement accommodations',
    resourceCategory: 'Practical Strategy',
    resourceReason:
      'You noted difficulty remaining seated during meetings or classes. Explore sensory and active work accommodations.',
    resourceHref: '/chapter/what-helps?difficulty=distraction#common-difficulties',
    resourceAction: 'See movement adaptations →',
  },
  12: {
    id: 12,
    domain: 'hyperactivity',
    shortTitle: 'Inner restlessness and racing thoughts',
    inSentence: 'feeling an internal sense of restlessness or a mind constantly on edge',
    resourceTitle: 'Adult internalized restlessness',
    resourceCategory: 'Overview',
    resourceReason:
      'You described feeling an internal sense of restlessness. Learn how childhood physical hyperactivity often internalizes in adulthood.',
    resourceHref: '/chapter/what-is#presentations',
    resourceAction: 'Explore internalized restlessness →',
  },
  13: {
    id: 13,
    domain: 'hyperactivity',
    shortTitle: 'Difficulty relaxing quietly',
    inSentence: 'finding it hard to quietly engage in leisure or relaxation',
    resourceTitle: 'Dopaminergic salience and quiet downtime',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You noted finding quiet downtime under-stimulating or uncomfortable. Explore why low-stimulation settings can feel physically agitating.',
    resourceHref: '/chapter/why-feels#experience-focus',
    resourceAction: 'Explore downtime friction →',
  },
  14: {
    id: 14,
    domain: 'hyperactivity',
    shortTitle: 'Feeling driven by an internal motor',
    inSentence: 'feeling powered by an internal motor that is difficult to slow down',
    resourceTitle: 'Understanding the "internal motor"',
    resourceCategory: 'Overview',
    resourceReason:
      'You noted feeling propelled forward at an intense pace. This section explores how pacing differences are understood in clinical research.',
    resourceHref: '/chapter/what-is#presentations',
    resourceAction: 'Read about the internal motor →',
  },
  15: {
    id: 15,
    domain: 'hyperactivity',
    shortTitle: 'Talking rapidly or excessively',
    inSentence: 'talking excessively or finding it difficult to slow down your speaking',
    resourceTitle: 'Response inhibition and verbal pacing',
    resourceCategory: 'Executive Function',
    resourceReason:
      'You noted speaking quickly or at length. Learn how executive inhibitory control influences conversational pacing.',
    resourceHref: '/chapter/brain/executive-functions?function=inhibition#main-functions',
    resourceAction: 'Understand response inhibition →',
  },
  16: {
    id: 16,
    domain: 'hyperactivity',
    shortTitle: 'Speaking before thinking or blurting answers',
    inSentence: 'blurting out answers or finishing others’ sentences before they finish',
    resourceTitle: 'The executive pause mechanism',
    resourceCategory: 'Executive Function',
    resourceReason:
      'You reported speaking before others finish their thought. Read why the brain’s pause mechanism is critical for conversational timing.',
    resourceHref: '/chapter/brain/executive-functions?function=inhibition#main-functions',
    resourceAction: 'Understand the inhibitory pause →',
  },
  17: {
    id: 17,
    domain: 'hyperactivity',
    shortTitle: 'Impatience and difficulty waiting',
    inSentence: 'feeling strong impatience or frustration when having to wait your turn',
    resourceTitle: 'Why do deadlines suddenly work?',
    resourceCategory: 'Everyday Experience',
    resourceReason:
      'You noted difficulty with waiting in lines or situations. Learn why delays trigger intense cognitive and emotional discomfort.',
    resourceHref: '/chapter/why-feels#experience-deadlines',
    resourceAction: 'Explore delay aversion →',
  },
  18: {
    id: 18,
    domain: 'hyperactivity',
    shortTitle: 'Interrupting conversations or intruding',
    inSentence: 'interrupting conversations or jumping into what others are doing',
    resourceTitle: 'Mindful engagement and conversation pacing',
    resourceCategory: 'Practical Strategy',
    resourceReason:
      'You reported interrupting others or jumping in uninvited. Explore practical conversational strategies that reduce accidental interruptions.',
    resourceHref: '/chapter/what-helps?difficulty=distraction#common-difficulties',
    resourceAction: 'See conversational strategies →',
  },
};

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

export default function ADHDTestPage() {
  const [, setLocation] = useLocation();

  // State
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Active question set based on age group
  const activeQuestions: AssessmentQuestion[] = useMemo(() => {
    if (!ageGroup) return CORE_18_QUESTIONS;
    const contextQuestions =
      ageGroup === 'under18' ? UNDER_18_CONTEXT_QUESTIONS : ADULT_CONTEXT_QUESTIONS;
    return [...CORE_18_QUESTIONS, ...contextQuestions];
  }, [ageGroup]);

  const currentQ = activeQuestions[currentIndex] ?? activeQuestions[0];
  const totalQuestions = activeQuestions.length; // 26
  const answeredCount = Object.keys(answers).length;

  // Multi-selection helper
  const isCurrentMulti = currentQ?.type === 'multi';
  const currentMultiValue: string[] = useMemo(() => {
    if (!currentQ || !isCurrentMulti) return [];
    const val = answers[currentQ.id];
    if (Array.isArray(val)) return val;
    return [];
  }, [answers, currentQ, isCurrentMulti]);

  const isCurrentAnswered = useMemo(() => {
    if (!currentQ) return false;
    const val = answers[currentQ.id];
    if (val === undefined) return false;
    if (isCurrentMulti) {
      return Array.isArray(val) && val.length > 0;
    }
    return true;
  }, [answers, currentQ, isCurrentMulti]);

  // Options for current question
  const currentOptions: OptionItem[] = currentQ?.customOptions ?? STANDARD_LIKERT_OPTIONS;

  // Single-option selection handler
  const handleSelectSingleOption = (value: number | string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: value,
    }));
  };

  // Multi-option toggle handler (for Q24 adult and Q25 under18)
  const handleToggleMultiOption = (optionValue: string) => {
    if (!currentQ) return;
    setAnswers((prev) => {
      const currentList: string[] = Array.isArray(prev[currentQ.id]) ? [...prev[currentQ.id]] : [];

      // Mutually exclusive handling:
      if (optionValue === 'none' || optionValue === 'unsure') {
        // If clicking "none" or "unsure", clear all specific settings
        return {
          ...prev,
          [currentQ.id]: [optionValue],
        };
      }

      // If clicking a specific setting, remove "none" and "unsure"
      const filtered = currentList.filter((item) => item !== 'none' && item !== 'unsure');
      const idx = filtered.indexOf(optionValue);
      if (idx !== -1) {
        filtered.splice(idx, 1);
      } else {
        filtered.push(optionValue);
      }

      return {
        ...prev,
        [currentQ.id]: filtered,
      };
    });
  };

  // Set age group and clear Q19+ to prevent state leakage
  const handleSelectAgeGroup = (group: AgeGroup) => {
    setAgeGroup(group);
    setCurrentIndex(0);
    setAnswers((prev) => {
      const coreOnly: Record<number, any> = {};
      for (let i = 1; i <= 18; i++) {
        if (prev[i] !== undefined) coreOnly[i] = prev[i];
      }
      return coreOnly;
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (answeredCount >= totalQuestions) {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Return to age selection
      setAgeGroup(null);
    }
  };

  const handleFinish = () => {
    if (answeredCount >= totalQuestions) {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAgeGroup(null);
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut listener: 1-4 for scale options, 5/0/N for non-applicable option, Enter/Right for next, Left for previous
  useEffect(() => {
    if (!ageGroup || isCompleted || !currentQ || isCurrentMulti) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const valIdx = parseInt(e.key, 10) - 1;
        if (valIdx < currentOptions.length) {
          handleSelectSingleOption(currentOptions[valIdx].value);
        }
      } else if (e.key === '5') {
        if (currentOptions.length >= 5) {
          handleSelectSingleOption(currentOptions[4].value);
        }
      } else if (e.key === '0' || e.key.toLowerCase() === 'n') {
        const nonAppOpt = currentOptions.find((opt) => isNonApplicableValue(opt.value));
        if (nonAppOpt) {
          handleSelectSingleOption(nonAppOpt.value);
        }
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (isCurrentAnswered) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ageGroup, currentIndex, answers, isCompleted, currentQ, currentOptions, isCurrentAnswered, isCurrentMulti]);

  // ============================================================================
  // 4. DETERMINISTIC PERSONALIZED EVALUATION ENGINE (V3)
  // Transparent, Evidence-Conscious, Plain-English, Non-Diagnostic
  // ============================================================================

  const evaluation = useMemo(() => {
    const isAdult = ageGroup === 'adult';

    // ------------------------------------------------------------------------
    // Step A: Analyze 18 Core Symptoms
    // ------------------------------------------------------------------------
    const coreScores: Array<{
      id: number;
      domain: 'inattention' | 'hyperactivity';
      value: number;
      info: CoreItemMap;
    }> = [];

    let inattentionSum = 0;
    let inattentionFrequentCount = 0; // rating >= 3 (Often / Very Often)
    let hyperactiveSum = 0;
    let hyperactiveFrequentCount = 0; // rating >= 3 (Often / Very Often)

    for (let i = 1; i <= 18; i++) {
      const rawVal = answers[i];
      const val = typeof rawVal === 'number' ? rawVal : 0;
      const info = CORE_ITEM_MAP[i];
      if (info) {
        coreScores.push({
          id: i,
          domain: info.domain,
          value: val,
          info,
        });

        if (info.domain === 'inattention') {
          inattentionSum += val;
          if (val >= 3) inattentionFrequentCount++;
        } else {
          hyperactiveSum += val;
          if (val >= 3) hyperactiveFrequentCount++;
        }
      }
    }

    // Sort items by rating descending to identify the person's strongest difficulties
    const sortedCore = [...coreScores].sort((a, b) => b.value - a.value);

    // Filter top rated items (Often or Very Often)
    const frequentItems = sortedCore.filter((item) => item.value >= 3);
    const sometimesItems = sortedCore.filter((item) => item.value === 2);
    const rarelyNeverItems = sortedCore.filter((item) => item.value <= 1);

    // ------------------------------------------------------------------------
    // Step B: Select Personalized Headline (Descriptive, not diagnostic)
    // ------------------------------------------------------------------------
    let headline = 'You reported these difficulties less often overall.';

    const totalFrequent = inattentionFrequentCount + hyperactiveFrequentCount;
    const maxCoreVal = sortedCore.length > 0 ? sortedCore[0].value : 0;

    if (totalFrequent === 0) {
      if (sometimesItems.length >= 4) {
        headline = 'You reported experiencing these difficulties occasionally or sometimes.';
      } else {
        headline = 'You reported these difficulties less often overall.';
      }
    } else if (inattentionFrequentCount >= 1 && hyperactiveFrequentCount >= 1 && Math.abs(inattentionFrequentCount - hyperactiveFrequentCount) <= 2) {
      headline = 'You reported difficulties with both attention and restlessness or impulsive actions.';
    } else if (inattentionFrequentCount > hyperactiveFrequentCount) {
      headline = 'Attention and organization stood out most in your answers.';
    } else if (hyperactiveFrequentCount > inattentionFrequentCount) {
      headline = 'Restlessness and impulsive actions stood out most in your answers.';
    } else if (inattentionSum > hyperactiveSum + 2) {
      headline = 'Attention and organization stood out most in your answers.';
    } else if (hyperactiveSum > inattentionSum + 2) {
      headline = 'Restlessness and impulsive actions stood out most in your answers.';
    } else {
      headline = 'You reported difficulties with both attention and restlessness or impulsive actions.';
    }

    // ------------------------------------------------------------------------
    // Step C: Generate First Paragraph (Specific Core Experiences)
    // ------------------------------------------------------------------------
    let firstParagraph = '';

    if (frequentItems.length >= 1) {
      // Pick 2 or 3 strongest experiences
      const topPhrases = frequentItems.slice(0, 3).map((item) => item.info.inSentence);

      if (topPhrases.length === 1) {
        firstParagraph = `You often reported ${topPhrases[0]}.`;
      } else if (topPhrases.length === 2) {
        firstParagraph = `You often reported ${topPhrases[0]}, as well as ${topPhrases[1]}.`;
      } else {
        firstParagraph = `You frequently reported ${topPhrases[0]}, ${topPhrases[1]}, and ${topPhrases[2]}.`;
      }
    } else if (sometimesItems.length >= 1) {
      const topPhrases = sometimesItems.slice(0, 2).map((item) => item.info.inSentence);
      if (topPhrases.length === 1) {
        firstParagraph = `You reported experiencing ${topPhrases[0]} sometimes, rather than on a constant basis.`;
      } else {
        firstParagraph = `You reported experiencing ${topPhrases[0]} and ${topPhrases[1]} sometimes, rather than on a daily or constant basis.`;
      }
    } else {
      firstParagraph =
        'You reported few difficulties with attention, restlessness, or impulsivity across the areas covered by this self-assessment. Most patterns were marked as occurring rarely or never.';
    }

    // ------------------------------------------------------------------------
    // Step D: Analyze Context & Life Impact (Questions 19–26)
    // ------------------------------------------------------------------------
    let contextParagraph = '';
    const highImpactAreas: string[] = [];

    if (isAdult) {
      // Adult Q19–23 Impact questions
      const q19Val = answers[19]; // Work/study
      const q20Val = answers[20]; // Life admin
      const q21Val = answers[21]; // Relationships
      const q22Val = answers[22]; // Time
      const q23Val = answers[23]; // Starting

      if (q19Val >= 2) highImpactAreas.push('work or studies');
      if (q20Val >= 2) highImpactAreas.push('everyday responsibilities and life administration');
      if (q21Val >= 2) highImpactAreas.push('conversations and relationships');
      if (q22Val >= 2) highImpactAreas.push('time management and keeping plans');
      if (q23Val >= 2) highImpactAreas.push('getting started on important tasks');

      // Q24 Settings
      const settingsVal: string[] = Array.isArray(answers[24]) ? answers[24] : [];
      const settingLabels: string[] = [];
      if (settingsVal.includes('work')) settingLabels.push('at work or university');
      if (settingsVal.includes('home')) settingLabels.push('at home');
      if (settingsVal.includes('relationships')) settingLabels.push('in relationships');
      if (settingsVal.includes('hobbies')) settingLabels.push('in personal activities');

      // Q25 Childhood before 12
      const childhoodVal = answers[25];
      let childhoodNote = '';
      if (childhoodVal === 'yes') {
        childhoodNote = 'You recalled experiencing similar difficulties during childhood before age 12.';
      } else if (childhoodVal === 'maybe') {
        childhoodNote = 'You noted you may have experienced similar patterns in childhood, though you are not completely certain.';
      } else if (childhoodVal === 'dont_remember') {
        childhoodNote = 'You indicated you do not remember your early childhood history, which is common and does not rule out ADHD.';
      } else if (childhoodVal === 'no') {
        childhoodNote = 'You noted that you did not recall experiencing similar difficulties in childhood before age 12.';
      }

      // Q26 Overall impact
      const q26Val = answers[26];
      let overallNote = '';
      if (q26Val === 'a_lot') {
        overallNote = 'Overall, you reported that these difficulties create a lot of interference in everyday life.';
      } else if (q26Val === 'noticeable') {
        overallNote = 'Overall, you described these difficulties as having a noticeable effect on your everyday life.';
      } else if (q26Val === 'a_little') {
        overallNote = 'Overall, you noted a small amount of everyday interference.';
      } else if (q26Val === 'not_at_all') {
        overallNote = 'Overall, you reported that these patterns do not significantly interfere with what you need or want to do.';
      } else if (q26Val === 'unsure') {
        overallNote = 'You noted being unsure about the total overall interference on everyday life.';
      }

      // Build synthesized context paragraph
      const contextPieces: string[] = [];
      if (highImpactAreas.length > 0) {
        if (highImpactAreas.length === 1) {
          contextPieces.push(`You also noted that these difficulties have a noticeable effect on your ${highImpactAreas[0]}.`);
        } else if (highImpactAreas.length === 2) {
          contextPieces.push(`You also noted that these difficulties make your ${highImpactAreas[0]} harder and have a noticeable effect on ${highImpactAreas[1]}.`);
        } else {
          contextPieces.push(`You also reported noticeable difficulties across several areas, including ${highImpactAreas.slice(0, 2).join(' and ')}.`);
        }
      }

      if (settingLabels.length >= 2) {
        contextPieces.push(`You reported experiencing these challenges in multiple settings, including both ${settingLabels[0]} and ${settingLabels[1]}.`);
      } else if (settingLabels.length === 1) {
        contextPieces.push(`You noted experiencing them primarily ${settingLabels[0]}.`);
      }

      if (overallNote) contextPieces.push(overallNote);
      if (childhoodNote) contextPieces.push(childhoodNote);

      contextParagraph = contextPieces.join(' ');
    } else {
      // Under 18 Q19–26
      const q19Val = answers[19]; // Lessons
      const q20Val = answers[20]; // Homework
      const q21Val = answers[21]; // School organization
      const q22Val = answers[22]; // Exams
      const q23Val = answers[23]; // Home routines
      const q24Val = answers[24]; // Friends/family

      if (q19Val >= 2) highImpactAreas.push('following class explanations');
      if (q20Val >= 2) highImpactAreas.push('completing homework');
      if (q21Val >= 2) highImpactAreas.push('keeping school materials organized');
      if (q22Val >= 2) highImpactAreas.push('managing time during tests and long projects');
      if (q23Val >= 2) highImpactAreas.push('remembering daily routines at home');
      if (q24Val >= 2) highImpactAreas.push('interactions with friends or family');

      const settingsVal: string[] = Array.isArray(answers[25]) ? answers[25] : [];
      const settingLabels: string[] = [];
      if (settingsVal.includes('school')) settingLabels.push('at school');
      if (settingsVal.includes('home')) settingLabels.push('at home');
      if (settingsVal.includes('social')) settingLabels.push('with friends');
      if (settingsVal.includes('activities')) settingLabels.push('during activities');

      const q26Val = answers[26];
      let overallNote = '';
      if (q26Val === 'a_lot') {
        overallNote = 'Overall, you reported that these difficulties create a lot of interference with school and everyday life.';
      } else if (q26Val === 'noticeable') {
        overallNote = 'Overall, you described these difficulties as having a noticeable effect on school and everyday routines.';
      } else if (q26Val === 'a_little') {
        overallNote = 'Overall, you reported a small amount of difficulty with school or everyday activities.';
      } else if (q26Val === 'not_at_all') {
        overallNote = 'Overall, you noted that these patterns do not significantly interfere with school or day-to-day life.';
      } else if (q26Val === 'unsure') {
        overallNote = 'You noted being unsure about the total overall interference on school and everyday routines.';
      }

      const contextPieces: string[] = [];
      if (highImpactAreas.length > 0) {
        if (highImpactAreas.length === 1) {
          contextPieces.push(`You also said these difficulties affect ${highImpactAreas[0]}.`);
        } else if (highImpactAreas.length === 2) {
          contextPieces.push(`You also said ${highImpactAreas[0]} and ${highImpactAreas[1]} are difficult.`);
        } else {
          contextPieces.push(`You also reported noticeable challenges with ${highImpactAreas.slice(0, 2).join(' and ')}.`);
        }
      }

      if (settingLabels.length >= 2) {
        contextPieces.push(`You noted that these challenges occur in more than one place, including both ${settingLabels[0]} and ${settingLabels[1]}.`);
      } else if (settingLabels.length === 1) {
        contextPieces.push(`You noted experiencing them primarily ${settingLabels[0]}.`);
      }

      if (overallNote) contextPieces.push(overallNote);

      contextParagraph = contextPieces.join(' ');
    }

    // ------------------------------------------------------------------------
    // Step E: Deterministic Personalized Educational Recommendations
    // Select 2 to 3 tailored links with high variety based on the user's answers
    // ------------------------------------------------------------------------
    interface RecItem {
      title: string;
      category: 'Everyday Experience' | 'Practical Strategy' | 'Executive Function' | 'Overview';
      reason: string;
      href: string;
      actionText: string;
    }

    const recommendations: RecItem[] = [];
    const usedCategories = new Set<string>();
    const usedHrefs = new Set<string>();

    const addRec = (rec: RecItem) => {
      if (recommendations.length >= 3) return;
      if (usedHrefs.has(rec.href)) return;
      usedHrefs.add(rec.href);
      usedCategories.add(rec.category);
      recommendations.push(rec);
    };

    // If the person has high-frequency core symptoms, recommend matching resources
    if (frequentItems.length > 0) {
      // 1. Try to find a matching Everyday Experience from the top items
      for (const item of frequentItems) {
        const info = item.info;
        if (info.resourceCategory === 'Everyday Experience') {
          addRec({
            title: info.resourceTitle,
            category: info.resourceCategory,
            reason: info.resourceReason,
            href: info.resourceHref,
            actionText: info.resourceAction,
          });
          break;
        }
      }

      // 2. Try to find a matching Practical Strategy from top items or high impact context
      for (const item of frequentItems) {
        const info = item.info;
        if (info.resourceCategory === 'Practical Strategy') {
          addRec({
            title: info.resourceTitle,
            category: info.resourceCategory,
            reason: info.resourceReason,
            href: info.resourceHref,
            actionText: info.resourceAction,
          });
          break;
        }
      }

      // Check contextual answers for practical strategy matches
      if (recommendations.length < 3) {
        if (isAdult && answers[22] >= 2) {
          // Time management
          addRec({
            title: 'Time blindness: making time visible',
            category: 'Practical Strategy',
            reason:
              'You noted that estimating time or keeping track of deadlines disrupts your plans. Learn how visual timers and reality multipliers help ground schedules.',
            href: '/chapter/what-helps?difficulty=time#common-difficulties',
            actionText: 'See time strategies →',
          });
        } else if (isAdult && answers[23] >= 2) {
          // Task starting
          addRec({
            title: 'Why can’t I just start?',
            category: 'Everyday Experience',
            reason:
              'You noted severe difficulty getting started on important tasks. Learn why task initiation requires specific dopamine activation.',
            href: '/chapter/why-feels#experience-starting',
            actionText: 'Explore task starting →',
          });
        } else if (isAdult && answers[20] >= 2) {
          // Life admin
          addRec({
            title: 'Managing life administration & household systems',
            category: 'Practical Strategy',
            reason:
              'You reported difficulty staying on top of everyday administrative tasks. Explore single-source capture and visible physical landing zones.',
            href: '/chapter/what-helps?difficulty=forgetting#common-difficulties',
            actionText: 'See memory tools →',
          });
        }
      }

      // 3. Try to find a matching Executive Function or Overview concept
      for (const item of frequentItems) {
        const info = item.info;
        if (info.resourceCategory === 'Executive Function' || info.resourceCategory === 'Overview') {
          addRec({
            title: info.resourceTitle,
            category: info.resourceCategory,
            reason: info.resourceReason,
            href: info.resourceHref,
            actionText: info.resourceAction,
          });
          break;
        }
      }
    }

    // Fallback: If fewer than 2 recommendations were populated (e.g. low-frequency responses)
    if (recommendations.length < 2) {
      if (sometimesItems.length > 0) {
        const topSometimes = sometimesItems[0].info;
        addRec({
          title: topSometimes.resourceTitle,
          category: topSometimes.resourceCategory,
          reason: `You mentioned experiencing ${topSometimes.inSentence} occasionally. This resource provides insight into how that pattern works.`,
          href: topSometimes.resourceHref,
          actionText: topSometimes.resourceAction,
        });
      }

      addRec({
        title: 'What is ADHD? Clinical Foundations',
        category: 'Overview',
        reason:
          'Explore an evidence-based overview of ADHD diagnostic presentations and how clinical evaluations separate ADHD from ordinary distraction.',
        href: '/chapter/what-is#presentations',
        actionText: 'Read about ADHD presentations →',
      });

      addRec({
        title: 'What Actually Helps: Evidence-Based Scaffolds',
        category: 'Practical Strategy',
        reason:
          'Explore practical systems that reduce cognitive friction, regardless of whether you have an ADHD diagnosis.',
        href: '/chapter/what-helps#common-difficulties',
        actionText: 'Explore strategies →',
      });
    }

    // ------------------------------------------------------------------------
    // Step F: Detailed Core Item Lists for Level 2
    // ------------------------------------------------------------------------
    const inattentionItems = sortedCore.filter((i) => i.domain === 'inattention');
    const hyperactiveItems = sortedCore.filter((i) => i.domain === 'hyperactivity');

    const inattentionFrequent = inattentionItems.filter((i) => i.value >= 3);
    const inattentionInfrequent = inattentionItems.filter((i) => i.value <= 1);

    const hyperactiveFrequent = hyperactiveItems.filter((i) => i.value >= 3);
    const hyperactiveInfrequent = hyperactiveItems.filter((i) => i.value <= 1);

    // ------------------------------------------------------------------------
    // Step G: Clinical Likelihood Categorization (Image 1 Color Scheme & Delivery)
    // Red = High chances, Amber = Moderate chances, Forest Green = Low chances
    // ------------------------------------------------------------------------
    const isHighCombined =
      (inattentionFrequentCount >= 5 && hyperactiveFrequentCount >= 4) ||
      (inattentionFrequentCount >= 6 && hyperactiveFrequentCount >= 3) ||
      totalFrequent >= 9;

    const isHighInattentive = !isHighCombined && inattentionFrequentCount >= 5;
    const isHighHyperactive = !isHighCombined && hyperactiveFrequentCount >= 5;
    const isHighMatch = isHighCombined || isHighInattentive || isHighHyperactive;

    const isModerateMatch =
      !isHighMatch &&
      (inattentionFrequentCount >= 4 || hyperactiveFrequentCount >= 4 || totalFrequent >= 5);

    const likelihood = isHighMatch
      ? {
          tier: 'high' as const,
          badge: isHighCombined
            ? 'HIGH MATCH · COMBINED INATTENTIVE & HYPERACTIVE PROFILE'
            : isHighInattentive
            ? 'HIGH MATCH · PREDOMINANTLY INATTENTIVE PROFILE'
            : 'HIGH MATCH · PREDOMINANTLY HYPERACTIVE-IMPULSIVE PROFILE',
          badgeBg: 'bg-[#991b1b]',
          badgeText: 'text-white',
          color: '#991b1b', // Deep rich crimson burgundy
          headline: isHighCombined
            ? 'Your responses reflect a strong Combined profile with elevated inattention and restlessness.'
            : isHighInattentive
            ? 'Your responses reflect a strong Inattentive profile with frequent focus and executive challenges.'
            : 'Your responses reflect a strong Hyperactive-Impulsive profile with elevated restlessness and impulsivity.',
          leadSubtitle: isAdult
            ? 'Meets standard adult criteria across key ADHD symptom areas.'
            : 'Meets standard criteria across key ADHD symptom areas.',
          likelihoodSummary:
            'Based on your answers, your daily experiences strongly match the patterns seen in ADHD. You reported frequent, persistent challenges that create noticeable friction across multiple areas of your life.',
          doctorSuggestion:
            'Because these patterns are creating ongoing friction across multiple areas of your life, we strongly suggest discussing these results with a doctor, psychiatrist, or clinical psychologist. They can provide an official, comprehensive evaluation.',
        }
      : isModerateMatch
      ? {
          tier: 'moderate' as const,
          badge: inattentionFrequentCount >= hyperactiveFrequentCount
            ? 'MODERATE MATCH · INATTENTIVE / MASKING PROFILE'
            : 'MODERATE MATCH · RESTLESS / IMPULSIVE PROFILE',
          badgeBg: 'bg-[#b45309]',
          badgeText: 'text-white',
          color: '#b45309', // Warm rich burnt amber / chestnut as in Image 1
          headline: 'Your responses reflect a notable match with potential high-effort compensation.',
          leadSubtitle: isAdult
            ? 'Meets attention criteria with lower physical restlessness, characteristic of masking.'
            : 'Meets attention criteria with lower physical restlessness.',
          likelihoodSummary:
            'Your answers show a noticeable match with ADHD patterns. You reported frequent difficulties with focus, starting tasks, or mental fatigue. This is very common in people who have learned to mask their difficulties or work twice as hard behind the scenes to keep up.',
          doctorSuggestion:
            'A formal conversation with a healthcare professional can help clarify whether your focus difficulties stem from ADHD, high-effort compensation, anxiety, or chronic cognitive burnout.',
        }
      : {
          tier: 'low' as const,
          badge: 'LOW MATCH · FEW ELEVATED SYMPTOMS REPORTED',
          badgeBg: 'bg-[#1e3a2f]',
          badgeText: 'text-white',
          color: '#1e3a2f', // Deep rich forest spruce
          headline: 'Your responses reflect low chances of ADHD with few elevated symptoms.',
          leadSubtitle: 'Reported symptoms fall below standard thresholds for adult ADHD.',
          likelihoodSummary:
            'Based on your answers, there is a low likelihood that ADHD is the primary cause of your difficulties. You reported experiencing occasional moments of distraction or restlessness, but they do not appear at the persistent, cross-situational frequency typical of ADHD.',
          doctorSuggestion:
            'While ADHD appears unlikely from your answers, if you are currently feeling overwhelmed or struggling to concentrate, it may be helpful to look into sleep quality, stress levels, or recent lifestyle changes with a doctor.',
        };

    return {
      isAdult,
      headline,
      firstParagraph,
      contextParagraph,
      inattentionFrequentCount,
      hyperactiveFrequentCount,
      totalFrequent,
      inattentionFrequent,
      inattentionInfrequent,
      hyperactiveFrequent,
      hyperactiveInfrequent,
      recommendations: recommendations.slice(0, 3),
      highImpactAreas,
      likelihood,
    };
  }, [answers, ageGroup]);

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. DEDICATED PRINTABLE CLINICAL NOTES (Hidden on screen, prints clean) */}
      {/* ==================================================================== */}
      <div className="hidden print:block font-sans text-black p-6 max-w-4xl mx-auto leading-normal">
        {/* Document Header */}
        <div className="border-b-2 border-black pb-4 mb-5 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ADHD COMPASS — SELF-ASSESSMENT DISCUSSION AID</h1>
            <p className="text-xs text-stone-600 mt-1">
              Structured patient self-reflection aid based on established DSM-5-TR symptom domains.
            </p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">Confidential Discussion Aid</p>
            <p className="text-stone-600">
              Age Group: {evaluation.isAdult ? '18 or Older (Adult Context)' : 'Under 18 (School Context)'}
            </p>
            <p className="text-stone-600">
              Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-stone-500">Source: adhdcompass.in</p>
          </div>
        </div>

        {/* Clinical Summary Box */}
        <div className="border border-stone-800 p-4 rounded mb-5 bg-stone-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Assessment Summary
            </span>
            <span className="text-xs font-mono font-bold">
              Total Questions Answered: {answeredCount} / {totalQuestions}
            </span>
          </div>

          <h2 className="text-base font-bold text-stone-900 mb-2">
            {evaluation.headline}
          </h2>

          <p className="text-xs text-stone-800 leading-relaxed mb-3">
            {evaluation.firstParagraph}
          </p>

          {evaluation.contextParagraph && (
            <p className="text-xs text-stone-700 leading-relaxed mb-3 border-t border-stone-200 pt-2">
              {evaluation.contextParagraph}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 border-t border-stone-300 pt-2 text-xs">
            <div>
              <p className="font-bold text-stone-800">Part A: Core Symptoms (18 Items)</p>
              <p>• Attention & Organization: {evaluation.inattentionFrequentCount} of 9 patterns reported frequently (Often/Very Often)</p>
              <p>• Restlessness & Impulsive Actions: {evaluation.hyperactiveFrequentCount} of 9 patterns reported frequently (Often/Very Often)</p>
            </div>
            <div>
              <p className="font-bold text-stone-800">Part B: Context & Impact (8 Items)</p>
              <p>• Reported High Impact Areas: {evaluation.highImpactAreas.length > 0 ? evaluation.highImpactAreas.join(', ') : 'None marked as high impact'}</p>
            </div>
          </div>
        </div>

        {/* Complete 26-Question Response Record */}
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-stone-300 pb-1">
            Complete Itemized Response Record (26 Questions)
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-100">
                <th className="py-1 px-1.5 w-8">#</th>
                <th className="py-1 px-1.5 w-24">Section</th>
                <th className="py-1 px-2">Question & Context Prompt</th>
                <th className="py-1 px-2 w-36 text-right">Patient Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {activeQuestions.map((q) => {
                const val = answers[q.id];
                let displayVal = 'Not answered';
                let isElevated = false;

                if (q.type === 'multi') {
                  const arr = Array.isArray(val) ? val : [];
                  const opts = q.customOptions ?? [];
                  displayVal = arr.map((item) => opts.find((o) => o.value === item)?.label ?? item).join(', ');
                  if (!displayVal) displayVal = 'None selected';
                } else if (val !== undefined) {
                  const opts = q.customOptions ?? STANDARD_LIKERT_OPTIONS;
                  const match = opts.find((o) => o.value === val);
                  displayVal = match ? match.label : String(val);
                  if (typeof val === 'number' && val >= 3) isElevated = true;
                  if (val === 'a_lot' || val === 'noticeable') isElevated = true;
                }

                return (
                  <tr key={q.id} className={isElevated ? 'bg-stone-50 font-medium' : ''}>
                    <td className="py-1 px-1.5 align-top">{q.id}</td>
                    <td className="py-1 px-1.5 align-top text-stone-600 text-[11px]">
                      {q.section === 'core' ? (q.domain === 'inattention' ? 'Attention' : 'Restlessness') : 'Context'}
                    </td>
                    <td className="py-1 px-2 align-top">
                      <div>{q.question}</div>
                      <div className="text-[10px] text-stone-500 italic mt-0.5">{q.prompt}</div>
                    </td>
                    <td className="py-1 px-2 align-top text-right">
                      {displayVal} {isElevated && <span className="font-bold">[★]</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-[10px] text-stone-500 mt-1">[★] Indicates ratings meeting the frequency or significance threshold.</p>
        </div>

        {/* Clinical Discussion Considerations */}
        <div className="border border-stone-300 p-3 rounded text-xs text-stone-700 mb-4 bg-stone-50">
          <h4 className="font-bold mb-1">Clinical Assessment Considerations:</h4>
          <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
            <li>This self-assessment is an educational patient discussion aid and does not constitute a formal clinical diagnosis.</li>
            <li>Inquire into developmental history, symptom onset, and persistence across multiple life settings (school/work, home, social).</li>
            <li>Differential rule-outs: Screen for primary sleep disorders, anxiety, depression, burnout, or thyroid dysfunction.</li>
          </ul>
        </div>

        {/* Notice */}
        <div className="text-[10px] text-stone-500 text-center border-t border-stone-200 pt-2">
          Notice: This document is an educational patient self-reflection aid for clinical discussion. It does not replace a comprehensive psychiatric or psychological evaluation.
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. ON-SCREEN INTERACTIVE VIEWS                                       */}
      {/* Preserves 100% of the existing UI design while fixing mobile clipping */}
      {/* ==================================================================== */}
      <div className="print:hidden">
        {/* ------------------------------------------------------------------ */}
        {/* STEP A: AGE SELECTION WITH ESSENTIAL LIMITATIONS UPFRONT          */}
        {/* ------------------------------------------------------------------ */}
        {ageGroup === null ? (
          <div className="min-h-[100dvh] flex flex-col justify-between overflow-y-auto bg-warm-cream text-foreground p-3 sm:p-5 select-none">
            {/* Top Bar */}
            <div className="max-w-2xl w-full mx-auto">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pb-1.5">
                <Link
                  href="/chapter/getting-diagnosed"
                  className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition font-medium"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Overview
                </Link>
                <span className="text-xs text-muted-foreground font-mono">Step 1 of 2</span>
              </div>
              <div className="w-full bg-stone-200/80 rounded-full h-1.5 overflow-hidden">
                <div className="bg-sage-green h-full rounded-full w-[4%]" />
              </div>
            </div>

            {/* Age Selection Card with Upfront Limitations Notice */}
            <div className="max-w-2xl w-full mx-auto my-auto py-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-sm flex flex-col gap-5"
              >
                {/* Upfront Explanatory Notice */}
                <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/60 border border-stone-200/80 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sage-green flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Before you begin
                  </span>
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                    This self-assessment explores difficulties with attention, restlessness, impulsivity, and everyday responsibilities. Your answers will help identify which difficulties you report most often, where they affect your life, and which ADHD Compass resources may be most relevant to you.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-stone-200/60">
                    <strong>Medical scope: </strong>
                    This assessment cannot diagnose or rule out ADHD. A professional evaluation considers additional information that a questionnaire cannot capture.
                  </p>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
                    How old are you?
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    The first 18 questions explore core attention and restlessness patterns. The final 8 questions adapt to either school or adult responsibilities.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Option 1: Under 18 */}
                  <button
                    type="button"
                    onClick={() => handleSelectAgeGroup('under18')}
                    className="w-full text-left p-5 rounded-2xl border-2 border-stone-200 hover:border-sage-green hover:bg-[#fffdf9] transition-all flex items-center justify-between group shadow-2xs hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <span className="text-lg sm:text-xl font-bold text-foreground group-hover:text-sage-green transition-colors">
                        Under 18
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Questions adapted for school, homework, exams, home routines, and friendships.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-stone-400 group-hover:text-sage-green group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </button>

                  {/* Option 2: 18 or older */}
                  <button
                    type="button"
                    onClick={() => handleSelectAgeGroup('adult')}
                    className="w-full text-left p-5 rounded-2xl border-2 border-stone-200 hover:border-sage-green hover:bg-[#fffdf9] transition-all flex items-center justify-between group shadow-2xs hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <span className="text-lg sm:text-xl font-bold text-foreground group-hover:text-sage-green transition-colors">
                        18 or older
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Questions adapted for work, university, household management, and adult responsibilities.
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-stone-400 group-hover:text-sage-green group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Privacy Notice: Your selection is stored purely in your local browser memory.</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Spacer */}
            <div className="max-w-2xl w-full mx-auto pb-1 text-center text-xs text-muted-foreground">
              Completely private • 26 questions • ~5 minutes
            </div>
          </div>
        ) : !isCompleted ? (
          /* ------------------------------------------------------------------ */
          /* STEP B: 26-QUESTION ONE-AT-A-TIME QUESTIONNAIRE (UI Preserved)     */
          /* ------------------------------------------------------------------ */
          <div className="min-h-[100dvh] flex flex-col justify-between overflow-y-auto bg-warm-cream text-foreground p-3 sm:p-5 select-none">
            {/* Top Minimalist Header & Progress */}
            <div className="max-w-2xl w-full mx-auto">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold pb-1.5">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition font-medium"
                >
                  <ArrowLeft className="h-4 w-4" /> {currentIndex === 0 ? 'Change Age' : 'Previous'}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-stone-600">
                    {currentIndex < 18 ? 'Core questions' : 'Your context'}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-stone-800 font-bold text-xs sm:text-sm">
                    {currentIndex + 1} / {totalQuestions}
                  </span>
                </div>

                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {isCurrentAnswered ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Answered
                    </span>
                  ) : (
                    isCurrentMulti ? 'Select all that apply' : 'Select option'
                  )}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200/80 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-sage-green h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Central Question Card */}
            <div className="max-w-2xl w-full mx-auto my-auto py-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between gap-3 sm:gap-4"
                >
                  {/* Question Counter (Neutral, no diagnostic labeling) */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full bg-sage-green/15 text-sage-green">
                      Question {currentIndex + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {answeredCount} of {totalQuestions} answered
                    </span>
                  </div>

                  {/* Question Title */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-foreground leading-snug sm:leading-relaxed tracking-normal">
                    {currentQ.question}
                  </h2>

                  {/* Context Prompt */}
                  <div className="bg-warm-cream/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-foreground/85 leading-relaxed border border-stone-200/80">
                    <span className="font-bold text-foreground">In real life: </span>
                    {currentQ.prompt}
                  </div>

                  {/* Options: Render Single-Choice OR Multi-Choice */}
                  <div className="space-y-2 pt-1" role={isCurrentMulti ? 'group' : 'radiogroup'} aria-label={currentQ.question}>
                    {currentOptions.map((opt, idx) => {
                      const isSelected = isCurrentMulti
                        ? currentMultiValue.includes(String(opt.value))
                        : answers[currentQ.id] === opt.value;

                      const isNonApplicable = isNonApplicableValue(opt.value);
                      const isFirstNonApplicable =
                        isNonApplicable &&
                        (idx === 0 || !isNonApplicableValue(currentOptions[idx - 1].value));

                      return (
                        <Fragment key={String(opt.value)}>
                          {isFirstNonApplicable && (
                            <div className="pt-2 pb-1 flex items-center gap-2">
                              <div className="h-px bg-stone-200 flex-1" />
                              <span className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                                or select if not applicable
                              </span>
                              <div className="h-px bg-stone-200 flex-1" />
                            </div>
                          )}
                          <button
                            type="button"
                            role={isCurrentMulti ? 'checkbox' : 'radio'}
                            aria-checked={isSelected}
                            onClick={() => {
                              if (isCurrentMulti) {
                                handleToggleMultiOption(String(opt.value));
                              } else {
                                handleSelectSingleOption(opt.value);
                              }
                            }}
                            className={`w-full text-left px-4 py-2 sm:py-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-sage-green text-white border-sage-green shadow-sm'
                                : isNonApplicable
                                  ? 'bg-stone-50/80 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
                                  : 'bg-white hover:bg-stone-50 text-foreground border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs transition shrink-0 ${
                                  isSelected
                                    ? 'border-white bg-white/20 text-white'
                                    : isNonApplicable
                                      ? 'border-stone-300 bg-stone-100 text-stone-600 group-hover:border-stone-400'
                                      : 'border-stone-300 text-stone-500 group-hover:border-stone-400'
                                }`}
                              >
                                {isNonApplicable ? '—' : idx + 1}
                              </span>
                              <span className="text-sm sm:text-base font-semibold leading-snug">
                                {opt.label}
                              </span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ml-2 ${
                                isSelected ? 'border-white bg-white text-sage-green' : 'border-stone-300'
                              }`}
                            >
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        </Fragment>
                      );
                    })}
                  </div>

                  {/* Action Controls: Previous and Next */}
                  <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 hover:bg-stone-100 transition"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </button>

                    <span className="text-[11px] text-muted-foreground hidden sm:inline">
                      {isCurrentMulti
                        ? 'Select all applicable options • Click Next when ready'
                        : 'Tip: Press 1–5 to select • Enter to continue'}
                    </span>

                    {currentIndex < totalQuestions - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isCurrentAnswered}
                        className="inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-xl bg-sage-green text-white text-xs sm:text-sm font-bold hover:bg-sage-green/90 disabled:opacity-40 disabled:pointer-events-none transition shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Next Question <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinish}
                        disabled={answeredCount < totalQuestions}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4f7659] text-white text-sm font-bold hover:bg-[#43644b] disabled:opacity-40 disabled:pointer-events-none transition shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        View Summary <CheckCircle2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Quick-Jump Strip: Single row of 26 compact pills */}
            <div className="max-w-2xl w-full mx-auto pb-1 text-center">
              <div className="flex items-center justify-center gap-1 overflow-x-auto py-1">
                {activeQuestions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md text-[10px] font-bold transition shrink-0 ${
                        isCurrent
                          ? 'ring-2 ring-sage-green bg-sage-green text-white shadow-xs'
                          : isAnswered
                          ? 'bg-sage-green/20 text-sage-green hover:bg-sage-green/30'
                          : 'bg-stone-200/70 text-stone-600 hover:bg-stone-300'
                      }`}
                      aria-label={`Jump to question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------------ */
          /* STEP C: COMPREHENSIVE PERSONALIZED RESULTS                         */
          /* Redesigned 4-Section Architecture: Image 1 Likelihood + Image 3    */
          /* Answer Summary + Personalized Guidance (No Meds) + Clinical Notes  */
          /* ------------------------------------------------------------------ */
          <div className="min-h-[100dvh] bg-[#fdfcf9] text-foreground py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Top Navigation Bar */}
              <div className="flex items-center justify-between text-sm print:hidden">
                <Link
                  href="/chapter/getting-diagnosed"
                  className="inline-flex items-center gap-2 font-semibold text-sage-green hover:underline text-sm sm:text-base"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Chapter 7 Overview
                </Link>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/90 bg-white px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-2xs"
                  >
                    <Printer className="h-4 w-4 text-sage-green" /> Print / Save PDF
                  </button>
                  <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    SELF-ASSESSMENT SUMMARY
                  </span>
                </div>
              </div>

              {/* ================================================================== */}
              {/* SECTION 1: LIKELIHOOD CARD (REPLICATING IMAGE 1 DESIGN)            */}
              {/* Warm cream card, solid rich pill, subtle ambient glow, no jargon   */}
              {/* ================================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#fefbf6] via-[#faf7f2] to-[#f5f0e8] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-emerald-900/10 shadow-sm space-y-6"
              >
                {/* Subtle warm ambient corner blur matching the likelihood color */}
                <div
                  className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full blur-3xl opacity-15"
                  style={{ backgroundColor: evaluation.likelihood.color }}
                  aria-hidden="true"
                />

                {/* Solid Rich Color-Coded Pill Badge (Image 1 style) */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${evaluation.likelihood.badgeBg} ${evaluation.likelihood.badgeText} shadow-2xs`}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    {evaluation.likelihood.badge}
                  </span>
                  <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
                    Evaluated: {evaluation.isAdult ? 'Adult Standard (18+)' : 'Youth Standard (Under 18)'}
                  </span>
                </div>

                {/* Main Editorial Headline & Lead */}
                <div className="space-y-3">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                    {evaluation.likelihood.headline}
                  </h1>
                  <p
                    className="text-base sm:text-lg font-medium leading-relaxed"
                    style={{ color: evaluation.likelihood.color }}
                  >
                    {evaluation.likelihood.leadSubtitle}
                  </p>
                  <p className="text-base sm:text-[17px] leading-[1.8] text-foreground/90 font-normal pt-1">
                    {evaluation.likelihood.likelihoodSummary}
                  </p>
                </div>

                {/* Non-Diagnostic Suggestion Box */}
                <div className="rounded-2xl border border-stone-200/80 bg-white/75 p-5 sm:p-6 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-2 text-stone-800">
                    <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
                    <h4 className="font-serif font-bold text-base sm:text-lg text-foreground">
                      Important note on diagnosis
                    </h4>
                  </div>
                  <p className="text-base sm:text-[17px] leading-[1.75] text-foreground/90">
                    <strong>This is a screening guide, not an official medical diagnosis.</strong> An online test can help you organize what you are experiencing, but only a licensed healthcare professional (such as a psychiatrist or clinical psychologist) can officially diagnose ADHD.
                  </p>
                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-200/70 pt-2.5">
                    {evaluation.likelihood.doctorSuggestion}
                  </p>
                </div>
              </motion.div>

              {/* ================================================================== */}
              {/* SECTION 2: ANSWER SUMMARY (IMAGE 3 LAYOUT WITH REFINED DELIVERY)    */}
              {/* Clean, digestible, warm presentation of reported symptoms          */}
              {/* ================================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#fefbf6] via-[#faf7f2] to-[#f5f0e8] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-emerald-900/10 shadow-sm space-y-6"
              >
                {/* Header matching Image 3 */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sage-green/15 text-sage-green">
                    <Sparkles className="h-3.5 w-3.5" /> What your answers showed
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    Age Group: {evaluation.isAdult ? '18 or older' : 'Under 18'}
                  </span>
                </div>

                {/* Headline matching Image 3 serif */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-snug">
                  {evaluation.headline}
                </h2>

                {/* Primary reported symptoms description */}
                <p className="text-base sm:text-[17px] leading-[1.8] text-foreground/90 font-normal">
                  {evaluation.firstParagraph}
                </p>

                {/* Context Box matching Image 3 layout */}
                {evaluation.contextParagraph && (
                  <div className="rounded-2xl border border-stone-200/70 bg-[#faf7f2]/90 p-5 sm:p-6 text-base sm:text-[17px] leading-[1.8] text-foreground/90 shadow-2xs">
                    {evaluation.contextParagraph}
                  </div>
                )}

                {/* Action button bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-200/60">
                  <div>
                    <p className="text-base font-bold text-foreground">Taking this to an appointment?</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Print or save a clean summary to show your doctor or therapist.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sage-green px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md shrink-0 text-base"
                    >
                      <FileCheck className="h-4 w-4" /> Print / Save Summary
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition shrink-0"
                    >
                      <RotateCcw className="h-4 w-4" /> Retake
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* ================================================================== */}
              {/* SECTION 3: PERSONALIZED GUIDANCE ("Explore what may be relevant")  */}
              {/* STRICTLY NO MEDICATION LINK per explicit user instruction         */}
              {/* ================================================================== */}
              <div className="space-y-4 print:hidden">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-sage-green">
                    Personalized Guidance
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-0.5">
                    Explore what may be relevant to you
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">
                    Practical, compassionate chapters chosen based on what you reported:
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Guide 1: Getting Diagnosed (Chapter 7) */}
                  <Link
                    href="/chapter/getting-diagnosed"
                    className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                        1
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                        How an Assessment Works
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        What clinicians ask, who can evaluate adult ADHD, and what questions to bring to your doctor visit.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                      Read Chapter 7 Guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>

                  {/* Guide 2: What Actually Helps (Chapter 5) */}
                  <Link
                    href="/chapter/what-helps"
                    className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                        2
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                        What Actually Helps Today
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Practical, low-friction strategies: externalizing memory, body doubling, and breaking through task paralysis.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                      Read Chapter 5 Tools <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>

                  {/* Guide 3: Why It Feels Like This (Chapter 2) */}
                  <Link
                    href="/chapter/why-feels"
                    className="group p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-green flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-green/10 text-sage-green font-bold text-sm">
                        3
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground group-hover:text-sage-green transition-colors">
                        Why It Feels Like This
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Why starting feels physically impossible, why deadlines trigger adrenaline, and letting go of shame.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-sage-green group-hover:underline pt-2">
                      Read Chapter 2 <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* ================================================================== */}
              {/* SECTION 4: PRINT SUMMARY FOR CLINICAL CONSULTATION                 */}
              {/* ================================================================== */}
              <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sage-green">
                      Doctor Discussion Summary
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-0.5">
                      Summary for a Consultation
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    ADHD Compass Screening Aid
                  </span>
                </div>

                <div className="space-y-4 text-base leading-[1.75] text-foreground/85">
                  <p>
                    If you decide to talk to a healthcare professional, you can share this page or take this summary with you:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                      <p className="font-bold text-foreground">Symptom Overview</p>
                      <p className="text-sm text-stone-700">
                        • <strong>Attention & Focus:</strong> {evaluation.inattentionFrequentCount >= 4 ? 'Frequent challenges with task initiation, sustained focus, and mental fatigue.' : 'Occasional difficulties with distraction or routine paperwork.'}
                      </p>
                      <p className="text-sm text-stone-700">
                        • <strong>Restlessness / Impulsivity:</strong> {evaluation.hyperactiveFrequentCount >= 4 ? 'Frequent physical restlessness, mental racing, or impulsive speech.' : 'Lower physical restlessness; primarily internal distraction or well-masked.'}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-warm-cream/50 border border-stone-200 space-y-2">
                      <p className="font-bold text-foreground">Impact & History</p>
                      <p className="text-sm text-stone-700">
                        • <strong>Life Settings:</strong> {evaluation.highImpactAreas.length > 0 ? `Difficulties reported across ${evaluation.highImpactAreas.slice(0, 2).join(' and ')}.` : 'Difficulties mostly situational or low frequency.'}
                      </p>
                      <p className="text-sm text-stone-700">
                        • <strong>Everyday Impact:</strong> Noticeable disruption to daily energy, consistency, or routine completion.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-muted-foreground leading-relaxed">
                    <strong>Notice for Healthcare Professionals: </strong>
                    This instrument is an educational patient screening aid based on standard adult ADHD symptom criteria. It does not replace a comprehensive neuropsychiatric assessment or clinical interview.
                  </div>
                </div>
              </div>

              {/* Clear Medical Notice */}
              <div className="rounded-2xl p-4 bg-stone-100 text-muted-foreground text-xs leading-relaxed border border-stone-200">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-stone-600 mt-0.5" />
                  <span>
                    <strong>Medical Scope Notice:</strong> This assessment is an educational self-reflection instrument based on established DSM-5-TR symptom domains. It is not a clinical diagnosis or medical determination. Only a qualified physician, psychiatrist, or clinical psychologist can perform an evaluation and diagnose ADHD.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
