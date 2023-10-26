/* eslint-disable @typescript-eslint/require-await */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/invite",
        destination:
          "https://discord.com/api/oauth2/authorize?client_id=1029899066911490158&permissions=413390915648&scope=applications.commands%20bot",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default config;
