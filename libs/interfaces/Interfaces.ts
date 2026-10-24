import { Dayjs } from "dayjs";

export type FormInterface =
  | BeneficiaryShipFormInterface
  | SponsorShipFormInterface
  | VolunteerShipFormInterface
  | ContactInfoInterface;

export enum EmailTemplateIdEnum {
  Automatic_response = 1,
  Reponse_automatique_maraude = 2,
  Reponse_Formulaire_Beneficiaire = 3,
}

export enum EmailSubjectEnum {
  Demande_de_beneficiaire = "Demande de bénéficiaire",
  Demande_de_partenariat = "Demande de partenariat",
  Demande_de_volontariat = "Demande de volontariat",
  Demande_de_general = "Demande de général",
  Confirmation_prise_de_contact = "Confirmation prise de contact",
  Demande_de_pour_la_maraude = "Demande de bénévolat pour la maraude",
}

export interface MailDataInterface {
  sender: { name: string; email: string };
  to: { name: string; email: string }[];
  subject: EmailSubjectEnum;
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
  /** Champs Directus explicites ; prioritaires sur deepFields. */
  fields?: string[];
  limit?: number;
  page?: number;
  filter?: any;
  sort?: string[];
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
    | "members"
    | "projects_targets"
    | "offer"
    | "emissions";
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
  contactSpecificField: string;
  subject: string;
  name: string;
  email: string;
  message: string;
  company: string;
  consent: boolean;
}

export interface BeneficiaryShipFormInterface {
  beneficiarySpecificField: string;
  name: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  birthday: string | Dayjs;
  nationality: string[];
  statut: string;
  dateArrived: string | Dayjs;
  object: string;
  consent: boolean;
  adress: string;
  gender: "homme" | "femme" | "autre";
  familySituation: "célibataire" | "marié(e)" | "autre";
  otherFamilySituation: string;
  oqtf: "oui" | "non";
  oqtfReceptionDate: string | Dayjs;
  residentPermitPending: "oui" | "non";
  residentPermitRequestDate: string | Dayjs;
  actualStatut: string;
  working: "oui" | "non";
  workTitle: string;
  cddOrInterim: "oui" | "non";
  workProof: "oui" | "non";
  degree: string;
  formationInProgress: "oui" | "non";
  formationPrecision: string;
  stablePlace: "oui" | "non";
  helpForSearchPlace: "oui" | "non";
  familyInFrance: "oui" | "non";
  familyLink: string;
  moreInfo: string;
}

export interface SponsorShipFormInterface {
  sponsorSpecificField: string;
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
  volunteerSpecificField: string;
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

export interface PartnerImageInterface {
  name: string;
  url: string;
  sourceName: string;
}
