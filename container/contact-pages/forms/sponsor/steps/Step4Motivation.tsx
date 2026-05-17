"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFCheckbox from "../../../fields/RHFCheckbox";

const Step4Motivation = () => (
  <>
    <RHFTextField
      name="motivation"
      label="Pourquoi souhaitez-vous établir un partenariat avec l'association LTDC ?"
      multiline
      rows={6}
      required
      autoFocus
    />
    <RHFCheckbox
      name="consent"
      label="J'accepte que mes informations soient utilisées par l'association LTDC pour traiter ma demande de partenariat."
    />
  </>
);

export default Step4Motivation;
