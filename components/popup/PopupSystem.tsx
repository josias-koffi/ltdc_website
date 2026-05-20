"use client";

import React, { useEffect, useState, useCallback } from "react";
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

interface PopupItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  url: string;
}

const STORAGE_KEY = "ltdc_popup_last_shown";
const AUTO_DELAY_MS = 60_000;
const TIKTOK_VIDEO_RE = /tiktok\.com\/@[^/]+\/video\/(\d+)/;

function extractTiktokId(url: string): string | null {
  return url.match(TIKTOK_VIDEO_RE)?.[1] ?? null;
}

function getRandomPopup(popups: PopupItem[]): PopupItem {
  return popups[Math.floor(Math.random() * popups.length)];
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
    if (!popupList.length) return;
    setActivePopup(getRandomPopup(popupList));
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!popups.length) return;
    if (hasShownToday()) return;
    const timer = setTimeout(() => {
      markShownToday();
      showRandom(popups);
    }, AUTO_DELAY_MS);
    return () => clearTimeout(timer);
  }, [popups, showRandom]);

  const handleBadgeClick = () => {
    if (!popups.length) return;
    setActivePopup(getRandomPopup(popups));
    setOpen(true);
  };

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
          src="/icons/logo/LOGO_DÉCLINAISON_2.png"
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
              <Box
                sx={{
                  width: "100%",
                  maxHeight: 360,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#f5f5f5",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={activePopup.imageUrl}
                  alt={activePopup.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 600px) 100vw, 600px"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 360,
                    width: "auto",
                    height: "auto",
                    display: "block",
                  }}
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
              >
                En savoir plus
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
