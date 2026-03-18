import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Clock, ShieldAlert, BarChart3, ArrowRight } from "lucide-react";

export default function Platforms() {
  return (
    <Layout>
      <PageHeader 
        badge="Our Solutions"
        title="Platforms built for complex realities."
        description="Discover our flagship products designed specifically for the unique operational challenges of healthcare and financial services."
      />

      {/* Platform 1: AI Admin Co-Pilot */}
      <section className="py-24 bg-white border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
                Healthcare & Allied Health
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                AI Admin Co-Pilot
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                An AI-powered administrative co-pilot built specifically for healthcare and allied health teams. It acts as an invisible assistant, seamlessly handling the massive documentation burden that pulls practitioners away from their clients.
              </p>
              
              <h4 className="font-semibold text-foreground mb-4">Core Capabilities:</h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Automated clinical documentation and session summaries.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Intelligent communication workflows and follow-up generation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Standardized reporting tailored to specific medical requirements.</span>
                </li>
              </ul>

              <div className="bg-muted p-6 rounded-2xl border border-border">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  Key Outcomes
                </h4>
                <p className="text-sm text-muted-foreground">
                  Dramatically reduced admin burden, vastly improved workflow efficiency, higher quality documentation, and most importantly: more time dedicated to client care.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-border">
                <img 
                  src={`${import.meta.env.BASE_URL}images/platform-admin.png`} 
                  alt="AI Admin Co-Pilot Dashboard Interface" 
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform 2: Tax Analytics */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-border">
                <img 
                  src={`${import.meta.env.BASE_URL}images/platform-tax.png`} 
                  alt="Tax Exposure Analytics Platform Interface" 
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
                Financial Services
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Tax Exposure Analytics
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A proactive tax risk and exposure platform designed for large organisations and advisory firms. By continuously analyzing massive datasets, it turns raw transaction data into clear, auditable insights.
              </p>
              
              <h4 className="font-semibold text-foreground mb-4">Core Capabilities:</h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Early identification of compliance risks and anomalies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Deep analysis of complex financial and transaction data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Generation of clear insights for proactive tax management.</span>
                </li>
              </ul>

              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  Key Outcomes
                </h4>
                <p className="text-sm text-muted-foreground">
                  Early detection of exposure, superior compliance visibility, significantly faster review and reporting cycles, and stronger advisory support capabilities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-6">See our platforms in action</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Request a personalized demonstration to see how our platforms can map directly to your operational workflows.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="white" className="rounded-full px-8">
              Request a Demo
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
