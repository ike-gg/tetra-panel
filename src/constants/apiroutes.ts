import { env } from "~/env.mjs";

const apiurl = env.NEXT_PUBLIC_BOTAPI_URL;

const endpoints = {
  getUserGuilds: apiurl + "/guilds",
  getGuildEmotes: (id: string) => `${apiurl}/guilds/${id}/emotes`,

  task: (id: string) => `${apiurl}/tasks/${id}`,

  addEmoteToGuild: (guildId: string) => apiurl + `/guilds/${guildId}`,
  removeEmoteFromGuild: (emoteId: string, guildId: string) =>
    apiurl + `/guilds/${guildId}/${emoteId}`,
};

export { endpoints };
