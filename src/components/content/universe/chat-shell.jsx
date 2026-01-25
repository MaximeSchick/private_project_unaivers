import React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import DialogueOrb from "../../logic/general/dialogue";
import ChatView from "../../ui/universe/chat-view";
import UniverseOrb from "../../ui/general/universe-orb";

const BASE_ORB_SIZE = 220;
const VIEW_TRANSITION = { duration: 0.25, ease: "easeOut" };
const VIEW_HEIGHT = "min-h-[22vh] sm:h-[28vh] lg:h-[34vh]";

export default function ChatShell({
  isPresence,
  sessionId,
  isDemo,
  messages,
  speakingIds,
}) {
  return (
    <LayoutGroup id="hero-orb">
      <div className="relative flex w-full flex-col">
        <div className={`relative w-full ${VIEW_HEIGHT}`}>
          <AnimatePresence initial={false} presenceAffectsLayout={false}>
            {isPresence ? (
              <motion.div
                key="presence"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={VIEW_TRANSITION}
                className="absolute inset-0 flex items-center justify-center"
              >
                <DialogueOrb
                  mode={isDemo ? "demo" : "normal"}
                  sessionId={sessionId}
                  size={BASE_ORB_SIZE}
                  isActive
                  showOrb
                  modeOverride="idle"
                  renderOrb={({ size, mode }) => (
                    <UniverseOrb size={size} mode={mode} />
                  )}
                />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={VIEW_TRANSITION}
                className="absolute inset-0"
              >
                <ChatView
                  messages={messages}
                  speakingIds={speakingIds}
                  isActive
                  showOrb
                  orbBaseSize={BASE_ORB_SIZE}
                  className="h-full p-4 sm:p-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
}
