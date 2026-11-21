const isDev = process.env.NODE_ENV !== "production";
// The Vercel toolbar is injected on preview deployments and loads from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";
const vercelLive = isPreview ? " https://vercel.live" : "";

// The site is fully static, so inline scripts are allowed instead of nonces
// (nonces would force every page to render on each request).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob: https://*.tile.openstreetmap.org${vercelLive} https://vercel.com`,
  `font-src 'self'${vercelLive} https://assets.vercel.com`,
  `connect-src 'self'${vercelLive}${isPreview ? " wss://ws-us3.pusher.com" : ""}`,
  `frame-src 'self'${vercelLive}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Files in /public aren't fingerprinted, so cache them for a day and
        // let the CDN serve stale while it revalidates.
        source: "/:file(.*\\.(?:png|jpg|jpeg|webp|svg|ico))",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // The browser must always see the latest worker, or a fix to it would take a day to roll out.
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
