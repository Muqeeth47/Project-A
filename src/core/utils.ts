/**
 * Utility Helpers
 * Functions for copying, downloading, and general text utilities.
 */

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return false;
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error("Failed to copy: ", err);
        return false;
    }
};

/**
 * Download text as a file
 */
export const downloadFile = (
    content: string,
    fileName: string,
    mimeType: string = "text/plain"
): void => {
    if (typeof document === "undefined") return;

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Calculate basic text stats
 */
export const getTextStats = (input: string) => {
    return {
        charCount: input.length,
        wordCount: input.trim() === "" ? 0 : input.trim().split(/\s+/).length,
        lineCount: input === "" ? 0 : input.split("\n").length,
    };
};
