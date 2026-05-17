import { z } from "zod";

export const generalSchema = z.object({
  contactSpecificField: z.string().default(""),
  subject: z.string().min(1, "Choisissez un sujet"),
  name: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Email invalide"),
  company: z.string().default(""),
  message: z.string().min(10, "Message trop court (10 caractères min)"),
  consent: z.literal(true, { message: "Le consentement est requis" }),
});

export type GeneralFormValues = z.infer<typeof generalSchema>;

export const generalDefaults: GeneralFormValues = {
  contactSpecificField: "",
  subject: "",
  name: "",
  email: "",
  company: "",
  message: "",
  consent: false as unknown as true,
};

export const GENERAL_SUBJECTS = [
  { value: "Question sur l'association", label: "Question sur l'association" },
  { value: "Question sur les offres", label: "Question sur les offres" },
  { value: "Autre sujet", label: "Autre sujet" },
];
