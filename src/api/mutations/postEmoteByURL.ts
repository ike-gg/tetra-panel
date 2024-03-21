import wretch from "wretch";
import { endpoints } from "~/constants/apiroutes";
import { type FittingOptions } from "~/types";

export interface PostEmoteURL {
  name: string;
  url: string;
  guildId: string;
  fitting?: FittingOptions;
}

export const postEmoteByURL = async ({
  guildId,
  name,
  url,
  fitting,
}: PostEmoteURL): Promise<{ message: string }> => {
  return await wretch(endpoints.addEmoteToGuild(guildId))
    .options({ credentials: "include" })
    .post({ guildid: guildId, emoteName: name, emoteUrl: url, fitting })
    .json();
};
