// src/components/ui/content/section-header.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  alignment = "center",
  superTitle,
  className,
}) {
  const alignmentClass =
    alignment === "left"
      ? "items-start text-left"
      : alignment === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <div className={cn("flex flex-col gap-3", alignmentClass, className)}>
      {eyebrow && <p className="content-eyebrow">{eyebrow}</p>}
      {superTitle && (
        <p className="text-sm font-semibold text-neutral-500">{superTitle}</p>
      )}
      {title && <h2 className="content-title">{title}</h2>}
      {description && (
        <p className="content-lead max-w-3xl">{description}</p>
      )}
    </div>
  );
}
