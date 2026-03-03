export type PurchasesWithCourse = {
    id: string
    userId: string
    courseId: string
    course: {
        id: string
        title: string
        price: string | null
    }
}

type PurchaseWithFormattedDate = PurchasesWithCourse & {
    createdAtFormatted: string
}

export type OrderListProps = {
    purchases: PurchaseWithFormattedDate[]
    receipts: {
        paymentIntentId: string
        receiptUrl: string | null
    }[]
}