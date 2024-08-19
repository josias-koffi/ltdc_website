import {NextResponse} from "next/server";
import {getItems} from "@/libs/directus";


export async function GET() {
    try {
        const response = await getItems("terms_of_use");
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {message: "Erreur lors de la récupération des données"},
            {status: 500},
        );
    }
}
