import { getCourseBySlug } from "@/actions/getCourseBySlug"
import { BreadCrumbCourse, CourseContent, HeroBlockCourse } from "./components"
import { redirect } from "next/navigation"
import { getPurchaseCourseById } from "@/actions/getPurchaseCourseById"
import { currentUser } from "@clerk/nextjs/server"

export async function generateMetadata({params}: {params: Promise<{courseSlug: string}>}) {
    const {courseSlug} = await params
    const infoCourse = await getCourseBySlug(courseSlug)
    
    if(!infoCourse) {
      return null
    }

    return {
        title: `Course ${infoCourse.title} | Hebi Academy`,
        description: `${infoCourse.description}`,
    }
}

export default async function CoursePage({params}: {params: Promise<{courseSlug: string}>}) {

    const {courseSlug} = await params
    const infoCourse = await getCourseBySlug(courseSlug)
    
    if(!infoCourse) {
        redirect("/")
    }
    const {title, id} = infoCourse
    
    const user = await currentUser()
    if(!user) {
      redirect("/")
    }
    const purchaseCourse = await getPurchaseCourseById(
      user.id,
      id
    )


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-indigo-50/50 to-white min-h-screen">
      <div className="space-y-8">
        <div>
          <BreadCrumbCourse title={title}/>
        </div>

        <div>
          <HeroBlockCourse course={infoCourse} purchaseCourse={purchaseCourse}/>
        </div>

        <div className="mb-12">
          <CourseContent chapters={infoCourse.chapters}/>
        </div>
      </div>
    </div>
  )
}
