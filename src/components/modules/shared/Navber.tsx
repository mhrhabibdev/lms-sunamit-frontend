"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { userLogout } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import dynamic from "next/dynamic";
import UserDropdown from "@/components/shared/UserDropdown";

const ModeToggle = dynamic(() =>
  import('../../theme/theme-toggle').then((mod) => mod.ModeToggle),
  { ssr: false }
);

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/policy", label: "Policy" },
    { href: "/faq", label: "FAQ" },
    { href: "/blogs", label: "Blogs" },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/70 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary">
          H<span className="text-muted-foreground">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary underline underline-offset-4" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
            
        </nav>

        {/* Right Side: Theme + Auth */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {mounted && user ? (
            <div className="hidden md:flex">
              <UserDropdown />
            </div>
          ) : (
            mounted && (
              <Button asChild className="hidden md:block">
                <Link href="/login">Login</Link>
              </Button>
            )
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          {/* Navigation Links */}
          <div className="px-4 py-3">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary underline underline-offset-4" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
            </nav>
         
          </div>

          {/* User Actions (only visible when logged in) */}
          {mounted && user && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => {
                    dispatch(userLogout());
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}

          {/* Login Button (only visible when not logged in) */}
          {mounted && !user && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
              <Button asChild className="w-full" variant="destructive">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;