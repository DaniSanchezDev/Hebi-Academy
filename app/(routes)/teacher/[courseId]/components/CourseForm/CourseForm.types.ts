import { Chapter, Course } from "@prisma/client"

export type CouseFormTypes = {
    course: CourseRelations
}

type CourseRelations = Course & {
    chapters: Chapter[]
}