// src/components/ui/universe/chat-view.jsx
import React, { useLayoutEffect, useMemo, useRef } from "react";
import { cn } from "../../../lib/utils";
import MessageOrb, {
  MESSAGE_ORB_SIZE,
  getMessageOrbWrapperSize,
} from "../general/message-orb";

const chatViewStyles = `
  @keyframes chat-message-in {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .chat-message {
    animation: chat-message-in 0.28s ease-out both;
  }

  .chat-scroll {
    scrollbar-width: none;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  .chat-scroll:hover {
    scrollbar-width: thin;
  }

  .chat-scroll::-webkit-scrollbar {
    width: 0px;
  }

  .chat-scroll:hover::-webkit-scrollbar {
    width: 6px;
  }

  .chat-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 999px;
  }
`;

const ORB_SIZE = MESSAGE_ORB_SIZE;
const ORB_SLOT_SIZE = getMessageOrbWrapperSize(ORB_SIZE);

const ChatMessageRow = React.memo(function ChatMessageRow({
  message,
  orbMode,
  isLastAssistant,
  showOrb,
  orbBaseSize,
}) {
  const isAssistant = message.role === "assistant";
  const text = message.displayText ?? message.content ?? "";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3.5 overflow-visible",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant ? (
        <div
          className="mt-0.5 shrink-0 overflow-visible"
          style={{ width: ORB_SLOT_SIZE, height: ORB_SLOT_SIZE }}
        >
          {showOrb && isLastAssistant ? (
            <MessageOrb
              mode={orbMode}
              size={ORB_SIZE}
              orbBaseSize={orbBaseSize}
            />
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          "chat-message max-w-[78%] rounded-2xl border px-4 py-3 text-[15px] leading-relaxed",
          "shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-300",
          isAssistant
            ? "bg-black/60 border-white/10 text-white/80"
            : "bg-white/5 border-white/15 text-white/90",
          orbMode === "speaking"
            ? "border-red-300/35 shadow-[0_0_22px_rgba(255,120,120,0.24)]"
            : ""
        )}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
});

export default function ChatView({
  messages = [],
  speakingIds = [],
  className,
  showOrb = true,
  isActive = true,
  orbBaseSize,
}) {
  const scrollRef = useRef(null);
  const speakingSet = useMemo(() => new Set(speakingIds), [speakingIds]);
  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i]?.role === "assistant") {
        return messages[i].id;
      }
    }
    return null;
  }, [messages]);

  useLayoutEffect(() => {
    if (!isActive) return;
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isActive]);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl bg-black/50 backdrop-blur-xl",
        className
      )}
    >
      <style>{chatViewStyles}</style>

      <div
        ref={scrollRef}
        className="chat-scroll flex-1 overflow-y-auto overflow-x-visible px-1 sm:px-2"
      >
        <div className="flex flex-col gap-4 pb-6 pt-2">
          {messages.length === 0 ? (
            <div className="text-sm text-white/40">Ecris ton premier message pour demarrer.</div>
          ) : (
            messages.map((message) => {
              const isSpeaking =
                speakingSet.has(message.id) || Boolean(message.isSpeaking);
              const isThinking =
                !isSpeaking &&
                (Boolean(message.isGenerating) || Boolean(message.isThinking));
              const orbMode = isSpeaking ? "speaking" : isThinking ? "thinking" : "idle";

              return (
                <ChatMessageRow
                  key={message.id}
                  message={message}
                  orbMode={orbMode}
                  isLastAssistant={message.id === lastAssistantId}
                  showOrb={showOrb}
                  orbBaseSize={orbBaseSize}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
