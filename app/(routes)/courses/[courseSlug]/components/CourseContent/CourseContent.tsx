import { CourseContentProps } from "./CourseContent.types";

export function CourseContent(props: CourseContentProps) {
  
    const {chapters} = props

    return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-md border border-indigo-100">
        <h2 className="text-3xl font-semibold mb-6 pb-4 text-indigo-900 border-b border-indigo-100">Course Content</h2>

        <div className="space-y-4">
            {chapters.map((chapter, index) => (
                <div 
                    key={chapter.id} 
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg hover:bg-indigo-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow border border-indigo-100"
                >
                    <div className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                        {index + 1}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-medium text-indigo-900">{chapter.title}</h4>
                    </div>

                    <div className="flex-shrink-0 flex items-center justify-center">
                        <span className={`px-3 py-1.5 text-xs rounded-full font-medium shadow-sm
                            ${chapter.isPublished 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                : "bg-red-50 text-red-700 border border-red-200"}    
                        `}>
                            {chapter.isPublished ? "Published" : "Draft"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
