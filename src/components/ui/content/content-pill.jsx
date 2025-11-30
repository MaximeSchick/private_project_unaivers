// src/components/ui/content/content-pill.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function ContentPill({ children, className }) {
  return <span className={cn("pill", "bg-transparent", className)}>{children}</span>;
}
