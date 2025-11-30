// src/components/ui/content/metric-card.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function MetricCard({
  label,
  iconClass,
  value,
  detail,
  footnote,
  tone = "light",
  className,
}) {
  const toneClass =
    tone === "dark"
      ? "bg-neutral-900 text-white border-neutral-800"
      : "bg-transparent";

  return (
    <div className={cn("soft-card flex flex-col gap-3", toneClass, className)}>
      {(label || iconClass) && (
        <div className="flex items-center gap-2">
          {iconClass && <i className={cn("content-icon", iconClass)} aria-hidden />}
          {label && <p className="content-eyebrow">{label}</p>}
        </div>
      )}
      {value && <p className="content-stat-value">{value}</p>}
      {detail && <p className="content-lead text-neutral-600">{detail}</p>}
      {footnote && <p className="content-footnote">{footnote}</p>}
    </div>
  );
}
