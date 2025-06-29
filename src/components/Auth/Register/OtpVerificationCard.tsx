"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button"; // This is already from shadcn/ui if you're using shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "@/components/magicui/border-beam";

export function OtpVerificationCard() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>OTP Verification</CardTitle>
        <CardDescription>
          We&apos;ve sent a 4-digit code to your phone. Enter it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3].map((digit) => (
              <Input
                key={digit}
                type="text"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                ref={(el) => { inputRefs.current[digit] = el; }}
                onChange={(e) => handleChange(e, digit)}
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
        </form>
      </CardContent>
      <div className="px-6 pb-6">
        <Button className="w-full">Verify</Button>
      </div>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
