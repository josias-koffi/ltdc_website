"use client";
import React from "react";
import { TextField } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
}

const RHFTextField = ({
  name,
  label,
  type = "text",
  multiline,
  rows,
  placeholder,
  autoFocus,
  required,
}: Props) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <TextField
      {...field}
      value={field.value ?? ""}
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default RHFTextField;
