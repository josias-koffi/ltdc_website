"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { truncateText } from "@/libs/stringUtils";
import { OfferEntity } from "@/libs/interfaces/entities";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animation/variants";

const MotionCard = motion(Card);

const OfferCard = ({ props }: { props: OfferEntity }) => {
  return (
    <MotionCard
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Le texte prend la place qu'il lui faut, le bouton reste en bas de la carte. */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom color={"primary"} variant="h5" component="div">
          {props?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary" }}
          dangerouslySetInnerHTML={{
            __html: truncateText(props?.description, 250),
          }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 2 }}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button variant={"contained"} href={"offers/" + props?.id}>
            {"Voir l'offre"}
          </Button>
        </motion.div>
      </CardActions>
    </MotionCard>
  );
};

export default OfferCard;
