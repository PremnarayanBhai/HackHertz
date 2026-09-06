import { AuthorizedParticipant, CertificateRecord, CertificateVerificationResult } from '../types';
import { INITIAL_AUTHORIZED_PARTICIPANTS, INITIAL_ISSUED_CERTIFICATES } from '../data/certificateData';
import { generateInitial100Teams } from '../data/teamSeedData';

const STORAGE_KEYS = {
  AUTHORIZED_PARTICIPANTS: 'hackhertz_authorized_participants_v2',
  ISSUED_CERTIFICATES: 'hackhertz_issued_certificates_v2',
};

// Generate default 400 authorized participants from 100 teams
function getDefaultAllParticipants(): AuthorizedParticipant[] {
  const base = [...INITIAL_AUTHORIZED_PARTICIPANTS];
  const teams = generateInitial100Teams();
  
  teams.forEach((t) => {
    t.members.forEach((m) => {
      if (!base.some((b) => b.email.toLowerCase() === m.email.toLowerCase())) {
        base.push({
          email: m.email.toLowerCase(),
          name: m.name,
          teamName: t.teamName,
          collegeName: t.collegeName,
          domain: t.domainName,
          category: 'Participation',
          addedAt: t.createdAt,
        });
      }
    });
  });

  return base;
}

// Generate deterministic-looking yet random short hex code
function generateCertificateId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HH26-CERT-${randomPart}`;
}

// Generate simple verification hash
function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0') + Math.random().toString(16).substring(2, 10);
}

export const certificateStorage = {
  // 1. Authorized Participants
  getAuthorizedParticipants(): AuthorizedParticipant[] {
    if (typeof window === 'undefined') return getDefaultAllParticipants();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS);
      if (!stored) {
        const defaults = getDefaultAllParticipants();
        localStorage.setItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS, JSON.stringify(defaults));
        return defaults;
      }
      return JSON.parse(stored);
    } catch {
      return getDefaultAllParticipants();
    }
  },

  addAuthorizedParticipant(participant: AuthorizedParticipant): boolean {
    try {
      const current = this.getAuthorizedParticipants();
      const normalizedEmail = participant.email.trim().toLowerCase();
      
      const exists = current.some(p => p.email.trim().toLowerCase() === normalizedEmail);
      if (exists) return false;

      const updated = [
        ...current,
        {
          ...participant,
          email: normalizedEmail,
          addedAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  },

  addBatchAuthorizedParticipants(emails: string[], defaultDomain: string = 'General Track'): number {
    try {
      const current = this.getAuthorizedParticipants();
      const currentEmailsSet = new Set(current.map(p => p.email.trim().toLowerCase()));
      let addedCount = 0;

      const newParticipants: AuthorizedParticipant[] = [];
      for (const emailRaw of emails) {
        const email = emailRaw.trim().toLowerCase();
        if (email && email.includes('@') && !currentEmailsSet.has(email)) {
          currentEmailsSet.add(email);
          newParticipants.push({
            email,
            domain: defaultDomain,
            category: 'Participation',
            addedAt: new Date().toISOString(),
          });
          addedCount++;
        }
      }

      if (newParticipants.length > 0) {
        const updated = [...current, ...newParticipants];
        localStorage.setItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS, JSON.stringify(updated));
      }

      return addedCount;
    } catch {
      return 0;
    }
  },

  removeAuthorizedParticipant(email: string): boolean {
    try {
      const current = this.getAuthorizedParticipants();
      const normalizedEmail = email.trim().toLowerCase();
      const updated = current.filter(p => p.email.trim().toLowerCase() !== normalizedEmail);
      localStorage.setItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  },

  isEmailAuthorized(email: string): { authorized: boolean; participant?: AuthorizedParticipant } {
    const participants = this.getAuthorizedParticipants();
    const normalizedEmail = email.trim().toLowerCase();
    const participant = participants.find(p => p.email.trim().toLowerCase() === normalizedEmail);
    return {
      authorized: !!participant,
      participant,
    };
  },

  // 2. Issued Certificates
  getAllIssuedCertificates(): CertificateRecord[] {
    if (typeof window === 'undefined') return INITIAL_ISSUED_CERTIFICATES;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ISSUED_CERTIFICATES);
      if (!stored) {
        localStorage.setItem(
          STORAGE_KEYS.ISSUED_CERTIFICATES,
          JSON.stringify(INITIAL_ISSUED_CERTIFICATES)
        );
        return INITIAL_ISSUED_CERTIFICATES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_ISSUED_CERTIFICATES;
    }
  },

  getCertificateByEmail(email: string): CertificateRecord | undefined {
    const all = this.getAllIssuedCertificates();
    const normalizedEmail = email.trim().toLowerCase();
    return all.find(c => c.recipientEmail.trim().toLowerCase() === normalizedEmail);
  },

  getCertificateById(certificateId: string): CertificateRecord | undefined {
    const all = this.getAllIssuedCertificates();
    const normalizedId = certificateId.trim().toUpperCase();
    return all.find(c => c.certificateId.trim().toUpperCase() === normalizedId);
  },

  issueCertificate(params: {
    name: string;
    email: string;
    domain?: string;
  }): {
    success: boolean;
    error?: 'UNAUTHORIZED_EMAIL' | 'ALREADY_ISSUED' | 'INVALID_INPUT' | 'STORAGE_ERROR';
    certificate?: CertificateRecord;
    message?: string;
  } {
    const normalizedEmail = params.email.trim().toLowerCase();
    const cleanName = params.name.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'INVALID_INPUT', message: 'Please enter a valid full name.' };
    }

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return { success: false, error: 'INVALID_INPUT', message: 'Please enter a valid email address.' };
    }

    // Step 1: Check authorization
    const authCheck = this.isEmailAuthorized(normalizedEmail);
    if (!authCheck.authorized) {
      return {
        success: false,
        error: 'UNAUTHORIZED_EMAIL',
        message: `The email "${normalizedEmail}" is not found in the HackHertz 2026 registered participants list. Please check the email provided by your team lead.`,
      };
    }

    // Step 2: Check if already issued (STRICT: One certificate per email)
    const existing = this.getCertificateByEmail(normalizedEmail);
    if (existing) {
      return {
        success: false,
        error: 'ALREADY_ISSUED',
        certificate: existing,
        message: `A certificate has already been issued for ${normalizedEmail} on ${existing.issueDateFormatted} under the name "${existing.recipientName}".`,
      };
    }

    // Step 3: Generate new certificate
    try {
      const now = new Date();
      const certificateId = generateCertificateId();
      const participant = authCheck.participant;

      const newRecord: CertificateRecord = {
        certificateId,
        recipientName: cleanName,
        recipientEmail: normalizedEmail,
        issuedAt: now.toISOString(),
        issueDateFormatted: now.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        domain: params.domain || participant?.domain || 'AI & Machine Learning',
        category: participant?.category || 'Participation',
        teamName: participant?.teamName,
        collegeName: participant?.collegeName || 'Shree Swaminarayan Institute of Technology (SSIT)',
        verificationHash: generateHash(`${certificateId}_${normalizedEmail}_${cleanName}`),
      };

      const all = this.getAllIssuedCertificates();
      const updated = [newRecord, ...all];
      localStorage.setItem(STORAGE_KEYS.ISSUED_CERTIFICATES, JSON.stringify(updated));

      return {
        success: true,
        certificate: newRecord,
        message: 'Certificate successfully generated and verified!',
      };
    } catch {
      return {
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Unable to save certificate. Please try again.',
      };
    }
  },

  // 3. Verification
  verify(query: string): CertificateVerificationResult {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { isValid: false, message: 'Please enter a Certificate ID or registered Email ID.' };
    }

    // Try finding by Certificate ID first
    let cert = this.getCertificateById(cleanQuery);

    // If not found, try by Email
    if (!cert && cleanQuery.includes('@')) {
      cert = this.getCertificateByEmail(cleanQuery);
    }

    if (cert) {
      return {
        isValid: true,
        certificate: cert,
        message: 'Official Certificate Verified & Valid.',
      };
    }

    return {
      isValid: false,
      message: `No active HackHertz certificate found matching "${cleanQuery}".`,
    };
  },

  // 4. Reset / Admin
  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    const defaults = getDefaultAllParticipants();
    localStorage.setItem(STORAGE_KEYS.AUTHORIZED_PARTICIPANTS, JSON.stringify(defaults));
    localStorage.setItem(STORAGE_KEYS.ISSUED_CERTIFICATES, JSON.stringify(INITIAL_ISSUED_CERTIFICATES));
  },
};
