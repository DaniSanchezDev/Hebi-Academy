// app/(routes)/teacher/components/ListCourses/CourseCard/CourseCard.types.ts
import { Course } from "@prisma/client";

export type CourseCardProps = {
  course: Course;
};
