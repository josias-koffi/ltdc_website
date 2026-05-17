import { z } from "zod";

export const sponsorSchema = z.object({
  sponsorSpecificField: z.string().default(""),
  name: z.string().min(2, "Nom requis"),
  firstName: z.string().min(2, "Prénom requis"),
  adresse: z.string().min(2, "Adresse requise"),
  phoneNumber: z.string().min(6, "Numéro invalide"),
  email: z.string().email("Email invalide"),
  organization: z.string().min(2, "Nom de l'organisation requis"),
  sector: z.string().min(2, "Secteur d'activité requis"),
  organizationAddress: z.string().min(2, "Adresse requise"),
  organizationPhone: z.string().min(6, "Numéro invalide"),
  organizationEmail: z.string().email("Email invalide"),
  partnershipType: z.string().min(10, "Décrivez le type de partenariat"),
  skillsAndRessources: z.string().min(10, "Décrivez vos compétences et ressources"),
  partnershipExperiences: z.string().min(5, "Indiquez vos expériences (ou 'aucune')"),
  motivation: z.string().min(10, "Détaillez votre motivation"),
  consent: z.literal(true, { message: "Le consentement est requis" }),
});

export type SponsorFormValues = z.infer<typeof sponsorSchema>;

export const sponsorDefaults: SponsorFormValues = {
  sponsorSpecificField: "",
  name: "",
  firstName: "",
  adresse: "",
  phoneNumber: "",
  email: "",
  organization: "",
  sector: "",
  organizationAddress: "",
  organizationPhone: "",
  organizationEmail: "",
  partnershipType: "",
  skillsAndRessources: "",
  partnershipExperiences: "",
  motivation: "",
  consent: false as unknown as true,
};
