// Configuration options for Next.js
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

// Configuration object tells the next-pwa plugin
const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the PWA files
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
  display: 'standalone',
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
