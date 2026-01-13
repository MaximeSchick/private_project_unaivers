// src/pages/home/section-hero.jsx
import React from "react";
import { BackgroundBeams } from "../../components/ui/shadcn-io/background-beams";
import InfoSecurity from "../../components/ui/general/info-security";
import SplitLayout from "../../components/content/universe/split-layout";
import ChatShell from "../../components/content/universe/chat-shell";
import ChatInputBar from "../../components/ui/universe/chat-input-bar";
import ProspectFormPanel from "../../components/ui/universe/prospect-form-panel";
import { TEST_DIALOGUE_LINES } from "../../components/ui/general/test/dialogue";
import { useUniverseUiMode } from "../../components/logic/universe/use-universe-ui-mode";
import { useUniverseChat } from "../../components/logic/universe/use-universe-chat";

const SESSION_ID = "demo-session";

export default function SectionHero() {
  const { isPresence, isSplit, openSplit, toggleView } = useUniverseUiMode();
  const { messages, speakingIds, sendUserMessage, handleAiMessage } = useUniverseChat({
    isDemo: SESSION_ID === "demo-session",
    demoLines: TEST_DIALOGUE_LINES,
  });
  const hasMessages = messages.length > 0;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <BackgroundBeams
        className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f] via-[#0a0a0c] to-[#050508]"
      />

      <div className="relative z-10 flex w-full min-h-screen flex-col items-center justify-center">
        <div className="absolute bottom-4 left-4">
          <InfoSecurity />
        </div>

        <div className="w-full max-w-6xl px-4 pb-10">
          <SplitLayout
            isSplit={isSplit}
            left={
              <>
                <ChatShell
                  isPresence={isPresence}
                  sessionId={SESSION_ID}
                  isDemo={SESSION_ID === "demo-session"}
                  messages={messages}
                  speakingIds={speakingIds}
                />
                <ChatInputBar
                  sessionId={SESSION_ID}
                  userRole="player"
                  onSend={sendUserMessage}
                  onAiMessage={handleAiMessage}
                  onOpenSplit={openSplit}
                  onToggleView={toggleView}
                  hasMessages={hasMessages}
                  isSplit={isSplit}
                  isPresence={isPresence}
                />
              </>
            }
            right={<ProspectFormPanel isActive={isSplit} />}
          />
        </div>
      </div>
    </section>
  );
}
