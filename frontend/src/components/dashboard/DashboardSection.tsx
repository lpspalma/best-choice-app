import type { ReactNode } from "react";

import { Card } from "../ui/Card";
import { theme } from "../../styles/theme";

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
      <div className="flex items-center justify-between gap-4">
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

        {action}
      </div>

      {children}
    </Card>
  );
}
