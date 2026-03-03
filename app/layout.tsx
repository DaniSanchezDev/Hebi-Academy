import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./(routes)/(root)/components/AppSidebar/AppSidebar";
import { Navbar, Footer } from "@/components/Shared";
import { Toaster } from "@/components/ui/sonner";
import { spaceGrotesk } from "@/lib/fonts";
import TransitionSpinner from "@/components/ui/transition-spinner";

export const metadata: Metadata = {
  title: "Hebi Academy",
  description:
    "Hebi Academy is an online learning platform focused on teaching web development and technology skills. Learn from experienced instructors and get certified with our online courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${spaceGrotesk.className} antialiased`}>
          <SidebarProvider>
            <AppSidebar />
            <div className=" w-full bg-stone-100 flex flex-col min-h-screen">
              <Navbar />
              <main className=" flex-1">{children}</main>
              <Toaster />
              <TransitionSpinner />

              <Footer />
            </div>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
