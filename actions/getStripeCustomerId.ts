import prisma from "@/lib/prisma";

export const getStripeCustomerId = async (userId: string) => {
    try {
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId: userId
            }
        })
        return stripeCustomer?.stripeCustomerId
    } catch (error) {
        console.log(error)
        return null
    }
}
