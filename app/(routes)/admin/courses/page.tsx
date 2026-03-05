import {
  getAdminCourses,
  AdminCourseWithTeacher,
} from "@/actions/getAdminCourses";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";
import CourseActions from "./components/CourseActions";
import TeacherDisplay from "./components/TeacherDisplay";

export default async function AdminCoursesPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== "admin") {
    return redirect("/");
  }

  const courses: AdminCourseWithTeacher[] = (await getAdminCourses()) || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses Management</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Teacher
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Chapters
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-4 rounded-md overflow-hidden">
                          {course.imageURL ? (
                            <Image
                              className="h-10 w-10 object-cover"
                              src={course.imageURL}
                              alt={course.title}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/80 to-indigo-700/80 dark:from-indigo-600/80 dark:to-indigo-900/80">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(course.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TeacherDisplay
                        userId={course.userId}
                        teacherName={course.teacherName}
                        teacherImageUrl={course.teacherImageUrl}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {course.chapters.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.isPublished
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {course.price ? (
                        <span className="font-medium">${course.price}</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-md text-xs font-medium">
                          Free
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <CourseActions courseId={course.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
