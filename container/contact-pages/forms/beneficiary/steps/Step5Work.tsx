"use client";
import React from "react";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import RHFConditionalTextField from "../../../fields/RHFConditionalTextField";
import { YES_NO_OPTIONS } from "../schema";

const Step5Work = () => (
  <>
    <RHFRadioGroup
      name="working"
      label="Avez-vous un emploi actuel ?"
      options={YES_NO_OPTIONS}
    />
    <RHFConditionalTextField
      name="workTitle"
      label="Quel est votre poste ?"
      watchName="working"
      enableWhen="oui"
    />
    <RHFRadioGroup
      name="cddOrInterim"
      label="Avez-vous travaillé en intérim ou en CDD ?"
      options={YES_NO_OPTIONS}
    />
    <RHFRadioGroup
      name="workProof"
      label="Pouvez-vous fournir un justificatif (contrat de travail) ?"
      options={YES_NO_OPTIONS}
    />
  </>
);

export default Step5Work;
