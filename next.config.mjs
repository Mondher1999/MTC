/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Increase body size limit for Server Actions (if using server actions)
    serverActions: {
      bodySizeLimit: '10gb', // Set to your max file size
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Remove the 'api' configuration - it's not valid here
};

export default nextConfig;