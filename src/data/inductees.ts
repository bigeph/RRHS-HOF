import inducteesData from './inductees.json';

export interface Inductee {
  id: string;
  name: string;
  year: number; // Induction Year
  graduationYear?: number;
  sports: string[];
  isTeam?: boolean;
  isCoach?: boolean;
  bio?: string;
  image?: string;
  allConference?: string[];
  allState?: string[];
  allConferenceHonorableMention?: string[];
  allStateHonorableMention?: string[];
  gallery?: string[];
}

export const inductees: Inductee[] = inducteesData as Inductee[];
