import { type Emotes } from "@prisma/client";

export type EmoteOrigin = Emotes["origin"];

export interface EmoteProviderData {
  id: string;
  name: string;
  author?: string;
  tags: string[];
  url: string;
  fileUrl: string;
  isAnimated: boolean;
}
