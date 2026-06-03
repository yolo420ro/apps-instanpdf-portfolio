import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shared helper for Aceternity / shadcn-style components added later
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
