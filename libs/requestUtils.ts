import {NextRequest} from "next/server";

/**
 * Parses the JSON body from a Next.js request.
 * @param req The incoming Next.js request.
 * @returns The parsed body as a generic type T, or an empty object if parsing fails.
 */
export const getBodyFromRequest = async <T = any>(
    req: NextRequest,
): Promise<T | {}> => {
    try {
        const body = await req?.json(); // Attempt to parse the body as JSON
        return body ?? {}; // Return the body if not null or undefined, otherwise return an empty object
    } catch (error) {
        console.error("Error parsing request body:", error);
        return {}; // Return an empty object in case of error
    }
};
