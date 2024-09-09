"use server";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { EntityInterface } from "@/libs/interfaces/mailType";

const URL = process?.env?.NEXT_PUBLIC_BO_URL;

let client: any = undefined;

if (URL) {
  client = createDirectus(URL).with(rest());
}

export const getItems = async (item: EntityInterface["name"]) => {
  if (client !== undefined) {
    try {
      //   @ts-expect-error Type error: Argument of type 'string' is not assignable to parameter of type 'never'
      const result = await client.request(readItems(item));
      if (result) {
        return result;
      }
    } catch (e) {
      console.error(e);
    }
  }
};
