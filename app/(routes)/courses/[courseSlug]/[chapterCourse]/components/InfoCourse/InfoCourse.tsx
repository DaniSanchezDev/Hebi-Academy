import React from 'react'
import { InfoCourseProps } from './InfoCourse.types'
import { Lock } from 'lucide-react'
import { VideoCourse } from './VideoCourse'
import { ProgressCourse } from './ProgressCourse'

export function InfoCourse(props: InfoCourseProps) {
    
    const {course, chapterCourseId, userProgress, purchaseCourse, videoUrl} = props

    const {
        title,
        category,
        description
    } = course

  return (
    <div className='w-full relative'>
        {!purchaseCourse && (
            <div className=' absolute inset-0 flex flex-col items-center justify-center backdrop:blur-md gap-y-2 h-full z-30 rounded-md text-secondary'>
                <Lock className='w-8 h-8' />
                <p> The course is blocked. Please buy the course</p>
            </div>
        )}

        {videoUrl && (
            <VideoCourse videoUrl={videoUrl}/>
        )}

        <ProgressCourse userProgress={userProgress} chapterCourseId={chapterCourseId} course={course}/>

        <div className='mt-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-6 shadow-md border border-indigo-100'>
            <h2 className='text-2xl font-semibold mb-4 text-indigo-900'>{title}</h2>
            <div className='w-fit mb-4 px-3 py-1.5 rounded-full text-white font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-xs shadow-sm'>{category}</div>
            <p className='text-gray-600 mb-4 text-sm leading-relaxed'>{description}</p>
        </div>
    </div>
  )
}
