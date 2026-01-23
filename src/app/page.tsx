"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SketchButton } from "@/components/SketchButton";
import { SketchCard } from "@/components/SketchCard";
import { MoveRight, Zap, Code, PenTool, Hash } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden">
            {/* Decorative scribbles */}
            <div className="absolute top-10 left-10 text-marker-blue opacity-20 -rotate-12 hidden md:block">
                <Zap size={120} strokeWidth={1} />
            </div>
            <div className="absolute bottom-20 right-10 text-marker-red opacity-20 rotate-12 hidden md:block">
                <Code size={120} strokeWidth={1} />
            </div>

            <div className="z-10 text-center max-w-4xl">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-heading text-7xl md:text-9xl mb-4 tracking-tighter"
                >
                    pRojEctCaSE
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-body text-2xl md:text-3xl mb-12 text-pencil/70"
                >
                    A clean, developer-grade text transformation & encoding laboratory.
                </motion.p>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    <Link href="/lab">
                        <SketchButton size="lg" variant="accent" className="flex items-center gap-4">
                            Enter Lab <MoveRight />
                        </SketchButton>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
                    <SketchCard decoration="tack" title="Encoders" rotate={-1}>
                        <p className="font-body text-xl">Base64, URL, ROT13, Hex, Morse, and Binary conversion with auto-detection.</p>
                    </SketchCard>

                    <SketchCard decoration="tape" title="Transformers" rotate={1}>
                        <p className="font-body text-xl">Regex find/replace, case changes, line numbering, and whitespace cleanup.</p>
                    </SketchCard>

                    <SketchCard title="Generators" rotate={-0.5}>
                        <p className="font-body text-xl">Strong passwords, UUIDs, roll numbers, and high-quality test data.</p>
                    </SketchCard>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 opacity-50 font-mono text-sm">
                [ ver 1.0.0 ] • Built for developers with &lt;3 and ink.
            </footer>
        </main>
    );
}
