import type { FieldValues, DefaultValues, Path } from "react-hook-form";
import type { ZodType } from "zod";

export interface StepDef<T extends FieldValues> {
  id: string;
  title: string;
  description?: string;
  fields: Path<T>[];
  Component: React.FC;
}

export interface TypeformStepperProps<T extends FieldValues> {
  steps: StepDef<T>[];
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  draftKey: string;
  onSubmit: (data: T) => Promise<void>;
  title: string;
  subtitle?: string;
  successTitle?: string;
  successMessage?: string;
}
