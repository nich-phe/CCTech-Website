import React from "react";
import { Link } from "wouter";
import { ArrowRight, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { CTechLogo } from "@/components/CTechLogo";

const DARK   = "#5C0E14";
const PEACH  = "#FCDFC5";
const GOLD   = "#F0E193";
const ACCENT = "#E84F5E";

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: DARK, color: PEACH }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ACCENT}18, transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${GOLD}10, transparent 70%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-6">
              <CTechLogo white />
            </Link>
            <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: `${PEACH}80` }}>
              Building AI-powered platforms that reduce manual work and improve compliance visibility across complex industries.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: `${ACCENT}30` }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${PEACH}20`, backgroundColor: `${PEACH}08` }}
                >
                  <Icon size={15} style={{ color: `${PEACH}80` }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: `${PEACH}40` }}>Platforms</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["AI Admin Co-Pilot",     "/platforms"],
                ["Tax Exposure Analytics","/platforms"],
                ["Industry Solutions",    "/industries"],
                ["Request Custom Build",  "/contact"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link href={path}
                    className="transition-colors hover:translate-x-0.5 inline-block"
                    style={{ color: `${PEACH}60` }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: `${PEACH}40` }}>Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["About Us",    "/about"],
                ["How We Build","/how-we-build"],
                ["Our Vision",  "/vision"],
                ["Contact",     "/contact"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link href={path}
                    className="transition-colors hover:translate-x-0.5 inline-block"
                    style={{ color: `${PEACH}60` }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: `${PEACH}40` }}>Stay Updated</h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: `${PEACH}55` }}>
              AI and compliance automation insights, monthly.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: `${PEACH}08`,
                  border: `1px solid ${PEACH}20`,
                  color: PEACH,
                }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 w-10 h-10 flex items-center justify-center transition-colors"
                style={{ backgroundColor: ACCENT }}
              >
                <ArrowRight size={16} color="white" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: `1px solid ${PEACH}12`, color: `${PEACH}30` }}>
          <p>© {new Date().getFullYear()} C TECH. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors" style={{ color: `${PEACH}30` }}>Privacy Policy</a>
            <a href="#" className="transition-colors" style={{ color: `${PEACH}30` }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
