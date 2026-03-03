import { AwardIcon, BookOpen, ChartArea, Code, GraduationCap, House, ReceiptText, SquareTerminal, ShieldAlert, Users } from "lucide-react";


export const routes = [
    {
        title:"Home",
        url: "/", 
        icon: House
    },
    {
        title:"Courses",
        url: "/courses", 
        icon: SquareTerminal
    },
    {
        title:"My courses",
        url: "/my-courses", 
        icon: BookOpen
    },
    {
        title:"Code Editor",
        url: "/code-editor", 
        icon: Code
    },
    {
        title:"Orders",
        url: "/orders", 
        icon: ReceiptText
    },
    {
        title:"Certificates",
        url: "/certificates", 
        icon: AwardIcon
    }, 
]

export const routesTeacher = [
    {
        title:"Courses",
        url: "/teacher", 
        icon: GraduationCap
    },
    {
        title:"Analytics",
        url: "/teacher/analytics", 
        icon: ChartArea
    }
]

export const routesAdmin = [
    {
        title:"Dashboard",
        url: "/admin", 
        icon: ShieldAlert
    },
    {
        title:"Users",
        url: "/admin/users", 
        icon: Users
    }
]