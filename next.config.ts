import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            { source: "/lab", destination: "/encode", permanent: false },
        ];
    },
};

export default nextConfig;
