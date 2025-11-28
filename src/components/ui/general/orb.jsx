// src/components/ui/general/orb.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function Orb({
  className,
  size = 180,
  mode = "idle", // "idle" | "thinking" | "speaking"
  primaryColor,
  secondaryColor,
}) {
  const basePrimary = primaryColor || "rgba(255, 120, 120, 0.9)";
  const baseSecondary = secondaryColor || "rgba(255, 180, 180, 0.8)";

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
              opacity: 0.9;
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
                var(--orb-color1, rgba(255, 120, 120, 0.9)) 0%,
                var(--orb-color2, rgba(255, 180, 180, 0.8)) 10%,
                var(--orb-color1, rgba(255, 120, 120, 0.9)) 20%,
                rgba(255, 80, 80, 0.95) 30%,
                var(--orb-color2, rgba(255, 180, 180, 0.8)) 40%
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
            "relative w-full h-full rounded-full bg-black/90 overflow-hidden",
            "transition-[box-shadow,background-color] duration-500 ease-out"
          )}
          style={{
            ...styleVars,
            boxShadow:
              mode === "speaking"
                ? "0 0 40px rgba(248,113,113,0.8)"
                : mode === "thinking"
                ? "0 0 30px rgba(244,114,182,0.7)"
                : "0 0 24px rgba(248,113,113,0.4)",
          }}
        >
          <div className="absolute -inset-[30%] rounded-full ai-orb-aurora-layer" />
        </div>
      </div>
    </>
  );
}
