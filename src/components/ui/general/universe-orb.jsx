import React from "react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import Orb from "./orb";

export default function UniverseOrb({
  size = 180,
  orbSize,
  scale,
  mode = "idle",
  wrapperSize,
  className,
  layoutId = "universe-orb",
  transition = { type: "spring", stiffness: 120, damping: 26, mass: 1.3 },
  ariaHidden = true,
}) {
  const containerSize = wrapperSize || size;
  const resolvedOrbSize = orbSize || size;
  const resolvedScale = typeof scale === "number" ? scale : 1;

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={false}
      transition={transition}
      aria-hidden={ariaHidden}
      className={cn("relative flex items-center justify-center overflow-visible", className)}
      style={{ width: containerSize, height: containerSize }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          transform: resolvedScale !== 1 ? `scale(${resolvedScale})` : undefined,
          transformOrigin: "center",
        }}
      >
        <Orb size={resolvedOrbSize} mode={mode} />
      </div>
    </motion.div>
  );
}
