import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  align?: "left" | "center";
}

export function PageHeader({ title, description, badge, align = "center" }: PageHeaderProps) {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "max-w-3xl",
          align === "center" ? "mx-auto text-center" : "text-left"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {badge && (
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                {badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
