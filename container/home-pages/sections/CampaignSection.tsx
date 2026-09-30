"use client";
import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import HelloAssoWidget from "@/components/sections/campaign/HelloAssoWidget";
import { ScreenTypeContext } from "@/app/template";
import { fadeInUp } from "@/components/animation/variants";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

export interface CampaignInterface {
  title: string;
  description?: string;
  widgetUrl: string;
}

// Campagne mise en avant sur l'accueil : remplacer ces valeurs (ou passer une
// autre campagne en props) pour promouvoir une nouvelle collecte HelloAsso.
const CURRENT_CAMPAIGN: CampaignInterface = {
  title: "Soutenez nos actions",
  description:
    "Chaque don nous aide à poursuivre notre engagement solidaire. " +
    "Participez à notre campagne en quelques clics, en toute sécurité via HelloAsso.",
  widgetUrl:
    "https://www.helloasso.com/associations/association-les-travailleurs-du-c-ur/formulaires/2/widget",
};

interface CampaignSectionInterface {
  campaign?: CampaignInterface;
}

const CampaignSection = ({
  campaign = CURRENT_CAMPAIGN,
}: CampaignSectionInterface) => {
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
        <Typography
          variant={notPhoneScreen ? "h2" : "h3"}
          fontWeight={"bold"}
          sx={{ pb: 2 }}
        >
          {campaign.title}
        </Typography>
        {campaign.description ? (
          <Typography sx={{ pb: 4 }}>{campaign.description}</Typography>
        ) : null}
      </motion.div>

      <HelloAssoWidget src={campaign.widgetUrl} title={campaign.title} />
    </ContainerWrapper>
  );
};

export default CampaignSection;
