"use client";
import { useState } from "react";

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
    <section className="mx-auto max-w-2xl px-6 py-28 text-center">
      <h2 className="text-3xl md:text-5xl font-bold">Hai să lucrăm împreună</h2>
      <p className="mt-4 text-muted-foreground">
        Sisteme AI, automatizări și platforme — construite cap-coadă.
      </p>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="mt-8 rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Contactează-mă
        </button>
      )}

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {status === "ok" ? (
            <p className="rounded-md border border-border bg-card p-6 text-card-foreground">
              Mulțumesc! Ți-am primit mesajul și revin cât pot de repede.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4 text-left">
              <input
                required
                placeholder="Numele tău"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                required
                rows={5}
                placeholder="Spune-mi pe scurt ce ai nevoie…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
              {/* honeypot anti-spam (hidden) */}
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
                className="w-full rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                {status === "sending" ? "Se trimite…" : "Trimite"}
              </button>
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Ceva n-a mers. Mai încearcă o dată.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
