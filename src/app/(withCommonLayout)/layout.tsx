import Navbar from "@/components/modules/shared/Navber";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
