import { Chapter, UserProgress } from "@prisma/client"

export type ChaptersListProps = {
    chapters: Chapter[]
    courseSlug: string
    currentChapter: string
    userProgress: UserProgress[]
}
