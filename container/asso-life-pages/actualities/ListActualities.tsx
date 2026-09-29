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
          "🌟 Actualités de l'association ! 🌟\n" +
          "Restez à jour avec notre rubrique dédiée aux actualités de l'association ! Découvrez les dernières informations, annonces et projets que nous mettons en place. Nous voulons vous tenir informés des avancées et des initiatives qui nous tiennent à cœur.\n" +
          "Visitez régulièrement cette section pour ne rien manquer et soyez acteur de notre dynamique collective. Ensemble, faisons grandir notre communauté !"
        }
        imageAlt={"image de test"}
        imageUrl={"/images/banners/CHEZ_LTDC_CHAQUE_TALENT_FAIT_LA_DIFFérence-4.png"}
      />
      <ListFromEntity entity={"actualities"} CardType={ActualityCard} />
    </div>
  );
};

export default ListActualities;
