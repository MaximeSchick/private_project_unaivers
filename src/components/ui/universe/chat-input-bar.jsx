import React from "react";
import ChatBarLogic from "../../logic/general/chatbar";

export default function ChatInputBar({
  sessionId,
  userRole = "player",
  onSend,
  onAiMessage,
  onOpenSplit,
  onToggleView,
  hasMessages = false,
  isSplit,
  isPresence,
}) {
  const showAiButton = !isPresence && !isSplit;
  const showToggleView = !isSplit;
  const toggleDisabled = !hasMessages;
  const toggleLabel = isPresence
    ? "Passer en vue chat"
    : "Revenir en vue presence";

  return (
    <ChatBarLogic
      sessionId={sessionId}
      userRole={userRole}
      onSend={onSend}
      onAiMessage={onAiMessage}
      onAiClick={onOpenSplit}
      onToggleView={onToggleView}
      showToggleView={showToggleView}
      toggleDisabled={toggleDisabled}
      toggleLabel={toggleLabel}
      showAiButton={showAiButton}
    />
  );
}
