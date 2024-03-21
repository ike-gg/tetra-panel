import wretch from "wretch";
import { type EmoteInterface } from "~/components/emote/Emote";
import { type QueryEmoteFn, type QueryEmoteOptions } from ".";

export interface FFZEmote {
  id: number;
  name: string;
  owner: {
    display_name: string;
  };
  urls: {
    1: string;
    2?: string;
    4?: string;
  };
  animated?: {
    1: string;
    2?: string;
    4?: string;
  };
}

export interface FFZResponseById {
  emote: FFZEmote;
}

export interface FFZResponseByQuery {
  _pages: number;
  _total: number;
  emoticons: FFZEmote[];
}

export const queryFFZ: QueryEmoteFn = async (
  query: string,
  options: QueryEmoteOptions = {},
) => {
  const { limit = 20, page = 1 } = options;
  try {
    const response: FFZResponseByQuery = await wretch(
      `https://api.frankerfacez.com/v1/emotes?q=${query}&per_page=${limit}&page=${page}`,
    )
      .get()
      .json();

    const emotes: EmoteInterface[] = response.emoticons.map(
      (emote): EmoteInterface => {
        const { id, name, urls, animated } = emote;

        const isAnimated = animated ? true : false;

        let urlSource: string | undefined;

        if (animated) {
          if (animated[2]) {
            urlSource = `${animated[2]}.gif`;
          } else if (animated[1]) {
            urlSource = `${animated[1]}.gif`;
          }
        }

        if (!animated) {
          if (urls[2]) {
            urlSource = urls[2];
          } else if (urls[1]) {
            urlSource = urls[1];
          }
        }

        // if (!urlPreview || !urlSource) {
        //   return null;
        // }

        return {
          emoteName: name,
          emoteUrl: urlSource!,
          origin: "FFZ",
          reference: String(id),
          animated: isAnimated,
        };
      },
    );

    return emotes;
  } catch (error) {
    return [];
  }
};
