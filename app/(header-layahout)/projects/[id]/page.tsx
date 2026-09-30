import React from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { ProjectEntity } from "@/libs/interfaces/entities";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ViewProject from "@/container/projects-pages/view/ViewProject";
import { COVER_WITH_FOCAL_POINT_FIELDS } from "@/libs/stringUtils";

// Contenu édité dans le BO : sans cela, Next met en cache la réponse Directus
// et la page ne reflète pas les modifications publiées. `dynamic` seul ne
// suffit pas ici : les appels passent par une Server Action (libs/directus).
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const fetchProjects = async (id: string): Promise<ProjectEntity | null> => {
  const request: FetchProps = {
    entity: "projects",
    fields: COVER_WITH_FOCAL_POINT_FIELDS,
    filter: { id: { _eq: id } },
  };

  const res: ProjectEntity[] = await getItems(request);
  return res.length > 0 ? res[0] : null;
};

// Générer les métadonnées dynamiques
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const project = await fetchProjects(params.id);

  return {
    title: project?.title || "Project | La LTDC est la pour vous",
    description: project?.description || "Découvrez nos derniers projets",
  };
};

const ProjectView = async ({ params }: { params: { id: string } }) => {
  const project = await fetchProjects(params.id);

  if (!project) {
    notFound();
  }

  return <ViewProject project={project} />;
};

export default ProjectView;
