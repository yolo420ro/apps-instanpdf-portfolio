"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { ClusterId } from "@/data/systems";
import { systems } from "@/data/systems";

interface Props {
  filterCluster?: ClusterId;
  onSystemClick?: (id: string) => void;
}

// SaaS clusters only (platform = its own orchestrator graph; design = no market price)
const clusterLabels: Partial<Record<ClusterId, string>> = {
  forms: "AI Forms & Pricing",
  leadgen: "Lead-gen & Outreach",
  seo: "SEO · Analytics · Security",
  ops: "Business & Growth Ops",
  desktop: "Desktop Products",
};

function parsePrice(price: string): number {
  const m = price.match(/\$(\d[\d,.]*)\s*(k)?/i);
  if (!m) return 0;
  let v = parseFloat(m[1].replace(/,/g, ""));
  if (m[2]) v *= 1000; // "$10k"
  if (/\/yr/i.test(price)) v = v / 12; // yearly → monthly
  return v;
}

export function BuiltVsMarket({ filterCluster, onSystemClick }: Props) {
  const [cluster, setCluster] = useState<ClusterId | "all">(filterCluster ?? "all");
  const [originalOnly, setOriginalOnly] = useState(false);

  const filtered = useMemo(() => {
    let items = systems.filter(
      (s) => s.cluster !== "design" && s.cluster !== "platform"
    );
    if (cluster !== "all") items = items.filter((s) => s.cluster === cluster);
    if (originalOnly) items = items.filter((s) => s.type === "novel");
    return [...items].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }, [cluster, originalOnly]);

  const maxPrice = Math.max(1, ...filtered.map((s) => parsePrice(s.price)));

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {!filterCluster && (
          <select
            value={cluster}
            onChange={(e) => setCluster(e.target.value as ClusterId | "all")}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-200"
          >
            <option value="all">All categories</option>
            {Object.entries(clusterLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        )}
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={originalOnly}
            onChange={(e) => setOriginalOnly(e.target.checked)}
            className="accent-emerald-500"
          />
          Original only
        </label>
        <span className="ml-auto flex items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Original
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Built equivalent
          </span>
        </span>
      </div>

      {/* Bars */}
      <div className="space-y-3.5">
        {filtered.map((s, i) => {
          const price = parsePrice(s.price);
          const noEquivalent = s.market.length === 0;
          const pct = price > 0 ? Math.max(5, (price / maxPrice) * 100) : 100;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSystemClick?.(s.id)}
              className="group block w-full text-left"
            >
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-100">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      s.type === "novel" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  {s.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {noEquivalent ? "no clean equivalent" : s.market.slice(0, 3).join(" · ")}
                  {s.price !== "—" && (
                    <span className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-neutral-300">
                      {s.price}
                    </span>
                  )}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    s.type === "novel"
                      ? noEquivalent
                        ? "bg-gradient-to-r from-emerald-500/30 to-emerald-400"
                        : "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          No systems match the current filters.
        </p>
      )}
    </div>
  );
}
