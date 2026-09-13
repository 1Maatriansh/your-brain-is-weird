import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, RefreshCw, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';
import { AppleSlider } from '../lab/AppleSlider';

interface BlindSpotProps {
  onComplete?: () => void;
}

export const BlindSpotExperiment: React.FC<BlindSpotProps> = ({ onComplete }) => {
  const [dotDistance, setDotDistance] = useState(240); // px from center
  const [hasDisappeared, setHasDisappeared] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleDisappeared = () => {
    sound.playWTFTone();
    setHasDisappeared(true);
    setRevealed(true);
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    sound.playHapticClick();
    setHasDisappeared(false);
    setRevealed(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Testing Canvas Container */}
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-10 flex flex-col items-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Instructions banner */}
        <div className="relative z-10 w-full mb-8 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white/80 leading-relaxed flex flex-col gap-1.5">
          <div className="font-semibold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-apple-blue text-white flex items-center justify-center text-xs">1</span>
            Cover your LEFT eye with your left hand.
          </div>
          <div className="font-semibold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-apple-blue text-white flex items-center justify-center text-xs">2</span>
            Stare continuously at the crosshair (+) on the left with your RIGHT eye.
          </div>
          <div className="text-white/60 pl-7">
            Slowly lean forward or backward (about 12–16 inches from screen), or adjust the distance slider below.
          </div>
        </div>

        {/* Experiment Visual Field */}
        <div
          className="relative z-10 w-full h-44 sm:h-56 bg-zinc-950/80 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden mb-6"
          role="img"
          aria-label="Blind spot interactive visual field: fixate on the crosshair on the left while watching the dot on the right disappear"
        >
          {/* Left Fixation Cross */}
          <div className="absolute left-12 sm:left-20 flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center text-white font-bold text-3xl select-none">
              <Plus className="w-8 h-8 stroke-[3]" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 mt-1">
              Fixate Here
            </span>
          </div>

          {/* Right Target Dot that enters the optic disc */}
          <div
            className="absolute transition-all duration-75 flex flex-col items-center"
            style={{
              transform: `translateX(${dotDistance}px)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-apple-orange shadow-[0_0_16px_rgba(255,159,10,0.5)] flex-shrink-0 transition-transform duration-200 hover:scale-110" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-apple-orange/80 mt-1">
              Target Dot
            </span>
          </div>
        </div>

        {/* Slider Calibration */}
        <div className="w-full max-w-md mb-6 relative z-10">
          <AppleSlider
            label="Horizontal Retinal Eccentricity"
            value={dotDistance}
            min={120}
            max={320}
            step={2}
            unit="px"
            accentColor="#ff9f0a"
            onChange={setDotDistance}
            description="Adjust if your viewing distance or screen resolution requires fine tuning"
          />
        </div>

        {/* Interactive Action Button */}
        <div className="relative z-10 flex flex-wrap gap-3 items-center justify-center">
          {!hasDisappeared ? (
            <button
              onClick={handleDisappeared}
              className="px-6 py-3 rounded-full bg-white hover:bg-white/90 active:scale-95 text-black font-semibold text-sm transition-all shadow-xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-apple-orange" />
              <span>It Vanished! (Click When Disappeared)</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Again</span>
            </button>
          )}
        </div>
      </div>

      {/* WTF Moment & Neuroscientific Explanation Reveal */}
      {revealed && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-orange font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>WTF Phenomenon Verified</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            Why did the dot disappear into thin air?
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            You just witnessed your biological blind spot. Where the optic nerve connects to your retina, there are{' '}
            <strong className="text-white">zero photoreceptors</strong> (no rods or cones). When the image of the dot landed on this optic disc, your eye was physically incapable of sensing light.
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">Cortical Surface Interpolation (Brain Hallucination):</span>
            Notice that when the dot vanished, you did <strong className="text-white">not</strong> see a black hole or static noise. Your visual cortex (area V1) smoothly sampled the surrounding dark background and seamlessly painted over the hole in real time. Your brain constantly fabricates parts of your reality.
          </div>
        </div>
      )}
    </div>
  );
};
