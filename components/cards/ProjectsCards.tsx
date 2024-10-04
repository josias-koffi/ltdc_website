"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProjectsCards = ({ props }: any) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={process?.env?.NEXT_PUBLIC_BO_URL + "assets/" + props?.cover}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props?.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button href={"projects/" + props?.id}>Lire</Button>
      </CardActions>
    </Card>
  );
};

export default ProjectsCards;
