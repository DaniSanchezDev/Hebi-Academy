import { getPurchasedCourses } from '@/actions/getPurchasedCourses'
import { ListCourses } from '@/components/Shared';
import React from 'react'

export default async function MyCoursesPage() {
    const courses = await getPurchasedCourses()
    console.log(courses);
    
  return (
    <div>
        <ListCourses title="My Courses" courses={courses}/>
    </div>
  )
}
