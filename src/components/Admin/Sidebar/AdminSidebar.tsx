/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Home,
  User,
  FileText,
  Video,
  PlusCircle,
  Layout,
  HelpCircle,
  List,
  Users,
  BarChart2,
  ChevronUp,
  User2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Link from "next/link"

export function AdminSidebar() {
  const { user } = useSelector((state: RootState) => state.auth)

  const getAvatarUrl = () => {
    if (!user?.avatar) return "/default-avatar.png"

    const avatar = user.avatar
    let url: string | undefined
    if (typeof avatar === "string") {
      url = avatar
    } else if (
      avatar &&
      typeof avatar === "object" &&
      avatar !== null &&
      "url" in avatar &&
      typeof (avatar as { url: string }).url === "string"
    ) {
      url = (avatar as { url: string }).url
    }

    if (!url) return "/default-avatar.png"
    if (url.startsWith("http") || url.startsWith("/")) return url

    return "/default-avatar.png"
  }

  return (
    <Sidebar collapsible="icon" className="bg-background border-r text-foreground">
      <SidebarContent>
        {/* Logo and Profile Section */}
        <div className="flex flex-col items-center py-6">
          <h2 className="text-lg font-bold">SUNAMIT CENTER</h2>
          <Image
            src={getAvatarUrl()}
            alt="admin avatar"
            width={90}
            height={90}
            className="rounded-4xl border-2 border-primary mt-4"
          />
          <h3 className="mt-2 text-sm font-semibold">{user?.name}</h3>
          <span className="text-xs text-muted-foreground uppercase">- {user?.role}</span>
        </div>

        {/* Navigation Groups */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className="hover:bg-accent hover:text-accent-foreground">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/users" className="hover:bg-accent hover:text-accent-foreground">
                    <User className="mr-2 h-4 w-4" />
                    Users
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/invoices" className="hover:bg-accent hover:text-accent-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    Invoices
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/create-course" className="hover:bg-accent hover:text-accent-foreground">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Course
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/live-courses" className="hover:bg-accent hover:text-accent-foreground">
                    <Video className="mr-2 h-4 w-4" />
                    Live Courses
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Customization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/hero" className="hover:bg-accent hover:text-accent-foreground">
                    <Layout className="mr-2 h-4 w-4" />
                    Hero
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/faq" className="hover:bg-accent hover:text-accent-foreground">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    FAQ
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/categories" className="hover:bg-accent hover:text-accent-foreground">
                    <List className="mr-2 h-4 w-4" />
                    Categories
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Controllers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/team" className="hover:bg-accent hover:text-accent-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/analytics" className="hover:bg-accent hover:text-accent-foreground">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Courses Analytics
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-accent hover:text-accent-foreground">
                  <User2 className="mr-2 h-4 w-4" />
                  Username
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
