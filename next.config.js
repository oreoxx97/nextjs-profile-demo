/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // ปิด experimental บางอย่างถ้ามี
  experimental: {
    // serverActions: false,
  },
};

module.exports = nextConfig;
