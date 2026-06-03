import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClusterId } from "@/data/systems";
import { systems } from "@/data/systems";

interface Props {
  filterCluster?: ClusterId;
  onSystemClick?: (id: string) => void;
}

const clusterLabels: Record<ClusterId, string> = {
  forms: "AI Forms & Pricing",
  leadgen: "Lead-gen & Outreach",
  seo: "SEO · Analytics · Security",
  ops: "Business & Growth Ops",
  desktop: "Desktop Products",
  platform: "Orchestration Platform",
  design: "Design & Frontend",
};

export function BuiltVsMarket({ filterCluster, onSystemClick }: Props) {
  const [cluster, setCluster] = useState<ClusterId | "all">(
    filterCluster ?? "all"
  );
  const [originalOnly, setOriginalOnly] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  const filtered = useMemo(() => {
    let items = systems.filter((s) => s.cluster !== "design");
    if (cluster !== "all") items = items.filter((s) => s.cluster === cluster);
    if (originalOnly) items = items.filter((s) => s.type === "novel");
    if (sortByPrice) {
      items = [...items].sort((a, b) => {
        const pa = parsePrice(a.price);
        const pb = parsePrice(b.price);
        return pb - pa;
      });
    }
    return items;
  }, [cluster, originalOnly, sortByPrice]);

  return (
    <div className="w-full">
      {/* Controls — only show cluster filter when not pre-filtered */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {!filterCluster && (
          <select
            value={cluster}
            onChange={(e) => setCluster(e.target.value as ClusterId | "all")}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-200"
          >
            <option value="all">All clusters</option>
            {Object.entries(clusterLabels)
              .filter(([k]) => k !== "design")
              .map(([k, v]) => (
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

        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.checked)}
            className="accent-amber-500"
          />
          Sort by price
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-400">
              <th className="px-4 py-3">What I built</th>
              <th className="px-4 py-3">Market equivalent</th>
              <th className="px-4 py-3 text-right">~Price</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filtered.map((s) => (
                <motion.tr
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => onSystemClick?.(s.id)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          s.type === "novel" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <div>
                        <span className="font-medium text-neutral-100">
                          {s.name}
                        </span>
                        <p className="mt-0.5 text-xs text-neutral-400">
                          {s.built}
                        </p>
                        {s.greenTechnique && (
                          <span className="mt-1 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                            {s.greenTechnique}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">
                    {s.market.length > 0
                      ? s.market.join(" · ")
                      : "No clean equivalent"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-neutral-300">
                    {s.price !== "—" ? (
                      <span className="rounded bg-white/5 px-2 py-0.5 text-xs">
                        {s.price}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-500">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          No systems match the current filters.
        </p>
      )}
    </div>
  );
}

function parsePrice(price: string): number {
  const m = price.match(/\$(\d[\d,]*)/);
  return m ? parseInt(m[1].replace(",", ""), 10) : 0;
}
