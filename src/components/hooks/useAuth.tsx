"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function useAuth() {
  const { user, token } = useSelector((state: RootState) => state.auth);

  // ডেটা আসা না পর্যন্ত লোডিং ধরা হবে যদি টোকেন থাকলেও ইউজার না থাকে
  const isLoading = !!token && user === null;

  if (isLoading) {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: true,
    };
  }

  if (user && user.email) {
    return {
      isAuthenticated: true,
      user,
      isLoading: false,
    };
  }

  return {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  };
}
