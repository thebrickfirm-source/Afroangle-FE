import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore API, Next internals, and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (locales.includes(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
