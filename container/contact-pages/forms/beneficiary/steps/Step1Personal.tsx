"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFDatePicker from "../../../fields/RHFDatePicker";
import RHFMultiSelectFlags from "../../../fields/RHFMultiSelectFlags";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import RHFConditionalTextField from "../../../fields/RHFConditionalTextField";

const Step1Personal = () => (
  <>
    <RHFTextField name="name" label="Nom" required autoFocus />
    <RHFTextField name="firstName" label="Prénom(s)" required />
    <RHFDatePicker name="birthday" label="Date de naissance" />
    <RHFMultiSelectFlags name="nationality" label="Nationalité" />
    <RHFRadioGroup
      name="gender"
      label="Genre"
      options={[
        { value: "femme", label: "Femme" },
        { value: "homme", label: "Homme" },
        { value: "autre", label: "Autre" },
      ]}
    />
    <RHFRadioGroup
      name="familySituation"
      label="Situation familiale"
      options={[
        { value: "célibataire", label: "Célibataire" },
        { value: "marié(e)", label: "Marié(e)" },
        { value: "autre", label: "Autre" },
      ]}
    />
    <RHFConditionalTextField
      name="otherFamilySituation"
      label="Précisez votre situation familiale"
      watchName="familySituation"
      enableWhen="autre"
    />
  </>
);

export default Step1Personal;
