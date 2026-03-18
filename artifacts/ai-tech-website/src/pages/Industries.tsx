import React from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import { HeartPulse, Landmark, Briefcase, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare & Allied Health",
    description: "Navigating HIPAA/HIPAA-equivalent compliance while managing high volumes of patient data and documentation. We automate the admin so providers can focus on care.",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100"
  },
  {
    icon: Landmark,
    title: "Financial Services & Tax",
    description: "Handling complex regulatory environments and massive transaction datasets. Our analytics platforms provide clarity and early risk detection for advisory firms.",
    color: "text-teal-500",
    bg: "bg-teal-50 border-teal-100"
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Streamlining client onboarding, contract analysis, and reporting. We build tools that turn unstructured document chaos into organized, actionable data.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-100"
  },
  {
    icon: Building2,
    title: "Compliance-Heavy SMEs",
    description: "For growing businesses struggling with the administrative overhead of industry regulations. We provide enterprise-grade automation scaled for agility.",
    color: "text-purple-500",
    bg: "bg-purple-50 border-purple-100"
  }
];

export default function Industries() {
  return (
    <Layout>
      <PageHeader 
        badge="Sectors We Serve"
        title="Deep industry focus."
        description="We don't build generic tools. We build platforms that speak the language and respect the regulations of specific industries."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-card border border-border hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${ind.bg}`}>
                  <ind.icon className={`w-7 h-7 ${ind.color}`} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {ind.title}
                </h3>
                <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                  {ind.description}
                </p>
                <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  Discuss your industry needs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
