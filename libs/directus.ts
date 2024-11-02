"use server";
import { aggregate, createDirectus, readItems, rest } from "@directus/sdk";
import { EntityInterface, FetchProps } from "@/libs/interfaces/Interfaces";

const URL = process?.env?.NEXT_PUBLIC_BO_URL;

let client: any = undefined;

if (URL) {
  client = createDirectus(URL).with(rest());
}

export const getItems = async ({
  entity,
  deepFields,
  limit,
  page,
  filter,
}: FetchProps) => {
  let createFilter = {
    ...{ fields: [deepFields ? "*.*.*" : "*"] },
    //@ts-expect-error type error
    ...limit,
    //@ts-expect-error error
    ...page,
  };

  if (filter) {
    createFilter = { ...createFilter, ...{ filter } };
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

export const getTotalPostCount = async (item: EntityInterface["name"]) => {
  const totalCount = await client.request(
    //@ts-expect-error Invalid typing
    aggregate(item, {
      aggregate: { count: "*" },
    }),
  );
  return totalCount[0].count;
};
