import type { InputHTMLAttributes } from "react";
import { theme } from "../../styles/theme";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        ${theme.input}
        ${className}
      `}
      {...props}
    />
  );
}
