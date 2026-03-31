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
  text:    "#5C0E14",   /* deep burgundy */
  muted:   "#9B4A52",   /* warm medium   */
  accent:  "#E84F5E",   /* vivid rose    */
  gold:    "#F0E193",   /* golden yellow */
  peach:   "#FCDFC5",   /* warm peach    */
  dark:    "#5C0E14",   /* dark panels   */
  border:  "#F0D5CC",   /* soft border   */
  soft:    "#FEF7F3",   /* off-white warm*/
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
function FloatShape({ x, y, size, delay, color = C.peach, opacity = 0.5 }: {
  x: string; y: string; size: number; delay: number; color?: string; opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, backgroundColor: color, opacity }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.06, 1] }}
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
      style={{ scaleX, backgroundColor: C.accent }}
    />
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
  {
    index: "03", name: "PMS Co-Pilot",
    tag: "Allied Health Practice Management",
    desc: "End-to-end AI automation for allied health practitioners — from referral intake and patient scheduling to progress notes, outcome reports, and Medicare compliance.",
    features: ["Automated referral intake & patient onboarding", "AI-drafted progress notes (SOAP format)", "Outcome reports & Medicare billing compliance"],
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=85",
  },
];

const industries = [
  { name: "Healthcare & Allied Health", role: "Clinical automation, admin co-pilots",  photo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80" },
  { name: "Financial Services",         role: "Risk detection, tax intelligence",       photo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80" },
  { name: "Legal & Professional",       role: "Document intelligence, matter flow",     photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80" },
  { name: "Enterprise & SME",           role: "Scalable workflow automation",           photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80" },
  { name: "Supply Chain & Logistics",   role: "Operations intelligence, tracking",      photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80" },
];

const ticker = ["Healthcare","Financial Services","Practice Management","Legal","Compliance","Tax Analytics","Admin Automation","Allied Health","Risk Detection","Progress Notes","Referral Automation","Medicare Compliance","Supply Chain"];

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
        style={{ backgroundColor: C.soft, borderTop: `1px solid ${C.border}` }}>

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
                    style={{ color: C.accent }}>
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
                animate={{ opacity: i === active ? 1 : 0.3 }}
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

        {/* Ambient blobs */}
        <FloatShape x="-4%" y="8%"  size={280} delay={0}   color={C.peach}  opacity={0.45} />
        <FloatShape x="85%" y="65%" size={180} delay={1.5} color={C.gold}   opacity={0.35} />
        <FloatShape x="70%" y="0%"  size={120} delay={2.8} color={C.peach}  opacity={0.3}  />
        <FloatShape x="20%" y="85%" size={80}  delay={0.9} color={C.accent} opacity={0.12} />

        {/* Rose accent sweep at top */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="absolute top-0 left-0 origin-left"
          style={{ height: 2, width: "40vw", backgroundColor: C.accent }}
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
              <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5"
                style={{ color: C.accent, border: `1px solid ${C.accent}`, opacity: 0.85 }}>
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

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="origin-left mb-8 mt-6"
              style={{ height: 2, backgroundColor: C.gold, maxWidth: 80 }}
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
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 cursor-pointer transition-all duration-200"
                  style={{ backgroundColor: C.accent, color: "white" }}
                >
                  Explore platforms <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ backgroundColor: C.peach }}
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
                    <path d="M3.5 6l1.7 1.7L8.5 4" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: editorial photo with floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <MouseTilt>
              <motion.div
                className="relative overflow-hidden"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  borderRadius: 4,
                  boxShadow: `0 32px 80px rgba(92,14,20,0.12), 0 4px 20px rgba(92,14,20,0.06)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&auto=format&fit=crop&q=85"
                  alt="Allied health professional at work"
                  className="w-full object-cover block"
                  style={{ height: 480, objectPosition: "center top" }}
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to top, rgba(92,14,20,0.28) 0%, transparent 55%)` }} />

                {/* Hours saved — top left */}
                <motion.div
                  className="absolute top-5 left-5 px-4 py-3"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    background: "rgba(254,247,243,0.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid rgba(240,213,204,0.7)`,
                    borderRadius: 2,
                    boxShadow: "0 4px 24px rgba(92,14,20,0.08)",
                  }}
                >
                  <p className="text-[20px] font-black leading-none" style={{ color: C.text }}>38.5h</p>
                  <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>saved per practitioner / week</p>
                </motion.div>

                {/* Compliant badge — top right */}
                <motion.div
                  className="absolute top-5 right-5 flex items-center gap-2 px-3 py-2"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{
                    background: "rgba(254,247,243,0.92)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid rgba(240,213,204,0.7)`,
                    borderRadius: 2,
                    boxShadow: "0 4px 24px rgba(92,14,20,0.08)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#059669" }} />
                  <span className="text-[11px] font-semibold" style={{ color: C.text }}>100% compliant</span>
                </motion.div>

                {/* Referral notification — bottom */}
                <motion.div
                  className="absolute bottom-6 left-5 flex items-start gap-3 px-4 py-3"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{
                    background: "rgba(254,247,243,0.93)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid rgba(240,213,204,0.7)`,
                    borderRadius: 2,
                    boxShadow: "0 4px 24px rgba(92,14,20,0.10)",
                    maxWidth: 230,
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: C.accent }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                  />
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: C.text }}>New referral received</p>
                    <p className="text-[10px] mt-0.5" style={{ color: C.muted }}>Sarah Mitchell · CBT for anxiety · Medicare plan attached</p>
                    <p className="text-[10px] mt-1 font-medium" style={{ color: C.accent }}>AI processing now</p>
                  </div>
                </motion.div>
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
        style={{ backgroundColor: C.peach, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="animate-marquee">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i}
              className="inline-flex items-center gap-5 px-6 text-[10px] font-mono tracking-[0.32em] uppercase whitespace-nowrap"
              style={{ color: i % 5 === 0 ? C.accent : i % 3 === 0 ? C.text : C.muted }}>
              {item}
              <span className="w-px h-3 shrink-0" style={{ backgroundColor: C.border }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MANIFESTO — dark burgundy + parallax photo
      ══════════════════════════════════════════ */}
      <section ref={manifestoRef} className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between px-8 sm:px-14 lg:px-20 xl:px-28 py-24"
          style={{ backgroundColor: C.dark }}>
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-16"
              style={{ color: "rgba(252,223,197,0.4)" }}>Our position</p>
          </Reveal>
          <div>
            <Reveal delay={0.08}>
              <p className="font-black leading-[1.1] tracking-[-0.03em] mb-10"
                style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", color: C.peach }}>
                Generic AI tools aren't built for sectors with real consequences.{" "}
                <span style={{ color: "rgba(252,223,197,0.38)" }}>We are.</span>
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed mb-14 max-w-sm"
                style={{ color: "rgba(252,223,197,0.5)" }}>
                Healthcare. Financial. Legal. Each industry has its own language, risk profile, and compliance landscape.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <Link href="/about">
                <motion.span whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer"
                  style={{ color: C.gold }}>
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
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(92,14,20,0.25)", mixBlendMode: "multiply" }} />
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
                whileHover={{ y: -3, boxShadow: `0 12px 40px rgba(92,14,20,0.08)` }}
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
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: C.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200"
                      style={{ color: C.accent }}>
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
                    style={{ backgroundColor: "rgba(92,14,20,0.12)", mixBlendMode: "multiply" }} />
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
          HOW WE BUILD — deep burgundy, floating nums
      ══════════════════════════════════════════ */}
      <section className="py-24 px-8 sm:px-14 lg:px-20 xl:px-28 relative overflow-hidden"
        style={{ backgroundColor: C.dark }}>

        {/* Peach ambient blobs */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 400, height: 400, right: -100, top: -100, backgroundColor: C.accent, opacity: 0.07 }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        {/* Floating large ghost numbers */}
        {["01","02","03"].map((n, i) => (
          <motion.span key={n}
            className="absolute font-black select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem,18vw,16rem)", color: "rgba(252,223,197,0.05)",
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
              style={{ color: "rgba(252,223,197,0.4)" }}>How we build</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0">
            {[
              { n: "01", title: "Understand", body: "We map your actual workflows — compliance requirements, data flows, edge cases, team behaviour. Not idealisations." },
              { n: "02", title: "Build",       body: "Sector-specific AI tested against real industry constraints. Not off-the-shelf models retrofitted for compliance."    },
              { n: "03", title: "Operate",     body: "Continuous monitoring, model refinement, and compliance updates as regulations evolve around your environment."      },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}
                className="sm:px-12 first:pl-0 last:pr-0"
                style={{ borderLeft: i > 0 ? "1px solid rgba(252,223,197,0.12)" : "none" } as any}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                  <span className="text-[10px] font-mono tracking-widest block mb-8"
                    style={{ color: "rgba(252,223,197,0.3)" }}>{s.n}</span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4"
                    style={{ color: C.peach }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(252,223,197,0.5)" }}>{s.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 }} className="h-px origin-left mt-16 mb-10"
            style={{ backgroundColor: "rgba(252,223,197,0.1)" }} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Reveal>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(252,223,197,0.4)" }}>
                Every build follows our 6-phase compliance framework — discovery through to continuous improvement.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/how-we-build">
                <motion.span whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer"
                  style={{ color: C.gold }}>
                  Full process <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — warm peach with animated rings
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-8 sm:px-14 lg:px-20 xl:px-28 overflow-hidden"
        style={{ backgroundColor: C.peach, borderTop: `1px solid ${C.border}` }}>

        {/* Animated rings */}
        {[
          { size: 320, x: "72%", y: "5%",  delay: 0   },
          { size: 180, x: "82%", y: "55%", delay: 1.5 },
          { size: 90,  x: "60%", y: "25%", delay: 0.7 },
        ].map((s, i) => (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: s.size, height: s.size, left: s.x, top: s.y, border: `1px solid ${C.accent}`, opacity: 0.2 }}
            animate={{ scale: [1, 1.08, 1], rotate: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10 + s.delay * 2, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}

        {/* Gold accent bar */}
        <Reveal>
          <div className="mb-12" style={{ width: 40, height: 3, backgroundColor: C.accent }} />
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 cursor-pointer"
                style={{ backgroundColor: C.accent, color: "white" }}>
                Start a conversation <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/platforms">
              <span className="text-sm font-medium cursor-pointer hover:opacity-60 transition-opacity border-b pb-px"
                style={{ color: C.muted, borderColor: C.muted }}>
                Browse our platforms →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

    </Layout>
  );
}
