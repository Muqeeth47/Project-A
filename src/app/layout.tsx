import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "pRojEctCaSE | Text Laboratory",
    description: "A developer-grade text transformation and encoding playground with a hand-drawn aesthetic.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
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
