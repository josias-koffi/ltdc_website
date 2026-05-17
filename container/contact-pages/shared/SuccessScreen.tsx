"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  title?: string;
  message?: string;
}

const SuccessScreen = ({
  title = "Merci, votre demande a bien été envoyée.",
  message = "Nous reviendrons vers vous dans les plus brefs délais.",
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          py: 4,
        }}
      >
        <Box sx={{ color: "primary.main" }}>
          <IconCircleCheck size={72} stroke={1.5} />
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 480 }}>
          {message}
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Retour à l’accueil
        </Button>
      </Box>
    </motion.div>
  );
};

export default SuccessScreen;
