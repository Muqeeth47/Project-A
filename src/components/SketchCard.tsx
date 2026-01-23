"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SketchCardProps {
    children: React.ReactNode;
    className?: string;
    decoration?: "tape" | "tack" | "none";
    title?: string;
    rotate?: number;
}

export const SketchCard = ({
    children,
    className,
    decoration = "none",
    title,
    rotate = 0,
}: SketchCardProps) => {
    const wobblyRadius = "15px 125px 15px 105px / 15px 15px 125px 105px";

    return (
        <motion.div
            initial={{ rotate: rotate - 0.5 }}
            whileHover={{ rotate: rotate + 0.5, scale: 1.01 }}
            className={cn(
                "relative bg-white border-[3px] border-pencil p-6 shadow-hard",
                className
            )}
            style={{ borderRadius: wobblyRadius, rotate }}
        >
            {/* Tape Decoration */}
            {decoration === "tape" && (
                <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-black/10 backdrop-blur-sm -rotate-2"
                    style={{ clipPath: "polygon(0% 0%, 100% 5%, 95% 100%, 5% 95%)" }}
                />
            )}

            {/* Tack Decoration */}
            {decoration === "tack" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-marker-red rounded-full border-2 border-pencil shadow-hard-sm" />
            )}

            {title && (
                <h3 className="font-heading text-2xl mb-4 underline decoration-marker-yellow decoration-4 underline-offset-4">
                    {title}
                </h3>
            )}

            {children}
        </motion.div>
    );
};
