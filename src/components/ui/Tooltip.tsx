"use client";

import React from "react";

interface TooltipProps {
  label: string;
  side?: "right" | "bottom";
  align?: "center" | "start" | "end";
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Tooltip({
  label,
  side = "bottom",
  align = "center",
  disabled = false,
  fullWidth = false,
  children,
}: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const alignClasses =
    align === "start"
      ? "left-0"
      : align === "end"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  const positionClasses =
    side === "right"
      ? "left-full top-1/2 ml-2.5 -translate-y-1/2"
      : `top-full mt-2 ${alignClasses}`;

  return (
    <div
      className={`group/tooltip relative inline-flex justify-center ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-[#202124] px-2.5 py-1 text-[11px] font-medium text-white shadow-lg opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 ${positionClasses}`}
      >
        {label}
      </span>
    </div>
  );
}
