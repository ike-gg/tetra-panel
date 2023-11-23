import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WretchError } from "wretch/resolver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLetters(input: string) {
  return input
    .split(" ")
    .map((w) => w.at(0))
    .join("");
}

export function parseTetraApiError(error: WretchError) {
  if (typeof error.json === "object") {
    const errorObject = error.json as Record<string, string>;
    if ("error" in errorObject) {
      return errorObject.error;
    }
  }
  return error.message ?? "Unknown error";
}

interface GetIconOptions {
  size?: 16 | 32 | 64 | 128 | 256 | 512;
}

export function getGuildIcon(
  guildId: string,
  iconId: string,
  options?: GetIconOptions,
) {
  return `https://cdn.discordapp.com/icons/${guildId}/${iconId}${
    options?.size ? `?size=${options.size}` : ""
  }`;
}

export function getGuildBanner(
  guildId: string,
  bannerId: string,
  options?: GetIconOptions,
) {
  return `https://cdn.discordapp.com/banners/${guildId}/${bannerId}${
    options?.size ? `?size=${options.size}` : ""
  }`;
}

export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  const baseBase64 = Buffer.from(arrayBuffer).toString("base64");
  if (baseBase64.startsWith("data:")) {
    return baseBase64;
  }
  return `data:image;base64,${baseBase64}`;
}

export function base64ToArrayBuffer(base64: string) {
  const base64WithoutHeader = base64.replace(/^data:[^;]+;base64,/, "");
  const binaryString = atob(base64WithoutHeader);
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
