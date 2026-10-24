import React from "react";
import { getItems } from "@/libs/directus";
import ViewActualities from "@/container/activities-pages/view-pages/ViewActualities";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { ActualitiesEntity } from "@/libs/interfaces/entities";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COVER_WITH_FOCAL_POINT_FIELDS } from "@/libs/stringUtils";

// Contenu édité dans le BO : sans cela, Next met en cache la réponse Directus
// et la page ne reflète pas les modifications publiées. `dynamic` seul ne
// suffit pas ici : les appels passent par une Server Action (libs/directus).
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Fonction utilitaire pour récupérer une actuality par ID
const fetchActuality = async (
  id: string,
): Promise<ActualitiesEntity | null> => {
  const request: FetchProps = {
    entity: "actualities",
    // Dimensions de la couverture : le bandeau prend son ratio dès le rendu.
    fields: COVER_WITH_FOCAL_POINT_FIELDS,
    filter: { id: { _eq: id } },
  };

  const res: ActualitiesEntity[] = await getItems(request);
  return res.length > 0 ? res[0] : null;
};

// Générer les métadonnées dynamiques
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const actuality = await fetchActuality(params.id);

  return {
    title: actuality?.title || "Actuality | Acme Dashboard",
    description: actuality?.description || "Discover the latest actuality",
  };
};

// Composant principal
const ActualityView = async ({ params }: { params: { id: string } }) => {
  const actuality = await fetchActuality(params.id);

  if (!actuality) {
    notFound();
  }

  return <ViewActualities actuality={actuality} />;
};

export default ActualityView;
