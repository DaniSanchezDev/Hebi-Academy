import { getHomeCourses } from "@/actions/getHomeCourses";
import { ExploreCourses } from "./components";
import { ListCourses } from "@/components/Shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hebi Academy",
  description: "Hebi Academy is an online learning platform focused on teaching web development and technology skills.",
};


export default async function Home() {
  // Traemos los cursos del actions
  const courses = await getHomeCourses();
  
  return (
    <div>
      <ExploreCourses />
      <ListCourses courses={courses} title="Best Courses" />
    </div>
  );
}
