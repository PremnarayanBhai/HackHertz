import {
  HackathonInfo,
  TimelineEvent,
  Domain,
  ProblemStatement,
  Prize,
  Sponsor,
  Patron,
  Judge,
  Mentor,
  FAQ,
  Organizer
} from '../types';

import dharmeshSirImg from '../assets/images/regenerated_image_1786853408154.jpg';
import darshanPatelImg from '../assets/images/regenerated_image_1786853410158.jpg';
import rameshPrajapatiImg from '../assets/images/regenerated_image_1786853411053.jpg';

export const hackathonInfo: HackathonInfo = {
  name: "HACKHERTZ 2.0",
  tagline: "High Score Innovation • 30 Hours • Ultimate Arcade Hackathon",
  date: "September 8 - 9, 2026",
  startDate: "2026-09-08T11:00:00",
  endDate: "2026-09-09T17:00:00",
  registrationDeadline: "August 31, 2026",
  venue: "Shree Swaminarayan Institute of Technology, Bhat, Gandhinagar",
  collegeName: "Shree Swaminarayan Institute of Technology (SSIT)",
  city: "Bhat, Gandhinagar - 382428",
  mode: "Offline",
  teamSizeMin: 2,
  teamSizeMax: 4,
  registrationFee: "₹400 per team",
  totalPrizePool: "₹XXXX",
  registrationUrl: "https://forms.gle/jY7ijJnAAaY1DT7a8",
  registrationFormUrl: "https://forms.gle/jY7ijJnAAaY1DT7a8",
  contactEmail: "hackhertz2.0@gmail.com",
  contactPhone: "+91 7574898949",
  mapUrl: "https://maps.app.goo.gl/tKik8JfmTBg5fwu38",
  locationUrl: "https://maps.app.goo.gl/tKik8JfmTBg5fwu38",
  socialLinks: {
    discord: "https://discord.gg/hackhertz20",
    twitter: "https://x.com/hackhertz20",
    instagram: "https://instagram.com/hackhertz20",
    linkedin: "https://linkedin.com/company/hackhertz20",
    github: "https://github.com/hackhertz20"
  }
};

export const domains: Domain[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    shortDescription: "Zero-trust architectures, ethical hacking tools, cryptographic proofs, intrusion detection grids, and vulnerability scanners.",
    icon: "ShieldAlert",
    color: "#ef4444", // Red
    bgGlow: "rgba(239, 68, 68, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "Autonomous Code Guardian & Real-Time Zero-Day Remediation Agent",
      "Zero-Knowledge Intercollege Credential & Identity Verification Ledger"
    ]
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    shortDescription: "Generative AI, agentic LLM workflows, neural computer vision, low-latency edge inference, and predictive intelligence.",
    icon: "BrainCircuit",
    color: "#facc15", // Yellow
    bgGlow: "rgba(250, 204, 21, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "Multimodal Accessibility Audio Assistant for Visually Impaired Coders",
      "Edge Computer Vision Anomaly Detection for Industrial Hardware"
    ]
  },
  {
    id: "defense",
    name: "Defense",
    shortDescription: "Tactical defense systems, autonomous surveillance, secure military-grade communications, aerospace telemetry, and electronic warfare defense.",
    icon: "ShieldAlert",
    color: "#e879f9", // Fuchsia / Purple
    bgGlow: "rgba(232, 121, 249, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "Tactical Battlefield Swarm Reconnaissance & EW Signal Jamming Simulator",
      "Autonomous Perimeter Surveillance & Threat Interception Telemetry System"
    ]
  },
  {
    id: "crisis-tech",
    name: "Crisis Tech & Emergency Response",
    shortDescription: "Disaster mitigation, offline P2P mesh communication, emergency triage telemetry, and rapid humanitarian resource dispatch.",
    icon: "AlertTriangle",
    color: "#f97316", // Orange
    bgGlow: "rgba(249, 115, 22, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "Offline-First Peer-to-Peer Disaster Mesh Emergency Network",
      "Autonomous Drone Swarm Wildfire Mapping & Survivor Thermal Beacon"
    ]
  },
  {
    id: "open-innovation",
    name: "Open Innovation",
    shortDescription: "Unrestricted realm! Build anything groundbreaking that pushes the boundaries of hardware, software, or gaming.",
    icon: "Gamepad2",
    color: "#22d3ee", // Bright Cyan
    bgGlow: "rgba(34, 211, 238, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "AI-Powered Retro Arcade Level Synthesizer & Physics Boss Arena",
      "Decentralized Bandwidth & Compute Sharing Micro-Market"
    ]
  },
  {
    id: "edtech",
    name: "EdTech & Smart Learning",
    shortDescription: "AI personalized tutors, gamified interactive coding arenas, adaptive assessments, and accessible learning tools.",
    icon: "GraduationCap",
    color: "#10b981", // Emerald
    bgGlow: "rgba(16, 185, 129, 0.15)",
    exampleProblemsCount: 2,
    exampleProblems: [
      "Adaptive Socratic Code Mentor & Gamified DSA Battle Arena",
      "Interactive Algorithmic Visualizer & Collaborative Classroom Lab"
    ]
  }
];

export const problemStatements: ProblemStatement[] = [
  {
    id: "ps-01",
    problemId: "ARC-SEC-01",
    title: "Autonomous Code Guardian & Security Remediation Agent",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Hard",
    description: "Build an autonomous AI pipeline that continuously inspects open-source GitHub repositories for zero-day vulnerabilities, misconfigurations, and leaked API secrets. The system must not only detect issues but auto-generate verified Pull Requests with unit tests proving the fix.",
    expectedSolution: "A web dashboard + CLI tool integrated with LLM agents (e.g. Gemini API), returning interactive vulnerability graphs and automated pull request generation.",
    suggestedTech: ["TypeScript", "Gemini 2.5 Pro", "Express", "Docker", "GitHub Webhooks"],
    sponsor: "CyberShield Corp",
    pdfUrl: "#"
  },
  {
    id: "ps-02",
    problemId: "ARC-SEC-02",
    title: "Zero-Knowledge Verifiable Intercollege Credentials Ledger",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    difficulty: "Hard",
    description: "Build a ZK-proof system that allows students to prove their degree credentials, hackathon placement status, or GPA thresholds to employers without revealing their identity details, exact transcript marks, or official student ID numbers.",
    expectedSolution: "Cryptographic proof generator web portal + employer verification engine with QR code generation and instant validation.",
    suggestedTech: ["TypeScript", "SnarkJS / ZK Primitives", "React", "Tailwind CSS"],
    sponsor: "VaultPass Cryptography",
    pdfUrl: "#"
  },
  {
    id: "ps-03",
    problemId: "ARC-AI-03",
    title: "Multimodal Accessibility Assistant for Visually Impaired Coders",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Intermediate",
    description: "Create an audio-first developer workspace that translates code syntax trees into spatial audio cues and natural language descriptions, allowing visually impaired developers to navigate complex nested code files effortlessly.",
    expectedSolution: "Web IDE extension / web interface with spatial audio feedback, keyboard shortcuts, and voice navigation.",
    suggestedTech: ["React", "Web Speech API", "Monaco Editor / Syntax Parser", "Gemini API"],
    pdfUrl: "#"
  },
  {
    id: "ps-04",
    problemId: "ARC-AI-04",
    title: "Edge Computer Vision Anomaly Detection & Predictive Maintenance",
    domainId: "ai-ml",
    domainName: "AI / ML",
    difficulty: "Hard",
    description: "Design a lightweight real-time video stream analyzer running client-side or on edge hardware to identify micro-defects in high-speed manufacturing conveyor systems with under 15ms latency.",
    expectedSolution: "Interactive web control panel with WebRTC video ingest, bounding box heatmaps, and automated alert dispatch.",
    suggestedTech: ["TensorFlow.js / ONNX", "React", "WebSockets", "Tailwind CSS"],
    sponsor: "Apex Tech Labs",
    pdfUrl: "#"
  },
  {
    id: "ps-05",
    problemId: "ARC-DEF-05",
    title: "Tactical Battlefield Swarm Reconnaissance & EW Signal Jamming Simulator",
    domainId: "defense",
    domainName: "Defense",
    difficulty: "Hard",
    description: "Design an intelligent mission planning and simulation dashboard for autonomous defense drone swarms operating under contested electronic warfare (EW) conditions, featuring real-time signal jam evasion and encrypted telemetry relays.",
    expectedSolution: "Interactive 3D tactical radar map with real-time waypoint coordination, RF signal spectrum analysis, and fail-safe return-to-base protocols.",
    suggestedTech: ["React", "Three.js / WebGL", "WebSockets", "Tailwind CSS"],
    sponsor: "AeroDefense Labs",
    pdfUrl: "#"
  },
  {
    id: "ps-06",
    problemId: "ARC-DEF-06",
    title: "Autonomous Perimeter Surveillance & Threat Interception Telemetry System",
    domainId: "defense",
    domainName: "Defense",
    difficulty: "Intermediate",
    description: "Develop an automated defense perimeter monitoring software that synthesizes multispectral camera feeds, thermal infrared sensors, and acoustic tripwires to detect and classify border incursions with sub-second response times.",
    expectedSolution: "Surveillance console interface with multi-feed sensor fusion, automated target track lock, and encrypted alert escalation channels.",
    suggestedTech: ["TensorFlow.js / ONNX", "React", "WebRTC", "Tailwind CSS"],
    pdfUrl: "#"
  },
  {
    id: "ps-07",
    problemId: "ARC-CRS-07",
    title: "Offline-First Peer-to-Peer Campus Disaster Mesh Network",
    domainId: "crisis-tech",
    domainName: "Crisis Tech & Emergency Response",
    difficulty: "Intermediate",
    description: "Develop a zero-internet disaster emergency app that operates using WebRTC, Bluetooth LE, and local Wi-Fi Direct. When central cellular networks fail, students and first responders can broadcast SOS signals, locate peers, and exchange critical medicine request logs.",
    expectedSolution: "PWA or native mobile application with topological node maps, encrypted offline store, and automatic sync when connection is restored.",
    suggestedTech: ["React / Vite", "IndexedDB", "WebRTC", "Tailwind CSS", "Service Workers"],
    sponsor: "Apex Tech Labs",
    pdfUrl: "#"
  },
  {
    id: "ps-08",
    problemId: "ARC-CRS-08",
    title: "Autonomous Drone Swarm Wildfire Mapping & Survivor Beacon",
    domainId: "crisis-tech",
    domainName: "Crisis Tech & Emergency Response",
    difficulty: "Hard",
    description: "Develop a centralized ground-station dashboard that coordinates simulated or real autonomous drone swarms for real-time wildfire mapping, survivor thermal detection, and automated route re-planning in harsh weather conditions.",
    expectedSolution: "Interactive mission control UI with real-time waypoint planner, telemetry streaming over WebSockets, and AI-driven path optimization.",
    suggestedTech: ["React", "WebSockets", "Leaflet / MapLibre", "Three.js", "Tailwind CSS"],
    pdfUrl: "#"
  },
  {
    id: "ps-09",
    problemId: "ARC-OPN-09",
    title: "AI-Powered Retro Arcade Level Synthesizer & Physics Arena",
    domainId: "open-innovation",
    domainName: "Open Innovation",
    difficulty: "Extreme",
    description: "Construct a playable arcade game engine where users can type natural language prompts (e.g. 'Generate a neon cyberpunk maze with teleporting ghosts and high-gravity speed pads'), and the engine dynamically generates retro pixel maps, enemy AI behaviors, and playable levels in real time.",
    expectedSolution: "Playable HTML5 canvas game with AI level generator, global high-score leaderboard, and custom sound synthesis.",
    suggestedTech: ["HTML5 Canvas", "React", "Web Audio API", "Gemini API", "Tailwind CSS"],
    sponsor: "Arcade Master Studios",
    pdfUrl: "#"
  },
  {
    id: "ps-10",
    problemId: "ARC-OPN-10",
    title: "DePIN Decentralized Bandwidth & Compute Sharing Micro-Market",
    domainId: "open-innovation",
    domainName: "Open Innovation",
    difficulty: "Hard",
    description: "Create an open protocol and client interface that enables campus devices to pool unused bandwidth and CPU compute cycles to run decentralized machine learning models, rewarding contributors via transparent cryptographic tokens.",
    expectedSolution: "Node daemon + web interface tracking contributed compute, automated smart contract escrow, and real-time network throughput graphs.",
    suggestedTech: ["Ethers.js / Viem", "Solidity / WASM", "React", "Recharts", "Node.js"],
    sponsor: "VaultPass Cryptography",
    pdfUrl: "#"
  },
  {
    id: "ps-11",
    problemId: "ARC-EDT-11",
    title: "Adaptive Socratic Code Mentor & Gamified DSA Arena",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Intermediate",
    description: "Build an interactive learning environment where students write algorithms while an AI Socratic tutor gently guides them with hints, algorithmic complexity visualizations, and step-by-step memory model animations without spoiling the answer.",
    expectedSolution: "Interactive in-browser code editor with step-by-step memory visualizer, AI prompt mentor, and multiplayer head-to-head algorithm battles.",
    suggestedTech: ["React", "Monaco Editor", "Gemini API", "Tailwind CSS", "Motion"],
    pdfUrl: "#"
  },
  {
    id: "ps-12",
    problemId: "ARC-EDT-12",
    title: "Interactive Algorithmic Visualizer & Collaborative Classroom Lab",
    domainId: "edtech",
    domainName: "EdTech & Smart Learning",
    difficulty: "Intermediate",
    description: "Create an interactive visual lab where computer science students can manipulate data structures (trees, graphs, heaps) in real time with interactive play/pause controls, call stack animations, and shared live instructor rooms.",
    expectedSolution: "Canvas-based animated data structure visualizer with real-time multi-user synchronization and interactive step debugger.",
    suggestedTech: ["React", "D3.js", "WebSockets", "Tailwind CSS"],
    pdfUrl: "#"
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "phase-1",
    phase: "Phase 1",
    phaseNumber: 1,
    title: "Phase 1 · Registration Starts",
    date: "15 Aug 2026",
    time: "12:00 AM IST",
    description: "Registrations open. Form your team and prepare for the hackathon.",
    status: "current",
    icon: "UserPlus",
    badge: "PHASE 01"
  },
  {
    id: "phase-2",
    phase: "Phase 2",
    phaseNumber: 2,
    title: "Phase 2 · Registration Ends",
    date: "31 Aug 2026",
    time: "11:59 PM IST",
    description: "Final deadline for team registrations.",
    status: "upcoming",
    icon: "Clock",
    badge: "PHASE 02"
  },
  {
    id: "phase-3",
    phase: "Phase 3",
    phaseNumber: 3,
    title: "Phase 3 · Shortlisted Teams Announced",
    date: "2 Sep 2026",
    time: "06:00 PM IST",
    description: "Shortlisted teams are announced and selected participants receive further instructions.",
    status: "upcoming",
    icon: "CheckCircle2",
    badge: "PHASE 03"
  },
  {
    id: "phase-4",
    phase: "Phase 4",
    phaseNumber: 4,
    title: "Phase 4 · Hackathon Starts",
    date: "8 Sep 2026",
    time: "11:00 AM IST",
    description: "HACKHERTZ 2.0 officially begins with building, collaboration, mentoring, and innovation.",
    status: "upcoming",
    icon: "Play",
    badge: "PHASE 04"
  },
  {
    id: "phase-5",
    phase: "Phase 5",
    phaseNumber: 5,
    title: "Phase 5 · Hackathon Ends 🏆",
    date: "9 Sep 2026",
    time: "05:00 PM IST",
    description: "Final project submissions, presentations, judging, and winner announcement.",
    status: "upcoming",
    icon: "Trophy",
    badge: "PHASE 05"
  }
];

export const prizes: Prize[] = [
  {
    id: "p-01",
    category: "GRAND CHAMPION",
    title: "High Score Champion (1st Place)",
    amount: "₹XXXX",
    rank: 1,
    icon: "Crown",
    badgeColor: "#facc15",
    perks: [
      "₹XXXX Direct Cash Prize",
      "Retro Arcade Champion Trophy & Medals",
      "Fast-track Interview Round at Title Sponsors",
      "Cloud Credits ($5,000 value)",
      "Exclusive HACKHERTZ Customized Mechanical Keyboards"
    ]
  },
  {
    id: "p-02",
    category: "1ST RUNNER UP",
    title: "Pixel Maestro (2nd Place)",
    amount: "₹XXXX",
    rank: 2,
    icon: "Award",
    badgeColor: "#e2e8f0",
    perks: [
      "₹XXXX Direct Cash Prize",
      "Runner-up Silver Arcade Shield",
      "Sponsor Mentorship & Career Fast-Track",
      "Cloud Credits ($2,500 value)",
      "Pro Noise-Canceling Gaming Headsets"
    ]
  },
  {
    id: "p-03",
    category: "2ND RUNNER UP",
    title: "Arcade Innovator (3rd Place)",
    amount: "₹XXXX",
    rank: 3,
    icon: "Medal",
    badgeColor: "#fb923c",
    perks: [
      "₹XXXX Direct Cash Prize",
      "Bronze Arcade Shield",
      "Cloud Credits ($1,000 value)",
      "Arcade Mechanical Keypads & Swag Box"
    ]
  },
  {
    id: "p-04",
    category: "SPECIAL TRACK",
    title: "Best Neural/AI Project",
    amount: "₹XXXX",
    icon: "Brain",
    badgeColor: "#38bdf8",
    perks: ["₹XXXX Cash Prize", "Special AI Innovation Trophy", "NVIDIA GPU Compute Credits"]
  },
  {
    id: "p-05",
    category: "SPECIAL TRACK",
    title: "Best Retro Arcade UI/UX",
    amount: "₹XXXX",
    icon: "Sparkles",
    badgeColor: "#f472b6",
    perks: ["₹XXXX Cash Prize", "Design Mastery Award", "Figma Pro Licenses"]
  },
  {
    id: "p-06",
    category: "SPECIAL TRACK",
    title: "Best Social Impact & Sustainability",
    amount: "₹XXXX",
    icon: "HeartHandshake",
    badgeColor: "#34d399",
    perks: ["₹XXXX Cash Prize", "Impact Trophy", "Incubation Support"]
  },
  {
    id: "p-07",
    category: "SPECIAL TRACK",
    title: "Best Beginner/Freshman Team",
    amount: "₹XXXX",
    icon: "Zap",
    badgeColor: "#a78bfa",
    perks: ["₹XXXX Cash Prize", "Rising Star Award", "Special Tech Recognition"]
  }
];

export const sponsors: Sponsor[] = [
  {
    id: "sp-01",
    name: "CREART",
    tier: "Gold",
    logo: "🎨 CREART",
    website: "https://creart.in",
    description: "Creative Design & Tech Digital Agency",
    tagline: "Gold Sponsor"
  },
  {
    id: "sp-02",
    name: "AAVISHKAR Codex Infotech LLP",
    tier: "Gold",
    logo: "🔮 AAVISHKAR CODEX",
    website: "https://aavishkarcodex.com",
    description: "Enterprise IT Solutions & Product Engineering",
    tagline: "IF I DECIDE, I CAN."
  },
  {
    id: "sp-03",
    name: "VEDSHILL.CAREERS",
    tier: "Silver",
    logo: "🚀 VEDSHILL",
    website: "https://vedshill.careers",
    description: "Tech Career Accelerator & Talent Discovery Platform",
    tagline: "Silver Sponsor"
  },
  {
    id: "sp-04",
    name: "GAP3",
    tier: "Bronze",
    logo: "🛡️ GAP3",
    website: "https://gap3.in",
    description: "Advanced Cybersecurity & Threat Management",
    tagline: "Bronze Sponsor"
  },
  {
    id: "sp-05",
    name: "PATEL WEB SOLUTION",
    tier: "Well Wishers",
    logo: "🌐 PATEL WEB SOLUTION",
    website: "https://patelwebsolution.com",
    description: "Web & Mobile Development Services",
    tagline: "We believe in quality"
  },
  {
    id: "sp-06",
    name: "BrainyBeam",
    tier: "Well Wishers",
    logo: "🧠 BrainyBeam",
    website: "https://brainybeam.com",
    description: "EduTech Innovation & Skill Building Ecosystem",
    tagline: "Well Wishers"
  }
];

export const chiefPatron: Patron = {
  id: "patron-01",
  name: "Dharmesh Sir",
  role: "Chief Patron",
  category: "chief-patron",
  institution: "Shree Swaminarayan Institute of Technology (SSIT)",
  avatar: dharmeshSirImg,
  bio: "Visionary leader and executive guiding light fostering academic excellence, technical empowerment, and high-impact innovation across campus.",
  linkedin: "https://linkedin.com"
};

export const coPatron: Patron = {
  id: "patron-02",
  name: "Principal Sir",
  role: "Co-Patron",
  category: "co-patron",
  institution: "Shree Swaminarayan Institute of Technology (SSIT)",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  bio: "Distinguished academic leader championing student-driven research, industry collaborations, and national hackathon platforms.",
  linkedin: "https://linkedin.com"
};

export const headsOfDepartment: Patron[] = [
  {
    id: "hod-01",
    name: "Dr Darshan P Patel",
    role: "Head of Department",
    category: "hod",
    department: "Computer Engineering",
    institution: "Shree Swaminarayan Institute of Technology (SSIT)",
    avatar: darshanPatelImg,
    bio: "Head of Department driving cutting-edge computer engineering curriculum, tech research, and student innovation clubs.",
    linkedin: "https://in.linkedin.com/in/dr-darshan-patel-3652a7298"
  },
  {
    id: "hod-02",
    name: "Dr. Ramesh T. Prajapati",
    role: "Head of Department",
    category: "hod",
    department: "Information Technology",
    institution: "Shree Swaminarayan Institute of Technology (SSIT)",
    avatar: rameshPrajapatiImg,
    bio: "Head of Department spearheading enterprise systems, cloud architecture research, and collaborative project mentorship.",
    linkedin: "https://www.linkedin.com/in/ramesh-prajapati-8a8b9a1a3/"
  },
  {
    id: "hod-03",
    name: "Niraj Sir",
    role: "Head of Department",
    category: "hod",
    department: "Applied Sciences & Engineering",
    institution: "Shree Swaminarayan Institute of Technology (SSIT)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "Head of Department promoting interdisciplinary engineering solutions, foundational science, and creative research labs.",
    linkedin: "https://linkedin.com"
  }
];

export const patronsList: Patron[] = [
  chiefPatron,
  coPatron,
  ...headsOfDepartment
];

export const judges: Judge[] = [
  {
    id: "j-01",
    name: "Dr. Elena Vance",
    designation: "VP of Artificial Intelligence",
    company: "Apex Tech Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Former MIT CS researcher specializing in autonomous multi-agent networks and generative AI systems.",
    linkedin: "https://linkedin.com/in/elena-vance"
  },
  {
    id: "j-02",
    name: "Marcus Brody",
    designation: "Chief Information Security Officer",
    company: "CyberShield Corp",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    bio: "Cybersecurity veteran with 18+ years protecting cloud infra, zero-trust protocols, and cryptographic systems.",
    linkedin: "https://linkedin.com/in/marcus-brody"
  },
  {
    id: "j-03",
    name: "Sarah Jenkins",
    designation: "Head of Product & UX",
    company: "Arcade Master Studios",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    bio: "Design pioneer focused on spatial UI, micro-interactions, and retro-futuristic human computer interaction.",
    linkedin: "https://linkedin.com/in/sarah-jenkins"
  },
  {
    id: "j-04",
    name: "David K. Chen",
    designation: "Partner & Tech Investor",
    company: "Vanguard Tech Ventures",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "Early-stage investor backing student founders, developer tooling platforms, and open-source infrastructure.",
    linkedin: "https://linkedin.com/in/david-chen"
  }
];

export const mentors: Mentor[] = [
  {
    id: "m-01",
    name: "Alex Rivera",
    expertise: ["Full-Stack TS", "GraphQL", "WebRTC"],
    company: "Vercel / Ex-Meta",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://linkedin.com/in/alex-rivera"
  },
  {
    id: "m-02",
    name: "Priya Sharma",
    expertise: ["LLM Fine-Tuning", "Gemini API", "Python"],
    company: "Google AI Developer Relations",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://linkedin.com/in/priya-sharma"
  },
  {
    id: "m-03",
    name: "Kenji Sato",
    expertise: ["Rust", "Zero-Knowledge", "Backend Perf"],
    company: "Solana Foundation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://linkedin.com/in/kenji-sato"
  },
  {
    id: "m-04",
    name: "Maya Lin",
    expertise: ["Tailwind CSS", "Design Systems", "Animation"],
    company: "Framer Design Lead",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    linkedin: "https://linkedin.com/in/maya-lin"
  }
];

export const faqs: FAQ[] = [
  {
    id: "faq-01",
    question: "What is HACKHERTZ 2.0?",
    answer: "HACKHERTZ 2.0 is a student-focused hackathon where participants come together to code, collaborate, innovate, and build impactful technology solutions.",
    category: "General"
  },
  {
    id: "faq-02",
    question: "Where and when is HACKHERTZ 2.0 held?",
    answer: "HACKHERTZ 2.0 will be held as an offline hackathon. Check the official event details for the exact date and venue.",
    category: "Logistics"
  },
  {
    id: "faq-03",
    question: "What are the themes for HACKHERTZ 2.0?",
    answer: "Participants can build innovative solutions across domains such as Artificial Intelligence, Web Development, Cybersecurity, Blockchain, FinTech, HealthTech, EdTech, Sustainability, and Open Innovation.",
    category: "General"
  },
  {
    id: "faq-04",
    question: "Is HACKHERTZ 2.0 an online event or offline?",
    answer: "HACKHERTZ 2.0 is an offline hackathon.",
    category: "Logistics"
  },
  {
    id: "faq-05",
    question: "Is there any registration fee?",
    answer: "Yes, the registration fee is ₹400 per team.",
    category: "Registration"
  },
  {
    id: "faq-05b",
    question: "How do I register my team for HACKHERTZ 2.0?",
    answer: "You can click any 'INSERT COIN' or 'REGISTER NOW' button on this site, or submit directly via our official Google Form at https://forms.gle/jY7ijJnAAaY1DT7a8.",
    category: "Registration"
  },
  {
    id: "faq-06",
    question: "Do participants need to stay at the venue overnight?",
    answer: "Yes, participants are expected to stay at the venue throughout the hackathon, depending on the event schedule.",
    category: "Logistics"
  },
  {
    id: "faq-07",
    question: "What facilities will be provided by the organizers?",
    answer: "Participants will have access to essential facilities such as workspace, internet connectivity, and other event amenities.",
    category: "Logistics"
  },
  {
    id: "faq-08",
    question: "I am a beginner. Can I participate?",
    answer: "Absolutely! HACKHERTZ 2.0 welcomes beginners. You don't need to be an expert—mentors and teammates can help you learn and build your idea.",
    category: "Eligibility"
  },
  {
    id: "faq-09",
    question: "Can we build both software and hardware projects?",
    answer: "Yes. Both software and hardware projects are welcome, subject to the hackathon rules and available resources.",
    category: "Rules & Tech"
  },
  {
    id: "faq-10",
    question: "What is the allowed team size?",
    answer: "Teams can have 2 to 4 members.",
    category: "Teams"
  },
  {
    id: "faq-11",
    question: "Are there prizes at HACKHERTZ 2.0?",
    answer: "Yes! Participants can compete for exciting prizes, awards, and special category recognitions.",
    category: "General"
  },
  {
    id: "faq-12",
    question: "What should I bring to the hackathon?",
    answer: "Bring your college/student ID, laptop, charger, extension board, required hardware/components, and any other equipment needed for your project.",
    category: "Logistics"
  },
  {
    id: "faq-13",
    question: "Will Wi-Fi be available?",
    answer: "Yes, internet/Wi-Fi connectivity will be available at the venue.",
    category: "Logistics"
  },
  {
    id: "faq-14",
    question: "Can I participate without a team?",
    answer: "Participants are encouraged to form a team. If individual participation or team formation at the venue is allowed, participants can connect with other hackers to build a team.",
    category: "Teams"
  },
  {
    id: "faq-15",
    question: "Will my travel expenses be sponsored?",
    answer: "Travel expenses are generally not covered by the organizers unless specifically mentioned in the official event guidelines.",
    category: "Logistics"
  },
  {
    id: "faq-17",
    question: "Do I need to be a student to participate?",
    answer: "HACKHERTZ 2.0 is primarily designed for students and young innovators. Eligibility should be confirmed from the official registration guidelines.",
    category: "Eligibility"
  },
  {
    id: "faq-18",
    question: "Can students from different colleges form a team?",
    answer: "Yes! Inter-college teams are welcome, allowing participants from different institutions to collaborate and build together.",
    category: "Teams"
  },
  {
    id: "faq-19",
    question: "Are only B.Tech/B.E. students eligible?",
    answer: "No. Students from different technical and academic backgrounds can participate, provided they meet the event's eligibility requirements.",
    category: "Eligibility"
  },
  {
    id: "faq-20",
    question: "Can Arts and Science students participate?",
    answer: "Yes, if permitted by the official HACKHERTZ 2.0 eligibility rules. Students with different backgrounds can bring unique ideas and perspectives to the hackathon.",
    category: "Eligibility"
  }
];

export const organizers: Organizer[] = [
  {
    id: "org-01",
    role: "Overall Lead & Convenor",
    name: "Rohan Varma",
    email: "rohan.varma@hackhertz.edu",
    phone: "+1 (555) 019-2831",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/rohan-varma"
  },
  {
    id: "org-02",
    role: "Technical & Portal Lead",
    name: "Aanya Patel",
    email: "aanya.patel@hackhertz.edu",
    phone: "+1 (555) 019-4820",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/aanya-patel"
  },
  {
    id: "org-03",
    role: "Sponsorship Lead",
    name: "Naithani Mahak",
    email: "hackhertz2.0@gmail.com",
    phone: "+91 7574898949",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com"
  },
  {
    id: "org-04",
    role: "Operations & Logistics Lead",
    name: "Sophia Martinez",
    email: "logistics@hackhertz.edu",
    phone: "+1 (555) 019-9923",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/sophia-martinez"
  },
  {
    id: "org-05",
    role: "Design & Media Lead",
    name: "Vikram Malhotra",
    email: "media@hackhertz.edu",
    phone: "+1 (555) 019-3342",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/vikram-malhotra"
  },
  {
    id: "org-06",
    role: "Evaluation & Review Coordinator",
    name: "Priya Sharma",
    email: "evaluation@hackhertz.edu",
    phone: "+1 (555) 019-5561",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/priya-sharma"
  },
  {
    id: "org-07",
    role: "Student Relations & Outreach Lead",
    name: "Aditya Joshi",
    email: "outreach@hackhertz.edu",
    phone: "+1 (555) 019-8874",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/aditya-joshi"
  }
];
