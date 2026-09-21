"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import useSeason from "@/hooks/useSeason";
import { isSeasonKey, SeasonKey } from "@/config/seasons";

interface PopupItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  url: string;
  /** Libellé du bouton d'action. Défaut : "En savoir plus". */
  ctaLabel?: string;
  /** Restreint l'affichage à une saison (cf. config/seasons.ts). Absent = toujours éligible. */
  season?: SeasonKey;
  /** Poids dans le tirage aléatoire. Défaut : 1. Un poids de 3 = trois fois plus fréquent. */
  weight?: number;
  /**
   * En affichage automatique, cette popup prend la main sur toutes les autres.
   * Sert aux campagnes mises en avant : le message passe sans dépendre du hasard.
   * Le clic sur la pastille reste un tirage normal entre toutes les popups.
   */
  exclusive?: boolean;
}

const STORAGE_KEY = "ltdc_popup_last_shown";
const AUTO_DELAY_MS = 60_000;
/** Les affiches sont au format portrait : il leur faut de la hauteur pour rester lisibles. */
const POSTER_MAX_HEIGHT = "min(55vh, 480px)";
const TIKTOK_VIDEO_RE = /tiktok\.com\/@[^/]+\/video\/(\d+)/;

const isExternalUrl = (url: string): boolean => /^https?:\/\//.test(url);

function extractTiktokId(url: string): string | null {
  return url.match(TIKTOK_VIDEO_RE)?.[1] ?? null;
}

/** Popups affichables pour la saison courante. */
function getEligiblePopups(popups: PopupItem[], seasonKey: SeasonKey): PopupItem[] {
  return popups.filter(
    (popup) => !isSeasonKey(popup.season) || popup.season === seasonKey,
  );
}

/**
 * Popups retenues pour l'affichage automatique. Dès qu'une campagne exclusive
 * est éligible, elle est seule en lice : une seule popup passe par jour, on ne
 * la laisse pas au hasard.
 */
function getAutoPopups(popups: PopupItem[]): PopupItem[] {
  const exclusives = popups.filter((popup) => popup.exclusive === true);
  return exclusives.length ? exclusives : popups;
}

/** Tirage aléatoire pondéré : un poids plus élevé sort plus souvent. */
function pickWeightedPopup(popups: PopupItem[]): PopupItem | null {
  if (!popups.length) return null;
  const weightOf = (popup: PopupItem) =>
    typeof popup.weight === "number" && popup.weight > 0 ? popup.weight : 1;
  const total = popups.reduce((sum, popup) => sum + weightOf(popup), 0);
  let draw = Math.random() * total;
  for (const popup of popups) {
    draw -= weightOf(popup);
    if (draw < 0) return popup;
  }
  return popups[popups.length - 1];
}

function hasShownToday(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return raw === new Date().toDateString();
  } catch {
    return false;
  }
}

function markShownToday(): void {
  try {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  } catch {}
}

export default function PopupSystem() {
  const { season, seasonKey } = useSeason();
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [activePopup, setActivePopup] = useState<PopupItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/data/popups.json")
      .then((r) => r.json())
      .then((data: PopupItem[]) => setPopups(data))
      .catch(() => {});
  }, []);

  const showRandom = useCallback((popupList: PopupItem[]) => {
    const picked = pickWeightedPopup(popupList);
    if (!picked) return;
    setActivePopup(picked);
    setOpen(true);
  }, []);

  const eligiblePopups = useMemo(
    () => getEligiblePopups(popups, seasonKey),
    [popups, seasonKey],
  );

  useEffect(() => {
    const autoPopups = getAutoPopups(eligiblePopups);
    if (!autoPopups.length) return;
    if (hasShownToday()) return;
    const timer = setTimeout(() => {
      markShownToday();
      showRandom(autoPopups);
    }, AUTO_DELAY_MS);
    return () => clearTimeout(timer);
  }, [eligiblePopups, showRandom]);

  const handleBadgeClick = () => showRandom(eligiblePopups);

  const handleClose = () => setOpen(false);

  const tiktokId = activePopup?.videoUrl
    ? extractTiktokId(activePopup.videoUrl)
    : null;

  return (
    <>
      {/* Round badge bottom-right */}
      <Box
        onClick={handleBadgeClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: 3,
          zIndex: 1300,
          bgcolor: "white",
          border: "2px solid",
          borderColor: "primary.main",
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <Image
          src={season.logos.icon}
          alt="LTDC"
          fill
          style={{ objectFit: "cover" }}
          sizes="56px"
        />
      </Box>

      {/* TikTok popup — video only, compact */}
      {tiktokId && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={false}
          PaperProps={{
            sx: { width: 340, maxHeight: "90vh", borderRadius: 3, overflow: "hidden" },
          }}
        >
          <DialogContent sx={{ p: 0, lineHeight: 0, flex: "1 1 auto", overflow: "hidden" }}>
            {/* wrapper clips the caption zone at the bottom of the TikTok embed */}
            <Box
              sx={{
                overflow: "hidden",
                position: "relative",
                width: 340,
                height: "clamp(420px, calc(90vh - 112px), 640px)",
              }}
            >
              <iframe
                src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  display: "block",
                  width: 340,
                  /* 100px taller than wrapper → caption scrolls out of view */
                  height: "calc(clamp(420px, calc(90vh - 112px), 640px) + 100px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                title={activePopup?.title}
              />
            </Box>
          </DialogContent>
          {activePopup?.description && (
            <Box sx={{ px: 2, pt: 1.5 }}>
              <Typography variant="body2">{activePopup.description}</Typography>
            </Box>
          )}
          <DialogActions sx={{ px: 2, py: 1.5, justifyContent: "center", gap: 1, flexShrink: 0 }}>
            <Button onClick={handleClose} color="inherit">
              Fermer
            </Button>
            <Button
              component={Link}
              href={activePopup?.url ?? ""}
              onClick={handleClose}
              variant="contained"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir notre TikTok
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Standard image popup */}
      {!tiktokId && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
        >
          <DialogTitle
            sx={{ bgcolor: "primary.main", color: "white", fontWeight: 700 }}
          >
            {activePopup?.title}
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            {activePopup?.imageUrl && (
              // Hauteur fixe plutot que maxHeight : la place est reservee avant
              // le chargement, sinon la fenetre saute quand l'affiche arrive.
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: POSTER_MAX_HEIGHT,
                  bgcolor: "#f5f5f5",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={activePopup.imageUrl}
                  alt={activePopup.title}
                  fill
                  sizes="(max-width: 600px) 100vw, 600px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            )}
            <Box sx={{ p: 3 }}>
              <Typography variant="body1">
                {activePopup?.description}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button onClick={handleClose} color="inherit">
              Fermer
            </Button>
            {activePopup?.url && (
              <Button
                component={Link}
                href={activePopup.url}
                onClick={handleClose}
                variant="contained"
                color="primary"
                {...(isExternalUrl(activePopup.url)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {activePopup.ctaLabel ?? "En savoir plus"}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
