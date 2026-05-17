"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";

const Step3Coordinates = () => (
  <>
    <RHFTextField name="adresse" label="Adresse" required autoFocus />
    <RHFTextField name="phoneNumber" label="Numéro de téléphone" required />
    <RHFTextField name="email" label="Email" type="email" required />
  </>
);

export default Step3Coordinates;
