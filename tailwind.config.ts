import type { Config } from "tailwindcss";

/**
 * Fortune-500 light enterprise system (docs/design-spec.md).
 * Light canvas, deep-navy ink, ONE brand blue. Dark is reserved for product
 * consoles (`bg.deep` family) and the final CTA band / footer.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#016FED",
          link: "#0166CC",
          bright: "#3AA5FF", // on-dark accents only
          teal: "#0FA895",
        },
        status: {
          red: "#D9323B",
          amber: "#B97C10",
          green: "#177245",
          greenDeep: "#0F5132",
        },
        ink: "#0B1B33",
        muted: "#42526B",
        dim: "#5D6C85", // AA on white and #F5F7FA at caption sizes
        bg: {
          DEFAULT: "#FFFFFF",
          raised: "#F5F7FA",
          deep: "#081226",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "'Times New Roman'", "serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,27,51,.05), 0 12px 32px -16px rgba(11,27,51,.12)",
        cardHover: "0 1px 2px rgba(11,27,51,.06), 0 20px 44px -18px rgba(11,27,51,.18)",
        product:
          "inset 0 1px 0 rgba(255,255,255,.08), 0 30px 70px -25px rgba(8,18,38,.55)",
        dropdown: "0 2px 6px rgba(11,27,51,.06), 0 24px 56px -20px rgba(11,27,51,.22)",
      },
      borderColor: {
        hair: "#E3E8F0",
        hair2: "#CBD5E4",
        // on-dark hairlines (product panels, deep band)
        hairDark: "rgba(140,170,215,.22)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up .6s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
