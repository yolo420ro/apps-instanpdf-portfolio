import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { units } from "@/data/clusters";
import { getStats, systems } from "@/data/systems";
import { UnitDetail } from "./UnitDetail";
import { BuiltVsMarket } from "./BuiltVsMarket";
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
    <section className="relative">
      {/* Scroll-driven image carousel — click a card → detail below */}
      <ScrollGallery units={units} onSelect={handleSelect} />

      {/* Master-detail (appears when a card is opened) */}
      <div ref={detailRef} className="px-6 md:px-16">
        <AnimatePresence mode="wait">
          {selectedUnit && <UnitDetail key={selectedUnit.id} unit={selectedUnit} />}
        </AnimatePresence>
      </div>

      {/* Headline stat + global Built-vs-Market board */}
      <div className="px-6 py-24 md:px-16">
        <div className="mx-auto mb-12 max-w-4xl text-center">
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

        <div className="mx-auto max-w-5xl">
          <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-neutral-400">
            Built vs Market — what I built, and what it sells for
          </h3>
          <BuiltVsMarket onSystemClick={handleSystemClick} />
        </div>
      </div>
    </section>
  );
}
