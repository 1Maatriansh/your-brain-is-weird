# Phases.md — Implementation Milestones & Roadmap
## Project: YOUR BRAIN IS WEIRD (Interactive Cognitive Neuroscience Lab)

---

## Phase 1: Architecture & Foundation Scaffolding
- [x] Create project documentation (`PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`).
- [ ] Initialize Vite + React 18 + TypeScript + Tailwind CSS project in scratch directory.
- [ ] Configure `tailwind.config.js`, `tsconfig.json`, `index.css` with Apple dark palette and Inter font.
- [ ] Install dependencies (`lucide-react`, `clsx`, `tailwind-merge`).
- [ ] Initialize `Memory.md` to track live progress and context.

---

## Phase 2: Scientific Data Layer & Knowledge Network
- [ ] Build `brainConcepts.ts`: 120 curated, structured brain concepts across the 6 major regions (20 concepts each), including research citations, WTF moments, and rabbit-hole links.
- [ ] Build `experiments.ts`: Configuration and logic parameters for 6 interactive experiments.
- [ ] Build `businessDetails.ts`: Verified real business identity, editorial council, GDPR/CCPA privacy disclosures, Terms & Conditions, and Refund Policy.
- [ ] Build procedural Web Audio synthesizer (`audio.ts`) for zero-dependency Apple haptic clicks, toggle clicks, and reveal chimes.

---

## Phase 3: Cinematic Intro Page (`intro_ui`)
- [ ] Build `ScrollVideo.tsx`: HTML5 Canvas scroll-scrubbing engine with LERP smoothing and offscreen frame extraction mapping to the CloudFront 3D video.
- [ ] Build `IntroPage.tsx`:
  - Fixed top navbar with Hexagon logo, navigation links, and CTA.
  - Section One (service labels `/ PERCEPTION`, `/ COGNITION`, `/ ATTENTION HACKS`, intro copy, H1 "Clear. Precise. Automated." / "Your Brain Is Weird.", frosted portrait card).
  - 80vh scroll spacer to provide depth for scrubbing.
  - Section Two (Insight on demand, "Learn to see brilliantly", 3-tier capability panel, primary & secondary CTAs).
  - "Enter The Brain Lab" transition trigger.

---

## Phase 4: Apple-Grade Interactive Shell & Controls
- [ ] Build `DynamicIsland.tsx`: Floating status capsule displaying active region, lab telemetry, and audio state.
- [ ] Build `SegmentedControl.tsx`: Apple-style sliding pill selector with fluid spring transitions.
- [ ] Build `AppleToggle.tsx`: Tactile Cupertino switches with glowing states and haptic clicks.
- [ ] Build `AppleSlider.tsx`: Smooth tactile slider with numeric feedback.
- [ ] Build `BrainLab.tsx`: Main dashboard organizing the six regions, experiment hub, and centerpiece features with spacious editorial layout.

---

## Phase 5: Interactive Experiment Suite
- [ ] **Blind Spot Explorer**: Live optic disc occlusion test with focal cross, moving dot, and distance calibration.
- [ ] **Change Blindness Spotter**: Alternating visual scene with flicker mask hiding massive structural changes.
- [ ] **Stroop Reaction Lab**: Interactive color-word interference test measuring millisecond cognitive latency.
- [ ] **False Memory Reconstructor**: DRM paradigm associative recall challenge showing lure insertion.
- [ ] **Time Dilation Estimator**: Subjective duration estimation under high vs low cognitive frequency stimuli.
- [ ] **Monty Hall Probability Paradox**: Interactive 3-door decision engine tracking intuitive vs Bayesian win rates.

---

## Phase 6: Major Centerpieces
- [ ] **The Brain vs The Internet**: Interactive step-by-step cascade tracking digital habit formation (Notification → Novelty → Attention Hijack → Variable Reward → Infinite Scroll) with live cognitive telemetry.
- [ ] **Build Your Own Weird Brain**: Sandbox simulation with 7 Apple-style sliders (Novelty, Attention, Uncertainty, Social Pressure, Reward, Memory, Prediction) testing emergent behavior across life scenarios.

---

## Phase 7: Rabbit-Hole Explorer & Concept Deep Dives
- [ ] Build `RabbitHoleExplorer.tsx`: Graph navigator showing interconnected ideas and user traversal history.
- [ ] Build `ConceptDetailModal.tsx`: Comprehensive research breakdown with evidence badges, WTF highlights, and instant jumping to connected concepts.

---

## Phase 8: Trust, Compliance, Legal & Accessibility
- [ ] Build `CookieBanner.tsx`: Floating consent bar with granular controls (Essential, Analytics, Experience) and `localStorage` persistence.
- [ ] Build `LegalModal.tsx`: Multi-tab modal covering Privacy Policy, Terms & Conditions, Refund Policy, Cookies Policy, and Business Details.
- [ ] Build `AccessibilityPanel.tsx`: Instant high-contrast toggle, text scaling, and reduced motion modes.
- [ ] Full keyboard navigation review, form consent checkboxes, and alt text verification.

---

## Phase 9: Verification & Delivery
- [ ] Run TypeScript compilation check (`tsc --noEmit`).
- [ ] Run Vite production build (`npm run build`).
- [ ] Update `Memory.md` and generate final `walkthrough.md`.
