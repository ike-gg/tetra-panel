import wretch from "wretch";
import { type EmoteProviderData } from "~/types/emote";
import * as z from "zod";

const sevenTvGetEmoteSchema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  animated: z.boolean(),
  owner: z.object({
    display_name: z.string().optional(),
  }),
});

export const getSeventvData = async (
  emoteId: string,
): Promise<EmoteProviderData | null> => {
  try {
    const response = await wretch("https://7tv.io/v3/emotes/" + emoteId)
      .get()
      .json();

    const emote = sevenTvGetEmoteSchema.parse(response);

    const emoteFileUrl = emote.animated
      ? `https://cdn.7tv.app/emote/${emote.id}/4x.gif`
      : `https://cdn.7tv.app/emote/${emote.id}/4x.png`;

    const emoteUrl = `https://7tv.app/emotes/${emote.id}`;

    return {
      id: emote.id,
      name: emote.name,
      tags: emote.tags,
      isAnimated: emote.animated,
      author: emote.owner.display_name,
      fileUrl: emoteFileUrl,
      url: emoteUrl,
    };
  } catch (error) {
    console.error("Failed to fetch 7TV metadata for emote", emoteId, error);
    return null;
  }
};
