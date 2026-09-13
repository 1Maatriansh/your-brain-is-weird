import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings2, Check, X } from 'lucide-react';
import { AppleToggle } from '../lab/AppleToggle';
import { CookieSettings } from '../../types/brain';
import { sound } from '../../utils/audio';

const STORAGE_KEY = 'brain_cookie_consent';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytical: false,
    experience: true,
    consentGiven: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setShowBanner(true);
      } else {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveSettings = (newSettings: CookieSettings) => {
    sound.playHapticClick();
    const updated = { ...newSettings, consentGiven: true, timestamp: new Date().toISOString() };
    setSettings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveSettings({
      essential: true,
      analytical: true,
      experience: true,
      consentGiven: true,
    });
  };

  const handleEssentialOnly = () => {
    saveSettings({
      essential: true,
      analytical: false,
      experience: false,
      consentGiven: true,
    });
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slide-up select-none"
    >
      <div className="p-5 rounded-3xl bg-zinc-950/95 border border-white/20 shadow-3xl backdrop-blur-2xl text-left text-white">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-apple-green" />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold text-white/90">
            Privacy & Cookie Preferences
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-white/70 leading-relaxed mb-4">
          We practice <strong className="text-white">strict data minimization</strong>. We do not sell your personal data or track you across the web. All cognitive experiment data runs locally in your browser.
        </p>

        {/* Granular Preferences (If opened) */}
        {showPreferences && (
          <div className="space-y-3 py-3 my-3 border-y border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Strictly Essential</span>
                <span className="text-[11px] text-white/50">Core session security & state navigation</span>
              </div>
              <span className="font-mono text-[10px] text-apple-green bg-apple-green/10 px-2 py-0.5 rounded-full">
                ALWAYS ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Anonymous Analytics</span>
                <span className="text-[11px] text-white/50">Aggregated experiment difficulty calibration</span>
              </div>
              <AppleToggle
                checked={settings.analytical}
                onChange={(val) => setSettings({ ...settings, analytical: val })}
                size="sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Experience Preferences</span>
                <span className="text-[11px] text-white/50">Saves your audio volume and contrast settings</span>
              </div>
              <AppleToggle
                checked={settings.experience}
                onChange={(val) => setSettings({ ...settings, experience: val })}
                size="sm"
              />
            </div>
          </div>
        )}

        {/* Button Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {!showPreferences ? (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all active:scale-95 shadow-md text-center"
              >
                Accept All
              </button>
              <button
                onClick={handleEssentialOnly}
                className="py-2 px-3 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="p-2 rounded-full border border-white/15 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                title="Customize Settings"
                aria-label="Customize Settings"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => saveSettings(settings)}
                className="flex-1 py-2 px-3 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all active:scale-95 shadow-md"
              >
                Save My Preferences
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="py-2 px-3 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-medium transition-all"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
