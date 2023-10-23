"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useEmoteContextStore } from "~/app/store/emoteContextStore";

export default function PageTasksHomeParallel() {
  const { fetch, guilds } = useEmoteContextStore();

  useEffect(() => {
    if (guilds === null)
      fetch().catch(() =>
        toast.error(
          "Failed fetching guilds, context menu options wont be available.",
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>{guilds === null ? "Loading guilds..." : "Guilds loaded"}</p>;
}
