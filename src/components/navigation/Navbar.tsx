import React from 'react';
import { Brain, Volume2, VolumeX, Eye, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { AppleButton } from '../ui/AppleButton';
import { sound } from '../../utils/audio';

export type PageView = 'overview' | 'experience' | 'realms' | 'experiments' | 'internet' | 'architect';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onShowMeBrain: () => void;
  onOpenAccessibility: () => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
  completedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onShowMeBrain,
  onOpenAccessibility,
  onOpenLegal,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());

  const handleToggleAudio = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const navItems: Array<{ id: PageView; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'What Brain Does' },
    { id: 'realms', label: 'The 6 Realms (120)' },
    { id: 'experiments', label: 'Lab Tests (6)' },
    { id: 'internet', label: 'Brain vs Internet' },
    { id: 'architect', label: 'Brain Sandbox' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-black/85 backdrop-blur-2xl select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            sound.playHapticClick();
            onNavigate('overview');
          }}
          className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl"
        >
          <div className="w-9 h-9 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center group-hover:border-white/40 transition-colors shadow-inner">
            <Brain className="w-5 h-5 text-white stroke-[1.75]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-1.5">
              YOUR BRAIN IS WEIRD
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">
              Cognitive Lab
            </span>
          </div>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playHapticClick();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleAudio}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white transition-colors"
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-apple-red" /> : <Volume2 className="w-4 h-4 text-apple-green" />}
          </button>

          {/* Accessibility Settings */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white transition-colors"
            title="Accessibility & High Contrast"
            aria-label="Accessibility settings"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Legal / Ethics */}
          <button
            onClick={() => onOpenLegal('business')}
            className="hidden sm:flex p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white transition-colors"
            title="Ethics & Governance"
            aria-label="Ethics and Governance"
          >
            <ShieldCheck className="w-4 h-4 text-apple-blue" />
          </button>

          {/* THE PROMINENT HERO CTA */}
          <AppleButton
            variant="glow"
            size="sm"
            onClick={onShowMeBrain}
            icon={<Sparkles className="w-3.5 h-3.5 text-apple-orange" />}
          >
            Show me what my brain does
          </AppleButton>
        </div>
      </div>

      {/* Mobile Horizontal Subnav */}
      <div className="lg:hidden flex items-center justify-start gap-1 overflow-x-auto px-4 py-2 border-t border-white/[0.06] bg-black/95 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playHapticClick();
              onNavigate(item.id);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              currentPage === item.id
                ? 'bg-white text-black font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
