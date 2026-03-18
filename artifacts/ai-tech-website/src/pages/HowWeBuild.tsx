import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Map, PenTool, Cpu, ShieldCheck, RefreshCw, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Sector-Specific Discovery",
    desc: "We begin by immersing ourselves in your regulatory environment and business objectives before writing a single line of code. This phase defines everything that follows.",
    detail: "Stakeholder interviews · Regulatory review · Competitive landscape · Technical audit",
    color: "#2563eb",
    colorLight: "#eff6ff",
    colorBorder: "#bfdbfe",
    label: "Phase 01",
  },
  {
    icon: Map,
    number: "02",
    title: "Workflow & Process Mapping",
    desc: "We document exactly how work gets done today — identifying bottlenecks, friction points, and high-value opportunities for automation.",
    detail: "Process diagrams · Swimlane mapping · Friction analysis · Opportunity scoring",
    color: "#059669",
    colorLight: "#ecfdf5",
    colorBorder: "#a7f3d0",
    label: "Phase 02",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Platform Design & Prototyping",
    desc: "Designing intuitive interfaces familiar to your workforce from day one, ensuring high adoption rates without prolonged training programmes.",
    detail: "Wireframes · Interactive prototypes · Usability testing · Design system",
    color: "#7c3aed",
    colorLight: "#f5f3ff",
    colorBorder: "#ddd6fe",
    label: "Phase 03",
  },
  {
    icon: Cpu,
    number: "04",
    title: "AI-Enabled Automation",
    desc: "Integrating specifically trained models and analytics engines to handle manual lifting precisely where process mapping identified the greatest friction.",
    detail: "Model selection · Fine-tuning · Integration architecture · Accuracy benchmarking",
    color: "#0891b2",
    colorLight: "#ecfeff",
    colorBorder: "#a5f3fc",
    label: "Phase 04",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Compliance-Conscious Development",
    desc: "Rigorous testing and architectural decisions that ensure data privacy, auditability, and regulatory adherence are not afterthoughts — they are foundations.",
    detail: "Security audit · Penetration testing · Data governance · Compliance validation",
    color: "#ea580c",
    colorLight: "#fff7ed",
    colorBorder: "#fed7aa",
    label: "Phase 05",
  },
  {
    icon: RefreshCw,
    number: "06",
    title: "Continuous Improvement",
    desc: "Deployment is just the beginning. We monitor, refine, and improve continuously based on real-world usage data and evolving regulatory landscapes.",
    detail: "Usage analytics · Model retraining · Regulatory updates · Quarterly reviews",
    color: "#0e9fac",
    colorLight: "#ecfeff",
    colorBorder: "#a5f3fc",
    label: "Phase 06",
  },
];

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.6], [24, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-0">
      {/* Left: Icon + Line */}
      <div className="flex flex-col items-center pt-0.5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-12 h-12 md:w-13 md:h-13 rounded-2xl flex items-center justify-center shrink-0 z-10 relative shadow-md"
          style={{ backgroundColor: step.color }}
        >
          <step.icon className="w-5 h-5 text-white" />
        </motion.div>
        {index < steps.length - 1 && (
          <div className="flex-1 w-px bg-border relative overflow-hidden mt-2 mb-0">
            <motion.div
              style={{ scaleY: lineScale, originY: 0 }}
              className="absolute inset-0"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="h-full w-full" style={{ backgroundColor: step.color + "60" }} />
            </motion.div>
          </div>
        )}
      </div>

      {/* Right: Content */}
      <motion.div
        style={{ x: textX, opacity: textOpacity }}
        className="pb-14 md:pb-18 pl-6 md:pl-10 pt-1"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ backgroundColor: step.colorLight, color: step.color, border: `1px solid ${step.colorBorder}` }}
        >
          {step.label}
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-xl">
          {step.desc}
        </p>
        <div
          className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border"
          style={{ backgroundColor: step.colorLight, color: step.color + "bb", borderColor: step.colorBorder }}
        >
          {step.detail}
        </div>
      </motion.div>
    </div>
  );
}

export default function HowWeBuild() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-transparent" />
          {/* Color blobs matching step colors */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,#2563eb,transparent_70%)] opacity-[0.06]" />
          <div className="absolute top-16 right-32 w-48 h-48 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_70%)] opacity-[0.07]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Methodology
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground leading-[1.1] mb-6">
                How We Build
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
                A rigorous, deliberate approach to enterprise software. Every phase has a purpose. Nothing is rushed.
              </p>

              {/* Phase color pills */}
              <div className="flex flex-wrap gap-2">
                {steps.map((s) => (
                  <div
                    key={s.number}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: s.colorLight, color: s.color, border: `1px solid ${s.colorBorder}` }}
                  >
                    <s.icon className="w-2.5 h-2.5" />
                    {s.title.split(" ")[0]}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Steps Timeline ── */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, i) => (
            <StepRow key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ── Closing Quote ── */}
      <section className="py-24 bg-[hsl(220,30%,7%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,#2563eb,transparent_70%)] opacity-10" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,#059669,transparent_70%)] opacity-8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,#7c3aed,transparent_70%)] opacity-6" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-light text-white/75 leading-relaxed mb-10">
              "We don't ship features. We ship{" "}
              <span className="font-bold text-white">measurable operational improvements</span>{" "}
              that your team will still rely on years from now."
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 30px hsl(185 85% 38% / 0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Start the conversation
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
