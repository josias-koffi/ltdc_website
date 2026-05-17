"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFDatePicker from "../../../fields/RHFDatePicker";
import RHFMultiSelectFlags from "../../../fields/RHFMultiSelectFlags";

const Step2Personal = () => (
  <>
    <RHFTextField name="name" label="Nom" required autoFocus />
    <RHFTextField name="firstName" label="Prénom(s)" required />
    <RHFDatePicker name="birthday" label="Date de naissance" />
    <RHFMultiSelectFlags name="nationality" label="Nationalité" multiple={false} />
  </>
);

export default Step2Personal;
