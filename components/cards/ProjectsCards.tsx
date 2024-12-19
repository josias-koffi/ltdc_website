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
import Category from "@/components/entity/Category";
import { truncateText } from "@/libs/stringUtils";
import { formatDate } from "@/libs/dateutils";
import { ProjectsEntity } from "@/libs/interfaces/entities";

const ProjectCard = ({ props }: { props: ProjectsEntity }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 220 }}
        image={process?.env?.NEXT_PUBLIC_BO_URL + "assets/" + props?.cover}
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
          <Category id={props?.category_id} />
          <Typography>{formatDate(props?.start_date)}</Typography>
        </Stack>

        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {truncateText(props?.description, 100)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", pt: 5 }}>
        <Button variant={"contained"} href={"projects/" + props?.id}>
          Voir plus
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
