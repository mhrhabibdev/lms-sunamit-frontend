"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/theme/theme-toggle"

export default function DashboardHeader() {
  const notifications = [
    { id: 1, text: "Your course has been approved", read: false, time: "2 mins ago" },
    { id: 2, text: "New message from student", read: true, time: "1 hour ago" },
    { id: 3, text: "System maintenance scheduled", read: false, time: "5 hours ago" },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    console.log("Marking all as read")
  }

  return (
    <header className="">
      <div className="flex h-7 items-center justify-end px-4">
        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[70vw] max-w-[260px] p-0">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                >
                  Mark all
                </Button>
              </div>

              {/* Notification List */}
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={`flex flex-col items-start px-4 py-2 ${
                      !n.read ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${!n.read ? "bg-primary" : ""}`} />
                      <p className="text-sm">{n.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  View all
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
