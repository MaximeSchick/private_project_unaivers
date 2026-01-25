// src/components/ui/general/info-security.jsx
"use client";

import { useState } from "react";

export default function InfoSecurity() {
  const [open, setOpen] = useState(false);
  const tooltipStyles = `
    @keyframes security-pop {
      0% {
        opacity: 0;
        transform: translateY(10px) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes security-float {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-2px);
      }
    }

    .security-tooltip-pop {
      animation: security-pop 0.25s ease-out both;
    }

    .security-tooltip-float {
      animation: security-float 3.2s ease-in-out infinite;
    }
  `;

  return (
    <div className="relative">
      <style>{tooltipStyles}</style>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="security-tooltip"
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:text-white hover:border-white/20"
      >
        <i className="fa-regular fa-shield-heart text-xl" />
        <span className="sr-only">Informations securite</span>
      </button>

      {open && (
        <div
          id="security-tooltip"
          className="absolute left-0 bottom-14 z-40 w-72"
        >
          <div className="security-tooltip-pop">
            <div className="security-tooltip-float">
              <div className="relative rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-transparent p-[1px] shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
                <div className="rounded-2xl bg-black/85 px-4 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" aria-hidden />
                    Securite suisse
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Vos donnees restent en Suisse, chiffrees et traitees localement.
                    Heidi protege vos listes et respecte vos regles de prospection.
                  </p>
                  <div className="mt-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.26em] text-white/45">
                    <span>Infra suisse</span>
                    <span>Chiffrement</span>
                    <span>Acces maitrise</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border border-white/10 bg-black/85" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
