import type { ReactNode } from "react";

import { theme } from "../../styles/theme";
import { Card } from "../ui/Card";

type DashboardSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardSection({
  title,
  description,
  action,
  children,
  className = "",
}: DashboardSectionProps) {
  return (
    <Card className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div>
          <h2 className="text-lg font-semibold text-app-text md:text-xl">
            {title}
          </h2>

          {description && (
            <p className={`text-sm md:text-base ${theme.text.subtitle}`}>
              {description}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {children}
    </Card>
  );
}
