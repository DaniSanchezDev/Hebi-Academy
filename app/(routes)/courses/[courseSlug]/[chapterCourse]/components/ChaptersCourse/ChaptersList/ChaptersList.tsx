import Link from "next/link";
import { ChaptersListProps } from "./ChaptersList.types";
import { EyeIcon, LockIcon } from "lucide-react";

export function ChaptersList(props : ChaptersListProps) {

    const {chapters, courseSlug, currentChapter, userProgress} = props

    if(!chapters) {
        return null
    }
    
  return (
    <div className="grid gap-4">
        {chapters.map((chapter) => {
            const isCurrent = chapter.id === currentChapter;
            // Si el usuario ha completado el capítulo
            const isCompleted = userProgress.some(
                (progress) => progress.chapterId === chapter.id && progress.isCompleted
            );
            
            return (
                <Link 
                    href={`/courses/${courseSlug}/${chapter.id}` } 
                    key={chapter.id}
                    className={`flex items-center justify-between rounded-md transition-all duration-200`}
                >
                    <div className={`flex items-center gap-2 justify-between w-full rounded-md p-3 shadow-sm border transition-all duration-200 ${
                        isCurrent 
                            ? 'border-indigo-300 bg-gradient-to-r from-indigo-200 to-violet-200 shadow-md' 
                            : isCompleted 
                                ? 'border-emerald-100 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-200 hover:shadow-md' 
                                : 'border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md'
                    }`}>
                        <span className={`font-medium ${
                            isCurrent ? 'text-indigo-900' : isCompleted ? 'text-emerald-700' : 'text-slate-700'
                        }`}>{chapter.title}</span>
                        {isCompleted ? (
                            <EyeIcon className="w-4 h-4 text-slate-400" />
                        ) : (
                            <LockIcon className="w-4 h-4 text-violet-600" />
                        )}
                    </div>
                </Link>
            )
        })}
    </div>
  )
}
