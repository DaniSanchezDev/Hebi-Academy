import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

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
      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
