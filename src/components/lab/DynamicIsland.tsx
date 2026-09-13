import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, Sparkles, Sliders, Compass, Film, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface DynamicIslandProps {
  currentView: 'intro' | 'lab';
  onSwitchView: (view: 'intro' | 'lab') => void;
  completedCount: number;
  totalExperiments: number;
  onOpenAccessibility: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  currentView,
  onSwitchView,
  completedCount,
  totalExperiments,
  onOpenAccessibility,
  onOpenLegal,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAudio = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <aside aria-label="Dynamic telemetry control capsule" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 select-none">
      <div
        className={`flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/15 bg-black/75 backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
          isExpanded ? 'ring-2 ring-white/20' : ''
        }`}
      >
        {/* Cinema vs Lab switcher */}
        <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
          <button
            onClick={() => onSwitchView('intro')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              currentView === 'intro'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
            title="Cinematic Intro Page"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cinema</span>
          </button>
          <button
            onClick={() => onSwitchView('lab')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              currentView === 'lab'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
            title="Interactive Brain Lab"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Brain Lab</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-4 bg-white/15" />

        {/* Experiments Progress Pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-apple-orange" />
          <span>
            {completedCount}/{totalExperiments} Labs
          </span>
        </div>

        {/* Audio Mute/Unmute */}
        <button
          onClick={toggleAudio}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          title={isMuted ? 'Unmute procedural sound' : 'Mute sound'}
          aria-label={isMuted ? 'Unmute procedural sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-apple-red" /> : <Volume2 className="w-4 h-4 text-apple-green" />}
        </button>

        {/* Accessibility Panel Quick Button */}
        <button
          onClick={onOpenAccessibility}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          title="Accessibility & Contrast"
          aria-label="Accessibility settings"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Legal & Trust Icon */}
        <button
          onClick={() => onOpenLegal('business')}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          title="Trust & Compliance Center"
          aria-label="Trust & Compliance Center"
        >
          <ShieldCheck className="w-4 h-4 text-apple-blue" />
        </button>
      </div>
    </aside>
  );
};
