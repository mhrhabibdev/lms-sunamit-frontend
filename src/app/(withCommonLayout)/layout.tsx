import Navbar from "@/components/modules/shared/Navber";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-2">
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
