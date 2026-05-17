"use client";
import { useEffect, useState } from "react";

export type CountryFlag = [code: string, name: string];

export function useCountryFlags() {
  const [flags, setFlags] = useState<CountryFlag[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/country");
        const result = await res.json();
        if (!cancelled && result) {
          setFlags(Object.keys(result).map((k) => [k, result[k]]));
        }
      } catch (e) {
        console.error("useCountryFlags:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return flags;
}
