"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function InstructionToast({
    title,
    text,
    durationMs = 4500,
}: {
    title?: string;
    text: string;
    durationMs?: number;
}) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(true);
        const t = setTimeout(() => setOpen(false), durationMs);
        return () => clearTimeout(t);
    }, [text, durationMs]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] w-[min(92vw,680px)]"
                >
                    <div className="bg-white/95 backdrop-blur-sm border-[3px] border-pencil shadow-hard-sm rounded-2xl px-4 py-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            {title && (
                                <div className="font-heading text-base md:text-lg text-pencil">
                                    {title}
                                </div>
                            )}
                            <div className={`font-body text-sm md:text-base text-pencil/80 ${title ? "mt-1" : ""}`}>
                                {text}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="shrink-0 w-8 h-8 rounded-full border-2 border-pencil/20 hover:border-pencil hover:bg-paper-muted text-pencil flex items-center justify-center transition-colors"
                            aria-label="Dismiss instruction"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

