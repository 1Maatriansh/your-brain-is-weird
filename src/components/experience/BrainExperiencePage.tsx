import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Eye, Clock, Zap, Smartphone, Brain, CheckCircle2, RotateCcw, Plus } from 'lucide-react';
import { AppleButton } from '../ui/AppleButton';
import { sound } from '../../utils/audio';

interface ExperienceProps {
  onBackToHome: () => void;
  onExploreConcepts: () => void;
  onOpenSandbox: () => void;
}

export const BrainExperiencePage: React.FC<ExperienceProps> = ({
  onBackToHome,
  onExploreConcepts,
  onOpenSandbox,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Step 1: Blind Spot state
  const [dotDistance, setDotDistance] = useState(220);
  const [blindSpotTriggered, setBlindSpotTriggered] = useState(false);

  // Step 2: Time Reaction state
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number>(0);
  const reactionTimer = useRef<number>(0);
  const waitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Step 3: Stroop state
  const [stroopTrial, setStroopTrial] = useState(0);
  const [stroopPenalty, setStroopPenalty] = useState(false);

  // Step 4: Dopamine Slot Machine state
  const [dopamineLevel, setDopamineLevel] = useState(25);
  const [notificationReceived, setNotificationReceived] = useState(false);

  // Step 5: False Memory state
  const [memoryAnswer, setMemoryAnswer] = useState<'yes' | 'no' | null>(null);

  // Progress to next step
  const nextStep = () => {
    sound.playRevealChime();
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    sound.playHapticClick();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Handler
  const startReactionTest = () => {
    sound.playHapticClick();
    setReactionState('waiting');
    const delay = 1500 + Math.random() * 2000;
    waitTimeout.current = setTimeout(() => {
      setReactionState('ready');
      reactionTimer.current = performance.now();
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === 'ready') {
      const elapsed = Math.round(performance.now() - reactionTimer.current);
      sound.playRevealChime();
      setReactionTime(elapsed);
      setReactionState('result');
    } else if (reactionState === 'waiting') {
      sound.playWTFTone();
      if (waitTimeout.current) clearTimeout(waitTimeout.current);
      setReactionState('idle');
    }
  };

  // Step 4 Handler
  const triggerNotification = () => {
    sound.playHapticClick(1400, 0.02);
    setNotificationReceived(true);
    setDopamineLevel(94);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0c] text-white select-none pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Home</span>
        </button>

        {/* Step Progress Pill */}
        {currentStep <= totalSteps ? (
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-apple-orange" />
            <span className="text-xs font-mono font-medium text-white/90">
              Revelation {currentStep} of {totalSteps}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-apple-green/15 border border-apple-green/30 px-4 py-1.5 rounded-full text-apple-green text-xs font-mono font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Complete
          </div>
        )}

        <span className="text-xs font-mono text-white/40 hidden sm:inline">
          YOUR BRAIN IN REAL TIME
        </span>
      </div>

      {/* Main Opaque Stage Card */}
      <div className="w-full bg-[#121215] border border-white/[0.1] rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-white/[0.03] blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* STEP 1: THE RETINAL BLIND SPOT                                            */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-orange font-semibold mb-2">
              REVELATION 01 — PERCEPTUAL DECEPTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Make an object vanish into thin air.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              1. Close your <strong className="text-white">LEFT eye</strong>. 2. Stare at the cross (+) below with your <strong className="text-white">RIGHT eye</strong>. 3. Watch the orange circle as you lean closer or farther (around 12-16 inches).
            </p>

            {/* Interactive Visual Canvas */}
            <div className="w-full max-w-xl h-44 sm:h-52 bg-black/80 border border-white/[0.1] rounded-2xl flex items-center justify-between px-12 sm:px-20 mb-6 relative overflow-hidden">
              <div className="flex flex-col items-center">
                <Plus className="w-8 h-8 text-white stroke-[3]" />
                <span className="text-[10px] font-mono text-white/40 uppercase mt-1">Stare Here</span>
              </div>

              <div
                className="flex flex-col items-center transition-all duration-75"
                style={{ transform: `translateX(${(dotDistance - 220) * 0.5}px)` }}
              >
                {!blindSpotTriggered ? (
                  <div className="w-7 h-7 rounded-full bg-apple-orange shadow-[0_0_16px_rgba(255,159,10,0.8)]" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-apple-green/20 border border-apple-green flex items-center justify-center text-apple-green text-xs font-bold">
                    ✓
                  </div>
                )}
                <span className="text-[10px] font-mono text-apple-orange uppercase mt-1">
                  {blindSpotTriggered ? 'Erased!' : 'Target Dot'}
                </span>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="w-full max-w-md mb-8">
              <div className="flex justify-between text-xs text-white/50 mb-2 font-mono">
                <span>HEAD DISTANCE CALIBRATOR</span>
                <span>{dotDistance}px</span>
              </div>
              <input
                type="range"
                min={140}
                max={300}
                value={dotDistance}
                onChange={(e) => setDotDistance(parseInt(e.target.value))}
                className="w-full h-2 rounded-full bg-white/10 accent-white cursor-pointer"
              />
            </div>

            {/* Quick Punchy Revelation Cards (No long paragraph!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-orange font-bold text-xs font-mono block mb-1">
                  👁️ THE PHYSICAL BUG
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  There is a literal hole in your retina where 1.2 million nerves exit. When the orange dot lands on this optic disc, your eye sends <strong>zero light data</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-green font-bold text-xs font-mono block mb-1">
                  🧠 THE BRAIN COVER-UP
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Notice you saw <strong>no black hole</strong>! Your brain secretly sampled the surrounding dark pixels and painted over the gap in real time. Your vision is an ongoing fabrication.
                </p>
              </div>
            </div>

            <AppleButton variant="glow" size="lg" onClick={nextStep} icon={<ArrowRight className="w-4 h-4" />}>
              Next Brain Glitch →
            </AppleButton>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: LIVING 80ms IN THE PAST                                           */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-blue font-semibold mb-2">
              REVELATION 02 — THE TIME LAG
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              You are living 80ms in the past.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              Test your physical reaction speed. Tap the button the exact microsecond it flashes bright green!
            </p>

            {/* Reaction Arena */}
            <div className="w-full max-w-md mb-8">
              {reactionState === 'idle' && (
                <button
                  onClick={startReactionTest}
                  className="w-full h-44 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 flex flex-col items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Zap className="w-8 h-8 text-apple-blue" />
                  <span className="text-sm font-semibold text-white">Tap to Begin Speed Test</span>
                </button>
              )}

              {reactionState === 'waiting' && (
                <div
                  onClick={handleReactionClick}
                  className="w-full h-44 rounded-2xl bg-apple-red/20 border border-apple-red/40 flex flex-col items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <span className="text-base font-bold text-apple-red font-mono uppercase">WAIT FOR GREEN...</span>
                  <span className="text-xs text-white/50">Don't tap yet!</span>
                </div>
              )}

              {reactionState === 'ready' && (
                <div
                  onClick={handleReactionClick}
                  className="w-full h-44 rounded-2xl bg-apple-green border border-apple-green flex flex-col items-center justify-center gap-2 cursor-pointer shadow-[0_0_50px_rgba(52,199,89,0.8)]"
                >
                  <span className="text-2xl font-black text-black font-mono uppercase tracking-wider">TAP NOW!</span>
                </div>
              )}

              {reactionState === 'result' && (
                <div className="w-full h-44 rounded-2xl bg-white/[0.06] border border-white/20 flex flex-col items-center justify-center gap-2">
                  <span className="text-xs font-mono text-white/50 uppercase">YOUR REACTION SPEED</span>
                  <span className="text-4xl font-bold font-mono text-apple-blue">{reactionTime} ms</span>
                  <button
                    onClick={startReactionTest}
                    className="text-xs text-white/60 hover:text-white flex items-center gap-1 mt-1 underline"
                  >
                    <RotateCcw className="w-3 h-3" /> Test Again
                  </button>
                </div>
              )}
            </div>

            {/* Quick Punchy Revelation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-blue font-bold text-xs font-mono block mb-1">
                  ⏳ THE 80MS LATENCY
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Photons take ~80 milliseconds just to travel from your retina to your visual cortex. Everything you see as "NOW" happened in the past.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-purple font-bold text-xs font-mono block mb-1">
                  🔮 THE FUTURE PREDICTION
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  To catch a dropped phone or hit a 90mph baseball, your brain cannot wait for reality. It constantly projects a simulated hallucination <strong>into the future</strong>!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <AppleButton variant="secondary" onClick={prevStep}>
                ← Previous
              </AppleButton>
              <AppleButton variant="glow" size="lg" onClick={nextStep} icon={<ArrowRight className="w-4 h-4" />}>
                Next Brain Glitch →
              </AppleButton>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: THE READING AUTO-PILOT (STROOP CONFLICT)                          */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-purple font-semibold mb-2">
              REVELATION 03 — UNCONSCIOUS AUTOMATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Your brain reads before you let it.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              Tap the button matching the <strong className="text-white">FONT COLOR</strong>, ignoring what the word spells!
            </p>

            {/* Stimulus Word */}
            <div className="w-full max-w-md h-36 rounded-2xl bg-black/70 border border-white/[0.1] flex items-center justify-center mb-6">
              <span className="text-5xl sm:text-6xl font-black text-apple-blue tracking-wider drop-shadow-md">
                RED
              </span>
            </div>

            {/* Choice Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
              <button
                onClick={() => {
                  sound.playWTFTone();
                  setStroopPenalty(true);
                }}
                className="py-3.5 rounded-xl bg-apple-red/20 hover:bg-apple-red/30 border border-apple-red/40 text-apple-red font-mono font-bold text-sm"
              >
                RED (Word says red)
              </button>
              <button
                onClick={() => {
                  sound.playRevealChime();
                  setStroopPenalty(false);
                }}
                className="py-3.5 rounded-xl bg-apple-blue/20 hover:bg-apple-blue/30 border border-apple-blue/40 text-apple-blue font-mono font-bold text-sm"
              >
                BLUE (Ink is blue!) ✓
              </button>
            </div>

            {/* Punchy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-purple font-bold text-xs font-mono block mb-1">
                  📖 THE READING REFLEX
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Reading is so deeply wired into your temporal lobe that your eyes automatically decoded the word "RED" before you could stop them.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-green font-bold text-xs font-mono block mb-1">
                  🛑 THE ANTERIOR BRAKE
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Your anterior cingulate cortex had to physically fire an inhibitory signal to slam on the brakes so you could say "blue". That conflict costs +200ms!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <AppleButton variant="secondary" onClick={prevStep}>
                ← Previous
              </AppleButton>
              <AppleButton variant="glow" size="lg" onClick={nextStep} icon={<ArrowRight className="w-4 h-4" />}>
                Next Brain Glitch →
              </AppleButton>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: THE DOPAMINE SLOT MACHINE                                         */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-orange font-semibold mb-2">
              REVELATION 04 — ATTENTION HIJACK
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Why your thumb can't stop scrolling.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              Tap the notification alert below to watch your brain's dopamine expectation surge in real time.
            </p>

            {/* Interactive Phone Notification Widget */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-black/80 border border-white/[0.12] mb-8 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white/50">PHONE SIMULATOR</span>
                <span className="text-xs font-mono text-apple-orange font-bold">DOPAMINE: {dopamineLevel}%</span>
              </div>

              <button
                onClick={triggerNotification}
                className="w-full p-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 flex items-center gap-3 text-left transition-all active:scale-98"
              >
                <div className="w-10 h-10 rounded-full bg-apple-orange flex items-center justify-center text-black font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">Incoming Message</span>
                  <span className="text-xs text-white/60">Tap to see who texted you...</span>
                </div>
              </button>

              {/* Dopamine Meter */}
              <div className="mt-4">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-apple-orange transition-all duration-500 rounded-full"
                    style={{ width: `${dopamineLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Punchy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-orange font-bold text-xs font-mono block mb-1">
                  🎰 THE UNCERTAINTY SPIKE
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Dopamine does NOT release when you read the message. It spikes during the <strong>anticipation</strong> of not knowing what you'll find.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-red font-bold text-xs font-mono block mb-1">
                  🥣 THE BOTTOMLESS BOWL
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Infinite scroll feeds remove page numbers and stopping cues, tricking your brain into continuing forever like eating from an endless soup bowl.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <AppleButton variant="secondary" onClick={prevStep}>
                ← Previous
              </AppleButton>
              <AppleButton variant="glow" size="lg" onClick={nextStep} icon={<ArrowRight className="w-4 h-4" />}>
                Next Brain Glitch →
              </AppleButton>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: THE FABRICATED MEMORY                                             */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <span className="font-mono text-xs uppercase tracking-widest text-apple-green font-semibold mb-2">
              REVELATION 05 — CONSTRUCTIVE MEMORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-3">
              Did your brain invent a memory?
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mb-8 leading-relaxed">
              Earlier in this session, did you see the word <strong className="text-white">"SLEEP"</strong> in the memorization word list?
            </p>

            {/* Decision Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  sound.playWTFTone();
                  setMemoryAnswer('yes');
                }}
                className={`px-8 py-3.5 rounded-full border text-sm font-semibold transition-all ${
                  memoryAnswer === 'yes'
                    ? 'bg-apple-red text-white border-apple-red'
                    : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                Yes, I Remember Seeing "SLEEP"
              </button>
              <button
                onClick={() => {
                  sound.playRevealChime();
                  setMemoryAnswer('no');
                }}
                className={`px-8 py-3.5 rounded-full border text-sm font-semibold transition-all ${
                  memoryAnswer === 'no'
                    ? 'bg-apple-green text-black border-apple-green'
                    : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                No, It Was Never Shown
              </button>
            </div>

            {memoryAnswer && (
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/20 max-w-md mb-8 animate-fade-in">
                <span className="text-xs font-mono font-bold text-apple-orange block mb-1">
                  THE VERDICT:
                </span>
                <p className="text-sm text-white/90">
                  {memoryAnswer === 'yes'
                    ? 'You fell for the classic psychological trap! The list had bed, tired, yawn, snore, pillow—but NEVER the word sleep.'
                    : 'Brilliant! You avoided the false lure that tricks over 84% of educated adults!'}
                </p>
              </div>
            )}

            {/* Punchy Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left mb-8">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-green font-bold text-xs font-mono block mb-1">
                  🧩 GIST OVER DETAILS
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Your hippocampus only saves the general semantic "gist". When you recall an event, your brain invents details to complete the story.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-apple-purple font-bold text-xs font-mono block mb-1">
                  🎨 CONFIDENT HALLUCINATIONS
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  People will confidently bet money on seeing false words because the subjective feeling of remembering feels 100% genuine.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <AppleButton variant="secondary" onClick={prevStep}>
                ← Previous
              </AppleButton>
              <AppleButton variant="glow" size="lg" onClick={nextStep} icon={<Sparkles className="w-4 h-4" />}>
                View Final Breakthrough →
              </AppleButton>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FINALE: CONGRATULATIONS & EXPEDITION PORTAL                               */}
        {/* ========================================================================= */}
        {currentStep > totalSteps && (
          <div className="w-full flex flex-col items-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-apple-green/20 border border-apple-green/40 flex items-center justify-center text-apple-green mb-4">
              <Brain className="w-8 h-8" />
            </div>

            <span className="font-mono text-xs uppercase tracking-widest text-apple-green font-semibold mb-2">
              YOU COMPLETED THE REVELATION TOUR
            </span>

            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4">
              Your brain isn't what you thought.
            </h2>

            <p className="text-base text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
              You just witnessed 5 profound anomalies inside your own cranium: retinal blind spot infilling, 80ms latency compensation, reading interference, dopamine foraging addiction, and false memory creation.
            </p>

            {/* Portal Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <AppleButton
                variant="glow"
                size="lg"
                onClick={onExploreConcepts}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore All 120 Brain Concepts
              </AppleButton>

              <AppleButton
                variant="secondary"
                size="lg"
                onClick={onOpenSandbox}
                icon={<Brain className="w-4 h-4" />}
              >
                Play in Brain Sandbox
              </AppleButton>

              <AppleButton
                variant="glass"
                size="lg"
                onClick={onBackToHome}
              >
                Return to Overview
              </AppleButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
