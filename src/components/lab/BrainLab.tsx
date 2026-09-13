import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, Clock, Play, ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react';
import { BlindSpotExperiment } from '../experiments/BlindSpotExperiment';
import { ChangeBlindnessExperiment } from '../experiments/ChangeBlindnessExperiment';
import { StroopExperiment } from '../experiments/StroopExperiment';
import { FalseMemoryExperiment } from '../experiments/FalseMemoryExperiment';
import { TimePerceptionExperiment } from '../experiments/TimePerceptionExperiment';
import { MontyHallExperiment } from '../experiments/MontyHallExperiment';
import { experimentsList } from '../../data/experiments';
import { sound } from '../../utils/audio';

interface BrainLabProps {
  completedExperiments: Set<string>;
  onMarkExperimentComplete: (id: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
}

export const BrainLab: React.FC<BrainLabProps> = ({
  completedExperiments,
  onMarkExperimentComplete,
  onOpenLegal,
}) => {
  const [activeExpId, setActiveExpId] = useState<string | null>('blind-spot');

  const activeExp = experimentsList.find((e) => e.id === activeExpId);

  return (
    <div className="relative z-10 w-full min-h-screen text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center select-none">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-apple-blue mb-4 backdrop-blur-xl">
          <Brain className="w-4 h-4" />
          <span>INTERACTIVE EXPERIMENTAL LABORATORY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4">
          Direct Cognitive Tests.
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-normal">
          Do not just read about cognitive illusions. Experience your own retinal blind spots, attention blinkers, millisecond interference, and probability fallacies.
        </p>
      </div>

      {/* Experiment Selector Carousel (Spacious Apple Cards) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {experimentsList.map((exp, idx) => {
          const isSelected = exp.id === activeExpId;
          const isDone = completedExperiments.has(exp.id);

          return (
            <button
              key={exp.id}
              onClick={() => {
                sound.playHapticClick(900 + idx * 80);
                setActiveExpId(exp.id);
              }}
              className={`group p-6 rounded-3xl text-left border transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between ${
                isSelected
                  ? 'bg-white/[0.08] border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-white/30'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-white/40 font-semibold">LAB 0{idx + 1}</span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-apple-green font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      COMPLETED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-white/40">
                      <Clock className="w-3 h-3" />
                      {exp.estimatedTimeMin} MIN
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-white mb-1.5 group-hover:text-white transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-apple-orange font-medium mb-3">
                  "{exp.hook}"
                </p>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {exp.wtfMoment}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 text-xs font-mono">
                <span className="text-white/50">{exp.regionId.toUpperCase()}</span>
                <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {isSelected ? 'Active Lab' : 'Launch'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Container (Spacious Full-Width Arena) */}
      {activeExp && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="w-full max-w-4xl p-6 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/15 backdrop-blur-3xl shadow-3xl flex flex-col items-center">
            {/* Active Header */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-left">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-apple-orange font-semibold block mb-1">
                  CURRENT RUNNER • {activeExp.regionId.toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {activeExp.title}
                </h2>
                <p className="text-sm text-white/70 mt-1">
                  {activeExp.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {completedExperiments.has(activeExp.id) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-apple-green/15 text-apple-green border border-apple-green/30 text-xs font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Render Component */}
            <div className="w-full flex justify-center">
              {activeExpId === 'blind-spot' && (
                <BlindSpotExperiment onComplete={() => onMarkExperimentComplete('blind-spot')} />
              )}
              {activeExpId === 'change-blindness' && (
                <ChangeBlindnessExperiment onComplete={() => onMarkExperimentComplete('change-blindness')} />
              )}
              {activeExpId === 'stroop-effect' && (
                <StroopExperiment onComplete={() => onMarkExperimentComplete('stroop-effect')} />
              )}
              {activeExpId === 'false-memory' && (
                <FalseMemoryExperiment onComplete={() => onMarkExperimentComplete('false-memory')} />
              )}
              {activeExpId === 'time-dilation' && (
                <TimePerceptionExperiment onComplete={() => onMarkExperimentComplete('time-dilation')} />
              )}
              {activeExpId === 'monty-hall' && (
                <MontyHallExperiment onComplete={() => onMarkExperimentComplete('monty-hall')} />
              )}
            </div>

            {/* Scientific Citation Footer */}
            <div className="w-full mt-10 pt-6 border-t border-white/10 text-xs text-white/40 font-mono text-left">
              <span className="font-semibold text-white/60 block mb-0.5">Primary Literature Reference:</span>
              {activeExp.scientificRef}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-white/70" />
          <span>Peer-Reviewed Cognitive Experiments • Zero Fake Claims</span>
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
          <button onClick={() => onOpenLegal('business')} className="hover:text-white transition-colors">
            Advisory Council
          </button>
        </div>
      </footer>
    </div>
  );
};
