// src/pages/home/section-hero.jsx
import { BackgroundBeams } from "../../components/ui/shadcn-io/background-beams";
import InfoSecurity from "../../components/ui/general/info-security";
import DialogueOrb from "../../components/logic/general/dialogue";
import ChatBarLogic from "../../components/logic/general/chatbar";

export default function SectionHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* Background Beams (auto-fermant, pas de children !) */}
      <BackgroundBeams className="absolute inset-0 
    bg-gradient-to-b 
    from-[#0d0d0f] 
    via-[#0a0a0c] 
    to-[#050508]" />

      {/* Contenu UNAIVERS */}
      <div className="relative z-10 flex w-full min-h-screen flex-col items-center justify-center">
        
        {/* Icône sécurité en bas à gauche */}
        <div className="absolute bottom-4 left-4">
          <InfoSecurity />
        </div>

        {/* Orb + Chat */}
        <div className="w-full max-w-4xl px-4 pb-8 flex flex-col items-center">
          <DialogueOrb mode="demo" sessionId="demo-session" size={200} />
          <ChatBarLogic sessionId="demo-session" userRole="player" />
        </div>

      </div>
      
    </section>
  );
}
