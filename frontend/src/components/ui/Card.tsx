import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        p-6
        shadow-lg
        shadow-cyan-500/5
        ${className}
      `}
    >
      {children}
    </div>
  );
}
