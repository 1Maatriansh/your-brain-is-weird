import React from 'react';
import { Eye, Film, Users, Smartphone, Activity, Sparkles, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { BrainConcept, BrainRegion } from '../../types/brain';
import { sound } from '../../utils/audio';

interface RegionCardProps {
  region: BrainRegion;
  concepts: BrainConcept[];
  onSelectConcept: (concept: BrainConcept) => void;
  onLaunchExperiment: (expId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Eye: <Eye className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export const RegionCard: React.FC<RegionCardProps> = ({
  region,
  concepts,
  onSelectConcept,
  onLaunchExperiment,
}) => {
  return (
    <div className="w-full rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-left transition-all hover:border-white/20">
      {/* Region Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border"
            style={{
              backgroundColor: `${region.accentColor}20`,
              borderColor: `${region.accentColor}40`,
            }}
          >
            {ICON_MAP[region.iconName] || <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                REGION {region.index}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {region.conceptCount} Phenomena
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              {region.name}
            </h3>
          </div>
        </div>

        <p className="text-sm font-medium italic text-white/70 sm:text-right max-w-xs">
          "{region.tagline}"
        </p>
      </div>

      <p className="text-sm text-white/70 leading-relaxed mb-6">
        {region.description}
      </p>

      {/* Grid of Concept Cards in this Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {concepts.map((c) => (
          <div
            key={c.id}
            className="group p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Evidence Tag & Action Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 border border-white/10 px-2 py-0.5 rounded-md">
                  {c.evidenceLevel.toUpperCase()}
                </span>
                {c.interactiveExperimentId && (
                  <span className="text-[9px] font-mono text-apple-blue font-bold px-2 py-0.5 rounded-full bg-apple-blue/15 border border-apple-blue/30 flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    LAB READY
                  </span>
                )}
              </div>

              {/* Title & Hook */}
              <h4 className="text-base sm:text-lg font-medium text-white mb-1.5 group-hover:text-white transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-apple-orange font-medium mb-3 line-clamp-2">
                "{c.hookQuestion}"
              </p>

              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                {c.whyInteresting}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => {
                  sound.playHapticClick();
                  onSelectConcept(c);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>Examine Concept</span>
                <ArrowRight className="w-3 h-3 text-white/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {c.interactiveExperimentId && (
                <button
                  onClick={() => {
                    sound.playHapticClick();
                    onLaunchExperiment(c.interactiveExperimentId!);
                  }}
                  className="py-2 px-3 rounded-xl bg-apple-blue/20 hover:bg-apple-blue/30 border border-apple-blue/40 text-xs font-semibold text-apple-blue transition-all active:scale-95"
                  title="Run interactive lab"
                >
                  Test
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
