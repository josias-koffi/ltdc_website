"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import Targets from "@/components/entity/Targets";
import {
  focalPointPosition,
  returnImageUrlById,
  truncateText,
} from "@/libs/stringUtils";
import { formatDate } from "@/libs/dateutils";
import { ProjectEntity } from "@/libs/interfaces/entities";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animation/variants";

const MotionCard = motion(Card);

const ProjectCard = ({ props }: { props: ProjectEntity }) => {
  return (
    <MotionCard
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      sx={{
        "& .MuiCardMedia-root": {
          transition: "transform 0.4s ease",
        },
        "&:hover .MuiCardMedia-root": {
          transform: "scale(1.06)",
        },
        overflow: "hidden",
      }}
    >
      <CardMedia
        sx={{
          height: 220,
          backgroundPosition: focalPointPosition(props?.cover) ?? "center",
        }}
        image={returnImageUrlById(props?.cover)}
        title={props?.title}
      />
      <CardContent sx={{ height: 100 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          {props?.targets?.length ? (
            <Targets id={props.targets[0]} entity={"projects_targets"} />
          ) : (
            <span />
          )}
          {props?.start_date ? (
            <Typography>{formatDate(props.start_date)}</Typography>
          ) : null}
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {truncateText(props?.description)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 5 }}>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button variant={"contained"} href={"/projects/" + props?.id}>
            Découvrir
          </Button>
        </motion.div>
      </CardActions>
    </MotionCard>
  );
};

export default ProjectCard;
