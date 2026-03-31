import React, { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FileText, Clock, ShieldAlert, BarChart3, ArrowUpRight,
  CheckCircle2, MessageSquare, Activity, Building2, Wrench,
  Bell, Send, Zap, User, ChevronRight, Home, AlertTriangle,
} from "lucide-react";

/* ─── Palette ─────────────────────────────── */
const C = {
  text:   "#5C0E14",
  muted:  "#9B4A52",
  accent: "#E84F5E",
  gold:   "#F0E193",
  peach:  "#FCDFC5",
  dark:   "#5C0E14",
  border: "#F0D5CC",
  soft:   "#FEF7F3",
  bg:     "#FFFFFF",
};

/* ─── Outcomes data ─────────────────────────── */
const adminOutcomes = [
  "Dramatically reduced admin burden",
  "Improved workflow efficiency",
  "Higher quality documentation",
  "More time dedicated to client care",
];
const taxOutcomes = [
  "Early detection of tax exposure",
  "Superior compliance visibility",
  "Faster review and reporting cycles",
  "Stronger advisory support capabilities",
];
const pmsOutcomes = [
  "Progress notes drafted in seconds, not 30+ minutes",
  "Referrals processed and patients onboarded automatically",
  "Medicare & billing compliance built into every workflow",
  "Full audit trail on every patient interaction",
];

/* ─────────────────────────────────────────────────────
   PMS ANIMATED WORKFLOW DEMO
────────────────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  {
    id: "referral",
    label: "Referral received from GP",
    icon: Send,
    role: "Referral — Dr. Nguyen (GP)",
    avatar: "GP",
    avatarColor: "#FCDFC5",
    avatarText: C.text,
    message: "Referral for Sarah Mitchell, 34F. Presenting: anxiety, work-related stress, sleep disruption. Requesting 6 sessions of CBT. Medicare Plan attached. Urgency: routine.",
    meta: "Ref #REF-0391 · Received 8:47 AM",
    tag: "New Referral",
    tagColor: C.accent,
    duration: 2600,
  },
  {
    id: "intake",
    label: "AI Co-pilot processes & matches patient",
    icon: Zap,
    role: "AI Co-pilot",
    avatar: "AI",
    avatarColor: C.accent,
    avatarText: "#fff",
    message: "Referral parsed. Patient record created for Sarah Mitchell. Medicare eligibility confirmed. Matched to Dr. L. Park (CBT specialist, next available: Tue 2 PM). Intake forms dispatched automatically.",
    meta: "Processed in 1.1s · Medicare verified",
    tag: "Processing",
    tagColor: "#F0E193",
    duration: 2800,
  },
  {
    id: "appointment",
    label: "Appointment booked & patient notified",
    icon: Bell,
    role: "Notification sent",
    avatar: "SMS",
    avatarColor: "#F0E193",
    avatarText: C.text,
    message: "\"Hi Sarah, your appointment with Dr. Park has been booked for Tuesday 14 Oct at 2:00 PM. Please complete your intake form using the link below before your session. Reply CONFIRM to accept.\"",
    meta: "SMS + Email · Delivered 8:48 AM",
    tag: "Patient Notified",
    tagColor: "#059669",
    duration: 2600,
  },
  {
    id: "notes",
    label: "Progress note drafted after session",
    icon: FileText,
    role: "AI Co-pilot — Post-session",
    avatar: "AI",
    avatarColor: C.accent,
    avatarText: "#fff",
    message: "Session note drafted: 'S: Patient reports improved sleep (6–7h). O: Engaged, affect euthymic. A: Moderate anxiety, responding to CBT. P: Continue relaxation protocol, review in 2 weeks.' Awaiting clinician review.",
    meta: "Session #2 · Note ready for sign-off",
    tag: "Draft Ready",
    tagColor: C.text,
    duration: 2800,
  },
  {
    id: "report",
    label: "Report sent to referring practitioner",
    icon: BarChart3,
    role: "Report dispatched",
    avatar: "✓",
    avatarColor: "#059669",
    avatarText: "#fff",
    message: "Progress report auto-generated and sent to Dr. Nguyen (GP). Sessions completed: 4/6. Outcome: measurable improvement across PHQ-9 and GAD-7. Compliance record filed. Medicare claim submitted.",
    meta: "Report delivered · Claim lodged",
    tag: "Complete",
    tagColor: "#059669",
    duration: 2800,
  },
];

function PmsWorkflowDemo() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typed, setTyped] = useState("");
  const [showTag, setShowTag] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStep = WORKFLOW_STEPS[step];

  /* Typewriter effect */
  useEffect(() => {
    setTyped("");
    setShowTag(false);
    let i = 0;
    const msg = currentStep.message;
    const speed = 18;
    function tick() {
      if (i <= msg.length) {
        setTyped(msg.slice(0, i));
        i++;
        typeRef.current = setTimeout(tick, speed);
      } else {
        setShowTag(true);
      }
    }
    tick();
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [step]);

  /* Auto-advance */
  useEffect(() => {
    if (!isPlaying) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStep((s) => (s + 1) % WORKFLOW_STEPS.length);
    }, currentStep.duration + 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [step, isPlaying, currentStep.duration]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}`, boxShadow: `0 20px 60px rgba(92,14,20,0.10)` }}>

      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: C.soft, borderBottom: `1px solid ${C.border}` }}>
        <div className="flex gap-1.5">
          {["#fca5a5","#fde68a","#6ee7b7"].map((cc) => (
            <div key={cc} className="w-3 h-3 rounded-full" style={{ backgroundColor: cc }} />
          ))}
        </div>
        <div className="flex-1 px-3 py-1 text-[11px] font-mono text-center"
          style={{ backgroundColor: C.bg, color: C.muted, border: `1px solid ${C.border}`, maxWidth: 280, margin: "0 auto" }}>
          pms.ctech.ai / practice
        </div>
        {/* Play/pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="text-[10px] font-mono tracking-wider px-3 py-1 transition-colors"
          style={{ color: isPlaying ? C.accent : C.muted, border: `1px solid ${C.border}`, backgroundColor: C.bg }}
        >
          {isPlaying ? "⏸ LIVE" : "▶ PLAY"}
        </button>
      </div>

      {/* Sidebar + main */}
      <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[220px_1fr]" style={{ minHeight: 460, backgroundColor: C.bg }}>

        {/* Sidebar — step list */}
        <div className="py-4" style={{ backgroundColor: C.soft, borderRight: `1px solid ${C.border}` }}>
          <p className="px-4 text-[9px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: C.muted }}>
            Practice Manager
          </p>
          {WORKFLOW_STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone   = i < step;
            return (
              <button key={s.id}
                onClick={() => { setStep(i); setIsPlaying(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all duration-200"
                style={{
                  backgroundColor: isActive ? C.peach : "transparent",
                  borderLeft: isActive ? `2px solid ${C.accent}` : "2px solid transparent",
                }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: isDone ? "#059669" : isActive ? C.accent : C.border }}>
                  {isDone
                    ? <CheckCircle2 className="w-3 h-3 text-white" />
                    : <Icon className="w-3 h-3" style={{ color: isActive ? "white" : C.muted }} />
                  }
                </div>
                <span className="text-[11px] font-medium leading-tight" style={{ color: isActive ? C.text : C.muted }}>
                  {s.label}
                </span>
              </button>
            );
          })}

          {/* Progress bar */}
          <div className="mx-4 mt-5 h-1 rounded-full" style={{ backgroundColor: C.border }}>
            <motion.div className="h-1 rounded-full"
              style={{ backgroundColor: C.accent }}
              animate={{ width: `${((step + 1) / WORKFLOW_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="px-4 mt-1.5 text-[9px]" style={{ color: C.muted }}>
            Step {step + 1} of {WORKFLOW_STEPS.length}
          </p>
        </div>

        {/* Main panel */}
        <div className="flex flex-col p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-xs font-semibold" style={{ color: C.text }}>Allied Health Practice · 3 Practitioners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#059669" }} />
              <span className="text-[10px] font-mono" style={{ color: C.muted }}>LIVE</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: "New referrals",   val: "4",  hi: C.accent  },
              { label: "Active patients", val: "38", hi: C.text    },
              { label: "Notes drafted",   val: "11", hi: "#059669" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 text-center" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                <p className="text-xl font-black" style={{ color: m.hi }}>{m.val}</p>
                <p className="text-[9px]" style={{ color: C.muted }}>{m.label}</p>
              </div>
            ))}
          </div>

          {/* Animated chat/message card */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl p-5"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.soft }}
              >
                {/* Role header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black shrink-0"
                    style={{ backgroundColor: currentStep.avatarColor, color: currentStep.avatarText }}>
                    {currentStep.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: C.text }}>{currentStep.role}</p>
                    <p className="text-[10px]" style={{ color: C.muted }}>{currentStep.meta}</p>
                  </div>
                  <AnimatePresence>
                    {showTag && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                        className="ml-auto text-[9px] font-bold uppercase tracking-wider px-2 py-0.5"
                        style={{ backgroundColor: currentStep.tagColor + "20", color: currentStep.tagColor, border: `1px solid ${currentStep.tagColor}40` }}
                      >
                        {currentStep.tag}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Typewriter message */}
                <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "inherit", minHeight: 60 }}>
                  {typed}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{ display: "inline-block", width: 2, height: "1em", backgroundColor: C.accent, marginLeft: 2, verticalAlign: "text-bottom" }}
                  />
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step navigation dots */}
            <div className="flex justify-center gap-2 mt-5">
              {WORKFLOW_STEPS.map((_, i) => (
                <button key={i} onClick={() => { setStep(i); setIsPlaying(false); }}>
                  <motion.div
                    animate={{ width: i === step ? 20 : 6, backgroundColor: i === step ? C.accent : C.border }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────── */
export default function Platforms() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: `linear-gradient(to bottom, ${C.soft}, ${C.bg})` }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg, color: C.muted }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.accent }} />
                Our Platforms
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6" style={{ color: C.text }}>
                Platforms built for<br />
                <span className="text-gradient">complex realities.</span>
              </h1>
              <p className="text-xl max-w-xl leading-relaxed" style={{ color: C.muted }}>
                Three flagship products, each built from the ground up for industries that can't afford generalised tooling.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PLATFORM 01 — AI Admin Co-Pilot
      ══════════════════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-center gap-4 mb-16"
          >
            <span className="text-5xl font-bold tabular-nums" style={{ color: C.border }}>01</span>
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: C.peach, color: C.text, border: `1px solid ${C.border}` }}>
              Healthcare & Allied Health
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: C.text }}>
                AI Admin Co-Pilot
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
                An AI-powered administrative co-pilot built specifically for healthcare and allied health teams. It acts as an invisible assistant, seamlessly handling the massive documentation burden that pulls practitioners away from their clients.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: `${C.text}55` }}>
                Core Capabilities
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: FileText,     text: "Automated clinical documentation and session summaries." },
                  { icon: MessageSquare,text: "Intelligent communication workflows and follow-up generation." },
                  { icon: BarChart3,    text: "Standardized reporting tailored to specific medical requirements." },
                  { icon: Clock,        text: "Admin task prioritization and scheduling automation." },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: C.peach, border: `1px solid ${C.border}` }}>
                      <item.icon className="w-4 h-4" style={{ color: C.accent }} />
                    </div>
                    <p className="leading-relaxed pt-1.5" style={{ color: C.muted }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/contact">
                <motion.div whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 font-semibold cursor-pointer"
                  style={{ color: C.accent }}>
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6">
              <div className="relative overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=80"
                  alt="AI Admin Co-Pilot"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(92,14,20,0.2), transparent)" }} />
              </div>
              <div className="p-8" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.muted }}>
                  Key Outcomes
                </p>
                <ul className="space-y-3">
                  {adminOutcomes.map((o, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C.accent }} />
                      <span className="text-sm font-medium" style={{ color: C.text }}>{o}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLATFORM 02 — Tax Exposure Analytics
      ══════════════════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-center gap-4 mb-16"
          >
            <span className="text-5xl font-bold tabular-nums" style={{ color: C.border }}>02</span>
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: C.soft, color: C.muted, border: `1px solid ${C.border}` }}>
              Financial Services & Tax Advisory
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1">
              <div className="relative overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80"
                  alt="Tax Exposure Analytics Platform"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(92,14,20,0.2), transparent)" }} />
              </div>
              <div className="p-8" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.muted }}>
                  Key Outcomes
                </p>
                <ul className="space-y-3">
                  {taxOutcomes.map((o, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C.accent }} />
                      <span className="text-sm font-medium" style={{ color: C.text }}>{o}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: C.text }}>
                Tax Exposure Analytics
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
                A proactive tax risk and exposure platform for large organisations and advisory firms. By continuously analyzing massive datasets, it transforms raw transaction data into clear, auditable insights — before exposure becomes liability.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: `${C.text}55` }}>
                Core Capabilities
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: ShieldAlert, text: "Early identification of compliance risks and anomalies." },
                  { icon: Activity,    text: "Deep analysis of complex financial and transaction data." },
                  { icon: FileText,    text: "Generation of clear insights for proactive tax management." },
                  { icon: BarChart3,   text: "Automated reporting for faster advisory turnaround." },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                      <item.icon className="w-4 h-4" style={{ color: C.muted }} />
                    </div>
                    <p className="leading-relaxed pt-1.5" style={{ color: C.muted }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/contact">
                <motion.div whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 font-semibold cursor-pointer"
                  style={{ color: C.accent }}>
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PLATFORM 03 — PMS Co-Pilot  ★ NEW ★
      ══════════════════════════════════════════ */}
      <section className="py-24 overflow-hidden" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Label row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="flex items-center gap-4 mb-16"
          >
            <span className="text-5xl font-bold tabular-nums" style={{ color: C.border }}>03</span>
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: C.accent, color: "white" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              MVP · Now Live
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Content */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono tracking-widest uppercase"
                style={{ color: C.accent }}>
                <Home className="w-3.5 h-3.5" /> CCTech PMS Co-Pilot
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: C.text }}>
                Practice Management<br />AI Co-Pilot
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
                An intelligent co-pilot built for allied health professionals — psychologists, physiotherapists, OTs, speech pathologists, and more. It automates the full patient lifecycle: referral intake, scheduling, progress notes, reporting, and Medicare compliance — so practitioners focus on clients, not admin.
              </p>

              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: `${C.text}55` }}>
                Core Capabilities
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: Send,          text: "Automated referral intake — parsed, prioritised, and matched to the right practitioner instantly." },
                  { icon: User,          text: "Patient onboarding with intake forms, Medicare verification, and record creation — hands-free." },
                  { icon: FileText,      text: "AI-drafted progress notes using SOAP format, ready for clinician review and sign-off." },
                  { icon: BarChart3,     text: "Automated outcome reports dispatched to referring practitioners and insurers." },
                  { icon: ShieldAlert,   text: "Medicare, NDIS, and private health billing compliance built into every interaction." },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: C.peach, border: `1px solid ${C.border}` }}>
                      <item.icon className="w-4 h-4" style={{ color: C.accent }} />
                    </div>
                    <p className="leading-relaxed pt-1.5" style={{ color: C.muted }}>{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="p-6 mb-10" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.muted }}>
                  Key Outcomes
                </p>
                <ul className="space-y-3">
                  {pmsOutcomes.map((o, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C.accent }} />
                      <span className="text-sm font-medium" style={{ color: C.text }}>{o}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Link href="/contact">
                <motion.div whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 font-semibold cursor-pointer"
                  style={{ color: C.accent }}>
                  Request a demo <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            {/* Right: Animated workflow demo */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>

              {/* "Demo video" label */}
              <div className="flex items-center gap-2 mb-4">
                <motion.div className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: C.accent }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: C.muted }}>
                  Practice Workflow — Live Demo
                </span>
              </div>

              <PmsWorkflowDemo />

              <p className="text-xs text-center mt-4" style={{ color: C.muted }}>
                Click any step or use ⏸ to pause. Demo runs on real MVP workflow data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: C.dark }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 50%, ${C.accent}18, transparent 70%)` }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: C.peach }}>
              See our platforms in action
            </h2>
            <p className="text-lg" style={{ color: `${C.peach}70` }}>
              Request a personalized demonstration tailored to your workflows.
            </p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 h-14 px-8 font-semibold transition-colors"
              style={{ backgroundColor: C.accent, color: "white" }}
            >
              Request a Demo
            </motion.button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
