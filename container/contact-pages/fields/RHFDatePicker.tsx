"use client";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormContext, useController } from "react-hook-form";
import type { Dayjs } from "dayjs";

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
}

const RHFDatePicker = ({ name, label, disabled }: Props) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <DatePicker
      label={label}
      value={(field.value as Dayjs | null) ?? null}
      onChange={(v) => field.onChange(v)}
      disabled={disabled}
      slotProps={{
        textField: {
          fullWidth: true,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
          onBlur: field.onBlur,
        },
      }}
    />
  );
};

export default RHFDatePicker;
