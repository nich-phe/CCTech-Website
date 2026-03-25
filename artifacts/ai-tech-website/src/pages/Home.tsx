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
          HERO — full-bleed dark photo + white editorial text
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ backgroundColor: "#050d1a" }}
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&auto=format&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.18]"
          />
          {/* Radial vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, transparent 20%, #050d1a 80%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, #050d1a, transparent)" }} />
        </div>

        {/* Teal accent line top */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "linear-gradient(to right, #0E9FAC, transparent)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between min-h-screen pt-28 pb-14 px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Top labels */}
          <div className="flex justify-between items-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="text-[10px] font-mono tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              C TECH — Enterprise AI
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}
              className="text-[10px] font-mono tracking-[0.28em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              Est. 2024
            </motion.span>
          </div>

          {/* Headline */}
          <div className="max-w-[1100px]">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}
              className="text-[10px] font-mono tracking-[0.35em] uppercase mb-8" style={{ color: "#0E9FAC" }}>
              ◆  Sector-specific AI platforms
            </motion.p>

            {[
              { text: "Built for", color: "white" },
              { text: "industries", color: "#0E9FAC" },
              { text: "that can't afford", color: "white" },
              { text: "to get it wrong.", color: "rgba(255,255,255,0.45)" },
            ].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: "0%" }}
                  transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1], delay: 0.42 + i * 0.1 }}
                  className="font-black leading-[0.95] tracking-[-0.035em]"
                  style={{ fontSize: "clamp(3.2rem,8vw,7rem)", color: line.color }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="text-base sm:text-lg mt-10 max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              We design AI from the ground up for your compliance requirements, workflow logic, and operating reality.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex items-center gap-8 mt-12">
              <Link href="/platforms">
                <span className="group inline-flex items-center gap-2.5 bg-[#0E9FAC] text-white text-sm font-semibold px-7 py-3.5 cursor-pointer hover:bg-[#0a8a96] transition-colors duration-200">
                  Explore platforms <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm font-medium cursor-pointer transition-colors duration-200 border-b pb-0.5"
                  style={{ color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.15)" }}>
                  Book a conversation
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom metrics */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-3 gap-6 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { val: 40,  suffix: "%", label: "Avg. admin reduction"   },
              { val: 100, suffix: "%", label: "Compliance-first builds" },
              { val: 60,  suffix: "%", label: "Faster reporting cycles" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color: "#0E9FAC" }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {s.label}
                </div>
              </div>
            ))}
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
