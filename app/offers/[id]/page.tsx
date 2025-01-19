import React from "react";
import { OfferEntity } from "@/libs/interfaces/entities";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { getItems } from "@/libs/directus";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import OfferView from "@/container/offers-pages/OfferView";

// Fonction utilitaire pour récupérer une actuality par ID
const fetchOffers = async (id: string): Promise<OfferEntity | null> => {
  const request: FetchProps = {
    entity: "offer",
    deepFields: false,
    filter: { id: id },
  };

  const res: OfferEntity[] = await getItems(request);
  return res.length > 0 ? res[0] : null;
};

// Générer les métadonnées dynamiques
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const actuality = await fetchOffers(params.id);

  return {
    title: actuality?.name || "Offres",
    description: actuality?.description || "Discover the latest offer",
  };
};

const OfferById = async ({ params }: { params: { id: string } }) => {
  const offer = await fetchOffers(params.id);

  revalidatePath("/offers/[id]", "page");

  if (!offer) {
    throw new Error("Offre non trouvé"); // Gérer le cas où l'actualité n'existe pas
  }

  return <OfferView offer={offer} />;
};

export default OfferById;
