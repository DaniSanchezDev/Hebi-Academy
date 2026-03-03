import { getPurchasedCourses } from "@/actions/getPurchasedCourses"
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse"
import { currentUser } from "@clerk/nextjs/server"
import { AwardIcon } from "lucide-react"
import { CoursesList } from "./components/CoursesList/CoursesList"

export default async function CertificatesPage() {
    const courses = await getPurchasedCourses()
    const user = await currentUser()

    if(!user) {
        return <p>Please sign in to see your certificates</p>
    }

    const userName = `${user.firstName} ${user.lastName ? user.lastName : ""}`

    if(!courses) {
        return null
    }

    const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
            const progress = await getUserProgressByCourse(user.id, course.id)
            return {
                ...course,
                progress
            }
        })
    )

  return (
    <div className="m-6 p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-md">
        <div className="flex items-center gap-1 mb-4">
            <div className="p-2 rounded-full bg-violet-400">
                <AwardIcon className="w-5 h-5 text-white"/> 
            </div>
            <h3 className=" text-xl font-semibold">Course certificates</h3>
        </div>
        <CoursesList courses={coursesWithProgress} userName={userName}/>
    </div>
  )
}
