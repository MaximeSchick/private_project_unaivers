// src/pages/home/section-hero.jsx
import React, { useCallback, useState } from "react";
import { BackgroundBeams } from "../../components/ui/shadcn-io/background-beams";
import InfoSecurity from "../../components/ui/general/info-security";
import SplitLayout from "../../components/content/universe/split-layout";
import ChatShell from "../../components/content/universe/chat-shell";
import ChatInputBar from "../../components/ui/universe/chat-input-bar";
import ProspectFormPanel from "../../components/ui/universe/prospect-form-panel";
import { TEST_DIALOGUE_LINES } from "../../components/ui/general/test/dialogue";
import { useUniverseUiMode } from "../../components/logic/universe/use-universe-ui-mode";
import { useUniverseChat } from "../../components/logic/universe/use-universe-chat";
import { cn } from "../../lib/utils";

const SESSION_ID = "demo-session";

function LeftIntroPanel() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-black/70 px-10 py-12 backdrop-blur-xl sm:px-12 lg:px-20 lg:py-16 lg:border-r lg:border-white/10 box-border">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" aria-hidden />
            Intro IA
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
            Heidi
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Heidi, l&apos;IA de prospection qui genere des rendez-vous.
          </h1>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            Elle identifie vos comptes cibles, engage les bons contacts et relance
            automatiquement jusqu&apos;a obtenir des rendez-vous qualifies.
          </p>
          <p className="text-sm leading-relaxed text-white/50 sm:text-base">
            Vous donnez le contexte (offre, cible, ton) : Heidi orchestre les
            sequences email + LinkedIn, qualifie les reponses et ne remonte que
            les opportunites chaudes.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.26em] text-white/45">
          <span>Ciblage precis</span>
          <span>Sequences multicanal</span>
          <span>Rendez-vous qualifies</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_40px_-18px_rgba(255,255,255,0.45)] transition hover:bg-white/90"
          >
            Essayer
          </button>
        </div>
      </div>
    </div>
  );
}

function AiHeaderRight({
  isPresence,
  isSplit,
  sessionId,
  isDemo,
  messages,
  speakingIds,
  sendUserMessage,
  handleAiMessage,
  openSplit,
  toggleView,
  hasMessages,
  isExpanded,
}) {
  const maxWidthClass = isExpanded ? "max-w-none" : isSplit ? "max-w-6xl" : "max-w-4xl";

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={cn(
          "mx-auto w-full transition-all duration-500 ease-out",
          maxWidthClass
        )}
      >
        <SplitLayout
          isSplit={isSplit}
          left={
            <>
              <ChatShell
                isPresence={isPresence}
                sessionId={sessionId}
                isDemo={isDemo}
                messages={messages}
                speakingIds={speakingIds}
              />
              <ChatInputBar
                sessionId={sessionId}
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
  );
}

function HomeHero({
  isPresence,
  isSplit,
  sessionId,
  isDemo,
  messages,
  speakingIds,
  sendUserMessage,
  handleAiMessage,
  openSplit,
  toggleView,
  hasMessages,
  hasSubmittedMessage,
}) {
  const showIntroPanel = !hasSubmittedMessage && !isSplit;
  const isExpanded = !showIntroPanel && !isSplit;
  const constrainWidth = isSplit;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <BackgroundBeams
        className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f] via-[#0a0a0c] to-[#050508]"
      />

      <div className="relative z-10 flex w-full min-h-screen flex-col">
        <div className="absolute bottom-6 left-6 z-30">
          <InfoSecurity />
        </div>

        <div
          className={cn(
            "w-full transition-all duration-500 ease-out",
            constrainWidth
              ? "mx-auto max-w-6xl px-4"
              : "mx-auto max-w-none px-4 lg:px-0"
          )}
        >
          <div
            className={cn(
              "flex w-full min-h-screen flex-col transition-[gap] duration-500 ease-out lg:grid lg:items-stretch lg:h-screen lg:min-h-0",
              showIntroPanel
                ? "gap-8 lg:gap-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]"
                : "gap-0 lg:grid-cols-[0fr_1fr]"
            )}
          >
            <div
              className={cn(
                "w-full transition-all duration-500 ease-out lg:self-stretch",
                showIntroPanel
                  ? "opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-4 max-h-0 lg:w-0 overflow-hidden"
              )}
            >
              <LeftIntroPanel />
            </div>

            <div className="flex w-full flex-1 items-center justify-center px-4 sm:px-6 lg:px-10 transition-all duration-500 ease-out">
              <AiHeaderRight
                isPresence={isPresence}
                isSplit={isSplit}
                sessionId={sessionId}
                isDemo={isDemo}
                messages={messages}
                speakingIds={speakingIds}
                sendUserMessage={sendUserMessage}
                handleAiMessage={handleAiMessage}
                openSplit={openSplit}
                toggleView={toggleView}
                hasMessages={hasMessages}
                isExpanded={isExpanded}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SectionHero() {
  const { isPresence, isSplit, openSplit, toggleView } = useUniverseUiMode();
  const [hasSubmittedMessage, setHasSubmittedMessage] = useState(false);
  const isDemo = SESSION_ID === "demo-session";

  const handleFirstUserMessage = useCallback(() => {
    setHasSubmittedMessage(true);
  }, [setHasSubmittedMessage]);

  const { messages, speakingIds, sendUserMessage, handleAiMessage } = useUniverseChat({
    isDemo,
    demoLines: TEST_DIALOGUE_LINES,
    onFirstUserMessage: handleFirstUserMessage,
  });
  const hasMessages = messages.length > 0;

  return (
    <HomeHero
      isPresence={isPresence}
      isSplit={isSplit}
      sessionId={SESSION_ID}
      isDemo={isDemo}
      messages={messages}
      speakingIds={speakingIds}
      sendUserMessage={sendUserMessage}
      handleAiMessage={handleAiMessage}
      openSplit={openSplit}
      toggleView={toggleView}
      hasMessages={hasMessages}
      hasSubmittedMessage={hasSubmittedMessage}
    />
  );
}
