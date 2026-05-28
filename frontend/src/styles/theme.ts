export const theme = {
  page: "min-h-screen bg-app-bg text-app-text",

  layout: {
    appShell: "min-h-screen bg-app-bg text-app-text",
    main: "flex-1 px-4 py-6 pb-24 md:px-8 md:pb-6",
  },

  card: {
    base: "rounded-2xl border border-app-border bg-app-card shadow-app",
    padded: "rounded-2xl border border-app-border bg-app-card p-6 shadow-app",
    soft: "rounded-2xl border border-app-border bg-app-card-soft p-6",
  },

  button: {
    primary:
      "rounded-xl bg-app-primary px-4 py-2 font-semibold text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50",
    secondary:
      "rounded-xl border border-app-border bg-app-surface px-4 py-2 font-semibold text-app-text transition hover:border-app-border-strong hover:bg-app-card-soft disabled:cursor-not-allowed disabled:opacity-50",
    danger:
      "rounded-xl bg-app-danger px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
    ghost:
      "rounded-xl px-4 py-2 font-semibold text-app-muted transition hover:bg-app-card-soft hover:text-app-text disabled:cursor-not-allowed disabled:opacity-50",
  },

  input:
    "w-full rounded-xl border border-app-border bg-app-surface px-4 py-3 text-app-text outline-none transition placeholder:text-app-subtle focus:border-app-primary",

  text: {
    title: "text-3xl font-bold text-app-text",
    subtitle: "text-app-muted",
    muted: "text-app-muted",
    subtle: "text-app-subtle",
    gold: "text-app-gold",
    primary: "text-app-primary",
  },

  nav: {
    sidebar:
      "hidden w-64 flex-col border-r border-app-border bg-app-surface/80 p-4 md:flex",
    navItem: "flex items-center gap-3 rounded-xl px-4 py-3 transition",
    navItemActive: "bg-app-primary text-white shadow-glow-green",
    navItemInactive:
      "text-app-muted hover:bg-app-card-soft hover:text-app-text",
    bottom:
      "fixed bottom-0 left-0 right-0 z-50 border-t border-app-border bg-app-surface/95 px-2 py-2 backdrop-blur md:hidden",
    bottomItem:
      "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs transition",
  },
};
