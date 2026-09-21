"use client";

import { useEffect } from "react";
import { isSeasonKey, SEASON_KEYS, SeasonKey } from "@/config/seasons";

/** Durée pendant laquelle le nom du thème peut être saisi, réarmée à chaque frappe. */
const LISTENING_TIMEOUT_MS = 5000;

/** Alias acceptés en plus des clés de saison. */
const ALIASES: Record<string, SeasonKey> = {
  reset: "default",
  normal: "default",
  rose: "october",
  octobre: "october",
  noel: "christmas",
};

const resolveInput = (buffer: string): SeasonKey | null => {
  if (isSeasonKey(buffer)) {
    return buffer;
  }
  return ALIASES[buffer] ?? null;
};

/** Un préfixe encore susceptible d'aboutir : on garde le buffer en vie. */
const isViablePrefix = (buffer: string): boolean =>
  [...SEASON_KEYS, ...Object.keys(ALIASES)].some((candidate) =>
    candidate.startsWith(buffer),
  );

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
};

/**
 * Easter egg : Ctrl+Entrée ouvre une fenêtre de saisie, puis taper le nom d'un
 * thème ("october", "christmas", "default"…) le déclenche. Sert aussi à tester
 * un habillage hors de sa période.
 */
const useSeasonEasterEgg = (setSeason: (key: SeasonKey) => void) => {
  useEffect(() => {
    let buffer = "";
    let listening = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      listening = false;
      buffer = "";
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const arm = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(stop, LISTENING_TIMEOUT_MS);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ne jamais interférer avec la saisie des formulaires de contact.
      if (isTypingTarget(event.target)) {
        return;
      }

      if (event.ctrlKey && event.key === "Enter") {
        listening = true;
        buffer = "";
        arm();
        return;
      }

      if (!listening) {
        return;
      }

      if (event.key === "Escape") {
        stop();
        return;
      }

      if (event.key === "Backspace") {
        buffer = buffer.slice(0, -1);
        arm();
        return;
      }

      if (event.key.length !== 1 || !/[a-zA-Z]/.test(event.key)) {
        return;
      }

      buffer += event.key.toLowerCase();
      const match = resolveInput(buffer);
      if (match) {
        setSeason(match);
        stop();
        return;
      }
      // Saisie qui ne mène nulle part : on abandonne sans attendre le délai.
      if (!isViablePrefix(buffer)) {
        stop();
        return;
      }
      arm();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stop();
    };
  }, [setSeason]);
};

export default useSeasonEasterEgg;
