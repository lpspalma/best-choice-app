import { Button } from "./Button";
import { formatShortDate } from "../../utils/date";

type DateTabsProps = {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;

  showAllOption?: boolean;
  allLabel?: string;
};

export function DateTabs({
  dates,
  selectedDate,
  onSelectDate,
  showAllOption = false,
  allLabel = "Todos",
}: DateTabsProps) {
  return (
    <div className="-mx-1 mb-4 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
      {showAllOption && (
        <Button
          type="button"
          onClick={() => onSelectDate("all")}
          variant={selectedDate === "all" ? "primary" : "secondary"}
          className="shrink-0 rounded-full"
        >
          {allLabel}
        </Button>
      )}

      {dates.map((date) => (
        <Button
          key={date}
          type="button"
          onClick={() => onSelectDate(date)}
          variant={selectedDate === date ? "primary" : "secondary"}
          className="shrink-0 rounded-full"
        >
          {formatShortDate(date)}
        </Button>
      ))}
    </div>
  );
}
