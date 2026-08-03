# ADHD Compass — Navigation and Brain Diagram Update

This build is based on `adhd-compass-practical-brain-update.zip`.

## Changes in this build

- Restored the approved homepage compass component exactly from the aligned-tabs version.
- Added a persistent Home button and compass navigator to every chapter page.
- Added a responsive chapter-map dialog with direct links to every compass topic.
- Highlighted the current chapter inside the navigator.
- Kept Getting Diagnosed and Accommodations selectable and marked them as In progress.
- Enabled forward navigation from Medication (Chapter 8) to Getting Diagnosed (Chapter 9), then Accommodations (Chapter 10).
- Reworked both in-progress pages to use the same chapter layout and Previous/Next navigation.
- Rebuilt the brain diagram as a simplified lateral brain with recognizable lobe landmarks, clickable research-relevant regions, and a Regions/Connections toggle.
- Kept the brain model explicitly educational and non-diagnostic.

## Files changed

- `client/src/App.tsx`
- `client/src/components/BrainNetworkViz.tsx`
- `client/src/components/ChapterLayout.tsx`
- `client/src/components/ChapterNavigator.tsx` (new)
- `client/src/components/InteractiveCompass.tsx`
- `client/src/pages/chapters/InProgress.tsx`
- `client/src/pages/chapters/Medication.tsx`

All other files remain unchanged from the supplied baseline.
