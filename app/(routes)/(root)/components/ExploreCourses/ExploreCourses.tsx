"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export function ExploreCourses() {
  
  const router = useRouter()
  return (
    <div>
      <div className='my-4 mx-6 border rounded-lg shadow-md p-6 bg-gradient-to-br from-indigo-50 to-violet-50'>
        <div className='grid grid-cols-1 md:grid-cols-[70%_30%] gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold text-indigo-900'>Unlock Your Potential with Online Learning</h1>
            <p className='text-balance text-gray-600'> Discover expert-led courses in programming, design, business, and more. 
            Learn at your own pace with our comprehensive curriculum designed for all skill levels.</p>
            <Button 
              className='w-fit mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'
              onClick={() => router.push('/courses')}
            >
              Explore Courses
            </Button>
          </div>
          <div className='flex items-end'>
            <Image src="/exploreCourses.webp" alt='Explore all the courses' width={200} height={200}/>
          </div>
        </div>
      </div>
    </div>
  )
}
