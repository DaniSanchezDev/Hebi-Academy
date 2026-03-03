import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Chapters, CourseImage, CoursePrice, HeaderCourse } from "./components";
import CourseForm from "./components/CourseForm/CourseForm";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const { userId } = await auth();

  // Validamos que el usuario este autenticado
  if (!userId) {
    return <p>Please sign in to see the course</p>;
  }

  // Buscamos el curso
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  // Validamos que el curso exista
  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="m-8">
      <HeaderCourse idCourse={courseId} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <CourseImage idCourse={course.id} imageCourse={course.imageURL} />
        <CoursePrice idCourse={course.id} priceCourse={course.price} />
        <Chapters idCourse={course.id} chapters={course.chapters} />
      </div>
    </div>
  );
}
