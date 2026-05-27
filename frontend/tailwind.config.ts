export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#050B14",
          card: "#0B1220",
          cardSoft: "#111827",
          border: "rgba(255,255,255,0.08)",

          primary: "#46C24A",
          primaryHover: "#57D85B",

          gold: "#F5B938",

          text: "#FFFFFF",
          muted: "#94A3B8",
        },
      },
    },
  },
  plugins: [],
};
