"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SketchButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "accent" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const SketchButton = ({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: SketchButtonProps) => {
    const variants = {
        primary: "bg-white text-pencil border-pencil hover:bg-paper-muted hover:rotate-1",
        secondary: "bg-paper-muted text-pencil border-pencil hover:bg-marker-blue hover:text-white hover:-rotate-1",
        accent: "bg-marker-red text-white border-pencil hover:bg-white hover:text-pencil hover:rotate-2",
        ghost: "bg-transparent border-transparent hover:bg-paper-muted",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-2 text-lg",
        lg: "px-10 py-4 text-2xl font-heading",
    };

    const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px #2d2d2d" }}
            className={cn(
                "relative font-body border-[3px] transition-all duration-100",
                "shadow-hard active:shadow-none",
                variants[variant],
                sizes[size],
                className
            )}
            style={{ borderRadius: wobblyRadius }}
            {...props}
        >
            {children}
        </motion.button>
    );
};
