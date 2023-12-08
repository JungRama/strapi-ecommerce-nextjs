/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_HOST_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME,
        port: '',
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
