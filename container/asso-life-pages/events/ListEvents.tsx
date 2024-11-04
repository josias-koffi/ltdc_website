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
          "🌟 Événements à venir ! 🌟\n" +
          "Découvrez notre section dédiée aux événements liée à l'association ! Restez informés des activités, ateliers et rencontres que nous organisons tout au long de l’année. Ne manquez pas l’occasion de participer et de vous impliquer dans notre communauté !\n" +
          "Visitez régulièrement cette rubrique pour ne rien rater et rejoignez nous pour des moments enrichissants et conviviaux."
        }
        imageAlt={"image de test"}
        imageUrl={"/images/enventPage/event_header.png"}
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
