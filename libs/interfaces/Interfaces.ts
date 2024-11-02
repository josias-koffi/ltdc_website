import { Dayjs } from "dayjs";

export enum EmailTemplateIdEnum {
  Automatic_response = 1,
}

export interface MailDataInterface {
  sender: { name: string; email: string };
  to: { name: string; email: string }[];
  subject: MailSubjectInterface["subject"];
  templateId?: EmailTemplateIdEnum;
  params?:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface;
  htmlContent?: string;
}

export interface FetchProps {
  entity: EntityInterface["name"];
  deepFields?: boolean;
  limit?: number;
  page?: number;
  filter?: any;
}

export interface EntityInterface {
  name:
    | "terms_of_use"
    | "esf_program"
    | "actualities"
    | "categories"
    | "projects"
    | "events"
    | "targets"
    | "actualities_categories"
    | "actualities_targets"
    | "members";
}

export interface MailSubjectInterface {
  subject:
    | "Demande de bénéficiaire"
    | "Demande de partenariat"
    | "Demande de volontariat"
    | "Demande de général"
    | "Confirmation prise de contact";
}

export interface ContactInfoInterface {
  subject: SubjectStateInterface | undefined;
  name: string;
  email: string;
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
