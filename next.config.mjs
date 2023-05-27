await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images : {domains : ['lh3.googleusercontent.com']},
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
