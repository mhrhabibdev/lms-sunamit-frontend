/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useActivationMutation } from "@/redux/features/auth/authApi";

export function OtpVerificationCard() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activation, { isLoading }] = useActivationMutation();
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, ""); // Remove non-digits
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activation_code = otp.join("");

    if (activation_code.length !== 4) {
      toast.error("Please enter the 4-digit code", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    try {
      await activation({
        activation_token: token,
        activation_code,
      }).unwrap();

      toast.success("Account activated successfully!", {
        duration: 2000,
        position: "top-center",
      });

      router.push("/login");
    } catch (err: any) {
      console.error("Activation error:", err);
      const errorMessage =
        err?.data?.message || err?.error || "Activation failed";
      toast.error(errorMessage, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>OTP Verification</CardTitle>
        <CardDescription>
          We&apos;ve sent a 4-digit code to your email. Enter it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3].map((digit) => (
              <Input
                key={digit}
                type="text"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                ref={(el) => {
                  inputRefs.current[digit] = el;
                }}
                value={otp[digit]}
                onChange={(e) => handleChange(e, digit)}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                className="h-12 w-12 text-center text-xl font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Didn&apos;t receive code?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
            >
              Resend
            </button>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </form>
      </CardContent>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
