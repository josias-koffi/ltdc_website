import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import ActualityCard from "@/components/cards/ActualityCard";

const ListActualities = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les actualitées de la LTDC"}
        description={
          "Une actualité est une information pertinente pour les " +
          "bénéficiaires de l'association, souvent liée à l'emploi, au logement, " +
          "aux démarches administratives ou à l'actualité législative et juridique" +
          " en France. Elle vise à informer et orienter les personnes " +
          "accompagnées par l'association dans leur processus d'insertion.\n"
        }
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/clay-banks-LjqARJaJotc-unsplash.jpg"}
      />
      <ListFromEntity entity={"actualities"} CardType={ActualityCard} />
    </div>
  );
};

export default ListActualities;
