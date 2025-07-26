/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserLogoutMutation } from "@/redux/features/auth/authApi";

type UserAvatar = string | { url: string } | null | undefined;
type UserType = {
  name?: string;
  email?: string;
  avatar?: UserAvatar;
} | null;

const UserDropdown = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [userLogoutMutation, { isLoading }] = useUserLogoutMutation();

  const getInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    return names.map((name) => name[0]?.toUpperCase()).join("");
  };

  const getAvatarUrl = () => {
    if (!user?.avatar) return "/default-avatar.png";

    const avatar = user.avatar;
    let url: string | undefined;
    if (typeof avatar === "string") {
      url = avatar;
    } else if (
      avatar &&
      typeof avatar === "object" &&
      avatar !== null &&
      "url" in avatar &&
      typeof (avatar as { url: string }).url === "string"
    ) {
      url = (avatar as { url: string }).url;
    }

    if (!url) return "/default-avatar.png";
    if (url.startsWith("http") || url.startsWith("/")) return url;

    return "/default-avatar.png";
  };



const handleLogout = async () => {
  try {
    await userLogoutMutation().unwrap();
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
    window.location.href = "/login";
  }
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border border-muted-foreground/30 shadow-sm">
          <AvatarImage
            src={getAvatarUrl()}
            alt="User Avatar"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          <AvatarFallback className="bg-gradient-to-r from-purple-100 to-blue-100">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-4 space-y-4 bg-background border shadow-2xl rounded-xl"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <Image
              src={getAvatarUrl()}
              width={64}
              height={64}
              alt="User"
              className="rounded-full border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.png";
              }}
            />
          </div>

          <div className="w-full truncate">
            <p className="font-semibold text-sm truncate">
              {user?.name || "Unnamed User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "No email provided"}
            </p>
          </div>

          <DropdownMenuItem asChild className="w-full">
            <Button
              variant={"destructive"}
              className="w-full cursor-pointer"
              size="sm"
              asChild
            >
              <Link href="/profile">View Profile</Link>
            </Button>
          </DropdownMenuItem>
        </div>

        <div className="border-t pt-3 space-y-1 text-sm">
          <DropdownMenuItem asChild>
            <Link
              href="/admin/dashboard"
              className="hover:text-primary w-full px-2 py-1.5 rounded-md"
            >
              <span className="w-full">Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant={"secondary"}
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              {isLoading ? "Logging out..." : "Logout"}
              {!isLoading && <span className="ml-auto">↩</span>}
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
