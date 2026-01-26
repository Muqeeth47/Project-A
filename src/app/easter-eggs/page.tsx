"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SketchCard } from "@/components/SketchCard";
import { SketchButton } from "@/components/SketchButton";
import { ArrowLeft } from "lucide-react";

export default function EasterEggsPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-[#fdfbf7]">
            <div className="max-w-3xl w-full flex flex-col gap-10 text-center">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                >
                    <h1 className="font-heading text-5xl md:text-6xl text-pencil">
                        🪺 Easter Eggs & Secrets
                    </h1>
                    <p className="font-body text-2xl text-pencil/70 italic">
                        “Because every fun project deserves hidden chaos.”
                    </p>
                </motion.div>

                {/* Easter Eggs List */}
                <SketchCard decoration="tape" className="bg-[#fff9c4]/30 text-left">
                    <ul className="space-y-6 font-body text-xl md:text-2xl list-none">
                        <motion.li whileHover={{ x: 5 }} className="flex gap-3 items-start">
                            <span className="text-2xl mt-1">🦇</span>
                            <span>Type: <strong className="font-heading text-marker-blue">i am batman</strong> → Dark mode + “Then act like it.”</span>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex gap-3 items-start">
                            <span className="text-2xl mt-1">🎯</span>
                            <span>Click the pRojEctCaSE logo <strong className="font-heading text-marker-red">3 times</strong> → It gets angry + ASCII logo</span>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex gap-3 items-start">
                            <span className="text-2xl mt-1">🧠</span>
                            <span>Type: <strong className="font-heading text-green-600">sudo make me cool</strong> → “You were already cool 😎”</span>
                        </motion.li>
                    </ul>
                </SketchCard>

                {/* About Section */}
                <div className="font-body text-lg md:text-xl space-y-2 opacity-80">
                    <h2 className="font-heading text-3xl mb-4 text-pencil underline decoration-wavy decoration-marker-yellow">About pRojEctCaSE</h2>
                    <p>Hello there, Iam Shaik Abdul Muqeeth</p>
                    <p>I made this project just to learn Git and GitHub.</p>
                    <p>It was fun.</p>
                    <p>Then it became this.</p>

                    <div className="mt-8 p-6 border-2 border-dashed border-pencil/30 rounded-2xl">
                        <p className="mb-2">If you want to develop this further or mess around with the code:</p>
                        <a
                            href="mailto:muqeethshaikabdul@gmail.com"
                            className="text-marker-blue hover:text-marker-red transition-colors font-bold text-2xl"
                        >
                            📩 muqeethshaikabdul@gmail.com
                        </a>
                        <p className="mt-4 text-sm opacity-70">
                            No pressure.<br />Just code and curiosity.
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/lab">
                        <SketchButton variant="accent" size="lg" className="flex items-center gap-3 mx-auto">
                            <ArrowLeft /> Back to Lab 🧪
                        </SketchButton>
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}
