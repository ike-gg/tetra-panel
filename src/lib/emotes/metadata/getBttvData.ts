import wretch from "wretch";
import { type EmoteProviderData } from "~/types/emote";
import * as z from "zod";

const bttvGetEmoteSchema = z.object({
  id: z.string(),
  code: z.string(),
  imageType: z.enum(["png", "gif"]),
  animated: z.boolean(),
  user: z.object({
    displayName: z.string().optional(),
  }),
});

export const getBttvData = async (
  emoteId: string,
): Promise<EmoteProviderData | null> => {
  try {
    const response = await wretch(
      "https://api.betterttv.net/3/emotes/" + emoteId,
    )
      .get()
      .json();

    const emoteData = bttvGetEmoteSchema.parse(response);

    const fileUrl = emoteData.animated
      ? `https://cdn.betterttv.net/emote/${emoteData.id}/3x.gif`
      : `https://cdn.betterttv.net/emote/${emoteData.id}/3x.png`;

    const emoteUrl = `https://betterttv.com/emotes/${emoteData.id}`;

    return {
      id: emoteData.id,
      name: emoteData.code,
      tags: [],
      isAnimated: emoteData.animated,
      author: emoteData.user.displayName,
      fileUrl,
      url: emoteUrl,
    };
  } catch (error) {
    console.error("Failed to fetch BTTV metadata for emote", emoteId, error);
    return null;
  }
};
