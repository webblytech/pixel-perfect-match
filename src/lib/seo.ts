import { business } from "@/config/business";

export function pageMeta(title: string, description: string, path: string) {
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  const links = business.siteUrl ? [{ rel: "canonical", href: `${business.siteUrl}${path}` }] : [];
  return { meta, links };
}

/** LocalBusiness data built only from configured (verified) values. */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: business.name,
    areaServed: business.locality,
    hasMap: business.googleMapsUrl,
  };
  if (business.phone) data.telephone = business.phone;
  if (business.email) data.email = business.email;
  if (business.siteUrl) data.url = business.siteUrl;
  if (business.address)
    data.address = { "@type": "PostalAddress", streetAddress: business.address, addressLocality: business.locality, addressCountry: "GB" };
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
