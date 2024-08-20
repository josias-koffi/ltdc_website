import {NextRequest, NextResponse} from "next/server";
import {getBodyFromRequest} from "@/libs/requestUtils";
import mailHandler from "@/libs/mailsSender";

export const POST = async (req: NextRequest) => {

    const data = await getBodyFromRequest(req)
    try {
        const res = await mailHandler(data)
        return NextResponse.json(res, {status: 200})
    } catch (err) {
        console.error(err);
    }
}
