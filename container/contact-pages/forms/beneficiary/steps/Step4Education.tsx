"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import RHFConditionalTextField from "../../../fields/RHFConditionalTextField";
import { YES_NO_OPTIONS } from "../schema";

const Step4Education = () => (
  <>
    <RHFTextField name="degree" label="Niveau d'études" required autoFocus />
    <RHFRadioGroup
      name="formationInProgress"
      label="Formation en cours"
      options={YES_NO_OPTIONS}
    />
    <RHFConditionalTextField
      name="formationPrecision"
      label="Précisez la formation"
      watchName="formationInProgress"
      enableWhen="oui"
    />
  </>
);

export default Step4Education;
