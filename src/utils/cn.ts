// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines clsx + tailwind-merge to smartly merge Tailwind classes
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
