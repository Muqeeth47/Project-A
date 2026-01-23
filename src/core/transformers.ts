/**
 * Text Transformers
 * Pure functions for text manipulation.
 */

/**
 * Lowercase
 */
export const toLowerCase = (input: string): string => input.toLowerCase();

/**
 * Uppercase
 */
export const toUpperCase = (input: string): string => input.toUpperCase();

/**
 * Random Case
 */
export const toRandomCase = (input: string): string => {
    return input
        .split("")
        .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
        .join("");
};

/**
 * Sentence Case
 */
export const toSentenceCase = (input: string): string => {
    return input
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase());
};

/**
 * Reverse
 */
export const reverseText = (input: string): string => {
    return input.split("").reverse().join("");
};

/**
 * Shuffle characters
 */
export const shuffleText = (input: string): string => {
    const arr = input.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
};

/**
 * Add space between characters
 */
export const spreadText = (input: string): string => {
    return input.split("").join(" ");
};

/**
 * Append text to each line
 */
export const appendToLines = (input: string, suffix: string): string => {
    return input
        .split("\n")
        .map((line) => line + suffix)
        .join("\n");
};

/**
 * Prepend text to each line
 */
export const prependToLines = (input: string, prefix: string): string => {
    return input
        .split("\n")
        .map((line) => prefix + line)
        .join("\n");
};

/**
 * Auto number lines
 */
export const numberLines = (input: string): string => {
    return input
        .split("\n")
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");
};

/**
 * Find & Replace
 */
export const findReplace = (
    input: string,
    find: string,
    replace: string,
    useRegex: boolean = false
): string => {
    try {
        if (useRegex) {
            const regex = new RegExp(find, "g");
            return input.replace(regex, replace);
        }
        // Literal replace all
        return input.split(find).join(replace);
    } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Regex error"}`;
    }
};

/**
 * Trim whitespace
 */
export const trimText = (input: string): string => input.trim();

/**
 * Remove empty lines
 */
export const removeEmptyLines = (input: string): string => {
    return input
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
};
