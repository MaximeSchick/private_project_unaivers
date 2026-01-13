import React from "react";
import { cn } from "../../../lib/utils";
import UniverseOrb from "./universe-orb";

export const MESSAGE_ORB_SIZE = 30;

export function getMessageOrbWrapperSize(size) {
  const glowPadding = Math.max(4, Math.round(size * 0.18));
  return size + glowPadding * 2;
}

export default function MessageOrb({
  mode = "idle",
  size = MESSAGE_ORB_SIZE,
  orbBaseSize,
  className,
  layoutId = "universe-orb",
}) {
  const wrapperSize = getMessageOrbWrapperSize(size);
  const baseSize = orbBaseSize || size;
  const scale = size / baseSize;

  return (
    <UniverseOrb
      size={wrapperSize}
      orbSize={baseSize}
      scale={scale}
      mode={mode}
      layoutId={layoutId}
      className={cn("rounded-full", className)}
    />
  );
}
