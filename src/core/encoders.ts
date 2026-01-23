/**
 * Encoders & Decoders
 * Pure functions for text encoding and decoding.
 */

/**
 * Base64 Encode
 */
export const base64Encode = (input: string): string => {
  try {
    return btoa(input);
  } catch (e) {
    return "Error: Invalid input for Base64 encoding";
  }
};

/**
 * Base64 Decode
 */
export const base64Decode = (input: string): string => {
  try {
    return atob(input);
  } catch (e) {
    return "Error: Invalid Base64 string";
  }
};

/**
 * URL Encode
 */
export const urlEncode = (input: string): string => {
  return encodeURIComponent(input);
};

/**
 * URL Decode
 */
export const urlDecode = (input: string): string => {
  try {
    return decodeURIComponent(input);
  } catch (e) {
    return "Error: Invalid URL encoding";
  }
};

/**
 * ROT13
 */
export const rot13 = (input: string): string => {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
};

/**
 * Caesar Cipher (Default shift 3)
 */
export const caesarCipher = (input: string, shift: number = 3): string => {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    const s = ((shift % 26) + 26) % 26; // Handle negative shifts
    return String.fromCharCode(((char.charCodeAt(0) - start + s) % 26) + start);
  });
};

/**
 * Binary Encode
 */
export const binaryEncode = (input: string): string => {
  return input
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
};

/**
 * Binary Decode
 */
export const binaryDecode = (input: string): string => {
  try {
    return input
      .split(/\s+/)
      .map((bin) => String.fromCharCode(parseInt(bin, 2)))
      .join("");
  } catch (e) {
    return "Error: Invalid Binary string";
  }
};

/**
 * Hex Encode
 */
export const hexEncode = (input: string): string => {
  return input
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
};

/**
 * Hex Decode
 */
export const hexDecode = (input: string): string => {
  try {
    return input
      .split(/\s+/)
      .map((hex) => String.fromCharCode(parseInt(hex, 16)))
      .join("");
  } catch (e) {
    return "Error: Invalid Hex string";
  }
};

/**
 * Morse Code Dictionary
 */
const MORSE_CODE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  " ": "/", ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.",
  "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-", "\"": ".-..-.", "$": "...-..-",
  "@": ".--.-.",
};

const REVERSE_MORSE = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([char, code]) => [code, char])
);

/**
 * Morse Encode
 */
export const morseEncode = (input: string): string => {
  return input
    .toUpperCase()
    .split("")
    .map((char) => MORSE_CODE[char] || "")
    .filter((code) => code !== "")
    .join(" ");
};

/**
 * Morse Decode
 */
export const morseDecode = (input: string): string => {
  return input
    .split(" ")
    .map((code) => REVERSE_MORSE[code] || " ")
    .join("");
};

/**
 * Smart Decode
 * Priority: Base64 -> Hex -> Binary -> Morse -> URL
 */
export const smartDecode = (input: string): string => {
  const trimmed = input.trim();

  // 1. Binary
  if (/^[01 ]+$/.test(trimmed) && trimmed.length >= 8) {
    const decoded = binaryDecode(trimmed);
    if (!decoded.includes("\0")) return decoded;
  }

  // 2. Hex
  if (/^[0-9a-fA-F ]+$/.test(trimmed)) {
    const decoded = hexDecode(trimmed);
    if (!decoded.includes("\0")) return decoded;
  }

  // 3. Morse
  if (/^[.\- /]+$/.test(trimmed)) {
    const decoded = morseDecode(trimmed);
    if (decoded.trim() !== "") return decoded;
  }

  // 4. Base64
  if (/^[A-Za-z0-9+/=]+$/.test(trimmed)) {
    const decoded = base64Decode(trimmed);
    if (!decoded.startsWith("Error")) return decoded;
  }

  // 5. URL
  if (trimmed.includes("%")) {
    const decoded = urlDecode(trimmed);
    if (!decoded.startsWith("Error")) return decoded;
  }

  return "Could not auto-detect encoding.";
};
