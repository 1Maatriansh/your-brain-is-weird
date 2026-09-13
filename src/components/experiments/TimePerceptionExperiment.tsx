import React, { useState } from 'react';
import { Clock, Play, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TimePerceptionProps {
  onComplete?: () => void;
}

export const TimePerceptionExperiment: React.FC<TimePerceptionProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'playingA' | 'pause' | 'playingB' | 'decide' | 'result'>('intro');
  const [userChoice, setUserChoice] = useState<'A' | 'B' | null>(null);

  const startDemonstration = () => {
    sound.playHapticClick();
    setStage('playingA');

    // Pulse A: Steady baseline for 1600ms
    sound.playHapticClick(440, 0.05);
    setTimeout(() => {
      setStage('pause');

      // Pause for 600ms
      setTimeout(() => {
        setStage('playingB');
        sound.playHapticClick(880, 0.05);

        // Pulse B: High frequency stimulus for identical 1600ms
        setTimeout(() => {
          setStage('decide');
        }, 1600);
      }, 600);
    }, 1600);
  };

  const handleChoice = (choice: 'A' | 'B') => {
    sound.playWTFTone();
    setUserChoice(choice);
    setStage('result');
    if (onComplete) onComplete();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl backdrop-blur-xl relative">
        {stage === 'intro' && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-2xl bg-apple-orange/20 border border-apple-orange/40 flex items-center justify-center text-apple-orange mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">
              The Chronostasis Time Dilation Test
            </h4>
            <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
              You will observe two consecutive visual pulses (Pulse A, followed by Pulse B). Trust your internal subjective clock and decide which pulse was on screen longer.
            </p>
            <button
              onClick={startDemonstration}
              className="px-8 py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-sm transition-all active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Temporal Stimulus</span>
            </button>
          </div>
        )}

        {(stage === 'playingA' || stage === 'pause' || stage === 'playingB') && (
          <div className="w-full h-56 flex flex-col items-center justify-center py-8">
            <span className="text-xs font-mono text-white/50 mb-6 uppercase tracking-widest">
              {stage === 'playingA' && 'PULSE A (OBSERVE DURATION)'}
              {stage === 'pause' && 'PREPARING SECOND PULSE...'}
              {stage === 'playingB' && 'PULSE B (OBSERVE DURATION)'}
            </span>

            <div className="w-32 h-32 flex items-center justify-center">
              {stage === 'playingA' && (
                <div className="w-24 h-24 rounded-full bg-white/30 border-2 border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
              )}
              {stage === 'pause' && <div className="w-2 h-2 rounded-full bg-white/10" />}
              {stage === 'playingB' && (
                <div className="w-24 h-24 rounded-full bg-apple-orange border-2 border-white animate-spin shadow-[0_0_40px_rgba(255,159,10,0.8)] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/60" />
                </div>
              )}
            </div>
          </div>
        )}

        {stage === 'decide' && (
          <div className="w-full flex flex-col items-center py-6 text-center">
            <span className="text-xs font-mono text-apple-orange uppercase tracking-widest mb-2">
              Subjective Judgement
            </span>
            <h4 className="text-2xl font-medium text-white mb-6">
              Which pulse felt longer in duration?
            </h4>

            <div className="flex gap-4">
              <button
                onClick={() => handleChoice('A')}
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95"
              >
                Pulse A Felt Longer
              </button>
              <button
                onClick={() => handleChoice('B')}
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all active:scale-95"
              >
                Pulse B Felt Longer
              </button>
            </div>
          </div>
        )}

        {stage === 'result' && (
          <div className="w-full flex flex-col items-center py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-apple-orange/20 border border-apple-orange/40 flex items-center justify-center text-apple-orange mb-3">
              <Clock className="w-6 h-6" />
            </div>

            <h4 className="text-2xl font-semibold text-white mb-2">
              Both pulses were identical: exactly 1,600ms!
            </h4>
            <p className="text-xs font-mono text-white/60 mb-6">
              YOU ESTIMATED: PULSE {userChoice} WAS LONGER
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">PULSE A (STATIC)</span>
                <span className="text-lg font-mono font-bold text-white">1,600 ms</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">PULSE B (DYNAMIC)</span>
                <span className="text-lg font-mono font-bold text-white">1,600 ms</span>
              </div>
            </div>

            <button
              onClick={() => setStage('intro')}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Again</span>
            </button>
          </div>
        )}
      </div>

      {stage === 'result' && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-orange font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Information Density Expands Subjective Time</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            Why dynamic stimuli dilate your internal clock
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Your brain doesn't have a quartz crystal ticking at steady physical seconds. Instead, time perception is directly calibrated by <strong className="text-white">how much sensory data your brain processes</strong> per unit of physical time.
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">The Car Crash Illusion:</span>
            During high-novelty, terrifying, or fast-changing events (like a spinout on a highway), your amygdala commands sensory cortices to sample at maximum density. Retrospectively, your brain concludes: "Because so many frames were recorded, this event must have taken an eternity."
          </div>
        </div>
      )}
    </div>
  );
};
