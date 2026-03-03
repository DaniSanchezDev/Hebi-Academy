import prisma from "@/lib/prisma";

export const getIsPurchasedCourse = async (userId:string, courseId: string) : Promise<boolean> => {
    try {
        const purchase = await prisma.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        })
 
        // convertir cualquier valor a su equivalente booleano
        return !!purchase

    } catch (error) {
        console.log(error);
        return false
    }
}