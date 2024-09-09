import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import ProjectsCards from "@/components/cards/ProjectsCards";

const ListProjects = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les projets de la LTDC"}
        description={"test de la page"}
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/clay-banks-LjqARJaJotc-unsplash.jpg"}
      />
      <ListFromEntity entity={"projects"} CardType={ProjectsCards} />
    </div>
  );
};

export default ListProjects;
