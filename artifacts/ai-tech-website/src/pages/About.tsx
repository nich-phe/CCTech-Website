import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    number: "01",
    title: "Sector-first thinking",
    body: "Before writing a single line of code, we map how your team actually operates. Every nuance of your workflow becomes a design constraint.",
  },
  {
    number: "02",
    title: "AI where it earns its place",
    body: "We integrate AI specifically where manual effort is highest and the risk of error is greatest — not because it's fashionable, but because it's effective.",
  },
  {
    number: "03",
    title: "Compliance as architecture",
    body: "Auditability, data privacy, and regulatory adherence aren't bolt-ons. They're foundational decisions made before the first database schema.",
  },
  {
    number: "04",
    title: "Measurable outcomes",
    body: "We don't promise transformation. We deliver measurable reductions in admin hours, documented compliance improvements, and quantifiable ROI.",
  },
];

const stats = [
  { value: "40%", label: "Average admin load reduction" },
  { value: "2", label: "Flagship platforms live" },
  { value: "100%", label: "Compliance-conscious architecture" },
];

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-muted/50 via-transparent to-transparent" />
        <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              About C TECH
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8 max-w-4xl">
              We build the foundation for efficient,{" "}
              <span className="text-gradient">compliant operations.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              C TECH is an AI technology company focused on practical, sector-specific platforms. AI shouldn't just be an impressive demo — it should be a reliable engine for daily work.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="py-10 md:py-6 md:px-12 first:md:pl-0 last:md:pr-0 text-center md:text-left"
              >
                <div className="text-5xl font-bold text-secondary mb-2">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach — Narrative */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8">
                Our approach is deliberate, not accidental.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                While many companies pursue generic AI tools, heavily regulated industries need something different. A general-purpose assistant cannot safely navigate healthcare administration or tax exposure analysis.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                We build from the ground up — starting with deep workflow mapping. By understanding exactly how a compliance officer or allied health professional works, we insert automation precisely where it reduces friction, without compromising accuracy or data security.
              </p>
              <Link href="/how-we-build">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-base cursor-pointer"
                >
                  See how we build <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Values */}
            <div className="space-y-0 divide-y divide-border">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group py-10 flex gap-8 items-start hover:bg-muted/30 transition-colors rounded-2xl px-4 -mx-4"
                >
                  <span className="text-sm font-bold text-muted-foreground/50 tabular-nums pt-1 shrink-0">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{v.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,0,0,0.05),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to talk about your operational challenges?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              We engage with a small number of partners to ensure deep focus and exceptional outcomes.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
              >
                Book a Discovery Call
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
