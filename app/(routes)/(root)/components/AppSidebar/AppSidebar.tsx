'use client'
import {
  Sidebar,
  SidebarContent, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import Link from "next/link"
import { routes, routesTeacher, routesAdmin } from "./AppSidebar.data"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { isTeacherId } from "@/lib/isTeacherId"


export default function AppSidebar() {
  const {state} = useSidebar()
  const pathname = usePathname()
  const {user} = useUser()

  const isTeacher = isTeacherId(user?.id)
  const isAdmin = user?.publicMetadata?.role === "admin"
  
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-indigo-900 to-violet-900 text-white h-full relative overflow-hidden">
       
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-violet-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-violet-500/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
        
       
        <SidebarHeader className="relative z-10 mb-6">
          <Link href="/" className="flex items-center gap-3 px-2 py-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/logo-hebi-academy.png" 
                alt="Logo de la academia" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </div>
            {state === "expanded" && (
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-violet-100">Hebi</span>
                <span className="text-xs text-indigo-200/80">Academy</span>
              </div>
            )}
          </Link>
        </SidebarHeader>

        <SidebarGroup className="relative z-10">
          <SidebarGroupLabel className="text-indigo-200/60 uppercase text-xs font-medium tracking-wider px-4 mb-2">
            Plataforma
          </SidebarGroupLabel>
          
          <SidebarMenu className="space-y-1">
            {routes.map((item) => {
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive 
                        ? 'bg-gradient-to-br from-indigo-600/30 to-violet-600/30 text-white shadow-sm' 
                        : 'text-indigo-100/80 hover:bg-indigo-800/40 hover:shadow-sm hover:border-l-2 hover:border-indigo-300/30'}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10">
                        <item.icon className="w-5 h-5" />
                      </div>
                      {state === "expanded" && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {isActive && state === "expanded" && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>

          {isTeacher && (
            <>
              <div className="my-4 px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent"></div>
              </div>

              <SidebarGroupLabel className="text-indigo-200/60 uppercase text-xs font-medium tracking-wider px-4 mb-2">
                Teacher
              </SidebarGroupLabel>
              
              <SidebarMenu className="space-y-1 mb-4"> 
                {routesTeacher.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          href={item.url} 
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive 
                            ? 'bg-gradient-to-br from-indigo-600/30 to-violet-600/30 text-white shadow-sm' 
                            : 'text-indigo-100/80 hover:bg-indigo-800/40 hover:shadow-sm hover:border-l-2 hover:border-indigo-300/30'}`}
                        >
                          <div className="flex items-center justify-center w-10 h-10">
                            <item.icon className="w-5 h-5" />
                          </div>
                          {state === "expanded" && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {isActive && state === "expanded" && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </>
          )}

          {isAdmin && (
            <>
              <div className="my-4 px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent"></div>
              </div>

              <SidebarGroupLabel className="text-indigo-200/60 uppercase text-xs font-medium tracking-wider px-4 mb-2">
                Admin Panel
              </SidebarGroupLabel>
              
              <SidebarMenu className="space-y-1 mb-20"> 
                {routesAdmin.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link 
                          href={item.url} 
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive 
                            ? 'bg-gradient-to-br from-indigo-600/30 to-violet-600/30 text-white shadow-sm' 
                            : 'text-indigo-100/80 hover:bg-indigo-800/40 hover:shadow-sm hover:border-l-2 hover:border-indigo-300/30'}`}
                        >
                          <div className="flex items-center justify-center w-10 h-10">
                            <item.icon className="w-5 h-5" />
                          </div>
                          {state === "expanded" && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {isActive && state === "expanded" && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                          )}
                          {item.title === "Dashboard" && state === "expanded" && (
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white font-medium">A</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </>
          )}
          
          {state === "expanded" && user && (
            <div className="fixed bottom-6 left-0 right-0 px-4 z-20 w-[var(--sidebar-width)]">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-800/50 to-violet-800/50 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-sm">
                    {user?.firstName?.[0] || "H"}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-indigo-200/80">Conectado como</p>
                    <p className="text-sm font-medium text-white">
                      {isAdmin ? "Admin" : (isTeacher ? "Teacher" : "Estudiante")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
