// src/components/ui/general/chatbar.jsx
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function ChatBarUI({
  inputValue,
  onInputChange,
  onSubmit,
  onKeyDown,
  onAiClick,
  userRole = "player",
  animateChatInput = false,
  placeholder = "Decris ton action...",
}) {
  const isSpectator = userRole === "spectator";

  return (
    <div className="w-full flex flex-col max-h-[80vh] mt-6">
      <form onSubmit={onSubmit}>
        <div
          className={`relative bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col space-y-3 transition-all duration-500 overflow-hidden ${
            animateChatInput
              ? "shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02] border-white/30"
              : ""
          }`}
        >
          <TextareaAutosize
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            minRows={1}
            maxRows={10}
            disabled={isSpectator}
            className={`w-full bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-0 focus:border-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-4 relative z-10 ${
              isSpectator ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

          <div className="flex justify-between items-center space-x-2 w-full">
            {/* Boutons gauche */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isSpectator}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/20 hover:bg-white/10 text-white/80 border border-white/10 transition-colors duration-200 ${
                  isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <i className="fa-regular fa-arrow-right-to-bracket text-sm"></i>
                <span className="text-sm">Se connecter</span>
              </button>

              <button
                type="button"
                disabled={isSpectator}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/20 hover:bg-white/10 text-white/80 border border-white/10 transition-colors duration-200 ${
                  isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <i className="fa-regular fa-comment text-sm"></i>
                <span className="text-sm">Qui suis-je ?</span>
              </button>
            </div>

            {/* Boutons droite */}
            <div className="flex space-x-2">
              {/* AI button */}
              <button
                type="button"
                onClick={onAiClick}
                disabled={isSpectator}
                className={`bg-black/20 rounded-full p-2 hover:bg-white/10 transition-colors duration-200 text-white/80 border border-white/10 ${
                  isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <i className="fa-regular fa-bolt text-xl pt-1"></i>
              </button>

              {/* Send button */}
              <button
                type="submit"
                disabled={isSpectator}
                className={`bg-black/20 rounded-full p-2 hover:bg-white/10 transition-colors duration-200 text-white/80 border border-white/10 ${
                  isSpectator ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <i className="fa-regular fa-arrow-up text-xl pt-1"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
