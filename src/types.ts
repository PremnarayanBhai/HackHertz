export interface HackathonInfo {
  name: string;
  tagline: string;
  date: string;
  startDate: string; // ISO date for countdown
  endDate: string;
  registrationDeadline: string;
  venue: string;
  collegeName: string;
  city: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  teamSizeMin: number;
  teamSizeMax: number;
  registrationFee: string;
  totalPrizePool: string;
  registrationUrl?: string;
  registrationFormUrl?: string;
  contactEmail?: string;
  contactPhone: string;
  helplineLead?: string;
  mapUrl?: string;
  locationUrl?: string;
  socialLinks: {
    instagram: string;
    whatsapp?: string;
    github?: string;
    discord?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface TimelineEvent {
  id: string;
  phase?: string;
  phaseNumber?: number;
  title: string;
  date: string;
  time?: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
  badge?: string;
}

export interface Domain {
  id: string;
  name: string;
  shortDescription: string;
  icon: string;
  color: string;
  bgGlow: string;
  exampleProblemsCount: number;
  exampleProblems: string[];
}

export interface ProblemStatement {
  id: string;
  problemId: string;
  title: string;
  domainId: string;
  domainName: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Beginner' | 'Intermediate' | 'Extreme' | 'Open Theme';
  description: string;
  expectedSolution?: string;
  suggestedTech: string[];
  sponsor?: string;
  pdfUrl?: string;
}

export interface Prize {
  id: string;
  category: string;
  title: string;
  amount: string;
  perks: string[];
  rank?: number;
  icon: string;
  badgeColor: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'Prize' | 'Community' | 'Technology' | 'Media' | 'Well Wishers';
  logo: string;
  website: string;
  description?: string;
  tagline?: string;
}

export interface Patron {
  id: string;
  name: string;
  role: 'Chief Patron' | 'Co-Patron' | 'Head of Department';
  category: 'chief-patron' | 'co-patron' | 'hod';
  designation?: string;
  institution?: string;
  department?: string;
  avatar: string;
  bio?: string;
  linkedin?: string;
}

export interface Judge {
  id: string;
  name: string;
  designation: string;
  company: string;
  avatar: string;
  bio: string;
  linkedin: string;
  twitter?: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  company: string;
  avatar: string;
  linkedin: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Eligibility' | 'Registration' | 'Teams' | 'Rules & Tech' | 'Logistics';
}

export interface Organizer {
  id: string;
  role: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  linkedin: string;
}

export interface RegistrationFormData {
  // Step 1: Personal
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string;
  gender: string;
  city: string;
  state: string;
  country: string;

  // Step 2: College
  collegeName: string;
  course: string;
  branch: string;
  year: string;
  studentId: string;

  // Step 3: Tech Profile
  github: string;
  linkedin: string;
  portfolio: string;
  resumeUrl: string;
  primarySkills: string[];
  secondarySkills: string[];
  experienceLevel: string;
  previousHackathonsCount: number;
  previousWins: string;
  areasOfInterest: string[];

  // Step 4: Team
  teamMode: 'create' | 'join';
  teamName: string;
  teamCode?: string;
  teamMembers: Array<{
    name: string;
    email: string;
    college: string;
    role: string;
  }>;

  // Step 5: Preferences
  preferredDomain: string;
  preferredProblemId: string;
  dietaryNeeds: string;
  accommodationRequired: boolean;
  tshirtSize: string;
}

export interface RegistrationRecord extends RegistrationFormData {
  registrationId: string;
  submittedAt: string;
}

export interface CertificateRecord {
  certificateId: string; // e.g. "HH26-CERT-8F3A29"
  recipientName: string;
  recipientEmail: string;
  issuedAt: string; // ISO date
  issueDateFormatted: string;
  domain: string;
  category: 'Participation' | 'Winner' | 'Runner Up' | 'Special Mention' | 'Mentor';
  teamName?: string;
  collegeName?: string;
  verificationHash: string;
}

export interface AuthorizedParticipant {
  email: string;
  name?: string;
  teamName?: string;
  collegeName?: string;
  domain?: string;
  category?: 'Participation' | 'Winner' | 'Runner Up' | 'Special Mention' | 'Mentor';
  addedAt?: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role: 'Lead' | 'Member';
  phone?: string;
  collegeName?: string;
}

export interface TeamRecord {
  id?: string;
  teamId: string; // e.g. "HH26-TEAM-001"
  teamNumber: number; // 1 - 100
  teamName: string;
  domainId: string;
  domainName: string;
  collegeName: string;
  accessCode: string; // e.g. "HH26-AIML-4921"
  teamLead: {
    name: string;
    email: string;
    phone?: string;
  };
  members: TeamMember[];
  hasUnlocked: boolean;
  unlockedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface SystemSettingsRecord {
  isProblemStatementsLive: boolean;
  liveRevealDate: string;
  announcement: string;
  lastSyncedAt?: string;
  totalTeams: number;
  totalParticipants: number;
}

export interface ProblemStatementDetailed extends ProblemStatement {
  background?: string;
  keyRequirements?: string[];
  challenges?: string[];
  expectedOutcome?: string;
  scopeSafetyNote?: string;
  workflowSteps?: string[];
  visitorCapabilities?: string[];
  adminCapabilities?: string[];
  expectedDeliverables?: string[];
  evaluationCriteria?: string[];
  mentorSupport?: string;
}

export interface EvaluationCriterion {
  criteria: string;
  weight: string;
  description: string;
}

export interface CertificateVerificationResult {
  isValid: boolean;
  certificate?: CertificateRecord;
  message?: string;
}

