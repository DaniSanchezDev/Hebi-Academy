import { getSuscribersByMonth } from "@/actions/getSuscribersByMonth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const totalSuscriptors = await getSuscribersByMonth()
        return NextResponse.json(totalSuscriptors)
        
    } catch(error) {
        console.log(error);
        return new NextResponse("Internal server error", {status: 500})
        
    }
}
