"use client"
import React, { useEffect, useState } from 'react'
import { ProgressCourseProps } from './ProgressCourse.types'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function ProgressCourse(props: ProgressCourseProps) {
    const {userProgress, chapterCourseId, course} = props
    const {id, slug, chapters} = course
    const [isCompleted, setIsCompleted] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const progress = userProgress.find((progress) => progress.chapterId === chapterCourseId)
      
      if(progress)  {
        setIsCompleted(progress.isCompleted)
      }
    }, [chapterCourseId, userProgress])
    

    const handleViewChapters = async (isCompleted: boolean) => {
      try {
        await axios.patch(`/api/course/${id}/chapter/${chapterCourseId}/progress`, JSON.stringify({isCompleted}))
        
        if (isCompleted) {
          toast("Chapter completed", {
            style: {
              background: '#ecfdf5',
              color: '#047857',
              border: '1px solid #a7f3d0',
              borderRadius: '0.5rem',
              fontWeight: 500,
            }
          })
        } else {
          toast("Chapter not completed", {
            style: {
              background: '#f8fafc',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontWeight: 500,
            }
          })
        }
        
        if(isCompleted) {
          const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterCourseId)
          const nextChapter = chapters[currentIndex + 1]

          if(nextChapter) {
            router.push(`/courses/${slug}/${nextChapter.id}`)
          }
        }

        router.refresh()

      } catch (error) {
        console.log(error)
        toast.error("Error updating progress", {
          style: {
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            fontWeight: 500,
          }
        })
      }
    }

    const totalChapters = chapters.length
    const completedChapters = chapters.filter((chapter) => userProgress.some((progress) => progress.chapterId === chapter.id && progress.isCompleted)).length

    const progressPercentage = totalChapters > 0 
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0

  return (
    <div>
      <div className='my-4 w-full flex items-center gap-3 flex-col p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl shadow-md border border-indigo-100'>
        <span className='text-sm font-medium text-indigo-900'>
          Course Progress | {progressPercentage}%
        </span>
        <Progress value={progressPercentage} className='w-full h-2 [&>*]:bg-gradient-to-r [&>*]:from-indigo-500 [&>*]:to-violet-500'/>
      </div>
      <div className='my-4 w-full'>
        {isCompleted ? (
          <Button 
            className='w-full bg-gradient-to-r from-slate-400 to-blue-300 hover:from-slate-500 hover:to-blue-400 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200' 
            onClick={() => handleViewChapters(!isCompleted)}
          >
            Mark chapter as not completed
          </Button>
        ) : (
          <Button 
            className='w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200' 
            onClick={() => handleViewChapters(!isCompleted)}
          >
            Mark chapter as completed
          </Button>
        )}
      </div>
    </div>
  )
}
