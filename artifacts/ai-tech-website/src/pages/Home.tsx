import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ── Animated counter ── */
function Counter({ to, suffix = "", light = false }: { to: number; suffix?: string; light?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800, t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Scroll reveal ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated horizontal rule ── */
function Rule({ color = "bg-white/10", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      className={`h-px ${color} origin-left my-12`}
    />
  );
}

const platforms = [
  {
    index: "01",
    name: "AI Admin Co-Pilot",
    tag: "Healthcare & Allied Health",
    tagColor: "#059669",
    desc: "An invisible layer of intelligence that handles documentation, reporting, and communication workflows — returning hours to the people who need them most.",
    features: ["Automated clinical documentation", "Intelligent follow-up workflows", "Compliance-safe reporting"],
    photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=85",
    href: "/platforms",
  },
  {
    index: "02",
    name: "Tax Exposure Analytics",
    tag: "Financial Services",
    tagColor: "#2563eb",
    desc: "Proactive tax risk detection for organisations and advisory firms. Surface exposure before it compounds into costly liability.",
    features: ["Early tax exposure detection", "Deep transaction data analysis", "Automated advisory reporting"],
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=85",
    href: "/platforms",
  },
];

const industries = [
  { name: "Healthcare & Allied Health", role: "Clinical automation, admin co-pilots",   color: "#059669", photo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80" },
  { name: "Financial Services",         role: "Risk detection, tax intelligence",        color: "#3b82f6", photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80" },
  { name: "Legal & Professional",       role: "Document intelligence, matter flow",      color: "#a78bfa", photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80" },
  { name: "Enterprise & SME",           role: "Scalable workflow automation",            color: "#fb923c", photo: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=80" },
  { name: "Supply Chain & Logistics",   role: "Operations intelligence, tracking",       color: "#22d3ee", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80" },
];

const ticker = ["Healthcare","Financial Services","Legal","Compliance Architecture","Tax Analytics","Admin Automation","Allied Health","Risk Detection","Document Intelligence","Workflow Mapping","Operations","Supply Chain"];

export default function Home() {
  return (
    <Layout>

      {/* ═══════════════════════════════════════════════
          HERO — clean, minimal, SaaS premium
      ═══════════════════════════════════════════════ */}
      <section className="flex items-center px-6 sm:px-10 lg:px-16 xl:px-20"
        style={{ backgroundColor: "#f9fafb", minHeight: "calc(100vh - 72px)", paddingTop: "clamp(48px, 8vh, 80px)", paddingBottom: "clamp(48px, 8vh, 80px)" }}>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(14,159,172,0.08)", color: "#0E9FAC", border: "1px solid rgba(14,159,172,0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E9FAC]" />
              Enterprise AI for Complex Industries
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-black tracking-[-0.035em] leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2.4rem,4.5vw,4rem)", color: "#0c1117" }}
            >
              Built for industries<br />
              that can't afford<br />
              <span style={{ color: "#0E9FAC" }}>to get it wrong.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-[440px]"
              style={{ color: "#4b5563" }}
            >
              We design AI platforms from the ground up for your compliance requirements, workflow logic, and operating environment — not retrofitted from a generic model.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link href="/platforms">
                <motion.span
                  whileHover={{ backgroundColor: "#0a8a96" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: "#0E9FAC", color: "white" }}
                >
                  Explore platforms <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200"
                  style={{ color: "#374151", border: "1px solid #e5e7eb", backgroundColor: "white" }}
                >
                  Book a demo
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.58 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                "Compliance-first architecture",
                "Sector-specific AI models",
                "No generic templates",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6b7280" }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="6.5" fill="#0E9FAC" fillOpacity="0.12" />
                    <path d="M4 6.5l1.8 1.8L9 4.5" stroke="#0E9FAC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Product UI mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fca5a5" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fde68a" }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6ee7b7" }} />
                </div>
                <div className="flex-1 mx-3 px-3 py-1 rounded text-[11px] font-mono text-center"
                  style={{ backgroundColor: "white", color: "#9ca3af", border: "1px solid #e5e7eb" }}>
                  app.ctech.ai / dashboard
                </div>
              </div>

              {/* App UI */}
              <div className="flex" style={{ backgroundColor: "white", minHeight: 420 }}>

                {/* Sidebar */}
                <div className="w-52 shrink-0 py-5 px-3 flex flex-col gap-1" style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #f0f0f0" }}>
                  <div className="px-3 py-1.5 mb-3">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "#9ca3af" }}>AI Admin Co-Pilot</span>
                  </div>
                  {[
                    { label: "Dashboard", active: true },
                    { label: "Workflows", active: false },
                    { label: "Documents", active: false },
                    { label: "Compliance", active: false },
                    { label: "Reports", active: false },
                  ].map((item) => (
                    <div key={item.label}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: item.active ? "#0E9FAC14" : "transparent",
                        color: item.active ? "#0E9FAC" : "#6b7280",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.active ? "#0E9FAC" : "#d1d5db" }} />
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#111827" }}>Good morning, Dr. Chen</p>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>Tuesday, 24 June · 47 pending actions</p>
                    </div>
                    <div className="w-7 h-7 rounded-full" style={{ backgroundColor: "#0E9FAC22" }}>
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#0E9FAC" }} />
                      </div>
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Docs automated", val: "143", delta: "+12 today", color: "#059669" },
                      { label: "Hours saved", val: "38.5h", delta: "this week", color: "#0E9FAC" },
                      { label: "Compliance", val: "100%", delta: "all clear", color: "#6366f1" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl p-3" style={{ backgroundColor: "#f9fafb", border: "1px solid #f0f0f0" }}>
                        <p className="text-[10px] font-medium mb-1" style={{ color: "#9ca3af" }}>{m.label}</p>
                        <p className="text-base font-black" style={{ color: "#111827" }}>{m.val}</p>
                        <p className="text-[10px] font-medium mt-0.5" style={{ color: m.color }}>{m.delta}</p>
                      </div>
                    ))}
                  </div>

                  {/* Workflow items */}
                  <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
                    <div className="px-4 py-2.5 flex items-center justify-between"
                      style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #f0f0f0" }}>
                      <span className="text-[10px] font-semibold" style={{ color: "#374151" }}>Active workflows</span>
                      <span className="text-[10px]" style={{ color: "#0E9FAC" }}>View all →</span>
                    </div>
                    {[
                      { name: "Patient intake documentation", status: "Running", pct: 78, color: "#0E9FAC" },
                      { name: "Referral letter generation",   status: "Queued",  pct: 0,  color: "#9ca3af" },
                      { name: "Monthly compliance report",    status: "Done",    pct: 100, color: "#059669" },
                    ].map((w) => (
                      <div key={w.name} className="px-4 py-3" style={{ borderBottom: "1px solid #f9fafb" }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium" style={{ color: "#374151" }}>{w.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ color: w.color, backgroundColor: w.color + "15" }}>{w.status}</span>
                        </div>
                        <div className="h-1 rounded-full" style={{ backgroundColor: "#f3f4f6" }}>
                          <div className="h-1 rounded-full transition-all" style={{ width: `${w.pct}%`, backgroundColor: w.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Caption below frame */}
            <p className="text-center text-xs mt-4" style={{ color: "#9ca3af" }}>
              AI Admin Co-Pilot — Healthcare & Allied Health platform
            </p>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TICKER — dark strip
      ═══════════════════════════════════════════════ */}
      <div className="overflow-hidden py-3.5" style={{ backgroundColor: "#030912", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="animate-marquee">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[10px] font-mono tracking-[0.32em] uppercase whitespace-nowrap"
              style={{ color: i % 3 === 0 ? "#0E9FAC" : "rgba(255,255,255,0.2)" }}>
              {item}
              <span className="w-px h-3 shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MANIFESTO — teal left + photo right
      ═══════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left: teal panel */}
        <div className="flex flex-col justify-between px-8 sm:px-14 py-20" style={{ backgroundColor: "#0E9FAC" }}>
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase mb-14" style={{ color: "rgba(255,255,255,0.55)" }}>
              Our position
            </p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="font-black leading-[1.1] tracking-[-0.025em] text-white mb-10"
                style={{ fontSize: "clamp(1.9rem,3.8vw,3.2rem)" }}>
                Generic AI tools aren't built for sectors with real consequences.{" "}
                <span style={{ color: "rgba(255,255,255,0.5)" }}>We are.</span>
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-base leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                Healthcare. Financial. Legal. Each industry has its own language, its own risk profile, its own compliance landscape. We don't adapt generic models — we build specific ones.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.28}>
            <Link href="/about">
              <span className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer group mt-14"
                style={{ color: "rgba(255,255,255,0.75)" }}>
                Learn about our approach
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=85"
            alt="Modern professional workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(14,159,172,0.3) 0%, transparent 60%)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PLATFORMS — warm cream + rich photo panels
      ═══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#faf7f2" }}>
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-20 pb-6 flex items-end justify-between">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase" style={{ color: "#9ca3af" }}>
              Flagship platforms
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/platforms">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase cursor-pointer hover:opacity-60 transition-opacity" style={{ color: "#0E9FAC" }}>
                All platforms →
              </span>
            </Link>
          </Reveal>
        </div>

        {platforms.map((p, i) => (
          <motion.div
            key={p.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="mx-6 sm:mx-10 lg:mx-16 xl:mx-24 mb-5 overflow-hidden"
            style={{ borderRadius: "2px" }}
          >
            <Link href={p.href}>
              <div className="group grid grid-cols-1 lg:grid-cols-[1fr_420px] cursor-pointer"
                style={{ backgroundColor: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
                {/* Content */}
                <div className="p-10 xl:p-14 flex flex-col justify-between" style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[11px] font-mono tracking-widest" style={{ color: "#d1d5db" }}>{p.index}</span>
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1"
                        style={{ color: p.tagColor, backgroundColor: p.tagColor + "15" }}>
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="font-black tracking-tight mb-5 group-hover:opacity-80 transition-opacity duration-200"
                      style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: "#0f172a" }}>
                      {p.name}
                    </h3>
                    <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>{p.desc}</p>
                    <ul className="space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#475569" }}>
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: p.tagColor }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: "#0E9FAC" }}>
                      Explore platform <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                {/* Photo */}
                <div className="relative overflow-hidden min-h-[280px]" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <img
                    src={p.photo} alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, ${p.tagColor}30 100%)` }} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════
          INDUSTRIES — deep navy + photo thumbnails
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24" style={{ backgroundColor: "#070f1d" }}>
        <div className="flex items-end justify-between mb-14">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
              Industries we serve
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/industries">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase cursor-pointer hover:opacity-60 transition-opacity" style={{ color: "#0E9FAC" }}>
                Explore →
              </span>
            </Link>
          </Reveal>
        </div>

        <div>
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex items-center justify-between gap-6 py-5 cursor-pointer"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-5">
                {/* Color accent bar */}
                <div className="w-0.5 h-8 rounded-full shrink-0 transition-all duration-300 group-hover:h-10"
                  style={{ backgroundColor: ind.color }} />
                <div>
                  <span className="text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 block"
                    style={{ color: "rgba(255,255,255,0.85)" }}>
                    {ind.name}
                  </span>
                  <span className="text-sm hidden sm:block mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {ind.role}
                  </span>
                </div>
              </div>
              {/* Thumbnail */}
              <div className="w-24 h-16 overflow-hidden rounded-sm shrink-0 hidden md:block opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                <img src={ind.photo} alt={ind.name} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW WE BUILD — bold teal background
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 relative overflow-hidden"
        style={{ backgroundColor: "#0E9FAC" }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase mb-16" style={{ color: "rgba(255,255,255,0.5)" }}>
              How we build
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0 sm:divide-x" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            {[
              { n: "01", title: "Understand",
                body: "We map your actual workflows — not idealised ones. Compliance requirements, data flows, edge cases, team behaviour." },
              { n: "02", title: "Build",
                body: "Sector-specific AI, tested against real industry constraints. Not off-the-shelf models retrofitted for compliance." },
              { n: "03", title: "Operate",
                body: "Continuous monitoring, model refinement, and compliance updates as regulations evolve around your environment." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="sm:px-12 first:pl-0 last:pr-0">
                <span className="text-[10px] font-mono tracking-widest block mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>{s.n}</span>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{s.body}</p>
              </Reveal>
            ))}
          </div>

          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="h-px origin-left mt-16 mb-10" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Reveal>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>
                Every build follows our 6-phase compliance framework — discovery through to continuous improvement.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/how-we-build">
                <span className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer group text-white hover:opacity-75 transition-opacity">
                  See the full process
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — dark navy + real photo bg
      ═══════════════════════════════════════════════ */}
      <section className="relative py-36 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden"
        style={{ backgroundColor: "#040c1a" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #040c1a 40%, rgba(4,12,26,0.6) 100%)" }} />
        </div>
        <div className="relative z-10">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase mb-10" style={{ color: "rgba(255,255,255,0.25)" }}>
              Get started
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black leading-[1.02] tracking-[-0.03em] max-w-xl mb-14 text-white"
              style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
              Ready to work<br />
              <span style={{ color: "#0E9FAC" }}>differently?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 cursor-pointer transition-colors duration-300"
                  style={{ backgroundColor: "#0E9FAC", color: "white" }}
                >
                  Start a conversation <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/platforms">
                <span className="text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity border-b pb-0.5"
                  style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.15)" }}>
                  Or browse our platforms →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </Layout>
  );
}
