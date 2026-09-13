# Design.md — Visual Identity & Apple Design System
## Project: YOUR BRAIN IS WEIRD (Interactive Cognitive Neuroscience Lab)

---

## 1. Aesthetic Vision: Black Luxury & Apple Precision
The visual language of **YOUR BRAIN IS WEIRD** is grounded in Apple's Human Interface Guidelines (HIG), dark luxury editorial design, and museum-grade digital installations. It rejects cheap "futuristic AI" clichés (no neon purples, no generic gradient text, no floating particle mesh) in favor of deep Obsidian blacks, authentic optical glass, precise typography, and tactile physical micro-interactions.

---

## 2. Color Palette & Surface Tokens

| Token | Hex / Value | Application |
|---|---|---|
| **Canvas Deep** | `#000000` | Absolute backdrop for deep contrast |
| **Surface Dark** | `#0a0a0a` | Section containers and cinematic overlays |
| **Surface Raised** | `#121215` | Apple-style card backgrounds |
| **Surface Elevated** | `#1a1a20` | Modals, floating controls, dialogs |
| **Border Subtle** | `rgba(255, 255, 255, 0.08)` | Delicate card separation lines |
| **Border Active** | `rgba(255, 255, 255, 0.20)` | Active focus states and hover highlights |
| **Text Primary** | `#f5f5f7` | Apple system primary text (95% white) |
| **Text Secondary**| `#a1a1a6` | Supporting body copy and labels (65% white) |
| **Text Tertiary** | `#6e6e73` | Mono timestamps, indexes, footnotes (45% white) |
| **Accent Glow** | `#34c759` | Apple green for active toggles |
| **Accent Signal** | `#0a84ff` | Apple system blue for interactive primary actions |
| **Accent Orange** | `#ff9f0a` | Warning / uncertainty telemetry highlight |

---

## 3. Frosted Glass Material System

- **Glass Panel (Standard)**: `bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] shadow-2xl`
- **Glass Panel (Elevated)**: `bg-white/[0.12] backdrop-blur-2xl border border-white/[0.18] shadow-3xl`
- **Glass Chip / Badge**: `border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md`
- **Apple Pill Highlight**: `bg-white text-black shadow-lg rounded-full font-medium`

---

## 4. Typography Hierarchy

- **Primary Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
- **Display Scale**:
  - `Hero H1`: `text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05]`
  - `Section H2`: `text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight`
  - `Experiment Title`: `text-xl sm:text-2xl font-semibold text-white`
  - `Body Copy`: `text-sm sm:text-base leading-relaxed text-[#a1a1a6]`
  - `Mono Footnotes`: `font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#6e6e73]`

---

## 5. Animation & Micro-Interactions

- **Spring Transitions**: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple standard spring curve).
- **Staggered Viewport Reveals**: `700ms ease-out` with progressive `100ms` delays.
- **Active Press Feedback**: `active:scale-[0.98] transition-transform duration-150`.
- **Toggle Motion**: Smooth pill translation `translateX(20px)` with background color crossfade to `#34c759`.
- **Canvas Video Scrubbing**: LERP calculation `smoothed += (target - smoothed) * 0.12` executed inside `requestAnimationFrame`.

---

## 6. Accessibility & Contrast Verification
- All text combinations verified against WCAG 2.1 AAA (minimum 7:1 for headers, 4.5:1 for body).
- Interactive elements possess visible keyboard focus outlines (`focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none`).
- Every button has an explicit, accessible semantic label and `aria` role.
- Media elements contain descriptive `alt` tags and `aria-hidden="true"` on decorative icons.
