import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { Gallery4 } from "@/components/ui/gallery4";
import { ContactCTA } from "@/components/ContactCTA";
import { StaggerTestimonials } from "@/components/ui/testimonials";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 1 — HERO (scroll animation) */}
      <HeroScrollDemo />

      {/* 2 — PORTFOLIO (case-study carousel) */}
      <Gallery4 />

      {/* 3 — CTA (full-page sparkles + expandable contact form) */}
      <ContactCTA />

      {/* 4 — REVIEWS */}
      <section className="pb-28">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-5xl">What clients say</h2>
        <p className="mb-10 text-center text-muted-foreground">
          Reviews (demo — to be replaced with real ones)
        </p>
        <StaggerTestimonials />
      </section>
    </main>
  );
}
