import React from "react";
import { getItems } from "@/libs/directus";
import ViewActualities from "@/container/activities-pages/view-pages/ViewActualities";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { ActualitiesEntity } from "@/libs/interfaces/entities";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";

// Fonction utilitaire pour récupérer une actuality par ID
const fetchActuality = async (
  id: string,
): Promise<ActualitiesEntity | null> => {
  const request: FetchProps = {
    entity: "actualities",
    deepFields: false,
    filter: { id: id },
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

  revalidatePath("/actualities/[id]", "page");

  if (!actuality) {
    throw new Error("Actualité non trouvé"); // Gérer le cas où l'actualité n'existe pas
  }

  return <ViewActualities actuality={actuality} />;
};

export default ActualityView;
