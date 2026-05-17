"use client";
import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useFormContext, useController } from "react-hook-form";

interface Props {
  name: string;
  label: React.ReactNode;
}

const RHFCheckbox = ({ name, label }: Props) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <FormControl error={!!fieldState.error}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!field.value}
            onChange={(_, c) => field.onChange(c)}
            onBlur={field.onBlur}
          />
        }
        label={label}
      />
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
};

export default RHFCheckbox;
