"use client";

import { useSession } from "next-auth/react";
import { useSocialLoginMutation } from "@/redux/features/auth/authApi";
import { useEffect, useRef } from "react";

export default function SocialAuthHandler() {
  const { data: session, status } = useSession();
  const [socialLogin] = useSocialLoginMutation();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.email &&
      !hasCalled.current
    ) {
      hasCalled.current = true;

      socialLogin({
        email: session.user.email,
        name: session.user.name || "Unnamed",
        avatar: session.user.image || "",
      });
    }
  }, [status, session, socialLogin]);

  return null;
}
