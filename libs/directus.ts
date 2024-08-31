"use server";
import { createDirectus, readItems, rest } from "@directus/sdk";

const URL = process?.env?.DIRECTUS_BO_URL;
// const URL = "https://bo-prod.asso-ltdc.org/"

let client: any = undefined;

if (URL) {
  client = createDirectus(URL).with(rest());
}

export const getItems = async (item: "terms_of_use" | "esf_program") => {
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
