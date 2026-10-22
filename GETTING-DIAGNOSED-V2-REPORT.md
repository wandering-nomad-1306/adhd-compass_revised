# ADHD Compass — Getting Diagnosed Self-Assessment V2: Implementation Report

**Document Title:** ADHD Compass — Getting Diagnosed Self-Assessment Revision & Age-Adaptive System Implementation  
**Target Repository:** `c:\Users\parth\Downloads\adhd-compass-about-cleanup-final`  
**Deliverable File Path:** `c:\Users\parth\Downloads\adhd-compass-about-cleanup-final\GETTING-DIAGNOSED-V2-REPORT.md`  
**Date:** October 20, 2026  
**Implementation Version:** 2.0 (Age-Adaptive DSM-5-TR Clinical Revision)  
**Primary Components Modified:**
- `client/src/pages/chapters/GettingDiagnosed.tsx` (Chapter 9 Overview, Educational Context & Call-to-Action)
- `client/src/pages/chapters/ADHDTestPage.tsx` (Age Selection, 26-Question Questionnaire Engine, Results & Clinical Summary)
- `client/src/App.tsx` (Routes `/chapter/getting-diagnosed` and `/chapter/getting-diagnosed/test`)

---

## 1. Executive Summary & Design Constraints

This implementation report documents the complete, successful revision of the ADHD Compass Self-Assessment system. In accordance with user directives, this revision was executed with strict adherence to two guiding principles:
1. **Clinical & Intellectual Integrity:** Replacing the prior 22-question proprietary-prompted assessment and custom 88-point scoring system with an age-adaptive 26-question assessment (18 core DSM-5-TR symptom domains in original plain language + 8 age-tailored contextual questions for youth or adults), benchmarked against clinical diagnostic thresholds (≥ 5 for adults, ≥ 6 for youth) without invented probabilities or custom archetypes.
2. **Strict UI & Architecture Preservation:** Zero alteration of the visual design identity. All typography, colors (`warm-cream`, `sage-green`), card styling, hover pop-up effects, transitions, routing, header/dock navigation, and the interactive compass (`InteractiveCompass.tsx` and `ChapterNavigator.tsx` remain 100% frozen with 0 lines changed) were preserved intact.

---

## 2. Structural & Architectural Flow

```
/chapter/getting-diagnosed (GettingDiagnosed.tsx)
  │
  └── Click "Start the Self-Assessment" / "Take the Free ADHD Test"
        │
        ▼
/chapter/getting-diagnosed/test (ADHDTestPage.tsx)
  │
  ├── Step 1: Age Selection Step
  │     ├── Option A: "Under 18" (Youth track)
  │     └── Option B: "18 or older" (Adult track)
  │
  ├── Step 2: 18 Core DSM-5-TR Symptom Questions (Fixed for both tracks)
  │     ├── 9 Inattention Domains (DSM-5-TR A1a - A1i)
  │     └── 9 Hyperactivity / Impulsivity Domains (DSM-5-TR A2a - A2i)
  │     * Clean plain language, no biasing category headers, 5-point Likert scale (Never to Very Often)
  │     * Progress indicator: "Core questions • Question X of 18"
  │
  ├── Step 3: 8 Context & Life Impact Questions (Age-Adaptive Branch)
  │     ├── Youth (Under 18): School lessons, homework, study organization, exams, home routines, peers, multiple settings, overall interference
  │     └── Adult (18+): Work/college, life administration, relationships, time management, task initiation, multiple settings, childhood onset before 12, overall interference
  │     * Progress indicator: "Your context • Question X of 8"
  │
  └── Step 4: Results & Discussion Aid
        ├── Core Symptom Alignment (Separated Inattention & Hyperactivity counts vs DSM threshold)
        ├── Context & Life Settings Profile (Multi-setting presence, childhood onset, daily interference)
        ├── Non-Diagnostic Safe Evaluation Summary (Higher-response vs Lower-response clinical guidance)
        ├── Interconnectivity Backlinks (Chapter 2: Why It Feels Like This & Chapter 6: What Helps)
        └── Printable Clinical Summary (Formatted print view with complete item responses for a physician/psychologist)
```

---

## 3. Question Bank Inventory

### 3.1 18 Core DSM-5-TR Symptom Questions (Both Tracks)

| ID | Domain | Plain-Language Question | Clarifying Context Prompt |
| :--- | :--- | :--- | :--- |
| **Q1** | Inattention (A1a) | Do you often make careless mistakes or miss important details when working, studying, or doing tasks? | For example: Overlooking errors in forms or calculations, rushing through assignments, or having trouble checking your work before submitting it. |
| **Q2** | Inattention (A1b) | Do you find it difficult to keep your attention on tasks, reading, or conversations for long periods? | For example: Your focus drifts during lectures, long meetings, lengthy texts, or conversations that do not deeply interest you. |
| **Q3** | Inattention (A1c) | Does your mind often seem somewhere else when someone is speaking directly to you? | For example: You are looking right at the person, but your thoughts wander and you realize you did not absorb what they just said. |
| **Q4** | Inattention (A1d) | Do you often start projects, chores, or assignments but lose focus and leave them unfinished? | For example: Starting tasks with enthusiasm, but quickly getting sidetracked by something else and leaving a trail of incomplete projects. |
| **Q5** | Inattention (A1e) | Do you struggle to organize tasks, keep things in order, or manage your time and deadlines? | For example: Difficulty breaking large projects into sequential steps, keeping a messy desk or room, or constantly missing deadlines. |
| **Q6** | Inattention (A1f) | Do you actively avoid, delay, or dread starting tasks that require sustained, concentrated mental effort? | For example: Chronic procrastination on reports, tax forms, essays, multi-step paperwork, or in-depth analytical work. |
| **Q7** | Inattention (A1g) | Do you frequently lose or misplace essential items like keys, phone, wallet, schoolwork, or tools? | For example: Spending significant time searching for items you just set down, or having to replace lost items regularly. |
| **Q8** | Inattention (A1h) | Are you easily pulled off-task by background sounds, visual distractions, or unrelated thoughts? | For example: A phone notification, someone talking across the room, or a sudden random idea immediately derails your current train of thought. |
| **Q9** | Inattention (A1i) | Do you regularly forget routine daily activities like appointments, chores, returning messages, or paying bills? | For example: Forgetting planned calls, doctor appointments, daily medication, or routine household responsibilities unless repeatedly reminded. |
| **Q10** | Hyperactivity (A2a) | Do you frequently fidget with your hands or feet, tap items, or squirm when you have to stay seated? | For example: Tapping your fingers or foot, playing with a pen, constantly shifting positions, or needing to manipulate objects while listening. |
| **Q11** | Hyperactivity (A2b) | Do you find yourself leaving your seat in situations where you are expected to remain seated? | For example: Standing up during class, work meetings, lectures, or family dinners when others remain sitting. |
| **Q12** | Hyperactivity (A2c) | Do you experience an internal sense of restlessness, feeling physically or mentally on edge when still? | For example: Feeling uncomfortable or agitated during prolonged quiet sitting, or feeling like your brain is running at high speed. |
| **Q13** | Hyperactivity (A2d) | Is it difficult for you to engage quietly in hobbies, leisure activities, or relaxation? | For example: Needing background noise or multiple screens to relax, talking during quiet movies, or finding quiet downtime under-stimulating. |
| **Q14** | Hyperactivity (A2e) | Do you often feel like you are 'on the go' or powered by an internal motor that is difficult to switch off? | For example: Having difficulty unwinding at night, moving quickly from one activity to the next, or feeling uneasy when forced to slow down. |
| **Q15** | Hyperactivity (A2f) | Do you tend to talk excessively or find it hard to slow down your speaking? | For example: Talking rapidly, monopolizing conversations, or being told by friends or colleagues that you talk too much or too quickly. |
| **Q16** | Impulsivity (A2g) | Do you blurt out answers before someone has finished asking, or complete others' sentences? | For example: Jumping ahead in conversation, interrupting before the other person has finished their thought, or sending messages impulsively. |
| **Q17** | Impulsivity (A2h) | Do you find it very difficult or frustrating to wait your turn in line, in traffic, or in conversation? | For example: Intense impatience at slow drivers, supermarket queues, slow internet, or waiting for group decisions. |
| **Q18** | Impulsivity (A2i) | Do you frequently interrupt others, jump into conversations uninvited, or take over things others are doing? | For example: Chiming into discussions happening nearby, interrupting coworkers or family members, or having trouble respecting boundaries. |

---

### 3.2 8 Age-Specific Contextual Questions: Youth (Under 18)

| ID | Life Domain | Plain-Language Question | Clarifying Context Prompt |
| :--- | :--- | :--- | :--- |
| **Q19** | Classroom Lessons | During school lessons or lectures, do you struggle to stay engaged and track what the teacher is explaining? | For example: Daydreaming during explanations, missing key instructions, or finding your notes are incomplete. |
| **Q20** | Homework & Studying | Does homework or independent study take significantly longer than it should because of distraction? | For example: Spending hours at your desk for an assignment that should take 30 minutes because your focus keeps wandering. |
| **Q21** | School Organization | Do you struggle to keep your backpack, locker, notebook, or study materials organized? | For example: Crumpled papers at the bottom of your bag, forgetting books at home or school, or missing due dates. |
| **Q22** | Exams & Long Tasks | During tests, exams, or multi-step projects, do you run out of time or make rushed errors near the end? | For example: Misreading test instructions, getting stuck on one question for too long, or rushing through without checking. |
| **Q23** | Home Routines | Do you need repeated reminders from parents or family to finish daily routines like getting ready or chores? | For example: Forgetting to pack lunch, getting sidetracked while getting dressed, or leaving chores half-done. |
| **Q24** | Multi-Setting Presence | Do these challenges with attention, restlessness, or organization happen across multiple settings? | For example: Experienced both at school and at home, or with friends and extracurricular activities, not just in one single class. |
| **Q25** | Social & Friendships | Do these patterns affect your interactions with friends, classmates, or family members? | For example: Misunderstanding group cues, interrupting friends, forgetting social plans, or reacting impulsively. |
| **Q26** | Daily Interference | Overall, how much do these attention or restlessness difficulties interfere with your school, home, or social life? | For example: Causing regular stress, lowered grades, conflict with parents or teachers, or feeling like you cannot reach your potential. |

---

### 3.3 8 Age-Specific Contextual Questions: Adults (18+)

| ID | Life Domain | Plain-Language Question | Clarifying Context Prompt |
| :--- | :--- | :--- | :--- |
| **Q19** | Work & University | In your job, university courses, or career duties, do you struggle with workload completion and deadlines? | For example: Falling behind on deliverables, difficulty prioritizing competing demands, or feeling constantly overwhelmed by workload. |
| **Q20** | Life Administration | Do you find it difficult to stay on top of personal paperwork, household maintenance, bills, or finances? | For example: Unopened mail piling up, missed payment due dates, overdue administrative tasks, or disorganized files. |
| **Q21** | Interpersonal Relationships | Do these patterns cause friction or misunderstandings in your close relationships or partnerships? | For example: Forgetting promises to partners, zoning out during important conversations, or partners feeling unsupported. |
| **Q22** | Time Awareness & Pacing | Do you experience 'time blindness'—struggling to accurately estimate how long tasks take or being chronically late? | For example: Underestimating travel time, losing track of hours while hyperfocusing, or frequently rushing at the last minute. |
| **Q23** | Task Initiation & Paralysis | Do you frequently experience task paralysis—knowing what you need to do, but feeling physically unable to start? | For example: Sitting on the couch or at your computer for hours feeling guilty while an urgent task remains untouched. |
| **Q24** | Multi-Setting Presence | Do these challenges show up across more than one area of your adult life? | For example: Present in both your workplace/university AND in your home life, personal relationships, or personal projects. |
| **Q25** | Childhood History (< 12) | Looking back, did you experience similar difficulties with attention, impulsivity, or restlessness during childhood (before age 12)? | For example: Teacher comments on report cards about 'not reaching potential' or 'daydreaming', childhood restlessness, or chronic messiness. |
| **Q26** | Overall Daily Interference | Overall, how significantly do these cognitive and behavioral patterns interfere with your daily life, career, or wellbeing? | For example: Causing persistent exhaustion, career setbacks, financial strain, relationship distress, or feeling chronically behind. |

---

## 4. Scoring, Evaluation & Non-Diagnostic Clinical Logic

### 4.1 Strict Separation of Core Symptoms from Context
Rather than summing Likert responses into an unvalidated percentage score (e.g. "72% Combined Type"), the revised engine separates raw responses into:
1. **Core DSM-5-TR Symptoms (Questions 1–18):**
   - Each item answered as `Often` (value 3) or `Very Often` (value 4) is counted as clinically significant.
   - Evaluated separately as:
     - **Inattentive Count:** Out of 9 (Criteria A1a–A1i)
     - **Hyperactive/Impulsive Count:** Out of 9 (Criteria A2a–A2i)
   - Compared against the official DSM-5-TR age diagnostic thresholds:
     - Adults (18+): Threshold is **≥ 5 symptoms** in either domain.
     - Youth (Under 18): Threshold is **≥ 6 symptoms** in either domain.
2. **Context & Life Settings (Questions 19–26):**
   - Evaluates cross-setting pervasiveness (`Question 24`), childhood onset before age 12 (`Question 25` for adults), and functional interference (`Question 26`).
   - Displayed as a qualitative contextual breakdown, not an arbitrary numerical score.

### 4.2 Non-Diagnostic Result Text

#### Higher-Response Threshold (`higherResponse === true`):
> *"You reported several patterns that can be considered during an ADHD evaluation. This does not mean that you have ADHD. A formal diagnosis requires an in-depth evaluation by a qualified healthcare professional who reviews your developmental history, examines symptom persistence across multiple life settings, and rules out other contributing factors."*

#### Lower-Response Threshold (`higherResponse === false`):
> *"Your responses showed fewer of the patterns covered by this self-assessment. This does not rule out ADHD, nor does it mean your everyday difficulties are unimportant. ADHD can present subtly, masking may conceal symptoms, and other factors—such as chronic stress, sleep difficulties, or anxiety—can create similar challenges that still merit professional support."*

---

## 5. UI & Usability Enhancements

1. **Mobile Viewport Overflow & Scrolling Fix:**
   - Previous implementation used `h-[100dvh] max-h-[100dvh] overflow-hidden`, which clipped content on mobile viewports smaller than 650px height or at 200% browser zoom.
   - Fixed with `min-h-[100dvh] overflow-y-auto`, ensuring seamless full-height single-screen experience on desktop while enabling natural vertical scrolling on mobile and landscape orientations without any clipping.
2. **Category Bias Elimination:**
   - Stripped intrusive category headers (e.g., "Physical & Motor Restlessness") from the questionnaire screen, presenting clean, unbiased question numbers and plain-language prompts.
3. **Interactive Hover Cards & Tactile Feedback:**
   - Retained ambient glow orbs and subtle elevation hover cards on both the Getting Diagnosed overview and the Results trait meters.
4. **Printable Clinician Summary:**
   - Accessible via the "Print / Save PDF" button (`window.print()`).
   - Clean, professional black-and-white layout (`hidden print:block`) formatted specifically for review by a psychiatrist, clinical psychologist, or GP during an initial consultation.

---

## 6. Verification & Build Health

### TypeScript Verification:
```bash
$ pnpm run check
> tsc --noEmit
# Exit Code: 0 (Zero errors)
```

### Production Build:
```bash
$ pnpm run build
> vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

✓ 2029 modules transformed.
rendering chunks...
computing gzip size...
../dist/public/index.html                   3.57 kB │ gzip:   1.13 kB
../dist/public/assets/index-Btq8N140.css  159.52 kB │ gzip:  24.16 kB
../dist/public/assets/index-DGgB8B5Q.js   801.35 kB │ gzip: 235.88 kB
✓ built in 30.56s
```

### Compass Integrity Verification:
```bash
$ git status --porcelain client/src/components/InteractiveCompass.tsx client/src/components/ChapterNavigator.tsx
# Clean (0 files modified, 100% frozen)
```
