import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, ShieldCheck, Zap, Activity } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-abstract.png`} 
            alt="Abstract Background" 
            className="w-full h-full object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8">
                <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
                <span className="text-sm font-medium text-muted-foreground">Enterprise AI Solutions</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight mb-8 leading-[1.1] text-balance">
                AI-powered platforms for smarter, <span className="text-gradient">compliant operations</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
                We build intelligent digital platforms that reduce manual work, improve compliance visibility, and operate more efficiently across complex industries.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/platforms">
                  <Button size="lg" className="w-full sm:w-auto rounded-full group">
                    Explore Our Platforms
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full bg-white">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Value Prop */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-primary/40 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                Empowering complex industries with focused automation.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Complex workflows shouldn't bottleneck growth. Our mission is to seamlessly integrate AI into highly regulated environments, mapping processes precisely to ensure accuracy, security, and unprecedented efficiency.
              </p>
              <div className="flex gap-8">
                <div>
                  <h4 className="text-4xl font-display font-bold text-secondary mb-2">40%</h4>
                  <p className="text-white/60 text-sm">Average reduction in admin load</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-secondary mb-2">100%</h4>
                  <p className="text-white/60 text-sm">Compliance-conscious architecture</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: Zap, title: "Workflow Mapping", desc: "Deep understanding of operational realities." },
                { icon: Bot, title: "AI Automation", desc: "Targeting high-friction, repetitive tasks." },
                { icon: ShieldCheck, title: "Compliance First", desc: "Built for highly regulated sectors." },
                { icon: Activity, title: "Actionable Analytics", desc: "Clear visibility into risks and opportunities." }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <feature.icon className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Platforms */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Flagship Platforms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built solutions designed for the specific needs of healthcare and financial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="h-64 bg-muted relative overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}images/platform-admin.png`} 
                  alt="AI Admin Co-Pilot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-100">
                  Healthcare & Allied Health
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  AI Admin Co-Pilot
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  An intelligent administrative co-pilot that reduces repetitive documentation, reporting, and communication workflows, giving teams more time for client care.
                </p>
                <Link href="/platforms">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="h-64 bg-muted relative overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}images/platform-tax.png`} 
                  alt="Tax Exposure Analytics Platform" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <div className="inline-flex px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4 border border-teal-100">
                  Financial Services
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Tax Exposure Analytics Platform
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  Proactive tax risk and exposure platform for organisations. Identifies compliance risks early by analyzing financial data to generate clear, actionable insights.
                </p>
                <Link href="/platforms">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to streamline your operations?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let's discuss how our platforms can be tailored to your specific industry requirements.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg">
              Schedule a Discovery Call
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
