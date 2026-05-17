"use client";
import React from "react";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import { EmailSubjectEnum } from "@/libs/interfaces/Interfaces";

const Step1Subject = () => (
  <RHFRadioGroup
    name="subjectChoice"
    label="Sur quelle mission souhaitez-vous nous aider ?"
    options={[
      { value: EmailSubjectEnum.Demande_de_volontariat, label: "Demande de bénévolat (général)" },
      { value: EmailSubjectEnum.Demande_de_pour_la_maraude, label: "Bénévolat pour la maraude" },
    ]}
    row={false}
  />
);

export default Step1Subject;
