import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Chapter, Course } from "@prisma/client";

export const getPurchasedCourses = async () : Promise<
(Course & {chapters: Chapter[] })[] | null
> => {
    const user = await currentUser()

    if(!user?.id) {
        return null
    }

    try {
        // Busca todos los cursos que el usuario actual ha comprado
        const purchasedCourses = await prisma.course.findMany({
            where: {
                purchases: {
                    // Utiliza una relación "some" para encontrar cursos donde al menos
                    // una entrada en la tabla de compras (purchases) coincida con el ID del usuario
                    some: {
                        userId: user.id
                    }
                },
                isPublished: true,
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    }
                }
            }
        })
        return purchasedCourses
    } catch (error) {
        console.log(error)
        return []
    }
}
