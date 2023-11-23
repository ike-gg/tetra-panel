"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmoteContextStore } from "~/app/store/emoteContextStore";

export default function PageTasksHomeParallel() {
  const [guildStatus, setGuildStatus] = useState("Loading guilds...");
  const { fetch, guilds } = useEmoteContextStore();

  useEffect(() => {
    if (guilds === null)
      fetch()
        .then(() => setGuildStatus(`Guilds loaded.`))
        .catch(() => {
          setGuildStatus("Fetching guilds failed.");
          toast.error(
            "Failed fetching guilds, context menu options wont be available.",
          );
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>{guildStatus}</p>;
}
