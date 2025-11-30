// src/pages/home/section-footer.jsx
import React from "react";
import { cn } from "../../lib/utils";
import Logo from "../../assets/image/unaivers-white-logo.png";

const navigation = [
  {
    title: "Produit",
    links: [
      { label: "Vue d'ensemble", href: "#" },
      { label: "Fonctionnement agentique", href: "#" },
      { label: "Tarifs", href: "#" },
      { label: "Demander une démo", href: "#" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog / Actus", href: "#" },
      { label: "Études de cas", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Statut du service", href: "#" },
    ],
  },
  {
    title: "Sécurité & conformité",
    links: [
      { label: "Confidentialité", href: "#" },
      { label: "Éthique et conformité", href: "#" },
      { label: "Environnement", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Contacter UNAIVERS", href: "#" },
      { label: "Mon compte", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Carrières", href: "#" },
    ],
  },
];

export default function SectionFooter({ className }) {
  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden bg-neutral-900 text-neutral-100",
        "mt-20 border-t border-neutral-800",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0, 0, 0, 0.49),transparent_32%),radial-gradient(circle_at_75%_10%,rgba(0, 0, 0, 0.87),transparent_30%),linear-gradient(180deg,rgba(0, 0, 0, 0.92),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-14 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="UNAIVERS" className="h-20 w-auto" />
            <p className="text-sm uppercase tracking-[0.28em] text-neutral-400">
              UNAIVERS
            </p>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-white">
            Prospection autonome, souveraine et neutre.
          </p>
          <p className="text-sm text-neutral-300">
            Une IA qui chasse pour vous, en Suisse, avec une empreinte carbone compensée.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-2">
          {navigation.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                {group.title}
              </p>
              <ul className="space-y-2 text-sm text-neutral-200">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400 mt-6">
          <p>Copyright © 2026 UNAIVERS — Tous droits réservés.</p>
          <p className="text-neutral-300">Suisse</p>
        </div>
      </div>
    </footer>
  );
}
