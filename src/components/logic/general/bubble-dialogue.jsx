// src/components/logic/general/bubble-dialogue.jsx
import { useCallback, useEffect, useRef, useState } from "react";

export function useBubbleDialogue({
  maxMessages = 2,
  maxChars = 220,
  typingSpeed = 30, // ms entre chaque caractere
  visibleDuration = 10000, // 10s d'affichage avant disparition
  onStartTyping,
  onStopTyping,
  onEmpty,
} = {}) {
  const [messages, setMessages] = useState([]);
  const timeoutsRef = useRef([]);

  // Nettoyage des timeouts au demontage
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const addMessage = useCallback(
    (fullText) => {
      if (!fullText) return;

      const id = Date.now() + Math.random();
      const safeText = String(fullText);
      const truncated =
        safeText.length > maxChars ? safeText.slice(0, maxChars) + "..." : safeText;

      if (onStartTyping) onStartTyping();

      // On ajoute le message, en supprimant l'eventuel plus ancien si on depasse maxMessages
      setMessages((prev) => {
        const trimmed = maxMessages > 1 ? prev.slice(0, maxMessages - 1) : [];
        return [
          {
            id,
            fullText: truncated,
            visibleText: "",
            isFading: false,
          },
          ...trimmed,
        ];
      });

      let index = 0;

      const typeNext = () => {
        index++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, visibleText: truncated.slice(0, index) } : m
          )
        );

        if (index < truncated.length) {
          const t = setTimeout(typeNext, typingSpeed);
          timeoutsRef.current.push(t);
        } else {
          // fin du typing
          if (onStopTyping) onStopTyping();

          // Apres visibleDuration -> animation de sortie (shrink + fade)
          const fadeTimeout = setTimeout(() => {
            setMessages((prev) =>
              prev.map((m) => (m.id === id ? { ...m, isFading: true } : m))
            );

            // Puis suppression definitive
            const removeTimeout = setTimeout(() => {
              setMessages((prev) => {
                const remaining = prev.filter((m) => m.id !== id);
                if (remaining.length === 0 && onEmpty) {
                  onEmpty();
                }
                return remaining;
              });
            }, 280); // duree de l'anim de sortie

            timeoutsRef.current.push(removeTimeout);
          }, visibleDuration);

          timeoutsRef.current.push(fadeTimeout);
        }
      };

      const firstTimeout = setTimeout(typeNext, typingSpeed);
      timeoutsRef.current.push(firstTimeout);
    },
    [maxChars, maxMessages, onEmpty, onStartTyping, onStopTyping, typingSpeed, visibleDuration]
  );

  return { messages, addMessage };
}
