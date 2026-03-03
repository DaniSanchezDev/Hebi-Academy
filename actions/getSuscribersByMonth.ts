import prisma from "@/lib/prisma";
import { format, startOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";


export async function getSuscribersByMonth() {
    const now = new Date();
    const fourMonthsAgo = startOfMonth(subMonths(now, 3)); // Cambiado a 3 para obtener 4 meses (actual + 3 anteriores)

    const purchases = await prisma.purchase.findMany({
        where: {
            createdAt: {
                gte: fourMonthsAgo,
            },
        },
        select: {
            createdAt: true
        }
    });

    const months = Array.from({length: 4}, (_, i) => {
        const date = subMonths(now, 3-i)

        return {
            month: format(date, "LLLL" , {locale: es}),
            count: 0,
            date: format(date, "yyyy-MM")
        }
    })

    purchases.forEach((purchases) => {
        const purchaseMonth = format(purchases.createdAt, "yyyy-MM")
        const month = months.find((month) => month.date === purchaseMonth)
        if(month) {
            month.count += 1
        }
    })

    return months.map(month => ({
        month: month.month, 
        users: month.count 
    }))

}