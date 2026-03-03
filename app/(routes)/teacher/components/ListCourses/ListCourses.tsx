import { CourseCard } from "./CourseCard";
import { ListCoursesProps } from "./ListCourses.types";

export function ListCourses(props: ListCoursesProps) {

    const {courses} = props

    if (courses.length === 0) {
        return <p className="text-gray-500 text-center py-8">No courses created yet</p>;
    }
  return (
    <div className="flex flex-col my-4 mx-6 border rounded-lg p-4 gap-10 bg-white">
        {courses.map((course) => (
            <div key={course.id}>
                <CourseCard course={course}/>
                <div className="border-t border-blue-200 w-full mt-4" />
            </div>
        ))}
    </div>
  )
}
