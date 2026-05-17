"use client";
import React, { useState } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import FormHero from "../shared/FormHero";
import FormCardWrapper from "../shared/FormCardWrapper";
import SuccessScreen from "../shared/SuccessScreen";
import ProgressBar from "./ProgressBar";
import StepShell from "./StepShell";
import StepNavigation from "./StepNavigation";
import { useStepper } from "./useStepper";
import { useFormDraft } from "./useFormDraft";
import type { TypeformStepperProps } from "./types";

const TypeformStepper = <T extends FieldValues>({
  steps,
  schema,
  defaultValues,
  draftKey,
  onSubmit,
  title,
  subtitle,
  successTitle,
  successMessage,
}: TypeformStepperProps<T>) => {
  const methods = useForm<T>({
    // @ts-expect-error zod v4 + resolvers v5 typing mismatch on generic
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  const { clear } = useFormDraft<T>(draftKey, methods as unknown as import("react-hook-form").UseFormReturn<T>);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <FormProvider {...methods}>
      <InnerStepper
        steps={steps}
        submitting={submitting}
        done={done}
        title={title}
        subtitle={subtitle}
        successTitle={successTitle}
        successMessage={successMessage}
        onFinalSubmit={async () => {
          setSubmitting(true);
          try {
            await methods.handleSubmit(async (data) => {
              await onSubmit(data as unknown as T);
              clear();
              setDone(true);
            })();
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </FormProvider>
  );
};

interface InnerProps<T extends FieldValues> {
  steps: import("./types").StepDef<T>[];
  submitting: boolean;
  done: boolean;
  title: string;
  subtitle?: string;
  successTitle?: string;
  successMessage?: string;
  onFinalSubmit: () => Promise<void>;
}

function InnerStepper<T extends FieldValues>({
  steps,
  submitting,
  done,
  title,
  subtitle,
  successTitle,
  successMessage,
  onFinalSubmit,
}: InnerProps<T>) {
  const { index, direction, isFirst, isLast, current, goNext, goPrev } =
    useStepper<T>(steps);

  if (done) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormHero title={title} subtitle={subtitle} />
        <FormCardWrapper>
          <SuccessScreen title={successTitle} message={successMessage} />
        </FormCardWrapper>
      </Box>
    );
  }

  const handleNext = async () => {
    const ok = await goNext();
    if (ok && isLast) await onFinalSubmit();
  };

  const StepComponent = current.Component;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormHero title={title} subtitle={subtitle} />
      <FormCardWrapper>
        <ProgressBar current={index} total={steps.length} title={current.title} />
        <AnimatePresence mode="wait" initial={false}>
          <StepShell
            stepKey={current.id}
            title={current.title}
            description={current.description}
            direction={direction}
          >
            <StepComponent />
          </StepShell>
        </AnimatePresence>
        <StepNavigation
          isFirst={isFirst}
          isLast={isLast}
          submitting={submitting}
          onPrev={goPrev}
          onNext={handleNext}
        />
      </FormCardWrapper>
    </Box>
  );
}

export default TypeformStepper;
