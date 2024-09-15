"use server";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { EntityInterface } from "@/libs/interfaces/mailType";

const URL = process?.env?.NEXT_PUBLIC_BO_URL;

let client: any = undefined;

if (URL) {
  client = createDirectus(URL).with(rest());
}

export const getItems = async (
  item: EntityInterface["name"],
  deepFields: boolean = false, // get all fields
  id?: number | string,
) => {
  try {
    const result = await client.request(
      readItems(item, {
        filter: { id },
        fields: [deepFields ? "*.*.*" : "*"],
      }),
    );
    console.log("BON");
    console.log(result);
    if (result) {
      return result;
    }
  } catch (e) {
    console.error(e);
  }
};
