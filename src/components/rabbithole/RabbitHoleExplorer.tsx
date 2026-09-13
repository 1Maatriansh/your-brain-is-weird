import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, Search, RotateCcw, Link2, BookOpen } from 'lucide-react';
import { BrainConcept } from '../../types/brain';
import { brainConcepts } from '../../data/brainConcepts';
import { sound } from '../../utils/audio';

interface RabbitHoleExplorerProps {
  onSelectConcept: (concept: BrainConcept) => void;
}

export const RabbitHoleExplorer: React.FC<RabbitHoleExplorerProps> = ({ onSelectConcept }) => {
  const [currentId, setCurrentId] = useState<string>('change-blindness');
  const [history, setHistory] = useState<string[]>(['change-blindness']);
  const [searchQuery, setSearchQuery] = useState('');

  const currentConcept = brainConcepts.find((c) => c.id === currentId) || brainConcepts[0];

  // Connected rabbit-hole concepts
  const connectedConcepts = currentConcept.rabbitHoles
    .map((id) => brainConcepts.find((c) => c.id === id))
    .filter((c): c is BrainConcept => c !== undefined);

  const navigateTo = (targetId: string) => {
    sound.playHapticClick(1100);
    setCurrentId(targetId);
    setHistory((prev) => [...prev, targetId]);
  };

  const resetPath = () => {
    sound.playHapticClick();
    setCurrentId('change-blindness');
    setHistory(['change-blindness']);
  };

  // Filtered concepts by search
  const filteredConcepts = searchQuery
    ? brainConcepts.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.hookQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.regionId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="w-full max-w-4xl bg-black/70 border border-white/15 rounded-3xl p-6 sm:p-10 flex flex-col shadow-2xl backdrop-blur-2xl relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-apple-purple font-mono text-xs uppercase tracking-widest font-semibold mb-1">
              <Compass className="w-4 h-4" />
              <span>Knowledge Network Navigator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              The Endless Rabbit Hole
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              Dived: {history.length} Hops
            </span>
            <button
              onClick={resetPath}
              className="p-2 rounded-full border border-white/15 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Reset Trail"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Trail Breadcrumb */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-mono text-white/50 scrollbar-none">
          <span className="text-white/30 uppercase">TRAIL:</span>
          {history.map((hId, idx) => {
            const c = brainConcepts.find((item) => item.id === hId);
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ArrowRight className="w-3 h-3 text-white/30 flex-shrink-0" />}
                <button
                  onClick={() => {
                    sound.playHapticClick();
                    setCurrentId(hId);
                  }}
                  className={`px-2 py-0.5 rounded-md transition-colors flex-shrink-0 ${
                    idx === history.length - 1
                      ? 'bg-white/15 text-white font-bold'
                      : 'hover:text-white/80'
                  }`}
                >
                  {c?.title || hId}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Node Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/20 mb-8 text-left relative">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-apple-purple font-semibold">
              ACTIVE NODE • REGION {currentConcept.regionId.toUpperCase()}
            </span>
            <button
              onClick={() => onSelectConcept(currentConcept)}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all flex items-center gap-1.5 border border-white/15"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Full Science</span>
            </button>
          </div>

          <h4 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
            {currentConcept.title}
          </h4>

          <p className="text-sm sm:text-base text-apple-orange font-medium mb-4">
            "{currentConcept.hookQuestion}"
          </p>

          <p className="text-sm text-white/80 leading-relaxed mb-4">
            {currentConcept.whyInteresting}
          </p>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white/70">
            <span className="text-white font-semibold block mb-0.5">WTF Highlight:</span>
            {currentConcept.wtfMoment}
          </div>
        </div>

        {/* Outgoing Connected Rabbit Holes */}
        <div className="text-left mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/60 uppercase tracking-wider mb-4">
            <Link2 className="w-3.5 h-3.5 text-apple-orange" />
            <span>Connected Rabbit Holes From This Concept</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {connectedConcepts.map((subConcept) => (
              <div
                key={subConcept.id}
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1">
                    <span>{subConcept.regionId.toUpperCase()}</span>
                    <span className="text-apple-orange font-semibold">{subConcept.evidenceLevel.toUpperCase()}</span>
                  </div>
                  <h5 className="text-base font-medium text-white mb-1 group-hover:text-white">
                    {subConcept.title}
                  </h5>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                    {subConcept.hookQuestion}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => navigateTo(subConcept.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Follow Rabbit Hole</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => onSelectConcept(subConcept)}
                    className="py-1.5 px-3 rounded-xl border border-white/15 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Search Bar */}
        <div className="w-full pt-6 border-t border-white/10 text-left">
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 120 cognitive concepts (e.g. 'gorilla', 'phantom', 'monty')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            />
          </div>

          {searchQuery && (
            <div className="max-h-52 overflow-y-auto space-y-1.5 rounded-2xl bg-black/50 p-2 border border-white/10">
              {filteredConcepts.length > 0 ? (
                filteredConcepts.map((fc) => (
                  <button
                    key={fc.id}
                    onClick={() => {
                      navigateTo(fc.id);
                      setSearchQuery('');
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-white/10 text-left flex items-center justify-between text-xs text-white/80 hover:text-white transition-colors"
                  >
                    <div>
                      <span className="font-medium text-white block">{fc.title}</span>
                      <span className="text-[10px] text-white/50">{fc.hookQuestion}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  </button>
                ))
              ) : (
                <div className="p-3 text-xs text-white/40 text-center font-mono">
                  No matching concepts found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
