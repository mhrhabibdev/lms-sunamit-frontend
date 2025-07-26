/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { updateUserData } from "@/redux/features/auth/authSlice";

interface IFormInput {
  name: string;
}

export default function ProfileInfoUpdate() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
  const dispatch = useDispatch();

  const form = useForm<IFormInput>({
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      const res = await updateUserInfo({ name: data.name }).unwrap();
      dispatch(updateUserData (res.user)); // ✅ Update Redux state
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (!user) {
    return <p className="text-center text-sm text-gray-500">Loading user info...</p>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Name Field (Editable) */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field (Read-only) */}
        <div>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <Button className="cursor-pointer" variant={"destructive"} type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
