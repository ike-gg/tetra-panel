/* eslint-disable @typescript-eslint/no-floating-promises */
import { type PartialGuild } from "discord-oauth2";
import { create } from "zustand";
import { endpoints } from "~/constants/apiroutes";
import wretch from "wretch";

export interface ContextGuild {
  name: string;
  id: string;
  icon?: string | null;
}

interface GuildStore {
  fetch: () => Promise<void>;
  guilds: ContextGuild[] | null;
}

export const useGuildStore = create<GuildStore>()((set) => ({
  fetch: async () => {
    try {
      const guilds: { managingGuilds: PartialGuild[] } = await wretch(
        endpoints.getUserGuilds,
      )
        .options({ credentials: "include" })
        .get()
        .json();

      set({
        guilds: guilds.managingGuilds.map((guild) => ({
          icon: guild.icon,
          id: guild.id,
          name: guild.name,
        })),
      });
    } catch (error) {
      set({ guilds: [] });
      throw new Error("Error while fetching guilds");
    }
  },
  guilds: null,
}));
