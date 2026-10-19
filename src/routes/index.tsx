import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare, Wrench, Handshake, ClipboardCheck, MapPin, Star } from "lucide-react";
import { CallButton, FinalCta, SiteLayout } from "@/components/site/Layout";
import { business, services } from "@/config/business";
import { images, imageAlt } from "@/lib/images";
import { localBusinessJsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta(
      "Gas Engineer & Boiler Repairs Glasgow | Gas Repair & Installation Services",
      "Boiler repairs, installation, servicing and gas work for homes in Glasgow. Get in touch to discuss your requirements and request a quote.",
      "/",
    ),
    scripts: [localBusinessJsonLd()],
  }),
  component: Home,
});

const principles = [
  { icon: MessageSquare, label: "Clear communication" },
  { icon: Wrench, label: "Professional workmanship" },
  { icon: Handshake, label: "Helpful service" },
  { icon: ClipboardCheck, label: "Quote enquiries welcome" },
];

const why = [
  { t: "Clear communication from first enquiry", d: "You'll know what's happening, when, and why — without jargon." },
  { t: "Understanding the problem first", d: "The issue is properly looked at before any work is recommended." },
  { t: "Discussing the available options", d: "Where there's more than one way forward, you'll hear about each." },
  { t: "Considerate service in your home", d: "Work areas are protected and left tidy once the job is done." },
];

const steps = [
  { n: "01", t: "Get in Touch", d: "Call or send an enquiry explaining what you need help with." },
  { n: "02", t: "Discuss Your Requirements", d: "Provide relevant details about the issue or installation you have in mind." },
  { n: "03", t: "Arrange the Next Steps", d: "Discuss availability, the work required and the appropriate quotation or appointment." },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-warm">
        <div className="container-site grid items-center gap-10 py-10 md:grid-cols-[1.05fr_1fr] md:gap-14 md:py-20">
          <div className="reveal">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="size-4 text-cta" aria-hidden /> Serving {business.serviceArea}
            </p>
            <h1 className="mt-4 text-[2.4rem] leading-[1.05] font-extrabold text-navy sm:text-5xl lg:text-[3.6rem]">
              Reliable Gas &amp; Heating Services You Can Count On.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Looking for help with your gas appliances or heating system? Get in touch to discuss your requirements and find out how we can help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-cta">Request a Quote <ArrowRight className="size-4" aria-hidden /></Link>
              <CallButton />
            </div>
          </div>
          <div className="reveal relative">
            <img
              src={images.hero}
              alt={imageAlt.hero}
              width={1280}
              height={1440}
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-lift md:aspect-[8/9]"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y bg-background">
        <ul className="container-site grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4">
          {principles.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm font-semibold text-navy">
              <Icon className="size-5 shrink-0 text-cta" aria-hidden /> {label}
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="container-site py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Gas &amp; Heating Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From resolving heating issues to planning a new installation, get in touch to discuss the work you need.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-soft transition-shadow hover:shadow-lift">
              <div className="overflow-hidden">
                <img src={images[s.image]} alt={imageAlt[s.image]} loading="lazy" width={1024} height={768}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                <Link to="/services" hash={s.id} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cta">
                  Find Out More <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-warm">
        <div className="container-site grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <img src={images.radiator} alt={imageAlt.radiator} loading="lazy" width={1280} height={1024}
            className="aspect-[5/4] w-full rounded-xl object-cover shadow-soft" />
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">A Straightforward, Professional Service.</h2>
            <ul className="mt-8 space-y-6">
              {why.map((w) => (
                <li key={w.t} className="border-l-2 border-cta pl-5">
                  <h3 className="font-bold text-navy">{w.t}</h3>
                  <p className="mt-1 text-muted-foreground">{w.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-site py-16 md:py-24">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Three simple steps</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="bg-background p-7">
              <span className="font-display text-4xl font-extrabold text-cta/70">{s.n}</span>
              <h3 className="mt-4 text-xl font-bold text-navy">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Service area */}
      <section className="border-t bg-warm">
        <div className="container-site grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-20">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">Local Gas &amp; Heating Services in Glasgow</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Based in the Glasgow area. If you're not sure whether your property is covered, get in touch and we'll let you know.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-navy">Check Your Area</Link>
              <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">View on Google Maps</a>
            </div>
          </div>
          <iframe
            title="Map showing the Glasgow area"
            src={business.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-xl border shadow-soft grayscale-[35%] md:h-80"
          />
        </div>
      </section>

      {/* Reviews: only genuine reviews from config */}
      <section className="container-site py-16 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Reviews</p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">What customers say</h2>
            {business.reviews.length === 0 && (
              <p className="mt-4 text-muted-foreground">Read genuine reviews from customers on our Google Business profile.</p>
            )}
          </div>
          <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline self-start">
            <Star className="size-4 text-cta" aria-hidden /> Read reviews on Google
          </a>
        </div>
        {business.reviews.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {business.reviews.map((r) => (
              <figure key={r.name + r.date} className="rounded-lg border p-6 shadow-soft">
                <div className="flex gap-0.5 text-cta" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
                </div>
                <blockquote className="mt-4 leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">{r.name} · {r.date}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
