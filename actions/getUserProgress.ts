import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getUserProgress = async() => {
    try {
        const user = await currentUser()

        if(!user?.id) {
            throw new Error("User not found")
        }

        const userProgress = await prisma.userProgress.findMany({
            where: {
                userId: user.id
            }
        })

        return userProgress
           
    } catch (error) {
        console.log(error);
        return []
    }   
}