import prisma from "@/lib/prisma";
import { Chapter, Course } from '@prisma/client';
import { clerkClient } from "@clerk/nextjs/server";

export type AdminCourseWithTeacher = Course & {
  chapters: Chapter[];
  teacherName?: string;
  teacherImageUrl?: string; 
};

export const getAdminCourses = async (): Promise<AdminCourseWithTeacher[] | null> => {
  try {
    const actualClerkClient = await clerkClient();
    const coursesFromDb = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            chapters: true
        }
    });

    if (!coursesFromDb) {
      return null;
    }

    const coursesWithTeacherInfo = await Promise.all(
      coursesFromDb.map(async (course) => {
        let teacherName = course.userId; 
        let teacherImageUrl: string | undefined = undefined;

        try {
          if (course.userId) {
            const user = await actualClerkClient.users.getUser(course.userId);
            if (user) {
              teacherName = user.fullName || 
                            (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName) || 
                            user.username || 
                            course.userId;
              teacherImageUrl = user.imageUrl;
            }
          }
        } catch (error: unknown) {
         
          console.error(`Error fetching Clerk user info for ${course.userId}:`, error instanceof Error ? error.message : error);
        }
        
        return {
          ...course,
          teacherName,
          teacherImageUrl,
        };
      })
    );
    return coursesWithTeacherInfo;
  } catch (error: unknown) {
    console.error("Error in getAdminCourses:", error instanceof Error ? error.message : error);
    return null;
  }
}
