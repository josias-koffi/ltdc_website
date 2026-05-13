"use client";
import React, { useContext } from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Box, Typography } from "@mui/material";
import { ScreenTypeContext } from "@/app/template";
import { PartnerImageInterface } from "@/libs/interfaces/Interfaces";
import ImageBoxPartner from "@/components/sections/partner/components/ImageBoxPartner";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animation/variants";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

const PartnerSection = () => {
  const partnerImages: PartnerImageInterface[] = [
    {
      name: "Les Apprentis D'auteuil",
      url: "https://www.apprentis-auteuil.org",
      sourceName: "Apprentis-auteuil_LOGO.webp",
    },
    {
      name: "Association Guinéenne des étudiants de Tours",
      url: "https://www.facebook.com/assoguinee.tours/?locale=fr_FR",
      sourceName: "Association-Guinéenne-des-étudiants-de-Tours.jpg",
    },
    {
      name: "Humenya",
      url: "https://linktr.ee/humenya.asso",
      sourceName: "Humenya.jpeg",
    },
  ];

  const notPhoneScreen = useContext(ScreenTypeContext);
  const fadeUp = useAnimationVariants(fadeInUp);

  return (
    <ContainerWrapper>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"}>
          Nos partenaires
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Typography>
          {"Parce qu'ils partagent nos valeurs et soutiennent notre mission au quotidien, " +
            "découvrez les partenaires qui rendent possible chaque jour notre engagement solidaire."}
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row", xl: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          py: 5,
        }}
      >
        {partnerImages?.map((partner, index) => (
          <motion.div
            key={partner?.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1 } as never}
          >
            <ImageBoxPartner image={partner} />
          </motion.div>
        ))}
      </Box>
    </ContainerWrapper>
  );
};

export default PartnerSection;
