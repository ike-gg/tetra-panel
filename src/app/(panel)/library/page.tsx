"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import * as Select from "~/components/ui/select";
import { routes } from "~/constants/routes";

export default function EmoteLibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsQuery = searchParams.get("query");
  const paramsProvider = searchParams.get("provider");
  const paramsPage = searchParams.get("page");

  const [query, setQuery] = useState(paramsQuery ?? "");
  const [provider, setProvider] = useState(paramsProvider ?? undefined);
  const [page, setPage] = useState(paramsPage ? Number(paramsPage) : 1);

  useEffect(() => {
    const newProvider = provider === "all" ? undefined : provider;
    router.replace(routes.library(query, page, newProvider));
  }, [query, router, provider, page]);

  return (
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
      <Input value={query} onInput={(e) => setQuery(e.currentTarget.value)} />
      <div className="flex">
        <Button
          variant="ghost"
          onClick={() =>
            setPage((p) => {
              const newValue = p - 1;
              if (newValue <= 0) return p;
              return newValue;
            })
          }
        >
          <ArrowLeftIcon />
        </Button>
        <Input
          className="w-24 text-center"
          value={page}
          min={1}
          step={1}
          type="number"
          onInput={(e) => {
            const newValue = Number(e.currentTarget.value);
            if (newValue || newValue > 0) setPage(Math.round(newValue));
          }}
        />
        <Button variant="ghost" onClick={() => setPage((p) => p + 1)}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
