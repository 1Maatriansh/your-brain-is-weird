import React, { useState, useRef } from 'react';
import { Play, Sparkles, RefreshCw, Zap, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StroopProps {
  onComplete?: () => void;
}

interface Trial {
  word: string;
  colorName: string;
  colorHex: string;
  isCongruent: boolean;
}

const COLOR_MAP: Record<string, string> = {
  RED: '#ff453a',
  BLUE: '#0a84ff',
  GREEN: '#34c759',
  YELLOW: '#ffd60a',
};

const TRIALS: Trial[] = [
  { word: 'RED', colorName: 'RED', colorHex: COLOR_MAP.RED, isCongruent: true },
  { word: 'GREEN', colorName: 'BLUE', colorHex: COLOR_MAP.BLUE, isCongruent: false },
  { word: 'YELLOW', colorName: 'YELLOW', colorHex: COLOR_MAP.YELLOW, isCongruent: true },
  { word: 'BLUE', colorName: 'RED', colorHex: COLOR_MAP.RED, isCongruent: false },
  { word: 'GREEN', colorName: 'GREEN', colorHex: COLOR_MAP.GREEN, isCongruent: true },
  { word: 'RED', colorName: 'GREEN', colorHex: COLOR_MAP.GREEN, isCongruent: false },
  { word: 'BLUE', colorName: 'YELLOW', colorHex: COLOR_MAP.YELLOW, isCongruent: false },
  { word: 'YELLOW', colorName: 'RED', colorHex: COLOR_MAP.RED, isCongruent: false },
];

export const StroopExperiment: React.FC<StroopProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'running' | 'finished'>('idle');
  const [trialIndex, setTrialIndex] = useState(0);
  const [times, setTimes] = useState<Array<{ isCongruent: boolean; timeMs: number }>>([]);
  const startTime = useRef<number>(0);

  const startTest = () => {
    sound.playHapticClick(1000);
    setGameState('running');
    setTrialIndex(0);
    setTimes([]);
    startTime.current = performance.now();
  };

  const handleColorPick = (pickedColor: string) => {
    const elapsed = Math.round(performance.now() - startTime.current);
    const currentTrial = TRIALS[trialIndex];

    if (pickedColor === currentTrial.colorName) {
      sound.playHapticClick(1600, 0.015);
    } else {
      sound.playHapticClick(350, 0.03); // Low error buzz
    }

    const nextTimes = [...times, { isCongruent: currentTrial.isCongruent, timeMs: elapsed }];
    setTimes(nextTimes);

    if (trialIndex + 1 < TRIALS.length) {
      setTrialIndex(trialIndex + 1);
      startTime.current = performance.now();
    } else {
      sound.playRevealChime();
      setGameState('finished');
      if (onComplete) onComplete();
    }
  };

  // Compute stats
  const congruentTimes = times.filter((t) => t.isCongruent).map((t) => t.timeMs);
  const incongruentTimes = times.filter((t) => !t.isCongruent).map((t) => t.timeMs);

  const avgCongruent = congruentTimes.length
    ? Math.round(congruentTimes.reduce((a, b) => a + b, 0) / congruentTimes.length)
    : 0;
  const avgIncongruent = incongruentTimes.length
    ? Math.round(incongruentTimes.reduce((a, b) => a + b, 0) / incongruentTimes.length)
    : 0;

  const interferencePenalty = Math.max(0, avgIncongruent - avgCongruent);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl backdrop-blur-xl relative">
        {gameState === 'idle' && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-2xl bg-apple-blue/20 border border-apple-blue/40 flex items-center justify-center text-apple-blue mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">
              The Stroop Interference Reactor
            </h4>
            <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
              Select the button that matches the <strong className="text-white">INK COLOR</strong>, ignoring what the word actually spells. Complete 8 trials as fast as possible.
            </p>
            <button
              onClick={startTest}
              className="px-8 py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-sm transition-all active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Cognitive Test</span>
            </button>
          </div>
        )}

        {gameState === 'running' && (
          <div className="w-full flex flex-col items-center py-4">
            {/* Progress */}
            <div className="w-full flex justify-between text-xs font-mono text-white/50 mb-6">
              <span>TRIAL {trialIndex + 1} OF 8</span>
              <span>NAME THE FONT COLOR</span>
            </div>

            {/* Stimulus Word */}
            <div
              className="w-full h-32 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 mb-8 select-none"
              style={{
                color: TRIALS[trialIndex].colorHex,
              }}
            >
              <span className="text-5xl sm:text-6xl font-black tracking-wider drop-shadow-md">
                {TRIALS[trialIndex].word}
              </span>
            </div>

            {/* 4 Apple-Style Choice Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
              {['RED', 'BLUE', 'GREEN', 'YELLOW'].map((cName) => (
                <button
                  key={cName}
                  onClick={() => handleColorPick(cName)}
                  className="py-3 px-4 rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-mono font-bold text-sm tracking-wider transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white/40"
                  style={{
                    borderBottomColor: COLOR_MAP[cName],
                    borderBottomWidth: '3px',
                  }}
                >
                  {cName}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="w-full flex flex-col items-center py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-apple-green/20 border border-apple-green/40 flex items-center justify-center text-apple-green mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-semibold text-white mb-2">
              Cognitive Interference Measured
            </h4>
            <p className="text-xs text-white/60 mb-6 font-mono">
              COMPUTED VIA ANTERIOR CINGULATE CORTEX LATENCY
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">CONGRUENT</span>
                <span className="text-xl font-mono font-bold text-apple-green">{avgCongruent}ms</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">INCONGRUENT</span>
                <span className="text-xl font-mono font-bold text-apple-orange">{avgIncongruent}ms</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-apple-orange/30 shadow-lg">
                <span className="text-[10px] font-mono text-apple-orange block mb-1">YOUR PENALTY</span>
                <span className="text-xl font-mono font-bold text-white">+{interferencePenalty}ms</span>
              </div>
            </div>

            <button
              onClick={startTest}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Test</span>
            </button>
          </div>
        )}
      </div>

      {gameState === 'finished' && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-orange font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Why your brain hesitated</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            The Anterior Cingulate Slammed the Brakes
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            You incurred a <strong className="text-apple-orange">+{interferencePenalty} millisecond delay</strong> when the ink color contradicted the word. Why? Because after decades of reading, your brain decodes text automatically without conscious permission.
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">Executive Conflict Resolution:</span>
            When you see "GREEN" in blue font, two mutually conflicting neural signals race to your mouth. Your <strong className="text-white">Anterior Cingulate Cortex (ACC)</strong> must actively inhibit the automatic reading reflex to allow the slower visual color naming pathway to win.
          </div>
        </div>
      )}
    </div>
  );
};
