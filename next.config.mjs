/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          pathname: '/moviebucket4/**',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**',
        },
      ],
      formats: ['image/webp', 'image/avif'],
      deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 86400,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  
    compress: true,
    productionBrowserSourceMaps: false,
  
    async headers() {
      return [
        {
          source: '/:path*\\.(jpg|jpeg|png|gif|webp|avif|ico|svg)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=600, stale-while-revalidate=30',
            },
          ],
        },
      ];
    },
  
    experimental: {
      optimizeCss: true,
      modularizeImports: {
        'lucide-react': {
          transform: 'lucide-react/lib/icons/{{member}}',
        },
      },
    },
  
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxSize: 244 * 1024,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  