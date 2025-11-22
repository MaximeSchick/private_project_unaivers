// src/services/websocket.js

export function createChatWebSocket(sessionId) {
  const url = `ws://localhost:3001/chat?sessionId=${encodeURIComponent(
    sessionId
  )}`;

  const ws = new WebSocket(url);
  return ws;
}
