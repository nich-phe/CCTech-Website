import React, { useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileText, Clock, ShieldAlert, BarChart3, ArrowUpRight,
  CheckCircle2, MessageSquare, Activity
} from "lucide-react";

const adminOutcomes = [
  "Dramatically reduced admin burden",
  "Improved workflow efficiency",
  "Higher quality documentation",
  "More time dedicated to client care",
];

const taxOutcomes = [
  "Early detection of tax exposure",
  "Superior compliance visibility",
  "Faster review and reporting cycles",
  "Stronger advisory support capabilities",
];

export default function Platforms() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-transparent" />
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
                Our Solutions
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Platforms built for<br />
                <span className="text-gradient">complex realities.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Discover our flagship products designed for the unique operational challenges of healthcare and financial services.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Platform 1: AI Admin Co-Pilot ── */}
      <section className="py-24 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Label Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-5xl font-bold text-muted/30 tabular-nums">01</span>
            <div className="flex-1 h-px bg-border" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              Healthcare & Allied Health
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                AI Admin Co-Pilot
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                An AI-powered administrative co-pilot built specifically for healthcare and allied health teams. It acts as an invisible assistant, seamlessly handling the massive documentation burden that pulls practitioners away from their clients.
              </p>

              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-6">Core Capabilities</p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: FileText, text: "Automated clinical documentation and session summaries." },
                  { icon: MessageSquare, text: "Intelligent communication workflows and follow-up generation." },
                  { icon: BarChart3, text: "Standardized reporting tailored to specific medical requirements." },
                  { icon: Clock, text: "Admin task prioritization and scheduling automation." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed pt-1.5">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-semibold cursor-pointer"
                >
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Right: Image + Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/8 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80"
                  alt="AI Admin Co-Pilot"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Outcomes */}
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">Key Outcomes</p>
                <ul className="space-y-3">
                  {adminOutcomes.map((o, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{o}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Platform 2: Tax Exposure Analytics ── */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Label Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-5xl font-bold text-muted/30 tabular-nums">02</span>
            <div className="flex-1 h-px bg-border" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
              Financial Services & Tax Advisory
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Image + Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/8 border border-border">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80"
                  alt="Tax Exposure Analytics Platform"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Outcomes */}
              <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-5">Key Outcomes</p>
                <ul className="space-y-3">
                  {taxOutcomes.map((o, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span className="text-sm font-medium">{o}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Tax Exposure Analytics
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                A proactive tax risk and exposure platform for large organisations and advisory firms. By continuously analyzing massive datasets, it transforms raw transaction data into clear, auditable insights — before exposure becomes liability.
              </p>

              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-6">Core Capabilities</p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: ShieldAlert, text: "Early identification of compliance risks and anomalies." },
                  { icon: Activity, text: "Deep analysis of complex financial and transaction data." },
                  { icon: FileText, text: "Generation of clear insights for proactive tax management." },
                  { icon: BarChart3, text: "Automated reporting for faster advisory turnaround." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-teal-600" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed pt-1.5">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-semibold cursor-pointer"
                >
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">See our platforms in action</h2>
            <p className="text-primary-foreground/70 text-lg">
              Request a personalized demonstration tailored to your workflows.
            </p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 h-14 px-8 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
            >
              Request a Demo
            </motion.button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
