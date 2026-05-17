"use client";
import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import RHFTextField from "../../../fields/RHFTextField";
import RHFDatePicker from "../../../fields/RHFDatePicker";
import RHFRadioGroup from "../../../fields/RHFRadioGroup";
import { YES_NO_OPTIONS } from "../schema";

const Step3Administrative = () => {
  const { control } = useFormContext();
  const oqtf = useWatch({ control, name: "oqtf" });
  const permit = useWatch({ control, name: "residentPermitPending" });
  return (
    <>
      <RHFDatePicker name="dateArrived" label="Date d'arrivée en France" />
      <RHFRadioGroup name="oqtf" label="OQTF reçue" options={YES_NO_OPTIONS} />
      {oqtf === "oui" && (
        <RHFDatePicker name="oqtfReceptionDate" label="Date de réception de l'OQTF" />
      )}
      <RHFRadioGroup
        name="residentPermitPending"
        label="Demande de titre de séjour en cours"
        options={YES_NO_OPTIONS}
      />
      {permit === "oui" && (
        <RHFDatePicker name="residentPermitRequestDate" label="Date de la demande" />
      )}
      <RHFTextField
        name="actualStatut"
        label="Statut (demandeur d'asile, réfugié, sans-papiers, etc.)"
        required
      />
    </>
  );
};

export default Step3Administrative;
