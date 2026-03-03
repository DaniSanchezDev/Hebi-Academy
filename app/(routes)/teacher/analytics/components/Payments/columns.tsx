"use client"

import { ColumnDef } from "@tanstack/react-table"


export type PurchaseWithCourse = {
    id: string,
    userId: string,
    userEmail: string,
    courseId: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
    course: {
        title: string,
        slug: string,
        imageURL: string,
        price: string
    }
}


export const columns: ColumnDef<PurchaseWithCourse>[] = [
  {
    accessorKey: "createdAtFormatted",
    header: "Fecha de compra",
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt).toLocaleDateString("es-ES")
        return (
            <div className="font-medium ">
                {date}
            </div>
        )
    }
  },
  {
    accessorKey: "userEmail",
    header: "Cliente",
  },
  {
    accessorKey: "course.title",
    header: "Curso",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
        const price = row.original.price
        return (
            <div className="font-medium ">
                {price}€
            </div>
        )
    }
  },
]