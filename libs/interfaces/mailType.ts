import { Dayjs } from "dayjs";

export interface MailSubjectInterface {
  subject:
    | "Demande de bénéficiaire"
    | "Demande de partenariat"
    | "Demande de volontariat"
    | "Demande de général";
}

export interface ContactInfoInterface {
  subject: SubjectStateInterface | undefined;
  name: string;
  email: string | undefined;
  message: string | undefined;
  company: string | undefined;
  consent: boolean;
}

export interface SubjectStateInterface {
  id: number;
  image: string;
  subject: string;
}

export interface BeneficiaryShipFormInterface {
  name: string;
  firstName: string;
  adresse: string;
  phoneNumber: string;
  email: string;
  birthday: string | Dayjs;
  nationality: string[];
  statut: string;
  dateArrived: string | Dayjs;
  object: string;
  message: string;
  consent: boolean;
}

export interface SponsorShipFormInterface {
  name: string;
  firstName: string;
  adresse: string;
  phoneNumber: number | string;
  email: string;
  organization: string;
  sector: string;
  organizationAddress: string;
  organizationPhone: string;
  organizationEmail: string;
  motivation: string;
  partnershipType: string;
  skillsAndRessources: string;
  partnershipExperiences: string;
  consent: boolean;
}

export interface VolunteerShipFormInterface {
  name: string;
  firstName: string;
  birthday: string | Dayjs;
  nationality: string;
  adresse: string;
  phoneNumber: number | string;
  email: string;
  statut: string;
  object: string;
  message: string;
  days: Array<
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche"
  > | null;
  motivation: string;
  experiences: string;
  skills: string;
  consent: boolean;
}
