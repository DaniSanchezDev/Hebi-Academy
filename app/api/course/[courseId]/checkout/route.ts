import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request, {params} : {params: Promise<{courseId: string}>}){
    const {courseId} = await params;
    const {userId} = await auth();

    if(!userId){
        return new NextResponse("Unauthorized", {status: 401})
    }

    const user = await currentUser();

    try {
        // Buscar el curso que compramos
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                isPublished:true
            }, 
            include: {
                chapters: {
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })

        if(!course){
            return new NextResponse("Course not found", {status: 404})
        }
        
        // Buscar si el usuario ya ha comprado el curso
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                }
            }
        })

        if(purchase){
            return new NextResponse("Already purchased", {status: 400})
        }

        // Calcular el precio formateandolo
        const price = course.price ? Number(course.price.replace(",", ".")) : 0;

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [

            {
                quantity: 1,
                price_data: {
                    currency: "EUR",
                    product_data: {
                        name: course.title,
                    },
                    unit_amount: Math.round(price * 100)
                }
            }
        ]

        // Buscar el cliente de stripe
        let stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId:userId,
            },
            select: {
                stripeCustomerId: true,
            }
        })

        // Si no existe el cliente de stripe, crearlo
        if(!stripeCustomer){
         const customer = await stripe.customers.create({
            email: user?.emailAddresses[0].emailAddress,

         })   

         stripeCustomer = await prisma.stripeCustomer.create({
            data: {
                userId,
                stripeCustomerId: customer.id,
            }
         })
        }

        // Crear la sesion de checkout
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: "payment",
            // Redireccionar a la pagina del curso si sale ok
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}/${course.chapters[0].id}?success=1`,
            // Redireccionar a la pagina del curso si sale mal
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}?cancelled=1`,
            metadata: {
                courseId: courseId,
                userId: userId,
                price: course.price ? course.price.toString() : "0"
            }
        })

        return NextResponse.json({url: session.url})

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", {status: 500})
    }
}