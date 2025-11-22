"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../../../lib/utils";

export function BubbleBackground({
  className,
  children,
  colors = {
  first:  "00,00,00",     // noir bleuté très profond
second: "10,14,25",   // bleu-noir (très proche du fond)
third:  "00,00,00",   // bleu-gris minéral
fourth: "10,14,25",   // bleu-gris subtil, un peu plus visible
fifth:  "00,00,00",    // noir froid, presque uniforme
sixth:  "10,14,25",   // le plus clair mais encore ULTRA dark


  },
  ...props
}) {
  return (
    <div
      data-slot="bubble-background"
      className={cn(
        "relative w-full h-full overflow-hidden bg-gradient-to-br from-black to-[#0a0f1a]",
        className
      )}
      {...props}
    >
      {/* Couleurs en variables CSS (comme l’original) */}
      <style>{`
        :root {
          --first-color: ${colors.first};
          --second-color: ${colors.second};
          --third-color: ${colors.third};
          --fourth-color: ${colors.fourth};
          --fifth-color: ${colors.fifth};
          --sixth-color: ${colors.sixth};
        }
      `}</style>

      {/* Filtre goo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Bulles animées (version shadcn originale) */}
      <div
        className="absolute inset-0"
        style={{ filter: "url(#goo) blur(24px)" }}
      >
        {/* Bulle 1 — bouge en Y */}
        <motion.div
          className="absolute rounded-full size-[50%] top-[10%] left-[10%] mix-blend-hard-light
                     bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.4)_0%,rgba(var(--first-color),0)_50%)]"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Bulle 2 — halo en rotation (deuxième couleur) */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%-400px)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div
            className="rounded-full size-[50%] top-[10%] left-[10%] mix-blend-hard-light
                       bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.4)_0%,rgba(var(--second-color),0)_50%)]"
          />
        </motion.div>

        {/* Bulle 3 — autre halo en rotation (troisième couleur) */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <div
            className="absolute rounded-full size-[50%] mix-blend-hard-light
                       bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.4)_0%,rgba(var(--third-color),0)_50%)]
                       top-[calc(50%+200px)] left-[calc(50%-500px)]"
          />
        </motion.div>

        {/* Bulle 4 — bouge en X (quatrième couleur) */}
        <motion.div
          className="absolute rounded-full size-[0%] top-[10%] left-[10%] opacity-70 mix-blend-hard-light
                     bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.4)_0%,rgba(var(--fourth-color),0)_50%)]"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Bulle 5 — énorme halo en rotation (cinquième couleur) */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%_-_800px)_calc(50%_+_200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div
            className="absolute rounded-full size-[130%] mix-blend-hard-light
                       bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.4)_0%,rgba(var(--fifth-color),0)_50%)]
                       top-[calc(50%-80%)] left-[calc(50%-80%)]"
          />
        </motion.div>
      </div>

      {children}
    </div>
  );
}