import type { ButtonHTMLAttributes } from "react";
import { theme } from "../../styles/theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function Button({
  className = "",
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${theme.button[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
