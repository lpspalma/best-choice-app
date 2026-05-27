import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-950
        px-4
        py-3
        text-slate-100
        outline-none
        transition
        focus:border-cyan-400
        ${className}
      `}
      {...props}
    />
  );
}
