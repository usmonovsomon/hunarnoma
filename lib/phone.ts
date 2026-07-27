// Phone numbers in the NTC data are local Tajik formats, and a single field can
// hold several numbers separated by a comma *or* just a space:
//   "(3522) 2-48-31"
//   "(3422) 6-52-73, (3422) 6-47-39"
//   "(44) 600-39-12 (44) 600-39-77"
// This turns them into { display, href } pairs so they can be rendered as
// tap-to-call links.

const COUNTRY_CODE = "992";
/** Tajik national numbers are 9 digits after the country code. */
const NATIONAL_DIGITS = 9;

export interface PhoneLink {
  /** Human-readable form, as printed in the source. */
  display: string;
  /** `tel:` URL, or null when the number can't be normalised confidently. */
  href: string | null;
}

/** One number: "(3422) 6-52-73" or a bare "+992 37 221 90 04". */
const ONE_NUMBER = /(\+?\d{1,3}[\s-]*)?\(?\s*\d{2,4}\s*\)?[\s-]*\d[\d\s-]{4,}/g;

export function parsePhones(raw: string | null | undefined): PhoneLink[] {
  if (!raw) return [];
  const out: PhoneLink[] = [];
  const seen = new Set<string>();

  for (const match of raw.matchAll(ONE_NUMBER)) {
    const display = match[0].trim().replace(/[\s,;]+$/, "");
    if (!display) continue;

    const href = toTelHref(display);
    // De-duplicate on the normalised number when we have one, on the text otherwise.
    const key = href ?? display;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ display, href });
  }
  return out;
}

/** "(3422) 6-52-73" -> "tel:+992342265273" */
export function toTelHref(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (!digits) return null;

  // Already international: 992 + 9 digits, or a leading 8/0 trunk prefix.
  if (digits.length === NATIONAL_DIGITS + COUNTRY_CODE.length && digits.startsWith(COUNTRY_CODE)) {
    return `tel:+${digits}`;
  }
  if (digits.length === NATIONAL_DIGITS + 1 && (digits.startsWith("8") || digits.startsWith("0"))) {
    digits = digits.slice(1);
  }
  if (digits.length !== NATIONAL_DIGITS) return null; // unexpected shape — render as plain text
  return `tel:+${COUNTRY_CODE}${digits}`;
}
