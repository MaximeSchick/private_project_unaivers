// src/components/ui/general/ai-orb.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function AiOrb({ className, size = 180 }) {
  return (
    <>
      {/* Styles globaux pour l'orb */}
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
              opacity: 0.85;
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
                rgba(255, 80, 80, 0.85) 0%,
                rgba(255, 120, 120, 0.7) 8%,
                rgba(255, 80, 80, 0.85) 16%,
                rgba(255, 40, 40, 0.9) 24%,
                rgba(255, 120, 120, 0.7) 32%
              );
            background-size: 220% 220%;
            background-position: 50% 50%;
            filter: blur(30px);
            mix-blend-mode: screen;
            animation: ai-orb-aurora 16s linear infinite,
                       ai-orb-pulse 2.4s ease-in-out infinite;
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
        {/* Carré de base qui devient un rond */}
        <div className="relative w-full h-full rounded-full bg-black/90 overflow-hidden">
          {/* Aura rouge animée */}
          <div className="absolute -inset-[30%] rounded-full ai-orb-aurora-layer" />
        </div>
      </div>
    </>
  );
}
