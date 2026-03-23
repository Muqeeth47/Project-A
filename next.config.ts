import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            { source: "/encode", destination: "/lab?feature=encode", permanent: false },
            { source: "/text", destination: "/lab?feature=text", permanent: false },
            { source: "/ascii", destination: "/lab?feature=ascii", permanent: false },
            { source: "/devtools", destination: "/lab?feature=devtools", permanent: false },
            { source: "/generators", destination: "/lab?feature=generators", permanent: false },
            { source: "/secrets", destination: "/lab?feature=secrets", permanent: false },
        ];
    },
};

export default nextConfig;
