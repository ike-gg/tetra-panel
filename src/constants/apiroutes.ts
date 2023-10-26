import { env } from "~/env.mjs";

const apiurl = env.NEXT_PUBLIC_BOTAPI_URL;

const endpoints = {
  getUserGuilds: apiurl + "/guilds",
  getGuild: (id: string) => `${apiurl}/guilds/${id}`,

  task: (id: string) => `${apiurl}/tasks/${id}`,

  addEmoteToGuild: (guildId: string) => apiurl + `/guilds/${guildId}`,
  removeEmoteFromGuild: (emoteId: string, guildId: string) =>
    apiurl + `/guilds/${guildId}/${emoteId}`,
};

export { endpoints };
