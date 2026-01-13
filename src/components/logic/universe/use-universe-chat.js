import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomDelay, getRandomLine } from "../../../lib/chat-utils";

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useUniverseChat({
  isDemo = false,
  demoLines = [],
  demoReplyMinDelay = 700,
  demoReplyMaxDelay = 1400,
  typeInterval = 28,
  typeMinDuration = 420,
  typeMaxDuration = 2200,
  onFirstUserMessage,
} = {}) {
  const [messages, setMessages] = useState([]);
  const [speakingIds, setSpeakingIds] = useState([]);
  const demoTimersRef = useRef([]);
  const typingTimersRef = useRef(new Map());
  const hasUserMessageRef = useRef(false);

  const addUserMessage = useCallback(
    (text) => {
      const content = String(text || "").trim();
      if (!content) return;

      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "user",
          content,
          displayText: content,
        },
      ]);

      if (!hasUserMessageRef.current) {
        hasUserMessageRef.current = true;
        if (onFirstUserMessage) {
          onFirstUserMessage();
        }
      }
    },
    [onFirstUserMessage]
  );

  const addAssistantMessage = useCallback(
    (text) => {
      const content = String(text || "").trim();
      if (!content) return;

      const id = createMessageId();
      setMessages((prev) => [
        ...prev,
        {
          id,
          role: "assistant",
          content,
          displayText: "",
        },
      ]);

      setSpeakingIds((prev) => [...prev, id]);

      const duration = Math.min(
        typeMaxDuration,
        Math.max(typeMinDuration, content.length * 18)
      );
      const totalSteps = Math.ceil(duration / typeInterval);
      const stepSize = Math.max(1, Math.ceil(content.length / totalSteps));
      let index = 0;

      const tick = () => {
        index = Math.min(content.length, index + stepSize);
        setMessages((prev) =>
          prev.map((message) =>
            message.id === id
              ? { ...message, displayText: content.slice(0, index) }
              : message
          )
        );

        if (index < content.length) {
          const timer = setTimeout(tick, typeInterval);
          typingTimersRef.current.set(id, timer);
        } else {
          typingTimersRef.current.delete(id);
          setSpeakingIds((prev) => prev.filter((speakingId) => speakingId !== id));
        }
      };

      const timer = setTimeout(tick, typeInterval);
      typingTimersRef.current.set(id, timer);
    },
    [typeInterval, typeMaxDuration, typeMinDuration]
  );

  const scheduleDemoReply = useCallback(() => {
    const delay = getRandomDelay(demoReplyMinDelay, demoReplyMaxDelay);
    const timer = setTimeout(() => {
      const line = getRandomLine(demoLines);
      if (line) {
        addAssistantMessage(line);
      }
    }, delay);
    demoTimersRef.current.push(timer);
  }, [addAssistantMessage, demoLines, demoReplyMaxDelay, demoReplyMinDelay]);

  const sendUserMessage = useCallback(
    (text) => {
      const content = String(text || "").trim();
      if (!content) return;

      addUserMessage(content);

      if (isDemo) {
        scheduleDemoReply();
      }
    },
    [addUserMessage, isDemo, scheduleDemoReply]
  );

  useEffect(() => {
    return () => {
      demoTimersRef.current.forEach((timer) => clearTimeout(timer));
      demoTimersRef.current = [];

      typingTimersRef.current.forEach((timer) => clearTimeout(timer));
      typingTimersRef.current.clear();
    };
  }, []);

  return {
    messages,
    speakingIds,
    sendUserMessage,
    handleAiMessage: addAssistantMessage,
  };
}
