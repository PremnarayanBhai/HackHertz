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
  contactEmail: string;
  contactPhone: string;
  mapUrl?: string;
  locationUrl?: string;
  socialLinks: {
    discord: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
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
  difficulty: 'Beginner' | 'Intermediate' | 'Hard' | 'Extreme';
  description: string;
  expectedSolution: string;
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
  tier: 'Title' | 'Gold' | 'Silver' | 'Community' | 'Technology' | 'Media';
  logo: string;
  website: string;
  description?: string;
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

