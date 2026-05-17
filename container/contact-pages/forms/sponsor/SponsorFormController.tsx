"use client";
import React from "react";
import TypeformStepper from "../../stepper/TypeformStepper";
import type { StepDef } from "../../stepper/types";
import mailHandler from "@/services/email/EmailService";
import {
  type SponsorShipFormInterface,
  EmailSubjectEnum,
} from "@/libs/interfaces/Interfaces";
import { sponsorSchema, sponsorDefaults, type SponsorFormValues } from "./schema";
import Step1Contact from "./steps/Step1Contact";
import Step2Organization from "./steps/Step2Organization";
import Step3Partnership from "./steps/Step3Partnership";
import Step4Motivation from "./steps/Step4Motivation";

const steps: StepDef<SponsorFormValues>[] = [
  {
    id: "contact",
    title: "Vos coordonnées",
    fields: ["name", "firstName", "adresse", "phoneNumber", "email"],
    Component: Step1Contact,
  },
  {
    id: "organization",
    title: "Votre organisation",
    fields: [
      "organization",
      "sector",
      "organizationAddress",
      "organizationPhone",
      "organizationEmail",
    ],
    Component: Step2Organization,
  },
  {
    id: "partnership",
    title: "Détails du partenariat",
    fields: ["partnershipType", "skillsAndRessources", "partnershipExperiences"],
    Component: Step3Partnership,
  },
  {
    id: "motivation",
    title: "Motivation",
    fields: ["motivation", "consent"],
    Component: Step4Motivation,
  },
];

const handleSubmit = async (data: SponsorFormValues) => {
  const payload: SponsorShipFormInterface = { ...data };
  await mailHandler(payload, EmailSubjectEnum.Demande_de_partenariat);
};

const SponsorFormController = () => (
  <TypeformStepper<SponsorFormValues>
    steps={steps}
    schema={sponsorSchema}
    defaultValues={sponsorDefaults}
    draftKey="ltdc:draft:sponsor"
    onSubmit={handleSubmit}
    title="Devenir partenaire"
    subtitle="Soutenez nos actions en tissant un partenariat sur-mesure avec LTDC."
    successTitle="Merci pour votre proposition !"
    successMessage="Nous étudions votre demande de partenariat et reviendrons vers vous rapidement."
  />
);

export default SponsorFormController;
