"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFCheckbox from "../../../fields/RHFCheckbox";

const Step5SkillsMotivation = () => (
  <>
    <RHFTextField name="skills" label="Compétences spécifiques" multiline rows={4} required />
    <RHFTextField
      name="experiences"
      label="Expériences de bénévolat antérieures"
      multiline
      rows={4}
      required
    />
    <RHFTextField
      name="motivation"
      label="Pourquoi souhaitez-vous devenir bénévole ?"
      multiline
      rows={5}
      required
    />
    <RHFCheckbox
      name="consent"
      label="J'accepte que mes informations soient utilisées par l'association LTDC pour traiter ma demande de bénévolat."
    />
  </>
);

export default Step5SkillsMotivation;
