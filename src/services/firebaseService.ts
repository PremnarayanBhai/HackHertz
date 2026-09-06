import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TeamRecord, TeamMember, ProblemStatementDetailed, SystemSettingsRecord, AuthorizedParticipant } from '../types';
import {
  generateInitial100Teams,
  INITIAL_PROBLEM_STATEMENTS,
  DEFAULT_SYSTEM_SETTINGS,
  DOMAINS_CONFIG,
  generateAccessCode
} from '../data/teamSeedData';

const TEAMS_COLLECTION = 'teams';
const PROBLEMS_COLLECTION = 'problem_statements';
const SYSTEM_COLLECTION = 'system_settings';
const PARTICIPANTS_COLLECTION = 'authorized_participants';

// In-memory fallback storage when Firestore is initializing or offline
let localTeamsCache: TeamRecord[] = [];
let localSystemSettings: SystemSettingsRecord = { ...DEFAULT_SYSTEM_SETTINGS };

// Initialize local cache from seed
localTeamsCache = generateInitial100Teams();

// --- Firestore Teams & Seeding ---

export async function fetchAllTeams(): Promise<TeamRecord[]> {
  try {
    const teamsCol = collection(db, TEAMS_COLLECTION);
    const snapshot = await getDocs(teamsCol);
    if (snapshot.empty) {
      // If Firestore is empty, return local generated 100 teams
      return localTeamsCache;
    }
    const teams: TeamRecord[] = [];
    snapshot.forEach((docSnap) => {
      teams.push({ ...docSnap.data(), id: docSnap.id } as TeamRecord);
    });
    // Sort by teamNumber
    teams.sort((a, b) => (a.teamNumber || 0) - (b.teamNumber || 0));
    localTeamsCache = teams;
    return teams;
  } catch (error) {
    console.warn('Firestore fetch teams fallback to local cache:', error);
    return localTeamsCache;
  }
}

export function subscribeToTeams(callback: (teams: TeamRecord[]) => void): () => void {
  try {
    const teamsCol = collection(db, TEAMS_COLLECTION);
    return onSnapshot(
      teamsCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const teams: TeamRecord[] = [];
          snapshot.forEach((docSnap) => {
            teams.push({ ...docSnap.data(), id: docSnap.id } as TeamRecord);
          });
          teams.sort((a, b) => (a.teamNumber || 0) - (b.teamNumber || 0));
          localTeamsCache = teams;
          callback(teams);
        } else {
          callback(localTeamsCache);
        }
      },
      (err) => {
        console.warn('Firestore teams subscription error:', err);
        callback(localTeamsCache);
      }
    );
  } catch (error) {
    console.warn('Could not attach teams snapshot listener:', error);
    callback(localTeamsCache);
    return () => {};
  }
}

// Seed 100 Teams to Firebase in Batches
export async function seed100TeamsToFirestore(
  onProgress?: (count: number, total: number) => void
): Promise<{ success: boolean; count: number; message: string }> {
  try {
    const initialTeams = generateInitial100Teams();
    const batchSize = 25; // Firestore max writes per batch is 500
    let savedCount = 0;

    for (let i = 0; i < initialTeams.length; i += batchSize) {
      const chunk = initialTeams.slice(i, i + batchSize);
      const batch = writeBatch(db);

      for (const team of chunk) {
        const teamDocRef = doc(db, TEAMS_COLLECTION, team.teamId);
        batch.set(teamDocRef, team, { merge: true });

        // Also add each team member to authorized_participants collection for certificates
        team.members.forEach((member) => {
          const emailSlug = member.email.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const participantRef = doc(db, PARTICIPANTS_COLLECTION, emailSlug);
          const participantData: AuthorizedParticipant & { teamId: string; role: string } = {
            email: member.email.toLowerCase().trim(),
            name: member.name,
            teamName: team.teamName,
            collegeName: team.collegeName,
            domain: team.domainName,
            category: 'Participation',
            teamId: team.teamId,
            role: member.role,
            addedAt: new Date().toISOString()
          };
          batch.set(participantRef, participantData, { merge: true });
        });
      }

      await batch.commit();
      savedCount += chunk.length;
      if (onProgress) {
        onProgress(savedCount, initialTeams.length);
      }
    }

    // Also seed Problem Statements
    await seedProblemStatementsToFirestore();

    // Also initialize System Settings
    const systemDocRef = doc(db, SYSTEM_COLLECTION, 'global');
    await setDoc(
      systemDocRef,
      {
        ...DEFAULT_SYSTEM_SETTINGS,
        lastSyncedAt: new Date().toISOString(),
        totalTeams: initialTeams.length,
        totalParticipants: initialTeams.length * 4
      },
      { merge: true }
    );

    localTeamsCache = initialTeams;
    return {
      success: true,
      count: initialTeams.length,
      message: `Successfully seeded ${initialTeams.length} teams (400 participants) to Firebase Firestore!`
    };
  } catch (error: any) {
    console.error('Error seeding teams to Firestore:', error);
    return {
      success: false,
      count: 0,
      message: error?.message || 'Failed to seed teams to Firebase.'
    };
  }
}

// Seed 12 problem statements to Firestore
export async function seedProblemStatementsToFirestore(): Promise<void> {
  try {
    const batch = writeBatch(db);
    INITIAL_PROBLEM_STATEMENTS.forEach((ps) => {
      const psRef = doc(db, PROBLEMS_COLLECTION, ps.problemId);
      batch.set(psRef, ps, { merge: true });
    });
    await batch.commit();
  } catch (err) {
    console.warn('Problem statements seed warning:', err);
  }
}

// --- Team Lead Access Code Validation & Unlocking ---

import { findDomainUnlockConfig, DomainUnlockConfig } from '../data/domainUnlockData';

export interface AccessCodeValidationResult {
  isValid: boolean;
  isDomainUnlock?: boolean;
  domainConfig?: DomainUnlockConfig | null;
  team?: TeamRecord;
  problemStatement?: ProblemStatementDetailed | null;
  allDomainProblems?: ProblemStatementDetailed[];
  message: string;
  isLive: boolean;
}

export async function validateTeamLeadAccessCode(
  rawInput: string
): Promise<AccessCodeValidationResult> {
  const cleanInput = rawInput.trim().toUpperCase();

  // First fetch latest system settings
  const settings = await fetchSystemSettings();
  const isLive = settings.isProblemStatementsLive;

  // 0. Check if input is a specific Domain Unlock Passkey
  const matchedDomain = findDomainUnlockConfig(rawInput);
  if (matchedDomain) {
    const domainProblems = matchedDomain.id === 'open-innovation'
      ? []
      : INITIAL_PROBLEM_STATEMENTS.filter((ps) => ps.domainId === matchedDomain.id);

    const vipTeam: TeamRecord = {
      id: `vip-${matchedDomain.code.toLowerCase()}`,
      teamId: `HH26-VIP-${matchedDomain.code}`,
      teamNumber: 1,
      teamName: `VIP Delegate [${matchedDomain.name}]`,
      domainId: matchedDomain.id,
      domainName: matchedDomain.name,
      collegeName: "HackHertz 2026 Arena",
      accessCode: matchedDomain.primaryPasskey,
      teamLead: {
        name: "Honored Innovator",
        email: "vip.innovator@hackhertz.in"
      },
      members: [
        { name: "Team Lead / Innovator", email: "lead@hackhertz.in", role: "Lead" },
        { name: "Co-Developer", email: "dev1@hackhertz.in", role: "Member" },
        { name: "Systems Engineer", email: "dev2@hackhertz.in", role: "Member" },
        { name: "Designer / Presenter", email: "dev3@hackhertz.in", role: "Member" }
      ],
      hasUnlocked: true,
      unlockedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    return {
      isValid: true,
      isDomainUnlock: true,
      domainConfig: matchedDomain,
      team: vipTeam,
      problemStatement: domainProblems.length > 0 ? domainProblems[0] : null,
      allDomainProblems: domainProblems,
      message: `Celebrity VIP Clearance Granted! Unlocking ${matchedDomain.name} Problem Statements live now!`,
      isLive: true
    };
  }

  // Search in memory / Firestore
  let matchedTeam: TeamRecord | undefined = undefined;

  // 1. Direct query in Firestore by accessCode or teamLead.email or teamId
  try {
    const teamsCol = collection(db, TEAMS_COLLECTION);
    const qCode = query(teamsCol, where('accessCode', '==', cleanInput));
    const snapCode = await getDocs(qCode);

    if (!snapCode.empty) {
      matchedTeam = { ...snapCode.docs[0].data(), id: snapCode.docs[0].id } as TeamRecord;
    } else {
      // Check if input is an email address
      const qEmail = query(teamsCol, where('teamLead.email', '==', rawInput.trim().toLowerCase()));
      const snapEmail = await getDocs(qEmail);
      if (!snapEmail.empty) {
        matchedTeam = { ...snapEmail.docs[0].data(), id: snapEmail.docs[0].id } as TeamRecord;
      }
    }
  } catch (e) {
    console.warn('Firestore query error, checking local cache:', e);
  }

  // 2. Fallback to local cache search
  if (!matchedTeam) {
    matchedTeam = localTeamsCache.find(
      (t) =>
        t.accessCode.toUpperCase() === cleanInput ||
        t.teamId.toUpperCase() === cleanInput ||
        t.teamLead.email.toLowerCase() === rawInput.trim().toLowerCase()
    );
  }

  if (!matchedTeam) {
    return {
      isValid: false,
      message: 'Invalid Access Code. Please check the code provided to your Team Lead.',
      isLive
    };
  }

  // Mark team as unlocked in Firestore
  if (!matchedTeam.hasUnlocked) {
    matchedTeam.hasUnlocked = true;
    matchedTeam.unlockedAt = new Date().toISOString();
    try {
      const teamDocRef = doc(db, TEAMS_COLLECTION, matchedTeam.teamId);
      await updateDoc(teamDocRef, {
        hasUnlocked: true,
        unlockedAt: matchedTeam.unlockedAt
      });
    } catch (err) {
      console.warn('Could not update unlock status in Firestore:', err);
    }
  }

  // Check if team is in Open Innovation domain
  const isOpenInnovation =
    matchedTeam?.domainId === 'open-innovation' ||
    matchedTeam?.domainName.toLowerCase().includes('open');

  // Find problem statements for this team's domain (none for Open Innovation)
  const domainProblems = isOpenInnovation
    ? []
    : INITIAL_PROBLEM_STATEMENTS.filter(
        (ps) => ps.domainId === matchedTeam?.domainId || ps.domainName.toLowerCase() === matchedTeam?.domainName.toLowerCase()
      );

  return {
    isValid: true,
    team: matchedTeam,
    problemStatement: isOpenInnovation ? null : (domainProblems[0] || null),
    allDomainProblems: domainProblems,
    message: isOpenInnovation
      ? `Access Granted! Welcome Team "${matchedTeam.teamName}". Open Innovation track (Open Theme — No pre-assigned problem statement) unlocked!`
      : `Access Granted! Welcome Team "${matchedTeam.teamName}".`,
    isLive
  };
}

// --- Problem Statements Retrieval ---

export async function fetchProblemStatements(domainId?: string): Promise<ProblemStatementDetailed[]> {
  try {
    const colRef = collection(db, PROBLEMS_COLLECTION);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const list: ProblemStatementDetailed[] = [];
      snap.forEach((d) => list.push(d.data() as ProblemStatementDetailed));
      if (domainId) {
        return list.filter((p) => p.domainId === domainId);
      }
      return list;
    }
  } catch (err) {
    console.warn('Fetching problem statements from Firestore fallback:', err);
  }

  if (domainId) {
    return INITIAL_PROBLEM_STATEMENTS.filter((p) => p.domainId === domainId);
  }
  return INITIAL_PROBLEM_STATEMENTS;
}

// --- System Settings Management ---

export async function fetchSystemSettings(): Promise<SystemSettingsRecord> {
  try {
    const docRef = doc(db, SYSTEM_COLLECTION, 'global');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      localSystemSettings = docSnap.data() as SystemSettingsRecord;
      return localSystemSettings;
    }
  } catch (err) {
    console.warn('System settings fetch error:', err);
  }
  return localSystemSettings;
}

export function subscribeToSystemSettings(callback: (settings: SystemSettingsRecord) => void): () => void {
  try {
    const docRef = doc(db, SYSTEM_COLLECTION, 'global');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as SystemSettingsRecord;
          localSystemSettings = data;
          callback(data);
        } else {
          callback(localSystemSettings);
        }
      },
      (err) => {
        console.warn('Settings subscription error:', err);
        callback(localSystemSettings);
      }
    );
  } catch (e) {
    callback(localSystemSettings);
    return () => {};
  }
}

export async function updateSystemSettings(
  partial: Partial<SystemSettingsRecord>
): Promise<SystemSettingsRecord> {
  const updated: SystemSettingsRecord = {
    ...localSystemSettings,
    ...partial,
    lastSyncedAt: new Date().toISOString()
  };
  localSystemSettings = updated;

  try {
    const docRef = doc(db, SYSTEM_COLLECTION, 'global');
    await setDoc(docRef, updated, { merge: true });
  } catch (err) {
    console.warn('Error updating system settings in Firestore:', err);
  }

  return updated;
}

// --- Google Sheet & CSV Import Parser ---

export interface ParsedGoogleSheetRow {
  teamName?: string;
  domain?: string;
  collegeName?: string;
  leadName?: string;
  leadEmail?: string;
  leadPhone?: string;
  member2Name?: string;
  member2Email?: string;
  member3Name?: string;
  member3Email?: string;
  member4Name?: string;
  member4Email?: string;
  [key: string]: any;
}

export function parseRawGoogleSheetData(rawText: string): TeamRecord[] {
  // Supports CSV, TSV (copy paste from Google Sheet), or JSON format
  const clean = rawText.trim();
  if (clean.startsWith('[') && clean.endsWith(']')) {
    try {
      const jsonArr = JSON.parse(clean);
      return convertRowsToTeams(jsonArr);
    } catch (e) {
      // Fall through to delimiter parser
    }
  }

  // Parse lines (handles comma or tab delimiter)
  const lines = clean.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('Google Sheet / CSV data must have at least a header row and 1 data row.');
  }

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = lines[0].split(delimiter).map((h) => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));

  const parsedRows: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map((c) => c.trim().replace(/^["']|["']$/g, ''));
    const rowObj: any = {};
    headers.forEach((h, idx) => {
      rowObj[h] = cols[idx] || '';
    });
    parsedRows.push(rowObj);
  }

  return convertRowsToTeams(parsedRows);
}

function convertRowsToTeams(rows: any[]): TeamRecord[] {
  const teams: TeamRecord[] = [];

  rows.forEach((row, idx) => {
    const teamNum = idx + 1;
    const padNum = String(teamNum).padStart(3, '0');
    const teamId = `HH26-TEAM-${padNum}`;

    // Smart Column Matchers
    const teamName =
      row.teamname ||
      row.team ||
      row.name ||
      row['team name'] ||
      `Team Innovators ${teamNum}`;

    const rawDomain = (
      row.domain ||
      row.track ||
      row.category ||
      row.theme ||
      'AI / ML'
    ).toString();

    // Map domain to config
    const matchedDomain =
      DOMAINS_CONFIG.find(
        (d) =>
          rawDomain.toLowerCase().includes(d.code.toLowerCase()) ||
          rawDomain.toLowerCase().includes(d.id.toLowerCase()) ||
          d.name.toLowerCase().includes(rawDomain.toLowerCase())
      ) || DOMAINS_CONFIG[teamNum % DOMAINS_CONFIG.length];

    const college =
      row.college ||
      row.collegename ||
      row.institution ||
      row.university ||
      'Shree Swaminarayan Institute of Technology (SSIT)';

    // Team Lead
    const leadName =
      row.leadname ||
      row.teamleadname ||
      row.teamlead ||
      row.leadername ||
      row.member1name ||
      row.name ||
      `Lead ${teamNum}`;

    const leadEmail = (
      row.leademail ||
      row.teamleademail ||
      row.email ||
      row.leaderemail ||
      row.member1email ||
      `lead${teamNum}@hackhertz.edu`
    ).toLowerCase();

    const leadPhone =
      row.leadphone ||
      row.phone ||
      row.contact ||
      row.mobile ||
      `+91 ${9800000000 + teamNum}`;

    const accessCode = generateAccessCode(matchedDomain.code, teamNum);

    const members: TeamMember[] = [
      {
        name: leadName,
        email: leadEmail,
        role: 'Lead',
        phone: leadPhone,
        collegeName: college
      }
    ];

    // Member 2
    const m2Name = row.member2name || row.member2 || row.participant2 || `Member 2 (Team ${teamNum})`;
    const m2Email = (row.member2email || row.m2email || `m2_team${teamNum}@hackhertz.edu`).toLowerCase();
    members.push({ name: m2Name, email: m2Email, role: 'Member', collegeName: college });

    // Member 3
    const m3Name = row.member3name || row.member3 || row.participant3 || `Member 3 (Team ${teamNum})`;
    const m3Email = (row.member3email || row.m3email || `m3_team${teamNum}@hackhertz.edu`).toLowerCase();
    members.push({ name: m3Name, email: m3Email, role: 'Member', collegeName: college });

    // Member 4
    const m4Name = row.member4name || row.member4 || row.participant4 || `Member 4 (Team ${teamNum})`;
    const m4Email = (row.member4email || row.m4email || `m4_team${teamNum}@hackhertz.edu`).toLowerCase();
    members.push({ name: m4Name, email: m4Email, role: 'Member', collegeName: college });

    teams.push({
      teamId,
      teamNumber: teamNum,
      teamName,
      domainId: matchedDomain.id,
      domainName: matchedDomain.name,
      collegeName: college,
      accessCode,
      teamLead: {
        name: leadName,
        email: leadEmail,
        phone: leadPhone
      },
      members,
      hasUnlocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  });

  return teams;
}

// Bulk Upload & Sync Teams into Firebase + Auto-Sync Authorized Certificate Whitelist
export async function syncCustomTeamsToFirebase(
  teams: TeamRecord[],
  onProgress?: (current: number, total: number) => void
): Promise<{ success: boolean; count: number; message: string }> {
  try {
    const batchSize = 25;
    let saved = 0;

    for (let i = 0; i < teams.length; i += batchSize) {
      const chunk = teams.slice(i, i + batchSize);
      const batch = writeBatch(db);

      for (const team of chunk) {
        const teamRef = doc(db, TEAMS_COLLECTION, team.teamId);
        batch.set(teamRef, team, { merge: true });

        // Auto-whitelist each member for Certificates
        team.members.forEach((member) => {
          const emailSlug = member.email.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const pRef = doc(db, PARTICIPANTS_COLLECTION, emailSlug);
          batch.set(
            pRef,
            {
              email: member.email.toLowerCase().trim(),
              name: member.name,
              teamName: team.teamName,
              collegeName: team.collegeName,
              domain: team.domainName,
              category: 'Participation',
              teamId: team.teamId,
              role: member.role,
              addedAt: new Date().toISOString()
            },
            { merge: true }
          );
        });
      }

      await batch.commit();
      saved += chunk.length;
      if (onProgress) {
        onProgress(saved, teams.length);
      }
    }

    localTeamsCache = teams;

    // Update global settings
    const systemDocRef = doc(db, SYSTEM_COLLECTION, 'global');
    await setDoc(
      systemDocRef,
      {
        totalTeams: teams.length,
        totalParticipants: teams.length * 4,
        lastSyncedAt: new Date().toISOString()
      },
      { merge: true }
    );

    return {
      success: true,
      count: teams.length,
      message: `Successfully synchronized ${teams.length} teams (${teams.length * 4} participants) to Firebase Firestore and updated Certificate Whitelist!`
    };
  } catch (error: any) {
    console.error('Error syncing custom teams to Firebase:', error);
    return {
      success: false,
      count: 0,
      message: error?.message || 'Sync failed.'
    };
  }
}

// Export Teams to CSV string for downloading by organizers
export function exportTeamsToCsv(teams: TeamRecord[]): string {
  const headers = [
    'Team ID',
    'Team Number',
    'Team Name',
    'Domain / Track',
    'College Name',
    'Team Lead Name',
    'Team Lead Email',
    'Team Lead Phone',
    'Unique Access Code (For PS)',
    'Member 2 Name',
    'Member 2 Email',
    'Member 3 Name',
    'Member 3 Email',
    'Member 4 Name',
    'Member 4 Email',
    'Has Unlocked PS',
    'Unlocked At'
  ];

  const rows = teams.map((t) => {
    const m1 = t.members[0] || { name: '', email: '', phone: '' };
    const m2 = t.members[1] || { name: '', email: '' };
    const m3 = t.members[2] || { name: '', email: '' };
    const m4 = t.members[3] || { name: '', email: '' };

    return [
      `"${t.teamId}"`,
      t.teamNumber,
      `"${t.teamName.replace(/"/g, '""')}"`,
      `"${t.domainName}"`,
      `"${t.collegeName.replace(/"/g, '""')}"`,
      `"${m1.name.replace(/"/g, '""')}"`,
      `"${m1.email}"`,
      `"${m1.phone || ''}"`,
      `"${t.accessCode}"`,
      `"${m2.name.replace(/"/g, '""')}"`,
      `"${m2.email}"`,
      `"${m3.name.replace(/"/g, '""')}"`,
      `"${m3.email}"`,
      `"${m4.name.replace(/"/g, '""')}"`,
      `"${m4.email}"`,
      t.hasUnlocked ? 'YES' : 'NO',
      `"${t.unlockedAt || 'Not yet'}"`
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

// --- Team Individual CRUD Functions for Admin Portal ---

// Update existing team (team name, domain, college, team lead info, all members)
export async function updateTeamRecord(
  teamId: string,
  updatedData: Partial<TeamRecord>
): Promise<{ success: boolean; message: string; team?: TeamRecord }> {
  try {
    const existingIndex = localTeamsCache.findIndex((t) => t.teamId === teamId);
    const existingTeam = existingIndex !== -1 ? localTeamsCache[existingIndex] : null;

    const mergedTeam: TeamRecord = {
      ...(existingTeam || {} as TeamRecord),
      ...updatedData,
      teamId,
      updatedAt: new Date().toISOString()
    };

    // Update in Firestore
    const teamDocRef = doc(db, TEAMS_COLLECTION, teamId);
    await setDoc(teamDocRef, mergedTeam, { merge: true });

    // Update in local cache
    if (existingIndex !== -1) {
      localTeamsCache[existingIndex] = mergedTeam;
    } else {
      localTeamsCache.push(mergedTeam);
    }

    // Auto-update participants whitelist for certificates with new emails & names
    if (mergedTeam.members && mergedTeam.members.length > 0) {
      const batch = writeBatch(db);
      mergedTeam.members.forEach((member) => {
        if (member.email && member.email.trim()) {
          const emailSlug = member.email.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const pRef = doc(db, PARTICIPANTS_COLLECTION, emailSlug);
          batch.set(
            pRef,
            {
              email: member.email.toLowerCase().trim(),
              name: member.name || '',
              teamName: mergedTeam.teamName,
              collegeName: mergedTeam.collegeName,
              domain: mergedTeam.domainName,
              category: 'Participation',
              teamId: mergedTeam.teamId,
              role: member.role || 'Member',
              updatedAt: new Date().toISOString()
            },
            { merge: true }
          );
        }
      });
      await batch.commit();
    }

    return {
      success: true,
      message: `Team "${mergedTeam.teamName}" details updated successfully in Firebase Firestore!`,
      team: mergedTeam
    };
  } catch (err: any) {
    console.error('Error updating team record:', err);
    // Still update local cache so admin changes reflect immediately in UI
    const existingIndex = localTeamsCache.findIndex((t) => t.teamId === teamId);
    if (existingIndex !== -1) {
      localTeamsCache[existingIndex] = {
        ...localTeamsCache[existingIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      return {
        success: true,
        message: `Team updated in local session (Firestore offline mode).`,
        team: localTeamsCache[existingIndex]
      };
    }
    return {
      success: false,
      message: err?.message || 'Failed to update team record.'
    };
  }
}

// Create a new team
export async function createTeamRecord(
  newTeam: TeamRecord
): Promise<{ success: boolean; message: string; team?: TeamRecord }> {
  try {
    const teamDocRef = doc(db, TEAMS_COLLECTION, newTeam.teamId);
    await setDoc(teamDocRef, newTeam, { merge: true });

    localTeamsCache.push(newTeam);
    localTeamsCache.sort((a, b) => (a.teamNumber || 0) - (b.teamNumber || 0));

    // Whitelist members for certificates
    const batch = writeBatch(db);
    newTeam.members.forEach((member) => {
      if (member.email && member.email.trim()) {
        const emailSlug = member.email.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const pRef = doc(db, PARTICIPANTS_COLLECTION, emailSlug);
        batch.set(
          pRef,
          {
            email: member.email.toLowerCase().trim(),
            name: member.name,
            teamName: newTeam.teamName,
            collegeName: newTeam.collegeName,
            domain: newTeam.domainName,
            category: 'Participation',
            teamId: newTeam.teamId,
            role: member.role,
            addedAt: new Date().toISOString()
          },
          { merge: true }
        );
      }
    });
    await batch.commit();

    return {
      success: true,
      message: `New Team "${newTeam.teamName}" added successfully with ID ${newTeam.teamId}!`,
      team: newTeam
    };
  } catch (err: any) {
    console.error('Error creating team record:', err);
    localTeamsCache.push(newTeam);
    return {
      success: true,
      message: `Team added to local session (Firestore offline mode).`,
      team: newTeam
    };
  }
}

// Delete a team
export async function deleteTeamRecord(
  teamId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const teamDocRef = doc(db, TEAMS_COLLECTION, teamId);
    await deleteDoc(teamDocRef);

    localTeamsCache = localTeamsCache.filter((t) => t.teamId !== teamId);

    return {
      success: true,
      message: `Team ${teamId} has been deleted successfully.`
    };
  } catch (err: any) {
    console.error('Error deleting team record:', err);
    localTeamsCache = localTeamsCache.filter((t) => t.teamId !== teamId);
    return {
      success: true,
      message: `Team deleted from local session.`
    };
  }
}

// Regenerate Access Code for a team
export async function regenerateTeamAccessCode(
  teamId: string,
  domainCode: string,
  teamNumber: number
): Promise<{ success: boolean; newCode: string; message: string }> {
  const randomSalt = Math.floor(1000 + Math.random() * 9000);
  const padNum = String(teamNumber).padStart(3, '0');
  const newCode = `HH26-${domainCode}-${padNum}-${randomSalt}`;

  const res = await updateTeamRecord(teamId, { accessCode: newCode });
  if (res.success) {
    return {
      success: true,
      newCode,
      message: `Generated new access code: ${newCode}`
    };
  }
  return {
    success: false,
    newCode: '',
    message: 'Could not regenerate access code.'
  };
}

// Toggle Team Unlocked state
export async function toggleTeamUnlock(
  teamId: string,
  hasUnlocked: boolean
): Promise<{ success: boolean; message: string }> {
  const res = await updateTeamRecord(teamId, {
    hasUnlocked,
    unlockedAt: hasUnlocked ? new Date().toISOString() : null
  });
  return {
    success: res.success,
    message: hasUnlocked ? 'Team marked as Unlocked.' : 'Team marked as Locked.'
  };
}

