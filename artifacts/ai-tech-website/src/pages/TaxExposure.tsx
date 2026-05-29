import React, { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle,
  Coins, Landmark, Receipt, BarChart3, ShieldAlert, FileText,
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
const whoFor = [
  {
    icon: "🧑‍💼",
    title: "Independent NDIS Workers",
    desc: "Unregistered or ABN support workers unsure if they owe income tax, need to register for GST, or are missing superannuation contributions.",
  },
  {
    icon: "🏢",
    title: "NDIS Support Businesses",
    desc: "Small businesses paying workers as contractors without realising they may have PAYG withholding, superannuation guarantee, or payroll tax obligations.",
  },
  {
    icon: "📋",
    title: "Platform Workers (Mable, Kynd)",
    desc: "Gig workers on disability platforms who earn above the GST threshold or don't realise they've become deemed employees for tax purposes.",
  },
];

const checks = [
  { icon: Coins,       title: "Income Tax Exposure",       desc: "Calculates likely income tax liability based on annual earnings, including Medicare Levy." },
  { icon: Landmark,    title: "Superannuation Guarantee",  desc: "Determines whether the business hiring you is legally required to pay superannuation on your behalf, even on an ABN." },
  { icon: Receipt,     title: "GST Registration Threshold",desc: "Checks whether gross income exceeds $75,000 AUD and flags GST registration obligations." },
  { icon: BarChart3,   title: "PAYG Withholding Risk",     desc: "Assesses whether working arrangements meet the ATO's definition of employee vs genuine contractor." },
  { icon: ShieldAlert, title: "Sham Contracting Exposure", desc: "Identifies red flags that could trigger an ATO sham contracting audit — for workers and businesses." },
  { icon: FileText,    title: "ATO Reporting Obligations", desc: "Maps obligations: BAS lodgement, tax return deadlines, and TPAR if applicable." },
];

/* ─── Calculator logic ─── */
const INCOME_BANDS = [
  { value: "u18200",     label: "Under $18,200",        rep: 15000  },
  { value: "18201_45k",  label: "$18,201 – $45,000",    rep: 35000  },
  { value: "45k_75k",    label: "$45,001 – $75,000",    rep: 60000  },
  { value: "75k_120k",   label: "$75,001 – $120,000",   rep: 95000  },
  { value: "over120k",   label: "Over $120,000",        rep: 145000 },
];

/* ATO 2024-25 resident rates + 2% Medicare Levy */
function estimateIncomeTax(income: number): number {
  let tax = 0;
  if (income <= 18200) tax = 0;
  else if (income <= 45000) tax = (income - 18200) * 0.16;
  else if (income <= 135000) tax = 4288 + (income - 45000) * 0.30;
  else if (income <= 190000) tax = 31288 + (income - 135000) * 0.37;
  else tax = 51638 + (income - 190000) * 0.45;
  const medicare = income > 24276 ? income * 0.02 : 0;
  return Math.round(tax + medicare);
}

const fmt = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

export default function TaxExposure() {
  const calcRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [worktype, setWorktype] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [lodges, setLodges] = useState<boolean | null>(null);
  const [gst, setGst] = useState<boolean | null>(null);

  const scrollToCalc = () =>
    calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const results = useMemo(() => {
    const band = INCOME_BANDS.find((b) => b.value === income);
    const rep = band?.rep ?? 0;
    const incomeTax = estimateIncomeTax(rep);

    /* GST only applies to self-employed turnover (ABN holders / businesses),
       not to employees earning wages. */
    const gstApplicable = worktype === "contractor" || worktype === "business";
    const overGst = gstApplicable && rep > 75000;

    let gstResult: { warn: boolean; text: string };
    if (!gstApplicable) {
      gstResult = { warn: false, text: "✅ Not applicable to employee wages" };
    } else if (rep > 75000) {
      gstResult = { warn: true, text: "⚠️ You may need to register for GST" };
    } else {
      gstResult = { warn: false, text: "✅ Below the $75,000 GST threshold" };
    }

    let superResult: { warn: boolean; text: string };
    if (worktype === "contractor") {
      superResult = { warn: true, text: "⚠️ The business hiring you may owe you super" };
    } else if (worktype === "business") {
      superResult = { warn: true, text: "⚠️ You may owe super guarantee to your workers" };
    } else {
      superResult = { warn: false, text: "✅ Your employer pays your super" };
    }

    /* Risk scoring */
    let score = 0;
    if (lodges === false) score += 2;
    if (overGst && gst === false) score += 2;
    if (worktype === "contractor") score += 1;
    if (worktype === "business") score += 1;
    if (income === "over120k") score += 1;

    const risk =
      score >= 4 ? { level: "HIGH",   warn: true }
      : score >= 2 ? { level: "MEDIUM", warn: true }
      : { level: "LOW", warn: false };

    return { incomeTax, gstResult, superResult, risk };
  }, [worktype, income, lodges, gst]);

  const step3Ready = lodges !== null && gst !== null;

  const ProgressDots = () => (
    <div className="flex items-center gap-2 mb-8">
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: n === step ? 28 : 10,
            backgroundColor: n <= step ? C.accent : C.border,
          }} />
      ))}
    </div>
  );

  return (
    <Layout>
      {/* ═══════════ BANNER ═══════════ */}
      <section className="pt-36 pb-20 px-6 sm:px-10 lg:px-20"
        style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.soft }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-6" style={{ color: C.muted }}>
              Product 02 — Tax Exposure Platform
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-black tracking-tight mb-7"
              style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", lineHeight: 1.05, color: C.text }}>
              Know your ATO exposure before it becomes a debt.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: C.muted }}>
              Australia's NDIS workforce is one of the fastest-growing gig economy segments — and one of
              the most undertaxed. Our platform helps unregistered NDIS workers, ABN holders, and disability
              support businesses instantly assess their tax obligations, superannuation exposure, and GST position.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <button onClick={scrollToCalc}
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 transition-all duration-200"
              style={{ backgroundColor: C.accent, color: "white" }}>
              Try the Tool <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ WHO IT'S FOR ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-12" style={{ color: C.muted }}>
              Who it's for
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoFor.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="h-full p-8" style={{ backgroundColor: C.soft, border: `1px solid ${C.border}` }}>
                  <div className="text-3xl mb-5">{w.icon}</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: C.text }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT IT CHECKS ═══════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-20" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase mb-3" style={{ color: C.muted }}>
              What it checks
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black tracking-tight mb-14"
              style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.text }}>
              Six exposures, mapped in seconds.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: C.border, border: `1px solid ${C.border}` }}>
            {checks.map((c, i) => (
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

      {/* ═══════════ CALCULATOR ═══════════ */}
      <section ref={calcRef} className="py-24 px-6 sm:px-10 lg:px-20" style={{ backgroundColor: C.soft }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-black tracking-tight mb-3"
                style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.text }}>
                Quick Tax Exposure Check
              </h2>
              <p className="text-base" style={{ color: C.muted }}>
                Answer 4 questions. Get your exposure summary.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-8 sm:p-10" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
              <ProgressDots />

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-2" style={{ color: C.muted }}>Step 1 of 4</p>
                  <h3 className="text-xl font-bold mb-6" style={{ color: C.text }}>How do you work?</h3>
                  <div className="space-y-3">
                    {[
                      { v: "contractor", l: "I'm an independent contractor (ABN holder)" },
                      { v: "employee",   l: "I work for a business (employee or casual)" },
                      { v: "business",   l: "I run a disability support business and hire workers" },
                    ].map((o) => (
                      <button key={o.v} onClick={() => setWorktype(o.v)}
                        className="w-full text-left px-5 py-4 text-sm font-medium transition-all duration-150"
                        style={{
                          border: `1px solid ${worktype === o.v ? C.accent : C.border}`,
                          backgroundColor: worktype === o.v ? C.soft : C.bg,
                          color: C.text,
                        }}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-8">
                    <button disabled={!worktype} onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 transition-all duration-200"
                      style={{ backgroundColor: worktype ? C.accent : C.border, color: "white", cursor: worktype ? "pointer" : "not-allowed" }}>
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-2" style={{ color: C.muted }}>Step 2 of 4</p>
                  <h3 className="text-xl font-bold mb-6" style={{ color: C.text }}>What is your estimated annual income from NDIS work?</h3>
                  <div className="space-y-3">
                    {INCOME_BANDS.map((o) => (
                      <button key={o.value} onClick={() => setIncome(o.value)}
                        className="w-full text-left px-5 py-4 text-sm font-medium transition-all duration-150"
                        style={{
                          border: `1px solid ${income === o.value ? C.accent : C.border}`,
                          backgroundColor: income === o.value ? C.soft : C.bg,
                          color: C.text,
                        }}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <button onClick={() => setStep(1)}
                      className="text-sm font-medium px-6 py-3 transition-colors"
                      style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}>
                      Back
                    </button>
                    <button disabled={!income} onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 transition-all duration-200"
                      style={{ backgroundColor: income ? C.accent : C.border, color: "white", cursor: income ? "pointer" : "not-allowed" }}>
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-2" style={{ color: C.muted }}>Step 3 of 4</p>
                  <h3 className="text-xl font-bold mb-6" style={{ color: C.text }}>Do you currently meet these obligations?</h3>
                  <div className="space-y-5">
                    {[
                      { label: "I lodge an annual tax return", val: lodges, set: setLodges },
                      { label: "I am registered for GST",       val: gst,    set: setGst },
                    ].map((t) => (
                      <div key={t.label} className="flex items-center justify-between gap-4 py-3"
                        style={{ borderBottom: `1px solid ${C.border}` }}>
                        <span className="text-sm font-medium" style={{ color: C.text }}>{t.label}</span>
                        <div className="flex gap-2 shrink-0">
                          {[{ b: true, l: "Yes" }, { b: false, l: "No" }].map((opt) => (
                            <button key={opt.l} onClick={() => t.set(opt.b)}
                              className="px-5 py-2 text-sm font-semibold transition-all duration-150"
                              style={{
                                border: `1px solid ${t.val === opt.b ? C.accent : C.border}`,
                                backgroundColor: t.val === opt.b ? C.accent : C.bg,
                                color: t.val === opt.b ? "white" : C.muted,
                              }}>
                              {opt.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <button onClick={() => setStep(2)}
                      className="text-sm font-medium px-6 py-3 transition-colors"
                      style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}>
                      Back
                    </button>
                    <button disabled={!step3Ready} onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 transition-all duration-200"
                      style={{ backgroundColor: step3Ready ? C.accent : C.border, color: "white", cursor: step3Ready ? "pointer" : "not-allowed" }}>
                      See results <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 — RESULTS */}
              {step === 4 && (
                <div>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-2" style={{ color: C.muted }}>Your exposure summary</p>
                  <h3 className="text-xl font-bold mb-6" style={{ color: C.text }}>Here's where you stand</h3>

                  <div className="space-y-3">
                    <ResultRow label="Income Tax" value={`~ ${fmt(results.incomeTax)} / yr`} warn={false} sub="Indicative, ATO 2024-25 tables incl. Medicare Levy" />
                    <ResultRow label="GST" value={results.gstResult.text} warn={results.gstResult.warn} />
                    <ResultRow label="Superannuation" value={results.superResult.text} warn={results.superResult.warn} />
                    <ResultRow label="ATO Risk Level" value={results.risk.level} warn={results.risk.warn} emphasise />
                  </div>

                  <p className="text-xs leading-relaxed mt-6" style={{ color: C.muted }}>
                    These results are indicative only and do not constitute tax advice. Consult a registered tax agent.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link href="/contact">
                      <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 cursor-pointer transition-all duration-200 w-full sm:w-auto"
                        style={{ backgroundColor: C.accent, color: "white" }}>
                        Join the Waitlist <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <button onClick={() => { setStep(1); setWorktype(""); setIncome(""); setLodges(null); setGst(null); }}
                      className="text-sm font-medium px-6 py-3.5 transition-colors"
                      style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}>
                      Start over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

function ResultRow({ label, value, warn, sub, emphasise }: {
  label: string; value: string; warn: boolean; sub?: string; emphasise?: boolean;
}) {
  const C2 = { text: "#5C0E14", muted: "#9B4A52", accent: "#E84F5E", border: "#F0D5CC", soft: "#FEF7F3", green: "#2F8F5B" };
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4"
      style={{ border: `1px solid ${C2.border}`, backgroundColor: emphasise ? C2.soft : "#FFFFFF" }}>
      <div>
        <p className="text-[11px] font-mono tracking-widest uppercase" style={{ color: C2.muted }}>{label}</p>
        {sub && <p className="text-[11px] mt-1" style={{ color: C2.muted }}>{sub}</p>}
      </div>
      <div className="flex items-center gap-2 text-right shrink-0">
        {warn
          ? <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: C2.accent }} />
          : <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C2.green }} />}
        <span className="text-sm font-bold" style={{ color: warn ? C2.accent : C2.text }}>{value}</span>
      </div>
    </div>
  );
}
