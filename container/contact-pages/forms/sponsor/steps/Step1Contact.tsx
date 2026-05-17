"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";

const Step1Contact = () => (
  <>
    <RHFTextField name="name" label="Nom" required autoFocus />
    <RHFTextField name="firstName" label="Prénom(s)" required />
    <RHFTextField name="adresse" label="Adresse" required />
    <RHFTextField name="phoneNumber" label="Numéro de téléphone" required />
    <RHFTextField name="email" label="Email" type="email" required />
  </>
);

export default Step1Contact;
