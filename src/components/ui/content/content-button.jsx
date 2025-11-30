// src/components/ui/content/content-button.jsx
import React from "react";
import { cn } from "../../../lib/utils";

const variants = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.55)]",
  accent:
    "btn-accent text-white shadow-[0_12px_40px_-18px_rgba(220,38,38,0.45)] hover:shadow-[0_16px_44px_-18px_rgba(220,38,38,0.55)]",
  ghost:
    "bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.65)]",
};

export default function ContentButton({
  children,
  href,
  variant = "primary",
  className,
  ...props
}) {
  const asLink = Boolean(href);
  const Component = asLink ? "a" : "button";

  return (
    <Component
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
        "transition-all duration-200 ease-out cursor-pointer",
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
