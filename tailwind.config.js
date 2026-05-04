/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        // All colours are driven by CSS vars so both themes work.
        bg:       "var(--bg)",
        surface:  "var(--bg-surface)",
        subtle:   "var(--bg-subtle)",
        muted:    "var(--bg-muted)",
        fg:       "var(--fg)",
        "fg-muted":   "var(--fg-muted)",
        "fg-subtle":  "var(--fg-subtle)",
        border:       "var(--border)",
        "border-strong": "var(--border-strong)",
        accent:       "var(--accent)",
        "accent-text":   "var(--accent-text)",
        "accent-subtle": "var(--accent-subtle)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        sm:     "var(--shadow-sm)",
        md:     "var(--shadow-md)",
        lg:     "var(--shadow-lg)",
        accent: "var(--shadow-accent)",
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "fade-up": "fadeUp 0.5s ease forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
