# Architecture.md — System & Technical Architecture
## Project: YOUR BRAIN IS WEIRD (Interactive Cognitive Neuroscience Lab)

---

## 1. High-Level System Architecture

```
                               ┌─────────────────────────────┐
                               │       Browser Client        │
                               │   (React 18 + TypeScript)   │
                               └──────────────┬──────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
       ┌────────────────────────┐                          ┌────────────────────────┐
       │   intro_ui Experience  │                          │    Brain Lab Engine    │
       │ (Scroll-Scrubbed Video,│                          │ (Apple UI, Experiments,│
       │ Frosted Glass, Reveals)│                          │ Simulators, Knowledge) │
       └────────────┬───────────┘                          └────────────┬───────────┘
                    │                                                   │
                    │               ┌───────────────────┐               │
                    └──────────────►│ State Management  │◄──────────────┘
                                    │ (Active View,     │
                                    │  Lab Telemetry,   │
                                    │  Audio Synthesizer│
                                    │  Cookie Consent)  │
                                    └─────────┬─────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
         ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
         │  120 Brain Topics  │    │  Web Audio Engine  │    │ Compliance & Legal │
         │   Knowledge Graph  │    │  (Cupertino SFX,   │    │  (Privacy, Terms,  │
         │  (6 Regions Model) │    │   Haptic Clicks)   │    │   Refunds, Trust)  │
         └────────────────────┘    └────────────────────┘    └────────────────────┘
```

---

## 2. Technical Stack
- **Framework**: React 18 with TypeScript (`strict` mode enabled).
- **Build Tool**: Vite (blazing fast HMR and optimized production bundles).
- **Styling**: Tailwind CSS v3 with custom Apple dark-mode color extensions and backdrop-blur utilities.
- **Iconography**: `lucide-react` (clean, accessible vector icons).
- **Sound Design**: Native Web Audio API procedural synthesizer (zero asset load latency, no external audio files required).
- **Scroll Video Engine**: HTML5 Canvas with RequestAnimationFrame LERP smoothing and offscreen frame extraction.
- **Data Architecture**: Immutable TypeScript definitions with full schema enforcement.

---

## 3. Project Directory & File Structure

```
your-brain-is-weird/
├── PRD.md                         # Product Requirements Document
├── Architecture.md                # System Architecture & Technical Specifications
├── Rules.md                       # AI Boundaries, Coding & UX Standards
├── Phases.md                      # Development Phases & Milestones
├── Design.md                      # Visual Identity, Typography, Motion Tokens
├── Memory.md                      # Session Context & Progress Tracker
├── package.json                   # Dependencies & Scripts
├── tsconfig.json                  # TypeScript Compiler Config
├── vite.config.ts                 # Vite Bundler Config
├── tailwind.config.js             # Tailwind Tokens & Plugin Config
├── postcss.config.js              # PostCSS Config
├── index.html                     # HTML5 Shell with Preload & Meta Tags
└── src/
    ├── main.tsx                   # React Root Mount
    ├── App.tsx                    # Top-Level Orchestrator & View State
    ├── index.css                  # Tailwind Base, Apple Typography, Glass Utilities
    ├── types/
    │   └── brain.ts               # Core Concept, Region, Experiment & Legal Schemas
    ├── data/
    │   ├── brainConcepts.ts       # 120 Structured Brain Ideas across 6 Regions
    │   ├── experiments.ts         # Experiments Registry & Configurations
    │   └── businessDetails.ts     # Verified Business, Compliance & Legal Content
    ├── utils/
    │   └── audio.ts               # Web Audio API Sound Synthesizer (Haptic Clicks, Tones)
    └── components/
        ├── intro/
        │   ├── IntroPage.tsx      # Exact Recreation of Cinematic Scroll-Scrubbed Landing
        │   └── ScrollVideo.tsx    # Canvas-Based Video Scrubbing Engine (LERP Smoothed)
        ├── lab/
        │   ├── BrainLab.tsx       # Main Laboratory Shell & Interactive Dashboard
        │   ├── SegmentedControl.tsx# Apple-Style Sliding Pill Control
        │   ├── AppleToggle.tsx    # Cupertino-Style Haptic Switch
        │   ├── AppleSlider.tsx    # Tactile Slider with Dynamic Value Display
        │   ├── DynamicIsland.tsx  # Floating Status Capsule & Telemetry
        │   └── RegionCard.tsx     # Spacious Brain Region Showcase
        ├── experiments/
        │   ├── BlindSpotExperiment.tsx      # Canvas Optic Nerve Occlusion Test
        │   ├── ChangeBlindnessExperiment.tsx# Saccadic Mask Flicker Spotter
        │   ├── StroopExperiment.tsx         # Color-Word Cognitive Interference Test
        │   ├── FalseMemoryExperiment.tsx    # DRM Associative Lure Recall Test
        │   ├── TimePerceptionExperiment.tsx # Chronostasis Estimation Challenge
        │   └── MontyHallExperiment.tsx      # Bayesian 3-Door Probability Paradox
        ├── centerpieces/
        │   ├── BrainVsInternet.tsx          # Multi-Step Attention Hijack Simulator
        │   └── BuildYourOwnBrain.tsx        # 7-Variable Cognitive Sandbox
        ├── rabbithole/
        │   ├── RabbitHoleExplorer.tsx       # Interactive Concept Graph & History
        │   └── ConceptDetailModal.tsx       # Scientific Deep-Dive Modal with Evidence Tag
        └── compliance/
            ├── CookieBanner.tsx             # Granular Cookie Consent & Local Persistence
            ├── LegalModal.tsx               # Privacy, Terms, Refund, Cookies & Business Modal
            └── AccessibilityPanel.tsx       # Contrast, Motion & Font Scaler
```

---

## 4. Key Architectural Decisions

### 4.1 Hybrid View Controller (Cinematic Intro ↔ Brain Lab)
Visitors arrive at the dark cinematic `intro_ui` featuring the CloudFront 3D scroll video. When clicking "Enter The Brain Lab", state smoothly transitions to the Apple-style interactive laboratory. A top-bar segmented switcher allows instant switching between "Intro Cinema" and "Brain Lab & Experiments".

### 4.2 Web Audio API Procedural Synthesizer
Rather than loading heavy external MP3 assets that can suffer from latency or CORS issues, an internal synthesizer uses the Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`). It generates:
- Soft Apple haptic ticks (frequency: 1800Hz, duration: 25ms)
- Switch toggles (dual frequency 880Hz → 1320Hz)
- Experiment success chimes (harmonically rich pentatonic chord)
- WTF moment reveal tones (dramatic low-frequency sweep)

### 4.3 120-Concept Graph Engine
All 120 concepts have explicit bidirectional pointers (`rabbitHoles: string[]`). A reactive hook tracks the visitor's traversal history, enabling continuous deep-dive exploration without dead ends.

### 4.4 Strict Compliance & Trust Architecture
All trust items requested by the user are modeled into persistent, accessible components:
- Granular cookie state stored in `localStorage` under `brain_cookie_consent`.
- Every scientific card includes a verifiable `evidenceLevel`: `established`, `plausible`, `debated`, or `myth_buster`.
- Zero placeholder or fake review content; all endorsements represent documented quotes from pioneering researchers (Kahneman, Loftus, Ramachandran).
- Forms enforce explicit consent, keyboard navigation (`Tab`, `Enter`, `Space`), and aria live regions.
