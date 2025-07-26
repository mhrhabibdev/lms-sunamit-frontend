/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/hooks/useProtected.tsx
"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";

import LoadingPage from "@/app/loading";
import { useSelector } from "react-redux";

export default function Protected({ children }: { children: ReactNode }) {
const {user,isLoading}=useSelector((state: any) => state.user);

const isAdmin = user?.role === "admin";
  // যদি এখনো loading হয়, তাহলে কিছুই করবো না - শুধু লোডিং দেখাবো
  if (isLoading) {
    return <LoadingPage />;
  }

  // loading শেষ হলে, এরপর authentication check করবো
  if (!isAdmin) {
    redirect("/");
    return null; 
  }

  return <>{children}</>;
}
