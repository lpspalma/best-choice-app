export function getStandingDescriptionLabel(description?: string) {
  if (!description) {
    return "Sem status";
  }

  const translations: Record<string, string> = {
    "Qualification - Round of 32": "Classificado - 16 avos",
    "Possible Best 3rd Place": "Possível melhor 3º colocado",
    Eliminated: "Eliminado",
  };

  return translations[description] ?? description;
}
