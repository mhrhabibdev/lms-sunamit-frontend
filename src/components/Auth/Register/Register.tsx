/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const onSubmit = async (formData: RegisterFormInputs) => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    try {
      const result = await userRegister(formData).unwrap();

      if (result.activationToken) {
        toast.success("Registration successful! Please check your email.", {
          duration: 3000,
          position: "top-center",
        });
        router.push("/verify");
        reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed!", {
        duration: 3000,
        position: "top-center",
      });
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <Card className="relative w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-md bg-white dark:bg-zinc-900">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <CardContent className="pt-6 pb-0 space-y-5">
            {/* Name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

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

            {/* Password */}
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-8 text-gray-500 dark:text-gray-400 hover:text-primary"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-4 pt-4 pb-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
}
