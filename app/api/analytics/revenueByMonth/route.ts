import { getRevenueByMonth } from "@/actions/getRevenueByMonth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const revenueByMonth = await getRevenueByMonth()
        return NextResponse.json(revenueByMonth)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}
