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

export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  for (const byte of uint8Array) {
    binaryString += String.fromCharCode(byte);
  }
  const base64String = btoa(binaryString);
  return base64String;
}

export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (!result || typeof result !== "string") {
        reject();
        return;
      }
      resolve(result);
    };
    reader.onerror = reject;
  });
