const LOCALE = "pt-BR";

export function formatGameDate(date: string) {
  return new Date(date).toLocaleDateString(LOCALE);
}

export function formatGameTime(date: string) {
  return new Date(date).toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(date: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatGameDateTime(date: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
