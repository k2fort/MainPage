/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#00FFFF",
                accent: "#FF003C",
                "background-dark": "#050505",
                surface: "#111111",
                muted: "#444444",
                "text-main": "#E0E0E0",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            boxShadow: {
                hard: "4px 4px 0px #00FFFF",
                "hard-red": "4px 4px 0px #FF003C",
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)",
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
                'blink': 'blink 1s step-end infinite',
                'scanline': 'scanline 8s linear infinite',
                'glitch': 'glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' }
                }
            }
        },
    },
    plugins: [],
}
