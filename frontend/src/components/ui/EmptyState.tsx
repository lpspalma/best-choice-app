import type { ReactNode } from "react";

import { Card } from "./Card";
import { theme } from "../../styles/theme";

type EmptyStateProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <Card>
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-lg font-semibold text-app-text">{title}</h2>

        {description && <p className={theme.text.subtitle}>{description}</p>}

        {children}
      </div>
    </Card>
  );
}
