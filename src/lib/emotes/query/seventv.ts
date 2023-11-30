import wretch from "wretch";
import { type EmoteInterface } from "~/components/emotes/Emote";
import { stvEmoteSourceParser } from "../emoteProviders";
import { QueryEmoteFn, type QueryEmoteOptions } from ".";

export interface STVEmoteFile {
  name: "1x" | "2x" | "3x" | "4x";
  static_name: "1x" | "2x" | "3x" | "4x";
  width: number;
  height: number;
  size: number;
  format: "AVIF" | "WEBP";
}

export interface STVEmote {
  id: string;
  name: string;
  animated: boolean;
  owner?: {
    display_name: string;
  };
  host: {
    url: string;
    files?: STVEmoteFile[];
  };
}

export interface STVResponseGQL {
  data: {
    emotes: {
      count: number;
      items: STVEmote[];
    };
  };
  errors?: {
    message: string;
  }[];
}

export const querySevenTV: QueryEmoteFn = async (
  query = "",
  options: QueryEmoteOptions = {},
) => {
  const { limit = 20, page = 1 } = options;
  try {
    const results: STVResponseGQL = await wretch("https://7tv.io/v3/gql")
      .post({
        query: `{
      emotes(query: "${query}", limit: ${limit}, page: ${page}) {
        count
        items {
          id
          name
          animated
          owner {
            display_name
          }
          host {
            url
          }
        }
      }
    }`,
      })
      .json();

    if (results.errors && results.errors.length > 0) {
      throw new Error(results.errors[0]!.message);
    }

    const emotes: EmoteInterface[] = results.data.emotes.items.map((emote) => {
      const { name, id, host, animated } = emote;
      const { "3x": emoteUrl } = stvEmoteSourceParser(host.url, animated);
      return {
        emoteName: name,
        emoteUrl: emoteUrl!,
        origin: "SEVENTV",
        reference: id,
      };
    });

    return emotes;
  } catch (error) {
    throw error;
  }
};
