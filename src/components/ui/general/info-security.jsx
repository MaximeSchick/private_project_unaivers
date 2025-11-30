// src/components/ui/general/info-security.jsx
"use client";

import { useState } from "react";

export default function InfoSecurity() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Icône bouclier */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-white/70 hover:text-white transition-colors duration-200
                   p-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        <i className="fa-regular fa-shield-heart text-2xl"></i>
      </button>

      {/* Infobulle */}
      {open && (
        <div
          className="absolute left-12 bottom-6 w-64 p-3 rounded-xl 
                     bg-black/80 text-white text-xs border border-white/20 
                     backdrop-blur-lg shadow-lg"
        >
          <p className="leading-relaxed">
            Les données sont <strong>privées</strong>,  
            <strong> sécurisées</strong> et hébergées en Suisse 🇨🇭.
          </p>
        </div>
      )}
    </div>
  );
}
