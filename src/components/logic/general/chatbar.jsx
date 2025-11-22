// src/components/logic/general/chatbar.jsx
import React, { useEffect, useState } from "react";
import ChatBarUI from "../../ui/general/chatbar";
import { createChatWebSocket } from "../../../services/websocket";

export default function ChatBarLogic({
  sessionId,
  userRole = "player",
  placeholder = "Décris ton action...",
}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null);
  const [animateChatInput, setAnimateChatInput] = useState(false);

  const isSpectator = userRole === "spectator";

  // Connexion WebSocket + gestion des messages
  useEffect(() => {
    if (!sessionId) return;

    const ws = createChatWebSocket(sessionId);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = event.data;
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [sessionId]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!socket || !trimmed || isSpectator) return;

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
      messages={messages}
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
