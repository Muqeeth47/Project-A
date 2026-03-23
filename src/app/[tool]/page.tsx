"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SketchButton } from "@/components/SketchButton";
import { SketchCard } from "@/components/SketchCard";
import { SketchTextarea, SketchInput } from "@/components/SketchInput";
import {
    Copy,
    Download,
    Trash2,
    RefreshCw,
    ChevronRight,
    Hash,
    Binary,
    Type,
    Key,
    Code as CodeIcon,
    Sparkles
} from "lucide-react";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { InstructionToast } from "@/components/InstructionToast";
import Link from "next/link";

// Import logic
import * as Encoders from "@/core/encoders";
import * as Transformers from "@/core/transformers";
import * as Generators from "@/core/generators";
import * as Escapes from "@/core/escapes";
import { generateASCII, getASCIIFonts } from "@/core/ascii";
import { copyToClipboard, downloadFile, getTextStats } from "@/core/utils";

type LabTab = "encode" | "text" | "ascii" | "dev" | "generators" | "easter eggs";

export default function LabPage() {
    const params = useParams();
    const router = useRouter();
    const toolParam = (params?.tool as string || "").toLowerCase();
    const searchParams = useSearchParams();
    const featureParam = (toolParam || (searchParams.get("feature") ?? searchParams.get("tab") ?? "")).toLowerCase().trim();

    const tabFromFeature = (feature: string): LabTab => {
        switch (feature) {
            case "encode":
                return "encode";
            case "text":
                return "text";
            case "ascii":
                return "ascii";
            case "devtools":
            case "dev":
                return "dev";
            case "generators":
                return "generators";
            case "secrets":
            case "easter eggs":
                return "easter eggs";
            default:
                return "encode";
        }
    };

    const [activeTab, setActiveTab] = useState<LabTab>(() => tabFromFeature(featureParam));
    useEffect(() => {
        setActiveTab(tabFromFeature(featureParam));
    }, [featureParam]);

    const handleTabChange = (id: LabTab) => {
        const pathMap: Record<LabTab, string> = {
            "encode": "encode",
            "text": "text",
            "ascii": "ascii",
            "dev": "devtools",
            "generators": "generators",
            "easter eggs": "secrets"
        };
        router.push(`/${pathMap[id]}`);
    };

    const instruction = (() => {
        switch (featureParam) {
            case "encode":
                return {
                    title: "Encode / Decode",
                    text: "Paste text in the Input box, then click an Encode/Decode button (Base64/URL/Binary/Hex/ROT13/Caesar/Auto Decode).",
                };
            case "text":
                return {
                    title: "Text Transformers",
                    text: "Use the buttons to lowercase/UPPERCASE, sentence-case, random-case, reverse, shuffle, spread, number lines, or clean empty lines.",
                };
            case "ascii":
                return { title: "ASCII Art", text: "Pick a font, then click “Generate ASCII Art”." };
            case "devtools":
            case "dev":
                return { title: "Dev Tools", text: "Use JSON/HTML/CSV escape and unescape to safely format your text." };
            case "generators":
                return { title: "Generators", text: "Click generator buttons to create sample data like passwords, UUIDs, roll numbers, and more." };
            case "secrets":
                return { title: "Secrets", text: "Copy the commands below, then paste them into the Lab input (easter eggs use the Input text)." };
            default:
                return null;
        }
    })();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [stats, setStats] = useState({ charCount: 0, wordCount: 0, lineCount: 0 });
    const [copied, setCopied] = useState(false);

    // Tab-specific options
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [asciiFont, setAsciiFont] = useState("Standard");

    // Update stats whenever input changes
    useEffect(() => {
        setStats(getTextStats(input));
    }, [input]);

    const handleCopy = async () => {
        const success = await copyToClipboard(output);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        downloadFile(output, `projectcase-output-${new Date().getTime()}.txt`);
    };

    const clear = () => {
        setInput("");
        setOutput("");
    };

    // Easter Egg State
    const [logoClicks, setLogoClicks] = useState(0);
    const [madnessMode, setMadnessMode] = useState(false);
    const [showInfiniteVoidOverlay, setShowInfiniteVoidOverlay] = useState(false);
    const infiniteVoidVideoRef = useRef<HTMLVideoElement>(null);
    const infiniteVoidAudioRef = useRef<HTMLAudioElement | null>(null);

    const [showSukunaOverlay, setShowSukunaOverlay] = useState(false);
    const sukunaVideoRef = useRef<HTMLVideoElement>(null);

    const [activeTheme, setActiveTheme] = useState<"batman" | "cat" | null>(null);
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

    const handleCopyCommand = async (command: string) => {
        const ok = await copyToClipboard(command);
        if (ok) {
            setCopiedCommand(command);
            setTimeout(() => setCopiedCommand(null), 2000);
        }
    };

    // Normalized input for special prompts (lowercase + trim)
    const normalizedInput = input.toLowerCase().trim();

    // Easter Egg: Check Modes — clear immediately when trigger text is removed or changed
    useEffect(() => {
        const clearModes = () => {
            setActiveTheme(null);
            document.body.classList.remove("batman-mode", "cat-mode");
        };

        if (normalizedInput === "i am batman") {
            setActiveTheme("batman");
            document.body.classList.add("batman-mode");
            new Audio("/audio/batman.mp3").play().catch(() => { });
            const timer = setTimeout(clearModes, 5000);
            return () => clearTimeout(timer);
        }

        if (normalizedInput === "meow") {
            setActiveTheme("cat");
            document.body.classList.add("cat-mode");
            new Audio("/audio/meow.mp3").play().catch(() => { });
            const timer = setTimeout(clearModes, 5000);
            return () => clearTimeout(timer);
        }

        // Input no longer matches any trigger — return to normal mode right away
        clearModes();
    }, [input, normalizedInput]);

    // Easter Egg: Cool Command (Reactive)
    useEffect(() => {
        if (normalizedInput === "sudo make me cool") {
            setOutput("You were already cool 😎");
        }
    }, [input, normalizedInput]);

    // Easter Egg: Infinite Void — full-page video overlay + Gojo audio
    useEffect(() => {
        if (normalizedInput === "infinite void") {
            setShowInfiniteVoidOverlay(true);
        }
    }, [input, normalizedInput]);

    useEffect(() => {
        if (!showInfiniteVoidOverlay) {
            if (infiniteVoidAudioRef.current) {
                infiniteVoidAudioRef.current.pause();
                infiniteVoidAudioRef.current = null;
            }
            return;
        }
        const video = infiniteVoidVideoRef.current;
        if (video) {
            video.currentTime = 0;
            video.muted = true;
            video.play().catch(() => {});
        }
        const audio = new Audio("/audio/Gojo_infinite_void_domain_expansion_128KBPS.mp4");
        infiniteVoidAudioRef.current = audio;
        audio.play().catch(() => {});
        return () => {
            audio.pause();
            infiniteVoidAudioRef.current = null;
        };
    }, [showInfiniteVoidOverlay]);

    // Easter Egg: Fukuma Mizushi — Sukuna full-page video overlay (video’s own audio)
    useEffect(() => {
        if (normalizedInput === "fukuma mizushi") {
            setShowSukunaOverlay(true);
        }
    }, [input, normalizedInput]);

    useEffect(() => {
        if (!showSukunaOverlay) return;
        const video = sukunaVideoRef.current;
        if (video) {
            video.currentTime = 0;
            video.muted = false;
            video.play().catch(() => {});
        }
    }, [showSukunaOverlay]);

    // Easter Egg: Logo Click
    const handleLogoClick = () => {
        if (madnessMode) return;
        const newCount = logoClicks + 1;
        setLogoClicks(newCount);

        if (newCount >= 3) {
            setMadnessMode(true);
            setTimeout(() => {
                setMadnessMode(false);
                setLogoClicks(0);
            }, 5000);
        }
    };

    const isCoolBypass = () => {
        if (normalizedInput === "sudo make me cool") {
            setOutput("You were already cool 😎");
            return true;
        }
        return false;
    };

    // Transformation handlers
    const runEncoder = (fn: (s: string) => string) => {
        if (isCoolBypass()) return;
        setOutput(fn(input));
    };
    const runTransformer = (fn: (s: string, ...args: any[]) => string, ...args: any[]) => {
        if (isCoolBypass()) return;
        setOutput(fn(input, ...args));
    };
    const runGenerator = (fn: (...args: any[]) => string, ...args: any[]) => {
        // Generators usually don't use input, but good to be consistent if they did
        setOutput(fn(...args));
    };

    const handleASCII = async () => {
        if (isCoolBypass()) return;
        try {
            const res = await generateASCII(input || "CASE", asciiFont as any);
            setOutput(res);
        } catch (err) {
            setOutput(err instanceof Error ? err.message : String(err));
        }
    };

    const tabs: { id: LabTab, label: string, icon: React.ReactNode }[] = [
        { id: "encode", label: "Encode", icon: <Binary size={18} /> },
        { id: "text", label: "Text", icon: <Type size={18} /> },
        { id: "ascii", label: "ASCII", icon: <Sparkles size={18} /> },
        { id: "dev", label: "Dev Tools", icon: <CodeIcon size={18} /> },
        { id: "generators", label: "Generators", icon: <Key size={18} /> },
        { id: "easter eggs", label: "Secrets", icon: <Sparkles size={18} className="text-purple-500" /> },
    ];

    if (activeTab === "easter eggs") {
        return (
            <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
                {instruction && (
                    <InstructionToast 
                        title={instruction.title} 
                        text={instruction.text} 
                        featureId={activeTab} 
                    />
                )}
                {/* Infinite Void overlay (same as main lab) */}
                <AnimatePresence>
                    {showInfiniteVoidOverlay && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 cursor-pointer"
                            onClick={() => setShowInfiniteVoidOverlay(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="absolute inset-0 w-full h-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    ref={infiniteVoidVideoRef}
                                    src="/video/Video%20Project%204.mp4"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                                    playsInline
                                    muted
                                    onEnded={() => setShowInfiniteVoidOverlay(false)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </motion.div>
                            <button
                                type="button"
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-heading text-xl transition-colors"
                                onClick={() => setShowInfiniteVoidOverlay(false)}
                            >
                                ×
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Sukuna (Fukuma Mizushi) overlay */}
                <AnimatePresence>
                    {showSukunaOverlay && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 cursor-pointer"
                            onClick={() => setShowSukunaOverlay(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="absolute inset-0 w-full h-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    ref={sukunaVideoRef}
                                    src="/video/sukuna.mp4"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                                    playsInline
                                    onEnded={() => setShowSukunaOverlay(false)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </motion.div>
                            <button
                                type="button"
                                aria-label="Close"
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-heading text-xl transition-colors"
                                onClick={() => setShowSukunaOverlay(false)}
                            >
                                ×
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Header to maintain context */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <h1
                            onClick={(e) => {
                                // Prevent link navigation if it's a madness mode click (well, actually we can just let it navigate if they want)
                                // But handleLogoClick is for easter eggs
                                handleLogoClick();
                            }}
                            className={`font-heading text-3xl md:text-4xl underline decoration-marker-red decoration-4 cursor-pointer select-none transition-all ${madnessMode ? "shake-crazy text-xs font-mono no-underline whitespace-pre" : ""}`}
                        >
                            {madnessMode ? `
███████╗████████╗ ██████╗ ██████╗   ██╗
██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗  ██║
███████╗   ██║   ██║   ██║██████╔╝  ██║
╚════██║   ██║   ██║   ██║██╔═══╝   ╚═╝
███████║   ██║   ╚██████╔╝██║       ██╗
╚══════╝   ╚═╝    ╚═════╝ ╚═╝       ╚═╝

` : "pRojEctCaSE Lab"}
                        </h1>
                    </Link>
                    {madnessMode && <span className="stop-poking-msg text-sm mt-2">STOP POKING ME 😭</span>}
                </div>

                    <nav className="w-full md:w-auto px-2">
                        {/* Mobile Dropdown */}
                        <div className="md:hidden w-full">
                            <div className="relative">
                                <select
                                    className="w-full bg-white border-[3px] border-pencil p-4 pr-10 font-heading text-xl appearance-none rounded-2xl shadow-hard-sm focus:outline-none focus:border-marker-blue transition-all active:scale-[0.98]"
                                    value={activeTab}
                                    onChange={(e) => handleTabChange(e.target.value as LabTab)}
                                    style={{ borderRadius: "125px 12px 105px 12px / 12px 125px 12px 105px" }}
                                >
                                    {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-marker-red animate-pulse">
                                    <ChevronRight className="rotate-90" size={24} />
                                </div>
                            </div>
                        </div>
                        {/* Desktop Tabs */}
                        <div className="hidden md:flex flex-wrap gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id as LabTab)}
                                    className={`
                        flex items-center gap-2 px-4 py-2 font-body text-lg border-2 border-pencil transition-all
                        ${activeTab === tab.id ? "bg-pencil text-white -rotate-1 shadow-hard-sm" : "bg-white hover:bg-paper-muted"}
                    `}
                                    style={{ borderRadius: "10px 10px 10px 10px / 50px 10px 50px 10px" }}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                        </nav>
                </header>

                <main className="flex flex-col items-center justify-center p-2 md:p-12 overflow-hidden bg-[#fdfbf7]">
                    <div className="max-w-3xl w-full flex flex-col gap-8 text-center">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            <h2 className="font-heading text-4xl md:text-6xl text-pencil">
                                🪺 Easter Eggs & Secrets
                            </h2>
                            <p className="font-body text-xl md:text-2xl text-pencil/70 italic">
                                “Because every fun project deserves hidden chaos.”
                            </p>
                        </motion.div>

                        <SketchCard decoration="tape" className="bg-[#fff9c4]/30 text-left p-4 md:p-6">
                            <p className="font-heading text-base md:text-xl text-pencil mb-3 md:mb-4">Type these in the Lab input</p>
                            <ul className="space-y-4 md:space-y-6 font-body text-base md:text-xl list-none">
                                <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                                    <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                        <span className="text-xl md:text-2xl mt-0.5 shrink-0">🦇</span>
                                        <span className="min-w-0">Type: <strong className="font-heading text-marker-blue">i am batman</strong> → Dark Gotham mode</span>
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
                                <motion.li whileHover={{ x: 5 }} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 group">
                                    <span className="flex gap-2 md:gap-3 items-start flex-1 min-w-0">
                                        <span className="text-xl md:text-2xl mt-0.5 shrink-0">🧠</span>
                                        <span className="min-w-0">Type: <strong className="font-heading text-green-600">sudo make me cool</strong></span>
                                    </span>
                                    <button type="button" onClick={() => handleCopyCommand("sudo make me cool")} className="self-start sm:self-center flex items-center gap-1 min-h-[44px] min-w-[44px] px-3 py-2 rounded border-2 border-pencil/30 hover:border-pencil hover:bg-paper-muted transition-colors opacity-90 sm:opacity-70 sm:group-hover:opacity-100 touch-manipulation" title="Copy command"><Copy size={20} />{copiedCommand === "sudo make me cool" && <span className="text-xs sm:text-sm whitespace-nowrap">Copied!</span>}</button>
                                </motion.li>
                                <motion.li whileHover={{ x: 5 }} className="flex gap-2 md:gap-3 items-start">
                                    <span className="text-xl md:text-2xl mt-0.5 shrink-0">🎯</span>
                                    <span className="min-w-0">Click the pRojEctCaSE logo <strong className="font-heading text-marker-red">3 times</strong></span>
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

                        <div className="flex flex-col gap-4">
                            <h3 className="font-heading text-3xl text-pencil underline decoration-wavy decoration-marker-blue">🔊 Chaos Soundboard</h3>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <SketchButton
                                    onClick={() => {
                                        const sounds = ["/audio/fahh.mp3", "/audio/yoo.mp3"];
                                        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                                        new Audio(randomSound).play();
                                    }}
                                    className="bg-marker-red text-white w-full md:w-auto"
                                    size="lg"
                                >
                                    Random Noise
                                </SketchButton>
                            </div>
                        </div>

                        <div className="font-body text-lg md:text-xl space-y-2 opacity-80">
                            <h3 className="font-heading text-3xl mb-4 text-pencil underline decoration-wavy decoration-marker-yellow">About pRojEctCaSE</h3>
                            <div className="bg-pencil/5 p-6 rounded-2xl border-2 border-pencil/10">
                                <p>Hello there, Iam Shaik Abdul Muqeeth</p>
                    <p>I made this project just to learn Git and GitHub.</p>
                    <p>It was funnn.</p>
                    <p>Then it became this.</p>
                            </div>

                            <div className="mt-8 p-6 border-2 border-dashed border-pencil/30 rounded-2xl w-full hover:bg-white/50 transition-colors">
                                <p className="mb-2">If you want to develop this further or mess around with the code:</p>
                                <a
                                    href="mailto:muqeethshaikabdul@gmail.com"
                                    className="text-marker-blue hover:text-marker-red transition-colors font-bold text-xl md:text-2xl break-all"
                                >
                                    📩 muqeethshaikabdul@gmail.com
                                </a>
                                <p className="mt-4 text-sm opacity-70">
                                    No pressure.<br />Just code and curiosity.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <SketchButton
                                onClick={() => handleTabChange("encode")}
                                variant="accent"
                                size="lg"
                                className="w-full md:w-auto"
                            >
                                <ChevronRight className="rotate-180 inline mr-2" /> Back to Encode
                            </SketchButton>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
            {instruction && (
                <InstructionToast 
                    title={instruction.title} 
                    text={instruction.text} 
                    featureId={activeTab} 
                />
            )}
            {/* Infinite Void — full-page video overlay */}
            <AnimatePresence>
                {showInfiniteVoidOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 cursor-pointer"
                        onClick={() => setShowInfiniteVoidOverlay(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                ref={infiniteVoidVideoRef}
                                src="/video/Video%20Project%204.mp4"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                playsInline
                                muted
                                onEnded={() => setShowInfiniteVoidOverlay(false)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                        <button
                            type="button"
                            aria-label="Close"
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-heading text-xl transition-colors"
                            onClick={() => setShowInfiniteVoidOverlay(false)}
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sukuna (Fukuma Mizushi) — full-page video overlay */}
            <AnimatePresence>
                {showSukunaOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 cursor-pointer"
                        onClick={() => setShowSukunaOverlay(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                ref={sukunaVideoRef}
                                src="/video/sukuna.mp4"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                playsInline
                                onEnded={() => setShowSukunaOverlay(false)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                        <button
                            type="button"
                            aria-label="Close"
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white font-heading text-xl transition-colors"
                            onClick={() => setShowSukunaOverlay(false)}
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Easter Egg Elements */}
            {activeTheme === "batman" && (
                <>
                    <div className="batman-vignette" />
                    <div className="batman-msg">Then act like it.</div>
                </>
            )}
            {activeTheme === "cat" && (
                <>
                    <img src="/images/doodles/cat.png" className="peek-icon cat-peek show" alt="Peeking Cat" />
                    <div className="cat-msg">You have summoned the orange brain cell 🐱</div>
                </>
            )}

            <img
                src="/images/doodles/bat.png"
                className={`peek-icon bat-peek ${activeTheme === "batman" ? "show" : ""}`}
                alt="Peeking Batman"
            />

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <h1
                            onClick={handleLogoClick}
                            className={`font-heading text-4xl underline decoration-marker-red decoration-4 cursor-pointer select-none transition-all ${madnessMode ? "shake-crazy text-xs font-mono no-underline whitespace-pre" : ""}`}
                        >
                            {madnessMode ? `
███████╗████████╗ ██████╗ ██████╗   ██╗
██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗  ██║
███████╗   ██║   ██║   ██║██████╔╝  ██║
╚════██║   ██║   ██║   ██║██╔═══╝   ╚═╝
███████║   ██║   ╚██████╔╝██║       ██╗
╚══════╝   ╚═╝    ╚═════╝ ╚═╝       ╚═╝

` : "pRojEctCaSE Lab"}
                        </h1>
                    </Link>
                    {madnessMode && <span className="stop-poking-msg text-sm mt-2">STOP POKING ME 😭</span>}
                </div>

                <nav className="w-full md:w-auto">
                    {/* Mobile Dropdown */}
                    <div className="md:hidden w-full px-2">
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-[3px] border-pencil p-4 pr-10 font-heading text-xl appearance-none rounded-2xl shadow-hard-sm focus:outline-none focus:border-marker-blue transition-all active:scale-[0.98]"
                                value={activeTab}
                                onChange={(e) => handleTabChange(e.target.value as LabTab)}
                                style={{ borderRadius: "12px 125px 12px 105px / 12px 12px 125px 105px" }}
                            >
                                {tabs.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-marker-red animate-pulse">
                                <ChevronRight className="rotate-90" size={24} />
                            </div>
                        </div>
                    </div>
                    {/* Desktop Tabs */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id as LabTab)}
                                className={`
                    flex items-center gap-2 px-4 py-2 font-body text-lg border-2 border-pencil transition-all
                    ${activeTab === tab.id ? "bg-pencil text-white -rotate-1 shadow-hard-sm" : "bg-white hover:bg-paper-muted"}
                  `}
                                style={{ borderRadius: "10px 10px 10px 10px / 50px 10px 50px 10px" }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                    </nav>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 flex-grow">
                {/* Input Section */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <div className="flex justify-between items-end px-1">
                        <h2 className="font-heading text-xl md:text-2xl">Input</h2>
                        <div className="flex gap-2">
                            <SketchButton variant="ghost" size="sm" onClick={clear} className="text-marker-red h-[44px] w-[44px] flex items-center justify-center">
                                <Trash2 size={24} />
                            </SketchButton>
                        </div>
                    </div>
                    <SketchTextarea
                        placeholder="Type or paste something here..."
                        className="flex-grow min-h-[180px] md:min-h-[300px] w-full text-lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-4 font-mono text-xs opacity-50 px-2 group">
                        {/* Stats hidden on very small screens unless focused/tapped, simpler display */}
                        <div className="flex gap-4">
                            <span>CHARS: {stats.charCount}</span>
                            <span>WORDS: {stats.wordCount}</span>
                        </div>
                        <span>LINES: {stats.lineCount}</span>
                    </div>
                </section>

                {/* Output Section */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <div className="flex justify-between items-end px-1">
                        <h2 className="font-heading text-xl md:text-2xl text-marker-blue">Output</h2>
                        <div className="flex gap-2">
                            <SketchButton variant="secondary" size="sm" onClick={handleDownload} className="h-[44px] w-[44px] flex items-center justify-center">
                                <Download size={24} />
                            </SketchButton>
                            <SketchButton variant="primary" size="sm" onClick={handleCopy} className="h-[44px] min-w-[44px] flex items-center justify-center">
                                {copied ? "Copied!" : <Copy size={24} />}
                            </SketchButton>
                        </div>
                    </div>
                    <SketchTextarea
                        readOnly
                        className="flex-grow min-h-[180px] md:min-h-[300px] bg-paper-muted/30 w-full text-lg"
                        value={output}
                        placeholder="Output will appear here..."
                    />
                </section>
            </div>

            {/* Controls Section */}
            <SketchCard decoration="tape" className="mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-wrap gap-3 md:gap-4"
                    >
                        {activeTab === "encode" && (
                            <>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.base64Encode)}>Base64 Encode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.base64Decode)}>Base64 Decode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.urlEncode)}>URL Encode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.urlDecode)}>URL Decode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.binaryEncode)}>Binary Encode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.binaryDecode)}>Binary Decode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.hexEncode)}>Hex Encode</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.hexDecode)}>Hex Decode</SketchButton>
                                <SketchButton className="flex-1 min-w-[120px] md:min-w-[140px] justify-center" onClick={() => runEncoder(Encoders.rot13)}>ROT13</SketchButton>
                                <SketchButton className="flex-1 min-w-[140px] md:min-w-[180px] justify-center" onClick={() => runEncoder(Encoders.caesarCipher)}>Caesar (Shift 3)</SketchButton>
                                <SketchButton className="flex-1 min-w-[200px] justify-center" variant="accent" onClick={() => setOutput(Encoders.smartDecode(input))}>
                                    <RefreshCw className="mr-2" size={16} /> Auto Decode
                                </SketchButton>
                            </>
                        )}

                        {activeTab === "text" && (
                            <>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.toLowerCase)}>lowercase</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.toUpperCase)}>UPPERCASE</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.toSentenceCase)}>Sentence case</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.toRandomCase)}>RaNdOm cAsE</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.reverseText)}>Reverse</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.shuffleText)}>Shuffle</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.spreadText)}>S p r e a d</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.numberLines)}>Number Lines</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Transformers.removeEmptyLines)}>Rm Empty Lines</SketchButton>
                                <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-2">
                                    <SketchInput placeholder="Find" value={findText} onChange={(e) => setFindText(e.target.value)} />
                                    <SketchInput placeholder="Replace" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} />
                                    <SketchButton className="w-full sm:w-auto" onClick={() => setOutput(Transformers.findReplace(input, findText, replaceText))}>Go</SketchButton>
                                </div>
                            </>
                        )}

                        {activeTab === "ascii" && (
                            <>
                                <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                                    <label className="font-heading">Font</label>
                                    <select
                                        className="bg-white border-[3px] border-pencil p-2 font-body text-xl rounded-xl h-[50px]"
                                        value={asciiFont}
                                        onChange={(e) => setAsciiFont(e.target.value)}
                                        style={{ borderRadius: "10px 10px 10px 10px / 50px 10px 50px 10px" }}
                                    >
                                        {getASCIIFonts().map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <SketchButton size="lg" variant="accent" onClick={handleASCII} className="col-span-1 sm:col-span-2 w-full justify-center">
                                    Generate ASCII Art
                                </SketchButton>
                            </>
                        )}

                        {activeTab === "dev" && (
                            <>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Escapes.escapeJSON)}>JSON Escape</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Escapes.unescapeJSON)}>JSON Unescape</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Escapes.escapeHTML)}>HTML Escape</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Escapes.unescapeHTML)}>HTML Unescape</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => runEncoder(Escapes.escapeCSV)}>CSV Escape</SketchButton>
                            </>
                        )}

                        {activeTab === "generators" && (
                            <>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generatePassword())}>Password</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateUUID())}>UUID v4</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateShortId())}>Short ID</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateRollNumber())}>Roll Number</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateUsername())}>Username</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateLoremIpsum(3))}>Lorem Ipsum</SketchButton>
                                <SketchButton className="w-full justify-center" onClick={() => setOutput(Generators.generateTestData("email"))}>Test Email</SketchButton>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </SketchCard>

            <footer className="text-center opacity-30 font-mono text-xs py-4 mb-4">
                pRojEctCaSE // Text Lab // Manual Borders // No Straight Lines
            </footer>
        </div>
    );
}
