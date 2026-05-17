"use client";
import React from "react";
import RHFTextField from "../../../fields/RHFTextField";
import RHFCheckbox from "../../../fields/RHFCheckbox";

const Step7Extra = () => (
  <>
    <RHFTextField
      name="moreInfo"
      label="Autres informations utiles"
      multiline
      rows={5}
      autoFocus
    />
    <RHFCheckbox
      name="consent"
      label="J'accepte que mes informations soient utilisées par l'association LTDC pour traiter ma demande."
    />
  </>
);

export default Step7Extra;
