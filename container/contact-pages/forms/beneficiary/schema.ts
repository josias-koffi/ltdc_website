import { z } from "zod";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const dayjsField = z.custom<Dayjs>(
  (v) => !!v && typeof (v as Dayjs).isValid === "function" && (v as Dayjs).isValid(),
  { message: "Date invalide" },
);

const yesNo = z.enum(["oui", "non"]);

export const beneficiarySchema = z
  .object({
    beneficiarySpecificField: z.string().default(""),
    name: z.string().min(2, "Nom requis"),
    firstName: z.string().min(2, "Prénom requis"),
    birthday: dayjsField,
    nationality: z.array(z.string()).min(1, "Sélectionnez une nationalité"),
    gender: z.enum(["homme", "femme", "autre"]),
    familySituation: z.enum(["célibataire", "marié(e)", "autre"]),
    otherFamilySituation: z.string().default(""),
    adress: z.string().min(2, "Adresse requise"),
    phoneNumber: z.string().min(6, "Numéro invalide"),
    email: z.string().email("Email invalide"),
    dateArrived: dayjsField,
    oqtf: yesNo,
    oqtfReceptionDate: dayjsField.nullable().optional(),
    residentPermitPending: yesNo,
    residentPermitRequestDate: dayjsField.nullable().optional(),
    actualStatut: z.string().min(2, "Statut requis"),
    degree: z.string().min(1, "Niveau d'études requis"),
    formationInProgress: yesNo,
    formationPrecision: z.string().default(""),
    working: yesNo,
    workTitle: z.string().default(""),
    cddOrInterim: yesNo,
    workProof: yesNo,
    stablePlace: yesNo,
    helpForSearchPlace: yesNo,
    familyInFrance: yesNo,
    familyLink: z.string().default(""),
    moreInfo: z.string().default(""),
    consent: z.literal(true, { message: "Le consentement est requis" }),
  })
  .superRefine((data, ctx) => {
    if (data.familySituation === "autre" && !data.otherFamilySituation.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["otherFamilySituation"],
        message: "Précisez votre situation familiale",
      });
    }
    if (data.oqtf === "oui" && (!data.oqtfReceptionDate || !data.oqtfReceptionDate.isValid())) {
      ctx.addIssue({
        code: "custom",
        path: ["oqtfReceptionDate"],
        message: "Date de réception requise",
      });
    }
    if (
      data.residentPermitPending === "oui" &&
      (!data.residentPermitRequestDate || !data.residentPermitRequestDate.isValid())
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["residentPermitRequestDate"],
        message: "Date de demande requise",
      });
    }
    if (data.formationInProgress === "oui" && !data.formationPrecision.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["formationPrecision"],
        message: "Précisez votre formation",
      });
    }
    if (data.working === "oui" && !data.workTitle.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["workTitle"],
        message: "Indiquez votre poste",
      });
    }
    if (data.familyInFrance === "oui" && !data.familyLink.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["familyLink"],
        message: "Précisez le lien familial",
      });
    }
  });

export type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>;

export const beneficiaryDefaults: BeneficiaryFormValues = {
  beneficiarySpecificField: "",
  name: "",
  firstName: "",
  birthday: dayjs("2000-01-01"),
  nationality: [],
  gender: "femme",
  familySituation: "célibataire",
  otherFamilySituation: "",
  adress: "",
  phoneNumber: "",
  email: "",
  dateArrived: dayjs().subtract(1, "year"),
  oqtf: "non",
  oqtfReceptionDate: null,
  residentPermitPending: "non",
  residentPermitRequestDate: null,
  actualStatut: "",
  degree: "",
  formationInProgress: "non",
  formationPrecision: "",
  working: "non",
  workTitle: "",
  cddOrInterim: "non",
  workProof: "non",
  stablePlace: "non",
  helpForSearchPlace: "non",
  familyInFrance: "non",
  familyLink: "",
  moreInfo: "",
  consent: false as unknown as true,
};

export const YES_NO_OPTIONS = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
];
