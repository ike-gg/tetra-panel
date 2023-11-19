/* eslint-disable @typescript-eslint/no-floating-promises */
import { type PartialGuild } from "discord-oauth2";
import { create } from "zustand";
import { endpoints } from "~/constants/apiroutes";

export interface ContextGuild {
  name: string;
  id: string;
  icon?: string | null;
}

interface EmoteContextState {
  fetch: () => Promise<void>;
  guilds: ContextGuild[] | null;
}

export const useEmoteContextStore = create<EmoteContextState>()((set) => ({
  fetch: async () => {
    try {
      const request = await fetch(endpoints.getUserGuilds, {
        credentials: "include",
      });
      const response = (await request.json()) as {
        managingGuilds: PartialGuild[];
      };
      set({
        guilds: response.managingGuilds.map((guild) => ({
          icon: guild.icon,
          id: guild.id,
          name: guild.name,
        })),
      });
    } catch (error) {
      set({ guilds: [] });
    }
  },
  guilds: null,
}));
