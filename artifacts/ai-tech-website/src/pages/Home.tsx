import React, { useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring,
  useMotionValue, useMotionValueEvent,
} from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* ─── Design tokens ─────────────────────────── */
const C = {
  bg:      "#FFFFFF",
  text:    "#111111",
  muted:   "#6B7280",
  accent:  "#000000",
  border:  "#EDEDED",
  soft:    "#F7F7F7",
  gold:    "#C4A882",   /* ← colour accent suggestion: champagne gold */
};

/* ─── Scroll reveal ─────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Ambient floating shape ────────────────── */
function FloatShape({ x, y, size, delay, opacity = 0.06 }: {
  x: string; y: string; size: number; delay: number; opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, border: `1px solid ${C.border}`, opacity }}
      animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 90, 0] }}
      transition={{ duration: 9 + delay * 3, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Mouse-tilt wrapper ────────────────────── */
function MouseTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Scroll progress bar ───────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 origin-left h-[2px]"
      style={{ scaleX, backgroundColor: C.gold }}
    />
  );
}

/* ─── Parallax image ────────────────────────── */
function ParallaxImg({ src, alt, speed = 0.15 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img src={src} alt={alt} className="absolute inset-[-15%] w-[130%] h-[130%] object-cover" style={{ y }} />
    </div>
  );
}

/* ─── Data ──────────────────────────────────── */
const platforms = [
  {
    index: "01", name: "AI Admin Co-Pilot",
    tag: "Healthcare & Allied Health",
    desc: "An invisible layer of intelligence handling documentation, reporting, and communication workflows — returning hours to the people who need them most.",
    features: ["Automated clinical documentation", "Intelligent follow-up workflows", "Compliance-safe reporting"],
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&auto=format&fit=crop&q=85",
  },
  {
    index: "02", name: "Tax Exposure Analytics",
    tag: "Financial Services",
    desc: "Proactive tax risk detection for organisations and advisory firms. Surface exposure before it compounds into costly liability.",
    features: ["Early tax exposure detection", "Deep transaction data analysis", "Automated advisory reporting"],
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=85",
  },
];

const industries = [
  { name: "Healthcare & Allied Health", role: "Clinical automation, admin co-pilots",  photo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80" },
  { name: "Financial Services",         role: "Risk detection, tax intelligence",       photo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80" },
  { name: "Legal & Professional",       role: "Document intelligence, matter flow",     photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80" },
  { name: "Enterprise & SME",           role: "Scalable workflow automation",           photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80" },
  { name: "Supply Chain & Logistics",   role: "Operations intelligence, tracking",      photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80" },
];

const ticker = ["Healthcare","Financial Services","Legal","Compliance","Tax Analytics","Admin Automation","Allied Health","Risk Detection","Document Intelligence","Workflow Mapping","Operations","Supply Chain"];

/* ─── Pinned scroll industries ──────────────── */
function PinnedIndustries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(industries.length - 1, Math.floor(v * industries.length)));
  });

  return (
    <div ref={containerRef} style={{ height: `${industries.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>

        <div className="px-8 sm:px-14 lg:px-20 xl:px-28 mb-10">
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: C.muted }}>
            Industries we serve
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 px-8 sm:px-14 lg:px-20 xl:px-28">
          {/* Left */}
          <div className="flex flex-col justify-center pr-0 lg:pr-20 mb-10 lg:mb-0">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-black leading-none select-none block mb-3"
                  style={{ fontSize: "clamp(5rem,12vw,10rem)", color: C.border, lineHeight: 1 }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <h2 className="font-black tracking-[-0.03em] leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(1.6rem,3.5vw,3rem)", color: C.text }}>
                  {industries[active].name}
                </h2>
                <p className="text-base mb-8 max-w-sm" style={{ color: C.muted }}>
                  {industries[active].role}
                </p>
                <Link href="/industries">
                  <motion.span whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer"
                    style={{ color: C.text }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatePresence>
            {/* Progress dots */}
            <div className="flex gap-2 mt-10">
              {industries.map((_, i) => (
                <motion.div key={i}
                  animate={{ width: i === active ? 24 : 6, backgroundColor: i === active ? C.accent : C.border }}
                  transition={{ duration: 0.4 }}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Right list */}
          <div className="flex flex-col justify-center"
            style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: "clamp(24px,4vw,56px)" }}>
            {industries.map((ind, i) => (
              <motion.div key={ind.name}
                animate={{ opacity: i === active ? 1 : 0.28 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between gap-6 py-5"
                style={{ borderBottom: `1px solid ${C.border}` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base truncate" style={{ color: C.text }}>{ind.name}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: C.muted }}>{ind.role}</p>
                </div>
                <motion.div
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-11 overflow-hidden rounded shrink-0 hidden sm:block"
                  style={{ border: `1px solid ${C.border}` }}
                >
                  <img src={ind.photo} alt={ind.name} className="w-full h-full object-cover" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 sm:right-14 lg:right-20 xl:right-28 flex items-center gap-2">
          <motion.span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: C.border }}
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
            scroll
          </motion.span>
          <motion.div className="w-px h-6 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${C.accent}, transparent)` }}
            animate={{ scaleY: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────── */
export default function Home() {
  /* Parallax: manifesto photo */
  const manifestoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mScroll } = useScroll({ target: manifestoRef, offset: ["start end", "end start"] });
  const manifestoY = useTransform(mScroll, [0, 1], ["-8%", "8%"]);

  return (
    <Layout>
      <ScrollProgress />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative flex items-center px-8 sm:px-14 lg:px-20 xl:px-28 overflow-hidden"
        style={{ backgroundColor: C.bg, minHeight: "calc(100vh - 72px)", paddingTop: "clamp(56px,9vh,90px)", paddingBottom: "clamp(56px,9vh,90px)" }}>

        {/* Ambient floating shapes */}
        <FloatShape x="5%"  y="10%" size={80}  delay={0}   opacity={0.07} />
        <FloatShape x="90%" y="20%" size={50}  delay={1.2} opacity={0.06} />
        <FloatShape x="80%" y="75%" size={100} delay={2.4} opacity={0.05} />
        <FloatShape x="15%" y="80%" size={40}  delay={0.8} opacity={0.06} />
        <FloatShape x="50%" y="5%"  size={24}  delay={3}   opacity={0.08} />

        {/* Gold accent line — colour suggestion preview */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="absolute top-0 left-0 origin-left"
          style={{ height: 2, width: "30vw", backgroundColor: C.gold, opacity: 0.7 }}
        />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center relative z-10">

          {/* Left copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: C.muted }}>
                C TECH — Sector-specific AI
              </span>
              {/* Gold badge — colour accent */}
              <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5"
                style={{ color: C.gold, border: `1px solid ${C.gold}`, opacity: 0.9 }}>
                Est. 2024
              </span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }} animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-black tracking-[-0.04em] leading-[1.04]"
                style={{ fontSize: "clamp(2.6rem,5vw,4.4rem)", color: C.text }}
              >
                Built for industries<br />
                that can't afford<br />
                to get it wrong.
              </motion.h1>
            </div>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="origin-left mb-8 mt-6"
              style={{ height: 1, backgroundColor: C.border, maxWidth: 80 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-base sm:text-[1.05rem] leading-relaxed mb-10 max-w-[420px]"
              style={{ color: C.muted }}
            >
              We design AI platforms from the ground up for your compliance requirements, workflow logic, and operating reality — not generic tools retrofitted with disclaimers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link href="/platforms">
                <motion.span
                  whileHover={{ backgroundColor: C.accent, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 cursor-pointer transition-colors duration-150"
                  style={{ backgroundColor: C.text, color: "white" }}
                >
                  Explore platforms <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ backgroundColor: C.soft }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-sm font-medium px-7 py-3.5 cursor-pointer transition-colors duration-150"
                  style={{ color: C.text, border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                >
                  Book a demo
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.58 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {["Compliance-first architecture", "Sector-specific AI models", "No generic templates"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5.5" stroke={C.border} />
                    <path d="M3.5 6l1.7 1.7L8.5 4" stroke={C.text} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: mouse-tilt product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <MouseTilt>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)" }}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3"
                  style={{ backgroundColor: C.soft, borderBottom: `1px solid ${C.border}` }}>
                  <div className="flex gap-1.5">
                    {["#fca5a5","#fde68a","#6ee7b7"].map((cc) => (
                      <div key={cc} className="w-3 h-3 rounded-full" style={{ backgroundColor: cc }} />
                    ))}
                  </div>
                  <div className="flex-1 mx-3 px-3 py-1 text-[11px] font-mono text-center"
                    style={{ backgroundColor: C.bg, color: "#aaa", border: `1px solid ${C.border}` }}>
                    app.ctech.ai / dashboard
                  </div>
                </div>

                {/* App UI */}
                <div className="flex" style={{ backgroundColor: C.bg, minHeight: 400 }}>
                  {/* Sidebar */}
                  <div className="w-48 shrink-0 py-5 px-3"
                    style={{ backgroundColor: C.soft, borderRight: `1px solid ${C.border}` }}>
                    <p className="px-3 py-1.5 mb-4 text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: "#aaa" }}>
                      AI Admin Co-Pilot
                    </p>
                    {[
                      { label: "Dashboard", on: true },
                      { label: "Workflows", on: false },
                      { label: "Documents", on: false },
                      { label: "Compliance", on: false },
                      { label: "Reports", on: false },
                    ].map((it) => (
                      <div key={it.label} className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium mb-0.5"
                        style={{ backgroundColor: it.on ? C.border : "transparent", color: it.on ? C.text : C.muted }}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: it.on ? C.text : C.border }} />
                        {it.label}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-sm font-bold" style={{ color: C.text }}>Good morning, Dr. Chen</p>
                        <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>Tuesday, 24 June · 47 pending actions</p>
                      </div>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: C.border }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.text }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: "Docs automated", val: "143",   delta: "+12 today",  hi: "#059669" },
                        { label: "Hours saved",    val: "38.5h", delta: "this week",  hi: C.text    },
                        { label: "Compliance",     val: "100%",  delta: "all clear",  hi: "#059669" },
                      ].map((m) => (
                        <div key={m.label} className="p-3"
                          style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                          <p className="text-[9px] font-medium mb-1" style={{ color: C.muted }}>{m.label}</p>
                          <p className="text-base font-black" style={{ color: C.text }}>{m.val}</p>
                          <p className="text-[9px] mt-0.5 font-medium" style={{ color: m.hi }}>{m.delta}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ border: `1px solid ${C.border}` }}>
                      <div className="px-4 py-2.5 flex items-center justify-between"
                        style={{ backgroundColor: C.soft, borderBottom: `1px solid ${C.border}` }}>
                        <span className="text-[10px] font-semibold" style={{ color: C.text }}>Active workflows</span>
                        <span className="text-[10px]" style={{ color: C.muted }}>View all →</span>
                      </div>
                      {[
                        { name: "Patient intake documentation", status: "Running", pct: 78,  sc: C.text    },
                        { name: "Referral letter generation",   status: "Queued",  pct: 0,   sc: C.muted   },
                        { name: "Monthly compliance report",    status: "Done",    pct: 100, sc: "#059669" },
                      ].map((w, wi) => (
                        <div key={w.name} className="px-4 py-3"
                          style={{ borderBottom: wi < 2 ? `1px solid ${C.border}` : "none" }}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-medium" style={{ color: C.text }}>{w.name}</span>
                            <span className="text-[10px] font-medium px-2 py-0.5"
                              style={{ color: w.sc, backgroundColor: w.sc + "15" }}>{w.status}</span>
                          </div>
                          <div className="h-0.5 rounded-full" style={{ backgroundColor: C.border }}>
                            <div className="h-0.5 rounded-full" style={{ width: `${w.pct}%`, backgroundColor: w.sc }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </MouseTilt>
            <p className="text-center text-xs mt-4" style={{ color: C.muted }}>
              AI Admin Co-Pilot — Healthcare & Allied Health platform
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: C.muted }}
        >
          <motion.div className="w-px h-10 rounded-full"
            style={{ background: `linear-gradient(to bottom, transparent, ${C.border})` }}
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} />
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: C.border }}>scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden py-4"
        style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="animate-marquee">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i}
              className="inline-flex items-center gap-5 px-6 text-[10px] font-mono tracking-[0.32em] uppercase whitespace-nowrap"
              style={{ color: i % 5 === 0 ? C.gold : i % 3 === 0 ? C.text : C.muted }}>
              {item}
              <span className="w-px h-3 shrink-0" style={{ backgroundColor: C.border }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MANIFESTO — black + parallax photo
      ══════════════════════════════════════════ */}
      <section ref={manifestoRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between px-8 sm:px-14 lg:px-20 xl:px-28 py-24"
          style={{ backgroundColor: C.accent }}>
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-16"
              style={{ color: "rgba(255,255,255,0.3)" }}>Our position</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="font-black leading-[1.1] tracking-[-0.03em] text-white mb-10"
                style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)" }}>
                Generic AI tools aren't built for sectors with real consequences.{" "}
                <span style={{ color: "rgba(255,255,255,0.38)" }}>We are.</span>
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed mb-14 max-w-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                Healthcare. Financial. Legal. Each industry has its own language, risk profile, and compliance landscape.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <Link href="/about">
                <motion.span whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  Our approach <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Parallax photo */}
        <div className="relative min-h-[380px] lg:min-h-0 overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=88"
            alt="Professional at work"
            className="absolute inset-[-10%] w-[120%] h-[120%] object-cover"
            style={{ y: manifestoY }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.15)", mixBlendMode: "multiply" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLATFORMS
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="px-8 sm:px-14 lg:px-20 xl:px-28 pt-20 pb-6 flex items-end justify-between">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: C.muted }}>
              Flagship platforms
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/platforms">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase cursor-pointer hover:opacity-50 transition-opacity"
                style={{ color: C.text }}>
                All platforms →
              </span>
            </Link>
          </Reveal>
        </div>

        {platforms.map((p, i) => (
          <motion.div key={p.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.08 }}
            className="mx-8 sm:mx-14 lg:mx-20 xl:mx-28 mb-4"
          >
            <Link href="/platforms">
              <motion.div
                className="group grid grid-cols-1 lg:grid-cols-[1fr_420px] cursor-pointer overflow-hidden"
                whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.07)" }}
                transition={{ duration: 0.25 }}
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
              >
                <div className="p-10 xl:p-14 flex flex-col justify-between"
                  style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[11px] font-mono tracking-widest" style={{ color: C.border }}>{p.index}</span>
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1"
                        style={{ color: C.muted, border: `1px solid ${C.border}` }}>{p.tag}</span>
                    </div>
                    <h3 className="font-black tracking-tight mb-5"
                      style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: C.text }}>
                      {p.name}
                    </h3>
                    <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>{p.desc}</p>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: C.text }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
                      style={{ color: C.text }}>
                      Explore platform <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden min-h-[280px]"
                  style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <motion.img
                    src={p.photo} alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)", mixBlendMode: "multiply" }} />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ══════════════════════════════════════════
          INDUSTRIES — pinned scroll
      ══════════════════════════════════════════ */}
      <PinnedIndustries />

      {/* ══════════════════════════════════════════
          HOW WE BUILD — black panel, floating nums
      ══════════════════════════════════════════ */}
      <section className="py-24 px-8 sm:px-14 lg:px-20 xl:px-28 relative overflow-hidden"
        style={{ backgroundColor: C.accent }}>

        {/* Floating large ghost numbers */}
        {["01","02","03"].map((n, i) => (
          <motion.span key={n}
            className="absolute font-black select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", color: "rgba(255,255,255,0.025)",
              right: `${5 + i * 28}%`, bottom: "-1rem", lineHeight: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          >
            {n}
          </motion.span>
        ))}

        <div className="relative z-10">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-16"
              style={{ color: "rgba(255,255,255,0.3)" }}>How we build</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0">
            {[
              { n: "01", title: "Understand", body: "We map your actual workflows — compliance requirements, data flows, edge cases, team behaviour. Not idealisations." },
              { n: "02", title: "Build",       body: "Sector-specific AI tested against real industry constraints. Not off-the-shelf models retrofitted for compliance."    },
              { n: "03", title: "Operate",     body: "Continuous monitoring, model refinement, and compliance updates as regulations evolve around your environment."      },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}
                className="sm:px-12 first:pl-0 last:pr-0"
                style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" } as any}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                  <span className="text-[10px] font-mono tracking-widest block mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {s.n}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{s.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 }} className="h-px origin-left mt-16 mb-10"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Reveal>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.4)" }}>
                Every build follows our 6-phase compliance framework — discovery through to continuous improvement.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/how-we-build">
                <motion.span whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  Full process <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — white with live animated bg
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-8 sm:px-14 lg:px-20 xl:px-28 overflow-hidden"
        style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>

        {/* Scroll-reactive floating circles */}
        {[
          { size: 300, x: "75%",  y: "10%",  delay: 0   },
          { size: 180, x: "85%",  y: "60%",  delay: 1.5 },
          { size: 80,  x: "60%",  y: "30%",  delay: 0.7 },
        ].map((s, i) => (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: s.size, height: s.size, left: s.x, top: s.y, border: `1px solid ${C.border}` }}
            animate={{ scale: [1, 1.08, 1], rotate: [0, 30, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 10 + s.delay * 2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}

        {/* Gold accent line above CTA */}
        <Reveal>
          <div className="mb-12" style={{ width: 40, height: 2, backgroundColor: C.gold }} />
        </Reveal>

        <Reveal delay={0.04}>
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-8" style={{ color: C.muted }}>
            Get started
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-black leading-[1.02] tracking-[-0.04em] max-w-xl mb-8"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: C.text }}>
            Ready to work<br />differently?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-base leading-relaxed mb-12 max-w-md" style={{ color: C.muted }}>
            Tell us about your industry, your workflows, and your compliance challenges. We'll show you what's possible.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/contact">
              <motion.span
                whileHover={{ backgroundColor: C.accent, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 cursor-pointer transition-colors duration-150"
                style={{ backgroundColor: C.text, color: "white" }}>
                Start a conversation <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/platforms">
              <span className="text-sm font-medium cursor-pointer hover:opacity-60 transition-opacity border-b pb-px"
                style={{ color: C.muted, borderColor: C.border }}>
                Browse our platforms →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

    </Layout>
  );
}
