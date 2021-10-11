const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const env = {
    API_HOST: isDev ? "http://localhost:4000" : "https://api.zzal.me",
    SERVICE_HOST: isDev ? "http://localhost:3000" : "https://zzal.me",
  };

  const result = {
    env,
    reactStrictMode: true,
    images: {
      domains: ["amazonaws.com"],
      minimumCacheTTL: 9999999999,
    },
  };

  return result;
};
