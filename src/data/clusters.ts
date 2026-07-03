import type { SystemType } from "./systems";

export interface DesignPiece {
  name: string;
  blurb: string;
  liveUrl?: string;
  screenshots: string[];
}

export interface ShowcaseUnit {
  id: string;
  kind: "flagship" | "cluster" | "demo";
  image?: string; // carousel card image (placeholder until Paul supplies official)
  title: string;
  tagline: string;
  blurb: string;
  type?: SystemType;
  systemIds?: string[];
  stack?: string[];
  highlights?: string[];
  designPieces?: DesignPiece[];
  screenshots?: string[];
  liveUrl?: string;
}

export const units: ShowcaseUnit[] = [
  /* ── FLAGSHIPS ── */
  {
    id: "instantino",
    kind: "flagship",
    image: "/shot-instantino.jpg",
    title: "Instantino",
    tagline: "B2B SaaS in production — the deep proof.",
    blurb:
      "A full B2B SaaS built solo, end-to-end: turns a business URL into a live, multilingual quote form plus an instant branded PDF offer. Multi-tenant PHP + MySQL, 6 languages, ~1,800 programmatic SEO pages, a conversational form editor, and a parametric pricing engine. Its subsystems populate the clusters below.",
    stack: [
      "PHP 8",
      "MySQL",
      "React",
      "Tailwind",
      "Stripe",
      "mPDF",
      "Claude API",
      "GPT API",
    ],
    highlights: [
      "Quickstart: URL → AI niche detection → full parametrically-priced quote form + real PDF",
      "~1,800 programmatic SEO pages auto-built from the live product catalog",
      "6-language support with incremental translation memory",
      "Conversational form editor with money-guarded price edits",
      "Anonymous priced-PDF demo that back-solves a cost breakdown from one price",
      "Economic-plausibility simulation as an anti-hallucination guard on AI prices",
    ],
    screenshots: ["/shot-instantino.jpg"],
    liveUrl: "https://instantino.ro",
  },
  {
    id: "platform",
    kind: "flagship",
    image: "/shot-platform.jpg",
    title: "Orchestration Platform",
    tagline:
      "Multi-agent AI framework — proven deep and wide.",
    blurb:
      "A self-hosted multi-tenant control plane for AI coding agents: token-based authorization, scope-jailing, project scaffolding, and a self-improving lessons loop. Proven two ways: DEEP (single-project — Instantino, ~17 systems) and WIDE (multi-project / multi-user deployment with per-project scoped tokens). The framework built itself: 27 briefs → 26 structured reports. Its live-ops layer, Nexus Cockpit, monitors the whole stack from a terminal dashboard.",
    type: "novel",
    systemIds: ["orchestration-platform"],
    stack: [
      "PHP 8",
      "MCP (stdio + HTTP)",
      "JSON-RPC 2.0",
      "Claude Code CLI",
      "PowerShell",
      "Python + Textual",
      "SQLite",
    ],
    highlights: [
      "Token-based RBAC: master vs per-project scoped tokens with expiry/revocation",
      "Scope-jailing: project tokens cannot read sibling projects",
      "Project scaffolder: scaffold/integrate/archive with 9 auto-rendered templates",
      "Self-building: 27-brief dependency-ordered build program, 26 completed reports",
      "Dual transport: stdio (local) + HTTP :8090 (JSON-RPC 2.0)",
      "AI-learning loop: detect gotcha → draft lesson → owner approves → auto-injected into every session",
      "Nexus Cockpit — Python/Textual live-ops dashboard (9 panels) logging every MCP / CLI / Guardian call to SQLite",
    ],
    screenshots: ["/shot-platform.jpg"],
  },

  /* ── AI SUPPORT CONSOLE (production Instantino subsystem, standalone-worthy) ── */
  {
    id: "live-console",
    kind: "flagship",
    image: "/shot-live-console1.jpg",
    title: "AI Support Console (iPDF Live)",
    tagline: "Human + AI customer support that learns from every escalation.",
    type: "built",
    blurb:
      "A production AI customer-support console. Live conversations arrive from multiple surfaces (public site, client panel, quick-start); the AI drafts a grounded reply for the human agent, and anything it can't confidently answer is escalated to a person — behind a TOTP-secured login. An Intelligence Center tracks conversations, unique sessions and off-topic rate, and surfaces Knowledge Gaps — the top questions the AI couldn't answer. Agents can teach the correct answer on the spot; it is saved to a RAG store and reused, so the system gets smarter with every escalation. A built-in Test Engine sandbox probes the AI's behavior per source and language before anything ships.",
    stack: ["PHP 8", "MySQL", "vanilla JS", "Claude / GPT API", "RAG", "TOTP 2FA"],
    highlights: [
      "Live multi-source inbox (public site / client panel / quick-start), multilingual, polling-based",
      "AI drafts a grounded reply for the human agent — human-in-the-loop, never autonomous",
      "Escalation to a person for anything the AI can't confidently answer",
      "Intelligence Center: conversations, unique sessions, off-topic rate + Knowledge Gaps (top unanswered)",
      "Self-improving RAG: teach the correct answer once → saved → reused by the AI",
      "Test Engine sandbox to probe AI behavior per source + language before go-live",
      "TOTP-secured agent login",
    ],
    screenshots: ["/shot-live-console1.jpg", "/shot-live-console2.jpg", "/shot-live-console3.jpg", "/shot-live-console4.jpg"],
  },

  /* ── APPLIED AGENTIC AI — deployed live demos ── */
  {
    id: "taktile",
    kind: "demo",
    image: "/shot-taktile.jpg",
    title: "Taktile — AI Enablement Console",
    tagline: "Governed multi-agent AI over a real MCP server.",
    type: "novel",
    blurb:
      "A deployed demo of governed agentic AI: an AI agent wires a company's SaaS stack (Gong, Notion, Linear, HubSpot) into real internal workflows — but the model only proposes; the server decides. Every action runs under a least-privilege scope and is written to an append-only audit trail, so the agent acts across real tools without ever overstepping. Not a website — a working agentic system with a real MCP server and an eval suite, shipped end-to-end to a Linux VPS.",
    stack: ["Python", "Claude (Haiku)", "MCP server", "FastAPI", "evals", "Linux VPS"],
    highlights: [
      "The model proposes, the server decides — server-side least-privilege enforcement on every tool call",
      "Append-only audit trail: timestamp, request id, actor, model, tool, scope, decision",
      "Real MCP server (tools/list + tools/call) — plugs straight into Claude Desktop",
      "Eval suite asserting the governance invariants (a denied action never executes)",
      "Grounding post-check flags any id not traced to an allowed tool result",
      "Shipped end-to-end: systemd, Apache reverse proxy, HTTPS, rate-limiting",
    ],
    liveUrl: "https://taktile.instantino-saas.eu/",
    screenshots: ["/shot-taktile.jpg"],
  },
  {
    id: "netex",
    kind: "demo",
    image: "/shot-netex.jpg",
    title: "Netex — AI Front-Line Triage",
    tagline: "Grounded multilingual triage — the model classifies, the server decides.",
    type: "novel",
    blurb:
      "A deployed AI front-line for inbound customer messages: it detects the language, classifies intent / urgency / sentiment, drafts a reply grounded strictly in a knowledge base, and decides — by a deterministic, server-side rule engine — whether to auto-reply or escalate to a human. Prompt-injection is detected and blocked server-side, structured JSON outputs are schema-enforced, and QA checks guard every draft. Not a website — a working AI system where a business decision never rests on the model alone.",
    stack: ["PHP 8", "gpt-5-nano", "structured outputs", "rule engine", "KB grounding"],
    highlights: [
      "Deterministic server-side escalation rules — the model classifies, the server decides",
      "Grounded strictly in a knowledge base; if the answer isn't there, it escalates instead of guessing",
      "Prompt-injection detected and blocked server-side (not left to the model)",
      "Schema-enforced structured JSON outputs with a json_object fallback",
      "Binary QA checks + language-match guard on every draft",
      "Multilingual + multichannel (Webchat / WhatsApp / Facebook / Voice / Email)",
    ],
    liveUrl: "https://netex.instantino-app.eu/",
    screenshots: ["/shot-netex.jpg"],
  },

  /* ── CLUSTERS ── */
  {
    id: "forms",
    kind: "cluster",
    image: "/shot-forms.jpg",
    title: "AI Forms & Pricing",
    tagline:
      "From URL to priced PDF — the original product chain.",
    blurb:
      "The novel core of Instantino: an AI-driven pipeline that takes a business URL, detects its niche, generates a parametrically-priced multilingual form, and produces a real branded PDF quote — with preview-before-signup and human-in-the-loop approval. Includes a declarative pricing DSL, a no-code form pipeline that emits real PHP, and an embedded AI copilot with a money-guarded editor.",
    type: "novel",
    systemIds: [
      "quickstart",
      "pricing-dsl",
      "anon-priced-pdf-demo",
      "no-code-pipeline",
      "ipdf",
      "ai-forms-approval",
    ],
    stack: ["PHP 8", "Claude API", "GPT API", "mPDF", "Tailwind"],
    highlights: [
      "URL → AI niche → parametric pricing model → multilingual form → real PDF",
      "Economic-plausibility simulation guards AI-suggested prices",
      "Quality-driven model escalation: validator triggers Sonnet → Opus",
      "Money-guarded conversational form editor (confirm widget on price edits)",
      "No-code pipeline emits real deployable PHP, not hosted/interpreted",
      "Human-in-the-loop queue curates AI-generated forms into the catalog",
    ],
    screenshots: ["/shot-forms.jpg"],
  },
  {
    id: "leadgen",
    kind: "cluster",
    image: "/shot-leadgen.jpg",
    title: "Lead-gen & Outreach",
    tagline: "Built 4 times, each more sophisticated.",
    blurb:
      "Four progressively more advanced lead-generation and cold-outreach systems: from AI discovery and email generation to automatic SMTP warm-up, a sales-engagement command center, and a standalone deployed web app. Each iteration refined deliverability engineering, reply handling, and AI personalization.",
    systemIds: [
      "lead-engine",
      "cold-email-v2",
      "outreach-center",
      "scrapix",
    ],
    stack: [
      "PHP 8",
      "MySQL",
      "SMTP",
      "IMAP",
      "Serper API",
      "GPT API",
      "Chart.js",
    ],
    highlights: [
      "AI discovery → crawl → extract → validate → AI email → SMTP → IMAP monitoring",
      "160-line email validator + RFC-8058 one-click unsubscribe",
      "Automatic SMTP warm-up + account testing (DNS/RBL/Postmark)",
      "AI reply grounded in the lead's own form schema",
      "Sales-engagement command center: 6 sub-tabs, follow-up queue, email-health",
      "~11k leads discovered, ~8.6k emails sent across iterations",
    ],
    screenshots: ["/shot-leadgen.jpg"],
  },
  {
    id: "seo",
    kind: "cluster",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    title: "SEO · Analytics · Security",
    tagline:
      "Privacy analytics, programmatic SEO, and security — all built from scratch.",
    blurb:
      "A suite covering visibility and safety: a programmatic SEO engine that auto-builds ~1,800 pages from the live product catalog, a 2-engine SEO auditor strong on hreflang/i18n/schema, cookieless privacy analytics with dark-funnel re-identification, and a regex-based security SAST scanner with auto-fix.",
    systemIds: ["programmatic-seo", "seo-audit", "trafic", "security"],
    stack: ["PHP 8", "MySQL", "GPT API", "geo-IP"],
    highlights: [
      "~1,800 programmatic SEO pages from 5 intent layers × 60 niches × 6 langs",
      "Self-rebuilding registry: add a niche → entire SEO surface regenerates",
      "Cookieless analytics: daily-salted SHA-256 IP hash, no raw IP stored",
      "Dark-funnel bridge: re-identifies anonymous visitors as named CRM leads",
      "2-engine SEO auditor strong on hreflang / i18n parity / schema",
      "Regex SAST: 18 OWASP patterns + active HTTP probes + auto-fix",
    ],
  },
  {
    id: "ops",
    kind: "cluster",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    title: "Business & Growth Ops",
    tagline: "The systems that run and grow the business.",
    blurb:
      "Cross-cutting business and growth systems, each built from scratch and mapping to a paid SaaS category: an AI multilingual content CMS, a social auto-publisher (Facebook + LinkedIn), incremental translation memory, a full Stripe subscription lifecycle, a coupon/campaign engine, and a clients operations grid.",
    systemIds: ["blog", "marketing-hub", "tms", "billing", "promo", "clients-grid"],
    stack: ["PHP 8", "MySQL", "Stripe", "GPT API", "Facebook Graph API", "LinkedIn API"],
    highlights: [
      "AI multilingual content CMS with anti-hallucination grounding",
      "Social auto-publish to Facebook (Graph) + LinkedIn (auto token-refresh)",
      "Incremental translation memory — translate only changed keys + coherence check",
      "Full Stripe subscription lifecycle: plans × regions, 7 webhook events, top-ups",
      "Coupon/campaign engine with duration tiers + Stripe-coupon bridge",
      "Clients ops grid: inline pricing/SMTP edit, embed-token regen, plan-grant",
    ],
  },
  {
    id: "desktop",
    kind: "cluster",
    image: "/shot-apps.jpg",
    title: "Apps & Internal Tools",
    tagline: "A shipped product + an internal enterprise portal.",
    blurb:
      "Audisity — a packaged Windows file-audit product with offline licensing, in real-world use; and MailDesk — an internal IT portal for email-account provisioning, in daily production on enterprise integrations.",
    systemIds: ["audisity", "maildesk"],
    stack: ["Python 3", "PySide6 (Qt6)", "PyInstaller", "PHP 8", "Zimbra SOAP", "RT REST"],
    highlights: [
      "Audisity — Windows file-audit (ZIP/JPG/PST/age) → XLSX, HMAC offline licensing; in real-world use + built for commercial sale",
      "Thread-safe Qt async UI (8 worker threads) + single-exe distribution",
      "MailDesk — internal IT portal: Zimbra account provisioning via RT ticketing, in daily production",
      "Built on enterprise integrations: Zimbra Admin SOAP + Request Tracker REST",
    ],
    screenshots: ["/shot-apps.jpg"],
  },
  {
    id: "design",
    kind: "cluster",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    title: "Design & Frontend",
    tagline: "Design range — from luxury hotel to transport logistics.",
    blurb:
      "Frontend and design showcases that balance the heavy-backend projects: a luxury hotel booking landing, a bilingual transport company site with embedded Instantino forms, and a lead-gen dashboard UI. Pure design and frontend craft.",
    designPieces: [
      {
        name: "Maison Elegante",
        blurb:
          "Luxury hotel booking landing — responsive single-page design showcase with Playfair + Poppins typography.",
        liveUrl: "https://maison-elegante.instantino-app.eu/",
        screenshots: [
          "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
        ], // TODO: official screenshot (Paul, at the end)
      },
      {
        name: "Carpatica Transport",
        blurb:
          "Bilingual (RO/EN) marketing site for a heavy/oversized-cargo transport company. Embeds an Instantino quote form — real-world integration.",
        liveUrl: "https://carpatica.instantino.ro",
        screenshots: [
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
        ], // TODO: official screenshot (Paul, at the end)
      },
      {
        name: "Scrapix Dashboard",
        blurb:
          "Lead-gen + outreach dashboard UI with Chart.js analytics, 7 tabs, deployed at affizyletter.com.",
        screenshots: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
        ], // TODO: official screenshot (Paul, at the end — login-gated)
      },
      {
        name: "Client Portfolio (Sondos)",
        blurb:
          "A personal portfolio site built for a client — responsive single-page design.",
        liveUrl: "https://portofolio.try-instantino.eu/",
        screenshots: ["/shot-sondos.jpg"],
      },
    ],
    stack: ["HTML5", "CSS3", "Tailwind", "vanilla JS", "Chart.js"],
    highlights: [
      "Responsive layouts with CSS Grid, Flexbox, clamp() typography",
      "IntersectionObserver scroll-reveal animations",
      "Canvas radial patterns and animated counters",
      "Embedded Instantino form integration (real-world usage)",
    ],
  },
];
