import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  if (!user) {
    return redirect("/sign-in");
  }
  
  if (user.publicMetadata.role !== "admin") {
    return redirect("/");
  }

  return (
    <div className="h-full">
      {children}
    </div>
  );
}
