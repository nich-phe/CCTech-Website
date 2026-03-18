import React, { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { Link } from "wouter";

const roadmapItems = [
  {
    phase: "Now",
    status: "active",
    title: "Healthcare Administration",
    desc: "AI Admin Co-Pilot is live and reducing admin burden for healthcare and allied health teams across multiple organisations.",
  },
  {
    phase: "Now",
    status: "active",
    title: "Tax Exposure Analytics",
    desc: "Our Tax Exposure Analytics Platform is helping advisory firms and large organisations identify compliance risks before they become costly.",
  },
  {
    phase: "Next",
    status: "upcoming",
    title: "Legal & Contract Intelligence",
    desc: "Adapting our compliance engine for document-heavy legal workflows — contract review, clause analysis, and obligation tracking.",
  },
  {
    phase: "Next",
    status: "upcoming",
    title: "Supply Chain Compliance",
    desc: "Bringing automated compliance monitoring and analytics to complex, regulation-heavy supply chain operations.",
  },
];

export default function Vision() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-40 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
          <img
            src={`${import.meta.env.BASE_URL}images/vision-abstract.png`}
            alt=""
            className="w-full h-full object-cover opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />
        </motion.div>

        <motion.div style={{ opacity: contentOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm mb-8 text-sm font-medium text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Our Vision
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8">
                Building the infrastructure{" "}
                <span className="text-gradient">of tomorrow.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                A growing portfolio of industry-focused platforms that combine automation, analytics, and AI — each one purpose-built for its sector.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Statement */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-foreground text-white p-10 md:p-16 overflow-hidden mb-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(20,184,166,0.2),transparent_60%)]" />
            <div className="absolute right-10 top-10 opacity-5">
              <Globe className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-6">Our Belief</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Beyond generalized AI tools.
              </h2>
              <p className="text-xl text-white/70 leading-relaxed font-light">
                The future of enterprise software isn't one massive, generalized AI that tries to do everything. The future belongs to tightly scoped, highly specialized platforms that perfectly understand the nuances, jargon, and regulatory constraints of their industry.
              </p>
            </div>
          </motion.div>

          {/* Roadmap */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Platform Roadmap</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{"Where we are & where we're going."}</h2>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[calc(50%-0.5px)] w-px h-full bg-border" />

              <div className="space-y-6">
                {roadmapItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-8 px-6 rounded-2xl transition-all duration-300 ${
                      item.status === "active"
                        ? "hover:bg-secondary/5 border border-transparent hover:border-secondary/20"
                        : "hover:bg-muted/50 border border-transparent hover:border-border"
                    }`}
                  >
                    {/* Left */}
                    <div className={i % 2 === 0 ? "md:text-right md:pr-8" : "md:order-2 md:pl-8"}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                        item.status === "active"
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        {item.status === "active" ? (
                          <><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> Live</>
                        ) : (
                          <><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /> {item.phase}</>
                        )}
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 bg-white transition-colors duration-300 group-hover:scale-125 group-hover:bg-secondary border-secondary" />

                    {/* Right */}
                    <div className={i % 2 === 0 ? "md:pl-8" : "md:order-1 md:pr-8 md:text-right"}>
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-muted/50 border border-border rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center justify-between"
          >
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Partner with us on the journey
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We co-develop modules with forward-thinking organisations tackling complex operational challenges. If you have a workflow that needs automation, we want to hear about it.
              </p>
            </div>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Discuss a Partnership
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
