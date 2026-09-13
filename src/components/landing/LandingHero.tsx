import React from 'react';
import { Brain, Sparkles, ArrowRight, Eye, Smartphone, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';
import { AppleButton } from '../ui/AppleButton';
import { verifiedScientificQuotes } from '../../data/businessDetails';
import { sound } from '../../utils/audio';

interface LandingHeroProps {
  onShowMeBrain: () => void;
  onExploreConcepts: () => void;
  onExploreInternet: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onShowMeBrain,
  onExploreConcepts,
  onExploreInternet,
  onOpenLegal,
}) => {
  return (
    <div className="w-full min-h-screen bg-black text-white select-none">
      {/* ========================================================================= */}
      {/* 1. LUXURY HERO                                                            */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-32 sm:pt-40 pb-20 flex flex-col justify-center items-center text-center">
        {/* Ambient Subtle Radial Light Pool */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.04] via-apple-blue/[0.02] to-transparent blur-3xl pointer-events-none" />

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-8 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-apple-orange animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/90 font-medium">
            Cognitive Neuroscience Laboratory
          </span>
        </div>

        {/* Huge Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-tight text-white mb-6 drop-shadow-2xl">
          Your brain is lying to you.
          <br />
          <span className="text-white/60 italic font-serif">Right now.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/75 font-normal leading-relaxed max-w-3xl mx-auto mb-12">
          You are not perceiving raw physical reality. You are experiencing an 80-millisecond-delayed, internally hallucinated simulation rendered by 86 billion neurons operating in total cranial darkness.
        </p>

        {/* THE CENTERPIECE BUTTON: "Show me what my brain does" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-16">
          <AppleButton
            variant="glow"
            size="xl"
            onClick={onShowMeBrain}
            icon={<Sparkles className="w-5 h-5 text-apple-orange" />}
            className="w-full sm:w-auto"
          >
            Show me what my brain does
          </AppleButton>

          <AppleButton
            variant="glass"
            size="xl"
            onClick={onExploreConcepts}
            className="w-full sm:w-auto"
          >
            Explore 120 Concepts
          </AppleButton>
        </div>

        {/* Quick Teaser Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="font-mono text-xs text-apple-orange font-bold block mb-1">40 MINUTES DAILY</span>
            <p className="text-xs text-white/70 leading-relaxed">
              Total blindness during saccadic eye jumps your conscious memory deletes.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="font-mono text-xs text-apple-blue font-bold block mb-1">80MS LATENCY</span>
            <p className="text-xs text-white/70 leading-relaxed">
              Everything you think is "now" actually happened in the past.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="font-mono text-xs text-apple-green font-bold block mb-1">84% FALSE RECALL</span>
            <p className="text-xs text-white/70 leading-relaxed">
              Your memory rewrites history with confident hallucinations on demand.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE THREE UNCOMFORTABLE TRUTHS                                         */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 border-t border-white/[0.08]">
        <div className="max-w-2xl mb-16 text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-apple-purple font-semibold block mb-2">
            BIOLOGICAL REALITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Three things happening inside your skull right now.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-white/40 block mb-4">01 / PERCEPTION</span>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
                You go blind 150,000 times a day.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                During every eye flick (saccade), your brain turns off visual awareness for ~50 milliseconds so you do not get dizzy from motion blur.
              </p>
            </div>
            <div className="text-xs font-mono text-apple-blue">
              Mechanism: Saccadic Suppression & Chronostasis
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-white/40 block mb-4">02 / VISUAL VOID</span>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
                Your eyes have a physical hole.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Where the optic cable leaves your eye, there are zero sensors. You never see a black dot because your brain fabricates pixels to fill the void.
              </p>
            </div>
            <div className="text-xs font-mono text-apple-orange">
              Mechanism: Cortical Surface Interpolation
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-white/40 block mb-4">03 / MEMORY</span>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
                Remembering overwrites the past.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Recalling an event chemically unlocks the memory trace, rewriting it with your current emotional state before saving it again.
              </p>
            </div>
            <div className="text-xs font-mono text-apple-purple">
              Mechanism: Memory Reconsolidation
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 6 INTELLECTUAL REALMS                                              */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-green font-semibold block mb-2">
              KNOWLEDGE ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              120 curated cognitive phenomena.
            </h2>
          </div>
          <AppleButton variant="secondary" onClick={onExploreConcepts}>
            View All 120 Concepts →
          </AppleButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            { id: '01', title: 'Perception', desc: "Your brain isn't a camera. The gap between light rays and subjective sight." },
            { id: '02', title: 'Memory', desc: "Your life isn't a video file. How memories are reconstructed on demand." },
            { id: '03', title: 'The Social Brain', desc: 'Other people get inside your head. Mirror neurons, tribal conformity, and comparison.' },
            { id: '04', title: 'Habits & Attention', desc: 'Why infinite scrolling feels like eating from a bottomless soup bowl.' },
            { id: '05', title: 'Body & Senses', desc: 'Phantom limbs, gut-brain axis, and reflexes operating beneath conscious thought.' },
            { id: '06', title: 'Consciousness & WTF', desc: 'Split-brain dual consciousness, probability traps, and the illusion of free will.' },
          ].map((realm) => (
            <div
              key={realm.id}
              onClick={onExploreConcepts}
              className="p-8 rounded-3xl bg-[#121215] hover:bg-[#18181d] border border-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-white/40 block mb-2">REALM {realm.id}</span>
                <h3 className="text-2xl font-medium text-white mb-2">{realm.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{realm.desc}</p>
              </div>
              <span className="text-xs font-mono text-apple-blue mt-6 block">Explore Topics →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE SLOT MACHINE IN YOUR POCKET (BRAIN VS INTERNET)                    */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 border-t border-white/[0.08]">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#121215] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-orange font-semibold flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4" />
              <span>Centerpiece Investigation</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
              The Brain vs The Internet
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              Why can you open your phone for a 5-second text message and lose 45 minutes to infinite feeds? Discover how variable reward schedules exploit ancient dopamine foraging loops.
            </p>
          </div>

          <AppleButton variant="glow" size="lg" onClick={onExploreInternet}>
            Launch Attention Simulator →
          </AppleButton>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SCIENTIFIC FOUNDATION (ZERO FAKE REVIEWS)                              */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 border-t border-white/[0.08] text-left">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-apple-green font-semibold block mb-2">
            RESEARCH GROUNDING
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Documented Science. Zero Fake Reviews.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedScientificQuotes.map((q, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#121215] border border-white/10 flex flex-col justify-between">
              <p className="text-sm text-white/80 italic leading-relaxed mb-6">
                "{q.quote}"
              </p>
              <div>
                <span className="font-semibold text-white text-sm block">{q.author}</span>
                <span className="text-xs text-white/50 block mb-1">{q.credential}</span>
                <span className="font-mono text-[10px] text-apple-green border border-apple-green/30 px-2 py-0.5 rounded-full inline-block">
                  {q.verifiedField}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION                                                         */}
      {/* ========================================================================= */}
      <section className="py-28 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 border-t border-white/[0.08] text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white mb-6">
            <Brain className="w-7 h-7" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            Ready to experience your brain?
          </h2>

          <p className="text-base text-white/70 mb-8 leading-relaxed">
            Step through 5 interactive revelations with zero long paragraphs. Test your blind spot, reaction speed, reading interference, and memory.
          </p>

          <AppleButton
            variant="glow"
            size="xl"
            onClick={onShowMeBrain}
            icon={<Sparkles className="w-5 h-5 text-apple-orange" />}
          >
            Show me what my brain does
          </AppleButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-white/70" />
            <span>© 2026 YOUR BRAIN IS WEIRD Lab. Peer-Reviewed Cognitive Neuroscience.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onOpenLegal('refund')} className="hover:text-white transition-colors">
              Refund Policy
            </button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-white transition-colors">
              Cookies Policy
            </button>
            <button onClick={() => onOpenLegal('business')} className="hover:text-white transition-colors">
              Ethics Board
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
