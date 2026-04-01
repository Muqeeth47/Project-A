"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SketchButton } from "@/components/SketchButton";
import { SketchCard } from "@/components/SketchCard";
import { MoveRight, Zap, Code, PenTool, Hash } from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 overflow-hidden">
            {/* Decorative scribbles — purely visual, hidden from screen readers */}
            <div className="absolute top-10 left-10 text-marker-blue opacity-20 -rotate-12 hidden md:block" aria-hidden="true">
                <Zap size={120} strokeWidth={1} />
            </div>
            <div className="absolute bottom-20 right-10 text-marker-red opacity-20 rotate-12 hidden md:block" aria-hidden="true">
                <Code size={120} strokeWidth={1} />
            </div>

            <div className="z-10 text-center max-w-4xl w-full">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-heading text-5xl sm:text-7xl md:text-9xl mb-4 tracking-tighter"
                >
                    pRojEctCaSE
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-body text-xl sm:text-2xl md:text-3xl mb-8 md:mb-12 text-pencil/70"
                >
                    Don&apos;t forget to check out the easter eggs 😉 !
                </motion.p>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-6 md:gap-8 justify-center items-center"
                >
                    <Link href="/lab" aria-label="Enter the text lab">
                        <SketchButton size="lg" variant="accent" className="flex items-center gap-4">
                            Enter Lab <MoveRight aria-hidden="true" />
                        </SketchButton>
                    </Link>

                    <nav aria-label="Quick access to lab sections">
                        <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                            <Link href="/encode"><SketchButton size="lg" variant="primary">Encode</SketchButton></Link>
                            <Link href="/text"><SketchButton size="lg" variant="primary">Text</SketchButton></Link>
                            <Link href="/ascii"><SketchButton size="lg" variant="primary">ASCII</SketchButton></Link>
                            <Link href="/devtools"><SketchButton size="lg" variant="primary">Dev Tools</SketchButton></Link>
                            <Link href="/generators"><SketchButton size="lg" variant="primary">Generators</SketchButton></Link>
                            <Link href="/secrets"><SketchButton size="lg" variant="secondary">Secrets</SketchButton></Link>
                        </div>
                    </nav>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-24 text-left">
                    <Link href="/encode" aria-label="Go to Encoders — Base64, URL, ROT13, Hex, Morse, Binary">
                        <SketchCard decoration="tack" title="Encoders" rotate={-1} className="h-full hover:scale-[1.02] transition-transform cursor-pointer">
                            <p className="font-body text-lg md:text-xl">Base64, URL, ROT13, Hex, Morse, and Binary conversion with auto-detection.</p>
                        </SketchCard>
                    </Link>

                    <Link href="/text" aria-label="Go to Transformers — regex, case converters, line tools">
                        <SketchCard decoration="tape" title="Transformers" rotate={1} className="h-full hover:scale-[1.02] transition-transform cursor-pointer">
                            <p className="font-body text-lg md:text-xl">Regex find/replace, case changes, line numbering, and whitespace cleanup.</p>
                        </SketchCard>
                    </Link>

                    <Link href="/generators" aria-label="Go to Generators — passwords, UUIDs, test data" className="sm:col-span-2 md:col-span-1">
                        <SketchCard title="Generators" rotate={-0.5} className="h-full hover:scale-[1.02] transition-transform cursor-pointer">
                            <p className="font-body text-lg md:text-xl">Strong passwords, UUIDs, roll numbers, and high-quality test data.</p>
                        </SketchCard>
                    </Link>
                </div>
            </div>

            <footer className="mt-10 md:mt-20 opacity-50 font-mono text-sm" role="contentinfo">
                [ ver 1.0.0 ] • Built for developers with &lt;3 and ink.
            </footer>
        </main>
    );
}
