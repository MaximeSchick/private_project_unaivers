// src/pages/home/section-hero.jsx
import { BubbleBackground } from "../../components/ui/general/bubble-background";
import InfoSecurity from "../../components/ui/general/info-security";
import DialogueOrb from "../../components/logic/general/dialogue";
import ChatBarLogic from "../../components/logic/general/chatbar";

export default function SectionHero() {
  return (
    <section className="relative">
      <BubbleBackground className="min-h-screen flex flex-col items-center justify-center">
        {/* Icone securite en bas a gauche */}
        <div className="absolute bottom-4 left-4">
          <InfoSecurity />
        </div>

        {/* Orbe en mode DEMO + Chat (sans WebSocket grace a sessionId="demo-session") */}
        <div className="w-full max-w-4xl px-4 pb-18 flex flex-col items-center">
          <DialogueOrb mode="demo" sessionId="demo-session" size={180} />
          <ChatBarLogic sessionId="demo-session" userRole="player" />
        </div>
      </BubbleBackground>
    </section>
  );
}
