"use client";
import { useEffect, useState } from "react";

type Tone = "cmd" | "accent" | "ok" | "dim";
interface Line {
  text: string;
  tone: Tone;
}

// Generic orchestration session — no employer, no real data.
const LINES: Line[] = [
  { text: '$ hq plan "ship the data section"', tone: "cmd" },
  { text: "▸ planning … 3 tasks", tone: "accent" },
  { text: "▸ spawn HEAD ×3  · isolated worktrees", tone: "accent" },
  { text: "  nexus init          ✓", tone: "ok" },
  { text: "  guardian validate   ✓", tone: "ok" },
  { text: "  map_code · index    ✓", tone: "ok" },
  { text: "▸ HEAD#1 ✓  HEAD#2 ✓  HEAD#3 ✓", tone: "ok" },
  { text: "▸ merge → build → verify   ✓", tone: "ok" },
  { text: "✓ done · 49M tokens · $0 marginal", tone: "accent" },
];

const toneCls: Record<Tone, string> = {
  cmd: "text-neutral-200",
  accent: "text-sky-300",
  ok: "text-emerald-400",
  dim: "text-neutral-500",
};

export function HeroTerminal() {
  const [n, setN] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const run = (i: number) => {
      if (cancelled) return;
      if (i > LINES.length) {
        t = setTimeout(() => run(0), 2600); // hold, then loop
        return;
      }
      setN(i);
      t = setTimeout(() => run(i + 1), i === 0 ? 600 : 520);
    };
    run(0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0b0b0c] font-mono text-[11px] leading-relaxed sm:text-sm">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-xs text-neutral-500">orchestrator — live</span>
      </div>

      {/* body */}
      <div className="flex-1 space-y-1.5 overflow-hidden whitespace-pre px-4 py-4 md:px-8 md:py-7">
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} className={toneCls[l.tone]}>
            {l.text}
            {i === n - 1 && (
              <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-emerald-400 align-middle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
