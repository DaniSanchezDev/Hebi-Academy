import { currentUser } from '@clerk/nextjs/server';

import Header from './components/Header/Header';
import prisma from '@/lib/prisma';
import { ListCourses } from './components/ListCourses';
import { redirect } from 'next/navigation';

export default async function TeacherPage() {

  const user = await currentUser();

  if (!user) {
    return redirect("/")
  }


  // Obtenemos todos los cursos que realizó este profesor
  const courses = await prisma.course.findMany({
    where: {
      userId: user.id
    }
  })

  console.log(courses);

  return (
    <div>
      <Header />

      <ListCourses courses={courses} />
    </div>
  )
}
