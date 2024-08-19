import {NextRequest, NextResponse} from "next/server";
import {getItems} from "@/libs/directus";
import {returnObjectFilterInFunctionOfString} from "@/libs/fetchRequestUtils";


export async function GET(req: NextRequest) {

    try {
        const response = await getItems("terms_of_use");
        console.log(response);
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {message: "Erreur lors de la récupération des données"},
            {status: 500},
        );
    }
}
