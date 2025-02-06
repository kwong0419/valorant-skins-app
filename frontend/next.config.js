/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
  },
  env: {
    HENRIKDEV_API_KEY: process.env.HENRIKDEV_API_KEY,
  },
}

module.exports = nextConfig
