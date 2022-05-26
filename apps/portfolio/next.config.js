/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'i.scdn.co',
      'images.unsplash.com',
      'api.unsplash.com',
      'unsplash.com',
      's3.us-west-2.amazonaws.com',
      's3-us-west-2.amazonaws.com',
      'res.cloudinary.com',
      'github.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ]
  },
  experimental: {
    images: {
      layoutRaw: true
    }
  }
}

module.exports = nextConfig
