"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";

const Step2Coordinates = () => (
  <>
    <RHFTextField name="adress" label="Adresse" required autoFocus />
    <RHFTextField name="phoneNumber" label="Numéro de téléphone" required />
    <RHFTextField name="email" label="Email" type="email" required />
  </>
);

export default Step2Coordinates;
