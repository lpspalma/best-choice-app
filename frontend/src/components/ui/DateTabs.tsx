import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { formatShortDate } from "../../utils/formatters/date";
import { Button } from "./Button";

type DateTabsProps = {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;

  showAllOption?: boolean;
  allLabel?: string;
};

const MOBILE_VISIBLE_DATES = 3;
const DESKTOP_VISIBLE_DATES = 7;

export function DateTabs({
  dates,
  selectedDate,
  onSelectDate,
  showAllOption = false,
  allLabel = "Todos",
}: DateTabsProps) {
  const selectedDateIndex = dates.findIndex((date) => date === selectedDate);

  const [startIndex, setStartIndex] = useState(
    selectedDateIndex >= 0 ? selectedDateIndex : 0,
  );

  const visibleMobileDates = useMemo(
    () => dates.slice(startIndex, startIndex + MOBILE_VISIBLE_DATES),
    [dates, startIndex],
  );

  const visibleDesktopDates = useMemo(
    () => dates.slice(startIndex, startIndex + DESKTOP_VISIBLE_DATES),
    [dates, startIndex],
  );

  function handlePrevious() {
    if (selectedDateIndex <= 0) {
      return;
    }

    const newIndex = selectedDateIndex - 1;

    setStartIndex((current) => Math.min(current, newIndex));
    onSelectDate(dates[newIndex]);
  }

  function handleNext() {
    if (selectedDateIndex >= dates.length - 1) {
      return;
    }

    const maxVisibleDates =
      window.innerWidth >= 768 ? DESKTOP_VISIBLE_DATES : MOBILE_VISIBLE_DATES;

    const newIndex = selectedDateIndex + 1;
    const shouldAdvanceWindow = newIndex >= startIndex + maxVisibleDates;

    if (shouldAdvanceWindow) {
      setStartIndex((current) => current + 1);
    }

    onSelectDate(dates[newIndex]);
  }

  return (
    <div className="mb-4 flex items-center gap-2">
      <Button
        type="button"
        onClick={handlePrevious}
        disabled={selectedDateIndex <= 0}
        variant="secondary"
        className="shrink-0 rounded-full px-3"
      >
        <ChevronLeft size={16} />
      </Button>

      <div className="grid flex-1 grid-cols-3 gap-2 md:hidden">
        {showAllOption && (
          <Button
            type="button"
            onClick={() => onSelectDate("all")}
            variant={selectedDate === "all" ? "primary" : "secondary"}
            className="rounded-full"
          >
            {allLabel}
          </Button>
        )}

        {visibleMobileDates.map((date) => (
          <Button
            key={date}
            type="button"
            onClick={() => onSelectDate(date)}
            variant={selectedDate === date ? "primary" : "secondary"}
            className="rounded-full"
          >
            {formatShortDate(date)}
          </Button>
        ))}
      </div>

      <div className="hidden flex-1 grid-cols-7 gap-2 md:grid">
        {visibleDesktopDates.map((date) => (
          <Button
            key={date}
            type="button"
            onClick={() => onSelectDate(date)}
            variant={selectedDate === date ? "primary" : "secondary"}
            className="rounded-full"
          >
            {formatShortDate(date)}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        onClick={handleNext}
        disabled={selectedDateIndex >= dates.length - 1}
        variant="secondary"
        className="shrink-0 rounded-full px-3"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
