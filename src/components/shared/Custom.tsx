// src/components/Custom.tsx (বা যেকোনো জায়গায়)
"use client";

import { ReactNode } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import LoadingPage from "@/app/loading";


export default function Custom({ children }: { children: ReactNode }) {
  const { isLoading } = useLoadUserQuery({});

  if (isLoading) return <LoadingPage />;

  return <>{children}</>;
}
