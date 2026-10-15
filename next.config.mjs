/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secuedge.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      // Retired and unapproved models (copy deck §1.3) → current lineup.
      { source: "/products/frontier/se50p", destination: "/frontier/appliances", permanent: true },
      { source: "/products/frontier/se2500p", destination: "/frontier/appliances", permanent: true },
      { source: "/products/frontier/se5000p", destination: "/frontier/appliances", permanent: true },
      { source: "/products/frontier/se10000p", destination: "/frontier/appliances", permanent: true },
      { source: "/products/frontier/se15000p", destination: "/frontier/appliances", permanent: true },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    ];

    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
