"use client";

import { useEffect, useState } from "react";
import { Emote, type EmoteInterface } from "../emote/Emote";
import { Input } from "../ui/input";
import Fuse from "fuse.js";
import wretch from "wretch";
import { endpoints } from "~/constants/apiroutes";
import { WretchError } from "wretch/resolver";
import { parseTetraApiError } from "~/lib/utils";
import { useGuildStore } from "~/store/guildStore";

export function EmotesGuild({
  list,
  guildId,
}: {
  list: EmoteInterface[];
  guildId?: string;
}) {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const guilds = useGuildStore((state) => state.guilds);

  const [fuse] = useState(new Fuse(list, { keys: ["emoteName"] }));
  const [items, setItems] = useState(list);

  const hasPermissionsToDelete =
    guilds && guilds.some((guild) => guild.id === guildId);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceSearch(search), 250);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (debounceSearch === "") {
      setItems(list);
      return;
    }

    setItems(fuse.search(debounceSearch).map((e) => e.item));
  }, [debounceSearch, fuse, list]);

  const removeEmote = async (emoteId: string) => {
    if (!guildId) throw "Guild ID missing.";
    try {
      const response: { message: string } = await wretch(
        endpoints.removeEmoteFromGuild(emoteId, guildId),
      )
        .options({ credentials: "include" })
        .delete()
        .json();

      return response.message;
    } catch (error) {
      if (error instanceof WretchError) {
        return parseTetraApiError(error);
      } else {
        return "Uncatched error.";
      }
    }
  };

  return (
    <div className="space-y-6 ">
      <Input
        placeholder="Search for emotes..."
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className="flex flex-wrap gap-3">
        {items.map((e) => (
          <Emote
            details={e}
            removeFn={() => removeEmote(e.reference)}
            hasPermissionsToRemove={hasPermissionsToDelete ?? false}
            guildId={guildId}
            key={e.emoteUrl}
          />
        ))}
      </div>
    </div>
  );
}
