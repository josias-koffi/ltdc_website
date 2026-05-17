"use client";
import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { IconArrowLeft, IconArrowRight, IconSend } from "@tabler/icons-react";

interface Props {
  isFirst: boolean;
  isLast: boolean;
  submitting: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const StepNavigation = ({ isFirst, isLast, submitting, onPrev, onNext }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        mt: 4,
        pt: 2,
        borderTop: "1px solid rgba(0,0,0,0.08)",
        position: { xs: "sticky", md: "static" },
        bottom: 0,
        backgroundColor: "background.paper",
        py: { xs: 1.5, md: 0 },
      }}
    >
      <Button
        variant="text"
        onClick={onPrev}
        disabled={isFirst || submitting}
        startIcon={<IconArrowLeft size={18} />}
      >
        Retour
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        disabled={submitting}
        endIcon={
          submitting ? (
            <CircularProgress size={16} color="inherit" />
          ) : isLast ? (
            <IconSend size={18} />
          ) : (
            <IconArrowRight size={18} />
          )
        }
        sx={{ minWidth: 160 }}
      >
        {isLast ? "Envoyer" : "Suivant"}
      </Button>
    </Box>
  );
};

export default StepNavigation;
