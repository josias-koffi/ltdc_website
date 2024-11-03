import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import EventCard from "@/components/cards/EventCard";

const ListEvents = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les évenements de la LTDC"}
        description={
          "Née d'une conviction forte, notre association combine innovation et solidarité pour avoir un impact réel sur la vie de nos bénéficiaires. Nous travaillons chaque jour à créer un avenir meilleur pour to"
        }
        imageAlt={"image de test"}
        imageUrl={"/images/aboutPage/groupe_image.jpg"}
      />
      <ListFromEntity
        entity={"events"}
        CardType={EventCard}
        itemsSize={{ sm: 12, xs: 12, md: 12, xl: 12 }}
      />
    </div>
  );
};

export default ListEvents;
