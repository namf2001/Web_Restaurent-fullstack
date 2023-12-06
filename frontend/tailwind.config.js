/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        fontFamily: {
            display: ["Open Sans", "sans-serif"],
            body: ["Open Sans", "sans-serif"],
        },
        extend: {
            fontSize: {
                14: "14px",
            },
            textShadow: {
                default: "1px 1px 2px #EA736D", // Customize the default text shadow effect
                large: "2px 2px 4px #EA736D", // Add a custom text shadow variant
            },
            backgroundColor: {
                "primary-color-67": "#EA736D",
                "base/dark-bg-2-14": "#1F1D2B",
                "base/dark-bg-1-18": "#252836",
                "base/dark-line": "#2D303E",
                "base/dark-line-1": "#393C49",
                "main-dark-bg": "#20232A",
                "secondary-dark-bg": "#33373E",
                "light-gray": "#F7F7F7",
                "half-transparent": "rgba(0, 0, 0, 0.5)",
                // light mode
                "light-bg": "#F9F5F0",
                "light-bg-1": "#F2EAD3",
                "light-bg-2": "#321313",
            },
            borderWidth: {
                1: "1px",
                16: "16px",
            },
            borderColor: {
                color: "#EA736D",
                dark: "#2D303E",
                "dark-1": "#1F1D2B",
                // light mode
                "light-bg": "#F9F5F0",
                "light-bg-1": "#F2EAD3",
            },
            width: {
                100: "100px",
                400: "400px",
                760: "760px",
                780: "780px",
                800: "800px",
                1000: "1000px",
                1200: "1200px",
                1400: "1400px",
            },
            height: {
                80: "80px",
            },
            minHeight: {
                590: "590px",
            },
            backgroundImage: {
                "hero-pattern":
                    "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
            },
            colors: {
                "primary-color": "#EA736D",
                light: "#ABBBC2",
                dark: "#321313",
                "dark-1": "#1F1D2B",
                // light mode
                "light-bg": "#F9F5F0",
                "light-bg-1": "#F2EAD3",
            },
            boxShadow: {
                "3xl": "0 0 10px #EA736D",
            },
            dropShadow: {
                "3xl": "0 0 10px #EA736D",
                "4xl": "0 10px 10px #000",
            },
        },
    },
    plugins: [
        // ...
        require("tailwind-scrollbar")({ nocompatible: true }),
        // require("@tailwindcss/forms"),
    ],
};
