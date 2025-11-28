// src/services/websocket.js

export function createChatWebSocket(options) {
  const { sessionId, onOpen, onMessage, onClose, onError } =
    typeof options === "string" ? { sessionId: options } : options || {};

  if (!sessionId) {
    console.warn("createChatWebSocket appele sans sessionId");
    return null;
  }

  const url = `ws://localhost:3001/chat?sessionId=${encodeURIComponent(sessionId)}`;
  const ws = new WebSocket(url);

  if (onOpen) ws.addEventListener("open", onOpen);
  if (onMessage) ws.addEventListener("message", onMessage);
  if (onClose) ws.addEventListener("close", onClose);
  if (onError) ws.addEventListener("error", onError);

  return ws;
}
