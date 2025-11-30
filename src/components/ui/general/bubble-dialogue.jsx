// src/components/ui/general/bubble-dialogue.jsx
import React from "react";
import { cn } from "../../../lib/utils";

export default function BubbleDialogueUI({
  messages,
  className,
  textColorClass = "text-white/80", // rouge clair fixe
}) {
  if (!messages || messages.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes bubble-dialogue-in {
            0% {
              opacity: 0;
              transform: translateY(-14px) scale(0.6);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes bubble-dialogue-out {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-4px) scale(0.9);
            }
          }

          .bubble-dialogue-enter {
            animation: bubble-dialogue-in 0.32s ease-out both;
            transform-origin: center top;
          }

          .bubble-dialogue-exit {
            animation: bubble-dialogue-out 0.28s ease-in both;
            transform-origin: center top;
          }
        `}
      </style>

      <div
        className={cn(
          "flex flex-col items-center justify-start gap-2 w-full mt-4",
          className
        )}
      >
        {messages.map((m, idx) => (
          <div
            key={m.id}
            className={cn(
              "inline-flex max-w-2xl self-center origin-top",
              "rounded-3xl border border-white/10 bg-black/60",
              "backdrop-blur-md px-5 py-3 mt-1",
              m.isFading ? "bubble-dialogue-exit" : "bubble-dialogue-enter"
            )}
            style={{ zIndex: messages.length - idx }}
          >
            <p
              className={cn(
                "text-sm leading-relaxed text-center",
                textColorClass
              )}
            >
              {m.visibleText}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
