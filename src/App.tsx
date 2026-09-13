import React, { useState } from 'react';
import { Navbar, PageView } from './components/navigation/Navbar';
import { LandingHero } from './components/landing/LandingHero';
import { BrainExperiencePage } from './components/experience/BrainExperiencePage';
import { RealmsPage } from './components/realms/RealmsPage';
import { BrainLab } from './components/lab/BrainLab';
import { BrainVsInternet } from './components/centerpieces/BrainVsInternet';
import { BuildYourOwnBrain } from './components/centerpieces/BuildYourOwnBrain';
import { ConceptDetailModal } from './components/rabbithole/ConceptDetailModal';
import { LegalModal } from './components/compliance/LegalModal';
import { AccessibilityPanel } from './components/compliance/AccessibilityPanel';
import { CookieBanner } from './components/compliance/CookieBanner';
import { BrainConcept, LegalTabId } from './types/brain';
import { brainConcepts } from './data/brainConcepts';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('overview');
  const [selectedConcept, setSelectedConcept] = useState<BrainConcept | null>(null);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabId | null>(null);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  // Accessibility Settings
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Track completed experiments
  const [completedExperiments, setCompletedExperiments] = useState<Set<string>>(new Set());

  const handleMarkExperimentComplete = (id: string) => {
    setCompletedExperiments((prev) => new Set([...prev, id]));
  };

  const handleNavigate = (page: PageView) => {
    sound.playHapticClick();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowMeBrain = () => {
    sound.playRevealChime();
    setCurrentPage('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectConceptById = (id: string) => {
    const c = brainConcepts.find((item) => item.id === id);
    if (c) {
      setSelectedConcept(c);
    }
  };

  const handleLaunchExperimentFromModal = () => {
    setSelectedConcept(null);
    setCurrentPage('experiments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fontSizeClass =
    fontSize === 'large' ? 'text-[115%]' : fontSize === 'xlarge' ? 'text-[130%]' : '';

  return (
    <div
      className={`min-h-screen bg-black text-[#f5f5f7] ${
        highContrast ? 'contrast-125' : ''
      } ${fontSizeClass}`}
    >
      {/* Apple-Style Fixed Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onShowMeBrain={handleShowMeBrain}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
        completedCount={completedExperiments.size}
      />

      {/* Main Distinct Page Views (Completely Opaque & Spacious) */}
      <main className="relative z-10">
        {currentPage === 'overview' && (
          <LandingHero
            onShowMeBrain={handleShowMeBrain}
            onExploreConcepts={() => handleNavigate('realms')}
            onExploreInternet={() => handleNavigate('internet')}
            onOpenLegal={(tab) => setLegalModalTab(tab)}
          />
        )}

        {currentPage === 'experience' && (
          <BrainExperiencePage
            onBackToHome={() => handleNavigate('overview')}
            onExploreConcepts={() => handleNavigate('realms')}
            onOpenSandbox={() => handleNavigate('architect')}
          />
        )}

        {currentPage === 'realms' && (
          <RealmsPage
            onSelectConcept={setSelectedConcept}
            onLaunchExperiment={handleLaunchExperimentFromModal}
            onOpenLegal={(tab) => setLegalModalTab(tab)}
          />
        )}

        {currentPage === 'experiments' && (
          <BrainLab
            completedExperiments={completedExperiments}
            onMarkExperimentComplete={handleMarkExperimentComplete}
            onOpenLegal={(tab) => setLegalModalTab(tab)}
          />
        )}

        {currentPage === 'internet' && (
          <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center">
            <BrainVsInternet />
          </div>
        )}

        {currentPage === 'architect' && (
          <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center">
            <BuildYourOwnBrain />
          </div>
        )}
      </main>

      {/* Concept Deep Dive Modal */}
      <ConceptDetailModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
        onSelectConcept={handleSelectConceptById}
        onLaunchExperiment={handleLaunchExperimentFromModal}
      />

      {/* Compliance & Trust Modal */}
      <LegalModal
        isOpen={legalModalTab !== null}
        initialTab={legalModalTab || 'privacy'}
        onClose={() => setLegalModalTab(null)}
      />

      {/* Accessibility & High Contrast Panel */}
      <AccessibilityPanel
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        highContrast={highContrast}
        onToggleHighContrast={setHighContrast}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={setReducedMotion}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      {/* Granular Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
};
