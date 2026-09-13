import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Sparkles, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { sound } from '../../utils/audio';
import { AppleToggle } from '../lab/AppleToggle';

interface ChangeBlindnessProps {
  onComplete?: () => void;
}

export const ChangeBlindnessExperiment: React.FC<ChangeBlindnessProps> = ({ onComplete }) => {
  const [frame, setFrame] = useState<'A' | 'mask' | 'B'>('A');
  const [flickerEnabled, setFlickerEnabled] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [found, setFound] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Flicker loop: 600ms Frame A -> 90ms Mask -> 600ms Frame B -> 90ms Mask
  useEffect(() => {
    if (found || !flickerEnabled) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (frame === 'A') {
      timeoutId = setTimeout(() => setFrame('mask'), 650);
    } else if (frame === 'mask') {
      timeoutId = setTimeout(() => setFrame('B'), 90);
    } else if (frame === 'B') {
      timeoutId = setTimeout(() => setFrame('mask'), 650);
    }

    return () => clearTimeout(timeoutId);
  }, [frame, flickerEnabled, found]);

  // Timer
  useEffect(() => {
    if (found) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [found]);

  const handleSpotChange = () => {
    sound.playRevealChime();
    setFound(true);
    setRevealed(true);
    if (onComplete) onComplete();
  };

  const handleRevealDirectly = () => {
    sound.playWTFTone();
    setFound(true);
    setRevealed(true);
    setFlickerEnabled(false);
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    sound.playHapticClick();
    setFound(false);
    setRevealed(false);
    setSeconds(0);
    setFlickerEnabled(true);
    setFrame('A');
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl backdrop-blur-xl relative">
        {/* Top Controls Bar */}
        <div className="w-full flex items-center justify-between mb-4 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-apple-orange" />
            <span>Search Time: {seconds}s</span>
          </div>

          <div className="flex items-center gap-2">
            <AppleToggle
              checked={flickerEnabled}
              onChange={setFlickerEnabled}
              label="Mask Flicker"
              size="sm"
            />
          </div>
        </div>

        {/* Visual Scene Canvas */}
        <div
          onClick={handleSpotChange}
          className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden cursor-crosshair border border-white/10 bg-[#0d0d12] shadow-inner select-none"
          title="Click where you think the change is"
          role="img"
          aria-label="Flickering scene demonstrating change blindness"
        >
          {/* Gray Flicker Mask */}
          {flickerEnabled && frame === 'mask' && !found && (
            <div className="absolute inset-0 bg-[#25252b] z-30 transition-none" />
          )}

          {/* SVG Complex Scene */}
          <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
            {/* Sky Background */}
            <rect width="800" height="450" fill="#0f111a" />

            {/* Stars / Distant Lights */}
            <circle cx="120" cy="60" r="1.5" fill="#ffffff66" />
            <circle cx="340" cy="40" r="2" fill="#ffffff88" />
            <circle cx="680" cy="80" r="1.5" fill="#ffffff55" />

            {/* Distant City Skyline */}
            <rect x="50" y="240" width="80" height="150" fill="#181a24" />
            <rect x="150" y="200" width="110" height="190" fill="#202330" />
            <rect x="280" y="220" width="90" height="170" fill="#1b1e2a" />
            <rect x="520" y="210" width="120" height="180" fill="#222533" />
            <rect x="660" y="230" width="100" height="160" fill="#181a24" />

            {/* THE CRITICAL CHANGING ELEMENT: Massive Cathedral Tower / Spire */}
            {/* Present in Frame A, DISAPPEARS in Frame B! */}
            {(frame === 'A' || !flickerEnabled || found) && (
              <g className="transition-opacity duration-75">
                {/* Tower base */}
                <rect x="390" y="110" width="110" height="280" fill="#2e3347" stroke="#48506e" strokeWidth="2" />
                {/* Spire roof */}
                <polygon points="390,110 445,20 500,110" fill="#ff9f0a" opacity="0.9" />
                {/* Golden cross on top */}
                <line x1="445" y1="8" x2="445" y2="22" stroke="#ffffff" strokeWidth="3" />
                <line x1="438" y1="14" x2="452" y2="14" stroke="#ffffff" strokeWidth="3" />
                {/* Cathedral Arch Window */}
                <rect x="425" y="150" width="40" height="70" rx="20" fill="#ffb84d" opacity="0.8" />
              </g>
            )}

            {/* Foreground Bridge & Street elements */}
            <rect x="0" y="380" width="800" height="70" fill="#11131a" />
            <line x1="0" y1="380" x2="800" y2="380" stroke="#ffffff22" strokeWidth="3" />

            {/* Streetlamps with glow */}
            <rect x="140" y="320" width="4" height="60" fill="#888" />
            <circle cx="142" cy="318" r="8" fill="#ffcc00" opacity="0.8" />

            <rect x="680" y="320" width="4" height="60" fill="#888" />
            <circle cx="682" cy="318" r="8" fill="#ffcc00" opacity="0.8" />

            {/* Trees in Foreground */}
            <circle cx="270" cy="350" r="30" fill="#1e3325" />
            <circle cx="285" cy="335" r="24" fill="#264230" />
            <rect x="275" y="360" width="8" height="25" fill="#3a271d" />

            {/* Pedestrian Silhouette */}
            <circle cx="560" cy="360" r="6" fill="#fff" opacity="0.6" />
            <line x1="560" y1="366" x2="560" y2="380" stroke="#fff" strokeWidth="3" opacity="0.6" />
          </svg>

          {/* Highlight circle when found */}
          {found && (
            <div className="absolute top-[4%] left-[47%] w-32 h-64 border-2 border-apple-green rounded-2xl shadow-[0_0_24px_rgba(52,199,89,0.5)] pointer-events-none flex items-center justify-center">
              <span className="bg-black/80 text-apple-green text-[11px] font-mono px-2 py-0.5 rounded-full border border-apple-green/40">
                Spire Changes Here
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {!found ? (
            <>
              <button
                onClick={handleSpotChange}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-apple-orange" />
                <span>I Spotted It!</span>
              </button>
              <button
                onClick={handleRevealDirectly}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all"
              >
                Reveal The Missing Object
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>

      {/* WTF Explanation */}
      {revealed && (
        <div className="w-full max-w-2xl mt-6 p-6 rounded-3xl bg-white/[0.06] border border-white/20 backdrop-blur-2xl animate-fade-in text-left">
          <div className="flex items-center gap-2 text-apple-green font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>The Giant Golden Spire Vanished</span>
          </div>
          <h4 className="text-xl font-medium text-white mb-2">
            Why was a colossal building invisible to you?
          </h4>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Under ordinary circumstances, an object disappearing generates a sharp <strong className="text-white">motion transient</strong>—a flicker that automatically captures your peripheral attention. But the brief 90-millisecond gray blank mask flooded your entire visual field with a global transient, neutralizing your motion detectors.
          </p>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-white/70 leading-relaxed">
            <span className="font-semibold text-white block mb-1">The Grand Illusion of Vision:</span>
            Without motion signals, your brain is forced to check objects one by one using working memory, which can only hold roughly 4 items at a time. This proves you do not see everything in front of you—you only see the tiny fraction you consciously attend to.
          </div>
        </div>
      )}
    </div>
  );
};
