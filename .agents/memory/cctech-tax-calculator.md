---
name: CC Tech tax exposure calculator
description: Domain-logic constraints for the Tax Exposure calculator in the cctech-australia artifact
---

# Tax Exposure calculator — domain logic

The calculator (`artifacts/cctech-australia/script.js`, `renderResults`) takes worktype (contractor/employee/business), income band, and lodges/gst toggles, then outputs Income Tax, GST, Superannuation, and an ATO Risk badge.

**Rule: GST guidance and GST-based risk must be gated by worktype.**
- Employees (wage/salary earners) do NOT register for GST on employment income — show the OK/green GST message regardless of income band, and exclude the GST factor from risk scoring.
- Only contractors/businesses get the "$75,000 threshold" GST warning.

**Why:** A code review caught the calculator telling employees over $75k they "may need to register for GST" and inflating their ATO risk to HIGH — materially incorrect tax guidance for one of the three core personas. GST applicability is a function of how you work, not just how much you earn.

**How to apply:** Any change to GST messaging or risk scoring must keep the `worktype === "employee"` exemption. Re-test all permutations (employee/contractor/business × income bands × lodge/gst toggles) after edits. Tax figures use ATO 2024-25 resident rates as deliberate approximations; the disclaimer "These results are indicative only and do not constitute tax advice. Consult a registered tax agent." must remain present.
