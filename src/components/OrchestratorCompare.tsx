"use client";
import { motion } from "framer-motion";
import { orchestratorCompare } from "@/data/orchestrator-compare";

export function OrchestratorCompare() {
  return (
    <div className="w-full space-y-3">
      {/* column headers */}
      <div className="hidden px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-5">
        <span className="text-right text-[11px] font-medium uppercase tracking-wider text-neutral-500">
          Industry standard
        </span>
        <span className="w-6" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-500/80">
          Built in-house
        </span>
      </div>

      {orchestratorCompare.map((row, i) => (
        <motion.div
          key={row.inhouse}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="grid items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 md:grid-cols-[1fr_auto_1fr] md:gap-5 md:p-5"
        >
          {/* Industry side */}
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {row.industry.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center">
            <span className="hidden text-lg text-neutral-600 md:inline">&rarr;</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-600 md:hidden">
              ↓ rebuilt as
            </span>
          </div>

          {/* In-house side */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span className="font-semibold text-white">{row.inhouse}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400">{row.note}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
