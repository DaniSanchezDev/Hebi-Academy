import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ courses: [] });
    }

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageURL: true,
        price: true,
        category: true,
      },
      take: 5, // Limitamos a 5 resultados para no sobrecargar la interfaz
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("[SEARCH_ERROR]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
