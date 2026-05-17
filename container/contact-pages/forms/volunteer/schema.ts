import { z } from "zod";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { EmailSubjectEnum } from "@/libs/interfaces/Interfaces";

const dayjsField = z.custom<Dayjs>(
  (v) => !!v && typeof (v as Dayjs).isValid === "function" && (v as Dayjs).isValid(),
  { message: "Date invalide" },
);

export const volunteerSchema = z.object({
  volunteerSpecificField: z.string().default(""),
  subjectChoice: z.enum([
    EmailSubjectEnum.Demande_de_volontariat,
    EmailSubjectEnum.Demande_de_pour_la_maraude,
  ]),
  name: z.string().min(2, "Nom requis"),
  firstName: z.string().min(2, "Prénom requis"),
  birthday: dayjsField,
  nationality: z.string().min(1, "Nationalité requise"),
  adresse: z.string().min(2, "Adresse requise"),
  phoneNumber: z.string().min(6, "Numéro invalide"),
  email: z.string().email("Email invalide"),
  days: z.array(z.string()).min(1, "Sélectionnez au moins un jour"),
  skills: z.string().min(5, "Décrivez vos compétences"),
  experiences: z.string().min(5, "Décrivez vos expériences"),
  motivation: z.string().min(10, "Détaillez votre motivation"),
  consent: z.literal(true, { message: "Le consentement est requis" }),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;

export const volunteerDefaults: VolunteerFormValues = {
  volunteerSpecificField: "",
  subjectChoice: EmailSubjectEnum.Demande_de_volontariat,
  name: "",
  firstName: "",
  birthday: dayjs("2000-01-01"),
  nationality: "",
  adresse: "",
  phoneNumber: "",
  email: "",
  days: [],
  skills: "",
  experiences: "",
  motivation: "",
  consent: false as unknown as true,
};
