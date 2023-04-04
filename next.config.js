/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images : {
    domains :["encrypted-tbn0.gstatic.com",
     "aiimagegeneratorap8c8b6a.blob.core.windows.net"],
  }
}

module.exports = nextConfig

