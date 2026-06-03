import { useRef } from "react";
import { motion } from "framer-motion";
import type { ShowcaseUnit } from "@/data/clusters";
import { BuiltVsMarket } from "./BuiltVsMarket";
import type { ClusterId } from "@/data/systems";

interface Props {
  unit: ShowcaseUnit;
}

export function UnitDetail({ unit }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    printRef.current?.classList.add("print-target");
    window.print();
    printRef.current?.classList.remove("print-target");
  };

  const isDesign = unit.id === "design";
  // platform has its own orchestrator graph in the always-visible section
  const hasChart =
    unit.systemIds && unit.systemIds.length > 0 && !isDesign && unit.id !== "platform";

  return (
    <motion.div
      ref={printRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            {unit.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">{unit.tagline}</p>
        </div>
        <button
          onClick={handlePrint}
          className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200 transition-colors hover:bg-white/10"
        >
          Download PDF
        </button>
      </div>

      {/* Blurb */}
      <p className="mb-6 leading-relaxed text-neutral-300">{unit.blurb}</p>

      {/* Stack badges */}
      {unit.stack && unit.stack.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {unit.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      {unit.highlights && unit.highlights.length > 0 && (
        <ul className="mb-8 space-y-2">
          {unit.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
              <span className="mt-1 text-emerald-500">&#x2022;</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Built-vs-Market chart (filtered to this cluster) */}
      {hasChart && (
        <div className="mb-8">
          <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-400">
            Built vs Market
          </h4>
          <BuiltVsMarket filterCluster={unit.id as ClusterId} />
        </div>
      )}

      {/* Design pieces grid */}
      {isDesign && unit.designPieces && (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unit.designPieces.map((dp) => (
            <div
              key={dp.name}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              {dp.screenshots[0] && (
                <img
                  src={dp.screenshots[0]}
                  alt={dp.name}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h5 className="font-medium text-white">{dp.name}</h5>
                <p className="mt-1 text-xs text-neutral-400">{dp.blurb}</p>
                {dp.liveUrl && (
                  <a
                    href={dp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-emerald-400 hover:underline"
                  >
                    View live &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Screenshots */}
      {unit.screenshots && unit.screenshots.length > 0 && (
        <div className="mb-6 flex gap-4 overflow-x-auto">
          {unit.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${unit.title} screenshot ${i + 1}`}
              className="max-w-full rounded-lg border border-white/10 bg-white/[0.02] object-contain md:max-h-[34rem]"
            />
          ))}
        </div>
      )}

      {/* Live URL */}
      {unit.liveUrl && (
        <a
          href={unit.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-400 hover:underline"
        >
          Visit live site &rarr;
        </a>
      )}
    </motion.div>
  );
}
