import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowUpRight, Bot, ShieldCheck, Zap, Activity, CheckCircle2 } from "lucide-react";

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          function step(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * to));
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <div ref={ref}>{count}{suffix}</div>;
}

/* ── Rotating headline word ── */
const rotatingWords = ["smarter", "compliant", "efficient", "scalable"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden" style={{ minWidth: "320px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          className="text-gradient inline-block"
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Marquee strip items with colors ── */
const marqueeItems = [
  { label: "AI Automation", color: "#0e9fac" },
  { label: "Healthcare Admin", color: "#059669" },
  { label: "Tax Analytics", color: "#2563eb" },
  { label: "Compliance First", color: "#ea580c" },
  { label: "Workflow Mapping", color: "#7c3aed" },
  { label: "Allied Health", color: "#059669" },
  { label: "Financial Services", color: "#2563eb" },
  { label: "RegTech", color: "#0891b2" },
  { label: "Document Intelligence", color: "#7c3aed" },
  { label: "Risk Detection", color: "#dc2626" },
  { label: "Process Automation", color: "#0e9fac" },
  { label: "SME Solutions", color: "#ea580c" },
];

/* ── Parallax hero background ── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY1 = useTransform(heroScroll, [0, 1], [0, 180]);
  const blobY2 = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-20 pb-8 overflow-hidden"
      >
        {/* Animated blobs */}
        <motion.div
          style={{ y: blobY1 }}
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-gradient-radial from-primary/20 via-primary/8 to-transparent animate-blob pointer-events-none"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="absolute top-1/2 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/15 via-secondary/5 to-transparent animate-blob-delay-2 pointer-events-none"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/6 to-transparent pointer-events-none rounded-full blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(185 85% 38%) 1px, transparent 1px), linear-gradient(90deg, hsl(185 85% 38%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-10"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Enterprise AI Solutions</span>
              <span className="text-muted-foreground/40 text-xs">·</span>
              <span className="text-sm text-muted-foreground">Compliance-Conscious Architecture</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground tracking-tight leading-[1.04] mb-8">
                AI-powered platforms
                <br />
                for{" "}
                <RotatingWord />
                <br />
                operations
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              We build intelligent digital platforms that reduce manual work, improve compliance visibility,
              and operate more efficiently across complex industries.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link href="/platforms">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px hsl(185 85% 38% / 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center gap-2 transition-all"
                >
                  Explore Our Platforms
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-14 px-8 rounded-full bg-white border border-border text-foreground font-semibold text-base hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  Book a Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex flex-wrap justify-center gap-0 divide-x divide-border bg-white border border-border rounded-2xl overflow-hidden shadow-sm"
            >
              {[
                { val: 40, suffix: "%", label: "Avg. admin reduction" },
                { val: 2, suffix: "", label: "Flagship platforms" },
                { val: 100, suffix: "%", label: "Compliance-first builds" },
              ].map((s, i) => (
                <div key={i} className="px-8 py-4 text-center">
                  <div className="text-2xl font-black text-primary tabular-nums">
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════════ */}
      <div className="border-y border-border bg-white py-5 overflow-hidden">
        <div className="animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-5 px-5 text-sm font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: item.color + "99" }}>
              {item.label}
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color + "60" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          MISSION — DARK SECTION
      ════════════════════════════════════════ */}
      <section className="relative py-32 bg-[hsl(220,30%,7%)] text-white overflow-hidden noise-bg">
        {/* Teal orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,hsl(185,85%,38%,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse,hsl(185,65%,52%,0.10),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-8 max-w-2xl">
                Empowering complex industries through{" "}
                <span className="text-gradient">focused automation.</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-12">
                Complex workflows shouldn't bottleneck growth. We integrate AI precisely into regulated environments —
                mapping processes with surgical accuracy to ensure compliance, security, and unprecedented efficiency.
              </p>
              {/* Feature pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, label: "Workflow Mapping" },
                  { icon: Bot, label: "AI Automation" },
                  { icon: ShieldCheck, label: "Compliance First" },
                  { icon: Activity, label: "Actionable Analytics" },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/12 transition-colors"
                  >
                    <f.icon className="w-3.5 h-3.5 text-primary" />
                    {f.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Large stats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-px"
            >
              {[
                { val: 40, suffix: "%", label: "Average reduction in admin load for healthcare clients", color: "border-l-primary" },
                { val: 100, suffix: "%", label: "Compliance-conscious architecture on every build", color: "border-l-secondary" },
                { val: 60, suffix: "%", label: "Faster reporting cycles on the Tax Analytics Platform", color: "border-l-primary/60" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className={`bg-white/5 border-l-2 ${s.color} rounded-r-2xl p-7 hover:bg-white/8 transition-colors`}
                >
                  <div className="text-5xl font-black text-white mb-2 tabular-nums">
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PLATFORM SHOWCASE
      ════════════════════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Flagship Platforms</p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                Purpose-built for
                <br />the industries we serve.
              </h2>
            </div>
            <Link href="/platforms">
              <motion.div
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm shrink-0 cursor-pointer"
              >
                View all platforms <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Platform 1 — light */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group grid grid-cols-1 lg:grid-cols-[1fr_1fr] rounded-3xl overflow-hidden border border-border mb-5 hover:shadow-xl hover:shadow-primary/8 transition-all duration-500"
          >
            <div className="relative overflow-hidden min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80"
                alt="AI Admin Co-Pilot — Healthcare"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Healthcare & Allied Health
                </span>
              </div>
            </div>
            <div className="bg-white p-10 xl:p-14 flex flex-col justify-center">
              <h3 className="text-2xl xl:text-3xl font-black text-foreground mb-4 leading-tight">AI Admin Co-Pilot</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                An invisible assistant handling documentation, reporting, and communication workflows —
                giving healthcare teams back the hours they deserve.
              </p>
              <ul className="space-y-2.5 mb-10">
                {["Automated clinical documentation", "Intelligent follow-up workflows", "Compliance-safe reporting"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/platforms">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm cursor-pointer"
                >
                  Explore platform <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Platform 2 — dark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="group grid grid-cols-1 lg:grid-cols-[1fr_1fr] rounded-3xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/8 transition-all duration-500"
          >
            <div className="bg-[hsl(220,30%,7%)] p-10 xl:p-14 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-xs font-bold text-primary mb-8 w-fit border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Financial Services
              </div>
              <h3 className="text-2xl xl:text-3xl font-black text-white mb-4 leading-tight">
                Tax Exposure Analytics Platform
              </h3>
              <p className="text-white/55 mb-8 leading-relaxed">
                Proactive tax risk analysis for organisations and advisory firms.
                Identify compliance risks early — before they become costly.
              </p>
              <ul className="space-y-2.5 mb-10">
                {["Early tax exposure detection", "Deep transaction data analysis", "Automated advisory reporting"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/platforms">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm cursor-pointer"
                >
                  Explore platform <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </div>
            <div className="relative overflow-hidden min-h-[280px] order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80"
                alt="Tax Exposure Analytics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY DIFFERENT — Feature comparison
      ════════════════════════════════════════ */}
      <section className="py-24 bg-muted/40 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,hsl(185,85%,38%,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">The Difference</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Generic AI tools vs. sector-specific platforms.
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A general-purpose assistant cannot navigate healthcare administration or tax exposure analysis safely.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border p-8"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-6">
                <span className="text-red-500 text-lg font-bold">✕</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-5">Generic AI Tools</h3>
              <ul className="space-y-4">
                {[
                  "No understanding of industry regulations",
                  "Not built for compliance workflows",
                  "Generic outputs, no domain context",
                  "High hallucination risk in sensitive docs",
                  "No audit trail or data governance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-400 text-xs font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* C TECH */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-foreground rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse,hsl(185,85%,38%,0.2),transparent_70%)] pointer-events-none" />
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 relative z-10">
                <span className="text-primary text-lg font-bold">✓</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-5 relative z-10">C TECH Platforms</h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Deep sector-specific regulatory knowledge",
                  "Purpose-built for compliance environments",
                  "Domain-trained AI for precise outputs",
                  "Verified accuracy with auditability baked in",
                  "Full data governance and privacy architecture",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-[hsl(220,30%,7%)] px-8 py-16 md:p-20 text-center text-white overflow-hidden noise-bg"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(185,85%,38%,0.25),transparent_60%)] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[radial-gradient(ellipse,hsl(185,65%,52%,0.12),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-8"
              >
                <img src={`${import.meta.env.BASE_URL}images/ctech-logo.png`} alt="" className="h-10 w-auto brightness-0 invert" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Ready to streamline
                <br />your operations?
              </h2>
              <p className="text-white/55 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                Let's discuss how our platforms can be tailored to your specific industry requirements.
                No generic demos — tailored discovery calls only.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 40px hsl(185 85% 38% / 0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all"
                  >
                    Schedule a Discovery Call
                  </motion.button>
                </Link>
                <Link href="/platforms">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-14 px-10 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 hover:border-white/30 transition-all"
                  >
                    View Platforms
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
