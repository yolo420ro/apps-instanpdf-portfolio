"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import type { ShowcaseUnit } from "@/data/clusters";

interface Props {
  units: ShowcaseUnit[];
  onSelect: (id: string) => void;
}

export function ScrollGallery({ units, onSelect }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    calc();
    const t = setTimeout(calc, 400); // re-measure after images/layout settle
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("resize", calc);
      clearTimeout(t);
    };
  }, [units]);

  return (
    <section ref={targetRef} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* title overlay (does not push the cards off-center) */}
        <div className="pointer-events-none absolute left-6 top-10 z-10 md:left-16 md:top-16">
          <h2 className="text-3xl font-medium md:text-5xl">What I&apos;ve Built</h2>
          <p className="mt-3 max-w-md text-sm text-neutral-400 md:text-base">
            A solo-built body of work — from a production B2B SaaS to a multi-agent AI
            orchestration framework.
          </p>
        </div>

        {/* vertically-centered, horizontally scroll-driven track.
            Leading/trailing padding = (100vw - cardWidth)/2 so the first and last
            cards land centered on the X axis. */}
        <div className="flex h-full items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-[6vw] will-change-transform sm:px-[15vw] md:gap-8 md:px-[24vw] lg:px-[30vw]"
          >
            {units.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => onSelect(u.id)}
                className="group relative h-[60vh] w-[88vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 text-left sm:w-[70vw] md:w-[52vw] lg:w-[40vw]"
              >
                <img
                  src={u.image ?? "/hero.jpg"}
                  alt={u.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                {/* kind badge + type dot */}
                <span className="absolute left-6 top-6 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur md:left-8 md:top-8">
                  {u.kind === "flagship" ? "Flagship" : "Cluster"}
                </span>
                {u.type && (
                  <span
                    className={`absolute right-6 top-6 h-2.5 w-2.5 rounded-full md:right-8 md:top-8 ${
                      u.type === "novel" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <h3 className="text-2xl font-semibold text-white md:text-4xl">{u.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">
                    {u.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-emerald-400 transition-transform group-hover:translate-x-1">
                    Read more &rarr;
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
