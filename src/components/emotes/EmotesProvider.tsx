import { TypographyH2 } from "../ui/typography";
import { Emote } from "../emote/Emote";
import { useQuery } from "@tanstack/react-query";
import * as Alert from "../ui/alert";
import { useEffect, useRef, useState } from "react";
import { type QueryEmoteFn } from "~/lib/emotes/query";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence } from "framer-motion";

interface Props {
  query: string;
  providerName: string;
  rows?: number;
  queryFn: QueryEmoteFn;
}

export function EmotesProvider({
  queryFn,
  providerName,
  query,
  rows = 2,
}: Props) {
  const [columns, setColumns] = useState<number>();
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      if (!columns) return Promise.resolve([]);
      return queryFn(query, {
        limit: rows * columns,
        offset: page * rows * columns,
        page,
      });
    },
    queryKey: [query, columns ?? 0 * rows, providerName, page],
  });

  const calculateColumns = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const elementWidth = 80;
    const gap = 12;
    const calculatedColumns = Math.floor(width / (elementWidth + gap));
    const lastElementWidth = width % (elementWidth + gap);
    const hasGapForLastElement = lastElementWidth >= elementWidth;
    const newColumns = hasGapForLastElement
      ? calculatedColumns + 1
      : calculatedColumns;

    setColumns(newColumns);
  };

  useEffect(() => {
    window.addEventListener("resize", calculateColumns);
    return () => window.removeEventListener("resize", calculateColumns);
  }, []);

  useEffect(() => calculateColumns(), [containerRef]);

  useEffect(() => setPage(1), [query]);

  if (error) {
    return (
      <Alert.Alert variant={"destructive"}>
        <Alert.AlertTitle>Failed fetching FFZ emotes.</Alert.AlertTitle>
        <Alert.AlertDescription>
          {error instanceof Error ? error.message : String(error)}
        </Alert.AlertDescription>
      </Alert.Alert>
    );
  }

  return (
    <div className="space-y-1" ref={containerRef}>
      <TypographyH2>{providerName} Emotes</TypographyH2>
      {data && data.length === 0 && (
        <Alert.Alert>
          <Alert.AlertTitle>Not found.</Alert.AlertTitle>
          <Alert.AlertDescription>
            Emotes not found with provided query <code>{query}</code>.
          </Alert.AlertDescription>
        </Alert.Alert>
      )}
      <div className="flex flex-wrap gap-3">
        {isLoading &&
          Array.from({ length: rows * (columns ?? 0) }).map((_, i) => (
            <div className="flex flex-col gap-1" key={i + "el" + providerName}>
              <Skeleton className="h-20 w-20" />
              <Skeleton className="h-4 w-20 rounded-sm" />
            </div>
          ))}
        {data?.map((emote) => (
          <Emote details={emote} key={emote.reference + emote.origin} />
        ))}
      </div>
      {true && (
        <nav className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              setPage((p) => {
                const newPage = p - 1;
                if (newPage < 1) return 1;
                return newPage;
              })
            }
          >
            <ArrowLeftIcon />
          </Button>
          <Button variant="secondary" disabled>
            {page}
          </Button>
          <Button variant="ghost" onClick={() => setPage((p) => p + 1)}>
            <ArrowRightIcon />
          </Button>
        </nav>
      )}
    </div>
  );
}
