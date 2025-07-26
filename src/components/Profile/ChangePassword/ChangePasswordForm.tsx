/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi"

type ChangePasswordData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function ChangePasswordForm() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const form = useForm<ChangePasswordData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const {
    handleSubmit,
    watch,
    control,
    reset: resetForm,
    formState: { errors },
  } = form

  const newPassword = watch("newPassword")

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const onSubmit = async (data: ChangePasswordData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap()

      toast.success("Password changed successfully")

      // ✅ Reset with empty values
      resetForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to change password"
      toast.error(errorMessage)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        {/* Current Password */}
        <FormField
          control={control}
          name="currentPassword"
          rules={{ required: "Current password is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword.current ? "text" : "password"}
                    placeholder="Enter current password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword.current ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={control}
          name="newPassword"
          rules={{
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Must be at least 6 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Enter new password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword.new ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Re-type new password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </Form>
  )
}
