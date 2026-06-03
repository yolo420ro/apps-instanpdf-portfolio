import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { units } from "@/data/clusters";
import { getStats, systems } from "@/data/systems";
import { UnitDetail } from "./UnitDetail";
import { BuiltVsMarket } from "./BuiltVsMarket";
import { OrchestratorCompare } from "./OrchestratorCompare";
import { ScrollGallery } from "./ScrollGallery";

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
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSystemClick = (systemId: string) => {
    const sys = systems.find((s) => s.id === systemId);
    if (sys) handleSelect(sys.cluster);
  };

  return (
    <section className="relative">
      {/* Scroll-driven image carousel — click a card → detail below */}
      <ScrollGallery units={units} onSelect={handleSelect} />

      {/* Master-detail (appears when a card is opened) */}
      <div ref={detailRef} className="px-6 md:px-16">
        <AnimatePresence mode="wait">
          {selectedUnit && <UnitDetail key={selectedUnit.id} unit={selectedUnit} />}
        </AnimatePresence>
      </div>

      {/* ── Two always-visible graphs ── */}
      <div className="px-6 py-24 md:px-16">
        {/* Graph 1 — the orchestration framework, in-house vs industry */}
        <div className="mx-auto mb-24 max-w-4xl">
          <h3 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
            The agentic stack — in-house vs the industry
          </h3>
          <p className="mb-10 text-center text-sm text-neutral-400 md:text-base">
            Every layer of the orchestration framework, rebuilt from scratch.
          </p>
          <OrchestratorCompare />
        </div>

        {/* Graph 2 — built vs market */}
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
            Built vs Market
          </h3>
          <p className="text-center text-sm text-neutral-400 md:text-base">
            What I built — and what the market sells it for.
          </p>
          <p className="mt-3 text-center text-base text-neutral-300">
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
            rebuilt solo
          </p>
          <p className="mb-10 mt-1 text-center text-xs text-neutral-500">
            Illustrative low-end estimates
          </p>
          <BuiltVsMarket onSystemClick={handleSystemClick} />
        </div>
      </div>
    </section>
  );
}
