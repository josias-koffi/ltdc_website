import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import EventCard from "@/components/cards/EventCard";

const ListEvents = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les évenements de la LTDC"}
        description={"test de la page"}
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/groupe_image.jpg"}
      />
      <ListFromEntity entity={"events"} CardType={EventCard} />
    </div>
  );
};

export default ListEvents;
