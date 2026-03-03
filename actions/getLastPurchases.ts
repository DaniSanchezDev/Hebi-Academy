import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function getLastPurchases(limit: number = 10) {
  try {
    const purchase = await prisma.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        course: {
          select: {
            title: true,
            slug: true,
            imageURL: true,
            price: true,
          },
        },
      },
    });

    const actualClerkClient = await clerkClient();

    const purchaseWithEmails = await Promise.all(
      purchase.map(async (purchase) => {
        try {
          const user = await actualClerkClient.users.getUser(purchase.userId);
          return {
            ...purchase,
            userEmail: user.emailAddresses[0]?.emailAddress || "No email",
          };
        } catch (error: unknown) {
          if (typeof error === 'object' && error !== null && 'status' in error && (error as {status: number}).status === 404) {
            return {
              ...purchase,
              userEmail: "User not found",
            };
          }
          
          console.warn(`Error trying get info user ${purchase.userId}`);
          return {
            ...purchase,
            userEmail: "Error trying get email user",
          };
        }
      })
    );

    return purchaseWithEmails;
  } catch (error) {
    console.error("Error trying get last purchases:", error);
    return [];
  }
}
