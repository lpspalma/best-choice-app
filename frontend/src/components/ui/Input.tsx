import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { theme } from "../../styles/theme";
import { Button } from "./Button";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showPasswordToggle?: boolean;
};

export function Input({
  className = "",
  type,
  showPasswordToggle = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password" && showPasswordToggle;

  return (
    <div className="relative w-full">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        className={`
          ${theme.input}
          ${isPasswordField ? "pr-12" : ""}
          ${className}
        `}
        {...props}
      />

      {isPasswordField && (
        <Button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          variant="ghost"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
        </Button>
      )}
    </div>
  );
}
