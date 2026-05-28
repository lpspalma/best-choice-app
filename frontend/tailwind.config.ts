import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        app: {
          bg: "#050B14",
          surface: "#08111F",
          card: "#0B1220",
          cardSoft: "#111827",

          border: "rgba(255, 255, 255, 0.08)",
          borderStrong: "rgba(255, 255, 255, 0.16)",

          primary: "#46C24A",
          primaryHover: "#57D85B",
          primarySoft: "rgba(70, 194, 74, 0.14)",

          gold: "#F5B938",
          goldSoft: "rgba(245, 185, 56, 0.14)",

          danger: "#EF4444",
          dangerSoft: "rgba(239, 68, 68, 0.14)",

          text: "#FFFFFF",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },

      boxShadow: {
        app: "0 20px 60px rgba(0, 0, 0, 0.35)",
        glowGreen: "0 0 24px rgba(70, 194, 74, 0.22)",
        glowGold: "0 0 24px rgba(245, 185, 56, 0.18)",
      },
    },
  },

  plugins: [],
} satisfies Config;
