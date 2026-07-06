import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CTechLogo } from "@/components/CTechLogo";

const NAV_TEXT    = "#5C0E14";
const NAV_MUTED   = "#9B4A52";
const NAV_ACCENT  = "#E84F5E";
const NAV_BORDER  = "#F0D5CC";
const NAV_PEACH   = "#FCDFC5";
const NAV_BG      = "#FFFFFF";

const navLinks = [
  { name: "About",       path: "/about"         },
  { name: "CareCliQ",    path: "/carecliq"       },
  { name: "How We Build",path: "/how-we-build"   },
  { name: "Vision",      path: "/vision"         },
];

function NavLink({ name, path, onClick }: { name: string; path: string; onClick?: () => void }) {
  const [location] = useLocation();
  const isActive = location === path;

  return (
    <Link
      href={path}
      onClick={onClick}
      className="relative text-sm font-medium transition-colors group py-1"
      style={{ color: isActive ? NAV_TEXT : NAV_MUTED }}
    >
      {name}
      <span
        className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
        style={{
          width: isActive ? "100%" : "0%",
          backgroundColor: NAV_ACCENT,
        }}
      />
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? `1px solid ${NAV_BORDER}` : "1px solid transparent",
        paddingTop: isScrolled ? "12px" : "20px",
        paddingBottom: isScrolled ? "12px" : "20px",
        boxShadow: isScrolled ? `0 2px 16px rgba(92,14,20,0.06)` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <CTechLogo />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink key={link.path} name={link.name} path={link.path} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link href="/contact"
              className="text-sm font-medium transition-colors"
              style={{ color: NAV_MUTED }}>
              Contact
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#d43f4d" }}
                whileTap={{ scale: 0.97 }}
                className="h-9 px-5 rounded-full text-sm font-semibold transition-colors"
                style={{ backgroundColor: NAV_ACCENT, color: "white" }}
              >
                Book Demo
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: NAV_TEXT }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full py-4 px-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: `1px solid ${NAV_BORDER}`,
              boxShadow: `0 8px 32px rgba(92,14,20,0.08)`,
            }}
          >
            <nav className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-base font-medium py-3 px-4 rounded-xl flex justify-between items-center transition-colors"
                  style={{ color: NAV_TEXT }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight size={16} style={{ color: NAV_MUTED }} />
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-4" style={{ borderTop: `1px solid ${NAV_BORDER}` }}>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2.5 rounded-full text-sm font-medium border transition-colors"
                  style={{ color: NAV_TEXT, borderColor: NAV_BORDER, backgroundColor: NAV_BG }}>
                  Contact
                </button>
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: NAV_ACCENT, color: "white" }}>
                  Book Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
