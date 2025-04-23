/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    images: {
      // Correct domain configuration for GCP
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          port: '',
          pathname: '/moviebucket4/**',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        }
      ],
      
      // Modern image formats
      formats: ['image/webp', 'image/avif'],
      
      // Device sizes
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
      
      // Image sizes
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      
      // Cache settings
      minimumCacheTTL: 3600,
      
      // SVG handling
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
  
    // Enable compression
    compress: true,
  
    // Disable source maps in production
    productionBrowserSourceMaps: false,
  
    // Cache headers
    async headers() {
      return [
        {
          source: '/(.*).(jpg|jpeg|png|gif|webp|avif|ico|svg)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable'
            }
          ]
        }
      ]
    },
  
    // Webpack optimizations
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxSize: 244 * 1024,
        };
      }
      return config;
    }
  };
  
  // ES Modules export
  export default nextConfig;