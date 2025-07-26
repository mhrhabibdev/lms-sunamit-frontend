
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CommonLayout from "./CommonLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CommonLayout>

        <SidebarTrigger />
 
        {children}

      </CommonLayout>
    </SidebarProvider>
  );
}
