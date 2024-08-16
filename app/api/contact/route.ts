import {NextRequest, NextResponse} from "next/server";
import {getBodyFromRequest} from "@/libs/requestUtils";
import mailHandler from "@/libs/mailsSender";

export const POST = async (req: NextRequest) => {

    const data = await getBodyFromRequest(req)
    try {
       await  mailHandler(data)
        return NextResponse.json({test: 'success'}, {status: 200})
    } catch (err) {
        console.error(err);
    }
}
