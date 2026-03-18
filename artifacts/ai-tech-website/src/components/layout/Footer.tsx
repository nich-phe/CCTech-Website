import React from "react";
import { Link } from "wouter";
import { ArrowRight, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-white/30 flex items-center justify-center text-white font-display font-bold text-xl">
                A
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                AuraTech
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              Building AI-powered platforms that reduce manual work and improve compliance visibility across complex industries.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-display font-semibold mb-6">Platforms</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li><Link href="/platforms" className="hover:text-white transition-colors">AI Admin Co-Pilot</Link></li>
              <li><Link href="/platforms" className="hover:text-white transition-colors">Tax Exposure Analytics</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industry Solutions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Request Custom Platform</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-display font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/how-we-build" className="hover:text-white transition-colors">How We Build</Link></li>
              <li><Link href="/vision" className="hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-display font-semibold mb-6">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">
              Get the latest insights on AI and compliance automation.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-secondary"
              />
              <Button type="button" size="icon" variant="secondary" className="shrink-0 rounded-lg">
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} AuraTech Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
