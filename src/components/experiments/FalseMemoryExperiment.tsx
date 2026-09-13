import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FalseMemoryProps {
  onComplete?: () => void;
}

const STUDY_WORDS = [
  'bed', 'awake', 'tired', 'dream', 'snore',
  'yawn', 'blanket', 'doze', 'slumber', 'pillow',
  'night', 'rest'
];

interface TestWord {
  word: string;
  isReal: boolean;
  isCriticalLure: boolean;
}

const TEST_WORDS: TestWord[] = [
  { word: 'tired', isReal: true, isCriticalLure: false },
  { word: 'chimney', isReal: false, isCriticalLure: false },
  { word: 'pillow', isReal: true, isCriticalLure: false },
  { word: 'SLEEP', isReal: false, isCriticalLure: true }, // The critical associative lure!
  { word: 'guitar', isReal: false, isCriticalLure: false },
  { word: 'dream', isReal: true, isCriticalLure: false },
];

export const FalseMemoryExperiment: React.FC<FalseMemoryProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'study' | 'testing' | 'reveal'>('intro');
  const [studyWordIdx, setStudyWordIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean>>({});

  // Study Phase Word Carousel
  useEffect(() => {
    if (phase !== 'study') return;

    if (studyWordIdx < STUDY_WORDS.length) {
      sound.playHapticClick(800 + studyWordIdx * 50, 0.01);
      const timer = setTimeout(() => {
        setStudyWordIdx((idx) => idx + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Transition to testing
      setPhase('testing');
    }
  }, [phase, studyWordIdx]);

  const startExperiment = () => {
    sound.playHapticClick();
    setPhase('study');
    setStudyWordIdx(0);
    setTestIdx(0);
    setUserAnswers({});
  };

  const handleAnswer = (saidYes: boolean) => {
    sound.playHapticClick(saidYes ? 1400 : 700);
    const current = TEST_WORDS[testIdx];
    const nextAnswers = { ...userAnswers, [current.word]: saidYes };
    setUserAnswers(nextAnswers);

    if (testIdx + 1 < TEST_WORDS.length) {
      setTestIdx(testIdx + 1);
    } else {
      sound.playRevealChime();
      setPhase('reveal');
      if (onComplete) onComplete();
    }
  };

  const fellForTrap = userAnswers['SLEEP'] === true;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl backdrop-blur-xl relative">
        {phase === 'intro' && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 rounded-2xl bg-apple-purple/20 border border-apple-purple/40 flex items-center justify-center text-apple-purple mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">
              The DRM False Memory Reconstructor
            </h4>
            <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
              You will watch a rapid sequence of 12 words. Commit as many to memory as you can. A brief memory test will follow immediately.
            </p>
            <button
              onClick={startExperiment}
              className="px-8 py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-sm transition-all active:scale-95 shadow-xl"
            >
              Begin Memorization Phase
            </button>
          </div>
        )}

        {phase === 'study' && (
          <div className="w-full flex flex-col items-center py-10">
            <span className="text-xs font-mono text-white/50 mb-6 uppercase tracking-widest">
              Memorize ({studyWordIdx + 1} of 12)
            </span>
            <div className="w-full h-32 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-4xl sm:text-5xl font-bold tracking-wide text-white uppercase animate-pulse-subtle">
                {STUDY_WORDS[studyWordIdx] || '...'}
              </span>
            </div>
          </div>
        )}

        {phase === 'testing' && (
          <div className="w-full flex flex-col items-center py-6">
            <span className="text-xs font-mono text-apple-orange mb-4 uppercase tracking-widest">
              Was this word on the original list? ({testIdx + 1} of 6)
            </span>

            <div className="w-full h-28 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 mb-8">
              <span className="text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase">
                {TEST_WORDS[testIdx].word}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="px-8 py-3 rounded-full bg-apple-green hover:bg-apple-green/90 text-black font-bold text-sm transition-all active:scale-95 shadow-lg flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>YES, It Was On The List</span>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>NO, It Was NOT</span>
              </button>
            </div>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="w-full flex flex-col items-center py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-apple-purple/20 border border-apple-purple/40 flex items-center justify-center text-apple-purple mb-3">
              <Brain className="w-6 h-6" />
            </div>

            <h4 className="text-2xl font-semibold text-white mb-1">
              {fellForTrap ? 'You Remembered A Word That Never Existed!' : 'Impressive Memory Discrimination!'}
            </h4>
            <p className="text-xs font-mono text-apple-purple mb-6 uppercase tracking-wider">
              {fellForTrap ? '84% OF HUMANS FALL INTO THIS EXACT NEURAL TRAP' : 'YOU RESISTED THE ASSOCIATIVE LURE'}
            </p>

            {/* Critical Trap Breakdown */}
            <div className="w-full max-w-md p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 text-left text-xs leading-relaxed">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-white/70">The Critical Lure:</span>
                <span className="font-bold text-apple-orange font-mono">"SLEEP"</span>
              </div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-white/70">Was it on the list?</span>
                <span className="font-bold text-apple-red font-mono">NO, NEVER SHOWN</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Your memory verdict:</span>
                <span className={`font-bold font-mono ${fellForTrap ? 'text-apple-red' : 'text-apple-green'}`}>
                  {fellForTrap ? 'YOU REMEMBERED SEEING IT' : 'CORRECTLY REJECTED'}
                </span>
              </div>
            </div>

            <button
              onClick={startExperiment}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Again</span>
            </button>
          </div>
        )}
      </div>

      {phase === 'reveal' && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-purple font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Spreading Activation in the Hippocampus</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            Why your brain fabricated the word "SLEEP"
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Words like <em className="text-white">bed, tired, dream, snore, yawn, pillow</em> all share dense semantic connections with the concept of <strong className="text-white">SLEEP</strong>. Every time a related word flashed on screen, electrical excitation spread through your associative neural web, converging on the node for "sleep."
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">Gist vs. Verbatim Traces:</span>
            According to Fuzzy-Trace Theory, your brain retains the general "gist" of an event while discarding the verbatim raw data. Your brain was so convinced "sleep" fit the semantic gist that it stamped it with a false episodic memory trace.
          </div>
        </div>
      )}
    </div>
  );
};
