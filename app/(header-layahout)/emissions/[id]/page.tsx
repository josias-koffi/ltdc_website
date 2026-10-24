import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ViewEmission from "@/container/emissions-pages/ViewEmission";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { EmissionEntity } from "@/libs/interfaces/entities";
import { COVER_WITH_FOCAL_POINT_FIELDS } from "@/libs/stringUtils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const fetchEmission = async (id: string): Promise<EmissionEntity | null> => {
  const request: FetchProps = {
    entity: "emissions",
    fields: [...COVER_WITH_FOCAL_POINT_FIELDS, "video_file.id"],
    filter: { id: { _eq: id } },
  };
  const result: EmissionEntity[] = await getItems(request);
  return result?.[0] ?? null;
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const emission = await fetchEmission(params.id);
  return {
    title: emission?.title
      ? `${emission.title} | Les Travailleurs du Cœur`
      : "Émission | Les Travailleurs du Cœur",
    description:
      emission?.description ?? "Découvrez les émissions de la LTDC.",
  };
};

const EmissionPage = async ({ params }: { params: { id: string } }) => {
  const emission = await fetchEmission(params.id);
  if (!emission) notFound();
  return <ViewEmission emission={emission} />;
};

export default EmissionPage;
