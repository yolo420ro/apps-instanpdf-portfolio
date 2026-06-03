export interface OrchestratorPair {
  industry: string[]; // the industry-standard tools/techniques
  inhouse: string; // what Paul built instead
  note: string; // one-line differentiator
}

// Source: _md/mapping.md §5 — the orchestration framework, component by component.
export const orchestratorCompare: OrchestratorPair[] = [
  {
    industry: ["LangChain", "LangGraph", "CrewAI", "AutoGen"],
    inhouse: "MCP orchestrator + nexus + HQ→HEAD",
    note: "nexus = single entry point; markdown-as-orchestration over a deterministic PHP control plane.",
  },
  {
    industry: ["RAG", "Pinecone", "Weaviate"],
    inhouse: "keyword knowledge engine + curated context",
    note: "Keyword retrieval, grounded per session — no vector DB.",
  },
  {
    industry: ["Mem0", "Zep", "Letta"],
    inhouse: "lesson_capture + feedback files",
    note: "Human-curated memory, auto-injected into every session.",
  },
  {
    industry: ["LangSmith"],
    inhouse: "guardian validation gate",
    note: "Every agent report is checked; a human reads the diff.",
  },
  {
    industry: ["Grafana", "Datadog"],
    inhouse: "Nexus Cockpit (live-ops TUI)",
    note: "9-panel terminal dashboard; logs every MCP / CLI / Guardian action to SQLite.",
  },
  {
    industry: ["Backstage", "Roadie", "Port", "Cortex"],
    inhouse: "project registry + scaffolder",
    note: "Scoped per-project tokens; 9 auto-rendered templates.",
  },
  {
    industry: ["MCP SDK", "FastMCP"],
    inhouse: "PHP multi-tenant MCP server",
    note: "TokenAuthz + ScopeContext — projects can't read each other.",
  },
  {
    industry: ["Devin", "Claude Code enterprise"],
    inhouse: "the whole framework",
    note: "Self-hosted, ~$0 marginal — and it builds itself.",
  },
  {
    industry: ["SSH", "Tailscale"],
    inhouse: "Local↔VM bridge",
    note: "PowerShell reverse-proxy + mapped drive — no SSH.",
  },
];
