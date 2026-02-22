"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SketchCard } from "@/components/SketchCard";
import { SketchButton } from "@/components/SketchButton";
import { ArrowLeft, Copy } from "lucide-react";
import { copyToClipboard } from "@/core/utils";

export default function EasterEggsPage() {
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

    const handleCopyCommand = async (command: string) => {
        const ok = await copyToClipboard(command);
        if (ok) {
            setCopiedCommand(command);
            setTimeout(() => setCopiedCommand(null), 2000);
        }
    };

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
                        "Because every fun project deserves hidden chaos."
                    </p>
                </motion.div>

                {/* Easter Eggs List */}
                <SketchCard decoration="tape" className="bg-[#fff9c4]/30 text-left p-4 md:p-6">
                    <p className="font-heading text-base md:text-xl text-pencil mb-3 md:mb-4">Type these in the Lab input</p>
                    <ul className="space-y-4 md:space-y-6 font-body text-base md:text-xl list-none">
                        <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                            <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                <span className="text-xl md:text-2xl mt-0.5 shrink-0">🦇</span>
                                <span className="min-w-0">Type: <strong className="font-heading text-marker-blue">i am batman</strong> → Dark mode + "Then act like it."</span>
                            </span>
                            <button type="button" onClick={() => handleCopyCommand("i am batman")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "i am batman" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                            <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                <span className="text-xl md:text-2xl mt-0.5 shrink-0">🐱</span>
                                <span className="min-w-0">Type: <strong className="font-heading text-orange-600">meow</strong> → Orange cat mode</span>
                            </span>
                            <button type="button" onClick={() => handleCopyCommand("meow")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "meow" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex gap-2 md:gap-3 items-start">
                            <span className="text-xl md:text-2xl mt-0.5 shrink-0">🎯</span>
                            <span className="min-w-0">Click the pRojEctCaSE logo <strong className="font-heading text-marker-red">3 times</strong> → It gets angry + ASCII logo</span>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                            <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                <span className="text-xl md:text-2xl mt-0.5 shrink-0">🧠</span>
                                <span className="min-w-0">Type: <strong className="font-heading text-green-600">sudo make me cool</strong> → "You were already cool 😎"</span>
                            </span>
                            <button type="button" onClick={() => handleCopyCommand("sudo make me cool")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "sudo make me cool" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                            <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                <span className="text-xl md:text-2xl mt-0.5 shrink-0">🌀</span>
                                <span className="min-w-0">Type: <strong className="font-heading text-purple-600">infinite void</strong> → Full-page video overlay</span>
                            </span>
                            <button type="button" onClick={() => handleCopyCommand("infinite void")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "infinite void" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                            <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                <span className="text-xl md:text-2xl mt-0.5 shrink-0">🔴</span>
                                <span className="min-w-0">Type: <strong className="font-heading text-red-700">Fukuma Mizushi</strong> → Sukuna video overlay</span>
                            </span>
                            <button type="button" onClick={() => handleCopyCommand("Fukuma Mizushi")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "Fukuma Mizushi" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
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
