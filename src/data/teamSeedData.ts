import { TeamRecord, ProblemStatementDetailed } from '../types';
import { parseRealTeamsFromSheet } from './realTeamsData';
import { OFFICIAL_PROBLEM_STATEMENTS } from './officialProblemStatements';

// College name templates
const COLLEGES = [
  "Shree Swaminarayan Institute of Technology (SSIT), Gandhinagar",
  "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)",
  "Institute of Technology, Nirma University",
  "Pandit Deendayal Energy University (PDEU)",
  "L.D. College of Engineering (LDCE), Ahmedabad",
  "Vishwakarma Government Engineering College (VGEC), Chandkheda",
  "Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar",
  "Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat",
  "Charotar University of Science and Technology (CHARUSAT)",
  "Marwadi University, Rajkot",
  "Parul Institute of Technology, Vadodara",
  "Silver Oak University, Ahmedabad",
  "Indus University, Ahmedabad",
  "Government Engineering College (GEC), Gandhinagar",
  "Dharmsinh Desai University (DDU), Nadiad",
  "Adani University, Ahmedabad"
];

// Domains mapping
export const DOMAINS_CONFIG = [
  { id: 'cybersecurity', code: 'CYBER', name: 'Cybersecurity', color: '#ef4444' },
  { id: 'ai-ml', code: 'AIML', name: 'AI / ML', color: '#facc15' },
  { id: 'defense', code: 'DEF', name: 'Defense', color: '#e879f9' },
  { id: 'crisis-tech', code: 'CRISIS', name: 'Crisis Tech & Emergency Response', color: '#f97316' },
  { id: 'open-innovation', code: 'OPEN', name: 'Open Innovation', color: '#22d3ee' },
  { id: 'edtech', code: 'EDT', name: 'EdTech & Smart Learning', color: '#10b981' }
];

const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
  "Shaurya", "Atharv", "Dhruv", "Kabir", "Rudra", "Ananya", "Diya", "Saanvi", "Aadhya", "Pari",
  "Kiara", "Myra", "Riya", "Anika", "Isha", "Kavya", "Prachi", "Maitri", "Krish", "Mohit",
  "Angelina", "Ferin", "Mahak", "Darshan", "Ramesh", "Niraj", "Chirag", "Jatin", "Sneha", "Tanvi",
  "Kunal", "Harsh", "Deep", "Yash", "Dev", "Het", "Kavita", "Pooja", "Meera", "Bhavya"
];

const LAST_NAMES = [
  "Patel", "Shah", "Sharma", "Verma", "Prajapati", "Thakkar", "Gandhi", "Khandelwal", "Mevada",
  "Naithani", "Christian", "Soni", "Joshi", "Dave", "Mehta", "Desai", "Trivedi", "Rathod",
  "Chauhan", "Solanki", "Pandya", "Vaghela", "Parmar", "Zala", "Gohil", "Panchal", "Mistry", "Bhatt"
];

const TEAM_PREFIXES = [
  "Cyber", "Quantum", "Neural", "Byte", "Pixel", "Apex", "Retro", "Binary", "Vortex", "Matrix",
  "Nova", "Stealth", "Glitch", "Pulse", "Echo", "Falcon", "Titan", "Zenith", "Aether", "Cipher",
  "Omega", "Alpha", "Hyper", "Sonic", "Nexus", "Vector", "Cosmo", "Shadow", "Ignite", "Sentinel"
];

const TEAM_SUFFIXES = [
  "Knights", "Architects", "Hunters", "Pioneers", "Squad", "Legion", "Force", "Coders", "Crafters",
  "Warriors", "Guardians", "Devs", "Maestros", "Innovators", "Hackers", "Titans", "Syndicate",
  "Collective", "Foundry", "Engineers", "Commandos", "Vanguard", "Rangers", "Navigators", "Elites"
];

// Helper to generate deterministic unique access code
export function generateAccessCode(domainCode: string, teamNum: number): string {
  // Deterministic 4-digit salt based on team number
  const salt = ((teamNum * 7919 + 104729) % 8999) + 1000;
  const numPad = String(teamNum).padStart(3, '0');
  return `HH26-${domainCode}-${numPad}-${salt}`;
}

// Generate the 100 teams array combining real Google Sheet entries and complete registry
export function generateInitial100Teams(): TeamRecord[] {
  // Load real registered teams parsed from the Google Sheet
  const realTeams = parseRealTeamsFromSheet();
  const teams: TeamRecord[] = [...realTeams];

  const startFrom = realTeams.length + 1;
  for (let i = startFrom; i <= 100; i++) {
    // Determine domain (spread across the 6 domains)
    const domainIndex = (i - 1) % DOMAINS_CONFIG.length;
    const domain = DOMAINS_CONFIG[domainIndex];

    const prefix = TEAM_PREFIXES[(i * 3 + 7) % TEAM_PREFIXES.length];
    const suffix = TEAM_SUFFIXES[(i * 5 + 11) % TEAM_SUFFIXES.length];
    const teamName = `${prefix} ${suffix} ${i > 40 ? `(${domain.code})` : ''}`.trim();

    const college = COLLEGES[(i * 7) % COLLEGES.length];
    const padNum = String(i).padStart(3, '0');
    const teamId = `HH26-TEAM-${padNum}`;
    const accessCode = generateAccessCode(domain.code, i);

    // Generate 4 distinct members
    const members = [];
    const leadFirstName = FIRST_NAMES[(i * 4) % FIRST_NAMES.length];
    const leadLastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const leadEmail = `${leadFirstName.toLowerCase()}.${leadLastName.toLowerCase()}${i}@gmail.com`;
    const leadPhone = `+91 ${9000000000 + ((i * 1234567) % 99999999)}`;

    // Member 1 is Team Lead
    members.push({
      name: `${leadFirstName} ${leadLastName}`,
      email: leadEmail,
      role: 'Lead' as const,
      phone: leadPhone,
      collegeName: college
    });

    // Members 2, 3, 4
    for (let m = 2; m <= 4; m++) {
      const fName = FIRST_NAMES[(i * 4 + m * 5) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(i * 3 + m * 7) % LAST_NAMES.length];
      members.push({
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}${m}@gmail.com`,
        role: 'Member' as const,
        phone: `+91 ${9000000000 + ((i * 1234567 + m * 98765) % 99999999)}`,
        collegeName: college
      });
    }

    teams.push({
      teamId,
      teamNumber: i,
      teamName,
      domainId: domain.id,
      domainName: domain.name,
      collegeName: college,
      accessCode,
      teamLead: {
        name: `${leadFirstName} ${leadLastName}`,
        email: leadEmail,
        phone: leadPhone
      },
      members,
      hasUnlocked: i <= 2, // First 2 unlocked as live demos
      unlockedAt: i <= 2 ? new Date().toISOString() : null,
      createdAt: new Date(Date.now() - (100 - i) * 3600000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  return teams;
}

// 25 Official domain-specific problem statements for HackHertz 2026 (Open Innovation has no fixed statements)
export const INITIAL_PROBLEM_STATEMENTS: ProblemStatementDetailed[] = OFFICIAL_PROBLEM_STATEMENTS;
export { OPEN_INNOVATION_SPECIFICATION } from './officialProblemStatements';

export const DEFAULT_SYSTEM_SETTINGS = {
  isProblemStatementsLive: false, // Goes live on hackathon kickoff or via Team Lead Access Code
  liveRevealDate: "2026-09-08T11:00:00+05:30",
  announcement: "⚡ Welcome to HackHertz 2026! Problem statements for all 100 teams will unlock live on Hackathon Day (Sep 08, 11:00 AM IST). Team leads can use their unique access code to unlock their domain track problem statement anytime.",
  totalTeams: 100,
  totalParticipants: 400
};
