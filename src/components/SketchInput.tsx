"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SketchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const SketchInput = ({ label, className, ...props }: SketchInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="font-heading text-xl">{label}</label>}
            <input
                className={cn(
                    "bg-white border-[3px] border-pencil p-3 font-body text-lg focus:outline-none focus:border-marker-blue focus:ring-4 focus:ring-marker-blue/10 transition-all",
                    className
                )}
                style={{ borderRadius: "15px 15px 15px 15px / 125px 15px 125px 15px" }}
                {...props}
            />
        </div>
    );
};

interface SketchTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const SketchTextarea = ({ label, className, ...props }: SketchTextareaProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="font-heading text-xl">{label}</label>}
            <textarea
                className={cn(
                    "bg-white border-[3px] border-pencil p-4 font-mono text-base focus:outline-none focus:border-marker-blue focus:ring-4 focus:ring-marker-blue/10 transition-all resize-none",
                    className
                )}
                style={{ borderRadius: "15px 15px 15px 15px / 15px 125px 15px 125px" }}
                {...props}
            />
        </div>
    );
};
