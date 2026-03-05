import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export default async function UsersPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== "admin") {
    return redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link
        href="/admin"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="font-medium">Platform Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">Daniel Sanchez</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  danisanchezpsc@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-indigo-900 dark:text-indigo-200">
                    Admin
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">Daniel Sánchez Vázquez</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  danielsanchezvazquez5@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Teacher
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">Daniel Sweepend</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  danielsweepend@gmail.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Student
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>Users list of the platform</p>
      </div>
    </div>
  );
}
