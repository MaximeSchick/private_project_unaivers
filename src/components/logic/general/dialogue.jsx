// src/components/logic/general/dialogue.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import OrbLogic from "./orb";
import { TEST_DIALOGUE_LINES } from "../../ui/general/test/dialogue";
import { createChatWebSocket } from "../../../services/websocket";

const DEMO_FIRST_DELAY = 1000; // 2s avant le premier message
const DEMO_MIN_DELAY = 1000; // 10s
const DEMO_MAX_DELAY = 14000; // 14s

function getRandomDelay() {
  return DEMO_MIN_DELAY + Math.random() * (DEMO_MAX_DELAY - DEMO_MIN_DELAY);
}

function getRandomLine(lines) {
  if (!Array.isArray(lines) || lines.length === 0) return "";
  const index = Math.floor(Math.random() * lines.length);
  return lines[index];
}

function extractTextFromEvent(event) {
  const raw = event?.data ?? event;
  if (typeof raw !== "string") return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.content === "string") return parsed.content;
    if (parsed && typeof parsed.message === "string") return parsed.message;
    if (typeof parsed === "string") return parsed;
  } catch {
    // raw n'est pas du JSON, on retourne la chaine brute
    return raw;
  }

  return null;
}

export default function DialogueOrb({
  mode = "normal", // "normal" (WebSocket) | "demo" (messages internes)
  sessionId,
  className,
  size = 180,
  modeStyles,
}) {
  const [addMessage, setAddMessage] = useState(null);
  const timersRef = useRef([]);
  const wsRef = useRef(null);

  const registerAddMessage = useCallback((fn) => {
    // on conserve une ref stable vers addMessage provenant de useBubbleDialogue
    setAddMessage(() => fn);
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const closeSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
      closeSocket();
    };
  }, [clearTimers, closeSocket]);

  const startDemo = useCallback(() => {
    if (!addMessage) return;

    clearTimers();

    const scheduleNext = (first = false) => {
      const delay = first ? DEMO_FIRST_DELAY : getRandomDelay();
      const timer = setTimeout(() => {
        const line = getRandomLine(TEST_DIALOGUE_LINES);
        if (line && addMessage) {
          addMessage(line);
        }
        scheduleNext(false);
      }, delay);
      timersRef.current.push(timer);
    };

    scheduleNext(true);
  }, [addMessage, clearTimers]);

  const startSocket = useCallback(() => {
    if (!addMessage) return;
    if (!sessionId) return;
    if (sessionId === "demo-session") return; // garde-fou supplementaire

    closeSocket();

    const ws = createChatWebSocket({
      sessionId,
      onMessage: (event) => {
        const text = extractTextFromEvent(event);
        if (text) {
          addMessage(text);
        }
      },
    });

    if (!ws) return;

    wsRef.current = ws;
  }, [addMessage, sessionId, closeSocket]);

  useEffect(() => {
    if (!addMessage) return;

    if (mode === "demo") {
      startDemo();
      return () => {
        clearTimers();
      };
    }

    startSocket();
    return () => {
      closeSocket();
    };
  }, [mode, addMessage, sessionId, startDemo, startSocket, clearTimers, closeSocket]);

  return (
    <OrbLogic
      size={size}
      className={className}
      modeStyles={modeStyles}
      registerAddMessage={registerAddMessage}
    />
  );
}
