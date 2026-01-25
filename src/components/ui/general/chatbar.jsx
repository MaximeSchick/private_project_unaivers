// src/components/ui/general/chatbar.jsx
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const chatbarGlowStyles = `
  @keyframes chatbar-shine {
    0% {
      opacity: 0;
      transform: translateX(-40%) skewX(-10deg);
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
      transform: translateX(40%) skewX(-10deg);
    }
  }
`;

export default function ChatBarUI({
  inputValue,
  onInputChange,
  onSubmit,
  onKeyDown,
  onAiClick,
  onToggleView,
  showToggleView = false,
  toggleDisabled = false,
  toggleLabel = "Toggle view",
  userRole = "player",
  animateChatInput = false,
  placeholder = "Decris ton action...",
  showAiButton = true,
}) {
  const isSpectator = userRole === "spectator";
  const toggleIsDisabled = isSpectator || toggleDisabled;

  return (
    <>
      <style>{chatbarGlowStyles}</style>

      <div className="w-full flex flex-col max-h-[80vh] mt-2">
        <form onSubmit={onSubmit}>
          <div
            className={`
              relative group
              bg-black/60 backdrop-blur-md
              border border-white/10
              rounded-3xl
              p-4 sm:p-4
              flex flex-col
              transition-all duration-500
              overflow-hidden
              ${
                animateChatInput
                  // 🔥 état ANIMÉ : glow + zoom
                  ? "shadow-[0_0_26px_rgba(255,255,255,0.35)] scale-[1.02] border-white/40"
                  // 🌙 état NORMAL : aucun glow, seulement au hover
                  : "shadow-none hover:shadow-[0_0_22px_rgba(255,255,255,0.22)] hover:border-white/25"
              }
            `}
          >
            {/* Dégradé animé visible UNIQUEMENT quand animateChatInput = true */}
            {animateChatInput && (
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  rounded-[1.5rem]
                  bg-gradient-to-r from-transparent via-white/25 to-transparent
                "
                style={{
                  mixBlendMode: "screen",
                  animation: "chatbar-shine 1.2s ease-out",
                }}
              />
            )}

            {/* Contenu réel */}
            <div className="relative z-10 flex flex-col space-y-4">
              <TextareaAutosize
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                minRows={1}
                maxRows={6}
                disabled={isSpectator}
                className={`w-full p-3 pb-0 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-0 focus:border-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-4 ${
                  isSpectator ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />

              <div className="flex justify-between items-center space-x-2 w-full">
                {/* Boutons gauche */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={isSpectator}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/50 hover:bg-white/10 text-white/80 border border-white/10 transition-colors duration-200 ${
                      isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <i className="fa-regular fa-arrow-right-to-bracket text-sm" />
                    <span className="text-sm">Se connecter</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSpectator}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/50 hover:bg-white/10 text-white/80 border border-white/10 transition-colors duration-200 ${
                      isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <i className="fa-regular fa-comment text-sm" />
                    <span className="text-sm">Qui suis-je ?</span>
                  </button>

                  {showAiButton && (
                    <button
                      type="button"
                      onClick={onAiClick}
                      disabled={isSpectator}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/50 hover:bg-white/10 text-white/80 border border-white/10 transition-colors duration-200 ${
                        isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <i className="fa-regular fa-bolt text-sm" />
                      <span className="text-sm">Afficher la suite</span>
                    </button>
                  )}
                </div>

                {/* Boutons droite */}
                <div className="flex space-x-2">
                  {showToggleView && (
                    <button
                      type="button"
                      onClick={onToggleView}
                      disabled={toggleIsDisabled}
                      title={toggleLabel}
                      aria-label={toggleLabel}
                      className={`bg-black/50 rounded-full p-2 hover:bg-white/10 transition-colors duration-200 text-white/80 border border-white/10 ${
                        toggleIsDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <i className="fa-regular fa-comments text-xl pt-1" />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSpectator}
                    className={`bg-black/50 rounded-full p-2 hover:bg-white/10 transition-colors duration-200 text-white/80 border border-white/10 ${
                      isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <i className="fa-regular fa-arrow-up text-xl pt-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
