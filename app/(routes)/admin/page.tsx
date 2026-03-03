import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();
  
  if (!user || user.publicMetadata.role !== "admin") {
    return redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <AdminCard 
          title="Users" 
          description="Manage platform users"
          href="/admin/users"
        />
        
        <AdminCard 
          title="Courses" 
          description="Manage course content"
          href="/admin/courses"
        />
      </div>
    </div>
  );
}

function AdminCard({ 
  title, 
  description, 
  href 
}: { 
  title: string; 
  description: string; 
  href: string;
}) {
  return (
    <a 
      href={href}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </a>
  );
}
