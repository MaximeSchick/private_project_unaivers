import { useCallback, useState } from "react";

export function useUniverseUiMode(initialMode = "presence") {
  const [uiMode, setUiMode] = useState(initialMode);

  const isPresence = uiMode === "presence";
  const isChat = uiMode === "chat";
  const isSplit = uiMode === "split";

  const enterChat = useCallback(() => {
    setUiMode((prev) => (prev === "presence" ? "chat" : prev));
  }, []);

  const openSplit = useCallback(() => {
    setUiMode("split");
  }, []);

  const closeSplit = useCallback(() => {
    setUiMode("chat");
  }, []);

  const toggleView = useCallback(() => {
    setUiMode((prev) => {
      if (prev === "split") return prev;
      return prev === "presence" ? "chat" : "presence";
    });
  }, []);

  return {
    uiMode,
    setUiMode,
    isPresence,
    isChat,
    isSplit,
    enterChat,
    openSplit,
    closeSplit,
    toggleView,
  };
}
