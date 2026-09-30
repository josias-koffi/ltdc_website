"use server";
import { aggregate, createDirectus, readItems, rest } from "@directus/sdk";
import { EntityInterface, FetchProps } from "@/libs/interfaces/Interfaces";

const URL = process?.env?.NEXT_PUBLIC_BO_URL;

let client: any = undefined;

if (URL) {
  client = createDirectus(URL).with(rest());
}

const PUBLISHED = { _eq: "published" };

// Filtre de publication par collection : seul le contenu publié doit sortir
// du BO, quel que soit l'environnement (le rôle public de la staging voit
// aussi les brouillons). Les tables de jonction filtrent sur l'entité liée.
const PUBLISHED_FILTERS: Partial<Record<EntityInterface["name"], object>> = {
  terms_of_use: { status: PUBLISHED },
  esf_program: { status: PUBLISHED },
  actualities: { status: PUBLISHED },
  categories: { status: PUBLISHED },
  projects: { status: PUBLISHED },
  events: { status: PUBLISHED },
  targets: { status: PUBLISHED },
  offer: { status: PUBLISHED },
  actualities_categories: { categories_id: { status: PUBLISHED } },
  actualities_targets: { targets_id: { status: PUBLISHED } },
  projects_targets: { targets_id: { status: PUBLISHED } },
};

const withPublishedFilter = (
  entity: EntityInterface["name"],
  filter?: FetchProps["filter"],
) => {
  const published = PUBLISHED_FILTERS[entity];
  if (!published) return filter;
  return filter ? { _and: [filter, published] } : published;
};

export const getItems = async ({
  entity,
  deepFields,
  fields,
  limit,
  page,
  filter,
  sort,
}: FetchProps) => {
  let createFilter = {
    ...{ fields: fields ?? [deepFields ? "*.*.*" : "*"] },
    ...(limit ? { limit } : {}),
    ...(page ? { page } : {}),
  };

  const publishedFilter = withPublishedFilter(entity, filter);
  if (publishedFilter) {
    createFilter = { ...createFilter, ...{ filter: publishedFilter } };
  }
  if (sort) {
    createFilter = { ...createFilter, ...{ sort } };
  }
  try {
    //@ts-expect-error Type error: Argument of type 'string' is not assignable to parameter of type 'never'
    const result = await client.request(readItems(entity, createFilter));
    if (result) {
      return result;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getTotalPostCount = async (
  item: EntityInterface["name"],
  filter?: FetchProps["filter"],
) => {
  const publishedFilter = withPublishedFilter(item, filter);
  const totalCount = await client.request(
    //@ts-expect-error Invalid typing
    aggregate(item, {
      aggregate: { count: "*" },
      ...(publishedFilter ? { query: { filter: publishedFilter } } : {}),
    }),
  );
  return totalCount[0].count;
};
