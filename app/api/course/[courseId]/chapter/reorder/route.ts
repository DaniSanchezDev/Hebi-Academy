import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ courseId: string }> },
) {
  try {
    // Verificar autenticación
    const { userId } = await auth();
    const { courseId } = await context.params;

    // Obtener la lista de capítulos a actualizar
    const { list } = await req.json();

    // Verificar que el usuario esté autenticado
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verificar que el curso pertenezca al usuario
    const ownCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Actualizar la posición de cada capítulo
    for (const item of list) {
      await prisma.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    // Devolver éxito
    return NextResponse.json({ success: true });
  } catch (error) {
    // Registrar el error en la consola
    console.error("Error updating chapters:", error);

    // Devolver error al cliente
    return NextResponse.json(
      { error: "Failed to update chapters. Please try again later." },
      { status: 500 },
    );
  }
}
