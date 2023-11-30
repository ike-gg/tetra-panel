import { querySevenTV } from "./seventv";
import { queryBTTV } from "./bttv";
import { queryFFZ } from "./ffz";
import { type EmoteInterface } from "~/components/emotes/Emote";

export interface QueryEmoteOptions {
  page?: number;
  offset?: number;
  limit?: number;
}

export type QueryEmoteFn = (
  query: string,
  options?: QueryEmoteOptions,
) => Promise<EmoteInterface[]>;

export { querySevenTV, queryBTTV, queryFFZ };
