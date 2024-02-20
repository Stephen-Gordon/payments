// @ts-check
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  cacheOnFrontEndNav: true,
  swSrc: 'src/app/sw.ts', // Path to your service worker file, default: 'src/app/sw.js
  swDest: 'public/sw.js',
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default withSerwist(nextConfig);
