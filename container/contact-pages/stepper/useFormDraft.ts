"use client";
import { useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import dayjs from "dayjs";

const DEBOUNCE_MS = 400;
const DAYJS_MARKER = "__dayjs__";

function serialize(values: unknown): unknown {
  if (values && typeof values === "object") {
    const v = values as { isValid?: () => boolean; format?: (f: string) => string };
    if (typeof v.isValid === "function" && typeof v.format === "function" && v.isValid()) {
      return { [DAYJS_MARKER]: v.format("YYYY-MM-DD") };
    }
    if (Array.isArray(values)) return values.map(serialize);
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(values as object)) {
      out[k] = serialize((values as Record<string, unknown>)[k]);
    }
    return out;
  }
  return values;
}

function deserialize(values: unknown): unknown {
  if (values && typeof values === "object") {
    const obj = values as Record<string, unknown>;
    if (typeof obj[DAYJS_MARKER] === "string") {
      return dayjs(obj[DAYJS_MARKER] as string);
    }
    if (Array.isArray(values)) return values.map(deserialize);
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(obj)) out[k] = deserialize(obj[k]);
    return out;
  }
  return values;
}

export function useFormDraft<T extends FieldValues>(
  key: string,
  methods: UseFormReturn<T>,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      const parsed = deserialize(JSON.parse(raw)) as Partial<T>;
      methods.reset({ ...methods.getValues(), ...parsed } as T);
    } catch {
      window.localStorage.removeItem(key);
    }
  }, [key, methods]);

  useEffect(() => {
    const sub = methods.watch((values) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(serialize(values)));
        } catch {}
      }, DEBOUNCE_MS);
    });
    return () => {
      sub.unsubscribe();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [key, methods]);

  const clear = () => {
    if (typeof window !== "undefined") window.localStorage.removeItem(key);
  };
  return { clear };
}
