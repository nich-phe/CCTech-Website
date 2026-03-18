import React from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { Globe, Layers, TrendingUp } from "lucide-react";

export default function Vision() {
  return (
    <Layout>
      <PageHeader 
        badge="Our Vision"
        title="Building the infrastructure of tomorrow."
        description="Our broader mission is to build a growing portfolio of industry-focused platforms that combine automation, analytics, and AI."
        align="left"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Vision Statement */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 bg-foreground text-white rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Globe className="w-64 h-64" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                  Beyond generalized AI tools.
                </h2>
                <p className="text-xl text-white/80 leading-relaxed font-light">
                  We believe the future of enterprise software isn't one massive, generalized AI that tries to do everything. The future belongs to tightly scoped, highly specialized platforms that perfectly understand the nuances, jargon, and regulatory constraints of specific industries.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Roadmap / Future */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                Current Focus & Expansion
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                While our current rapid growth is driven by our success in the Healthcare and Financial/Tax sectors, our architectural foundation is designed for scale.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Expanding Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Continuously adding new modules and capabilities to our existing platforms.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">New Sectors</h4>
                    <p className="text-sm text-muted-foreground">Preparing to adapt our core compliance and automation engine for Legal, Supply Chain, and complex manufacturing.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted p-8 rounded-3xl border border-border"
            >
              <h3 className="text-xl font-display font-bold mb-4">Partner with us on the journey</h3>
              <p className="text-muted-foreground mb-8">
                We frequently partner with forward-thinking organizations to co-develop modules that solve their most pressing operational challenges. If you have a complex workflow that needs automation, we want to hear about it.
              </p>
              <a href="/contact" className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Discuss a Partnership
              </a>
            </motion.div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
