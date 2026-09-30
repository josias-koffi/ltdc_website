"use client";
import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import ProjectsCards from "@/components/cards/ProjectsCards";
import { COVER_WITH_FOCAL_POINT_FIELDS } from "@/libs/stringUtils";

const ListProjects = () => {
  return (
    <>
      <RubriqueHead
        imageUrl="/images/aboutPage/groupe_image.jpg"
        imageAlt="Les projets de la LTDC"
        title="Les projets de la LTDC"
        description="🌟 Nos projets ! 🌟<br />Découvrez notre section dédiée aux projets liée à l'association ! Restez informés des activités, ateliers et rencontres que nous organisons tout au long de l’année. Ne manquez pas l’occasion de participer et de vous impliquer dans notre communauté !<br />Visitez régulièrement cette rubrique pour ne rien rater et rejoignez-nous pour des moments enrichissants et conviviaux."
        objectPosition="center"
      />

      <ListFromEntity
        entity="projects"
        CardType={ProjectsCards}
        fields={COVER_WITH_FOCAL_POINT_FIELDS}
      />
    </>
  );
};

export default ListProjects;
