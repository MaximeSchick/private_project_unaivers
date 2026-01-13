// src/components/logic/general/chatbar.jsx
import React, { useEffect, useState } from "react";
import ChatBarUI from "../../ui/general/chatbar";
import { createChatWebSocket } from "../../../services/websocket";
import { extractTextFromEvent } from "../../../lib/chat-utils";

export default function ChatBarLogic({
  sessionId,
  userRole = "player",
  placeholder = "Decris ton action...",
  onSend,
  onAiMessage,
  onAiClick,
  onToggleView,
  showToggleView = false,
  toggleDisabled = false,
  toggleLabel,
  showAiButton = true,
}) {
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);
  const [animateChatInput, setAnimateChatInput] = useState(false);

  const isSpectator = userRole === "spectator";

  useEffect(() => {
    // Demo sessions do not open a socket.
    if (!sessionId || sessionId === "demo-session") {
      setSocket(null);
      return;
    }

    const ws = createChatWebSocket({
      sessionId,
      onOpen: () => {
        console.log("WebSocket ouvert");
      },
      onMessage: (event) => {
        const text = extractTextFromEvent(event);
        if (text && onAiMessage) {
          onAiMessage(text);
        }
      },
      onClose: () => {
        console.log("WebSocket ferme");
      },
      onError: (err) => {
        console.warn("WebSocket erreur", err);
      },
    });

    setSocket(ws);

    return () => {
      ws?.close();
      setSocket(null);
    };
  }, [sessionId, onAiMessage]);

  useEffect(() => {
    if (!animateChatInput) return;

    const t = setTimeout(() => {
      setAnimateChatInput(false);
    }, 1200);

    return () => clearTimeout(t);
  }, [animateChatInput]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    const isReady = socket && socket.readyState === WebSocket.OPEN;
    if (!trimmed || isSpectator) return;

    if (isReady) {
      socket.send(JSON.stringify({ content: trimmed }));
    }

    setInputValue("");

    if (onSend) {
      onSend(trimmed);
    }

    setAnimateChatInput(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleAiClick() {
    if (onAiClick) {
      onAiClick();
    }
  }

  return (
    <ChatBarUI
      inputValue={inputValue}
      onInputChange={(e) => setInputValue(e.target.value)}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onAiClick={handleAiClick}
      onToggleView={onToggleView}
      showToggleView={showToggleView}
      toggleDisabled={toggleDisabled}
      toggleLabel={toggleLabel}
      userRole={userRole}
      placeholder={placeholder}
      animateChatInput={animateChatInput}
      showAiButton={showAiButton}
    />
  );
}
