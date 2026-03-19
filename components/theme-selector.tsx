"use client";

import React from "react";
import { PATTERNS, Pattern } from "@/lib/patterns";
import { cn } from "@/lib/utils";
import { Check, Lock, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/base-badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/base-popover";

interface ThemeSelectorProps {
  selectedThemeId?: string;
  isPro: boolean;
  onSelect: (themeId: string) => void;
}

export function ThemeSelector({ selectedThemeId, isPro, onSelect }: ThemeSelectorProps) {
  const router = useRouter();

  return (
    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
      <div>
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Free Patterns</h3>
        <div className="grid grid-cols-1 gap-6">
          {PATTERNS.filter((p) => !p.isPro).map((pattern) => (
            <ThemeCard
              key={pattern.id}
              pattern={pattern}
              isSelected={selectedThemeId === pattern.id || (!selectedThemeId && pattern.id === "default-dark-grid")}
              onClick={() => onSelect(pattern.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Pro Patterns</h3>
          <Badge className="bg-white text-black text-[10px] py-0 px-1.5 h-4">Pro</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PATTERNS.filter((p) => p.isPro).map((pattern) => (
            <div key={pattern.id}>
              <ThemeCard
                pattern={pattern}
                isSelected={selectedThemeId === pattern.id}
                isLocked={!isPro}
                onClick={() => {
                  if (isPro) {
                    onSelect(pattern.id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemeCard({
  pattern,
  isSelected,
  isLocked,
  onClick,
}: {
  pattern: Pattern;
  isSelected: boolean;
  isLocked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative aspect-video rounded-xl overflow-hidden border-2 transition-all text-left w-full",
        isSelected ? "border-white ring-2 ring-white/20" : "border-zinc-800 hover:border-zinc-600"
      )}
    >
      <div className="absolute inset-0 z-0" style={pattern.style}>
        {pattern.className && <div className={cn("absolute inset-0", pattern.className)} />}
        {pattern.children}
      </div>
      
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
      
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-20">
        <span className="text-xs font-bold text-white drop-shadow-md truncate max-w-[80%] uppercase tracking-wider">
          {pattern.name}
        </span>
        {isSelected && (
          <div className="bg-white rounded-full p-0.5 shadow-lg">
            <Check className="size-3 text-black" />
          </div>
        )}
        {isLocked && !isSelected && (
          <Lock className="size-3 text-zinc-400 fill-zinc-400/20" />
        )}
      </div>
    </button>
  );
}
