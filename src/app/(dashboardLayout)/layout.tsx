import { AdminSidebar } from "@/components/Admin/Sidebar/AdminSidebar"
import DashboardHeader from "@/components/Admin/Sidebar/DashboardHeader"
import AdminProtected from "@/components/hooks/useAdminProtected"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   <AdminProtected >
     <SidebarProvider>
      <AdminSidebar />
      <main className="w-full ">
        <SidebarTrigger />
        <DashboardHeader />
        {children}
      
      </main>
    </SidebarProvider>
   </AdminProtected>
  )
}