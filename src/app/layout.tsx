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
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
