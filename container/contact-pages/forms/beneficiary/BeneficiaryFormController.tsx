"use client";
import React from "react";
import TypeformStepper from "../../stepper/TypeformStepper";
import type { StepDef } from "../../stepper/types";
import mailHandler from "@/services/email/EmailService";
import { transformDayjsFields } from "@/libs/dateutils";
import {
  type BeneficiaryShipFormInterface,
  EmailSubjectEnum,
} from "@/libs/interfaces/Interfaces";
import {
  beneficiarySchema,
  beneficiaryDefaults,
  type BeneficiaryFormValues,
} from "./schema";
import Step1Personal from "./steps/Step1Personal";
import Step2Coordinates from "./steps/Step2Coordinates";
import Step3Administrative from "./steps/Step3Administrative";
import Step4Education from "./steps/Step4Education";
import Step5Work from "./steps/Step5Work";
import Step6Housing from "./steps/Step6Housing";
import Step7Extra from "./steps/Step7Extra";

const steps: StepDef<BeneficiaryFormValues>[] = [
  {
    id: "personal",
    title: "Informations personnelles",
    fields: [
      "name",
      "firstName",
      "birthday",
      "nationality",
      "gender",
      "familySituation",
      "otherFamilySituation",
    ],
    Component: Step1Personal,
  },
  {
    id: "coordinates",
    title: "Coordonnées",
    fields: ["adress", "phoneNumber", "email"],
    Component: Step2Coordinates,
  },
  {
    id: "administrative",
    title: "Situation administrative",
    fields: [
      "dateArrived",
      "oqtf",
      "oqtfReceptionDate",
      "residentPermitPending",
      "residentPermitRequestDate",
      "actualStatut",
    ],
    Component: Step3Administrative,
  },
  {
    id: "education",
    title: "Formation",
    fields: ["degree", "formationInProgress", "formationPrecision"],
    Component: Step4Education,
  },
  {
    id: "work",
    title: "Expérience professionnelle",
    fields: ["working", "workTitle", "cddOrInterim", "workProof"],
    Component: Step5Work,
  },
  {
    id: "housing",
    title: "Besoin en logement",
    fields: ["stablePlace", "helpForSearchPlace", "familyInFrance", "familyLink"],
    Component: Step6Housing,
  },
  {
    id: "extra",
    title: "Autres informations",
    fields: ["moreInfo", "consent"],
    Component: Step7Extra,
  },
];

const handleSubmit = async (data: BeneficiaryFormValues) => {
  const transformed = transformDayjsFields(data);
  const payload: BeneficiaryShipFormInterface = {
    beneficiarySpecificField: "",
    name: transformed.name,
    firstName: transformed.firstName,
    phoneNumber: transformed.phoneNumber,
    email: transformed.email,
    birthday: transformed.birthday,
    nationality: transformed.nationality,
    adress: transformed.adress,
    statut: transformed.actualStatut,
    dateArrived: transformed.dateArrived,
    object: "",
    consent: transformed.consent,
    gender: transformed.gender,
    familySituation: transformed.familySituation,
    otherFamilySituation: transformed.otherFamilySituation,
    oqtf: transformed.oqtf,
    oqtfReceptionDate:
      typeof transformed.oqtfReceptionDate === "string" ? transformed.oqtfReceptionDate : "",
    residentPermitPending: transformed.residentPermitPending,
    residentPermitRequestDate:
      typeof transformed.residentPermitRequestDate === "string"
        ? transformed.residentPermitRequestDate
        : "",
    actualStatut: transformed.actualStatut,
    working: transformed.working,
    workTitle: transformed.workTitle,
    cddOrInterim: transformed.cddOrInterim,
    workProof: transformed.workProof,
    degree: transformed.degree,
    formationInProgress: transformed.formationInProgress,
    formationPrecision: transformed.formationPrecision,
    stablePlace: transformed.stablePlace,
    helpForSearchPlace: transformed.helpForSearchPlace,
    familyInFrance: transformed.familyInFrance,
    familyLink: transformed.familyLink,
    moreInfo: transformed.moreInfo,
  };
  await mailHandler(payload, EmailSubjectEnum.Demande_de_beneficiaire);
};

const BeneficiaryFormController = () => (
  <TypeformStepper<BeneficiaryFormValues>
    steps={steps}
    schema={beneficiarySchema}
    defaultValues={beneficiaryDefaults}
    draftKey="ltdc:draft:beneficiary"
    onSubmit={handleSubmit}
    title="Demande d'adhésion (bénéficiaire)"
    subtitle="Un souci avec vos papiers, votre statut professionnel ou votre logement ? Remplissez ce formulaire pour que nous examinions votre situation."
    successTitle="Demande reçue, merci."
    successMessage="Nous étudions votre situation et reviendrons vers vous dans les plus brefs délais."
  />
);

export default BeneficiaryFormController;
