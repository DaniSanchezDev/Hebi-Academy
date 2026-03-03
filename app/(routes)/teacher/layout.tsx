import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { isTeacherId } from "@/lib/isTeacherId";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Hebi Academy | Teacher",
    description: "Hebi Academy | Teacher",
}

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {

    const {userId} = await auth()

    if(!userId) {
        return redirect("/")
    }

    const isTeacher = isTeacherId(userId)

    if(!isTeacher) {
        return redirect("/")
    }


    return (
        <>{children}</>
    )
}
