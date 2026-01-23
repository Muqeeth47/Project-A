import { nanoid } from "nanoid";

/**
 * Generators
 * Pure functions for generating random data.
 */

/**
 * Random password generator
 */
export const generatePassword = (
    length: number = 16,
    options = {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    }
): string => {
    const charSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let allowedChars = "";
    if (options.uppercase) allowedChars += charSets.uppercase;
    if (options.lowercase) allowedChars += charSets.lowercase;
    if (options.numbers) allowedChars += charSets.numbers;
    if (options.symbols) allowedChars += charSets.symbols;

    if (allowedChars === "") allowedChars = charSets.lowercase + charSets.numbers;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return password;
};

/**
 * UUID v4 generator
 */
export const generateUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

/**
 * Short ID generator (NanoID style)
 */
export const generateShortId = (length: number = 8): string => {
    return nanoid(length);
};

/**
 * Roll Number Generator
 * YEAR + BRANCH + SERIAL (e.g., 21CSE045)
 */
export const generateRollNumber = (
    year?: number,
    branch?: string
): string => {
    const currentYear = year || new Date().getFullYear() % 100;
    const branches = ["CSE", "ECE", "EEE", "ME", "CE", "IT"];
    const selectedBranch = branch || branches[Math.floor(Math.random() * branches.length)];
    const serial = Math.floor(Math.random() * 200)
        .toString()
        .padStart(3, "0");

    return `${currentYear}${selectedBranch}${serial}`;
};

/**
 * Username Generator
 */
export const generateUsername = (name?: string): string => {
    const adjectives = ["Cool", "Swift", "Hacker", "Cyber", "Dark", "Digital", "Techy", "Logic"];
    const nouns = ["Coder", "Dev", "Ghost", "Ninja", "Wizard", "Eagle", "Prime", "User"];

    if (name) {
        const cleaned = name.toLowerCase().replace(/\s+/g, "");
        return `${cleaned}${Math.floor(Math.random() * 9999)}`;
    }

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}${Math.floor(Math.random() * 99)}`;
};

/**
 * Random Test Data Generator
 */
export const generateTestData = (type: "email" | "id" | "roll"): string => {
    switch (type) {
        case "email":
            return `${generateRollNumber().toLowerCase()}@gmail.com`;
        case "id":
            return generateShortId();
        case "roll":
            return generateRollNumber();
        default:
            return "";
    }
};

/**
 * Lorem Ipsum generator
 */
export const generateLoremIpsum = (paragraphs: number = 1): string => {
    const text = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
        "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
        "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
        "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
        "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
    ];

    let result = [];
    for (let i = 0; i < paragraphs; i++) {
        const shuffle = [...text].sort(() => 0.5 - Math.random());
        result.push(shuffle.slice(0, 5).join(" "));
    }
    return result.join("\n\n");
};
