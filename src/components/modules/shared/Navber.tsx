"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
    // { href: "/about", label: "About" },
    { href: "/blogs", label: "Blogs" }
  ];

  useEffect(() => {
    // Set initial hash on client side
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      // Scroll to the section if the hash is updated
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) {
      return pathname === "/" && `#${href.split('#')[1]}` === activeHash;
    }
    return pathname.startsWith(href);
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
                isActive(item.href)
                  ? "text-primary underline underline-offset-4"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 py-3">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary underline underline-offset-4"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
