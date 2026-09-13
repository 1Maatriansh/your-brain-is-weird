import React, { useState } from 'react';
import { Smartphone, Bell, Flame, Eye, Compass, RefreshCw, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CascadeStep {
  id: string;
  stage: string;
  trigger: string;
  neuralCircuit: string;
  telemetry: {
    dopamine: number;
    executiveControl: number;
    attentionResidue: number;
    timeLostMin: number;
  };
  explanation: string;
  scienceRef: string;
}

const CASCADE_STEPS: CascadeStep[] = [
  {
    id: 'notification',
    stage: '01 / INCOMING SIGNAL',
    trigger: 'A red badge dings on your lock screen',
    neuralCircuit: 'Locus Coeruleus → Auditory Cortex → Orienting Reflex',
    telemetry: { dopamine: 40, executiveControl: 90, attentionResidue: 15, timeLostMin: 0 },
    explanation: 'Unpredictable acoustic triggers evoke an automatic subcortical orienting reflex. You have not yet decided to check your phone; your brainstem made the motor orienting choice before conscious thought.',
    scienceRef: 'Sokolov, E. N. (1963). Perception and the Conditioned Reflex. Pergamon Press.'
  },
  {
    id: 'novelty',
    stage: '02 / NOVELTY SURGE',
    trigger: 'Who messaged? What happened? An information gap opens',
    neuralCircuit: 'Substantia Nigra / VTA → Nucleus Accumbens',
    telemetry: { dopamine: 75, executiveControl: 70, attentionResidue: 35, timeLostMin: 2 },
    explanation: 'Dopamine does not signal pleasure—it signals anticipation. The uncertainty of who sent the message triggers a surge of exploratory drive, compelling your thumb to swipe.',
    scienceRef: 'Schultz, W. (1998). Predictive reward signal of dopamine neurons. J. Neurophysiol.'
  },
  {
    id: 'attention-hijack',
    stage: '03 / EXECUTIVE CAPTURE',
    trigger: 'You unlock the device to check "just one text"',
    neuralCircuit: 'Ventral Attention Network overrides Dorsal Executive Network',
    telemetry: { dopamine: 85, executiveControl: 45, attentionResidue: 60, timeLostMin: 5 },
    explanation: 'Your prefrontal cortex holds a task-set (e.g. writing a document or cooking dinner). The smartphone interface floods sensory channels with competing salience, dissolving your previous goal representation.',
    scienceRef: 'Corbetta, M., & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention. Nat. Rev. Neurosci.'
  },
  {
    id: 'variable-reward',
    stage: '04 / THE CASINO FEED',
    trigger: 'You swipe downward to refresh the timeline',
    neuralCircuit: 'Striatal Variable Ratio Reinforcement Circuitry',
    telemetry: { dopamine: 95, executiveControl: 30, attentionResidue: 75, timeLostMin: 14 },
    explanation: 'Pulling down to refresh is identical in kinetic ergonomics and mathematical payoff structure to a Las Vegas slot machine lever. The intermittent arrival of high-value social content stamps in compulsive behavior.',
    scienceRef: 'Skinner, B. F. (1953). Science and Human Behavior. Macmillan.'
  },
  {
    id: 'infinite-scroll',
    stage: '05 / ZERO STOPPING CUES',
    trigger: 'Content seamlessly streams as you reach the bottom',
    neuralCircuit: 'Attenuated Prefrontal Cost-Benefit Monitoring (Hypofrontality)',
    telemetry: { dopamine: 70, executiveControl: 15, attentionResidue: 90, timeLostMin: 32 },
    explanation: 'Like Wansink\'s bottomless soup bowl, removing page numbers, chapter breaks, or visual borders prevents the brain from generating an interruption threshold. Consumption continues autonomously.',
    scienceRef: 'Wansink, B., et al. (2005). Bottomless bowls. Obesity Research, 13(1), 93-100.'
  },
  {
    id: 'time-disappearance',
    stage: '06 / COGNITIVE EXHAUSTION',
    trigger: 'You suddenly blink and realize 45 minutes vanished',
    neuralCircuit: 'Severe Attention Residue & Default Mode Fragmentation',
    telemetry: { dopamine: 30, executiveControl: 10, attentionResidue: 95, timeLostMin: 47 },
    explanation: 'You set out to check a 5-second message and surrendered nearly an hour of cognitive bandwidth. When you finally close the phone, your working memory suffers heavy attention residue, requiring up to 23 minutes to regain deep focus.',
    scienceRef: 'Leroy, S. (2009). Why is it so hard to do my work? Attention residue in task transitions. OBHDP.'
  }
];

export const BrainVsInternet: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const step = CASCADE_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < CASCADE_STEPS.length - 1) {
      sound.playHapticClick(900 + currentStepIdx * 100);
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      sound.playWTFTone();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      sound.playHapticClick(600);
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    sound.playHapticClick();
    setCurrentStepIdx(0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-black/70 border border-white/15 rounded-3xl p-6 sm:p-10 flex flex-col shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-apple-orange font-mono text-xs uppercase tracking-widest font-semibold mb-1">
              <Zap className="w-4 h-4" />
              <span>Centerpiece Investigation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              The Brain vs The Internet
            </h3>
          </div>

          <span className="text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
            LOOP STAGE {currentStepIdx + 1} OF {CASCADE_STEPS.length}
          </span>
        </div>

        {/* Dynamic Telemetry Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-mono text-white/50 block mb-1">DOPAMINE DRIVE</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-mono font-bold text-apple-orange">
                {step.telemetry.dopamine}%
              </span>
              <span className="text-[10px] font-mono text-white/40">ANTICIPATION</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
              <div
                className="h-full bg-apple-orange transition-all duration-500 rounded-full"
                style={{ width: `${step.telemetry.dopamine}%` }}
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-mono text-white/50 block mb-1">PREFRONTAL WILL</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-mono font-bold text-apple-green">
                {step.telemetry.executiveControl}%
              </span>
              <span className="text-[10px] font-mono text-white/40">CONTROL</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
              <div
                className="h-full bg-apple-green transition-all duration-500 rounded-full"
                style={{ width: `${step.telemetry.executiveControl}%` }}
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-mono text-white/50 block mb-1">ATTENTION RESIDUE</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-mono font-bold text-apple-red">
                {step.telemetry.attentionResidue}%
              </span>
              <span className="text-[10px] font-mono text-white/40">CLUTTER</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
              <div
                className="h-full bg-apple-red transition-all duration-500 rounded-full"
                style={{ width: `${step.telemetry.attentionResidue}%` }}
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] sm:text-xs font-mono text-white/50 block mb-1">TIME EVAPORATED</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-mono font-bold text-apple-blue">
                +{step.telemetry.timeLostMin}m
              </span>
              <span className="text-[10px] font-mono text-white/40">LOST</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
              <div
                className="h-full bg-apple-blue transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(step.telemetry.timeLostMin * 2, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Cascade Step Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/15 mb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-apple-orange uppercase tracking-wider mb-2">
            <Smartphone className="w-4 h-4" />
            <span>{step.stage}</span>
          </div>

          <h4 className="text-2xl sm:text-3xl font-normal text-white mb-3 tracking-tight">
            "{step.trigger}"
          </h4>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 mb-4">
            <Cpu className="w-3.5 h-3.5 text-apple-purple" />
            <span>Target Circuit: {step.neuralCircuit}</span>
          </div>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
            {step.explanation}
          </p>

          <p className="text-xs text-white/40 font-mono italic">
            Scientific Citation: {step.scienceRef}
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="flex items-center justify-between">
          <button
            disabled={currentStepIdx === 0}
            onClick={handlePrev}
            className={`px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium transition-all ${
              currentStepIdx === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-white/10 text-white active:scale-95'
            }`}
          >
            Previous Stage
          </button>

          <div className="flex items-center gap-1.5">
            {CASCADE_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playHapticClick(800 + i * 50);
                  setCurrentStepIdx(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentStepIdx ? 'w-8 bg-white' : 'bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Jump to stage ${i + 1}`}
              />
            ))}
          </div>

          {currentStepIdx < CASCADE_STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-xl flex items-center gap-1.5"
            >
              <span>Advance Loop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Cascade</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
