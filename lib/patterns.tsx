import React from "react";
import { cn } from "./utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export interface Pattern {
  id: string;
  name: string;
  isPro: boolean;
  isLight?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export const PATTERNS: Pattern[] = [
  {
    id: "default-dark-grid",
    name: "Default Dark",
    isPro: false,
    className: "bg-black",
    children: (
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-20"
      />
    ),
  },
  {
    id: "top-slate-radial",
    name: "Top Slate Radial",
    isPro: false,
    isLight: true,
    style: {
      background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
    },
  },
  {
    id: "bottom-slate-radial",
    name: "Bottom Slate Radial",
    isPro: false,
    isLight: true,
    style: {
      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
    },
  },
  {
    id: "dark-horizon-glow",
    name: "Dark Horizon Glow",
    isPro: true,
    style: {
      background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
    },
  },
  {
    id: "emerald-void",
    name: "Emerald Void",
    isPro: true,
    style: {
      background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)",
    },
  },
  {
    id: "top-fade-grid",
    name: "Top Fade Grid",
    isPro: true,
    isLight: true,
    className: "bg-[#f8fafc]",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
    ),
  },
  {
    id: "bottom-fade-grid",
    name: "Bottom Fade Grid",
    isPro: true,
    isLight: true,
    className: "bg-[#f8fafc]",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
    ),
  },
  {
    id: "diagonal-cross-grid",
    name: "Diagonal Cross Grid",
    isPro: true,
    isLight: true,
    className: "bg-white",
    children: (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    ),
  },
  {
    id: "dark-radial-glow",
    name: "Dark Radial Glow",
    isPro: true,
    className: "bg-[#020617]",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
        }}
      />
    ),
  },
  {
    id: "aurora-dream",
    name: "Aurora Dream",
    isPro: true,
    isLight: true,
    style: {
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
        radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
        radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
    },
  },
  {
    id: "paper-texture",
    name: "Paper Texture",
    isPro: true,
    isLight: true,
    className: "bg-[#faf9f6]",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
          `,
          backgroundSize: "8px 8px, 32px 32px, 32px 32px",
        }}
      />
    ),
  },
  {
    id: "diagonal-grid-light",
    name: "Diagonal Grid - Light",
    isPro: true,
    isLight: true,
    className: "bg-[#fafafa] text-gray-900",
    children: (
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    ),
  },
  {
    id: "vercel-grid",
    name: "Vercel Grid Subtle",
    isPro: true,
    className: "bg-black",
    children: (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    ),
  },
  {
    id: "dark-dot-matrix",
    name: "Dark Dot Matrix",
    isPro: true,
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          imageRendering: 'pixelated',
        }}
      />
    ),
  },
  {
    id: "dark-noise-coloured",
    name: "Dark Noise Coloured",
    isPro: true,
    className: "bg-black",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 30px 30px, 25px 25px",
          backgroundPosition: "0 0, 10px 10px, 15px 5px",
        }}
      />
    ),
  },
  {
    id: "complex-multiplier",
    name: "Complex Multiplier",
    isPro: true,
    className: "bg-[#101014] text-white",
    children: (
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(45deg, rgba(0,255,128,0.09) 0, rgba(0,255,128,0.09) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(255,0,128,0.10) 0, rgba(255,0,128,0.10) 1px, transparent 1px, transparent 30px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
            radial-gradient(circle at 60% 40%, rgba(0,255,128,0.05) 0, transparent 60%)
          `,
          backgroundSize: "80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%",
          backgroundPosition: "0 0, 0 0, 0 0, 40px 40px, center"
        }}
      />
    ),
  },
  {
    id: "aurora-midnight-glow",
    name: "Aurora Midnight Glow",
    isPro: true,
    className: "bg-black",
    children: (
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      />
    ),
  },
  {
    id: "top-spotlight",
    name: "Top Spotlight",
    isPro: true,
    className: "bg-black overflow-hidden",
    children: (
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at top,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.08) 20%,
              rgba(0, 0, 0, 0.0) 60%
            )
          `,
        }}
      />
    ),
  },
];

export function Background({ themeId, className }: { themeId?: string; className?: string }) {
  const pattern = PATTERNS.find((p) => p.id === themeId) || PATTERNS[0];

  return (
    <div className={cn("absolute inset-0 z-0", pattern.className, className)} style={pattern.style}>
      {pattern.children}
    </div>
  );
}
