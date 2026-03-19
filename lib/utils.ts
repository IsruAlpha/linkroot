import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAbsoluteUrl(url: string) {
  if (!url) return url
  const trimmed = url.trim()
  if (/^(?:f|ht)tps?:\/\//.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}
