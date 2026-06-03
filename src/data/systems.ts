export type SystemType = "novel" | "built";
export type ClusterId =
  | "forms"
  | "leadgen"
  | "seo"
  | "ops"
  | "desktop"
  | "platform"
  | "design";

export interface BuiltSystem {
  id: string;
  name: string;
  cluster: ClusterId;
  built: string;
  market: string[];
  price: string;
  type: SystemType;
  greenTechnique?: string;
}

export const systems: BuiltSystem[] = [
  // ── AI Forms & Pricing (forms) ──
  {
    id: "quickstart",
    name: "Quickstart",
    cluster: "forms",
    built:
      "URL → AI niche → parametrically-priced multilingual quote form + real PDF, preview-before-signup, harvested to a catalog",
    market: ["Fillout AI", "PandaDoc", "Salesforce CPQ"],
    price: "$35–65/mo",
    type: "novel",
  },
  {
    id: "pricing-dsl",
    name: "Pricing DSL",
    cluster: "forms",
    built:
      "Declarative parametric pricing engine (~10 primitives) computed identically client + server",
    market: ["PandaDoc CPQ", "Salesforce CPQ"],
    price: "$35–65/mo",
    type: "novel",
  },
  {
    id: "anon-priced-pdf-demo",
    name: "Anonymous priced-PDF demo",
    cluster: "forms",
    built:
      "Real product form + real mPDF quote with no signup; back-solves a believable cost breakdown from one price",
    market: [],
    price: "—",
    type: "novel",
  },
  {
    id: "no-code-pipeline",
    name: "No-code form pipeline",
    cluster: "forms",
    built:
      "Request → publication builder that emits real deployable PHP (not hosted/interpreted)",
    market: ["Typeform", "JotForm", "Tally"],
    price: "$25–99/mo",
    type: "built",
  },
  {
    id: "ipdf",
    name: "iPDF copilot",
    cluster: "forms",
    built:
      "Embedded AI assistant across 5 surfaces — chatbot, wizard, copilot, form editor, funnel bot",
    market: ["Intercom Fin", "Ada", "Chatbase"],
    price: "~$0.99/resolution",
    type: "built",
    greenTechnique:
      "Money-guarded conversational form editor — price edits gated by a confirm widget",
  },
  {
    id: "ai-forms-approval",
    name: "AI Forms Approval",
    cluster: "forms",
    built:
      "Human-in-the-loop queue curating AI-generated forms into the catalog",
    market: ["Scale", "Surge"],
    price: "enterprise",
    type: "built",
  },

  // ── Lead-gen & Outreach (leadgen) ──
  {
    id: "lead-engine",
    name: "Lead Engine",
    cluster: "leadgen",
    built:
      "End-to-end cold outreach: AI discovery → crawl → extract → 160-line validator → AI email → deliverability → IMAP replies",
    market: ["Apollo", "Hunter.io", "Clay", "Instantly", "Lemlist"],
    price: "$49–99+/mo",
    type: "built",
    greenTechnique:
      "AI reply grounded in the lead's own form schema",
  },
  {
    id: "cold-email-v2",
    name: "Cold Email v2",
    cluster: "leadgen",
    built:
      "Next-gen engine: automatic SMTP warm-up + account testing (DNS/RBL/Postmark) + multilingual reply categorizer",
    market: ["Instantly", "Smartlead"],
    price: "$37–99/mo",
    type: "built",
  },
  {
    id: "outreach-center",
    name: "Outreach Center",
    cluster: "leadgen",
    built:
      "AI reply + sales-engagement command center (6 sub-tabs, follow-up queue, email-health)",
    market: ["Reply.io", "Salesloft", "Front"],
    price: "$59–130/seat/mo",
    type: "built",
  },
  {
    id: "scrapix",
    name: "Scrapix",
    cluster: "leadgen",
    built:
      "Standalone lead-gen + outreach web app, deployed — sibling of Lead Engine",
    market: ["Apollo", "Instantly", "Lemlist"],
    price: "$49–99/mo",
    type: "built",
  },

  // ── SEO · Analytics · Security (seo) ──
  {
    id: "programmatic-seo",
    name: "Programmatic SEO engine",
    cluster: "seo",
    built:
      "~1,800 pages auto-built & self-rebuilding from the live product catalog (5 intent layers × 60 niches × 6 langs)",
    market: [],
    price: "—",
    type: "novel",
  },
  {
    id: "seo-audit",
    name: "SEO Audit",
    cluster: "seo",
    built:
      "2-engine SEO auditor; strong on hreflang / i18n parity / schema",
    market: ["Screaming Frog", "Ahrefs", "Semrush"],
    price: "$129+/mo",
    type: "built",
  },
  {
    id: "trafic",
    name: "Trafic analytics",
    cluster: "seo",
    built:
      "Cookieless privacy analytics (salted IP hash)",
    market: ["Plausible", "Fathom", "Matomo"],
    price: "$9–15/mo",
    type: "built",
    greenTechnique:
      "Dark-funnel re-identification — beyond what these tools allow",
  },
  {
    id: "security",
    name: "Security (SAST)",
    cluster: "seo",
    built:
      "Regex SAST + active HTTP probes + auto-fix (18 OWASP patterns, weighted score)",
    market: ["Snyk", "SonarQube", "Semgrep"],
    price: "$25+/dev/mo",
    type: "built",
  },

  // ── Business & Growth Ops (ops) ──
  {
    id: "blog",
    name: "Blog / Content CMS",
    cluster: "ops",
    built:
      "AI multilingual press/content CMS, anti-hallucination grounded, strong 6-lang SEO",
    market: ["Jasper", "Copy.ai", "Prowly"],
    price: "$49–258/mo",
    type: "built",
  },
  {
    id: "marketing-hub",
    name: "Marketing Hub",
    cluster: "ops",
    built:
      "AI post-gen → translate 6 langs → auto-publish to Facebook + LinkedIn",
    market: ["Buffer", "Hootsuite", "Ocoya"],
    price: "$6–99/mo",
    type: "built",
  },
  {
    id: "tms",
    name: "Diff-translation (TMS)",
    cluster: "ops",
    built:
      "Incremental translation memory (translate only changed keys) + cross-lang coherence check",
    market: ["Lokalise", "Crowdin", "Weglot"],
    price: "$15–120/mo",
    type: "built",
  },
  {
    id: "billing",
    name: "Billing (Stripe)",
    cluster: "ops",
    built:
      "Full subscription lifecycle on Stripe primitives (plans × regions, 7 webhook events, top-ups)",
    market: ["Stripe Billing", "Chargebee", "Recurly", "Paddle"],
    price: "usage-based",
    type: "built",
  },
  {
    id: "promo",
    name: "Promo engine",
    cluster: "ops",
    built:
      "Coupon/campaign engine: duration tiers, public gift-box, Stripe-coupon bridge",
    market: ["Voucherify", "Talon.One"],
    price: "$300+/mo",
    type: "built",
  },
  {
    id: "clients-grid",
    name: "Clients ops grid",
    cluster: "ops",
    built:
      "Client list/detail, inline pricing/SMTP edit, embed-token regen, plan-grant",
    market: ["HubSpot", "Pipedrive"],
    price: "$20–99/seat/mo",
    type: "built",
  },

  // ── Desktop Products (desktop) ──
  {
    id: "audisity",
    name: "Audisity",
    cluster: "desktop",
    built:
      "Windows desktop file-audit (ZIP/JPG/PST/age) → premium XLSX; offline HMAC licensing, freemium",
    market: ["TreeSize", "WinDirStat", "SpaceSniffer"],
    price: "one-time license",
    type: "built",
  },
  {
    id: "nexus-cockpit",
    name: "Nexus Cockpit",
    cluster: "desktop",
    built:
      "Live-ops terminal dashboard (Python + Textual) — 9-panel grid; a central hook logs every MCP / CLI / Guardian action to SQLite, with live business metrics + search",
    market: ["Grafana", "Datadog", "LangSmith"],
    price: "$0–49/mo",
    type: "built",
  },
  {
    id: "maildesk",
    name: "MailDesk",
    cluster: "desktop",
    built:
      "Internal IT self-service portal — provisions Zimbra email accounts through an RT ticketing flow; in production, used daily by an IT team",
    market: ["ServiceNow", "Jira Service Mgmt", "Freshservice"],
    price: "$20–100/seat/mo",
    type: "built",
  },

  // ── Orchestration Platform (platform) — flagship framework, also a chart row ──
  {
    id: "orchestration-platform",
    name: "Orchestration Platform",
    cluster: "platform",
    built:
      "Self-hosted multi-tenant MCP control plane for AI coding agents: token-authz, scope-jailing, scaffolder, self-building (27 briefs → 26 reports)",
    market: ["Backstage", "Roadie", "Port", "Cortex", "Devin", "LangGraph Platform"],
    price: "$10k–100k/yr",
    type: "novel",
  },
];

/* ── Derived stats (for headline) ── */
export function getStats() {
  const total = systems.length;
  const novel = systems.filter((s) => s.type === "novel").length;

  // Sum illustrative low-end monthly prices where parseable
  const priceRe = /\$(\d[\d,]*)/;
  let monthlySum = 0;
  for (const s of systems) {
    if (s.price.includes("/yr")) continue; // yearly (e.g. the platform) — not a monthly figure
    const m = s.price.match(priceRe);
    if (m) monthlySum += parseInt(m[1].replace(",", ""), 10);
  }

  return { total, novel, monthlySum };
}
