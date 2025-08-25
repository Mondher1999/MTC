export interface Candidate {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialty: string;
    interest?: string;
    preferredLanguage?: 'en' | 'fr' | 'zh';
    status?: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'waitlist';
    submittedAt?: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
    notes?: string;
  }
  
  export interface CandidateFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialty: string;
    interest: string;
  }
  
  export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    specialty?: string;
    general?: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message?: string;
    candidateId?: string;
    error?: string;
    details?: string[];
  }
  