"use server"
import {createDirectus, readItems, rest} from '@directus/sdk';

const client = createDirectus('https://bo-prod.asso-ltdc.org/').with(rest());

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
