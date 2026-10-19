import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CallButton, FinalCta, PageIntro, SiteLayout } from "@/components/site/Layout";
import { services } from "@/config/business";
import { images, imageAlt } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Boiler Repairs, Installation & Gas Services Glasgow | Services",
      "Boiler repairs, boiler installation and replacement, servicing, and gas installation and repairs for homes in Glasgow.",
      "/services",
    ),
  component: Services,
});

function Services() {
  return (
    <SiteLayout>
      <PageIntro eyebrow="Services" title="Gas & Heating Services in Glasgow">
        Whether something has stopped working or you're planning ahead, here's an overview of the work we can help with and how to enquire.
      </PageIntro>

      <div className="container-site divide-y">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} className="grid scroll-mt-24 items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20">
            <img src={images[s.image]} alt={imageAlt[s.image]} loading="lazy" width={1024} height={768}
              className={`aspect-[4/3] w-full rounded-xl object-cover shadow-soft ${i % 2 ? "md:order-2" : ""}`} />
            <div>
              <h2 className="text-3xl font-bold text-navy">{s.title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.involves}</p>
              <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider text-navy">When you might need it</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {s.when.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-cta" aria-hidden />{w}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" search={{ service: s.id }} className="btn btn-navy">Enquire about {s.title.toLowerCase()}</Link>
                <CallButton />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-warm">
        <div className="container-site py-12 text-sm text-muted-foreground">
          <p className="max-w-3xl">
            Not sure which service you need? Describe the problem when you get in touch and we'll talk it through with you. Gas work should only ever be carried out by a suitably registered engineer.
          </p>
        </div>
      </section>
      <FinalCta />
    </SiteLayout>
  );
}
