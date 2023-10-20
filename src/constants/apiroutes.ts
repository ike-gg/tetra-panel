import { env } from "~/env.mjs";

const apiurl = env.BOTAPI_URL;

const endpoints = {
  getUserGuilds: apiurl + "/guilds",
  getGuildEmotes: (id: string) => `${apiurl}/guilds/${id}/emotes`,
};

export { endpoints };
