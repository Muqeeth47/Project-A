/**
 * Developer Escaping
 * Pure functions for escaping text for different formats.
 */

/**
 * Escape for JSON
 */
export const escapeJSON = (input: string): string => {
    return JSON.stringify(input);
};

/**
 * Unescape from JSON (Decode)
 */
export const unescapeJSON = (input: string): string => {
    try {
        return JSON.parse(input);
    } catch (e) {
        return "Error: Invalid JSON string";
    }
};

/**
 * Escape for HTML
 */
export const escapeHTML = (input: string): string => {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return input.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Unescape from HTML
 */
export const unescapeHTML = (input: string): string => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent || "";
};

/**
 * Escape for CSV
 */
export const escapeCSV = (input: string): string => {
    if (/[",\n\r]/.test(input)) {
        return `"${input.replace(/"/g, '""')}"`;
    }
    return input;
};
