// src/components/ui/content/media-placeholder.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function MediaPlaceholder({
  label = "Visuel en attente",
  aspectRatio = "16 / 9",
  className,
  tone = "light",
}) {
  const toneClass =
    tone === "dark"
      ? "bg-neutral-900 border-neutral-800"
      : "bg-neutral-100 border-neutral-200/80";

  return (
    <div
      className={cn("media-placeholder", toneClass, className)}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent" />
      </div>
      <p className="label">{label}</p>
    </div>
  );
}
