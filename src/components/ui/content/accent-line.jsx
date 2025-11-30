// src/components/ui/content/accent-line.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function AccentLine({ className }) {
  return <div className={cn("content-accent-line mx-auto", className)} />;
}
