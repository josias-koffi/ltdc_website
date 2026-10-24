"use client";

import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animation/variants";
import { EmissionEntity } from "@/libs/interfaces/entities";
import { formatDate } from "@/libs/dateutils";
import {
  focalPointPosition,
  returnImageUrlById,
  truncateText,
} from "@/libs/stringUtils";

const MotionCard = motion(Card);

const EmissionCard = ({ props }: { props: EmissionEntity }) => {
  return (
    <MotionCard
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      sx={{ overflow: "hidden" }}
    >
      <CardMedia
        sx={{
          height: 220,
          backgroundPosition: focalPointPosition(props.cover) ?? "center",
          transition: "transform 0.4s ease",
          "&:hover": { transform: "scale(1.06)" },
        }}
        image={returnImageUrlById(props.cover)}
        title={props.title}
      />
      <CardContent sx={{ minHeight: 145 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
            mb: 1,
          }}
        >
          <Typography>
            {props.episode_number != null
              ? `Épisode ${props.episode_number}`
              : "Émission"}
          </Typography>
          <Typography>{formatDate(props.publication_date)}</Typography>
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {truncateText(props.description, 100)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button variant="contained" href={`/emissions/${props.id}`}>
            Regarder
          </Button>
        </motion.div>
      </CardActions>
    </MotionCard>
  );
};

export default EmissionCard;
