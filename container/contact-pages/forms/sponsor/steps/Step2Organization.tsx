"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";

const Step2Organization = () => (
  <>
    <RHFTextField name="organization" label="Nom de l'organisation" required autoFocus />
    <RHFTextField name="sector" label="Secteur d'activité" required />
    <RHFTextField name="organizationAddress" label="Adresse de l'organisation" required />
    <RHFTextField name="organizationPhone" label="Téléphone de l'organisation" required />
    <RHFTextField name="organizationEmail" label="Email de l'organisation" type="email" required />
  </>
);

export default Step2Organization;
