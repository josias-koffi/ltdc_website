"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import type { StepDirection } from "./useStepper";

interface Props {
  stepKey: string;
  title: string;
  description?: string;
  direction: StepDirection;
  children: React.ReactNode;
}

const StepShell = ({ stepKey, title, description, direction, children }: Props) => {
  const offset = direction === "next" ? 40 : -40;
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: offset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -offset }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </motion.div>
  );
};

export default StepShell;
