import React from 'react';
import { Brain, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppleButton } from '../ui/AppleButton';
import { sound } from '../../utils/audio';

interface IntroScreenProps {
  onEnterApp: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnterApp,
  onOpenLegal,
}) => {
  const handleStart = () => {
    sound.playRevealChime();
    onEnterApp();
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] bg-black text-white flex flex-col justify-between items-center px-6 py-10 sm:py-14 select-none overflow-hidden">
      {/* Subtle Ambient Radial Glow (Deep Obsidian Luxury) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-white/[0.05] via-apple-blue/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Subtle Brand Marker */}
      <header className="relative z-10 flex items-center gap-2.5 opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shadow-inner">
          <Brain className="w-4 h-4 text-white stroke-[1.75]" />
        </div>
        <span className="text-xs font-mono tracking-widest text-white/70 uppercase">
          Cognitive Neuroscience Lab
        </span>
      </header>

      {/* Center Stage: Title, Hook, and The Single Centerpiece Button */}
      <main className="relative z-10 max-w-3xl text-center flex flex-col items-center my-auto">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-6 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-apple-orange animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 font-medium">
            Interactive Experience
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-white mb-6 drop-shadow-2xl">
          YOUR BRAIN
          <br />
          <span className="text-white/60 font-serif italic">IS WEIRD.</span>
        </h1>

        {/* Hook */}
        <p className="text-base sm:text-xl text-white/75 font-normal leading-relaxed max-w-xl mx-auto mb-12 drop-shadow-md">
          Your brain is lying to you right now. 86 billion neurons are simulating your reality in total darkness.
        </p>

        {/* THE CENTERPIECE BUTTON */}
        <div className="flex flex-col items-center gap-4">
          <AppleButton
            variant="glow"
            size="xl"
            onClick={handleStart}
            icon={<Sparkles className="w-5 h-5 text-apple-orange" />}
            className="px-10 py-5 text-base sm:text-lg shadow-[0_0_50px_rgba(255,255,255,0.35)] hover:shadow-[0_0_70px_rgba(255,255,255,0.55)]"
          >
            Show me what my brain does
          </AppleButton>

          <span className="text-[11px] font-mono text-white/40 tracking-wider">
            Press to enter the live interactive laboratory
          </span>
        </div>
      </main>

      {/* Subtle Bottom Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl gap-3 text-[11px] text-white/40 border-t border-white/[0.08] pt-4">
        <span>© 2026 Peer-Reviewed Cognitive Neuroscience. Zero Fake Claims.</span>
        <div className="flex items-center gap-4">
          <button onClick={() => onOpenLegal('privacy')} className="hover:text-white/80 transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => onOpenLegal('terms')} className="hover:text-white/80 transition-colors">
            Terms & Conditions
          </button>
          <button onClick={() => onOpenLegal('refund')} className="hover:text-white/80 transition-colors">
            30-Day Refund Policy
          </button>
          <button onClick={() => onOpenLegal('business')} className="hover:text-white/80 transition-colors">
            Business Details
          </button>
        </div>
      </footer>
    </div>
  );
};
