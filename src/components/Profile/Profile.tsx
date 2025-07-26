/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { userLogin } from "@/redux/features/auth/authSlice";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { BorderBeam } from "../magicui/border-beam";
import ProfileInfoUpdate from "./ProfileInfoUpdate";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AvatarUploader() {
  const dispatch = useDispatch();
  type AvatarType = string | { url: string };
  type UserType = {
    avatar?: AvatarType;
    // add other user properties as needed
    [key: string]: any;
  };
  const user = useSelector((state: RootState) => state.auth.user) as UserType;
  const [updateAvatar] = useUpdateAvatarMutation();

  const [preview, setPreview] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // getSafeUrl এখন string না হলে default ফেরত দিবে
  const getSafeUrl = (url?: any) => {
    if (!url) return "/default-avatar.png";
    if (typeof url !== "string") return "/default-avatar.png";
    if (url.startsWith("blob:") || url.startsWith("data:image")) return url;
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return "/default-avatar.png";
  };

  useEffect(() => {
    if (user?.avatar) {
      // avatar object হলে url নেবে, string হলে সরাসরি নেবে
      if (typeof user.avatar === "string") {
        setPreview(getSafeUrl(user.avatar));
      } else if (
        user.avatar &&
        typeof user.avatar === "object" &&
        "url" in user.avatar
      ) {
        setPreview(getSafeUrl(user.avatar.url));
      } else {
        setPreview("/default-avatar.png");
      }
    }
  }, [user]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|png|jpg|gif|webp)/)) {
      toast.error("Invalid file type");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max 2MB allowed");
      return;
    }

    setLoading(true);

    try {
      const blobURL = URL.createObjectURL(file);
      setPreview(blobURL);

      const res = await updateAvatar(file).unwrap(); // শুধু ফাইল পাঠানো হচ্ছে
      console.log("Response from updateAvatar:", res);

      URL.revokeObjectURL(blobURL);

      if (res.user?.avatar) {
        if (typeof res.user.avatar === "string") {
          setPreview(getSafeUrl(res.user.avatar));
        } else if (res.user.avatar.url) {
          setPreview(getSafeUrl(res.user.avatar.url));
        }
        dispatch(userLogin({ token: "", user: res.user }));
        toast.success("Avatar updated!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Upload failed");
      if (user?.avatar) {
        if (typeof user.avatar === "string") {
          setPreview(getSafeUrl(user.avatar));
        } else if (user.avatar.url) {
          setPreview(getSafeUrl(user.avatar.url));
        }
      }
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const triggerUpload = () => {
    if (!loading && fileRef.current) fileRef.current.click();
  };

  return (
<div className="min-h-screen flex items-center justify-center px-4">
  <div className="w-full h-full flex flex-col items-center justify-center gap-8 py-10 relative">
    <div className="text-center">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-muted-foreground">Update your profile if you want</p>
    </div>

    <div className="relative group">
      <div className="relative w-[140px] h-[140px] rounded-full border-4 border-primary overflow-hidden">
        <Image
          src={preview}
          alt="Avatar"
          width={140}
          height={140}
          className="object-cover w-full h-full"
          priority
          unoptimized={!preview.startsWith("/")}
        />
      </div>

      <Button
        onClick={triggerUpload}
        disabled={loading}
        className="absolute bottom-0 right-0 p-2 rounded-full"
        variant="default"
        size="icon"
        aria-label="Change avatar"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </Button>

      <Input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
        onChange={handleChange}
        className="hidden"
        disabled={loading}
      />
    </div>

    <div className="w-full px-4 md:px-8 max-w-4xl space-y-6">
      <ProfileInfoUpdate />
    </div>

    <BorderBeam duration={8} size={100} />
  </div>
</div>


  );
}
