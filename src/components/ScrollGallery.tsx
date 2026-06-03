"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

// Portfolio — first draft from the real systems. Swap images for real screenshots.
const projects: Project[] = [
  {
    id: "instantino",
    title: "Instantino — AI Quote-Form SaaS",
    description:
      "A B2B SaaS built solo, end-to-end, in production: turns a business URL into a live, multilingual quote form plus an instant branded PDF offer. Multi-tenant PHP + MySQL, Stripe, Auth0, WebAuthn.",
    href: "https://instantino.ro",
    image: "/hero.jpg",
  },
  {
    id: "quickstart",
    title: "Quickstart — URL → AI Pricing Engine",
    description:
      "Scans a business, auto-detects its niche (Claude + GPT + Serper) and generates a full quote form with a parametric pricing model — guarded by an economic-plausibility check on AI-suggested prices.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "ipdf",
    title: "iPDF — Embedded AI Copilot",
    description:
      "A product-scoped AI assistant across five surfaces, including a conversational form editor where clients change fields, branding and prices by chatting — money-affecting edits confirmation-gated.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "leads",
    title: "Lead Engine — AI Cold-Outreach",
    description:
      "Discovers local businesses, validates contacts, AI-writes personalized emails and runs a full deliverability + IMAP reply-monitoring stack. Battle-tested: ~11k leads, ~8.6k emails sent.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "nexus",
    title: "Nexus Cockpit — Live Ops Terminal",
    description:
      "An interactive terminal dashboard (Python + Textual) for real-time monitoring of the whole platform, backed by a SQLite event log.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
  {
    id: "orchestrator",
    title: "MCP Orchestrator — Multi-Agent AI Framework",
    description:
      "A self-hosted PHP control plane that orchestrates Claude Code agents over a codebase: role hierarchy, per-project scoped tokens, validation gates and a self-improving lessons loop.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280",
  },
];

export function ScrollGallery() {
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
  }, []);

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
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.href}
                className="group relative h-[60vh] w-[88vw] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-[70vw] md:w-[52vw] lg:w-[40vw]"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <h3 className="text-2xl font-semibold text-white md:text-4xl">{p.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">
                    {p.description}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
