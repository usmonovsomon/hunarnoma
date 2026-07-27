import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale, matchLocale } from "@/lib/i18n/config";

const LOCALE_COOKIE = "rohnamo_locale";

/**
 * Every page lives under /<locale>/…, so a request without a locale segment is
 * redirected to one: the visitor's remembered choice if there is one, otherwise
 * their Accept-Language preference, otherwise Russian.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const first = pathname.split("/")[1];
  if (isLocale(first)) {
    // Remember the locale so a later visit to "/" lands in the same language.
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      response.cookies.set(LOCALE_COOKIE, first, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = remembered && isLocale(remembered)
    ? remembered
    : matchLocale(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the metadata routes and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export { LOCALES, LOCALE_COOKIE };
