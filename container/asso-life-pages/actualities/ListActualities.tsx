import React from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import RubriqueWrapper from "@/components/wrapper/RubriqueWrapper";
import RubriqueHead from "@/components/sections/RubriqueHead";

const ListActualities = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les actualitées de la LTDC"}
        description={"test de la page"}
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/clay-banks-LjqARJaJotc-unsplash.jpg"}
      />
    </div>
  );
};

export default ListActualities;
