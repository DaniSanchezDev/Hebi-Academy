import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "All Courses | Hebi Academy",
    description:
      "Discover a wide range of courses in programming, design, business, and more. Learn at your own pace with our comprehensive curriculum designed for all skill levels.",
  };

export default function LayoutCourses({ children }: { children: React.ReactNode }) {
  return (
    <div>{children}</div>
  )
}
