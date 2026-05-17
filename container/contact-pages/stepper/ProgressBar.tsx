"use client";
import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  current: number;
  total: number;
  title: string;
}

const ProgressBar = ({ current, total, title }: Props) => {
  const value = ((current + 1) / total) * 100;
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(100, 39, 117, 0.12)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 3,
            backgroundColor: "primary.main",
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1, color: "text.secondary", fontWeight: 500 }}
      >
        Étape {current + 1} sur {total} — {title}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
