import { getTeamNamePt } from "../../utils/translators/team";

type GameTeamProps = {
  name: string;
  logo?: string;
  shortName?: string;
  alignRight?: boolean;
};

export function GameTeam({
  name,
  logo,
  shortName,
  alignRight = false,
}: GameTeamProps) {
  const translatedName = getTeamNamePt(name);
  const displayShortName =
    shortName ?? translatedName.slice(0, 3).toUpperCase();

  return (
    <div
      className={`flex min-w-0 items-center gap-2 ${
        alignRight ? "justify-end text-right" : ""
      }`}
    >
      {!alignRight && <TeamLogo logo={logo} name={translatedName} />}

      <p className="text-center text-[10px] font-semibold text-app-text md:hidden">
        {displayShortName}
      </p>

      <p className="hidden truncate text-sm font-semibold text-app-text md:block">
        {translatedName}
      </p>

      {alignRight && <TeamLogo logo={logo} name={translatedName} />}
    </div>
  );
}

function TeamLogo({ logo, name }: { logo?: string; name: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-app-card-soft md:h-10 md:w-10">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="h-8 w-8 object-contain md:h-7 md:w-7"
        />
      ) : (
        <span className="text-xs font-bold text-app-muted">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
