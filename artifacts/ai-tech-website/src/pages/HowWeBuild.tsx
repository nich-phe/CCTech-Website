import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Map, PenTool, Cpu, ShieldCheck, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Sector-Specific Discovery",
    desc: "We begin by immersing ourselves in your regulatory environment and business objectives before writing a single line of code. This phase defines everything that follows.",
    detail: "Stakeholder interviews · Regulatory review · Competitive landscape · Technical audit",
  },
  {
    icon: Map,
    number: "02",
    title: "Workflow & Process Mapping",
    desc: "We document exactly how work gets done today — identifying bottlenecks, friction points, and high-value opportunities for automation.",
    detail: "Process diagrams · Swimlane mapping · Friction analysis · Opportunity scoring",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Platform Design & Prototyping",
    desc: "Designing intuitive interfaces familiar to your workforce from day one, ensuring high adoption rates without prolonged training programmes.",
    detail: "Wireframes · Interactive prototypes · Usability testing · Design system",
  },
  {
    icon: Cpu,
    number: "04",
    title: "AI-Enabled Automation",
    desc: "Integrating specifically trained models and analytics engines to handle manual lifting precisely where process mapping identified the greatest friction.",
    detail: "Model selection · Fine-tuning · Integration architecture · Accuracy benchmarking",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Compliance-Conscious Development",
    desc: "Rigorous testing and architectural decisions that ensure data privacy, auditability, and regulatory adherence are not afterthoughts — they are foundations.",
    detail: "Security audit · Penetration testing · Data governance · Compliance validation",
  },
  {
    icon: RefreshCw,
    number: "06",
    title: "Continuous Improvement",
    desc: "Deployment is just the beginning. We monitor, refine, and improve continuously based on real-world usage data and evolving regulatory landscapes.",
    detail: "Usage analytics · Model retraining · Regulatory updates · Quarterly reviews",
  },
];

function StepRow({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.6], [30, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-0">
      {/* Left: Number + Line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground flex items-center justify-center shrink-0 z-10 relative"
        >
          <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </motion.div>
        {index < steps.length - 1 && (
          <div className="flex-1 w-px bg-border relative overflow-hidden mt-2">
            <motion.div
              style={{ scaleY: lineScale, originY: 0 }}
              className="absolute inset-0 bg-secondary"
            />
          </div>
        )}
      </div>

      {/* Right: Content */}
      <motion.div
        style={{ x: textX, opacity: textOpacity }}
        className="pb-16 md:pb-20 pl-6 md:pl-10 pt-1"
      >
        <div className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
          Phase {step.number}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-xl">
          {step.desc}
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground/70 font-medium bg-muted/50 rounded-full px-4 py-2 border border-border">
          {step.detail}
        </div>
      </motion.div>
    </div>
  );
}

export default function HowWeBuild() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent" />
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.07),transparent_70%)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Methodology
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                How We Build
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                A rigorous, deliberate approach to enterprise software. Every phase has a purpose. Nothing is rushed.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {steps.map((step, i) => (
            <StepRow key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(20,184,166,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-10">
              "We don't ship features. We ship{" "}
              <span className="font-bold text-white">measurable operational improvements</span>{" "}
              that your team will still rely on years from now."
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-foreground font-semibold hover:bg-white/90 transition-colors"
            >
              Start the conversation
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
