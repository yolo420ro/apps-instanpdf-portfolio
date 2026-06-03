import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { units } from "@/data/clusters";
import { getStats, systems } from "@/data/systems";
import { UnitDetail } from "./UnitDetail";
import { BuiltVsMarket } from "./BuiltVsMarket";

const flagships = units.filter((u) => u.kind === "flagship");
const clusters = units.filter((u) => u.kind === "cluster");
const stats = getStats();

/* ── Animated count-up hook ── */
function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setValue(Math.round(t * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export function Showcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const totalCount = useCountUp(stats.total);
  const novelCount = useCountUp(stats.novel);
  const priceCount = useCountUp(stats.monthlySum);

  const selectedUnit = selectedId
    ? units.find((u) => u.id === selectedId) ?? null
    : null;

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    // scroll to detail after render
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSystemClick = (systemId: string) => {
    const sys = systems.find((s) => s.id === systemId);
    if (sys) handleSelect(sys.cluster);
  };

  return (
    <section className="relative px-6 py-24 md:px-16">
      {/* Intro + headline stat */}
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
          What I&apos;ve Built
        </h2>
        <p className="mb-8 text-neutral-400">
          A solo-built body of work — from a production B2B SaaS to a
          multi-agent AI orchestration framework.
        </p>

        {/* Animated stat line */}
        <p className="text-lg text-neutral-300 md:text-xl">
          <span ref={totalCount.ref} className="font-bold text-white">
            {totalCount.value}
          </span>{" "}
          systems{" · "}
          <span ref={novelCount.ref} className="font-bold text-emerald-400">
            {novelCount.value}
          </span>{" "}
          original{" · "}
          <span className="font-bold text-amber-400">
            ≈&nbsp;$
            <span ref={priceCount.ref}>{priceCount.value.toLocaleString()}</span>
            /mo
          </span>{" "}
          of SaaS rebuilt solo
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Prices are illustrative low-end estimates
        </p>
      </div>

      {/* Global Built-vs-Market board — the centerpiece */}
      <div className="mx-auto mb-16 max-w-5xl">
        <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-neutral-400">
          Built vs Market — what I built, and what it sells for
        </h3>
        <BuiltVsMarket onSystemClick={handleSystemClick} />
      </div>

      {/* Flagships */}
      <div className="mx-auto mb-10 grid max-w-6xl gap-6 md:grid-cols-2">
        {flagships.map((u) => (
          <Card key={u.id} unit={u} selected={selectedId === u.id} onClick={() => handleSelect(u.id)} />
        ))}
      </div>

      {/* Clusters */}
      <div className="mx-auto mb-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((u) => (
          <Card key={u.id} unit={u} selected={selectedId === u.id} onClick={() => handleSelect(u.id)} />
        ))}
      </div>

      {/* Master-detail */}
      <div ref={detailRef}>
        <AnimatePresence mode="wait">
          {selectedUnit && (
            <UnitDetail key={selectedUnit.id} unit={selectedUnit} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Card sub-component ── */
interface CardProps {
  unit: (typeof units)[number];
  selected: boolean;
  onClick: () => void;
}

function Card({ unit, selected, onClick }: CardProps) {
  const isFlagship = unit.kind === "flagship";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border text-left transition-colors ${
        selected
          ? "border-emerald-500/50 bg-emerald-500/5"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      } ${isFlagship ? "p-8" : "p-6"}`}
    >
      {/* Type dot */}
      {unit.type && (
        <span
          className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${
            unit.type === "novel" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      )}

      {/* Kind badge */}
      <span
        className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
          isFlagship
            ? "bg-white/10 text-white"
            : "bg-white/5 text-neutral-400"
        }`}
      >
        {isFlagship ? "Flagship" : "Cluster"}
      </span>

      <h3
        className={`font-bold text-white ${
          isFlagship ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {unit.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        {unit.tagline}
      </p>

      <span className="mt-4 inline-block text-sm text-emerald-400 transition-transform group-hover:translate-x-1">
        {selected ? "Close" : "Read more"} &rarr;
      </span>
    </motion.button>
  );
}
