import { Chapter } from "@prisma/client"

export type ChapterProps = {
    idCourse: string
    chapters: Chapter[] | null
}