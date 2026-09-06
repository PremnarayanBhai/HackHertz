export interface DomainUnlockConfig {
  id: string;
  code: string;
  name: string;
  primaryPasskey: string;
  aliases: string[];
  color: string;
  bgGlow: string;
  celebrityTitle: string;
  celebrityQuote: string;
  iconName: 'BrainCircuit' | 'ShieldAlert' | 'ShieldCheck' | 'AlertTriangle' | 'GraduationCap' | 'Gamepad2' | 'Sparkles';
  tagline: string;
  description: string;
}

export const DOMAIN_UNLOCK_CONFIGS: DomainUnlockConfig[] = [
  {
    id: 'ai-ml',
    code: 'AIML',
    name: 'AI / ML',
    primaryPasskey: 'AIML-2026',
    aliases: [
      'HH26-AIML-LIVE',
      'HH26-AIML',
      'AIML',
      'AI-ML',
      'AI-2026',
      'AIML2026',
      'AI2026',
      'HH26-AI'
    ],
    color: '#facc15',
    bgGlow: 'rgba(250, 204, 21, 0.25)',
    celebrityTitle: 'HONORED NEURAL ARCHITECT & AI PIONEER',
    celebrityQuote: 'The algorithms bow to your vision. Step into the arena and unleash neural intelligence upon the world.',
    iconName: 'BrainCircuit',
    tagline: 'Generative Models, Low-Latency Edge Vision & Autonomous Agents',
    description: 'Solve critical real-world challenges through deep learning, neural computer vision, multimodal LLM systems, and edge inference engines.'
  },
  {
    id: 'cybersecurity',
    code: 'CYBER',
    name: 'Cybersecurity',
    primaryPasskey: 'CYBER-2026',
    aliases: [
      'HH26-CYBER-LIVE',
      'HH26-CYBER',
      'CYBER',
      'CYBERSECURITY',
      'CYBER-SECURITY',
      'CYBER2026',
      'SEC-2026',
      'HH26-SEC'
    ],
    color: '#ef4444',
    bgGlow: 'rgba(239, 68, 68, 0.25)',
    celebrityTitle: 'CYBERSECURITY CITADEL COMMANDER',
    celebrityQuote: 'Defenders of the digital realm, your clearance is authenticated. Fortify the grid against zero-day adversaries.',
    iconName: 'ShieldAlert',
    tagline: 'Zero-Trust Grids, Cryptographic Ledgers & Threat Neutralization',
    description: 'Architect ironclad zero-trust architectures, automated remediation agents, vulnerability scanners, and verifiable cryptographic ledgers.'
  },
  {
    id: 'defense',
    code: 'DEF',
    name: 'Defense',
    primaryPasskey: 'DEFENSE-2026',
    aliases: [
      'HH26-DEFENSE-LIVE',
      'HH26-DEFENSE',
      'DEFENSE',
      'DEFENCE',
      'DEF-2026',
      'DEFENSE2026',
      'DEFENCE2026',
      'HH26-DEF',
      'HH26-DEFENCE'
    ],
    color: '#e879f9',
    bgGlow: 'rgba(232, 121, 249, 0.25)',
    celebrityTitle: 'TACTICAL DEFENSE SYSTEMS DIRECTOR',
    celebrityQuote: 'Command-level authorization confirmed. Lead tactical intelligence and mission-critical engineering from the front line.',
    iconName: 'ShieldCheck',
    tagline: 'Tactical Reconnaissance, Telemetry Systems & Base Readiness',
    description: 'Develop mission-critical logistics tracking, secure personnel emergency telemetry, and tactical situational awareness systems for armed personnel.'
  },
  {
    id: 'crisis-tech',
    code: 'CRISIS',
    name: 'Crisis Tech & Emergency Response',
    primaryPasskey: 'CRISIS-2026',
    aliases: [
      'HH26-CRISIS-LIVE',
      'HH26-CRISIS',
      'CRISIS',
      'CRISIS-TECH',
      'CRISIS2026',
      'EMERGENCY-2026',
      'HH26-EMERGENCY',
      'CRISIS-2026'
    ],
    color: '#f97316',
    bgGlow: 'rgba(249, 115, 22, 0.25)',
    celebrityTitle: 'FIRST RESPONDER CHIEF TECHNOLOGIST',
    celebrityQuote: 'When disaster strikes, code saves lives. You have the stage to engineer resilient, offline survival networks.',
    iconName: 'AlertTriangle',
    tagline: 'Disaster Mitigation, Offline Mesh Networks & Rapid Resource Dispatch',
    description: 'Engineer peer-to-peer offline emergency mesh protocols, automated triage telemetry, survivor localization beacons, and humanitarian dispatch systems.'
  },
  {
    id: 'edtech',
    code: 'EDT',
    name: 'EdTech & Smart Learning',
    primaryPasskey: 'EDTECH-2026',
    aliases: [
      'HH26-EDTECH-LIVE',
      'HH26-EDTECH',
      'EDTECH',
      'EDTECH2026',
      'SMART-LEARNING',
      'EDU-2026',
      'HH26-EDU',
      'EDT-2026'
    ],
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.25)',
    celebrityTitle: 'NEXT-GEN LEARNING VISIONARY',
    celebrityQuote: 'Empowering curious minds through interactive technology. Unlock the future of intelligent, gamified education.',
    iconName: 'GraduationCap',
    tagline: 'Adaptive AI Mentors, Algorithmic Visualizers & Collaborative Arenas',
    description: 'Revolutionize pedagogy with conversational AI tutors, visual algorithmic sandboxes, gamified assessment hubs, and accessible learning tools.'
  },
  {
    id: 'open-innovation',
    code: 'OPEN',
    name: 'Open Innovation',
    primaryPasskey: 'OPEN-2026',
    aliases: [
      'HH26-OPEN-LIVE',
      'HH26-OPEN',
      'OPEN',
      'OPEN-INNOVATION',
      'OPEN2026',
      'INNOVATE-2026',
      'HH26-INNOVATION',
      'FREESTYLE-2026'
    ],
    color: '#22d3ee',
    bgGlow: 'rgba(34, 211, 238, 0.25)',
    celebrityTitle: 'OPEN UNIVERSE CREATIVE VISIONARY',
    celebrityQuote: 'No boundaries, no predefined constraints. You hold 100% creative autonomy to invent the impossible.',
    iconName: 'Gamepad2',
    tagline: 'Bring Your Own Idea — Complete Creative Freedom Across Any Stack',
    description: 'Identify any unmet industry challenge or real-world problem and architect an original, working prototype from scratch with 100% technical autonomy.'
  }
];

/**
 * Normalizes input string and checks if it matches any domain unlock passkey or alias.
 */
export function findDomainUnlockConfig(rawInput: string): DomainUnlockConfig | null {
  if (!rawInput) return null;
  const cleaned = rawInput.trim().toUpperCase().replace(/[\s_]+/g, '-');

  for (const config of DOMAIN_UNLOCK_CONFIGS) {
    if (config.primaryPasskey === cleaned) {
      return config;
    }
    if (config.aliases.some((alias) => alias === cleaned)) {
      return config;
    }
  }

  // Also check without hyphens for user convenience (e.g. "AIML2026")
  const stripped = cleaned.replace(/-/g, '');
  for (const config of DOMAIN_UNLOCK_CONFIGS) {
    if (config.primaryPasskey.replace(/-/g, '') === stripped) {
      return config;
    }
    if (config.aliases.some((alias) => alias.replace(/-/g, '') === stripped)) {
      return config;
    }
  }

  return null;
}
