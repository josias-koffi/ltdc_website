"use server"
import {createDirectus, readItems, rest} from '@directus/sdk';

// const URL = process?.env?.NEXT_PUBLIC_BO_URL ?? ""
const URL = "https://bo-prod.asso-ltdc.org/"

const client = createDirectus(URL).with(rest());

export const getItems = async (item: 'terms_of_use'|'esf_program') => {
    try {
        const result = await client.request(readItems(item));

        if (result) {
            return result;
        }
    } catch (e) {
        console.error(e);
    }
}
