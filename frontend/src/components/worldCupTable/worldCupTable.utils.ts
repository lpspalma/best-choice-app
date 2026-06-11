export function translateStandingDescription(description?: string) {
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

export function translateRound(round: string) {
  const translations: Record<string, string> = {
    "Round of 32": "16 avos de final",
    "Round of 16": "Oitavas de final",
    "Quarter-finals": "Quartas de final",
    "Semi-finals": "Semifinais",
    Final: "Final",
  };

  return translations[round] ?? round;
}

export function translateTeamName(name: string) {
  const translations: Record<string, string> = {
    Argentina: "Argentina",
    Australia: "Austrália",
    Austria: "Áustria",
    Belgium: "Bélgica",
    Brazil: "Brasil",
    Canada: "Canadá",
    Chile: "Chile",
    Colombia: "Colômbia",
    Croatia: "Croácia",
    Denmark: "Dinamarca",
    Ecuador: "Equador",
    Egypt: "Egito",
    England: "Inglaterra",
    France: "França",
    Germany: "Alemanha",
    Ghana: "Gana",
    Iran: "Irã",
    Italy: "Itália",
    Japan: "Japão",
    Mexico: "México",
    Morocco: "Marrocos",
    Netherlands: "Holanda",
    Nigeria: "Nigéria",
    Norway: "Noruega",
    Paraguay: "Paraguai",
    Peru: "Peru",
    Poland: "Polônia",
    Portugal: "Portugal",
    Qatar: "Catar",
    "Saudi Arabia": "Arábia Saudita",
    Scotland: "Escócia",
    Senegal: "Senegal",
    Serbia: "Sérvia",
    Spain: "Espanha",
    Sweden: "Suécia",
    Switzerland: "Suíça",
    Tunisia: "Tunísia",
    Turkey: "Turquia",
    Ukraine: "Ucrânia",
    Uruguay: "Uruguai",
    USA: "Estados Unidos",
    Wales: "País de Gales",
  };

  return translations[name] ?? name;
}
