import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { getIsPurchasedCourse } from "@/actions/getPurchasedCourse";
import { getUserProgress } from "@/actions/getUserProgress";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChaptersCourse, InfoCourse } from "./components";

export default async function ChapterCoursePage({params} :  
    // El promise tiene que hacer referencia a la ruta dinámica que hemos puesto en las carpetas
    {params: Promise<{courseSlug: string, chapterCourse: string}>}) {
        const {courseSlug, chapterCourse} = await params

        const user = await currentUser()

        if(!user) {
            redirect("/")
        }

        const course = await getCourseBySlug(courseSlug)
       
        const userProgress = await getUserProgress()
                
        if(!course) {
            return redirect(`/courses/${courseSlug}`)
        }


        const isPurchasedCourse = await getIsPurchasedCourse(user.id, course.id)

        if(!isPurchasedCourse) {
            return redirect(`/courses/${courseSlug}`)
        }

        const videoUrl = course.chapters.find((chapter) => chapter.id === chapterCourse)?.videoUrl


  return (
    <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
            <InfoCourse course={course} chapterCourseId={chapterCourse} userProgress={userProgress} purchaseCourse={isPurchasedCourse} videoUrl={videoUrl}/>
            <ChaptersCourse chapters={course.chapters} courseSlug={courseSlug} chapterCourse={chapterCourse} userProgress={userProgress}/>
        </div>
    </div>
  )
}
