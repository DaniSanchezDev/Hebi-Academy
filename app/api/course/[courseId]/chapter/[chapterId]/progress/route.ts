import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> },
) {
  const { userId } = await auth();
  const { courseId, chapterId } = await context.params;
  const { isCompleted } = await req.json();

  // Validamos que exista el usuario
  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        courseId: true,
      },
    });

    if (!chapter || chapter.courseId !== courseId) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Actualizamos el progreso del usuario
    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[ERROR_PROGRESS_UPDATE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
