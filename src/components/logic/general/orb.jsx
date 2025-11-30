// src/components/logic/general/orb.jsx
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import OrbUI from "../../ui/general/orb";
import BubbleDialogueUI from "../../ui/general/bubble-dialogue";
import { useBubbleDialogue } from "./bubble-dialogue";

// Couleurs par mode
const DEFAULT_MODE_STYLES = {
  idle: {
    primary: "rgba(255,120,120,0.8)",
    secondary: "rgba(255,180,180,0.7)",
  },
  thinking: {
    primary: "rgba(244,114,182,0.9)",
    secondary: "rgba(251,113,133,0.8)",
  },
  speaking: {
    primary: "rgba(252,165,165,1)",
    secondary: "rgba(248,113,113,0.95)",
  },
};

export default function OrbLogic({
  size = 180,
  className,
  modeStyles = DEFAULT_MODE_STYLES,
  registerAddMessage, // callback fourni par la couche de dialogue
}) {
  const [mode, setMode] = useState("idle");

  const handleStartTyping = useCallback(() => setMode("speaking"), []);
  const handleStopTyping = useCallback(() => setMode("idle"), []);
  const handleEmpty = useCallback(() => setMode("idle"), []);

  const { messages, addMessage } = useBubbleDialogue({
    maxMessages: 2,
    visibleDuration: 10000, // 10s avant shrink/fade
    onStartTyping: handleStartTyping,
    onStopTyping: handleStopTyping,
    onEmpty: handleEmpty,
  });

  // Permet a la couche dialogue (demo ou websocket) de piloter l'ajout de messages
  useEffect(() => {
    if (typeof registerAddMessage === "function") {
      registerAddMessage(addMessage);
    }
  }, [registerAddMessage, addMessage]);

  const currentStyle =
    modeStyles[mode] || modeStyles.idle || DEFAULT_MODE_STYLES.idle;

  // Zone reservee pour garder le chat fixe et permettre ~3 bulles sous l'orbe
  const bubbleZoneHeight = Math.max(size * 0.7, 100);
  const gapBetweenOrbAndBubbles = Math.max(10, size * 0.06);
  const reservedHeight = size + bubbleZoneHeight;

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div
        className="flex flex-col items-center w-full"
        style={{ minHeight: reservedHeight }}
      >
        <div
          className="relative z-10"
          style={{ marginBottom: gapBetweenOrbAndBubbles }}
        >
          <OrbUI
            size={size}
            mode={mode}
            primaryColor={currentStyle.primary}
            secondaryColor={currentStyle.secondary}
          />
        </div>

        <div className="w-full flex justify-center" style={{ minHeight: bubbleZoneHeight }}>
          <BubbleDialogueUI messages={messages} />
        </div>
      </div>
    </div>
  );
}
