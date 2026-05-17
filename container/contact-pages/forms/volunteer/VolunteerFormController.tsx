"use client";
import React from "react";
import TypeformStepper from "../../stepper/TypeformStepper";
import type { StepDef } from "../../stepper/types";
import mailHandler from "@/services/email/EmailService";
import { transformDayjsFields } from "@/libs/dateutils";
import type { VolunteerShipFormInterface } from "@/libs/interfaces/Interfaces";
import { volunteerSchema, volunteerDefaults, type VolunteerFormValues } from "./schema";
import Step1Subject from "./steps/Step1Subject";
import Step2Personal from "./steps/Step2Personal";
import Step3Coordinates from "./steps/Step3Coordinates";
import Step4Availability from "./steps/Step4Availability";
import Step5SkillsMotivation from "./steps/Step5SkillsMotivation";

const steps: StepDef<VolunteerFormValues>[] = [
  {
    id: "subject",
    title: "Type de bénévolat",
    description: "Choisissez le type de mission qui vous intéresse.",
    fields: ["subjectChoice"],
    Component: Step1Subject,
  },
  {
    id: "personal",
    title: "Informations personnelles",
    fields: ["name", "firstName", "birthday", "nationality"],
    Component: Step2Personal,
  },
  {
    id: "coordinates",
    title: "Coordonnées",
    fields: ["adresse", "phoneNumber", "email"],
    Component: Step3Coordinates,
  },
  {
    id: "availability",
    title: "Disponibilités",
    description: "Quels jours pouvez-vous vous rendre disponible ?",
    fields: ["days"],
    Component: Step4Availability,
  },
  {
    id: "motivation",
    title: "Compétences et motivation",
    fields: ["skills", "experiences", "motivation", "consent"],
    Component: Step5SkillsMotivation,
  },
];

const handleSubmit = async (data: VolunteerFormValues) => {
  const { subjectChoice, days, ...rest } = data;
  const transformed = transformDayjsFields(rest);
  const payload: VolunteerShipFormInterface = {
    volunteerSpecificField: "",
    name: transformed.name,
    firstName: transformed.firstName,
    birthday: transformed.birthday,
    nationality: transformed.nationality,
    adresse: transformed.adresse,
    phoneNumber: transformed.phoneNumber,
    email: transformed.email,
    days: days as VolunteerShipFormInterface["days"],
    motivation: transformed.motivation,
    experiences: transformed.experiences,
    skills: transformed.skills,
    consent: transformed.consent,
  };
  await mailHandler(payload, subjectChoice);
};

const VolunteerFormController = () => (
  <TypeformStepper<VolunteerFormValues>
    steps={steps}
    schema={volunteerSchema}
    defaultValues={volunteerDefaults}
    draftKey="ltdc:draft:volunteer"
    onSubmit={handleSubmit}
    title="Devenir bénévole"
    subtitle="Nous serons heureux de vous compter parmi nos bénévoles."
    successTitle="Merci pour votre engagement !"
    successMessage="Nous reviendrons vers vous très rapidement pour faire connaissance."
  />
);

export default VolunteerFormController;
