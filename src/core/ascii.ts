import figlet from "figlet";

const FONT_BASE_URL = "https://unpkg.com/figlet/fonts/";

/**
 * ASCII Art Generator
 */
export const generateASCII = (
    text: string,
    font: string = "Standard"
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const options: any = {
            font: font,
            horizontalLayout: "default",
            verticalLayout: "default",
        };

        if (typeof window !== "undefined") {
            // @ts-ignore
            figlet.loadFont(font, (err) => {
                if (err) {
                    fetch(`${FONT_BASE_URL}${font}.flf`)
                        .then(res => res.text())
                        .then(fontData => {
                            figlet.parseFont(font, fontData);
                            figlet.text(text, options, (err, data) => {
                                if (err) reject("Error generating ASCII art");
                                else resolve(data || "");
                            });
                        })
                        .catch(() => reject(`Failed to load font: ${font}`));
                    return;
                }
                figlet.text(text, options, (err, data) => {
                    if (err) reject("Error generating ASCII art");
                    else resolve(data || "");
                });
            });
        } else {
            figlet.text(text, options, (err, data) => {
                if (err) reject("Error generating ASCII art");
                else resolve(data || "");
            });
        }
    });
};

/**
 * List available fonts
 */
export const getASCIIFonts = (): string[] => {
    return [
        "Standard",
        "Slant",
        "Shadow",
        "Small",
        "Script",
        "Mini",
        "Big",
        "Bubble",
        "Block",
        "Digital",
    ];
};
