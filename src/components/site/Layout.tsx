import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Menu, Phone, X, MapPin } from "lucide-react";
import { business, phoneHref, emailHref } from "@/config/business";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${business.name} – home`}>
      <span className={`grid size-9 place-items-center rounded-md ${light ? "bg-navy-foreground text-navy" : "bg-navy text-navy-foreground"}`}>
        <Flame className="size-5" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="font-display leading-none">
        <span className={`block text-[0.95rem] font-bold tracking-tight ${light ? "text-navy-foreground" : "text-navy"}`}>
          Gas Repair &amp; Installation
        </span>
        <span className={`mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${light ? "text-navy-muted" : "text-muted-foreground"}`}>
          Services · Glasgow
        </span>
      </span>
    </Link>
  );
}

/** Calls if a phone number is configured; otherwise sends visitors to the contact page. */
export function CallButton({ className = "btn btn-outline", label = "Call Us" }: { className?: string; label?: string }) {
  if (phoneHref)
    return (
      <a href={phoneHref} className={className}>
        <Phone className="size-4" aria-hidden /> {label}
      </a>
    );
  return (
    <Link to="/contact" className={className}>
      <Phone className="size-4" aria-hidden /> {label}
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-navy data-[status=active]:text-navy"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {business.phone && (
            <a href={phoneHref} className="flex items-center gap-2 text-sm font-semibold text-navy">
              <Phone className="size-4" aria-hidden /> {business.phone}
            </a>
          )}
          <Link to="/contact" className="btn btn-cta min-h-11">Get a Quote</Link>
        </div>
        <button
          className="grid size-11 place-items-center rounded-md text-navy md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background md:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                className="py-3 text-base font-medium text-foreground data-[status=active]:text-cta"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-cta mt-2">Get a Quote</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep pb-24 text-navy-muted md:pb-0">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Gas and heating services for homes in {business.serviceArea}.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-foreground">Pages</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-navy-foreground">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-foreground">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {business.phone && <li><a href={phoneHref} className="hover:text-navy-foreground">{business.phone}</a></li>}
            {business.email && <li><a href={emailHref} className="hover:text-navy-foreground">{business.email}</a></li>}
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />{business.serviceArea}</li>
            <li><a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-navy-foreground">View on Google Maps</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-site py-5 text-xs">© {new Date().getFullYear()} {business.name}</div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t bg-background p-3 md:hidden">
      <CallButton className="btn btn-outline" />
      <Link to="/contact" className="btn btn-cta">Get a Quote</Link>
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-background focus:p-3">Skip to content</a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <MobileBar />
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container-site flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold md:text-4xl">Need Help With Your Gas or Heating System?</h2>
          <p className="mt-4 text-navy-muted">Get in touch to discuss your requirements and find out about the next steps.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn btn-cta">Request a Quote</Link>
          <CallButton className="btn btn-ghost-light" />
        </div>
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="border-b bg-warm">
      <div className="container-site py-14 md:py-20">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal mt-3 max-w-3xl text-4xl font-bold text-navy md:text-5xl">{title}</h1>
        {children && <div className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
