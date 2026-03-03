import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}:
    {params: Promise<{courseId: string}>}) {
        const {courseId} = await params;
        const {userId} = await auth();    

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        try {
            const existingPurchase = await prisma.purchase.findUnique({
                where: {
                    userId_courseId: {
                        courseId,
                        userId
                    }
                }
            })   

            if(existingPurchase) {
                return new NextResponse("Already enrolled" , {status: 400})
            }

            await prisma.purchase.create({
                data: {
                    userId,
                    courseId,
                    price: 0
                }
            })

            return new NextResponse("Enrolled", {status: 200})
        } catch (error) {
            console.log(error);
            return new NextResponse("Internal Error", {status: 500})
            
        }



}