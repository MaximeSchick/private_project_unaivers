"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";

const BUBBLE_COUNT = 24;

export function BubbleBackground({
  className,
  children,
  colors = {
    first: "26,18,36", // violet nuit adouci
    second: "56,34,92", // violet profond doux
    third: "14,10,22", // noir violet
    fourth: "92,60,130", // accent controlé
    fifth: "10,8,16", // noir encre
    sixth: "46,28,76", // halo violet doux
  },
  ...props
}) {
  const bubbleConfigs = React.useMemo(() => {
    const rand = (min, max) => Math.random() * (max - min) + min;
    const palette = ["first", "second", "third", "fourth", "fifth", "sixth"];
    return Array.from({ length: BUBBLE_COUNT }, (_, idx) => {
      const size = rand(18, 50);
      const top = rand(-10, 86);
      const left = rand(-10, 92);
      const xRange = rand(30, 90) * (Math.random() > 0.5 ? 1 : -1);
      const yRange = rand(30, 90) * (Math.random() > 0.5 ? 1 : -1);
      const duration = rand(9, 16);
      const delay = rand(0, 2);
      const colorVar = palette[idx % palette.length];
      const opacity = rand(0.08, 0.16);
      return {
        key: `bubble-${idx}`,
        size,
        top,
        left,
        xRange,
        yRange,
        duration,
        delay,
        colorVar,
        opacity,
      };
    });
  }, []);

  return (
    <div
      data-slot="bubble-background"
      className={cn(
        "relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0a0714] via-[#0f0b1c] to-[#04030a]",
        className
      )}
      {...props}
    >
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

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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

      <div className="absolute inset-0" style={{ filter: "url(#goo) blur(32px)" }}>
        {bubbleConfigs.map(
          ({ key, size, top, left, xRange, yRange, duration, delay, colorVar, opacity }) => (
            <motion.div
              key={key}
              className="absolute rounded-full mix-blend-screen"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                top: `${top}%`,
                left: `${left}%`,
                background: `radial-gradient(circle at center, rgba(var(--${colorVar}-color), ${opacity}) 0%, rgba(var(--${colorVar}-color), 0) 62%)`,
              }}
              initial={{ x: Math.random() * 30 - 15, y: Math.random() * 30 - 15 }}
              animate={{
                x: [0, xRange, 0, -xRange, 0],
                y: [0, -yRange, 0, yRange, 0],
              }}
              transition={{
                duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay,
              }}
            />
          )
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(200,140,255,0.12), transparent 38%), radial-gradient(circle at 78% 18%, rgba(255,140,220,0.10), transparent 32%), radial-gradient(circle at 62% 76%, rgba(140,180,255,0.08), transparent 36%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_32%),linear-gradient(0deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_42%)] opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.42)_74%)]" />

      {children}
    </div>
  );
}
