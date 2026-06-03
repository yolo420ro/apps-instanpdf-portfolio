import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { Showcase } from "@/components/Showcase";
import { ContactCTA } from "@/components/ContactCTA";
import { StaggerTestimonials } from "@/components/ui/testimonials";

export default function App() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* 1 — HERO (scroll animation) */}
      <HeroScrollDemo />

      {/* 2 — SHOWCASE (clusters gallery + master-detail) */}
      <Showcase />

      {/* 3 — CTA (contained Acme sparkles + expandable contact form) */}
      <ContactCTA />

      {/* 4 — REVIEWS */}
      <section className="py-28">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-5xl">What clients say</h2>
        <p className="mb-10 text-center text-muted-foreground">
          Reviews (demo — to be replaced with real ones)
        </p>
        <StaggerTestimonials />
      </section>
    </main>
  );
}
