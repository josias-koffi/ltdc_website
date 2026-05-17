"use client";
import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormContext, useController } from "react-hook-form";

export interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: RadioOption[];
  row?: boolean;
}

const RHFRadioGroup = ({ name, label, options, row = true }: Props) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <FormControl error={!!fieldState.error}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row={row}
        value={field.value ?? ""}
        onChange={(_, v) => field.onChange(v)}
        sx={{ gap: 1, flexWrap: "wrap" }}
      >
        {options.map((o) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio />}
            label={o.label}
          />
        ))}
      </RadioGroup>
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
};

export default RHFRadioGroup;
