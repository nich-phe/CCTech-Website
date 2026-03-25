import React, { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowUpRight } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        function step(now: number) {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Line({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
      className="h-px bg-neutral-100 origin-left"
    />
  );
}

const platforms = [
  {
    index: "01",
    name: "AI Admin Co-Pilot",
    tag: "Healthcare & Allied Health",
    tagColor: "#059669",
    desc: "An invisible assistant that handles documentation, reporting, and communication — returning time to the people who need it most.",
    photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
    href: "/platforms",
  },
  {
    index: "02",
    name: "Tax Exposure Analytics",
    tag: "Financial Services",
    tagColor: "#2563eb",
    desc: "Proactive tax risk detection for organisations and advisory firms — surface exposure before it compounds into liability.",
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
    href: "/platforms",
  },
];

const industries = [
  { name: "Healthcare & Allied Health", role: "Clinical automation, admin co-pilots", color: "#059669" },
  { name: "Financial Services",         role: "Risk detection, tax intelligence",    color: "#2563eb" },
  { name: "Legal & Professional",       role: "Document intelligence, matter flow",  color: "#7c3aed" },
  { name: "Enterprise & SME",           role: "Scalable workflow automation",        color: "#ea580c" },
  { name: "Supply Chain & Logistics",   role: "Operations intelligence, tracking",   color: "#0891b2" },
];

const ticker = [
  "Healthcare", "Financial Services", "Legal", "Compliance Architecture",
  "Tax Analytics", "Admin Automation", "Allied Health", "Risk Detection",
  "Document Intelligence", "Workflow Mapping", "Operations", "Supply Chain",
];

export default function Home() {
  return (
    <Layout>

      {/* ─────────────────────────────────────────
          HERO  — editorial, left-aligned
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 xl:px-24 bg-white overflow-hidden">

        {/* Index row */}
        <div className="flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[10px] font-mono tracking-[0.28em] text-neutral-400 uppercase"
          >
            C TECH — Enterprise AI Platforms
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="text-[10px] font-mono tracking-[0.28em] text-neutral-400 uppercase"
          >
            Est. 2024
          </motion.span>
        </div>

        {/* Headline block */}
        <div className="py-16 max-w-[1000px]">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[10px] font-mono tracking-[0.32em] uppercase text-primary mb-8"
          >
            ◆  Sector-specific AI
          </motion.p>

          {["Built for", "industries", "that can't afford", "to get it wrong."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.1 }}
                className={`text-[clamp(3rem,7.5vw,6.5rem)] font-black leading-[0.96] tracking-[-0.03em] ${
                  i === 1 ? "text-primary" : "text-foreground"
                }`}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-neutral-500 text-base sm:text-lg mt-10 max-w-lg leading-relaxed"
          >
            We design AI from the ground up for your compliance requirements,
            workflow logic, and operating environment — not bolted on after the fact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex items-center gap-10 mt-12"
          >
            <Link href="/platforms">
              <span className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground pb-0.5 cursor-pointer hover:text-primary hover:border-primary transition-colors duration-200">
                Explore platforms
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-sm font-medium text-neutral-400 cursor-pointer hover:text-neutral-700 transition-colors duration-200">
                Book a conversation
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="border-t border-neutral-100 pt-8 grid grid-cols-3 gap-4 sm:gap-10"
        >
          {[
            { val: 40,  suffix: "%", label: "Avg. admin reduction"   },
            { val: 100, suffix: "%", label: "Compliance-first builds" },
            { val: 60,  suffix: "%", label: "Faster reporting cycles" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-black text-foreground tabular-nums">
                <Counter to={s.val} suffix={s.suffix} />
              </div>
              <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          TICKER
      ───────────────────────────────────────── */}
      <div className="border-y border-neutral-100 bg-neutral-50 py-3.5 overflow-hidden">
        <div className="animate-marquee">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase whitespace-nowrap">
              {item}
              <span className="w-px h-3 bg-neutral-200 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          MANIFESTO
      ───────────────────────────────────────── */}
      <section className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 xl:px-24 bg-white">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-neutral-400 mb-12">Our position</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[clamp(1.8rem,4.5vw,3.8rem)] font-black leading-[1.12] tracking-[-0.02em] text-foreground max-w-[860px]">
            Generic AI tools aren't built for sectors with real consequences.{" "}
            <span className="text-primary">We are.</span>
          </p>
        </Reveal>
        <Line delay={0.18} />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl">
          <Reveal delay={0.2}>
            <p className="text-neutral-500 text-base leading-relaxed">
              We design AI platforms with compliance architecture from day one — not as an afterthought. Every data flow, every output, every integration is built for the rules of your sector.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="text-neutral-500 text-base leading-relaxed">
              Healthcare. Financial. Legal. Each industry has its own language, its own risk, its own workflow. We don't adapt generic models — we build specific ones.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          PLATFORMS — numbered editorial rows
      ───────────────────────────────────────── */}
      <section className="bg-neutral-50 border-t border-neutral-100">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-20 pb-4 flex items-end justify-between">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-neutral-400">Flagship platforms</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/platforms">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary cursor-pointer hover:opacity-60 transition-opacity">
                All platforms →
              </span>
            </Link>
          </Reveal>
        </div>

        {platforms.map((p, i) => (
          <motion.div
            key={p.index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border-t border-neutral-200 last:border-b"
          >
            <Link href={p.href}>
              <div className="group px-6 sm:px-10 lg:px-16 xl:px-24 py-10 grid grid-cols-[3rem_1fr_auto] gap-6 items-center cursor-pointer hover:bg-white transition-colors duration-300">
                <span className="text-[11px] font-mono text-neutral-300 tracking-widest">{p.index}</span>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 shrink-0">
                    {p.name}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed hidden sm:block max-w-sm">
                    {p.desc}
                  </p>
                  <span
                    className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm shrink-0 w-fit"
                    style={{ color: p.tagColor, backgroundColor: p.tagColor + "14" }}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-20 h-14 rounded overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block shrink-0">
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ─────────────────────────────────────────
          INDUSTRIES — clean list rows
      ───────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 xl:px-24 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-neutral-400">Industries we serve</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/industries">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary cursor-pointer hover:opacity-60 transition-opacity">
                Explore industries →
              </span>
            </Link>
          </Reveal>
        </div>

        <div>
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group border-t border-neutral-100 last:border-b py-5 flex items-center justify-between gap-6 cursor-pointer"
              style={{ paddingLeft: "0px" }}
            >
              <div className="flex items-center gap-4">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: ind.color }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.3 }}
                />
                <span className="text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                  {ind.name}
                </span>
              </div>
              <span className="text-sm text-neutral-400 hidden sm:block shrink-0 tabular-nums">{ind.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          HOW WE BUILD — 3-col minimal
      ───────────────────────────────────────── */}
      <section className="bg-[hsl(220,25%,6%)] text-white py-28 px-6 sm:px-10 lg:px-16 xl:px-24">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-neutral-600 mb-20">How we build</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-0 sm:divide-x divide-white/8">
          {[
            { n: "01", title: "Understand",
              body: "We map your actual workflows — not idealized ones. Compliance requirements, data flows, edge cases, team behaviours." },
            { n: "02", title: "Build",
              body: "Sector-specific AI, tested against real industry constraints. Not off-the-shelf models repurposed for compliance." },
            { n: "03", title: "Operate",
              body: "Continuous monitoring, model refinement, and compliance updates as regulations evolve around you." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="sm:px-12 first:pl-0 last:pr-0">
              <span className="text-[10px] font-mono text-neutral-700 tracking-widest block mb-8">{s.n}</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-5 tracking-tight">{s.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Line delay={0.2} />

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Reveal>
            <p className="text-neutral-600 text-sm max-w-md leading-relaxed">
              Every build follows our 6-phase compliance framework — from discovery through to continuous improvement.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/how-we-build">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary cursor-pointer group hover:opacity-70 transition-opacity">
                See the full process
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CTA — minimal, sharp
      ───────────────────────────────────────── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 xl:px-24 bg-white">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.32em] uppercase text-neutral-400 mb-10">Get started</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[1.02] tracking-[-0.03em] text-foreground max-w-2xl mb-14">
            Ready to work<br />
            <span className="text-primary">differently?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-foreground text-white text-sm font-semibold px-8 py-4 cursor-pointer hover:bg-primary transition-colors duration-300"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/platforms">
              <span className="text-sm font-medium text-neutral-400 cursor-pointer hover:text-foreground transition-colors border-b border-neutral-200 pb-0.5">
                Or browse our platforms →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

    </Layout>
  );
}
