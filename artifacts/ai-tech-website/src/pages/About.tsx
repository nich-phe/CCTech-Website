import React from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <PageHeader 
        badge="About AuraTech"
        title="We build the foundation for efficient, compliant operations."
        description="AuraTech is an AI technology company focused on practical, sector-specific platforms. We believe that AI shouldn't just be an impressive demo—it should be a reliable engine for daily work."
        align="left"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg text-muted-foreground"
              >
                <h3 className="text-foreground font-display text-2xl font-bold mb-4">Our Approach</h3>
                <p>
                  While many companies focus on generic AI tools, we recognized early on that heavily regulated industries need a different approach. A general-purpose chat bot cannot safely navigate healthcare administration or tax exposure analysis.
                </p>
                <p>
                  We build our platforms from the ground up, starting with deep workflow mapping. By understanding exactly how a compliance officer or allied health professional works, we can insert automation exactly where it reduces friction, without compromising accuracy or data security.
                </p>
                <p>
                  Our tone is factual and confident because our results are measurable. We don't promise magic; we deliver robust digital infrastructure.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: "Expert Team",
                  desc: "A unique blend of software engineers, AI researchers, and domain experts."
                },
                {
                  icon: Target,
                  title: "Sector Specific",
                  desc: "Solutions tailored to the nuance of your specific industry regulations."
                },
                {
                  icon: Zap,
                  title: "Practical AI",
                  desc: "Focused on measurable ROI and reduction in manual administrative hours."
                },
                {
                  icon: CheckCircle2,
                  title: "Compliance Conscious",
                  desc: "Security and auditability built into the core architecture, not added as an afterthought."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-muted/50 rounded-2xl border border-border"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
