import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeartPulse, Landmark, Briefcase, Building2, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    number: "01",
    icon: HeartPulse,
    title: "Healthcare & Allied Health",
    description:
      "Navigating HIPAA-equivalent compliance while managing high volumes of patient data and documentation. We automate the administrative burden so providers can focus entirely on care delivery.",
    highlight: "Reduce admin time by up to 40%",
    color: "from-blue-500/10 to-blue-600/5",
    accent: "text-blue-500",
    border: "border-blue-200",
  },
  {
    number: "02",
    icon: Landmark,
    title: "Financial Services & Tax",
    description:
      "Handling complex regulatory environments and massive transaction datasets demands precision and speed. Our analytics platforms deliver clarity and early risk detection for advisory firms and large organisations.",
    highlight: "Proactive risk detection before exposure",
    color: "from-teal-500/10 to-teal-600/5",
    accent: "text-teal-500",
    border: "border-teal-200",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Streamlining client onboarding, contract analysis, and compliance reporting. We build tools that transform unstructured document chaos into organized, immediately actionable insight.",
    highlight: "Faster onboarding and reporting cycles",
    color: "from-indigo-500/10 to-indigo-600/5",
    accent: "text-indigo-500",
    border: "border-indigo-200",
  },
  {
    number: "04",
    icon: Building2,
    title: "Compliance-Heavy SMEs",
    description:
      "Growing businesses shouldn't have to choose between agility and compliance. We provide enterprise-grade automation scaled to fit the pace and resource reality of ambitious smaller organisations.",
    highlight: "Enterprise capability, SME agility",
    color: "from-purple-500/10 to-purple-600/5",
    accent: "text-purple-500",
    border: "border-purple-200",
  },
];

function IndustryRow({ ind, index }: { ind: (typeof industries)[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="group relative py-16 md:py-20 border-b border-border last:border-b-0"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-16 items-center px-4 md:px-8">
        {/* Number */}
        <motion.div style={{ y }} className="hidden md:block">
          <span className="text-[7rem] font-bold leading-none text-muted/40 select-none tabular-nums">
            {ind.number}
          </span>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border ${ind.border} bg-white flex items-center justify-center shrink-0`}>
              <ind.icon className={`w-5 h-5 ${ind.accent}`} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${ind.accent}`}>
              {ind.number}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {ind.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed max-w-2xl text-base md:text-lg">
            {ind.description}
          </p>

          <div className={`inline-flex items-center gap-2 text-sm font-semibold ${ind.accent}`}>
            <span className={`w-2 h-2 rounded-full bg-current`} />
            {ind.highlight}
          </div>
        </div>

        {/* CTA Arrow */}
        <Link href="/contact">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`shrink-0 w-12 h-12 rounded-full border ${ind.border} bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer`}
          >
            <ArrowUpRight className={`w-5 h-5 ${ind.accent}`} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Industries() {
  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(headerScroll, [0, 1], [0, 120]);
  const headerOpacity = useTransform(headerScroll, [0, 0.6], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={headerRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Sectors We Serve
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Deep industry<br />
                <span className="text-gradient">focus.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                We don't build generic tools. Every platform speaks the language and respects the regulations of a specific industry.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industries List */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {industries.map((ind, i) => (
            <IndustryRow key={i} ind={ind} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(20,184,166,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not seeing your sector?
            </h2>
            <p className="text-white/70 text-lg">
              Our compliance and automation architecture is adaptable. If you operate in a complex, document-heavy environment, let's talk.
            </p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0 h-14 px-8 rounded-full bg-white text-foreground font-semibold text-base hover:bg-white/90 transition-colors flex items-center gap-2"
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
