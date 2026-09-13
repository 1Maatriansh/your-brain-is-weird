import React from 'react';
import { X, Eye, Type, Activity, Keyboard, Check } from 'lucide-react';
import { AppleToggle } from '../lab/AppleToggle';
import { sound } from '../../utils/audio';

interface AccessibilityProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast: boolean;
  onToggleHighContrast: (val: boolean) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: (val: boolean) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const AccessibilityPanel: React.FC<AccessibilityProps> = ({
  isOpen,
  onClose,
  highContrast,
  onToggleHighContrast,
  reducedMotion,
  onToggleReducedMotion,
  fontSize,
  onChangeFontSize,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in select-none"
    >
      <div className="relative w-full max-w-xl bg-zinc-950/95 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-3xl text-left text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-apple-blue/20 border border-apple-blue/40 flex items-center justify-center text-apple-blue">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 id="accessibility-panel-title" className="text-lg font-semibold text-white">
                Accessibility & Contrast Controls
              </h3>
              <span className="text-[10px] font-mono text-white/50 uppercase">
                WCAG 2.1 LEVEL AA / AAA COMPLIANCE
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            aria-label="Close accessibility panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-5 mb-8">
          {/* High Contrast */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="text-sm font-medium text-white block">High Contrast Mode</span>
              <span className="text-xs text-white/50">
                Enhances surface borders to solid white and maximizes text luminance
              </span>
            </div>
            <AppleToggle
              checked={highContrast}
              onChange={onToggleHighContrast}
              size="md"
            />
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="text-sm font-medium text-white block">Reduced Motion Mode</span>
              <span className="text-xs text-white/50">
                Disables visual flickering, background canvas scrubbing, and spring physics
              </span>
            </div>
            <AppleToggle
              checked={reducedMotion}
              onChange={onToggleReducedMotion}
              size="md"
            />
          </div>

          {/* Text Size Controls */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Typography Scale</span>
              <span className="text-xs font-mono text-apple-orange uppercase">
                {fontSize === 'normal' ? '100% (Standard)' : fontSize === 'large' ? '115% (Large)' : '130% (X-Large)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    sound.playHapticClick();
                    onChangeFontSize(s);
                  }}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                    fontSize === s
                      ? 'bg-white text-black border-white font-semibold shadow-md'
                      : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  {s === 'normal' ? 'Standard' : s === 'large' ? 'Large' : 'Extra Large'}
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Navigation Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-white/70">
            <div className="flex items-center gap-1.5 font-semibold text-white mb-2">
              <Keyboard className="w-4 h-4 text-apple-green" />
              <span>Keyboard Navigation Shortcuts</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Tab</kbd> Jump focus forward</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Shift+Tab</kbd> Jump focus back</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Space / Enter</kbd> Activate toggle/button</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Esc</kbd> Dismiss modal</div>
            </div>
          </div>
        </div>

        {/* Dismiss CTA */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all active:scale-95 shadow-md"
        >
          Save & Apply Accessibility Settings
        </button>
      </div>
    </div>
  );
};
