export interface ExperimentMetadata {
  id: string;
  regionId: string;
  title: string;
  subtitle: string;
  hook: string;
  wtfMoment: string;
  neuroMechanism: string;
  instructions: string[];
  scientificRef: string;
  estimatedTimeMin: number;
}

export const experimentsList: ExperimentMetadata[] = [
  {
    id: 'blind-spot',
    regionId: 'perception',
    title: 'The Optic Disc Blind Spot',
    subtitle: 'Make a physical object vanish into thin air',
    hook: 'Close your left eye, stare at the cross, and watch a solid dot completely disappear.',
    wtfMoment: 'There is a literal hole in your retina where 1.2 million nerve fibers exit to form the optic nerve. You do not see a black hole—your visual cortex actively invents fake pixels to fill the void.',
    neuroMechanism: 'Optic disc photoreceptor absence + V1 cortical surface interpolation.',
    instructions: [
      'Cover your LEFT eye with your left hand.',
      'Stare directly at the crosshair (+) on the left with your RIGHT eye.',
      'Slowly move your head closer or farther from the screen (around 12-18 inches) or drag the distance calibration slider.',
      'Notice the exact moment the black dot on the right vanishes completely from your peripheral awareness!'
    ],
    scientificRef: 'Ramachandran, V. S. (1992). Blind spots. Scientific American, 266(5), 86-91.',
    estimatedTimeMin: 2
  },
  {
    id: 'change-blindness',
    regionId: 'perception',
    title: 'Change Blindness Flicker Test',
    subtitle: 'Spot the massive change hidden by a 100ms flicker',
    hook: 'A huge visual element changes right before your eyes, yet you cannot see it.',
    wtfMoment: 'When an image flickers with a 100ms gray mask (simulating an eye blink or saccade), your brain’s visual motion detectors are wiped clean, forcing you to scan the scene item by item.',
    neuroMechanism: 'Saccadic suppression + visual working memory capacity limit (4 items maximum).',
    instructions: [
      'Observe the flickering scene below.',
      'A massive architectural or foreground object is changing state between frame A and frame B.',
      'Click the screen the moment you spot the changing element.',
      'Notice how long your brain takes to spot an enormous change right in plain sight.'
    ],
    scientificRef: 'Rensink, R. A., O\'Regan, J. K., & Clark, J. J. (1997). To see or not to see: The need for attention to perceive changes in scenes. Psychological Science.',
    estimatedTimeMin: 2
  },
  {
    id: 'stroop-effect',
    regionId: 'attention',
    title: 'The Stroop Interference Reactor',
    subtitle: 'Measure your prefrontal cortex latency in milliseconds',
    hook: 'Can you name the color of the ink without reading the word itself?',
    wtfMoment: 'Reading is so deeply hardwired that your brain reads the printed word before it can classify the visual font color. Your anterior cingulate cortex must physically suppress the reading reflex.',
    neuroMechanism: 'Automated linguistic decoding vs controlled chromatic identification interference.',
    instructions: [
      'Look at the word that appears.',
      'Select the button corresponding to the INK COLOR, NOT what the word spells!',
      'Complete 8 trials as fast as humanly possible.',
      'Review your exact reaction time penalty between congruent trials (word matches color) and incongruent trials (word conflicts with color).'
    ],
    scientificRef: 'Stroop, J. R. (1935). Studies of interference in serial verbal reactions. Journal of Experimental Psychology.',
    estimatedTimeMin: 3
  },
  {
    id: 'false-memory',
    regionId: 'memory',
    title: 'The DRM False Memory Reconstructor',
    subtitle: 'Test your brain\'s tendency to fabricate memories',
    hook: 'Can your brain remember a word that was never shown?',
    wtfMoment: 'Your brain creates semantic associations so strongly that it creates an explicit, confident memory of seeing the "critical lure" word, even inventing sensory details.',
    neuroMechanism: 'Spreading activation in semantic hippocampal networks and fuzzy-trace gist encoding.',
    instructions: [
      'Carefully study the list of 12 words that will flash on screen.',
      'Once the study phase finishes, a memory test will present individual words.',
      'Indicate whether each word was on the original list or not.',
      'See if you fell into the classic psychological trap.'
    ],
    scientificRef: 'Roediger, H. L., & McDermott, K. B. (1995). Creating false memories: Remembering words not presented in lists. J. Exp. Psychol.',
    estimatedTimeMin: 3
  },
  {
    id: 'time-dilation',
    regionId: 'consciousness',
    title: 'Chronostasis & Time Dilation Estimator',
    subtitle: 'Experience subjective time dilation in real time',
    hook: 'Why does an unexpected stimulus appear to last 30% longer than it physically did?',
    wtfMoment: 'Time is not a steady clock inside your head. When a novel or high-frequency stimulus appears, your brain processes more information per millisecond, creating the illusion that subjective time has expanded.',
    neuroMechanism: 'Novelty-induced neural firing rate elevation and internal pacemaker-accumulator distortion.',
    instructions: [
      'You will observe two consecutive visual pulses.',
      'Pulse A will be a steady baseline; Pulse B will involve rapid perceptual changes.',
      'Estimate which pulse felt physically longer in duration.',
      'Discover whether your subjective sense of time matches objective physical reality.'
    ],
    scientificRef: 'Eagleman, D. M. (2008). Human time perception. Edge: The Third Culture.',
    estimatedTimeMin: 2
  },
  {
    id: 'monty-hall',
    regionId: 'consciousness',
    title: 'The Monty Hall Probability Trap',
    subtitle: 'The counterintuitive game show paradox',
    hook: 'Why does switching doors double your chance of winning, even though your gut swears it is 50/50?',
    wtfMoment: 'When the host reveals a goat, people believe both remaining doors have equal 50% odds. In reality, switching doors wins 66.7% of the time, because the host’s actions filter conditional probability.',
    neuroMechanism: 'Bayesian probability blindness and intuitive representativeness heuristics.',
    instructions: [
      'Choose one of the three closed doors.',
      'The host will reveal a goat behind one of the other doors.',
      'Decide whether to KEEP your initial door or SWITCH to the other unopened door.',
      'Run multiple rounds to verify the true mathematical law.'
    ],
    scientificRef: 'vos Savant, M. (1990). The Monty Hall Problem. Parade.',
    estimatedTimeMin: 3
  }
];
