// src/components/ui/content/section-shell.jsx
import React from "react";
import { cn } from "../../../lib/utils";

const toneClasses = {
  plain: "bg-white",
  mist: "bg-gradient-to-b from-neutral-50 via-white to-neutral-50",
  cloud: "bg-gradient-to-b from-white via-neutral-50 to-white",
  graphite: "bg-neutral-900 text-white",
};

export default function SectionShell({
  children,
  tone = "mist",
  id,
  className,
}) {
  const toneClass = toneClasses[tone] || toneClasses.mist;

  return (
    <section id={id} className={cn("content-shell", toneClass, className)}>
      <div className="content-inner">{children}</div>
    </section>
  );
}
