// src/components/hooks/useProtected.tsx
"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import useAuth from "./useAuth";
import LoadingPage from "@/app/loading";

export default function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // যদি এখনো loading হয়, তাহলে কিছুই করবো না - শুধু লোডিং দেখাবো
  if (isLoading) {
    return <LoadingPage />;
  }

  // loading শেষ হলে, এরপর authentication check করবো
  if (!isAuthenticated) {
    redirect("/");
    return null; 
  }

  return <>{children}</>;
}
