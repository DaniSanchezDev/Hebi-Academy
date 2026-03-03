import Image from "next/image";
import { CoursesListProps } from "./CoursesList.types";
import { CourseProgressDisplay } from "./CourseProgressDisplay";

export function CoursesList(props: CoursesListProps) {

    const {courses, userName} = props

  return (
    <div className="grid grid-cols-1 gap-5 max-w-4xl mx-auto">
        {courses.map((course) => (
            <div 
                key={course.id} 
                className="flex items-center p-6 gap-6 justify-between bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 shadow-md hover:shadow-lg transition-all duration-300 hover:border-indigo-200"
            >
                <div className="flex gap-5">
                    <div className="shrink-0">
                      <Image 
                        src={course.imageURL || "/default-image.jpg"}
                        alt={course.title}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover border border-indigo-100"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-indigo-900">{course.title}</h2>
                        <p className="max-w-sm text-sm text-slate-700/70 line-clamp-2">{course.description}</p>
                    </div>
                </div>
                <div>
                 <CourseProgressDisplay 
                   progress={course.progress} 
                   titleCourse={course.title} 
                   userName={userName} 
                 />
                </div>
            </div>
        ))}
    </div>
  )
}
