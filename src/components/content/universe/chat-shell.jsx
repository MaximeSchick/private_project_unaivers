import React from "react";
import { cn } from "../../../lib/utils";
import DialogueOrb from "../../logic/general/dialogue";
import ChatView from "../../ui/universe/chat-view";
import UniverseOrb from "../../ui/general/universe-orb";

const BASE_ORB_SIZE = 220;

export default function ChatShell({
  isPresence,
  sessionId,
  isDemo,
  messages,
  speakingIds,
}) {
  return (
    <div className="relative flex flex-col">
      <div
        className={cn(
          "flex flex-col items-center transition-all duration-500 ease-out",
          isPresence
            ? "overflow-visible opacity-100 translate-y-0 scale-100 max-h-[900px]"
            : "overflow-hidden pointer-events-none opacity-0 -translate-y-4 scale-95 max-h-0"
        )}
      >
        <DialogueOrb
          mode={isDemo ? "demo" : "normal"}
          sessionId={sessionId}
          size={BASE_ORB_SIZE}
          isActive={isPresence}
          showOrb={isPresence}
          modeOverride="idle"
          renderOrb={({ size, mode }) => (
            <UniverseOrb size={size} mode={mode} />
          )}
        />
      </div>

      <div
        className={cn(
          "transition-all duration-500 ease-out",
          isPresence
            ? "overflow-hidden pointer-events-none opacity-0 translate-y-4 scale-95 max-h-0"
            : "overflow-visible opacity-100 translate-y-0 scale-100 max-h-[1200px]"
        )}
      >
        <ChatView
          messages={messages}
          speakingIds={speakingIds}
          isActive={!isPresence}
          showOrb={!isPresence}
          orbBaseSize={BASE_ORB_SIZE}
          className="min-h-[36vh] max-h-[60vh] p-4 sm:p-6"
        />
      </div>
    </div>
  );
}
