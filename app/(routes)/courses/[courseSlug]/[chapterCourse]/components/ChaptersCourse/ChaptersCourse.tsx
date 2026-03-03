import React from 'react'
import { ChapterCourseProps } from './ChaptersCourse.types'
import { ChaptersList } from './ChaptersList'

export function ChaptersCourse(props : ChapterCourseProps) {
    const {chapters, courseSlug, chapterCourse, userProgress} = props
    
  return (
    <div className='p-5 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-md border border-indigo-100'>
      <h2 className='text-2xl font-semibold mb-4 text-indigo-900'>Chapters</h2>

      <ChaptersList 
        chapters={chapters}
        courseSlug={courseSlug}
        currentChapter={chapterCourse}
        userProgress={userProgress}
      />
    </div>
  )
}
