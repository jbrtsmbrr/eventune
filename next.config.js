/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "encrypted-tbn0.gstatic.com"
      },
      {
        protocol: "https",
        hostname: "utfs.io" // Uploadthing
      },
      {
        protocol: "https",
        hostname: "i.scdn.co" // Spotify API
      },
    ]
  },
  env: {
    NEXT_PUPLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUPLIC_SPOTIFY_CLIENT_ID,
    NEXT_PUPLIC_SPOTIFY_SECRET: process.env.NEXT_PUPLIC_SPOTIFY_SECRET
  }
}

module.exports = nextConfig
