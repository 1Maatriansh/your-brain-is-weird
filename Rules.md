# Rules.md — AI & Engineering Boundaries
## Project: YOUR BRAIN IS WEIRD (Interactive Cognitive Neuroscience Lab)

---

## 1. Core Mandates & Philosophical Guardrails

1. **Experience Over Explanation**:
   - Never write a wall of text before giving the user an interactive stimulus.
   - Always follow the sequence: **Hook → Try It → Predict → Reveal → WTF Moment → Science → Rabbit Holes**.

2. **No Generic AI Tropes (Hard Prohibition)**:
   - ❌ NO neon everywhere or purple/blue cyber gradients.
   - ❌ NO fake holograms, HUD overlays, or meaningless floating particle grids.
   - ❌ NO cheesy marketing clichés ("Unlock your ultimate potential", "Supercharge your brain").
   - ❌ NO generic 120-card copy-paste grid.
   - ❌ NO fake customer reviews or unverified 5-star ratings.
   - ❌ NO unsubstantiated medical or neuroscience claims.

3. **Apple Design Language Precision**:
   - Design with deliberate breathing room, generous margins, and strict visual hierarchy.
   - Dark mode background palette: `#000000`, `#0a0a0a`, `#121216`, `#18181d`.
   - Subtle borders (`border-white/10` to `border-white/20`), authentic backdrop blur (`backdrop-blur-xl`).
   - Cupertino segmented pills with fluid spring transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Press down scale states (`active:scale-[0.98]`) and haptic-feel micro-interactions.

---

## 2. Scientific & Content Standards

1. **Evidence Categorization**:
   Every concept and experiment must be stamped with its peer-reviewed evidentiary standing:
   - `[ESTABLISHED]`: Strong meta-analytic empirical support (e.g. Asch Conformity, Stroop Effect).
   - `[PLAUSIBLE]`: Active experimental validation with documented boundaries.
   - `[DEBATED]`: Conflicting theories or ongoing academic debate (e.g., Free Will Libet experiments).
   - `[MYTH BUSTER]`: Debunking popular folklore (e.g., 10% brain myth, left/right brain personality myth).

2. **Accurate Terminology**:
   - Do NOT casually throw around "dopamine hit" or "rewiring the brain" without defining the actual neurological mechanism (e.g., reward prediction error, synaptic plasticity).

---

## 3. Trust, Legal & Privacy Standards

1. **Zero Fake Reviews**:
   - All quotes displayed must be authentic historical citations from accredited neuroscientists and psychologists (e.g., Daniel Kahneman, Elizabeth Loftus, V.S. Ramachandran, William James).

2. **Data Minimization & Consent**:
   - No personal telemetry is transmitted to third-party ad networks.
   - Cookie consent must allow granular opt-outs (Essential only, Analytics, Personalization) and persist in local storage.
   - Any contact or feedback form must require an explicit, un-ticked consent checkbox before submission.

3. **Accessible & Transparent Disclosures**:
   - Provide clear, accessible modals/pages for Privacy Policy, Terms of Service, Refund Policy (30-day guarantee on lab passes), and Cookies Policy.
   - Display real business identity and editorial contact information.

---

## 4. Technical & Code Quality Rules

1. **TypeScript Strictness**:
   - All component props, state objects, and data structures must have explicit TypeScript interfaces.
   - Zero `any` types permitted in core state or experiment logic.

2. **Accessibility (WCAG 2.1 AA/AAA)**:
   - Every interactive control must be keyboard-operable (`Tab`, `Space`, `Enter`, `Arrow keys`).
   - Visual focus rings must be visible (`focus-visible:ring-2 focus-visible:ring-white/40`).
   - All images, canvas elements, and icons must have descriptive `alt` tags or `aria-label` descriptors.
   - Contrast ratio between text and background must meet or exceed 4.5:1 (standard text) and 7:1 (enhanced).

3. **Performance & Audio**:
   - The Web Audio API synthesizer must initialize lazily upon first user interaction to comply with browser autoplay restrictions.
   - Clean up event listeners, timers, and animation frames on unmount.
