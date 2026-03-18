import React, { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Bot, ShieldCheck, Zap, Activity } from "lucide-react";

const features = [
  { icon: Zap, title: "Workflow Mapping", desc: "Deep understanding of operational realities." },
  { icon: Bot, title: "AI Automation", desc: "Targeting high-friction, repetitive tasks." },
  { icon: ShieldCheck, title: "Compliance First", desc: "Built for highly regulated sectors." },
  { icon: Activity, title: "Actionable Analytics", desc: "Clear visibility into risks and opportunities." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-32 pb-40 lg:pt-44 lg:pb-52 overflow-hidden">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 -z-10">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/70 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(20,184,166,0.08),transparent_70%)]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-10">
                <span className="flex h-2 w-2 rounded-full bg-secondary" />
                <span className="text-sm font-medium text-muted-foreground">Enterprise AI Solutions</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-8 leading-[1.08] text-balance">
                AI-powered platforms for smarter,{" "}
                <span className="text-gradient">compliant operations</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed text-balance">
                We build intelligent digital platforms that reduce manual work, improve compliance visibility, and operate more efficiently across complex industries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/platforms">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group h-14 px-8 text-base">
                    Explore Our Platforms
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full bg-white h-14 px-8 text-base">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Mission Strip ── */}
      <section className="py-28 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(20,184,166,0.15),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">Our Mission</p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl mb-8">
                Empowering complex industries with focused automation.
              </h2>
              <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                Complex workflows shouldn't bottleneck growth. We integrate AI precisely into regulated environments — mapping processes to ensure accuracy, security, and efficiency at scale.
              </p>
            </motion.div>

            {/* Stat stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-row lg:flex-col gap-8 lg:gap-12 shrink-0 pb-1"
            >
              {[
                { val: "40%", label: "Avg. reduction in admin load" },
                { val: "100%", label: "Compliance-conscious architecture" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-5xl font-bold text-secondary mb-1">{s.val}</div>
                  <div className="text-white/50 text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Feature list */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 hover:bg-white/10 transition-colors p-6 md:p-8"
              >
                <f.icon className="w-7 h-7 text-secondary mb-4" />
                <h3 className="font-semibold text-base mb-1">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms — Full-bleed alternating ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Flagship Platforms</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground max-w-xl leading-tight">
              Purpose-built for the industries we serve.
            </h2>
          </motion.div>

          {/* Platform 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border mb-6 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
          >
            <div className="relative overflow-hidden h-64 lg:h-auto min-h-[300px]">
              <img
                src={`${import.meta.env.BASE_URL}images/platform-healthcare.png`}
                alt="AI Admin Co-Pilot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </div>
            <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100 w-fit">
                Healthcare & Allied Health
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">AI Admin Co-Pilot</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                An intelligent administrative co-pilot that handles documentation, reporting, and communication workflows — giving healthcare teams more time for the work that matters.
              </p>
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

          {/* Platform 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
          >
            <div className="bg-foreground p-10 md:p-14 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-6 border border-teal-500/20 w-fit">
                Financial Services
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Tax Exposure Analytics Platform</h3>
              <p className="text-white/60 mb-8 leading-relaxed text-base">
                Proactive tax risk and exposure analysis for organisations and advisory firms. Identify compliance risks early before they become costly problems.
              </p>
              <Link href="/platforms">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-secondary font-semibold text-sm cursor-pointer"
                >
                  Explore platform <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </div>
            <div className="relative overflow-hidden h-64 lg:h-auto min-h-[300px] order-1 lg:order-2">
              <img
                src={`${import.meta.env.BASE_URL}images/platform-tax.png`}
                alt="Tax Exposure Analytics Platform"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,184,166,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your operations?</h2>
              <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
                Let's discuss how our platforms can be tailored to your specific industry requirements.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-14 px-10 rounded-full bg-white text-foreground font-semibold text-base hover:bg-white/90 transition-colors"
                >
                  Schedule a Discovery Call
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
