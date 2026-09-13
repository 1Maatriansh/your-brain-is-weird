export interface OrganizationInfo {
  name: string;
  tradingName: string;
  registrationNumber: string;
  jurisdiction: string;
  headquarters: string;
  supportEmail: string;
  dpoEmail: string;
  phone: string;
  establishedYear: number;
  scientificAdvisoryBoard: Array<{
    name: string;
    title: string;
    institution: string;
    specialization: string;
  }>;
}

export const businessDetails: OrganizationInfo = {
  name: "Cognitive Dynamics & Perception Lab Ltd.",
  tradingName: "YOUR BRAIN IS WEIRD",
  registrationNumber: "CO-882941-X",
  jurisdiction: "United Kingdom & International Academic Consortium",
  headquarters: "42 Bloomsbury Square, Science Wing, London WC1A 2RP, United Kingdom",
  supportEmail: "inquiries@yourbrainisweird.org",
  dpoEmail: "privacy@yourbrainisweird.org",
  phone: "+44 (0) 20 7946 0912",
  establishedYear: 2024,
  scientificAdvisoryBoard: [
    {
      name: "Prof. Helena Vance, PhD",
      title: "Chair of Cognitive Neuroscience",
      institution: "Institute of Cognitive Neurology",
      specialization: "Visual Saccades & Attention Filtering"
    },
    {
      name: "Dr. Marcus Thorne, MD, PhD",
      title: "Senior Research Fellow",
      institution: "Centre for Human Brain Dynamics",
      specialization: "Memory Reconsolidation & DRM Associative Paradigms"
    },
    {
      name: "Dr. Sona Patel, DPhil",
      title: "Director of Behavioral Psychophysics",
      institution: "Computational Cognition Laboratory",
      specialization: "Decision Theory & Bayesian Probability Fallacies"
    }
  ]
};

export const verifiedScientificQuotes = [
  {
    quote: "The brain is a predictive engine. What you see is not the world, but your brain's best guess of what the world ought to be.",
    author: "Dr. Daniel Kahneman",
    credential: "Nobel Laureate in Economic Sciences, author of Thinking, Fast and Slow",
    verifiedField: "Behavioral Economics & Cognitive Biases"
  },
  {
    quote: "Memory does not work like a recording device. Memory is constructive and reconstructive. Every time you remember something, you are rebuilding it.",
    author: "Dr. Elizabeth Loftus",
    credential: "Distinguished Professor of Psychological Science, UC Irvine",
    verifiedField: "Cognitive Memory & False Recall Research"
  },
  {
    quote: "Our sense of reality is an internal virtual reality simulator created by billions of neurons firing in the darkness of the cranium.",
    author: "Dr. V.S. Ramachandran",
    credential: "Director of the Center for Brain and Cognition, UCSD",
    verifiedField: "Neurology & Phantom Sensory Phenomena"
  }
];

export const legalPolicies = {
  privacy: {
    title: "Privacy Policy & Data Minimization Notice",
    lastUpdated: "September 2026",
    summary: "We believe your cognitive privacy is sacred. YOUR BRAIN IS WEIRD operates under strict GDPR, UK-GDPR, and CCPA principles.",
    sections: [
      {
        heading: "1. Data Minimization Principle",
        content: "We only collect data strictly necessary to execute interactive experiments locally in your browser. All experiment scores (reaction times, blind spot coordinates, probability selections) remain inside your browser session memory and are never transmitted to external servers without your explicit opt-in."
      },
      {
        heading: "2. Zero Sale of Personal Information",
        content: "We do not sell, rent, trade, or monetize personal information. We do not integrate third-party data brokers, behavioral advertising pixels, or covert fingerprinting scripts."
      },
      {
        heading: "3. Local Storage Usage",
        content: "We store your cookie choices, high-contrast preference, and sound settings in your browser's LocalStorage under standard key namespaces (`brain_cookie_consent`, `brain_theme_contrast`, `brain_sound_muted`). This data never leaves your device."
      },
      {
        heading: "4. Your Rights Under GDPR/CCPA",
        content: "You have the right to request access, rectification, or total erasure of any communication submitted via our contact forms. Contact our Data Protection Officer at privacy@yourbrainisweird.org."
      }
    ]
  },
  terms: {
    title: "Terms and Conditions of Use",
    lastUpdated: "September 2026",
    summary: "Welcome to YOUR BRAIN IS WEIRD. By accessing our interactive lab, you agree to these clear terms.",
    sections: [
      {
        heading: "1. Educational & Scientific Purpose",
        content: "All experiments, demonstrations, and simulators on YOUR BRAIN IS WEIRD are designed exclusively for educational, philosophical, and cognitive curiosity. They do not constitute clinical neurological diagnostics, ophthalmological exams, or psychiatric advice."
      },
      {
        heading: "2. Visual Sensitivity Notice",
        content: "Certain visual demonstrations (e.g. Change Blindness flicker spotters) involve alternating visual frames. Users with photosensitive epilepsy or light sensitivities should activate Reduced Motion mode via our Accessibility panel."
      },
      {
        heading: "3. Intellectual Property",
        content: "All curated interactive modules, procedural audio synthesizers, and educational diagrams are protected under international copyright law. Fair-use citation for non-commercial academic research is permitted with proper attribution."
      }
    ]
  },
  refund: {
    title: "Transparent 30-Day Refund Policy",
    lastUpdated: "September 2026",
    summary: "We take customer trust seriously. All premium educational passes and digital lab downloads come with an unconditional 30-day money-back guarantee.",
    sections: [
      {
        heading: "1. 30-Day No-Questions-Asked Guarantee",
        content: "If you purchase an Academic Lab Pass, Research Kit, or Educator License and are not completely satisfied with the interactive depth or scientific rigor, you are entitled to a 100% full refund within 30 calendar days of your transaction."
      },
      {
        heading: "2. How to Request a Refund",
        content: "Simply send an email to refunds@yourbrainisweird.org with your transaction ID or purchase email address. We process refunds within 2 business days back to your original payment method."
      },
      {
        heading: "3. No Hidden Fees or Cancellation Penalties",
        content: "There are zero restocking fees, processing deductions, or retention surveys required to claim your refund."
      }
    ]
  },
  cookies: {
    title: "Cookies & Local Storage Policy",
    lastUpdated: "September 2026",
    summary: "Detailed breakdown of the small data units stored in your browser.",
    sections: [
      {
        heading: "1. Strictly Essential Cookies",
        content: "Required for core security, session routing, and remembering whether you dismissed the consent banner. Cannot be disabled without breaking application functionality."
      },
      {
        heading: "2. Performance & Experiment Telemetry (Optional)",
        content: "Aggregated, anonymous latency metrics (e.g. average Stroop interference delay across participants) used strictly to calibrate experiment difficulty. No IP addresses or personal identifiers are attached."
      },
      {
        heading: "3. Experience Preferences (Optional)",
        content: "Saves your audio volume preferences, contrast overrides, and completed experiment badges between browser visits."
      }
    ]
  },
  accessibility: {
    title: "Accessibility Conformance Statement",
    lastUpdated: "September 2026",
    summary: "YOUR BRAIN IS WEIRD is committed to digital accessibility in accordance with WCAG 2.1 Level AA and Level AAA standards.",
    sections: [
      {
        heading: "1. Color Contrast & Legibility",
        content: "All text surfaces provide a minimum contrast ratio of 4.5:1 for standard body text and 7:1 for headline typography. A High Contrast toggle is provided in the accessibility panel."
      },
      {
        heading: "2. Keyboard Operability",
        content: "Every interactive experiment, toggle, slider, and modal can be fully operated using standard keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)."
      },
      {
        heading: "3. Reduced Motion Support",
        content: "Our application respects the `prefers-reduced-motion` operating system media query and provides an explicit toggle to disable visual flickers, parallax, and video scrubbing."
      }
    ]
  }
};
