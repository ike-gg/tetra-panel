import wretch from "wretch";
import { type EmoteProviderData } from "~/types/emote";
import * as z from "zod";

const ffzGetEmoteSchema = z.object({
  emote: z.object({
    id: z.number(),
    name: z.string(),
    owner: z.object({
      display_name: z.string(),
    }),
    urls: z.object({
      1: z.string().url(),
      2: z.string().url().optional(),
      4: z.string().url().optional(),
    }),
    animated: z
      .object({
        1: z.string().url(),
        2: z.string().url().optional(),
        4: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const getFfzData = async (
  emoteId: string,
): Promise<EmoteProviderData | null> => {
  try {
    const response = await wretch(
      "https://api.frankerfacez.com/v1/emote/" + emoteId,
    )
      .get()
      .json();

    const { emote } = ffzGetEmoteSchema.parse(response);

    const emoteUrl = `https://www.frankerfacez.com/emoticon/${emote.id}-${emote.name}`;

    const fileUrl =
      emote.animated?.[4] ??
      emote.animated?.[2] ??
      emote.animated?.[1] ??
      emote.urls[4] ??
      emote.urls[2] ??
      emote.urls[1];

    return {
      id: String(emote.id),
      name: emote.name,
      tags: [],
      isAnimated: "animated" in emote ? true : false,
      author: emote.owner.display_name,
      fileUrl,
      url: emoteUrl,
    };
  } catch (error) {
    console.error("Failed to fetch FFZ metadata for emote", emoteId, error);
    return null;
  }
};
