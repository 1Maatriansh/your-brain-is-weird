import React from 'react';
import { X, Sparkles, Compass, BookOpen, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { BrainConcept } from '../../types/brain';
import { sound } from '../../utils/audio';

interface ConceptModalProps {
  concept: BrainConcept | null;
  onClose: () => void;
  onSelectConcept: (id: string) => void;
  onLaunchExperiment?: (expId: string) => void;
}

export const ConceptDetailModal: React.FC<ConceptModalProps> = ({
  concept,
  onClose,
  onSelectConcept,
  onLaunchExperiment,
}) => {
  if (!concept) return null;

  const handleRabbitHoleClick = (targetId: string) => {
    sound.playHapticClick(1200);
    onSelectConcept(targetId);
  };

  const getBadgeStyle = (level: BrainConcept['evidenceLevel']) => {
    switch (level) {
      case 'established':
        return 'bg-apple-green/15 text-apple-green border-apple-green/30';
      case 'plausible':
        return 'bg-apple-blue/15 text-apple-blue border-apple-blue/30';
      case 'debated':
        return 'bg-apple-orange/15 text-apple-orange border-apple-orange/30';
      case 'myth_buster':
        return 'bg-apple-red/15 text-apple-red border-apple-red/30';
    }
  };

  const getBadgeLabel = (level: BrainConcept['evidenceLevel']) => {
    switch (level) {
      case 'established':
        return 'ESTABLISHED SCIENCE';
      case 'plausible':
        return 'PLAUSIBLE RESEARCH';
      case 'debated':
        return 'ACTIVELY DEBATED';
      case 'myth_buster':
        return 'POPULAR MYTH DEBUNKED';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in select-none"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950/95 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-3xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Region & Evidence Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/15">
            REGION {concept.regionId.toUpperCase()}
          </span>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${getBadgeStyle(
              concept.evidenceLevel
            )} flex items-center gap-1 font-semibold`}
          >
            <ShieldCheck className="w-3 h-3" />
            {getBadgeLabel(concept.evidenceLevel)}
          </span>
        </div>

        {/* Title & Hook */}
        <h3 id="concept-modal-title" className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
          {concept.title}
        </h3>
        <p className="text-base sm:text-lg text-apple-orange font-medium mb-6 leading-snug">
          "{concept.hookQuestion}"
        </p>

        {/* WTF Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-apple-orange/30 mb-6 shadow-inner">
          <div className="flex items-center gap-2 text-apple-orange font-mono text-xs uppercase tracking-widest font-semibold mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>The WTF Moment</span>
          </div>
          <p className="text-sm text-white/90 leading-relaxed font-normal">
            {concept.wtfMoment}
          </p>
        </div>

        {/* Mechanism & Science */}
        <div className="space-y-4 mb-6 text-sm text-white/80 leading-relaxed">
          <div>
            <h4 className="font-semibold text-white mb-1">Core Neurological Mechanism:</h4>
            <p className="text-white/70">{concept.coreMechanism}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Deeper Science & Empirical Evidence:</h4>
            <p className="text-white/70">{concept.deeperScience}</p>
          </div>
        </div>

        {/* Interactive Experiment Link (If available) */}
        {concept.interactiveExperimentId && onLaunchExperiment && (
          <div className="mb-6 p-4 rounded-2xl bg-apple-blue/10 border border-apple-blue/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-apple-blue uppercase tracking-wider block font-semibold">
                Hands-On Experiment Available
              </span>
              <span className="text-sm text-white font-medium">
                Test your own brain with this interactive lab
              </span>
            </div>
            <button
              onClick={() => onLaunchExperiment(concept.interactiveExperimentId!)}
              className="px-4 py-2 rounded-full bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold text-xs transition-all active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Lab</span>
            </button>
          </div>
        )}

        {/* Rabbit Holes Links */}
        <div className="pt-4 border-t border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-apple-purple" />
            <span>Connected Rabbit Holes ({concept.rabbitHoles.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {concept.rabbitHoles.map((rabbitId) => (
              <button
                key={rabbitId}
                onClick={() => handleRabbitHoleClick(rabbitId)}
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs text-white/80 hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>{rabbitId.replace(/-/g, ' ')}</span>
                <ArrowRight className="w-3 h-3 text-white/40" />
              </button>
            ))}
          </div>
        </div>

        {/* Academic Source */}
        {concept.sources.length > 0 && (
          <div className="text-[11px] font-mono text-white/40 pt-2">
            <span className="font-semibold text-white/50 block mb-0.5">Primary Scientific Citation:</span>
            {concept.sources[0]}
          </div>
        )}
      </div>
    </div>
  );
};
