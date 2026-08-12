export type SeoConfig = {
  title: string;
  description: string;
  index?: boolean;
};

export const SITE_URL = "https://adhdcompass.in";

export const NOT_FOUND_SEO: SeoConfig = {
  title: "Page Not Found | ADHD Compass",
  description: "The page you requested could not be found.",
  index: false,
};

export const SEO_BY_PATH: Record<string, SeoConfig> = {
  "/": {
    title: "ADHD Compass | A Free, Evidence-Based ADHD Guide",
    description:
      "A free, evidence-based guide to understanding ADHD, your brain, treatment options, medication, and what to do next.",
  },

  "/chapter/welcome": {
    title: "I Have ADHD. Now What? | ADHD Compass",
    description:
      "A calm starting point after an ADHD diagnosis or realization: understand what ADHD means and choose what to explore next.",
  },

  "/chapter/why-feels": {
    title: "Why ADHD Feels Like This | ADHD Compass",
    description:
      "Understand common ADHD experiences through clear, evidence-based explanations of attention, motivation, emotion, time, and daily life.",
  },

  "/chapter/what-is": {
    title: "What Is ADHD? Symptoms, Causes & Presentations | ADHD Compass",
    description:
      "A clear, evidence-based explanation of ADHD, including symptoms, presentations, causes, clinical thresholds, and common myths.",
  },

  "/chapter/brain": {
    title: "The ADHD Brain: What Research Shows | ADHD Compass",
    description:
      "Explore a visual, evidence-based explanation of brain systems and networks involved in ADHD without oversimplifying the science.",
  },

  "/chapter/brain/executive-functions": {
    title: "Executive Functions and ADHD | ADHD Compass",
    description:
      "Learn how working memory, inhibition, planning, activation, attention, flexibility, and time management relate to ADHD.",
  },

  "/chapter/what-helps": {
    title: "What Helps ADHD? Evidence-Based Support | ADHD Compass",
    description:
      "Explore evidence-based ADHD support, practical strategies, treatment options, environmental changes, and ways to test what helps.",
  },

  "/chapter/medication": {
    title: "ADHD Medication Guide: Stimulants & Nonstimulants | ADHD Compass",
    description:
      "A balanced guide to ADHD medication, including stimulants, nonstimulants, alpha-2 agonists, benefits, limits, side effects, and monitoring.",
  },

  "/chapter/getting-diagnosed": {
    title: "Getting Diagnosed with ADHD | ADHD Compass",
    description: "This ADHD Compass chapter is still being completed.",
    index: false,
  },

  "/chapter/accommodations": {
    title: "ADHD Accommodations | ADHD Compass",
    description: "This ADHD Compass chapter is still being completed.",
    index: false,
  },

  "/404": NOT_FOUND_SEO,
};
