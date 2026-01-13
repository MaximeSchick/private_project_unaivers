// src/components/logic/general/orb.jsx
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import OrbUI from "../../ui/general/orb";
import BubbleDialogueUI from "../../ui/general/bubble-dialogue";
import { ORB_MODE_STYLES } from "../../ui/general/orb-mode-styles";
import { useBubbleDialogue } from "./bubble-dialogue";

export default function OrbLogic({
  size = 180,
  className,
  modeStyles = ORB_MODE_STYLES,
  showOrb = true,
  renderOrb,
  modeOverride,
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

  const resolvedMode = modeOverride || mode;
  const currentStyle =
    modeStyles[resolvedMode] || modeStyles.idle || ORB_MODE_STYLES.idle;

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
          {showOrb
            ? typeof renderOrb === "function"
              ? renderOrb({
                  size,
                  mode: resolvedMode,
                  primaryColor: currentStyle.primary,
                  secondaryColor: currentStyle.secondary,
                })
              : (
                <OrbUI
                  size={size}
                  mode={resolvedMode}
                  primaryColor={currentStyle.primary}
                  secondaryColor={currentStyle.secondary}
                />
              )
            : null}
        </div>

        <div className="w-full flex justify-center" style={{ minHeight: bubbleZoneHeight }}>
          <BubbleDialogueUI messages={messages} />
        </div>
      </div>
    </div>
  );
}
