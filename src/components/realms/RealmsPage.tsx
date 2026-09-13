import React, { useState } from 'react';
import { Search, Brain, ShieldCheck, Filter, ArrowRight, Play, Eye } from 'lucide-react';
import { brainRegions, brainConcepts } from '../../data/brainConcepts';
import { BrainConcept, RegionId, EvidenceLevel } from '../../types/brain';
import { RegionCard } from '../lab/RegionCard';
import { sound } from '../../utils/audio';

interface RealmsPageProps {
  onSelectConcept: (concept: BrainConcept) => void;
  onLaunchExperiment: (expId: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility') => void;
}

export const RealmsPage: React.FC<RealmsPageProps> = ({
  onSelectConcept,
  onLaunchExperiment,
  onOpenLegal,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId | 'all'>('all');
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConcepts = brainConcepts.filter((c) => {
    const matchesRegion = selectedRegionId === 'all' || c.regionId === selectedRegionId;
    const matchesEvidence = evidenceFilter === 'all' || c.evidenceLevel === evidenceFilter;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hookQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.whyInteresting.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesEvidence && matchesSearch;
  });

  return (
    <div className="relative z-10 w-full min-h-screen text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center select-none">
      {/* Header */}
      <div className="text-center max-w-3xl mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-apple-purple mb-4 backdrop-blur-xl">
          <Brain className="w-4 h-4" />
          <span>THE COMPREHENSIVE KNOWLEDGE ARCHIVE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white mb-4">
          The 6 Cognitive Realms.
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-normal">
          120 verified cognitive phenomena, sensory illusions, and neural blind spots. Each concept represents a documented departure from naive realism.
        </p>
      </div>

      {/* Spacious Controls / Filter Bar */}
      <div className="w-full mb-10 p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across 120 phenomena..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
          <button
            onClick={() => {
              sound.playHapticClick();
              setSelectedRegionId('all');
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
              selectedRegionId === 'all'
                ? 'bg-white text-black border-white font-semibold shadow-md'
                : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            All (120)
          </button>
          {brainRegions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                sound.playHapticClick();
                setSelectedRegionId(reg.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
                selectedRegionId === reg.id
                  ? 'bg-white text-black border-white font-semibold shadow-md'
                  : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Evidence Level Filter */}
      <div className="w-full flex items-center justify-between mb-8 px-2 text-xs font-mono text-white/60">
        <span>SHOWING {filteredConcepts.length} OF 120 PHENOMENA</span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">EVIDENCE LEVEL:</span>
          {(['all', 'established', 'plausible', 'debated', 'myth_buster'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                sound.playHapticClick();
                setEvidenceFilter(lvl);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-mono transition-all ${
                evidenceFilter === lvl
                  ? 'bg-white/20 text-white font-bold'
                  : 'hover:text-white/80'
              }`}
            >
              {lvl.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Region Showcase Stack */}
      <div className="w-full space-y-12">
        {brainRegions
          .filter((r) => selectedRegionId === 'all' || r.id === selectedRegionId)
          .map((reg) => {
            const regConcepts = filteredConcepts.filter((c) => c.regionId === reg.id);
            if (regConcepts.length === 0) return null;

            return (
              <RegionCard
                key={reg.id}
                region={reg}
                concepts={regConcepts}
                onSelectConcept={onSelectConcept}
                onLaunchExperiment={onLaunchExperiment}
              />
            );
          })}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-apple-green" />
          <span>Peer-Reviewed Academic Framework • Strictly Non-Sensationalist</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">
            Terms & Conditions
          </button>
          <button onClick={() => onOpenLegal('refund')} className="hover:text-white transition-colors">
            Refund Policy
          </button>
          <button onClick={() => onOpenLegal('business')} className="hover:text-white transition-colors">
            Advisory Council
          </button>
        </div>
      </footer>
    </div>
  );
};
