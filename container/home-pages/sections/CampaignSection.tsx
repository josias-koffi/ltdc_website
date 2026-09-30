"use client";
import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import HelloAssoWidget from "@/components/sections/campaign/HelloAssoWidget";
import { ScreenTypeContext } from "@/app/template";
import { fadeInUp } from "@/components/animation/variants";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";
import useSeason from "@/hooks/useSeason";
import { SeasonCampaign } from "@/config/seasons";

interface CampaignSectionInterface {
  /** Force une campagne ; par défaut, celle de la saison active (config/seasons.ts). */
  campaign?: SeasonCampaign;
}

const CampaignSection = (props: CampaignSectionInterface) => {
  const { assets } = useSeason();
  const notPhoneScreen = useContext(ScreenTypeContext);
  const fadeUp = useAnimationVariants(fadeInUp);
  const campaign = props.campaign ?? assets.campaign;

  // Aucune campagne en cours pour cette saison : la section disparaît.
  if (!campaign) return null;

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

      {/* key : repart de la hauteur initiale si la campagne change à chaud. */}
      <HelloAssoWidget
        key={campaign.widgetUrl}
        src={campaign.widgetUrl}
        title={campaign.title}
      />
    </ContainerWrapper>
  );
};

export default CampaignSection;
