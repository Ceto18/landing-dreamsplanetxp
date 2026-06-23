import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    allowedDevOrigins: ['192.168.1.2','100.118.17.91'],
    output: 'export',
    images: {
        unoptimized: true,
    },
}

export default nextConfig