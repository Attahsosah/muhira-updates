/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "firebasestorage.googleapis.com", "media.discordapp.net","i.ibb.co"],
  },
};

module.exports = nextConfig;
