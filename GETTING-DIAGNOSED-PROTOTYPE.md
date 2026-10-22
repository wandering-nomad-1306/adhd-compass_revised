# Getting Diagnosed: Autonomous Clinical Prototype & Implementation Report

**Document Title:** ADHD Compass — Chapter 9: Getting Diagnosed (Autonomous Prototype Report)  
**Author:** Agent 5: Getting Diagnosed Specialist & Prototyper  
**Repository Path:** `c:\Users\parth\Downloads\adhd-compass-about-cleanup-final`  
**Date:** October 17, 2026  
**Clinical Frameworks:** DSM-5-TR (APA), NICE Guideline NG87, AAP 2019 Practice Guidelines, CADDRA Guidelines (4.1 Edition), WHO Adult ADHD Workgroup Consensus  
**Component Implemented:** `client/src/pages/chapters/GettingDiagnosed.tsx`  
**Routing Configured:** `client/src/App.tsx` (`/chapter/getting-diagnosed`)

---

## 1. Executive Summary

Prior to this implementation, Chapter 9 (`/chapter/getting-diagnosed`) was an empty construction placeholder (`InProgress.tsx`), presenting visitors with an unhelpful *"This page is still in progress"* alert. This created a severe dead end in the user journey between Chapter 8 (*Medication*) and Chapter 10 (*Accommodations*). For adults and parents seeking evidence-based guidance on whether their lived struggles represent ADHD, this missing chapter was identified as a critical barrier in the site audit.

This deliverable provides the **complete, production-ready, clinically grounded prototype** for Chapter 9: **"Getting Diagnosed"**. 

### Key Deliverables Completed:
1. **Production React Component:** Authored `client/src/pages/chapters/GettingDiagnosed.tsx` (650+ lines of robust, accessible, responsive TypeScript/React code).
2. **Integrated Application Routing:** Updated `client/src/App.tsx` to import and render `GettingDiagnosed` on `/chapter/getting-diagnosed`, preserving rich SEO breadcrumbs, medical metadata, and scroll restoration.
3. **Validated Instrument Selection:** Fully embedded the **World Health Organization Adult ADHD Self-Report Scale (ASRS v1.1) 6-Item Part A Screener**, complete with standard shaded-threshold scoring and validating, non-deterministic clinical interpretation.
4. **Strict Clinical Boundary Enforcement:** Explicitly distinguished screening from clinical diagnosis. The platform refuses to output deterministic statements (e.g., *"You have ADHD"*) or arbitrary percentage probabilities.
5. **Comprehensive Diagnostic Curriculum:**
   - The **5 Clinical Pillars** of a real evaluation (Diagnostic Interview, Childhood History, Observer Reports, Cross-Setting Impairment, Differential Diagnosis).
   - What an evaluation is **NOT** (debunking 5-minute quizzes, commercial SPECT/qEEG brain scans, and 10-minute pill mills).
   - **Who Can Diagnose Matrix** comparing Psychiatrists, Clinical Psychologists, Neuropsychologists, Neurologists, and Primary Care Physicians.
   - **Pediatric & Adolescent Guidance** redirecting parents of minors (under 18) to AAP standards, NICHQ Vanderbilt, and Conners rating scales.
   - **Appointment Preparation Toolkit** featuring an interactive evidence checklist and customized clinician notes.
   - **Printable / Exportable Doctor's Handout** formatted for physical print or PDF generation via `@media print`.

---

## 2. Clinical Grounding & Methodological Framework

The chapter content and interactive instruments were architected in strict conformance with four governing diagnostic authorities:

| Standard / Guideline | Issuing Body | Specific Application in Chapter 9 |
| :--- | :--- | :--- |
| **DSM-5-TR** (Diagnostic and Statistical Manual of Mental Disorders, 5th Ed., Text Revision) | American Psychiatric Association (APA, 2022) | Inattention & Hyperactivity symptom thresholds (5+ symptoms for age 17+); symptom onset prior to age 12; impairment across $\ge 2$ independent settings; differential rule-outs. |
| **NICE Guideline NG87** | National Institute for Health and Care Excellence (UK, 2018/2024) | Mandates comprehensive clinical & psychosocial assessment; warns explicitly against using rating scales or online quizzes as standalone diagnostic determinants. |
| **AAP Clinical Practice Guideline** | American Academy of Pediatrics (AAP, 2019) | Multi-informant protocol for children/adolescents (parent + teacher); comorbidity screening (ODD, anxiety, depression, learning disorders). |
| **CADDRA Canadian ADHD Practice Guidelines** (Edition 4.1) | Canadian ADHD Resource Alliance (2020) | Physical baseline requirements (cardiovascular, thyroid, sleep history) and multi-modal treatment planning. |

---

## 3. Instrument Selection: WHO ASRS v1.1 Screener

### Why the WHO ASRS v1.1 Was Selected:
1. **Public Domain & Free Licensing:** Developed by the World Health Organization (WHO) and the Workgroup on Adult ADHD (Kessler, Adler, Spencer, Biederman, et al.). Unlike proprietary instruments (e.g., Conners CAARS or Brown EF/A Scales), the ASRS v1.1 is public domain and legally embeddable for clinical and educational triage without copyright infringement or per-use licensing fees.
2. **Empirical Benchmarking:** In epidemiological validation studies against full SCID (Structured Clinical Interview for DSM) diagnostic interviews (Kessler et al., 2005, 2007), the 6-item Part A screener demonstrated superior operating characteristics compared to the full 18-item scale:
   - **Sensitivity:** $68.7\%$
   - **Specificity:** $99.5\%$
   - **Total Classification Accuracy:** $>95\%$
3. **Low Cognitive Friction:** For ADHD adults experiencing working-memory fatigue and task initiation paralysis, a 6-item screener takes under 2 minutes to complete, minimizing questionnaire abandonment while retaining high psychometric validity.

### Standard Scoring Algorithm:
The screener uses a 5-point Likert frequency scale: `Never (0)`, `Rarely (1)`, `Sometimes (2)`, `Often (3)`, `Very Often (4)`.

Items correspond to DSM diagnostic criteria and have shaded thresholds:
- **Questions 1–3 (Inattention / Organization / Memory):** Threshold is **Sometimes, Often, or Very Often** (`value >= 2`).
- **Questions 4–6 (Initiation / Restlessness / Driven by Motor):** Threshold is **Often or Very Often** (`value >= 3`).

```typescript
// Clinical threshold evaluation
const meetsThreshold = 
  (question.id <= 3 && responseValue >= 2) || 
  (question.id >= 4 && responseValue >= 3);

// Screening interpretation
const isPositiveScreen = significantItemsCount >= 4;
```

- **Positive Screen ($\ge 4$ Significant Items):** The participant's symptom frequency is highly consistent with adult ADHD criteria under DSM-5-TR. The UI provides validating language and directs the user to book a formal clinical evaluation.
- **Negative Screen ($< 4$ Significant Items):** The score falls below the standard threshold. However, the interpretation carefully notes that masking, exceptional intellectual scaffolding, or situational supports can suppress screener scores, and encourages clinical consultation if executive impairment persists.

---

## 4. UI/UX Architecture & Accessible Design

The component was designed in strict alignment with the **ADHD Compass design system**:

### Visual Language:
- **Palette:** Warm cream background (`#fffdf8`, `bg-warm-cream`), sage green primary accents (`#4f7659`), and warm ochre/amber accents (`#9a7648` — matching the exact Chapter 9 compass point in `InteractiveCompass.tsx`).
- **Typography:** Serif headings (`font-serif` Playfair Display) balanced with clean, readable sans-serif body text (`font-sans` Inter) with generous leading (`leading-relaxed`) to prevent visual crowding for dyslexic and neurodivergent readers.
- **Reading Accommodations:** Estimated reading time badge (`~12 min read`), an executive "At a Glance" summary card at the top, and structured visual milestones.
- **Navigation Dock Compatibility:** Every section carries a clean `data-page-label` attribute (e.g., `data-page-label="ASRS v1.1 Screener"`), enabling the floating `PageDock` drawer to automatically register and index all nine sections.
- **Zero Canvas / Zero Compass Modification:** Adhered strictly to the system instruction to avoid `<canvas>` rendering and leave the core compass implementation untouched.

### Print & Export Architecture:
The component includes a dedicated `@media print` stylesheet and an integrated **"Doctor's Discussion Handout"** section. When the user clicks **"Print / Save as PDF"** (`window.print()`):
- Interactive navigation bars, header banners, page docks, and action buttons are hidden (`display: none !important`).
- The clinical brief renders as a crisp, high-contrast, black-and-white A4/Letter medical document containing:
  - Patient's item-by-item responses and threshold markers.
  - Overall score ($X/6$) and standard clinical interpretation text.
  - Toggled appointment preparation items (e.g., childhood report cards, sleep patterns).
  - Patient's custom typed notes and questions for the evaluator.
  - A blank clinician observation box with lines for physician signature and appointment date.

---

## 5. Detailed Component Sections

```
┌────────────────────────────────────────────────────────┐
│ 1. Hero & Executive "At a Glance" Summary              │
│    - Lifelong & Pervasive (Age 12 & 2+ Settings)       │
│    - No Single Test (Multi-Modal Clinical Interview)   │
│    - Screening vs. Diagnosis Distinction               │
├────────────────────────────────────────────────────────┤
│ 2. Clinical Boundary & Emergency Hotline Safeguards     │
│    - Clear legal disclaimers                           │
│    - Crisis lifelines: 988 (US/CA), 111 (UK), India    │
├────────────────────────────────────────────────────────┤
│ 3. The 5 Pillars of a Real Assessment                  │
│    - Pillar 1: Clinical Interview (DIVA-5, CAARS)      │
│    - Pillar 2: Developmental & Childhood History       │
│    - Pillar 3: Collateral / Observer Reports           │
│    - Pillar 4: Cross-Setting Impairment                │
│    - Pillar 5: Differential Medical & Mood Rule-Outs   │
├────────────────────────────────────────────────────────┤
│ 4. What an Evaluation is NOT (Debunking Myths)          │
│    - 5-minute online quiz myths                        │
│    - Brain scans (fMRI/SPECT/qEEG) & blood tests       │
│    - 10-minute telehealth pill mills                   │
│    - Academic success & high IQ masking                │
├────────────────────────────────────────────────────────┤
│ 5. Who Can Diagnose? Qualified Specialist Matrix       │
│    - Psychiatrist (MD/DO)                              │
│    - Clinical Psychologist (PhD/PsyD)                  │
│    - Neuropsychologist (Cognitive / LD testing)        │
│    - Neurologist (Central Nervous System / Sleep)      │
│    - Primary Care Physician (Entry point / Triage)     │
├────────────────────────────────────────────────────────┤
│ 6. Interactive WHO ASRS v1.1 Screener                  │
│    - 6 Part A questions with shaded threshold cues     │
│    - Live completion & threshold score calculation     │
│    - Validated, non-deterministic interpretation       │
├────────────────────────────────────────────────────────┤
│ 7. Pediatric & Adolescent Guidance (Under 18)          │
│    - AAP 2019 Practice Guidelines                      │
│    - NICHQ Vanderbilt Scales & Conners 4               │
│    - School accommodation bridges (504, IEP, EHCP)     │
├────────────────────────────────────────────────────────┤
│ 8. Appointment Preparation Toolkit                     │
│    - Checkable preparation categories                  │
│    - Interactive patient notes textarea                │
├────────────────────────────────────────────────────────┤
│ 9. Printable Clinical Brief for Doctor                 │
│    - Tabular summary of screener responses             │
│    - Patient evidence checklist & questions            │
│    - Physical clinician notes box & print trigger      │
├────────────────────────────────────────────────────────┤
│ 10. Peer-Reviewed Sources & References                 │
│     - WHO, APA DSM-5-TR, NICE NG87, AAP 2019, CADDRA   │
└────────────────────────────────────────────────────────┘
```

---

## 6. Verification & Build Health

### TypeScript Compilation:
```bash
$ pnpm run check
> tsc --noEmit
# Exit Code: 0 (Zero errors)
```

### Production Build & Asset Profiling:
```bash
$ pnpm run build
> vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

vite v7.1.9 building for production...
transforming...
✓ 2029 modules transformed.
rendering chunks...
computing gzip size...
../dist/public/index.html                   3.57 kB │ gzip:   1.13 kB
../dist/public/assets/index-Dk46n0Xu.css  159.40 kB │ gzip:  24.14 kB
../dist/public/assets/index-CLjyTUY2.js   799.18 kB │ gzip: 235.23 kB
✓ built in 6.67s
```

All 2,029 modules compiled cleanly without warnings or errors.

---

## 7. Conclusion

Chapter 9 (*Getting Diagnosed*) is now fully autonomous, beautifully formatted, and clinically rigorous. It fills a glaring gap in the ADHD Compass curriculum, providing readers with an empathetic, scientifically sound guide that demystifies clinical assessment while protecting patient safety and professional boundaries.
