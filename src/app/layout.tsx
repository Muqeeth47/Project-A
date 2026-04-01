import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "pRojEctCaSE | Text Laboratory",
    description: "A developer-grade text transformation and encoding playground. Encode/decode Base64, URL, Hex, Morse code. Transform text with regex, case converters, and generators. Free online developer tools with a hand-drawn aesthetic.",
    keywords: [
        "text encoder", "text decoder", "base64 encoder", "base64 decoder",
        "URL encoder", "hex converter", "morse code", "ROT13", "binary converter",
        "text transformer", "case converter", "regex tool", "password generator",
        "UUID generator", "ASCII art generator", "developer tools", "online text tools",
        "string manipulation", "text playground", "pRojEctCaSE",
    ],
    authors: [{ name: "pRojEctCaSE" }],
    creator: "pRojEctCaSE",
    applicationName: "pRojEctCaSE",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        type: "website",
        title: "pRojEctCaSE | Text Laboratory",
        description: "Encode, decode, and transform text with developer-grade tools. Base64, URL, Hex, Morse code, regex, case converters, password generators and more.",
        siteName: "pRojEctCaSE",
    },
    twitter: {
        card: "summary_large_image",
        title: "pRojEctCaSE | Text Laboratory",
        description: "Encode, decode, and transform text with developer-grade tools. Base64, URL, Hex, Morse, regex, case converters, and generators.",
    },
    category: "technology",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <meta name="theme-color" content="#fdfbf7" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Kalam:wght@700&family=Patrick+Hand&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
