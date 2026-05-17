"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { staggerContainer, fadeInUp } from "@/components/animation/variants";
import FormHero from "../shared/FormHero";
import { intents } from "./intents";
import IntentCard from "./IntentCard";

const IntentPickerPage = () => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <FormHero
      title="Comment pouvons-nous vous aider ?"
      subtitle="Choisissez la raison de votre prise de contact, nous vous orienterons vers le bon formulaire."
    />
    <ContainerWrapper>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid container spacing={3}>
          {intents.map((intent) => (
            <Grid key={intent.id} size={{ xs: 12, md: 6 }}>
              <IntentCard intent={intent} />
            </Grid>
          ))}
        </Grid>
        <motion.div variants={fadeInUp}>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 6, color: "text.secondary" }}
          >
            Besoin de venir nous voir ? Nous sommes basés à Paris et en Île-de-France.
          </Typography>
        </motion.div>
      </motion.div>
    </ContainerWrapper>
  </Box>
);

export default IntentPickerPage;
