import { Chapter, Course, UserProgress } from "@prisma/client"

export type InfoCourseProps = {
    course: Course & {
        chapters: Chapter[]
    },
    chapterCourseId: string,
    userProgress: UserProgress[],
    purchaseCourse:boolean,
    videoUrl: string | null | undefined
}
