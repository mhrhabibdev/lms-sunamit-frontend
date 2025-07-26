"use client";

import Protected from "@/components/hooks/useProtected";
import Navbar from "@/components/modules/shared/Navber";
import { UserSidebar } from "@/components/User/UserSidebar";
import { usePathname } from "next/navigation";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isProfileRoute = pathname.startsWith("/profile");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 flex">
      {/* Sidebar only on profile routes */}
      {isProfileRoute && (
       <Protected >
         <aside>
          <UserSidebar />
        </aside>
       </Protected>
      )}

      <div className="flex-1">
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default CommonLayout;
