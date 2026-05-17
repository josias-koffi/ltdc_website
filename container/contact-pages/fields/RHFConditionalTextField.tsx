"use client";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RHFTextField from "./RHFTextField";

interface Props {
  name: string;
  label: string;
  watchName: string;
  enableWhen: string;
  multiline?: boolean;
  rows?: number;
}

const RHFConditionalTextField = ({
  name,
  label,
  watchName,
  enableWhen,
  multiline,
  rows,
}: Props) => {
  const { control } = useFormContext();
  const watched = useWatch({ control, name: watchName });
  const enabled = watched === enableWhen;
  if (!enabled) return null;
  return <RHFTextField name={name} label={label} multiline={multiline} rows={rows} />;
};

export default RHFConditionalTextField;
