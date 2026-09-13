export type EvidenceLevel = 'established' | 'plausible' | 'debated' | 'myth_buster';

export type RegionId = 'perception' | 'memory' | 'social' | 'attention' | 'body' | 'consciousness';

export interface BrainRegion {
  id: RegionId;
  index: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  iconName: string;
  conceptCount: number;
}

export interface BrainConcept {
  id: string;
  regionId: RegionId;
  title: string;
  hookQuestion: string;
  whyInteresting: string;
  wtfMoment: string;
  coreMechanism: string;
  deeperScience: string;
  rabbitHoles: string[];
  evidenceLevel: EvidenceLevel;
  sources: string[];
  interactiveExperimentId?: string;
  priority: 'primary' | 'secondary' | 'rabbit_hole';
}

export interface BrainSimulationState {
  novelty: number;        // 0-100
  attention: number;      // 0-100
  uncertainty: number;    // 0-100
  socialPressure: number; // 0-100
  reward: number;         // 0-100
  memoryNoise: number;    // 0-100
  predictionWeight: number; // 0-100
}

export interface SimulationScenario {
  id: string;
  title: string;
  prompt: string;
  initialState: BrainSimulationState;
  evaluate: (state: BrainSimulationState) => {
    behavior: string;
    dominantNeurochemical: string;
    cognitiveDistortion: string;
    attentionDriftSec: number;
    wtfExplanation: string;
  };
}

export interface CookieSettings {
  essential: boolean;
  analytical: boolean;
  experience: boolean;
  consentGiven: boolean;
  timestamp?: string;
}

export type LegalTabId = 'privacy' | 'terms' | 'refund' | 'cookies' | 'business' | 'accessibility';
