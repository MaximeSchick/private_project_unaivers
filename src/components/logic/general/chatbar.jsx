// src/components/logic/general/chatbar.jsx
import React, { useEffect, useState } from "react";
import ChatBarUI from "../../ui/general/chatbar";
import { createChatWebSocket } from "../../../services/websocket";

export default function ChatBarLogic({
  sessionId,
  userRole = "player",
  placeholder = "Decris ton action...",
}) {
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);
  const [animateChatInput, setAnimateChatInput] = useState(false);

  const isSpectator = userRole === "spectator";

  useEffect(() => {
    // MODE DEMO : pas de WebSocket pour la session "demo-session"
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
        // a brancher sur l'UI si besoin d'historique de chat
        console.debug("Message recu", event.data);
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
  }, [sessionId]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    const isReady = socket && socket.readyState === WebSocket.OPEN;
    if (!isReady || !trimmed || isSpectator) return;

    socket.send(JSON.stringify({ content: trimmed }));
    setInputValue("");

    setAnimateChatInput(true);
    setTimeout(() => setAnimateChatInput(false), 180);
  }

  function handleKeyDown(e) {
    // Enter = envoyer, Shift+Enter = saut de ligne
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleAiClick() {
    console.log("AI button clicked");
  }

  return (
    <ChatBarUI
      inputValue={inputValue}
      onInputChange={(e) => setInputValue(e.target.value)}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onAiClick={handleAiClick}
      userRole={userRole}
      placeholder={placeholder}
      animateChatInput={animateChatInput}
    />
  );
}
