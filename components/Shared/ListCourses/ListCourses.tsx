import Link from "next/link";
import { ListCoursesProps } from "./ListCourses.types";
import Image from "next/image";
import { IconBadge } from "../IconBadge";
import { Book, ChartNoAxesColumn } from "lucide-react";
import { ProgressCourse } from "./ProgressCourse";

export function ListCourses(props : ListCoursesProps) {

    const { title, courses } = props;

  return (
    <div>
        <div className="my-4 mx-6 border rounded-lg bg-white p-6">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="border-b-[1px] py-2"/>
            {courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {courses.map(({id, imageURL, title, level, price, slug, category, chapters}) => (
                       <Link 
                            href={`/courses/${slug}`} 
                            key={id}
                            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/40 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-primary/30 p-4 relative"
                        >
                        <div className="w-full h-[200px] relative mb-3">
                        <span className="absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium rounded-full bg-primary/90 text-white backdrop-blur-sm shadow-sm">{category}</span>
                            <Image 
                                src={imageURL || '/default-image.jpg'} 
                                alt={title} fill 
                                className="object-cover object-center rounded-t-lg" 
                                sizes="(max-width: 768px) 100vw, (max-width: 500px) 100vw, 1200px"/>
                        </div>
                        <div className="p-2">
                            <h3 className="text-lg font-semibold truncate">{title}</h3>
                        </div>
                        <div className="flex items-center gap-3 justify-between mt-3">
                            <IconBadge icon={Book} text={`${chapters.length} ${chapters.length === 1 ? 'Chapter' : 'Chapters'}`} className="text-sm"/>
                            <IconBadge icon={ChartNoAxesColumn} text={level || "All Levels"} className="text-sm"/>
                        </div>
                        <ProgressCourse courseId={id} totalChapters={chapters.length} price={price}/>
                       </Link>
                    ))}
                </div>
            ): (
                <p className="text-center text-gray-500 mt-5">No courses found</p>
            )}
        </div>
    </div>
  )
}
