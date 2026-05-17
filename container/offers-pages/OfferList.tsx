import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ActualityCard from "@/components/cards/ActualityCard";
import ListFromEntity from "@/components/list/ListFromEntity";
import OfferCard from "@/components/cards/OfferCard";

const OfferList = () => {
  return (
    <div>
      <RubriqueHead
        title={"Les offres de la LTDC"}
        description={
          "Notre association propose un large éventail de solutions et de programmes pour répondre aux besoins des personnes en situation irrégulière. Qu’il s’agisse de missions de bénévolat, de formations spécialisées ou d’accompagnements individuels, vous trouverez une offre adaptée à votre envie de vous impliquer et de faire la différence. Rejoignez-nous et participez à nos actions solidaires pour soutenir et accompagner celles et ceux qui en ont le plus besoin"
        }
        imageAlt={"Images des offres"}
        imageUrl={"/images/asso_ban_2.png"}
      />
      <ListFromEntity entity={"offer"} CardType={OfferCard} />
    </div>
  );
};

export default OfferList;
