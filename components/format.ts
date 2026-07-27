// Tiny formatting helpers safe to import from client components
// (no dependency on the dataset). Locale-aware variants live in lib/i18n —
// prefer those; these remain for call sites that only need a raw grouping.
export const fmtNum = (n: number, intl = "ru-RU") => n.toLocaleString(intl);

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}
