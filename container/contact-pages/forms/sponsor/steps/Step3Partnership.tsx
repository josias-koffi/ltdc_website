"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";

const Step3Partnership = () => (
  <>
    <RHFTextField
      name="partnershipType"
      label="Type de partenariat souhaité"
      multiline
      rows={4}
      required
      autoFocus
    />
    <RHFTextField
      name="skillsAndRessources"
      label="Compétences et ressources proposées"
      multiline
      rows={4}
      required
    />
    <RHFTextField
      name="partnershipExperiences"
      label="Expériences de partenariats antérieures"
      multiline
      rows={4}
      required
    />
  </>
);

export default Step3Partnership;
