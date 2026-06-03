import type { SystemType } from "./systems";

export interface DesignPiece {
  name: string;
  blurb: string;
  liveUrl?: string;
  screenshots: string[];
}

export interface ShowcaseUnit {
  id: string;
  kind: "flagship" | "cluster";
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
    image: "/hero.jpg",
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
    screenshots: ["/hero.jpg"],
    liveUrl: "https://instantino.ro",
  },
  {
    id: "platform",
    kind: "flagship",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    title: "Orchestration Platform",
    tagline:
      "Multi-agent AI framework — proven deep and wide.",
    blurb:
      "A self-hosted multi-tenant control plane for AI coding agents: token-based authorization, scope-jailing, project scaffolding, and a self-improving lessons loop. Proven two ways: DEEP (single-project — Instantino, ~17 systems) and WIDE (multi-project / multi-user deployment with per-project scoped tokens). The framework built itself: 27 briefs → 26 structured reports.",
    type: "novel",
    systemIds: ["orchestration-platform"],
    stack: [
      "PHP 8",
      "MCP (stdio + HTTP)",
      "JSON-RPC 2.0",
      "Claude Code CLI",
      "PowerShell",
    ],
    highlights: [
      "Token-based RBAC: master vs per-project scoped tokens with expiry/revocation",
      "Scope-jailing: project tokens cannot read sibling projects",
      "Project scaffolder: scaffold/integrate/archive with 9 auto-rendered templates",
      "Self-building: 27-brief dependency-ordered build program, 26 completed reports",
      "Dual transport: stdio (local) + HTTP :8090 (JSON-RPC 2.0)",
      "AI-learning loop: detect gotcha → draft lesson → owner approves → auto-injected into every session",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    ],
  },

  /* ── CLUSTERS ── */
  {
    id: "forms",
    kind: "cluster",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
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
  },
  {
    id: "leadgen",
    kind: "cluster",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
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
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
    title: "Desktop Products",
    tagline:
      "Shipped Windows app with offline licensing.",
    blurb:
      "A packaged Windows desktop product for file auditing: scans ZIP, JPG, Outlook PST, and file-age across directories, producing TXT audit trails and premium XLSX reports. Features HMAC-SHA256 offline licensing with four tiers (Free/Personal/Pro/Business) and a freemium upsell flow. End-to-end product ownership from conception to shipping.",
    systemIds: ["audisity"],
    stack: ["Python 3", "PySide6 (Qt6)", "PyInstaller", "openpyxl"],
    highlights: [
      "4 audit modules: ZIP, JPG, PST, file-age",
      "HMAC-SHA256 offline licensing (Free / Personal / Pro / Business)",
      "Thread-safe Qt signal/slot async UI with 8 worker threads",
      "Premium XLSX reports with embedded templates",
      "Single .exe distribution (~57 MB)",
    ],
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
