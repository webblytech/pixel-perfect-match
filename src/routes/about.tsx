import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PageIntro, SiteLayout } from "@/components/site/Layout";
import { business } from "@/config/business";
import { images, imageAlt } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About | Gas Repair & Installation Services, Glasgow",
      "A local Glasgow gas and heating service focused on dependable communication, careful work and helping customers understand their options.",
      "/about",
    ),
  component: About,
});

const values = [
  { t: "Dependable communication", d: "Calls returned, arrangements kept, and updates if anything changes." },
  { t: "Careful work", d: "Respect for your home, your time and the job itself — done properly." },
  { t: "Understanding your options", d: "Honest explanations so you can make a decision you're comfortable with." },
];

function About() {
  return (
    <SiteLayout>
      <PageIntro eyebrow="About" title="Professional Service, With Your Home in Mind.">
        When someone comes into your home to work on your heating or gas appliances, you want to feel confident about who they are and how they work.
      </PageIntro>

      <section className="container-site grid items-start gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            {business.name} provides gas and heating services to homes across {business.serviceArea}. The aim is simple: to be the kind of engineer you'd happily call again.
          </p>
          <p>
            That means listening to what's going on, explaining what's been found, and talking through the options before work begins — so there are no surprises.
          </p>
        </div>
        <img src={images.pipework} alt={imageAlt.pipework} loading="lazy" width={1024} height={768}
          className="aspect-[4/3] w-full rounded-xl object-cover shadow-soft" />
      </section>

      <section className="bg-warm">
        <div className="container-site grid gap-8 py-16 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="rounded-lg border bg-background p-7 shadow-soft">
              <h2 className="text-xl font-bold text-navy">{v.t}</h2>
              <p className="mt-2 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Owner details: shown once added to the business config */}
      {business.registrations.length > 0 && (
        <section className="container-site py-16">
          <h2 className="text-2xl font-bold text-navy">Registrations</h2>
          <ul className="mt-4 space-y-2">
            {business.registrations.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </section>
      )}

      <FinalCta />
    </SiteLayout>
  );
}
