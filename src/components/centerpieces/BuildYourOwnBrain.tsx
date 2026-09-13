import React, { useState } from 'react';
import { Sliders, Play, Sparkles, RefreshCw, Cpu, Brain, Zap } from 'lucide-react';
import { sound } from '../../utils/audio';
import { AppleSlider } from '../lab/AppleSlider';
import { BrainSimulationState, SimulationScenario } from '../../types/brain';

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'notification',
    title: 'You Receive an Ambiguous Notification',
    prompt: 'Your phone buzzes in your pocket with an unknown contact icon while you are trying to write a complex report.',
    initialState: {
      novelty: 85,
      attention: 40,
      uncertainty: 75,
      socialPressure: 60,
      reward: 80,
      memoryNoise: 30,
      predictionWeight: 50,
    },
    evaluate: (s) => {
      if (s.uncertainty > 60 && s.reward > 60 && s.attention < 50) {
        return {
          behavior: 'Immediate Compulsive Unlock & 30-Minute Doomscroll',
          dominantNeurochemical: 'Dopamine Surge (SN/VTA exploratory foraging spike)',
          cognitiveDistortion: 'Hyperbolic Discounting & Loss of Stopping Cues',
          attentionDriftSec: 1800,
          wtfExplanation: 'High uncertainty combined with high reward anticipation overwhelmed low prefrontal attentional control. The striatum treated the notification as an urgent biological foraging event.',
        };
      } else if (s.attention >= 70 && s.predictionWeight >= 60) {
        return {
          behavior: 'Conscious Selective Inattention (Phone Ignored)',
          dominantNeurochemical: 'Norepinephrine & Prefrontal Acetylcholine Focus',
          cognitiveDistortion: 'Minimal (Top-Down Executive Gating Active)',
          attentionDriftSec: 3,
          wtfExplanation: 'High top-down attentional filtering successfully suppressed the sensory orienting reflex, allowing the dorsal frontoparietal network to remain locked on the writing task.',
        };
      } else {
        return {
          behavior: 'Hesitant Glance Followed by Lingering Attention Residue',
          dominantNeurochemical: 'Mild Cortisol & Low Dopaminergic Anticipation',
          cognitiveDistortion: 'Attention Residue Fragmentation',
          attentionDriftSec: 420,
          wtfExplanation: 'You resisted opening the phone immediately, but because uncertainty was moderate, working memory kept rehearsing potential message scenarios, degrading your report quality.',
        };
      }
    },
  },
  {
    id: 'crowded-room',
    title: 'You Walk into a Crowded Party',
    prompt: 'You step through the door of a crowded gathering where you know barely two people. A group bursts into laughter nearby.',
    initialState: {
      novelty: 70,
      attention: 50,
      uncertainty: 80,
      socialPressure: 85,
      reward: 45,
      memoryNoise: 40,
      predictionWeight: 65,
    },
    evaluate: (s) => {
      if (s.socialPressure > 70 && s.uncertainty > 60) {
        return {
          behavior: 'Acute Spotlight Paranoia & Posture Rigidity',
          dominantNeurochemical: 'Amygdala Corticotropin & Sympathetic Vasoconstriction',
          cognitiveDistortion: 'Spotlight Effect & Mind-Reading Illusion',
          attentionDriftSec: 600,
          wtfExplanation: 'Your brain immediately assumed the laughing group was mocking your clothes. The anterior cingulate registered social ambiguity as physical threat.',
        };
      } else if (s.novelty > 70 && s.socialPressure < 50) {
        return {
          behavior: 'Curious Exploratory Social Mingling',
          dominantNeurochemical: 'Oxytocin & Ventral Striatal Approach Motivation',
          cognitiveDistortion: 'Optimism Heuristic',
          attentionDriftSec: 120,
          wtfExplanation: 'Low social evaluation fear freed up dopaminergic novelty-seeking circuits, triggering the chameleon effect to mimic unfamiliar body language safely.',
        };
      } else {
        return {
          behavior: 'Polite Wallflower Browsing Phone to Mask Discomfort',
          dominantNeurochemical: 'Baseline Autonomic Vigilance',
          cognitiveDistortion: 'Deindividuation Avoidance',
          attentionDriftSec: 450,
          wtfExplanation: 'Your motor cortex automatically pulled out your smartphone as an emotional pacifier, using a familiar tool to lower ambient social threat.',
        };
      }
    },
  },
  {
    id: 'argument-recall',
    title: 'You Recount an Intense Argument',
    prompt: 'A friend asks you what happened during a heated disagreement you had with your partner three weeks ago.',
    initialState: {
      novelty: 30,
      attention: 60,
      uncertainty: 40,
      socialPressure: 60,
      reward: 50,
      memoryNoise: 80,
      predictionWeight: 75,
    },
    evaluate: (s) => {
      if (s.memoryNoise > 60 && s.predictionWeight > 60) {
        return {
          behavior: 'Heroic Self-Justifying Narrative Reconstruction',
          dominantNeurochemical: 'Endogenous Endorphin Cognitive Dissonance Relief',
          cognitiveDistortion: 'Confabulation & Egocentric Retrospective Distortion',
          attentionDriftSec: 300,
          wtfExplanation: 'Because memory noise was high, your brain reconstructed the dialogue from the gist of your current emotional stance, erasing your own harsh words and accentuating your partner’s flaws.',
        };
      } else {
        return {
          behavior: 'Balanced Verbatim Memory Retrieval',
          dominantNeurochemical: 'Balanced Hippocampal Sharp-Wave Ripple Readout',
          cognitiveDistortion: 'Minimal Episodic Reconstruction Error',
          attentionDriftSec: 60,
          wtfExplanation: 'Low memory noise and tempered self-serving priors allowed hippocampal episodic networks to retrieve accurate verbatim details without extensive moral rewriting.',
        };
      }
    },
  },
];

export const BuildYourOwnBrain: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const scenario = SCENARIOS[activeScenarioIdx];

  const [state, setState] = useState<BrainSimulationState>(scenario.initialState);
  const [simulationResult, setSimulationResult] = useState<ReturnType<typeof scenario.evaluate> | null>(null);

  const handleSliderChange = (key: keyof BrainSimulationState, val: number) => {
    setState((prev) => ({ ...prev, [key]: val }));
  };

  const runSimulation = () => {
    sound.playRevealChime();
    const result = scenario.evaluate(state);
    setSimulationResult(result);
  };

  const handleScenarioChange = (idx: number) => {
    sound.playHapticClick();
    setActiveScenarioIdx(idx);
    setState(SCENARIOS[idx].initialState);
    setSimulationResult(null);
  };

  const resetVariables = () => {
    sound.playHapticClick();
    setState(scenario.initialState);
    setSimulationResult(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-black/70 border border-white/15 rounded-3xl p-6 sm:p-10 flex flex-col shadow-2xl backdrop-blur-2xl relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-apple-purple font-mono text-xs uppercase tracking-widest font-semibold mb-1">
              <Brain className="w-4 h-4" />
              <span>Interactive Simulator Playground</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Build Your Own Weird Brain
            </h3>
          </div>

          <button
            onClick={resetVariables}
            className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white transition-all self-start sm:self-auto flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Variables</span>
          </button>
        </div>

        {/* Scenario Picker */}
        <div className="w-full mb-8">
          <span className="text-xs font-mono text-white/50 block mb-3 uppercase tracking-wider">
            Step 1: Choose Life Scenario
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(i)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  i === activeScenarioIdx
                    ? 'border-apple-purple bg-apple-purple/15 text-white shadow-lg'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="font-mono text-[10px] text-apple-purple font-bold block mb-1">
                  SCENARIO {i + 1}
                </span>
                <span className="text-sm font-medium block leading-snug">{sc.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed">
            <strong className="text-white">Setting:</strong> {scenario.prompt}
          </div>
        </div>

        {/* 7 Apple-Style Parameter Sliders */}
        <div className="w-full mb-8">
          <span className="text-xs font-mono text-white/50 block mb-4 uppercase tracking-wider">
            Step 2: Calibrate Neural & Cognitive Variables
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <AppleSlider
              label="Novelty Seeking Drive"
              value={state.novelty}
              min={0}
              max={100}
              accentColor="#ff9f0a"
              onChange={(v) => handleSliderChange('novelty', v)}
              description="Dopaminergic salience to unexpected sensory events"
            />
            <AppleSlider
              label="Attentional Filtering Capacity"
              value={state.attention}
              min={0}
              max={100}
              accentColor="#0a84ff"
              onChange={(v) => handleSliderChange('attention', v)}
              description="Prefrontal cortex top-down executive control"
            />
            <AppleSlider
              label="Uncertainty Tolerance"
              value={state.uncertainty}
              min={0}
              max={100}
              accentColor="#ff453a"
              onChange={(v) => handleSliderChange('uncertainty', v)}
              description="Amygdala threat sensitivity to ambiguous information"
            />
            <AppleSlider
              label="Social Pressure & Tribal Sensitivity"
              value={state.socialPressure}
              min={0}
              max={100}
              accentColor="#bf5af2"
              onChange={(v) => handleSliderChange('socialPressure', v)}
              description="Susceptibility to conformity, evaluation, and ostracism"
            />
            <AppleSlider
              label="Reward Anticipation Sensitivity"
              value={state.reward}
              min={0}
              max={100}
              accentColor="#34c759"
              onChange={(v) => handleSliderChange('reward', v)}
              description="Striatal sensitivity to variable intermittent payoffs"
            />
            <AppleSlider
              label="Episodic Memory Noise"
              value={state.memoryNoise}
              min={0}
              max={100}
              accentColor="#ffd60a"
              onChange={(v) => handleSliderChange('memoryNoise', v)}
              description="Degree of reconstruction error and gist distortion"
            />
          </div>
        </div>

        {/* Run Simulation Trigger */}
        <div className="w-full flex justify-center mb-8">
          <button
            onClick={runSimulation}
            className="px-10 py-4 rounded-full bg-white hover:bg-white/90 active:scale-95 text-black font-bold text-sm sm:text-base transition-all shadow-2xl flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Run Neural Simulation</span>
          </button>
        </div>

        {/* Simulation Output Card */}
        {simulationResult && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.05] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-apple-green uppercase tracking-widest font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>Simulated Emergent Behavior</span>
            </div>

            <h4 className="text-2xl font-bold text-white mb-3">
              "{simulationResult.behavior}"
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">DOMINANT BIO-SIGNAL</span>
                <span className="text-xs font-mono font-bold text-apple-orange">{simulationResult.dominantNeurochemical}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">ACTIVE BIAS/DISTORTION</span>
                <span className="text-xs font-mono font-bold text-apple-purple">{simulationResult.cognitiveDistortion}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block mb-1">ESTIMATED ATTENTION DRIFT</span>
                <span className="text-xs font-mono font-bold text-apple-blue">~{Math.round(simulationResult.attentionDriftSec / 60)} Minutes</span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed mb-4">
              <strong className="text-white">Neurological Analysis:</strong> {simulationResult.wtfExplanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
