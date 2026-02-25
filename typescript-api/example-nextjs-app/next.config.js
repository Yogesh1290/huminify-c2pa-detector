/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Serverless configuration for Vercel
  output: 'standalone',
  // API routes configuration
  api: {
    bodyParser: false,
  },
}

module.exports = nextConfig
