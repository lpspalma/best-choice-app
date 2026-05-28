import type { ReactNode } from "react";
import { theme } from "../../styles/theme";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "base" | "padded" | "soft";
};

export function Card({
  children,
  className = "",
  variant = "padded",
}: CardProps) {
  return (
    <div
      className={`
        ${theme.card[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
