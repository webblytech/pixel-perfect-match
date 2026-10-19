import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Clock, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { PageIntro, SiteLayout } from "@/components/site/Layout";
import { business, emailHref, phoneHref, services } from "@/config/business";
import { pageMeta } from "@/lib/seo";

type Search = { service?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  head: () =>
    pageMeta(
      "Contact & Request a Quote | Gas Engineer Glasgow",
      "Get in touch about boiler repairs, installation, servicing or gas work in Glasgow. Send an enquiry to request a quote.",
      "/contact",
    ),
  component: Contact,
});

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "message", string>>;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get("name") || "").trim();
  const phone = String(f.get("phone") || "").trim();
  const email = String(f.get("email") || "").trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  if (!/^[+\d][\d\s()-]{9,}$/.test(phone)) e.phone = "Please enter a valid UK telephone number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address.";
  if (!f.get("service")) e.service = "Please choose a service.";
  if (String(f.get("message") || "").trim().length < 10) e.message = "Please add a few details (at least 10 characters).";
  return e;
}

const field = "mt-1.5 block w-full min-h-12 rounded-md border border-input bg-background px-3.5 py-2.5 text-base outline-none focus:border-cta focus:ring-2 focus:ring-cta/25 aria-[invalid=true]:border-destructive";

function Contact() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "not-connected">("idle");

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(new FormData(ev.currentTarget));
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus("idle");
      ev.currentTarget.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    // No sending service is connected yet — be honest rather than fake a submission.
    setStatus("not-connected");
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <SiteLayout>
      <PageIntro eyebrow="Contact" title="Request a Quote or Ask a Question">
        Tell us what you need help with and we'll get back to you to discuss the next steps.
      </PageIntro>

      <section className="container-site grid gap-12 py-14 md:grid-cols-[1fr_1.4fr] md:py-20">
        <aside className="space-y-6">
          <ul className="space-y-5">
            {business.phone && (
              <li className="flex gap-4"><Phone className="mt-1 size-5 text-cta" aria-hidden />
                <div><p className="text-sm text-muted-foreground">Telephone</p><a href={phoneHref} className="text-lg font-semibold text-navy">{business.phone}</a></div></li>
            )}
            {business.email && (
              <li className="flex gap-4"><Mail className="mt-1 size-5 text-cta" aria-hidden />
                <div><p className="text-sm text-muted-foreground">Email</p><a href={emailHref} className="font-semibold text-navy">{business.email}</a></div></li>
            )}
            {business.openingHours.length > 0 && (
              <li className="flex gap-4"><Clock className="mt-1 size-5 text-cta" aria-hidden />
                <div><p className="text-sm text-muted-foreground">Opening hours</p>
                  {business.openingHours.map((h) => <p key={h.days} className="font-medium">{h.days}: {h.hours}</p>)}</div></li>
            )}
            <li className="flex gap-4"><MapPin className="mt-1 size-5 text-cta" aria-hidden />
              <div><p className="text-sm text-muted-foreground">Service area</p><p className="font-semibold text-navy">{business.serviceArea}</p>
                <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-cta underline underline-offset-4">View on Google Maps</a></div></li>
          </ul>
          {!business.phone && !business.email && (
            <p className="rounded-md border bg-warm p-4 text-sm text-muted-foreground">
              Phone and email details are being confirmed and will appear here shortly. In the meantime you can find the business on Google Maps.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            If you smell gas or suspect a leak, leave the property and call the National Gas Emergency Service on <a href="tel:08001119999" className="font-semibold text-navy underline">0800 111 999</a>.
          </p>
        </aside>

        <form noValidate onSubmit={onSubmit} className="rounded-xl border bg-card p-6 shadow-soft md:p-8" aria-label="Enquiry form">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium sm:col-span-2">Full name *
              <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-err" />{err("name")}</label>
            <label className="block text-sm font-medium">Telephone *
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} aria-invalid={!!errors.phone} aria-describedby="phone-err" />{err("phone")}</label>
            <label className="block text-sm font-medium">Email <span className="text-muted-foreground">(optional)</span>
              <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-err" />{err("email")}</label>
            <label className="block text-sm font-medium sm:col-span-2">Service required *
              <select name="service" defaultValue={services.find((s) => s.id === service)?.title ?? ""} className={field} aria-invalid={!!errors.service} aria-describedby="service-err">
                <option value="" disabled>Choose a service</option>
                {services.map((s) => <option key={s.id}>{s.title}</option>)}
                <option>Something else / not sure</option>
              </select>{err("service")}</label>
            <label className="block text-sm font-medium sm:col-span-2">Brief description *
              <textarea name="message" rows={5} placeholder="What's the issue, or what work are you planning?" className={field} aria-invalid={!!errors.message} aria-describedby="message-err" />{err("message")}</label>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">Preferred contact method</legend>
              <div className="mt-2 flex flex-wrap gap-5">
                {["Phone call", "Text message", "Email"].map((m, i) => (
                  <label key={m} className="flex min-h-11 items-center gap-2 text-sm">
                    <input type="radio" name="method" value={m} defaultChecked={i === 0} className="size-4 accent-cta" /> {m}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {status === "not-connected" && (
            <div role="status" className="mt-6 flex gap-3 rounded-md border border-cta/30 bg-accent p-4 text-sm text-accent-foreground">
              <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
              <p>Thanks — your details look good. Online enquiries aren't switched on yet, so this message hasn't been sent. Please contact the business via its Google Maps listing for now.</p>
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive"><AlertCircle className="size-4" aria-hidden /> Please check the highlighted fields.</p>
          )}

          <button type="submit" className="btn btn-cta mt-6 w-full sm:w-auto"><CheckCircle2 className="size-4" aria-hidden /> Send Enquiry</button>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Your details are only used to respond to your enquiry and will not be shared with third parties.
          </p>
        </form>
      </section>
    </SiteLayout>
  );
}
