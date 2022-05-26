/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['api.twitch.tv', 'static-cdn.jtvnw.net']
  }
}

module.exports = nextConfig
