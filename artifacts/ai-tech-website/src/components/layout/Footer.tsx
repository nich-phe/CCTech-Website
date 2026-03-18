import React from "react";
import { Link } from "wouter";
import { ArrowRight, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative bg-[hsl(220,30%,7%)] text-white overflow-hidden">
      {/* Teal accent glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse,hsl(185,85%,38%,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,hsl(185,65%,52%,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}images/ctech-logo.png`}
                alt="C TECH Logo"
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-white/50 text-sm mb-8 max-w-xs leading-relaxed">
              Building AI-powered platforms that reduce manual work and improve compliance visibility across complex industries.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(14,159,172,0.2)" }}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon size={15} className="text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Platforms</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["AI Admin Co-Pilot", "/platforms"],
                ["Tax Exposure Analytics", "/platforms"],
                ["Industry Solutions", "/industries"],
                ["Request Custom Build", "/contact"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link href={path} className="text-white/55 hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["About Us", "/about"],
                ["How We Build", "/how-we-build"],
                ["Our Vision", "/vision"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link href={path} className="text-white/55 hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Stay Updated</h4>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              AI and compliance automation insights, monthly.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/8 border border-white/15 rounded-xl px-4 py-2.5 w-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-colors"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ArrowRight size={16} className="text-white" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} C TECH. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
