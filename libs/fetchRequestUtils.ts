import {NextRequest} from "next/server";

export const returnObjectFilterInFunctionOfString = async (
    req: NextRequest,
) => {
    const searchParams = req?.nextUrl?.searchParams;
    const paramValue = searchParams?.get("params");
    if (paramValue) {
        return JSON.parse(paramValue);
    }
    return {};
};
