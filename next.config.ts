import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/aboutus',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/privacypolicy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/contactus',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/enquire',
        destination: '/start-project',
        permanent: true,
      },
      {
        source: '/start-a-project',
        destination: '/start-project',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/awards',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
