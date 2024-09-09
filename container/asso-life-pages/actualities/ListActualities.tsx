import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import ActualityCard from "@/components/cards/ActualityCard";

const ListActualities = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les actualitées de la LTDC"}
        description={"test de la page"}
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/clay-banks-LjqARJaJotc-unsplash.jpg"}
      />
      <ListFromEntity entity={"actualities"} CardType={ActualityCard} />
    </div>
  );
};

export default ListActualities;
