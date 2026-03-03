import { BreadCrumbCourseProps } from "./BreadCrumbCourse.types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home, BookOpen } from "lucide-react";

export function BreadCrumbCourse(props: BreadCrumbCourseProps) {
  const { title } = props;

  return (
    <div className="py-3 px-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-lg shadow-sm border border-indigo-100 mb-4">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          <BreadcrumbItem className="overflow-hidden">
            <BreadcrumbLink 
              href="/" 
              className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/70"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-indigo-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="overflow-hidden">
            <BreadcrumbLink 
              href="/courses" 
              className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/70"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Courses</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-indigo-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="overflow-hidden">
            <BreadcrumbPage className="px-3 py-1.5 bg-white/80 rounded-md text-indigo-900 font-semibold shadow-sm border border-indigo-100 truncate max-w-[200px]">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
