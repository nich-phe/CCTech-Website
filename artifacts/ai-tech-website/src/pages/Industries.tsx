import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  HeartPulse, Landmark, Briefcase, Building2, Scale,
  ArrowUpRight, CheckCircle2, ShieldCheck, Zap, BarChart3
} from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    number: "01",
    icon: HeartPulse,
    title: "Healthcare & Allied Health",
    subtitle: "Clinical Automation",
    description:
      "Navigating strict clinical compliance while managing high volumes of patient data and documentation demands precision. We automate the administrative burden so practitioners can focus entirely on care delivery.",
    highlight: "Reduce admin time by up to 40%",
    photo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80",
    photoAlt: "Healthcare professional with tablet",
    accent: "#059669",
    accentLight: "#ecfdf5",
    accentBorder: "#a7f3d0",
    accentClass: "text-emerald-600",
    bgClass: "bg-emerald-600",
    bgLightClass: "bg-emerald-50",
    ringClass: "ring-emerald-200",
    points: ["Clinical documentation automation", "HIPAA-compliant workflows", "Session summary generation", "Care coordination tools"],
  },
  {
    number: "02",
    icon: Landmark,
    title: "Financial Services & Tax",
    subtitle: "Risk Intelligence",
    description:
      "Complex regulatory environments and massive transaction datasets demand precision and speed. Our analytics platforms deliver clarity and early risk detection for advisory firms and large organisations.",
    highlight: "Proactive risk detection before exposure",
    photo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80",
    photoAlt: "Financial data and analytics",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    accentBorder: "#bfdbfe",
    accentClass: "text-blue-600",
    bgClass: "bg-blue-600",
    bgLightClass: "bg-blue-50",
    ringClass: "ring-blue-200",
    points: ["Tax exposure detection", "Transaction data analysis", "Compliance risk alerts", "Automated advisory reporting"],
  },
  {
    number: "03",
    icon: Scale,
    title: "Legal & Professional Services",
    subtitle: "Document Intelligence",
    description:
      "Streamlining client onboarding, contract analysis, and compliance reporting. We build tools that transform unstructured document chaos into organized, immediately actionable legal insight.",
    highlight: "Faster onboarding and reporting cycles",
    photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop&q=80",
    photoAlt: "Legal professionals in office",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    accentBorder: "#ddd6fe",
    accentClass: "text-violet-600",
    bgClass: "bg-violet-600",
    bgLightClass: "bg-violet-50",
    ringClass: "ring-violet-200",
    points: ["Contract clause analysis", "Obligation tracking", "Client onboarding automation", "Regulatory compliance monitoring"],
  },
  {
    number: "04",
    icon: Building2,
    title: "Compliance-Heavy SMEs",
    subtitle: "Enterprise at Scale",
    description:
      "Growing businesses shouldn't have to choose between agility and compliance. We provide enterprise-grade automation scaled to fit the pace and resource reality of ambitious smaller organisations.",
    highlight: "Enterprise capability, SME agility",
    photo: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop&q=80",
    photoAlt: "Modern business team collaboration",
    accent: "#ea580c",
    accentLight: "#fff7ed",
    accentBorder: "#fed7aa",
    accentClass: "text-orange-600",
    bgClass: "bg-orange-500",
    bgLightClass: "bg-orange-50",
    ringClass: "ring-orange-200",
    points: ["Workflow audit trails", "Document management AI", "Regulatory change tracking", "Compliance reporting automation"],
  },
  {
    number: "05",
    icon: Briefcase,
    title: "Supply Chain & Logistics",
    subtitle: "Operations Intelligence",
    description:
      "Regulation-heavy supply chains require real-time visibility and automated compliance monitoring. Our platforms track obligations across vendors, geographies, and regulatory frameworks simultaneously.",
    highlight: "End-to-end compliance visibility",
    photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=80",
    photoAlt: "Supply chain and logistics operations",
    accent: "#0891b2",
    accentLight: "#ecfeff",
    accentBorder: "#a5f3fc",
    accentClass: "text-cyan-600",
    bgClass: "bg-cyan-600",
    bgLightClass: "bg-cyan-50",
    ringClass: "ring-cyan-200",
    points: ["Vendor compliance tracking", "Regulatory change alerts", "Cross-border obligation mapping", "Automated audit reporting"],
  },
];

function IndustrySection({ ind, index }: { ind: typeof industries[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const numY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Thin color stripe at top */}
      <div className="h-1 w-full" style={{ backgroundColor: ind.accent }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        {/* Photo side */}
        <div className={`relative overflow-hidden min-h-[320px] lg:min-h-0 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <motion.img
            style={{ scale: photoScale }}
            src={ind.photo}
            alt={ind.photoAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? `linear-gradient(to right, transparent 50%, ${ind.accent}18 100%)`
                : `linear-gradient(to left, transparent 50%, ${ind.accent}18 100%)`,
            }}
          />
          {/* Dark overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Large number */}
          <motion.div
            style={{ y: numY }}
            className="absolute bottom-4 left-4 right-4 pointer-events-none"
          >
            <span
              className="text-[8rem] sm:text-[11rem] font-black leading-none select-none tabular-nums text-white/[0.07]"
            >
              {ind.number}
            </span>
          </motion.div>

          {/* Industry badge */}
          <div className="absolute top-6 left-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
              style={{ backgroundColor: `${ind.accent}cc` }}
            >
              <ind.icon className="w-3.5 h-3.5" />
              {ind.subtitle}
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className={`relative flex flex-col justify-center p-8 sm:p-12 xl:p-16 bg-background ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          {/* Accent blob */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle, ${ind.accent}20, transparent 70%)`,
              transform: isEven ? "translate(30%, -30%)" : "translate(-30%, -30%)",
            }}
          />

          <div className="relative z-10">
            {/* Number + Label */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-black uppercase tracking-widest"
                style={{ color: ind.accent }}
              >
                {ind.number}
              </span>
              <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: ind.accent + "40" }} />
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: ind.accentLight, color: ind.accent, border: `1px solid ${ind.accentBorder}` }}
              >
                <ind.icon className="w-3 h-3" />
                {ind.title}
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4"
            >
              {ind.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-muted-foreground leading-relaxed mb-8 text-lg"
            >
              {ind.description}
            </motion.p>

            {/* Feature points */}
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="space-y-3 mb-8"
            >
              {ind.points.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ind.accent }} />
                  {pt}
                </motion.li>
              ))}
            </motion.ul>

            {/* Highlight stat */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold mb-8"
              style={{ backgroundColor: ind.accentLight, color: ind.accent, border: `1px solid ${ind.accentBorder}` }}
            >
              <Zap className="w-3.5 h-3.5" />
              {ind.highlight}
            </div>

            {/* CTA */}
            <Link href="/contact">
              <motion.div
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 font-semibold text-sm cursor-pointer"
                style={{ color: ind.accent }}
              >
                Discuss this sector <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Industries() {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: headerScroll } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(headerScroll, [0, 1], [0, 120]);
  const headerOpacity = useTransform(headerScroll, [0, 0.6], [1, 0]);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section ref={headerRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/60 via-background to-background" />
          {/* Multi-color blobs */}
          <div className="absolute top-8 right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,#059669,transparent_70%)] opacity-[0.08]" />
          <div className="absolute top-32 right-8 w-48 h-48 rounded-full bg-[radial-gradient(circle,#2563eb,transparent_70%)] opacity-[0.08]" />
          <div className="absolute bottom-8 left-24 w-64 h-64 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_70%)] opacity-[0.06]" />
          <div className="absolute bottom-4 left-8 w-36 h-36 rounded-full bg-[radial-gradient(circle,#ea580c,transparent_70%)] opacity-[0.08]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Sectors We Serve
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] mb-6">
                Deep industry
                <br />
                <span className="text-gradient">focus.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
                We don't build generic tools. Every platform speaks the language and respects the regulations of a specific industry.
              </p>

              {/* Industry color pills */}
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <div
                    key={ind.number}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: ind.accentLight, color: ind.accent, border: `1px solid ${ind.accentBorder}` }}
                  >
                    <ind.icon className="w-3 h-3" />
                    {ind.subtitle}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Industry Sections ── */}
      <div className="border-t border-border divide-y divide-border">
        {industries.map((ind, i) => (
          <IndustrySection key={i} ind={ind} index={i} />
        ))}
      </div>

      {/* ── CTA Strip ── */}
      <section className="py-24 bg-[hsl(220,30%,7%)] text-white relative overflow-hidden">
        {/* Multi-color glow dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,#059669,transparent_70%)] opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,#2563eb,transparent_70%)] opacity-10" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_70%)] opacity-8" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[radial-gradient(circle,#ea580c,transparent_70%)] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Not seeing your sector?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Our compliance and automation architecture is adaptable. If you operate in a complex, document-heavy environment, let's talk.
            </p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(14,159,172,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              Start a conversation
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
