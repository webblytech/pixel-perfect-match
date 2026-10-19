/**
 * Central business information. Leave a value as an empty string until the
 * owner has confirmed it — the site hides or adapts anything left blank.
 */
export const business = {
  name: "Gas Repair & Installation Services",
  shortName: "Gas Repair & Installation",
  /** Display format, e.g. "0141 123 4567". UNCONFIRMED — leave blank until verified. */
  phone: "",
  /** UNCONFIRMED — leave blank until verified. */
  email: "",
  /** Only add if the owner is happy for it to be public. */
  address: "",
  locality: "Glasgow",
  region: "Scotland",
  serviceArea: "Glasgow and surrounding areas",
  /** e.g. [{ days: "Monday – Friday", hours: "8:00am – 5:00pm" }] once confirmed. */
  openingHours: [] as { days: string; hours: string }[],
  /** Verified registrations only, e.g. Gas Safe number once confirmed. */
  registrations: [] as string[],
  googleMapsUrl:
    "https://www.google.com/maps/place/Gas+Repair+%26+Installation+Services/@55.8613076,-4.3789071,17z/",
  mapEmbedUrl: "https://www.google.com/maps?q=55.8613076,-4.3789071&z=13&output=embed",
  /** Production domain for canonical URLs, e.g. "https://www.example.co.uk". */
  siteUrl: "",
  /** Add genuine Google reviews only. */
  reviews: [] as { name: string; date: string; rating: number; text: string }[],
};

export const phoneHref = business.phone ? `tel:${business.phone.replace(/\s+/g, "")}` : "";
export const emailHref = business.email ? `mailto:${business.email}` : "";

export type ServiceId = "boiler-repairs" | "boiler-installation" | "boiler-servicing" | "gas-work";

export const services: {
  id: ServiceId;
  title: string;
  summary: string;
  image: "hero" | "radiator" | "pipework" | "hob";
  involves: string;
  when: string[];
}[] = [
  {
    id: "boiler-repairs",
    title: "Boiler Repairs",
    summary: "Help with boiler faults, pressure problems and heating that isn't working as it should.",
    image: "hero",
    involves:
      "A repair visit starts with finding out what's actually wrong. The boiler and controls are checked, the fault is explained in plain terms, and the options for putting it right are discussed before any work goes ahead.",
    when: [
      "No heating or hot water",
      "Fault codes or warning lights on the boiler",
      "Pressure dropping or unusual noises",
      "Radiators not heating evenly",
    ],
  },
  {
    id: "boiler-installation",
    title: "Boiler Installation",
    summary: "Discuss options for installing a new boiler or replacing an ageing one.",
    image: "pipework",
    involves:
      "Installing or replacing a boiler is a considered decision. The work starts with a conversation about your home, how you use heating and hot water, and what type of system suits the property, followed by a clear quotation.",
    when: [
      "Your current boiler is old or unreliable",
      "Repairs are becoming frequent",
      "You're renovating or changing your heating layout",
      "You'd like to discuss a different type of system",
    ],
  },
  {
    id: "boiler-servicing",
    title: "Boiler Servicing",
    summary: "Routine servicing and maintenance to help keep your boiler running safely.",
    image: "radiator",
    involves:
      "A service involves inspecting, cleaning and checking the boiler and its components, so small issues can be spotted early. You'll be told what was checked and whether anything needs attention.",
    when: [
      "It's been a year or more since the last service",
      "Before the colder months arrive",
      "You've moved into a new property",
      "Your manufacturer's warranty requires regular servicing",
    ],
  },
  {
    id: "gas-work",
    title: "Gas Installation & Repairs",
    summary: "Installation and repair of gas appliances and pipework in the home.",
    image: "hob",
    involves:
      "This covers gas-related work such as fitting appliances and repairing gas supplies within the home. All gas work must be carried out by a suitably registered engineer — get in touch to discuss what you need.",
    when: [
      "Fitting or replacing a gas hob or cooker",
      "Moving or extending gas pipework",
      "Issues with an existing gas appliance",
      "Disconnecting an appliance safely",
    ],
  },
];
