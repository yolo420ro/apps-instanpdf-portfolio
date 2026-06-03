"use client";
import { useEffect, useState } from "react";

type Tone = "accent" | "label" | "ok" | "dim" | "val";
interface Line {
  text: string;
  tone: Tone;
}

// Real Nexus Cockpit v2 "timeline" event FORMAT, with safe/generic content.
// (The actual screenshot showed internal auth-guard source — not for a public site.)
const EVENTS: Line[][] = [
  [
    { text: "Event #4024   01:05:38", tone: "accent" },
    { text: "", tone: "dim" },
    { text: "Source:    mcp.map_code", tone: "label" },
    { text: "Action:    end", tone: "label" },
    { text: "Status:    ok", tone: "ok" },
    { text: "Tool:      map_code", tone: "label" },
    { text: "Session:   hq-portfolio", tone: "label" },
    { text: "Duration:  28ms", tone: "label" },
    { text: "", tone: "dim" },
    { text: "Params:", tone: "dim" },
    { text: '{"path":"src\\/data\\/systems.ts"}', tone: "val" },
    { text: "", tone: "dim" },
    { text: "Output:", tone: "dim" },
    { text: '[{"type":"text","text":"21 systems · getStats() ✓"}]', tone: "val" },
  ],
  [
    { text: "Event #4025   01:05:41", tone: "accent" },
    { text: "", tone: "dim" },
    { text: "Source:    mcp.guardian", tone: "label" },
    { text: "Action:    validate", tone: "label" },
    { text: "Status:    ok", tone: "ok" },
    { text: "Tool:      guardian", tone: "label" },
    { text: "Session:   hq-portfolio", tone: "label" },
    { text: "Duration:  6ms", tone: "label" },
    { text: "", tone: "dim" },
    { text: "Output:", tone: "dim" },
    { text: '[{"files":3,"tests":"pass","risks":0}]', tone: "val" },
  ],
  [
    { text: "Event #4026   01:05:44", tone: "accent" },
    { text: "", tone: "dim" },
    { text: "Source:    mcp.db_query", tone: "label" },
    { text: "Action:    end", tone: "label" },
    { text: "Status:    ok", tone: "ok" },
    { text: "Tool:      db_query", tone: "label" },
    { text: "Session:   hq-portfolio", tone: "label" },
    { text: "Duration:  9ms", tone: "label" },
    { text: "", tone: "dim" },
    { text: "Output:", tone: "dim" },
    { text: '[{"rows":21,"ok":true}]', tone: "val" },
  ],
];

const toneCls: Record<Tone, string> = {
  accent: "text-amber-300",
  label: "text-neutral-300",
  ok: "text-emerald-400",
  dim: "text-neutral-500",
  val: "text-sky-300",
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
      const lines = EVENTS[ev];
      if (li >= lines.length) {
        // event fully typed → hold, then next event
        t = setTimeout(() => {
          ev = (ev + 1) % EVENTS.length;
          li = 0;
          ci = 0;
          setS({ ev, li, ci });
          t = setTimeout(step, 300);
        }, 2600);
        return;
      }
      const line = lines[li].text;
      if (ci < line.length) {
        ci = Math.min(line.length, ci + 2); // 2 chars/tick
        setS({ ev, li, ci });
        t = setTimeout(step, 16);
      } else {
        li += 1;
        ci = 0;
        setS({ ev, li, ci });
        t = setTimeout(step, line === "" ? 70 : 190);
      }
    };
    t = setTimeout(step, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const lines = EVENTS[s.ev];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0b0b0c] font-mono text-[11px] leading-relaxed sm:text-[13px]">
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
      <div className="flex-1 overflow-hidden whitespace-pre px-4 py-4 md:px-8 md:py-6">
        {lines.slice(0, s.li).map((l, i) => (
          <div key={i} className={toneCls[l.tone]}>
            {l.text || " "}
          </div>
        ))}
        {s.li < lines.length && (
          <div className={toneCls[lines[s.li].tone]}>
            {lines[s.li].text.slice(0, s.ci) || " "}
            <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-emerald-400 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
