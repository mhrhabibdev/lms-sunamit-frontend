/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/hooks/useAdminProtected.tsx
"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingPage from "@/app/loading";

interface RootState {
  auth: {  // Changed from 'user' to 'auth' if that's your slice name
    user: any;
    isLoading: boolean;
  };
}

export default function AdminProtected({ children }: { children: ReactNode }) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth); // Changed to state.auth

  const isAdmin = user?.role === "admin";

  if (isLoading) return <LoadingPage />;
  if (!isAdmin) {
    redirect("/");
    return null;
  }

  return <>{children}</>;
}