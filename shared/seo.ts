export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type SeoConfig = {
  title: string;
  description: string;
  type?: 'website' | 'article';
  index?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
};

export const SITE_URL = "https://adhdcompass.in";

export const NOT_FOUND_SEO: SeoConfig = {
  title: "Page Not Found | ADHD Compass",
  description: "The requested page could not be found on ADHD Compass.",
  type: "website",
  index: false,
};

export const SEO_BY_PATH: Record<string, SeoConfig> = {
  "/": {
    title: "ADHD Compass | Understanding Your Brain & Attention",
    description:
      "An independent, ad-free guide to ADHD neuroscience, executive dysfunction, diagnosis, and treatments. Grounded in clinical evidence and lived experience.",
    type: "website",
    index: true,
  },

  "/about": {
    title: "About ADHD Compass | Independent, Ad-Free & Evidence-Based",
    description:
      "Why ADHD Compass exists: an independent, ad-free project bringing scattered neuroscience, clinical guidelines, and lived experiences into one calm place.",
    type: "website",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  },

  "/chapter/welcome": {
    title: "Welcome to ADHD Compass: Navigating Your ADHD Journey",
    description:
      "A gentle, grounding introduction for adults navigating ADHD. Learn how to pace your reading and explore evidence-based chapters without overwhelm.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Welcome", path: "/chapter/welcome" },
    ],
  },

  "/chapter/why-feels": {
    title: "Why ADHD Feels Like This: Task Paralysis | ADHD Compass",
    description:
      "Why can't you start? Explore the cognitive science of ADHD task paralysis, time blindness, rejection sensitivity, and deadline adrenaline without self-blame.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Lived Experiences", path: "/chapter/why-feels" },
    ],
    faqItems: [
      {
        question: "Why do I experience sudden task paralysis despite wanting to work?",
        answer:
          "ADHD task paralysis is rooted in prefrontal cortex dopamine signaling delays and working memory overload when initiating complex tasks, not a lack of motivation or willpower.",
      },
      {
        question: "What is rejection sensitive dysphoria (RSD)?",
        answer:
          "RSD refers to intense emotional pain triggered by perceived rejection, criticism, or falling short of high personal standards, heavily mediated by emotional dysregulation in ADHD neural networks.",
      },
    ],
  },

  "/chapter/what-is": {
    title: "What is ADHD? Presentations, Symptoms & Myths | ADHD Compass",
    description:
      "An evidence-based guide to adult ADHD: DSM-5-TR presentations (inattentive, hyperactive, combined) and debunking common myths about willpower and focus.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "What is ADHD?", path: "/chapter/what-is" },
    ],
    faqItems: [
      {
        question: "Is ADHD just a simple dopamine deficiency?",
        answer:
          "No. ADHD involves complex dysregulation of dopamine and norepinephrine pathways across prefrontal-striatal circuits and transporter kinetics (DAT/NET), not a simple global shortage.",
      },
      {
        question: "Can ADHD develop for the first time in adulthood?",
        answer:
          "ADHD is a neurodevelopmental condition with childhood onset; however, many individuals—especially females and those with high cognitive scaffolding—are not diagnosed until adult demands exceed compensation mechanisms.",
      },
    ],
  },

  "/chapter/brain": {
    title: "Inside the ADHD Brain: Neurobiology & Networks | ADHD Compass",
    description:
      "An accessible neuroanatomical guide to the ADHD brain: prefrontal cortex, default mode network, striatum, and dopamine-norepinephrine signaling differences.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Meet Your Brain", path: "/chapter/brain" },
    ],
  },

  "/chapter/brain/executive-functions": {
    title: "ADHD Executive Dysfunction & Working Memory | ADHD Compass",
    description:
      "Understand executive dysfunction in ADHD: working memory decay, impulse inhibition, and task planning. Clear cognitive explanations and practical scaffolding.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Meet Your Brain", path: "/chapter/brain" },
      { name: "Executive Functions", path: "/chapter/brain/executive-functions" },
    ],
  },

  "/chapter/what-helps": {
    title: "What Actually Helps ADHD: Practical Strategies | ADHD Compass",
    description:
      "Practical, research-backed interventions for adult ADHD: externalizing working memory, body doubling, sensory adjustments, and breaking task paralysis gently.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "What Actually Helps", path: "/chapter/what-helps" },
    ],
  },

  "/chapter/medication": {
    title: "ADHD Medication Guide: Mechanisms & Types | ADHD Compass",
    description:
      "An objective guide to ADHD medications: methylphenidate vs amphetamines, atomoxetine, receptor mechanisms, titration, and managing common side effects safely.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Medication Guide", path: "/chapter/medication" },
    ],
    faqItems: [
      {
        question: "What is the difference between methylphenidate and amphetamine for ADHD?",
        answer:
          "Methylphenidate (Ritalin, Concerta) acts primarily as a reuptake inhibitor blocking DAT and NET transporters, while amphetamines (Adderall, Vyvanse) both block reuptake and stimulate presynaptic dopamine release.",
      },
      {
        question: "How effective are ADHD medications according to peer-reviewed evidence?",
        answer:
          "Network meta-analyses (Cortese et al., Lancet Psychiatry 2018) demonstrate an effect size of 0.7 to 1.0 for stimulants, with 70% to 80% of individuals experiencing substantial clinical benefit.",
      },
    ],
  },

  "/chapter/getting-diagnosed": {
    title: "Adult ADHD Diagnosis: What to Expect & Prepare | ADHD Compass",
    description:
      "A clear roadmap for seeking an adult ADHD evaluation: clinical interview steps, childhood evidence, ruling out lookalikes, and preparing for your doctor visit.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Getting Diagnosed", path: "/chapter/getting-diagnosed" },
    ],
    faqItems: [
      {
        question: "Can you be diagnosed with ADHD for the first time as an adult?",
        answer:
          "Yes. Many adults compensated with high intellect or supportive environments until adult independence exceeded cognitive capacity.",
      },
      {
        question: "Who can officially diagnose adult ADHD?",
        answer:
          "Licensed psychiatrists (MD/DO) who can prescribe medication, or clinical psychologists (PhD/PsyD) who perform comprehensive neuropsychological testing.",
      },
    ],
  },

  "/chapter/getting-diagnosed/test": {
    title: "Adult ADHD Screening Test: Free & Private | ADHD Compass",
    description:
      "Take an evidence-based adult ADHD screening test based on DSM-5 symptom criteria. 100% private, client-side only, no sign-up or tracking, with instant results.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Getting Diagnosed", path: "/chapter/getting-diagnosed" },
      { name: "Screening Test", path: "/chapter/getting-diagnosed/test" },
    ],
  },

  "/chapter/accommodations": {
    title: "ADHD Accommodations: Workplace & University | ADHD Compass",
    description:
      "Practical guide to ADHD accommodations: university exam adjustments, workplace reasonable adjustments under the ADA and Equality Act, and disclosure tips.",
    type: "article",
    index: true,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Accommodations", path: "/chapter/accommodations" },
    ],
  },

  "/404": NOT_FOUND_SEO,
};
