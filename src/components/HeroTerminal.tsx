"use client";
import { useEffect, useState } from "react";

type Tone = "cmd" | "accent" | "label" | "ok" | "dim" | "val" | "code";
interface Line {
  text: string;
  tone: Tone;
}

// Orchestration session intro (kept) …
const PREFIX: Line[] = [
  { text: '$ hq plan "ship the data section"', tone: "cmd" },
  { text: "▸ planning … 3 tasks", tone: "accent" },
  { text: "▸ spawn HEAD ×3 · isolated worktrees", tone: "accent" },
  { text: "  nexus init        ✓", tone: "ok" },
  { text: "  guardian validate ✓", tone: "ok" },
  { text: "  map_code · index  ✓", tone: "ok" },
  { text: "", tone: "dim" },
  { text: "── timeline ──────────────────", tone: "dim" },
];

// … then a real Nexus Cockpit timeline event — read_file, with an
// ANONYMIZED multi-line output (generic guard, not the real internal file).
const EVENTS: Line[][] = [
  [
    { text: "Event #4024   01:05:38", tone: "accent" },
    { text: "Source:    mcp.read_file", tone: "label" },
    { text: "Action:    end", tone: "label" },
    { text: "Status:    ok", tone: "ok" },
    { text: "Tool:      read_file", tone: "label" },
    { text: "Duration:  13ms", tone: "label" },
    { text: 'Params:    {"path":"app\\/auth\\/guard.php"}', tone: "val" },
    { text: "Output:", tone: "dim" },
    { text: "## app/auth/guard.php · lines 1-6 of 48", tone: "dim" },
    { text: "  1 | <?php", tone: "code" },
    { text: "  2 | if (session_status() === PHP_SESSION_NONE) session_start();", tone: "code" },
    { text: "  3 | if (!current_user()->can('access')) {", tone: "code" },
    { text: "  4 |   $isApi = strpos($_SERVER['SCRIPT_NAME'] ?? '', '/api') !== false;", tone: "code" },
    { text: "  5 |   if ($isApi) { http_response_code(403); exit; }", tone: "code" },
    { text: "  6 |   header('Location: /login'); exit;", tone: "code" },
  ],
];

const toneCls: Record<Tone, string> = {
  cmd: "text-neutral-200",
  accent: "text-amber-300",
  label: "text-neutral-300",
  ok: "text-emerald-400",
  dim: "text-neutral-500",
  val: "text-sky-300",
  code: "text-neutral-400",
};

export function HeroTerminal() {
  const [s, setS] = useState({ ev: 0, li: 0, ci: 0 });

  useEffect(() => {
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    let ev = 0,
      li = 0,
      ci = 0;
    const step = () => {
      if (cancelled) return;
      const lines = [...PREFIX, ...EVENTS[ev]];
      if (li >= lines.length) {
        t = setTimeout(() => {
          ev = (ev + 1) % EVENTS.length;
          li = 0;
          ci = 0;
          setS({ ev, li, ci });
          t = setTimeout(step, 300);
        }, 3000);
        return;
      }
      const line = lines[li].text;
      if (ci < line.length) {
        ci = Math.min(line.length, ci + 3);
        setS({ ev, li, ci });
        t = setTimeout(step, 14);
      } else {
        li += 1;
        ci = 0;
        setS({ ev, li, ci });
        t = setTimeout(step, line === "" ? 55 : 130);
      }
    };
    t = setTimeout(step, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const lines = [...PREFIX, ...EVENTS[s.ev]];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0b0b0c] font-mono text-[10px] leading-relaxed sm:text-[12px]">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-neutral-400">
          Nexus Cockpit v2 · timeline
        </span>
      </div>

      {/* body */}
      <div className="flex-1 overflow-hidden whitespace-pre px-4 py-4 md:px-7 md:py-5">
        {lines.slice(0, s.li).map((l, i) => (
          <div key={i} className={toneCls[l.tone]}>
            {l.text || " "}
          </div>
        ))}
        {s.li < lines.length && (
          <div className={toneCls[lines[s.li].tone]}>
            {lines[s.li].text.slice(0, s.ci) || " "}
            <span className="ml-0.5 inline-block h-3 w-[7px] animate-pulse bg-emerald-400 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
