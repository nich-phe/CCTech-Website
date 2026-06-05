import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight, ArrowUpRight, CheckCircle2,
  FileText, MessageSquare, BarChart3, Clock, Languages, ShieldCheck,
} from "lucide-react";

/* ─── Design tokens (shared with the rest of the site) ─── */
const C = {
  bg:      "#FFFFFF",
  text:    "#5C0E14",
  muted:   "#9B4A52",
  accent:  "#E84F5E",
  gold:    "#F0E193",
  peach:   "#FCDFC5",
  dark:    "#5C0E14",
  border:  "#F0D5CC",
  soft:    "#FEF7F3",
};

/* ─── Scroll reveal ─── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Static content ─── */
const capabilities = [
  { icon: FileText,      title: "Automated Documentation", desc: "Generates compliant progress notes and session summaries the moment a worker finishes a session." },
  { icon: Languages,     title: "Multilingual Voice Input", desc: "Support workers dictate in their own language — CareCliQ reformats to compliant English automatically." },
  { icon: ShieldCheck,   title: "Compliance Engine",       desc: "A 12-rule engine scores every note against NDIS standards and flags issues before they reach an auditor." },
  { icon: MessageSquare, title: "Communication Workflows", desc: "Intelligent follow-up generation and team handover notes that keep coordinators in the loop." },
  { icon: BarChart3,     title: "Standardised Reporting",  desc: "Audit-ready reporting tailored to specific NDIS and allied health requirements." },
  { icon: Clock,         title: "Admin Prioritisation",    desc: "Task prioritisation and scheduling automation that gives practitioners their time back." },
];

const steps = [
  { n: "01", title: "Worker Speaks",            body: "Support worker records a voice note in their language after a session." },
  { n: "02", title: "AI Translates & Formats",  body: "CareCliQ translates and structures the note into NDIS-compliant English." },
  { n: "03", title: "Compliance Check",         body: "Our 12-rule compliance engine scores the note and flags any issues instantly." },
  { n: "04", title: "Coordinator Reviews",      body: "The coordinator approves, edits, or exports — all from one dashboard." },
];

const outcomes = [
  "38.5 hours of admin saved per practitioner each week",
  "Audit-ready documentation across the entire team",
  "Real-time compliance visibility for coordinators",
  "Built for the 1 July 2026 mandatory registration deadline",
];

const languages = ["Khmer","Vietnamese","Arabic","Tagalog","Swahili","Amharic","Somali","Nepali","Hindi","Punjabi","English"];

export default function CareCliq() {
  return (
    <Layout>
      {/* ═══════════ BANNER ═══════════ */}
      <section className="pt-36 pb-20 px-6 sm:px-10 lg:px-20"
        style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.soft }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-6" style={{ color: C.muted }}>
              Product 01 — CareCliQ
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-black tracking-tight mb-7"
              style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", lineHeight: 1.05, color: C.text }}>
              Your team's NDIS compliance — managed in one place.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: C.muted }}>
              CareCliQ gives coordinators a real-time compliance dashboard, automated progress notes in
              11 languages, and audit-ready documentation — an invisible administrative co-pilot built
              specifically for healthcare and allied health teams.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 cursor-pointer transition-all duration-200"
                style={{ backgroundColor: C.accent, color: "white" }}>
                Request a demo <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CAPABILITIES ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: C.muted }}>
              Core capabilities
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black tracking-tight mb-14"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.text }}>
              An invisible co-pilot for the documentation burden.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: C.border, border: `1px solid ${C.border}` }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="h-full p-8" style={{ backgroundColor: C.bg }}>
                  <div className="w-10 h-10 flex items-center justify-center mb-5"
                    style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                    <c.icon className="w-5 h-5" style={{ color: C.accent }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: C.text }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: C.muted }}>
              How it works
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black tracking-tight mb-14"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.text }}>
              From voice to compliant note in under 30 seconds.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: C.border, border: `1px solid ${C.border}` }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.08}>
                <div className="h-full p-8" style={{ backgroundColor: C.bg }}>
                  <span className="text-[11px] font-mono tracking-widest" style={{ color: C.accent }}>{s.n}</span>
                  <h3 className="font-bold mt-4 mb-2" style={{ color: C.text }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MULTILINGUAL ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20" style={{ backgroundColor: C.soft, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-6" style={{ color: C.muted }}>
              Multilingual by design
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black tracking-tight mb-6"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: C.text }}>
              Built for Australia's CALD Workforce
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-3xl mx-auto" style={{ color: C.muted }}>
              Your support workers speak Khmer, Vietnamese, Swahili, Arabic, Tagalog, and more. CareCliQ
              accepts voice input in 11 languages and automatically translates and formats NDIS-compliant
              progress notes in English — in under 30 seconds.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {languages.map((lang) => (
                <span key={lang}
                  className="text-xs font-medium px-3.5 py-1.5"
                  style={{ color: C.text, backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ OUTCOMES + CTA ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: C.muted }}>
                Key outcomes
              </p>
              <ul className="space-y-4">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: C.accent }} />
                    <span className="text-base font-medium leading-relaxed" style={{ color: C.text }}>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-10" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
              <h3 className="font-black tracking-tight mb-4"
                style={{ fontSize: "clamp(1.5rem,2.6vw,2rem)", color: C.text }}>
                See CareCliQ in action.
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>
                Book a walkthrough and see how your team can be audit-ready before the
                1 July 2026 mandatory registration deadline.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 cursor-pointer transition-all duration-200"
                  style={{ backgroundColor: C.accent, color: "white" }}>
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
