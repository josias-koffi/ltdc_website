import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const res = await fetch("https://flagcdn.com/fr/codes.json")
        const result = await res.json()
        return NextResponse.json(result, {status: 200})
    } catch (err) {
        console.error(err);
    }
}
