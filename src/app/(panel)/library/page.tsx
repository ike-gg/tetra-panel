"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EmotesProvider } from "~/components/emotes/EmotesProvider";
import { Input } from "~/components/ui/input";
import * as Select from "~/components/ui/select";
import { routes } from "~/constants/routes";
import { queryBTTV, queryFFZ, querySevenTV } from "~/lib/emotes/query";

export default function EmoteLibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsQuery = searchParams.get("query");
  const paramsProvider = searchParams.get("provider");

  const [query, setQuery] = useState(paramsQuery ?? "");
  const [provider, setProvider] = useState(paramsProvider ?? undefined);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const newProvider = provider === "all" ? undefined : provider;
    router.replace(routes.library(query, newProvider));
  }, [query, router, provider]);

  const isAllProvidersSelected = provider === undefined || provider === "all";
  const rows = isAllProvidersSelected ? 2 : 6;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Select.Select defaultValue="all" onValueChange={(e) => setProvider(e)}>
          <Select.SelectTrigger className="w-24">
            <Select.SelectValue />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {["All", "7TV", "BTTV", "FFZ"].map((provider) => (
              <Select.SelectItem
                key={"provideroption" + provider}
                value={provider.toLowerCase()}
              >
                {provider}
              </Select.SelectItem>
            ))}
          </Select.SelectContent>
        </Select.Select>
        <Input
          value={query}
          type="search"
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      {(isAllProvidersSelected || provider === "7tv") && (
        <EmotesProvider
          providerName="7TV"
          query={debouncedQuery}
          queryFn={querySevenTV}
          rows={rows}
        />
      )}
      {(isAllProvidersSelected || provider === "bttv") && (
        <EmotesProvider
          providerName="BTTV"
          query={debouncedQuery}
          queryFn={queryBTTV}
          rows={rows}
        />
      )}
      {(isAllProvidersSelected || provider === "ffz") && (
        <EmotesProvider
          providerName="FFZ"
          query={debouncedQuery}
          queryFn={queryFFZ}
          rows={rows}
        />
      )}
    </div>
  );
}
