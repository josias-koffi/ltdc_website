"use client";
import React from "react";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import RHFConditionalTextField from "../../../fields/RHFConditionalTextField";
import { YES_NO_OPTIONS } from "../schema";

const Step6Housing = () => (
  <>
    <RHFRadioGroup
      name="stablePlace"
      label="Avez-vous un logement stable ?"
      options={YES_NO_OPTIONS}
    />
    <RHFRadioGroup
      name="helpForSearchPlace"
      label="Avez-vous besoin d'assistance pour le logement ?"
      options={YES_NO_OPTIONS}
    />
    <RHFRadioGroup
      name="familyInFrance"
      label="Membres de la famille avec titre de séjour en France ?"
      options={YES_NO_OPTIONS}
    />
    <RHFConditionalTextField
      name="familyLink"
      label="Précisez le lien familial et la durée du titre de séjour"
      watchName="familyInFrance"
      enableWhen="oui"
    />
  </>
);

export default Step6Housing;
