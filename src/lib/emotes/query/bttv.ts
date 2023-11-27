import wretch from "wretch";
import { type EmoteInterface } from "~/components/emotes/Emote";
import { bttvTransformSourceUrl } from "../emoteProviders";
import { type QueryOptions } from ".";

export interface BTTVEmote {
  id: string;
  code: string;
  animated: boolean;
  user?: {
    displayName: string;
  };
}

export interface BTTVTopEmote {
  emote: BTTVEmote;
}

export type BTTVResponseById = BTTVEmote;

export type BTTVResponseByQuery = BTTVEmote[] | BTTVTopEmote[];

export async function queryBTTV(query: string, options: QueryOptions) {
  const { offset = 0, limit = 20 } = options;
  try {
    const requestUrl = query
      ? `https://api.betterttv.net/3/emotes/shared/search?query=${query}&offset=${offset}&limit=${limit}`
      : `https://api.betterttv.net/3/emotes/shared/top?limit=${limit}`;
    const results: BTTVResponseByQuery = await wretch(requestUrl).get().json();

    const emotes: EmoteInterface[] = results.map((emote) => {
      if ("emote" in emote) {
        const { code, id, animated } = emote.emote;
        const emoteUrl = bttvTransformSourceUrl(id, animated);
        return {
          emoteName: code,
          emoteUrl: emoteUrl["3x"]!,
          origin: "BTTV",
          reference: id,
        };
      }
      const { code, id, animated } = emote;
      const emoteUrl = bttvTransformSourceUrl(id, animated);
      return {
        emoteName: code,
        emoteUrl: emoteUrl["3x"]!,
        origin: "BTTV",
        reference: id,
      };
    });

    return emotes;
  } catch (error) {
    console.log(error);
    return [];
  }
}
