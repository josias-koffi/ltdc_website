"use client";
import React from "react";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import { useCountryFlags } from "@/hooks/useCountryFlags";

interface Props {
  name: string;
  label: string;
  multiple?: boolean;
}

const RHFMultiSelectFlags = ({ name, label, multiple = true }: Props) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const flags = useCountryFlags();

  const value = multiple
    ? Array.isArray(field.value)
      ? field.value
      : []
    : (field.value as string) ?? "";

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={value as any}
        onChange={(e) => field.onChange(e.target.value)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          multiple ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((v) => (
                <Chip key={v} label={v} size="small" />
              ))}
            </Box>
          ) : (
            (selected as string)
          )
        }
      >
        {flags.map(([code, country]) => (
          <MenuItem
            key={code}
            value={country}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <img
              src={`https://flagcdn.com/${code}.svg`}
              width={24}
              alt={country}
              style={{ borderRadius: 2 }}
            />
            {country}
          </MenuItem>
        ))}
      </Select>
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  );
};

export default RHFMultiSelectFlags;
