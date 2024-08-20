"use server"
import {createDirectus, readItems, rest} from '@directus/sdk';

// const URL = process?.env?.NEXT_PUBLIC_BO_URL ?? ""
const URL = "https://stage-ltdc.asso-ltdc.org/"

const client = createDirectus(URL).with(rest());

export const getItems = async (item: 'terms_of_use') => {
    try {
        const result = await client.request(readItems(item));
        if (result) {
            return result;
        }
    } catch (e) {
        console.error(e);
    }
}
