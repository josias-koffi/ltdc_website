"use client";
import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import ProjectsCards from "@/components/cards/ProjectsCards";

const ListProjects = () => {
  return (
    <>
      <RubriqueHead
        imageUrl="/images/aboutPage/groupe_image.jpg"
        imageAlt="Les projets de la LTDC"
        title="Les projets de la LTDC"
        description="🌟 projets à venir ! 🌟<br />Découvrez notre section dédiée aux projets liée à l'association ! Restez informés des activités, ateliers et rencontres que nous organisons tout au long de l’année. Ne manquez pas l’occasion de participer et de vous impliquer dans notre communauté !<br />Visitez régulièrement cette rubrique pour ne rien rater et rejoignez-nous pour des moments enrichissants et conviviaux."
        width="100%"
        height={400}
        objectPosition="center"
      />

      <ListFromEntity
        entity="projects"
        CardType={ProjectsCards}
        itemsSize={{ sm: 12, xs: 12, md: 12, xl: 12 }}
      />
    </>
  );
};

export default ListProjects;
