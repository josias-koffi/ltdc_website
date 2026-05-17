"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFCheckbox from "../../../fields/RHFCheckbox";

const Step2Message = () => (
  <>
    <RHFTextField name="name" label="Nom" required autoFocus />
    <RHFTextField name="email" label="Email" type="email" required />
    <RHFTextField name="company" label="Entreprise (optionnel)" />
    <RHFTextField name="message" label="Votre message" multiline rows={6} required />
    <RHFCheckbox
      name="consent"
      label="J'accepte que mes informations soient utilisées par l'association LTDC pour traiter ma demande."
    />
  </>
);

export default Step2Message;
