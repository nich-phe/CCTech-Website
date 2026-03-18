import React, { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Platforms", path: "/platforms" },
  { name: "Industries", path: "/industries" },
  { name: "How We Build", path: "/how-we-build" },
  { name: "Vision", path: "/vision" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-border py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-xl shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              A
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              AuraTech
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const [isActive] = useRoute(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href="/contact">
              <Button size="sm" className="rounded-full px-5">Book Demo</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-base font-medium text-foreground py-2 border-b border-muted flex justify-between items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">Log in</Button>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">Book Demo</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
