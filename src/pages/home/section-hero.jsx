// src/pages/home/section-hero.jsx
import { BubbleBackground } from "../../components/ui/general/bubble-background";
import Orb from "../../components/ui/general/orb";
import ChatBarLogic from "../../components/logic/general/chatbar";
import InfoSecurity from "../../components/ui/general/info-security";

export default function SectionHero() {
  return (
    <section className="relative">
      <BubbleBackground className="min-h-screen flex flex-col items-center justify-center">
        {/* Icône sécurité en bas à gauche */}
        <div className="absolute bottom-4 left-4">
          <InfoSecurity />
        </div>

        {/* Orb + Chat */}
        <div className="w-full max-w-4xl px-4 pb-16 flex flex-col items-center gap-6">
          <Orb size={180} className="mb-20" />
          <ChatBarLogic sessionId="demo-session" userRole="player" />
        </div>
      </BubbleBackground>
    </section>
  );
}
