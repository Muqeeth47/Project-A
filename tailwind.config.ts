import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: {
                    light: "#fdfbf7",
                    muted: "#e5e0d8",
                },
                pencil: {
                    DEFAULT: "#2d2d2d",
                    muted: "rgba(45, 45, 45, 0.4)",
                },
                marker: {
                    red: "#ff4d4d",
                    blue: "#2d5da1",
                    yellow: "#fff9c4",
                },
            },
            fontFamily: {
                heading: ["Kalam", "sans-serif"],
                body: ["Patrick Hand", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            boxShadow: {
                hard: "4px 4px 0px 0px #2d2d2d",
                "hard-lg": "8px 8px 0px 0px #2d2d2d",
                "hard-sm": "2px 2px 0px 0px #2d2d2d",
                "hard-blue": "4px 4px 0px 0px #2d5da1",
            },
            borderRadius: {
                wobbly: "255px 15px 225px 15px / 15px 225px 15px 255px",
                wobblyMd: "15px 225px 15px 255px / 255px 15px 225px 15px",
            },
            animation: {
                bounce: "bounce 3s infinite",
                jiggle: "jiggle 0.3s ease-in-out infinite",
            },
            keyframes: {
                jiggle: {
                    "0%, 100%": { transform: "rotate(-1deg)" },
                    "50%": { transform: "rotate(1deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
