"use client";
import { useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactCTA() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      <h2 className="relative z-20 text-center text-4xl font-bold text-white md:text-7xl">
        Let&apos;s work together
      </h2>
      <p className="relative z-20 mt-4 text-center text-neutral-300">
        AI systems, automation and platforms — built end-to-end.
      </p>

      {/* blue line — the sparkles fan is anchored to it and fans DOWNWARD as an
          absolute background, so it never pushes the button down */}
      <div className="relative z-10 my-8 h-1 w-[40rem] max-w-full">
        {/* sparkles fan (absolute, behind) */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[34rem] w-[84rem] max-w-[100vw] -translate-x-1/2">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={300}
            speed={0.5}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
          {/* radial mask — black matches the continuous page background (no seam) */}
          <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(1200px_680px_at_top,transparent_20%,white)]" />
        </div>

        {/* gradient line (above the sparkles) */}
        <div className="absolute inset-x-20 top-0 z-10 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 z-10 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 z-10 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 z-10 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      </div>

      {/* Contact me / form — sits directly under the blue line, on top of the sparkles */}
      <div className="relative z-20 mt-6 w-full max-w-xl">
        {!open && (
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-md bg-white px-8 py-3 text-base font-semibold text-black transition hover:opacity-90"
            >
              Contact me
            </button>
            <a
              href="/cv-paul-popescu.pdf"
              download="CV-Catalin-Paul-Popescu-EN.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 px-8 py-3 text-base font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
            >
              Download CV
            </a>
          </div>
        )}

        <div
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {status === "ok" ? (
              <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur">
                Thanks! I got your message and will get back to you shortly.
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="space-y-4 rounded-xl border border-white/10 bg-black/50 p-6 text-left backdrop-blur"
              >
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-white/40"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-white/40"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me briefly what you need…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-white/40"
                />
                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="absolute left-[-9999px] h-0 w-0"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-md bg-white px-8 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
                {status === "error" && (
                  <p className="text-center text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
