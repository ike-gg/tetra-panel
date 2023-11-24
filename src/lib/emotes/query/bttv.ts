import wretch from "wretch";
import { type EmoteInterface } from "~/components/emotes/Emote";
import { bttvTransformSourceUrl } from "../emoteProviders";

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

export async function queryBTTV(query: string, page?: number) {
  try {
    const offset = page ? Math.floor(page) * 20 : 0;
    const requestUrl = query
      ? `https://api.betterttv.net/3/emotes/shared/search?query=${query}&offset=${offset}&limit=20`
      : `https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=20`;
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
    return [];
  }
}
