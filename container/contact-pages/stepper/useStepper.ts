"use client";
import { useCallback, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { StepDef } from "./types";

export type StepDirection = "next" | "prev";

export function useStepper<T extends FieldValues>(steps: StepDef<T>[]) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<StepDirection>("next");
  const methods = useFormContext<T>();

  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const current = steps[index];

  const goNext = useCallback(async () => {
    const fields = current.fields as Path<T>[];
    const ok = fields.length ? await methods.trigger(fields) : true;
    if (!ok) return false;
    if (!isLast) {
      setDirection("next");
      setIndex((i) => i + 1);
    }
    return true;
  }, [current, methods, isLast]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    setDirection("prev");
    setIndex((i) => i - 1);
  }, [isFirst]);

  const reset = useCallback(() => {
    setDirection("next");
    setIndex(0);
  }, []);

  return { index, direction, isFirst, isLast, current, goNext, goPrev, reset };
}
