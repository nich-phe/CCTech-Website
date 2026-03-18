import React from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { Search, Map, PenTool, Cpu, ShieldCheck, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Sector-Specific Discovery",
    desc: "We begin by immersing ourselves in your regulatory environment and business objectives before writing a single line of code."
  },
  {
    icon: Map,
    title: "Workflow & Process Mapping",
    desc: "We document exactly how work gets done today, identifying bottlenecks, friction points, and opportunities for automation."
  },
  {
    icon: PenTool,
    title: "Platform Design & Prototyping",
    desc: "Designing intuitive interfaces that feel familiar to your workforce, ensuring high adoption rates."
  },
  {
    icon: Cpu,
    title: "AI-Enabled Automation",
    desc: "Integrating specifically trained LLMs and analytics engines to handle the manual lifting precisely where mapped."
  },
  {
    icon: ShieldCheck,
    title: "Compliance-Conscious Development",
    desc: "Rigorous testing and architectural decisions that ensure data privacy, auditability, and regulatory adherence."
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    desc: "Deployment is just the beginning. We continuously monitor, refine, and improve the platform based on real-world usage."
  }
];

export default function HowWeBuild() {
  return (
    <Layout>
      <PageHeader 
        badge="Methodology"
        title="How We Build"
        description="A rigorous, deliberate approach to building enterprise software. We combine deep discovery with agile execution."
      />

      <section className="pb-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-16">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full bg-white border-4 border-muted flex items-center justify-center -translate-x-1/2 z-10 shadow-sm">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
                  }`}>
                    <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-secondary font-bold text-sm mb-2 uppercase tracking-wider">Phase 0{i + 1}</div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
