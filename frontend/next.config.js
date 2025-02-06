/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '**',
      },
    ],
    domains: ['media.valorant-api.com'],
    unoptimized: true,
  },
  env: {
    HENRIKDEV_API_KEY: process.env.HENRIKDEV_API_KEY,
  },
}

module.exports = nextConfig
