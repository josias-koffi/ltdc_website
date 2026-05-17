"use client";
import React from "react";
import TypeformStepper from "../../stepper/TypeformStepper";
import type { StepDef } from "../../stepper/types";
import mailHandler from "@/services/email/EmailService";
import {
  type ContactInfoInterface,
  EmailSubjectEnum,
} from "@/libs/interfaces/Interfaces";
import { generalSchema, generalDefaults, type GeneralFormValues } from "./schema";
import Step1Subject from "./steps/Step1Subject";
import Step2Message from "./steps/Step2Message";

const steps: StepDef<GeneralFormValues>[] = [
  {
    id: "subject",
    title: "Votre demande",
    description: "Indiquez-nous l'objet de votre message.",
    fields: ["subject"],
    Component: Step1Subject,
  },
  {
    id: "message",
    title: "Vos coordonnées et votre message",
    description: "Nous reviendrons vers vous dans les plus brefs délais.",
    fields: ["name", "email", "company", "message", "consent"],
    Component: Step2Message,
  },
];

const handleSubmit = async (data: GeneralFormValues) => {
  const payload: ContactInfoInterface = {
    contactSpecificField: "",
    subject: data.subject,
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
    consent: data.consent,
  };
  await mailHandler(payload, EmailSubjectEnum.Demande_de_general);
};

const GeneralFormController = () => (
  <TypeformStepper<GeneralFormValues>
    steps={steps}
    schema={generalSchema}
    defaultValues={generalDefaults}
    draftKey="ltdc:draft:general"
    onSubmit={handleSubmit}
    title="Nous contacter"
    subtitle="Une question ? Écrivez-nous, nous serons heureux de vous répondre."
    successTitle="Message envoyé !"
    successMessage="Merci de nous avoir contactés. Nous reviendrons vers vous très vite."
  />
);

export default GeneralFormController;
