"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    // handle login logic or API call here
  };

  return (
    <div className="w-full flex justify-center px-4">
      <Card className="relative w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-md bg-white dark:bg-zinc-900">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CardContent className="pt-6 pb-0 space-y-5">
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password with eye icon */}
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="pr-10" // extra padding for icon space
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500 dark:text-gray-400 hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col items-center gap-4 pt-4 pb-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
}
