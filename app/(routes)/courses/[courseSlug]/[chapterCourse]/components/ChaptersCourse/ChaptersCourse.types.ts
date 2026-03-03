import { Chapter, UserProgress } from "@prisma/client"

export type ChapterCourseProps = {
    chapters: Chapter[]
    courseSlug: string
    chapterCourse: string
    userProgress: UserProgress[]
}