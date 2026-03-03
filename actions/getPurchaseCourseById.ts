import prisma from "@/lib/prisma"

export const getPurchaseCourseById = async (userId: string, courseId: string): Promise<boolean> => {
    // Obtenemos si un usuario ha comprado un curso
    try {
     const purchase = await prisma.purchase.findUnique({
        where: {
            userId_courseId : {
                userId,
                courseId
            }
        },
        include: {
            course: true
        }
     })        
     return !!purchase 
    } catch (error) {
        console.log(error);
        return false
        
    }
}
    
