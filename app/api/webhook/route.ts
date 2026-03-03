import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendPurchaseConfirmationEmail } from "@/lib/email-service";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export async function POST(req: Request) {
    const body = await req.text()
    const headerList = await headers()
    const signature = headerList.get("Stripe-Signature")

    let event: Stripe.Event

    // Validar el webhook
    try {
        if (!signature) {
            throw new Error("Stripe signature not found in headers")
        }
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Webhook Error: ${errorMessage}`);
        return new NextResponse(`Webhook Error: ${errorMessage}`, {status: 400});
    }

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId
    const coursePrice = session?.metadata?.price

    const price = coursePrice ? Number(coursePrice.replace(",", ".")) : 0

    // Validar el tipo de evento
    if(event.type === "checkout.session.completed") {
        // Validate webhook data
        if(!userId || !courseId || !coursePrice) {
            return new NextResponse("Webhook error: missing metadata", {status: 400})
        }   

        // Buscar si el usuario ya ha comprado el curso (solo si pasamos los datos anteriores correctamente)
        const existingPurchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                }
            }
        })

        // Si no existe la compra, crearla
        if(!existingPurchase) {
            // Crear la compra en la base de datos
            await prisma.purchase.create({
                data: {
                    userId,
                    courseId,
                    price: price,
                }
            })
            
            try {
                // Buscar el curso para obtener detalles
                const course = await prisma.course.findUnique({
                    where: { id: courseId },
                    include: {
                        chapters: {
                            orderBy: { position: "asc" },
                            take: 1
                        }
                    }
                });
                
                if (course) {
                    // Enviar email usando la API de resend
                    // Formateamos la fecha actual
                    const purchaseDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });
                    
                    // Obtenemos la información del comprador desde la sesión de Stripe
                    const customerEmail = session.customer_details?.email;
                    const customerName = session.customer_details?.name || "Estudiante";
                    
                    if (customerEmail) {
                        // Enviamos el email de confirmación
                        await sendPurchaseConfirmationEmail({
                            to: customerEmail,
                            data: {
                                username: customerName,
                                courseTitle: course.title,
                                courseDescription: course.description || undefined,
                                courseImage: course.imageURL || undefined,
                                courseSlug: course.slug,
                                chapterId: course.chapters[0]?.id || "",
                                price: price.toFixed(2),
                                purchaseDate
                            }
                        });
                    }
                }
            } catch (error) {
                console.error("Error sending confirmation email:", error);
            }
        } else {
            return new NextResponse(null, {status: 200})
        }
    }
    
    return new NextResponse(null, {status: 200})
}