import { getHomeCourses } from "@/actions/getHomeCourses";
import { ExploreCourses } from "./components";
import { ListCourses } from "@/components/Shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hebi Academy",
  description:
    "Hebi Academy is an online learning platform focused on teaching web development and technology skills.",
};

export const revalidate = 3600;

export default async function Home() {
  const courses = await getHomeCourses();

  return (
    <div>
      <ExploreCourses />
      <ListCourses courses={courses} title="Best Courses" />
    </div>
  );
}
