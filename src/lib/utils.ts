import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLetters(input: string) {
  return input
    .split(" ")
    .map((w) => w.at(0))
    .join("");
}
