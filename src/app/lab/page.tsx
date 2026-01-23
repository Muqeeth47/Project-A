"use client";

import React, { useState, useEffect } from "react";
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

// Import logic
import * as Encoders from "@/core/encoders";
import * as Transformers from "@/core/transformers";
import * as Generators from "@/core/generators";
import * as Escapes from "@/core/escapes";
import { generateASCII, getASCIIFonts } from "@/core/ascii";
import { copyToClipboard, downloadFile, getTextStats } from "@/core/utils";

type LabTab = "encode" | "text" | "ascii" | "dev" | "generators";

export default function LabPage() {
    const [activeTab, setActiveTab] = useState<LabTab>("encode");
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

    // Transformation handlers
    const runEncoder = (fn: (s: string) => string) => setOutput(fn(input));
    const runTransformer = (fn: (s: string, ...args: any[]) => string, ...args: any[]) => setOutput(fn(input, ...args));
    const runGenerator = (fn: (...args: any[]) => string, ...args: any[]) => setOutput(fn(...args));

    const handleASCII = async () => {
        try {
            const res = await generateASCII(input || "CASE", asciiFont as any);
            setOutput(res);
        } catch (err) {
            setOutput(err as string);
        }
    };

    const tabs = [
        { id: "encode", label: "Encode", icon: <Binary size={18} /> },
        { id: "text", label: "Text", icon: <Type size={18} /> },
        { id: "ascii", label: "ASCII", icon: <Sparkles size={18} /> },
        { id: "dev", label: "Dev Tools", icon: <CodeIcon size={18} /> },
        { id: "generators", label: "Generators", icon: <Key size={18} /> },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="font-heading text-4xl underline decoration-marker-red decoration-4">pRojEctCaSE Lab</h1>

                <nav className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as LabTab)}
                            className={`
                flex items-center gap-2 px-4 py-2 font-body text-lg border-2 border-pencil transition-all
                ${activeTab === tab.id ? "bg-pencil text-white -rotate-1 shadow-hard-sm" : "bg-white hover:bg-paper-muted"}
              `}
                            style={{ borderRadius: "10px 10px 10px 10px / 50px 10px 50px 10px" }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
                {/* Input Section */}
                <section className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <h2 className="font-heading text-2xl">Input</h2>
                        <div className="flex gap-2">
                            <SketchButton variant="ghost" size="sm" onClick={clear} className="text-marker-red">
                                <Trash2 size={18} />
                            </SketchButton>
                        </div>
                    </div>
                    <SketchTextarea
                        placeholder="Type or paste something here..."
                        className="flex-grow min-h-[300px]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex gap-4 font-mono text-xs opacity-50 px-2">
                        <span>CHARS: {stats.charCount}</span>
                        <span>WORDS: {stats.wordCount}</span>
                        <span>LINES: {stats.lineCount}</span>
                    </div>
                </section>

                {/* Output Section */}
                <section className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <h2 className="font-heading text-2xl text-marker-blue">Output</h2>
                        <div className="flex gap-2">
                            <SketchButton variant="secondary" size="sm" onClick={handleDownload}>
                                <Download size={18} />
                            </SketchButton>
                            <SketchButton variant="primary" size="sm" onClick={handleCopy}>
                                {copied ? "Copied!" : <Copy size={18} />}
                            </SketchButton>
                        </div>
                    </div>
                    <SketchTextarea
                        readOnly
                        className="flex-grow min-h-[300px] bg-paper-muted/30"
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
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {activeTab === "encode" && (
                            <>
                                <SketchButton onClick={() => runEncoder(Encoders.base64Encode)}>Base64 Encode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.base64Decode)}>Base64 Decode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.urlEncode)}>URL Encode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.urlDecode)}>URL Decode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.binaryEncode)}>Binary Encode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.binaryDecode)}>Binary Decode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.hexEncode)}>Hex Encode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.hexDecode)}>Hex Decode</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.rot13)}>ROT13</SketchButton>
                                <SketchButton onClick={() => runEncoder(Encoders.caesarCipher)}>Caesar (Shift 3)</SketchButton>
                                <SketchButton variant="accent" onClick={() => setOutput(Encoders.smartDecode(input))}>
                                    <RefreshCw className="mr-2" size={16} /> Auto Decode
                                </SketchButton>
                            </>
                        )}

                        {activeTab === "text" && (
                            <>
                                <SketchButton onClick={() => runEncoder(Transformers.toLowerCase)}>lowercase</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.toUpperCase)}>UPPERCASE</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.toSentenceCase)}>Sentence case</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.toRandomCase)}>RaNdOm cAsE</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.reverseText)}>Reverse</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.shuffleText)}>Shuffle</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.spreadText)}>S p r e a d</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.numberLines)}>Number Lines</SketchButton>
                                <SketchButton onClick={() => runEncoder(Transformers.removeEmptyLines)}>Remove Empty Lines</SketchButton>
                                <div className="col-span-2 flex gap-2">
                                    <SketchInput placeholder="Find" value={findText} onChange={(e) => setFindText(e.target.value)} />
                                    <SketchInput placeholder="Replace" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} />
                                    <SketchButton onClick={() => setOutput(Transformers.findReplace(input, findText, replaceText))}>Go</SketchButton>
                                </div>
                            </>
                        )}

                        {activeTab === "ascii" && (
                            <>
                                <div className="col-span-2 flex flex-col gap-2">
                                    <label className="font-heading">Font</label>
                                    <select
                                        className="bg-white border-2 border-pencil p-2 font-body"
                                        value={asciiFont}
                                        onChange={(e) => setAsciiFont(e.target.value)}
                                    >
                                        {getASCIIFonts().map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <SketchButton size="lg" variant="accent" onClick={handleASCII} className="col-span-2">
                                    Generate ASCII Art
                                </SketchButton>
                            </>
                        )}

                        {activeTab === "dev" && (
                            <>
                                <SketchButton onClick={() => runEncoder(Escapes.escapeJSON)}>JSON Escape</SketchButton>
                                <SketchButton onClick={() => runEncoder(Escapes.unescapeJSON)}>JSON Unescape</SketchButton>
                                <SketchButton onClick={() => runEncoder(Escapes.escapeHTML)}>HTML Escape</SketchButton>
                                <SketchButton onClick={() => runEncoder(Escapes.escapeCSV)}>CSV Escape</SketchButton>
                            </>
                        )}

                        {activeTab === "generators" && (
                            <>
                                <SketchButton onClick={() => setOutput(Generators.generatePassword())}>Password</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateUUID())}>UUID v4</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateShortId())}>Short ID</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateRollNumber())}>Roll Number</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateUsername())}>Username</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateLoremIpsum(3))}>Lorem Ipsum</SketchButton>
                                <SketchButton onClick={() => setOutput(Generators.generateTestData("email"))}>Test Email</SketchButton>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </SketchCard>

            <footer className="text-center opacity-30 font-mono text-xs py-4">
                pRojEctCaSE // Text Lab // Manual Borders // No Straight Lines
            </footer>
        </div>
    );
}
