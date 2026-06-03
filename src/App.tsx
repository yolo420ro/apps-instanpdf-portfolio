import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import { ContactCTA } from "@/components/ContactCTA";
import { StaggerTestimonials } from "@/components/ui/testimonials";

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 1 — HERO (scroll animation) */}
      <HeroScrollDemo />

      {/* 2 — CTA (expandable contact form -> contact.php) */}
      <ContactCTA />

      {/* 3 — REVIEWS */}
      <section className="pb-28">
        <h2 className="mb-2 text-center text-3xl md:text-5xl font-bold">Ce spun clienții</h2>
        <p className="mb-10 text-center text-muted-foreground">Recenzii (demo — le înlocuim cu cele reale)</p>
        <StaggerTestimonials />
      </section>
    </main>
  );
}
