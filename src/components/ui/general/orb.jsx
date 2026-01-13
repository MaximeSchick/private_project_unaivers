// src/components/ui/general/orb.jsx
import React from "react";
import { cn } from "../../../lib/utils";
import { ORB_MODE_STYLES } from "./orb-mode-styles";

export default function Orb({
  className,
  size = 180,
  mode = "idle", // "idle" | "thinking" | "speaking"
  primaryColor,
  secondaryColor,
}) {
  const fallback = ORB_MODE_STYLES[mode] || ORB_MODE_STYLES.idle;
  const basePrimary = primaryColor || fallback.primary;
  const baseSecondary = secondaryColor || fallback.secondary;

  // vitesses différentes selon le mode
  const speedMap = {
    idle: {
      aurora: 20,
      pulse: 3.0,
    },
    thinking: {
      aurora: 14,
      pulse: 2.0,
    },
    speaking: {
      aurora: 6,
      pulse: 1.2, // 🏎 beaucoup plus rapide quand ça “parle”
    },
  };

  const current = speedMap[mode] || speedMap.idle;

  const styleVars = {
    "--orb-color1": basePrimary,
    "--orb-color2": baseSecondary,
    "--orb-aurora-duration": `${current.aurora}s`,
    "--orb-pulse-duration": `${current.pulse}s`,
  };

  return (
    <>
      <style>
        {`
          @keyframes ai-orb-aurora {
            from {
              background-position: 50% 50%, 50% 50%;
            }
            to {
              background-position: 350% 50%, 350% 50%;
            }
          }

          @keyframes ai-orb-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.08);
              opacity: 1;
            }
          }

          .ai-orb-aurora-layer {
            background-image:
              repeating-linear-gradient(
                120deg,
                var(--orb-color1, rgba(245, 92, 92, 1)) 0%,
                var(--orb-color2, rgba(247, 192, 192, 1)) 10%,
                var(--orb-color1, rgba(212, 54, 54, 1)) 20%,
                rgba(241, 62, 62, 1) 30%,
                var(--orb-color2, rgba(253, 212, 212, 1)) 40%
              );
            background-size: 220% 220%;
            background-position: 50% 50%;
            filter: blur(30px);
            mix-blend-mode: screen;
            animation:
              ai-orb-aurora var(--orb-aurora-duration, 20s) linear infinite,
              ai-orb-pulse var(--orb-pulse-duration, 3s) ease-in-out infinite;
            transition:
              filter 0.6s ease,
              background-position 0.6s ease;
          }
        `}
      </style>

      <div
        className={cn(
          "relative flex items-center justify-center",
          className
        )}
        style={{ width: size, height: size }}
      >
        <div
          className={cn(
            "relative w-full h-full rounded-full bg-transparent overflow-hidden",
            "transition-[box-shadow,background-color] duration-500 ease-out"
          )}
          style={{
            ...styleVars,
            boxShadow:
              mode === "speaking"
                ? "0 0 40px rgba(219, 83, 83, 1)"
                : mode === "thinking"
                ? "0 0 30px rgba(238, 194, 200, 1)"
                : "0 0 24px rgba(228, 97, 97, 1)",
          }}
        >
          <div className="absolute -inset-[30%] rounded-full ai-orb-aurora-layer" />
        </div>
      </div>
    </>
  );
}
