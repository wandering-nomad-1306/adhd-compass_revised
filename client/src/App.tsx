import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Home is statically loaded for instant initial render
import Home from "./pages/Home";

// Route-level code-splitting for chapters and auxiliary pages
const Welcome = lazy(() => import("./pages/chapters/Welcome"));
const WhyItFeelsLikeThis = lazy(() => import("./pages/chapters/WhyItFeelsLikeThis"));
const MeetYourBrain = lazy(() => import("./pages/chapters/MeetYourBrain"));
const ExecutiveFunctions = lazy(() => import("./pages/chapters/ExecutiveFunctions"));
const WhatIsADHD = lazy(() => import("./pages/chapters/WhatIsADHD"));
const WhatHelps = lazy(() => import("./pages/chapters/WhatHelps"));
const WhatHelpsPrototype = lazy(() => import("./pages/chapters/WhatHelpsPrototype"));
const BrainPrototype = lazy(() => import("./pages/prototypes/BrainPrototype"));
const Medication = lazy(() => import("./pages/chapters/Medication"));
const GettingDiagnosed = lazy(() => import("./pages/chapters/GettingDiagnosed"));
const ADHDTestPage = lazy(() => import("./pages/chapters/ADHDTestPage"));
const InProgress = lazy(() => import("./pages/chapters/InProgress"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

import SEO, { BreadcrumbItem, FAQItem, MedicalAspectData } from "./components/SEO";

function RouteSeoManager() {
  const [location] = useLocation();

  interface RouteMetadata {
    title: string;
    description: string;
    type?: 'website' | 'article';
    breadcrumbs?: BreadcrumbItem[];
    medicalData?: MedicalAspectData;
    faqItems?: FAQItem[];
  }

  const routeMetaMap: Record<string, RouteMetadata> = {
    '/': {
      title: 'ADHD Compass | Understanding Your Brain & Attention',
      description: 'An independent, ad-free guide to ADHD neuroscience, executive dysfunction, diagnosis, and treatments. Grounded in clinical evidence and lived experience.',
      type: 'website',
    },
    '/about': {
      title: 'About ADHD Compass | Independent, Ad-Free & Evidence-Based',
      description: 'Why ADHD Compass exists: an independent, ad-free project bringing scattered neuroscience, clinical guidelines, and lived experiences into one calm place.',
      type: 'website',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
    },
    '/chapter/welcome': {
      title: 'Welcome to ADHD Compass: Navigating Your ADHD Journey',
      description: 'A gentle, grounding introduction for adults navigating ADHD. Learn how to pace your reading and explore evidence-based chapters without overwhelm.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Welcome', path: '/chapter/welcome' },
      ],
    },
    '/chapter/why-feels': {
      title: 'Why ADHD Feels Like This: Task Paralysis | ADHD Compass',
      description: "Why can't you start? Explore the cognitive science of ADHD task paralysis, time blindness, rejection sensitivity, and deadline adrenaline without self-blame.",
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Lived Experiences', path: '/chapter/why-feels' },
      ],
      faqItems: [
        {
          question: 'Why do I experience sudden task paralysis despite wanting to work?',
          answer: 'ADHD task paralysis is rooted in prefrontal cortex dopamine signaling delays and working memory overload when initiating complex tasks, not a lack of motivation or willpower.',
        },
        {
          question: 'What is rejection sensitive dysphoria (RSD)?',
          answer: 'RSD refers to intense emotional pain triggered by perceived rejection, criticism, or falling short of high personal standards, heavily mediated by emotional dysregulation in ADHD neural networks.',
        },
      ],
    },
    '/chapter/what-is': {
      title: 'What is ADHD? Presentations, Symptoms & Myths | ADHD Compass',
      description: 'An evidence-based guide to adult ADHD: DSM-5-TR presentations (inattentive, hyperactive, combined) and debunking common myths about willpower and focus.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'What is ADHD?', path: '/chapter/what-is' },
      ],
      medicalData: {
        aspect: 'Clinical Definition, DSM-5-TR Presentations, Diagnostic Criteria',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
      faqItems: [
        {
          question: 'Is ADHD just a simple dopamine deficiency?',
          answer: 'No. ADHD involves complex dysregulation of dopamine and norepinephrine pathways across prefrontal-striatal circuits and transporter kinetics (DAT/NET), not a simple global shortage.',
        },
        {
          question: 'Can ADHD develop for the first time in adulthood?',
          answer: 'ADHD is a neurodevelopmental condition with childhood onset; however, many individuals—especially females and those with high cognitive scaffolding—are not diagnosed until adult demands exceed compensation mechanisms.',
        },
      ],
    },
    '/chapter/brain': {
      title: 'Inside the ADHD Brain: Neurobiology & Networks | ADHD Compass',
      description: 'An accessible neuroanatomical guide to the ADHD brain: prefrontal cortex, default mode network, striatum, and dopamine-norepinephrine signaling differences.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Meet Your Brain', path: '/chapter/brain' },
      ],
      medicalData: {
        aspect: 'Neuroanatomy, Neurotransmitters, Large-Scale Brain Networks',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/chapter/brain/executive-functions': {
      title: 'ADHD Executive Dysfunction & Working Memory | ADHD Compass',
      description: 'Understand executive dysfunction in ADHD: working memory decay, impulse inhibition, and task planning. Clear cognitive explanations and practical scaffolding.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Meet Your Brain', path: '/chapter/brain' },
        { name: 'Executive Functions', path: '/chapter/brain/executive-functions' },
      ],
      medicalData: {
        aspect: 'Executive Dysfunction, Neuropsychology, Cognitive Science',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/chapter/what-helps': {
      title: 'What Actually Helps ADHD: Practical Strategies | ADHD Compass',
      description: 'Practical, research-backed interventions for adult ADHD: externalizing working memory, body doubling, sensory adjustments, and breaking task paralysis gently.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'What Actually Helps', path: '/chapter/what-helps' },
      ],
      medicalData: {
        aspect: 'Behavioral Interventions, Environmental Scaffolding, Psychotherapy',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/chapter/what-helps-prototype': {
      title: 'What Actually Helps (Prototype) | ADHD Compass',
      description: 'Prototype view with wide balanced layout and simplified medical headings.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'What Helps Prototype', path: '/chapter/what-helps-prototype' },
      ],
      medicalData: {
        aspect: 'Behavioral Interventions, Environmental Scaffolding, Psychotherapy',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/prototype/brain': {
      title: 'Brain Anatomy & Circuits (Interactive Vector Prototype) | ADHD Compass',
      description: 'High-definition vector neuroanatomy prototype: explore subcortical dopamine hubs, error-monitoring networks, and frontostriatal circuits in ADHD.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Brain Prototype', path: '/prototype/brain' },
      ],
      medicalData: {
        aspect: 'Neuroanatomy, Frontostriatal Networks, Dopamine Pathways',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/chapter/medication': {
      title: 'ADHD Medication Guide: Mechanisms & Types | ADHD Compass',
      description: 'An objective guide to ADHD medications: methylphenidate vs amphetamines, atomoxetine, receptor mechanisms, titration, and managing common side effects safely.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Medication Guide', path: '/chapter/medication' },
      ],
      medicalData: {
        aspect: 'Pharmacology, Titration Guidelines, Reuptake Kinetics, Contraindications',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
      faqItems: [
        {
          question: 'What is the difference between methylphenidate and amphetamine for ADHD?',
          answer: 'Methylphenidate (Ritalin, Concerta) acts primarily as a reuptake inhibitor blocking DAT and NET transporters, while amphetamines (Adderall, Vyvanse) both block reuptake and stimulate presynaptic dopamine release.',
        },
        {
          question: 'How effective are ADHD medications according to peer-reviewed evidence?',
          answer: 'Network meta-analyses (Cortese et al., Lancet Psychiatry 2018) demonstrate an effect size of 0.7 to 1.0 for stimulants, with 70% to 80% of individuals experiencing substantial clinical benefit.',
        },
      ],
    },
    '/chapter/getting-diagnosed': {
      title: 'Adult ADHD Diagnosis: What to Expect & Prepare | ADHD Compass',
      description: 'A clear roadmap for seeking an adult ADHD evaluation: clinical interview steps, childhood evidence, ruling out lookalikes, and preparing for your doctor visit.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Getting Diagnosed', path: '/chapter/getting-diagnosed' },
      ],
      medicalData: {
        aspect: 'Clinical Assessment, Psychiatric Evaluation, Differential Diagnosis',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
      faqItems: [
        {
          question: 'Can you be diagnosed with ADHD for the first time as an adult?',
          answer: 'Yes. Many adults compensated with high intellect or supportive environments until adult independence exceeded cognitive capacity.',
        },
        {
          question: 'Who can officially diagnose adult ADHD?',
          answer: 'Licensed psychiatrists (MD/DO) who can prescribe medication, or clinical psychologists (PhD/PsyD) who perform comprehensive neuropsychological testing.',
        },
      ],
    },
    '/chapter/getting-diagnosed/test': {
      title: 'Adult ADHD Screening Test: Free & Private | ADHD Compass',
      description: 'Take an evidence-based adult ADHD screening test based on DSM-5 symptom criteria. 100% private, client-side only, no sign-up or tracking, with instant results.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Getting Diagnosed', path: '/chapter/getting-diagnosed' },
        { name: 'Screening Test', path: '/chapter/getting-diagnosed/test' },
      ],
      medicalData: {
        aspect: 'Symptom Checklist, Adult ADHD-RS-IV, ASRS v1.1 Clinical Screening',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
    '/chapter/accommodations': {
      title: 'ADHD Accommodations: Workplace & University | ADHD Compass',
      description: 'Practical guide to ADHD accommodations: university exam adjustments, workplace reasonable adjustments under the ADA and Equality Act, and disclosure tips.',
      type: 'article',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Accommodations', path: '/chapter/accommodations' },
      ],
      medicalData: {
        aspect: 'Academic Accommodations, Workplace Adjustments, Disability Rights',
        condition: 'Attention Deficit Hyperactivity Disorder',
      },
    },
  };

  const currentMeta = routeMetaMap[location] || {
    title: 'Page Not Found | ADHD Compass',
    description: 'The requested page could not be found on ADHD Compass.',
    type: 'website' as const,
  };

  return (
    <SEO
      title={currentMeta.title}
      description={currentMeta.description}
      canonicalPath={location}
      type={currentMeta.type}
      breadcrumbs={currentMeta.breadcrumbs}
      medicalData={currentMeta.medicalData}
      faqItems={currentMeta.faqItems}
    />
  );
}

function RouteScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToHashOrTop = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace(/^#/, ''));
        const element = document.getElementById(id) || document.querySelector(hash);
        if (element) {
          const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          element.scrollIntoView({
            behavior: prefersReduced ? 'auto' : 'smooth',
          });
          return true;
        }
      }
      return false;
    };

    const hash = window.location.hash;
    if (hash) {
      let attempts = 0;
      const maxAttempts = 15;
      let timeoutId: ReturnType<typeof setTimeout>;

      const tryScroll = () => {
        if (!scrollToHashOrTop() && attempts < maxAttempts) {
          attempts++;
          timeoutId = setTimeout(tryScroll, 60);
        } else if (attempts >= maxAttempts && !scrollToHashOrTop()) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      };

      const frame = window.requestAnimationFrame(tryScroll);
      return () => {
        window.cancelAnimationFrame(frame);
        clearTimeout(timeoutId);
      };
    } else {
      const frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [location]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace(/^#/, ''));
        const element = document.getElementById(id) || document.querySelector(hash);
        if (element) {
          const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          element.scrollIntoView({
            behavior: prefersReduced ? 'auto' : 'smooth',
          });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}

const RouteLoadingFallback = () => (
  <div className="min-h-[100dvh] bg-warm-cream flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-sage-green/30 border-t-sage-green animate-spin" />
      <span className="text-xs font-medium text-stone-500 font-mono tracking-wide">Loading chapter...</span>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/chapter/welcome"} component={Welcome} />
        <Route path={"/chapter/why-feels"} component={WhyItFeelsLikeThis} />
        <Route path={"/chapter/brain/executive-functions"} component={ExecutiveFunctions} />
        <Route path={"/chapter/brain"} component={MeetYourBrain} />
        <Route path={"/chapter/what-is"} component={WhatIsADHD} />
        <Route path={"/chapter/what-helps"} component={WhatHelps} />
        <Route path={"/chapter/what-helps-prototype"} component={WhatHelpsPrototype} />
        <Route path={"/prototype/brain"} component={BrainPrototype} />
        <Route path={"/chapter/medication"} component={Medication} />
        <Route path={"/chapter/getting-diagnosed"} component={GettingDiagnosed} />
        <Route path={"/chapter/getting-diagnosed/test"} component={ADHDTestPage} />
        <Route path={"/chapter/accommodations"}>
          <InProgress
            title="Accommodations"
            chapterNumber={8}
            previousPath="/chapter/getting-diagnosed"
          />
        </Route>
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <RouteSeoManager />
          <RouteScrollRestoration />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
